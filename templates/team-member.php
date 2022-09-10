<?php
/**
 * Example template to display a single team member.
 *
 * @param array $attributes Attributes.
 *
 * @package BlockFrameworkExample
 */

?>
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