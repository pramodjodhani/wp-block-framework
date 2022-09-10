<?php
/**
 * Plugin Name: Block Framework example
 * Description: An example plugin to demonstrate the use of WP Block Framework.
 * Author: pramodjodhani
 * Author URL: https://pramodjodhani.com
 *
 * @package BlockFrameworkExample
 */

/**
 * An example class for the demonstration of Block Framework.
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
		WP_Block_Framework::register_block_type(
			'wpbf-example/demo-all-fields',
			array(
				'title'    => 'Demo All fields',
				'icon'     => 'admin-site',
				'category' => 'widgets',
				'keywords' => array( __( 'image' ), __( 'photo' ), __( 'pics' ) ),
				'wpbf'     => array(
					'template' => dirname( __FILE__ ) . '/block-template.php',
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
							'id'      => 'toggle1',
							'type'    => 'toggle',
							'title'   => 'Toggle',
							'desc'    => 'Enable this legendary feature?',
							'default' => 'true',
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
							'type'        => 'textarea',
							'title'       => 'Textarea',
							'desc'        => 'This is a description.',
							'placeholder' => 'This is a placeholder.',
							'default'     => 'This is default',
							'rows'        => '10',
							'cols'        => '60',
						),
						array(
							'id'      => 'radio',
							'type'    => 'radio',
							'title'   => 'Radio',
							'desc'    => 'This is a description.',
							'default' => 'green',
							'choices' => array(
								'red'   => 'Red',
								'green' => 'Green',
								'blue'  => 'Blue',
							),
						),
						array(
							'id'      => 'checkboxes',
							'type'    => 'checkboxes',
							'title'   => 'CHeckboxes',
							'desc'    => 'This is a description.',
							'default' => 'green',
							'choices' => array(
								'red'   => 'Red',
								'green' => 'Green',
								'blue'  => 'Blue',
							),
						),
						array(
							'id'            => 'file',
							'type'          => 'file',
							'title'         => 'File',
							'desc'          => 'This is a description.',
							'default'       => '',
							'multiple'      => true,
							'allowed_types' => array( 'image', 'audio', 'text' ), // https://github.com/WordPress/gutenberg/blob/trunk/packages/block-editor/src/components/media-upload/README.md.
						),
						array(
							'id'      => 'color',
							'type'    => 'color',
							'title'   => 'color',
							'desc'    => 'This is a description.',
							'default' => '#fff',
						),
						array(
							'id'        => 'group-1',
							'type'      => 'group',
							'title'     => 'Group fields',
							'desc'      => 'This is a description.',
							'subfields' => array(
								array(
									'id'          => 'sub-text',
									'title'       => 'Sub Text',
									'desc'        => 'This is a description.',
									'placeholder' => 'This is a placeholder.',
									'type'        => 'text',
									'default'     => 'Sub text',
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
									'id'      => 'sub-checkbox',
									'title'   => 'sub-checkbox',
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
									'id'            => 'file',
									'title'         => 'Inner file',
									'desc'          => 'This is a description.',
									'type'          => 'file',
									'default'       => '',
									'multiple'      => true,
									'allowed_types' => array( 'image', 'audio', 'text' ), // https://github.com/WordPress/gutenberg/blob/trunk/packages/block-editor/src/components/media-upload/README.md.
								),
							),
						),
					),
				),
			)
		);

		WP_Block_Framework::register_block_type(
			'wpbf-example/team-member-group',
			array(
				'title'       => 'Team member (group)',
				'description' => 'Team member block. Demonstrate use of the repeater/group field type.',
				'icon'        => 'groups',
				'category'    => 'widgets',
				'keywords'    => array( __( 'team' ), __( 'member' ), __( 'crew' ) ),
				'wpbf'        => array(
					'template' => dirname( __FILE__ ) . '/templates/team-member-group.php',
					'fields'   => array(
						array(
							'id'        => 'team-members',
							'type'      => 'group',
							'title'     => 'Team members',
							'desc'      => 'Team members list',
							'subfields' => array(
								array(
									'id'          => 'name',
									'type'        => 'text',
									'title'       => 'Name',
									'desc'        => 'Team Member name',
									'placeholder' => 'Name',
									'default'     => 'Raj',
								),
								array(
									'id'          => 'position',
									'type'        => 'textarea',
									'title'       => 'Bio',
									'desc'        => 'Position in the company',
									'placeholder' => 'Ex. Head of marketing..',
									'default'     => '',
								),
								array(
									'id'    => 'image',
									'type'  => 'image',
									'title' => 'Image',
									'desc'  => 'A nice Headshot.',
								),
							),
						),
					),
				),
			)
		);

		WP_Block_Framework::register_block_type(
			'wpbf-example/team-member-single',
			array(
				'title'    => 'Team member (Single)',
				'icon'     => 'groups',
				'category' => 'widgets',
				'keywords' => array( __( 'team' ), __( 'member' ), __( 'crew' ) ),
				'wpbf'     => array(
					'template' => dirname( __FILE__ ) . '/templates/team-member.php',
					'fields'   => array(
						array(
							'id'          => 'name',
							'type'        => 'text',
							'title'       => 'Name',
							'desc'        => 'Team Member name',
							'placeholder' => 'Name',
						),
						array(
							'id'          => 'position',
							'type'        => 'textarea',
							'title'       => 'Bio',
							'desc'        => 'Position in the company',
							'placeholder' => 'Ex. Head of marketing..',
						),
						array(
							'id'    => 'image',
							'type'  => 'image',
							'title' => 'Image',
							'desc'  => 'A nice Headshot.',
						),
					),
				),
			),
		);
	}

}

new BlockFrameworkExample();
