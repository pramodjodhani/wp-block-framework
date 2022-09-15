# WP Block Framework
With WordPress Block Framework, you can create WordPress blocks only using PHP and without having to write a line of Javascript. Helpful for creating simple blocks and converting shortcodes to blocks. Think of it as pluggable version of ACF.

# How to use

## Step 1A - Installation (with composer)

```
composer require pramodjodhani/wp-block-framework
```

## Step 1B - Installation (manually)

Copy this whole repository to your theme or plugin. Then include the block-framework/class-block-framework.php file.

```
include "./wp-block-framework/block-framework/class-block-framework.php";
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

You only need to include `wpbf` parameter and `template` and `fields` argument inside it.

```
WP_Block_Framework::register_block_type(
	'wpbf-example/team-member',
	array(
		'title'    => 'Team member',
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
```
## Step 3 Create the template

WPBF will load the `template` we mentioned in step 2 (/templates/team-member.php). Create this file within your theme/plugin. 

The data is provided to the template in the form of the $attributes variable. $attribute is an array of associative values, and the field id can be used to retrieve the field values ex: `$attributes['name']`.


```
<div class="team-member-wrap">
	<div class="team-member">
		<div class="team-member__photo">
			<?php if ( isset( $attributes['image'][0] ) ) { ?>
			<img src="<?php echo $attributes['image'][0]['sizes']['medium']['url']; ?>" alt="Team member photo">
			<?php } ?>
		</div>
		<div class="team-member__details">
			<h2><?php echo $attributes['name']; ?></h2>
			<small><?php echo $attributes['position']; ?></small>
		</div>
	</div>
</div>
```

That's it 🕺


# Here's the block in working:

![Recording #259](https://user-images.githubusercontent.com/5794565/190054565-c1876651-66b3-4b6f-ac58-2c11430056f3.gif)




# Supported Field Types
- textarea
- text
- Password
- date
- select
- toggle
- radio
- checkboxes
- file
- image
- color
- group (repeater field 🔁 )

# Upcoming Features
- Support for block.json
- Conditional fields
- Improve UX
