<?php
/**
 * Main template. Pages are built from blocks, so this prints the content.
 * Single conference entries also get a details summary.
 */
defined( 'ABSPATH' ) || exit;

get_header();
?>
<main id="main" class="pu-main">
	<?php
	while ( have_posts() ) {
		the_post();

		if ( is_singular( 'conference' ) ) {
			$details = pu_conference_details( get_the_ID() );
			?>
			<article <?php post_class( 'conf-single wrap' ); ?>>
				<h1 class="conf-single__title"><?php the_title(); ?></h1>
				<?php if ( $details ) : ?>
					<dl class="conf-single__meta">
						<?php foreach ( $details as $label => $value ) : ?>
							<div>
								<dt><?php echo esc_html( $label ); ?></dt>
								<dd><?php echo esc_html( $value ); ?></dd>
							</div>
						<?php endforeach; ?>
					</dl>
				<?php endif; ?>
				<div class="conf-single__body"><?php the_content(); ?></div>
				<?php $reg = get_post_meta( get_the_ID(), 'registration_url', true ); ?>
				<?php if ( $reg ) : ?>
					<p><a class="btn btn--primary" href="<?php echo esc_url( $reg ); ?>">Register for this conference</a></p>
				<?php endif; ?>
			</article>
			<?php
		} else {
			the_content();
		}
	}
	?>
</main>
<?php
get_footer();
