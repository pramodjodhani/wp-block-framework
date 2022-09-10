<?php
/**
 * Example template to display a list of team members.
 *
 * @param array $attributes Attributes.
 *
 * @package BlockFrameworkExample
 */

?>

<div class="wpbf-example-team">
	<?php foreach ( $attributes['team-members'] as $member ) { ?>
		<div class="wpbf-example-team-member">
			<div class="wpbf-example-team__photo">
				<img src="<?php echo esc_attr( $member['image'][0]['sizes']['thumbnail']['url'] ); ?>" alt="team member photo">
			</div>
			<div class="wpbf-example-team__title">
				<h3><?php echo esc_html( $member['name'] ); ?></h3>
				<small><?php echo esc_html( $member['position'] ); ?></small>
			</div>
		</div>
	<?php } ?>
</div>

<style>
.wpbf-example-team-member {
	width: 150px;
	text-align: center;
}

.wpbf-example-team {
	display: flex;
	gap: 20px;
}

.wpbf-example-team__photo {
	text-align: center;
}

.wpbf-example-team__photo img {
	margin: 0 auto;
}

.wpbf-example-team__photo {
	margin-bottom: 10px;
}
</style>
