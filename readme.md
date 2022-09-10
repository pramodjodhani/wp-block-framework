# WP Block Framework
# How to use

## Step 1
Include the block framework within your plugin or theme. 

```
include "./block-framework/class-block-framework.php";
```

## Step 2
Call `WP_Block_Framework::register_block_type()` just how you would call the WordPress function [register_block_type](https://developer.wordpress.org/reference/functions/register_block_type/). 

```
WP_Block_Framework::register_block_type(
	'wpbf-example/team-member',
	array(
		'title'    => 'Team member',
		'icon'     => 'groups',
		'category' => 'widgets',
		'keywords' => array( __( 'team' ), __( 'member' ), __( 'crew' ) ),
	)
);
```

You only need to include `template` and `fields` argument.

```
WP_Block_Framework::register_block_type(
	'wpbf-example/team-member',
	array(
		'title'    => 'Team member',
		'icon'     => 'groups',
		'category' => 'widgets',
		'keywords' => array( __( 'team' ), __( 'member' ), __( 'crew' ) ),
		'template' => dirname( __FILE__ ) . '/templates/example-template-team-members.php',
		'field'    => array(
			array(
				'id'        => 'member_name',
				'type'      => 'text',
				'title'     => 'Name',
				'desc'      => 'Name of the Team member',
			),
			array(
				'id'        => 'member_designation',
				'type'      => 'textarea',
				'title'     => 'Designation',
				'desc'      => 'Designation',
			),
			array(
				'id'        => 'member_photo',
				'type'      => 'image',
				'title'     => 'Photo',
				'desc'      => 'Photo of the Team member',
			),
		)
	)
);
```

## Step 3 Block is ready -- add 

## Step 4 Prepare your template

The `$attributes` variable is present in the template file that you provided in the step 2. Use it to create your dynamic template.

```
<div class="team-member-wrap">
	<div.team-member>
	</div>
</div>
```

That's it 🕺

# Field Types
- textarea
- text
- Password
- date
- Select
- toggle
- radio
- checkboxes
- file
- file
- color
- group (repeater field 🔁 )

# Features to complete before release
- [x] Text
- [x] Select
- [x] Checkbox
- [x] Radio
- [x] File Upload/Image
- [x] Toggle
- [x] Color Picker 
- [x] Date Picker
- [x] Time Picker
- [x] Editor
- [x] Toggle between Edit View and Display View
- [x] Repeater Field

# Upcoming Features
