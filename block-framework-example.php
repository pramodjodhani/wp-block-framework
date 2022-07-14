<?php
/**
 * Plugin Name: Block Framework example
 * Description: An example plugin to demonstrate use of Block Framework.
 * Author: pramodjodhani
 * Author URL: https://pramodjodhani.com
 */


class BlockFrameworkExample {
	/**
	 * Construct.
	 */
	public function __construct() {
		define( 'BF_EXAMPLE_PLUGIN_PATH', plugin_dir_path( __FILE__ ) );

		require BF_EXAMPLE_PLUGIN_PATH . '/block-framework/class-block-framework.php';

		add_action( 'init', array( $this, 'register_custom_blocks' ) );
	}

	/**
	 * Register blocks.
	 *
	 * @return void
	 */
	public function register_custom_blocks() {
		$block_factory = WP_Block_Framework::get_instance();
		$block_factory->register_block_type(
			'iconicwp/my-custom-block',
			array(
				'title'    => 'My custom block1',
				'icon'     => 'book-alt',
				'category' => 'widgets',
				'keywords' => array( __( 'image' ), __( 'photo' ), __( 'pics' ) ),
				'fields'   => array(
					array(
						'id'          => 'text',
						'title'       => 'Text',
						'desc'        => 'This is a description.',
						'placeholder' => 'This is a placeholder.',
						'type'        => 'text',
						'default'     => 'This is the default value',
					),
					array(
						'id'      => 'select',
						'title'   => 'Select',
						'desc'    => 'This is a description.',
						'type'    => 'select',
						'default' => 'green',
						'choices' => array(
							'red'   => 'Red',
							'green' => 'Green',
							'blue'  => 'Blue',
						),
					),
					array(
						'id'         => 'date',
						'title'      => 'Date Picker',
						'desc'       => 'This is a description.',
						'type'       => 'date',
						'datepicker' => array(),
					),
					array(
						'id'          => 'password',
						'title'       => 'Password',
						'desc'        => 'This is a description.',
						'placeholder' => 'This is a placeholder.',
						'type'        => 'password',
						'default'     => 'Example',
					),
					array(
						'id'          => 'textarea',
						'title'       => 'Textarea',
						'desc'        => 'This is a description.',
						'placeholder' => 'This is a placeholder.',
						'type'        => 'textarea',
						'default'     => 'This is default',
					),
					array(
						'id'      => 'radio',
						'title'   => 'Radio',
						'desc'    => 'This is a description.',
						'type'    => 'radio',
						'default' => 'green',
						'choices' => array(
							'red'   => 'Red',
							'green' => 'Green',
							'blue'  => 'Blue',
						),
					),
					array(
						'id'      => 'file',
						'title'   => 'File',
						'desc'    => 'This is a description.',
						'type'    => 'file',
						'default' => '',
					),
					array(
						'id'      => 'editor',
						'title'   => 'Editor',
						'desc'    => 'This is a description.',
						'type'    => 'editor',
						'default' => '',
					),
				)
			)
		);
	}

}

new BlockFrameworkExample();