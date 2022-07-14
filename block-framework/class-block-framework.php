<?php

class WP_Block_Framework {

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
	 * @return void
	 */
	public function register_block_type( $block_name, $args ) {
		// Todo maybe add checks.
		$this->blocks[ $block_name ] = $args;
	}

	/**
	 * Print block JSON.
	 *
	 * @return void
	 */
	public function print_blocks_json() {
		?>
		<script>
		var bf_blocks = <?php echo wp_json_encode( $this->blocks ); ?>;
		</script>
		<?php
	}

	/**
	 * Enqueue assets.
	 */
	public static function enqueue_assets() {
		$asset_file = include plugin_dir_path( __FILE__ ) . '/build/index.asset.php';

		wp_register_script(
			'block-framework',
			plugins_url( 'build/index.js', __FILE__ ),
			$asset_file['dependencies'],
			$asset_file['version'],
			true
		);

		wp_enqueue_script( 'block-framework' );
	}
}
