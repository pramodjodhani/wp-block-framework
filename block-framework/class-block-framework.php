<?php
/**
 * WP Block framework main class.
 *
 * @package WP_Block_Framework.
 */

/**
 * WP Block Framework.
 */
class WP_Block_Framework {

	/**
	 * Version.
	 *
	 * @var string
	 */
	public static $version = '1.0.0';

	/**
	 * Blocks.
	 *
	 * @var array
	 */
	public $blocks = array();

	/**
	 * Self Instance.
	 *
	 * @var Object
	 */
	private static $instance;

	/**
	 * Get instance.
	 *
	 * @return $this.
	 */
	public static function get_instance() {
		if ( null === self::$instance ) {
			self::$instance = new self();
		}

		return self::$instance;
	}

	/**
	 * Constructor.
	 */
	public function __construct() {
		add_action( 'enqueue_block_editor_assets', array( $this, 'print_blocks_json' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_assets' ) );
	}

	/**
	 * Create framework.
	 *
	 * @param string $block_name The name of block. Example 'mycompany/my-custom-block'.
	 * @param array  $args       Argument.
	 *
	 * @return void
	 */
	public function register_block_type( $block_name, $args ) {
		// Todo maybe add checks.
		$this->blocks[ $block_name ] = $args;

		$attributes                                = self::get_attributes( $args );
		$this->blocks[ $block_name ]['attributes'] = $attributes;

		register_block_type(
			$block_name,
			array(
				'api_version'     => 2,
				'attributes'      => $attributes,
				'render_callback' => array( $this, 'render_block' ),
			)
		);
	}

	/**
	 * Print block JSON.
	 *
	 * @return void
	 */
	public function print_blocks_json() {
		?>
		<script>
		var wpbf_blocks = <?php echo wp_json_encode( $this->blocks ); ?>;
		</script>
		<?php
	}

	/**
	 * Enqueue assets.
	 */
	public static function enqueue_assets() {
		if ( ! self::is_gutenberg_screen() ) {
			return;
		}

		$asset_file = include plugin_dir_path( __FILE__ ) . '/build/index.asset.php';

		$dependencies = array_merge( $asset_file['dependencies'], array( 'wp-color-picker' ) );

		wp_register_script(
			'block-framework-js',
			plugins_url( 'build/index.js', __FILE__ ),
			$dependencies,
			$asset_file['version'],
			true
		);

		wp_enqueue_editor();

		wp_enqueue_script( 'block-framework-js' );

		wp_enqueue_style(
			'block-framework-css',
			plugins_url( 'css/style.css', __FILE__ ),
			array( 'wp-color-picker' ),
			self::$version
		);
	}

	/**
	 * Render block.
	 *
	 * @return string.
	 */
	public function render_block( $attributes, $content = '', $wp_block = false ) {
		if ( ! isset( $this->blocks[ $wp_block->name ] ) ) {
			return 'Something went wront. Block is not registered.';
		}

		$block_data = $this->blocks[ $wp_block->name ];

		if ( ! isset( $block_data['template'] ) || empty( $block_data['template'] ) ) {
			return '"template" parameter not provided';
		}

		if ( ! file_exists( $block_data['template'] ) ) {
			return sprintf( 'Invalid template file: %s', $block_data['template'] );
		}

		ob_start();
		include $block_data['template'];
		return ob_get_clean();
	}

	/**
	 * Check if current screen is Gutenberg editor.
	 *
	 * @return bool
	 */
	public static function is_gutenberg_screen() {
		if ( function_exists( 'is_gutenberg_page' ) && is_gutenberg_page() ) {
			return true;
		}

		$current_screen = get_current_screen();
		if ( method_exists( $current_screen, 'is_block_editor' ) && $current_screen->is_block_editor() ) {
			return true;
		}

		return false;
	}

	/**
	 * Get attributes.
	 *
	 * @param array $args Argument.
	 *
	 * @return array Attributes.
	 */
	public static function get_attributes( $args ) {
		$attributes = array();
		foreach ( $args['fields'] as $field ) {
			$type                       = self::get_attribute_type_for_field( $field );
			$attributes[ $field['id'] ] = array(
				'type'    => $type,
				'default' => 'array' === $type ? array() : '',
			);
		}

		return $attributes;
	}

	/**
	 * Get attribute type for field.
	 *
	 * @param string $field Field.
	 *
	 * @return string
	 */
	public static function get_attribute_type_for_field( $field ) {
		if ( in_array( $field['type'], array( 'checkbox', 'checkboxes', 'radio', 'file', 'group' ), true ) ) {
			return 'array';
		}

		return 'string';
	}
}

