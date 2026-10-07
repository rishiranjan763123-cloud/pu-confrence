<?php
/**
 * PU Conferences landing page.
 * Screenshot-inspired editorial conference experience.
 */
defined( 'ABSPATH' ) || exit;

get_header();

$conference_query = new WP_Query(
	array(
		'post_type'      => 'conference',
		'post_status'    => 'publish',
		'posts_per_page' => 4,
		'orderby'        => 'meta_value',
		'meta_key'       => 'start_date',
		'order'          => 'ASC',
		'meta_query'     => array(
			array(
				'key'     => 'upcoming',
				'value'   => '1',
				'compare' => '=',
			),
		),
	)
);

$format_date = static function ( $raw ) {
	return pu_format_date( $raw );
};
?>

<main id="main" class="pu-home">
	<section class="pu-hero">
		<div class="wrap pu-hero__grid">
			<div class="pu-hero__copy">
				<span class="eyebrow">Conferences at Parul University</span>
				<h1>Where research<br>meets new<br><span>perspectives.</span></h1>
				<p>A paper to present. A field to explore. A conversation that opens up a new question. Discover academic conferences connecting students, researchers and practitioners at Parul University.</p>
				<div class="hero-actions">
					<a class="btn btn--primary" href="#upcoming">Explore conferences <span>→</span></a>
					<a class="btn btn--outline" href="#research">Read the research</a>
				</div>
			</div>
			<div class="pu-hero__media" aria-label="Conference and research highlights">
				<div class="hero-stack">
					<div class="hero-thumb hero-thumb--1"><span>Research<br>in action</span></div>
					<div class="hero-thumb hero-thumb--2"><span>Ideas<br>in motion</span></div>
					<div class="hero-thumb hero-thumb--3"><span>People<br>who connect</span></div>
				</div>
				<div class="hero-feature"><div class="hero-feature__badge">PU</div><strong>Conference<br>community</strong><small>Ideas • People • Impact</small></div>
			</div>
		</div>
	</section>

	<section class="steps-strip" aria-label="How to take part">
		<div class="wrap steps-strip__inner">
			<div><b>01</b><span><strong>Attend &amp; exchange</strong><small>Hear ideas from across your field.</small></span></div>
			<div><b>02</b><span><strong>Present your work</strong><small>Explore themes and submission routes.</small></span></div>
			<div><b>03</b><span><strong>Follow the research</strong><small>Read reports and published proceedings.</small></span></div>
		</div>
	</section>

	<section id="upcoming" class="home-section home-section--soft">
		<div class="wrap">
			<header class="section-heading">
				<p class="section-kicker">Forthcoming editions</p>
				<h2>Make room for <em>your next idea.</em></h2>
				<p>Explore announced conferences, the questions they address and the dates to plan around.</p>
			</header>
			<div class="upcoming-grid">
				<?php if ( $conference_query->have_posts() ) : ?>
					<?php while ( $conference_query->have_posts() ) : $conference_query->the_post(); ?>
						<?php
						$start = $format_date( get_post_meta( get_the_ID(), 'start_date', true ) );
						$end   = $format_date( get_post_meta( get_the_ID(), 'end_date', true ) );
						$topic = wp_get_post_terms( get_the_ID(), 'conference_topic', array( 'fields' => 'names' ) );
						$label = ! empty( $topic ) && ! is_wp_error( $topic ) ? $topic[0] : 'Academic conference';
						?>
						<article class="edition-card">
							<span class="date-pill"><?php echo esc_html( $start ?: 'TBA' ); ?></span>
							<h3><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h3>
							<p class="edition-date"><?php echo esc_html( $start && $end ? $start . ' – ' . $end : 'Date to be announced' ); ?></p>
							<p><?php echo esc_html( $label ); ?></p>
							<a class="text-link" href="<?php the_permalink(); ?>">Explore this edition <span>→</span></a>
						</article>
					<?php endwhile; wp_reset_postdata(); ?>
				<?php else : ?>
					<?php foreach ( array( 'IAPSMGC CON 2026', 'ICSUMMIT 2027', 'AISCT 2026–27', 'PiCET 2027' ) as $i => $name ) : ?>
						<article class="edition-card"><span class="date-pill"><?php echo esc_html( array( '27 Nov 2026', '08 Jan 2027', '06 Feb 2027', '07 May 2027' )[ $i ] ); ?></span><h3><?php echo esc_html( $name ); ?></h3><p class="edition-date">Upcoming edition</p><p>Computing &amp; research</p><a class="text-link" href="#directory">Explore this edition <span>→</span></a></article>
					<?php endforeach; ?>
				<?php endif; ?>
			</div>
		</div>
	</section>

	<section id="directory" class="home-section">
		<div class="wrap">
			<header class="section-heading section-heading--directory">
				<p class="section-kicker">Explore the conference directory</p>
				<h2>Many disciplines.<br><em>More ways to connect.</em></h2>
				<p>Find a conference by subject, edition or attendance mode. Open any card for its research themes, organising team, participation guidance and related reading.</p>
			</header>
			<div class="directory-panel">
				<div class="directory-search"><span>⌕</span><input id="pu-search" type="search" placeholder="Try AI, public health or a conference name" aria-label="Search conferences"></div>
				<div class="directory-filters">
					<select id="pu-topic-filter"><option value="">Edition / all editions</option><option value="AI &amp; Computing">AI &amp; Computing</option><option value="Engineering &amp; Technology">Engineering &amp; Technology</option><option value="Sustainability">Sustainability</option><option value="Health &amp; Life Sciences">Health &amp; Life Sciences</option></select>
					<select id="pu-year-filter"><option value="">Conference year / every year</option><option value="2026">2026</option><option value="2027">2027</option></select>
					<select id="pu-subject-filter"><option value="">Subject area / every subject</option><option value="AI &amp; Computing">AI &amp; Computing</option><option value="Public health &amp; healthcare">Public health &amp; healthcare</option><option value="Materials &amp; engineering">Materials &amp; engineering</option></select>
					<select id="pu-mode-filter"><option value="">Attendance mode / any format</option><option value="On campus">On campus</option><option value="Hybrid">Hybrid</option><option value="Online">Online</option></select>
				</div>
				<div class="filter-chips"><button type="button" class="filter-chip is-active" data-filter="">Upcoming editions</button><button type="button" class="filter-chip" data-filter="Hybrid">Hybrid participation</button><button type="button" class="filter-chip" data-filter="AI &amp; Computing">AI &amp; computing</button><button type="button" class="filter-chip" data-filter="Sustainability">Sustainability</button><button type="button" class="filter-chip" data-filter="past">Past editions</button></div>
			</div>
		</div>
	</section>

	<section class="home-section home-section--cards">
		<div class="wrap">
			<div class="conference-grid">
				<?php
			$cards = new WP_Query( array( 'post_type' => 'conference', 'post_status' => 'publish', 'posts_per_page' => 2, 'orderby' => 'meta_value', 'meta_key' => 'start_date', 'order' => 'ASC' ) );
			if ( $cards->have_posts() ) :
				while ( $cards->have_posts() ) : $cards->the_post();
					$topics = wp_get_post_terms( get_the_ID(), 'conference_topic', array( 'fields' => 'names' ) );
					$topic_name = ! empty( $topics ) && ! is_wp_error( $topics ) ? $topics[0] : 'Public health & healthcare';
					$start = $format_date( get_post_meta( get_the_ID(), 'start_date', true ) );
					$end = $format_date( get_post_meta( get_the_ID(), 'end_date', true ) );
					?>
					<article class="conference-card">
						<div class="conference-card__head"><span>Parul University / Conferences</span><strong><?php echo esc_html( get_post_meta( get_the_ID(), 'edition', true ) ?: '2026' ); ?></strong><h3><?php the_title(); ?></h3><p><?php echo esc_html( $topic_name ); ?></p></div>
						<div class="conference-card__body"><span class="status-pill">Upcoming edition</span><h4><?php the_title(); ?></h4><p class="card-date">▣ <?php echo esc_html( $start && $end ? $start . ' – ' . $end : $start ); ?></p><p><?php echo esc_html( get_the_excerpt() ?: 'Digital research, equitable access and new conversations through scientific sessions, research presentations and workshops.' ); ?></p><div class="tags"><span>AI</span><span>Quantum computing</span><span>Cybersecurity</span><span>Sustainable technologies</span></div><a href="<?php the_permalink(); ?>" class="card-action">Official conference website <span>→</span></a><a href="<?php the_permalink(); ?>" class="card-action">Conference details &amp; resources <span>+</span></a></div>
					</article>
				<?php endwhile; wp_reset_postdata(); else : ?>
				<?php for ( $i = 0; $i < 2; $i++ ) : ?><article class="conference-card"><div class="conference-card__head"><span>Parul University / Conferences</span><strong>2026</strong><h3>IAPSMGC CON</h3><p>Public health &amp; healthcare</p></div><div class="conference-card__body"><span class="status-pill">Upcoming edition</span><h4>IAPSM Gujarat Chapter Annual State Conference 2026</h4><p class="card-date">▣ 27–28 Nov 2026</p><p>Digital health, equitable access and community medicine come together through scientific sessions, research presentations and pre-conference workshops.</p><div class="tags"><span>AI</span><span>Quantum computing</span><span>Cybersecurity</span><span>Sustainable technologies</span></div><a href="#" class="card-action">Official conference website <span>→</span></a><a href="#" class="card-action">Conference details &amp; resources <span>+</span></a></div></article><?php endfor; ?>
				<?php endif; ?>
			</div>
			<a class="btn btn--dark" href="#directory">View more →</a>
		</div>
	</section>

	<section class="dark-section">
		<div class="wrap">
			<header class="dark-heading"><p>For authors &amp; research presenters</p><h2>Your work.<br><em>Its next conversation.</em></h2><span>Start with a theme that fits your research. Check the author guidelines, review process and submission dates before sending your work.</span></header>
			<div class="deadline-cards"><article><b>15 Sep 2026</b><strong>IAPSMGC CON 2026</strong><span>Abstract submission</span></article><article><b>15 Sep 2026</b><strong>AISCT 2026–27</strong><span>Paper submission deadline</span></article><article><b>30 Sep 2026</b><strong>ICSUMMIT 2027</strong><span>Full-paper submission</span></article><article><b>12 Oct 2026</b><strong>PiCET 2027</strong><span>Full-paper submissions begin</span></article></div>
		</div>
	</section>

	<section id="research" class="home-section">
		<div class="wrap">
			<header class="section-heading"><p class="section-kicker">The work beyond the programme</p><h2>Research worth <em>returning to.</em></h2><p>Read the questions, methods and perspectives behind past editions through conference reports and published work.</p></header>
			<div class="research-grid">
				<?php foreach ( array( array( 'Published proceedings', 'Explore the research, not just the event.', 'Read the proceedings →' ), array( 'PiCET 2026', 'What researchers brought to PiCET.', 'Explore the research sessions →' ), array( 'Sustainable finance', 'Finance, sustainability and inclusion.', 'Read the conference report →' ) ) as $card ) : ?><article class="research-card"><div class="research-card__image"><span><?php echo esc_html( $card[0] ); ?></span><strong>Let’s Work<br><i>Together</i></strong></div><div class="research-card__body"><b><?php echo esc_html( $card[0] ); ?></b><h3><?php echo esc_html( $card[1] ); ?></h3><p>Explore questions, findings and approaches that continue the conversation beyond the event.</p><a href="#"> <?php echo esc_html( $card[2] ); ?></a></div></article><?php endforeach; ?>
			</div>
		</div>
	</section>

	<section class="dark-section taking-section">
		<div class="wrap">
			<header class="dark-heading"><p>Taking part</p><h2>Bring your curiosity.<br><em>Choose your next step.</em></h2><span>You do not need the same starting point to enter the conversation. Explore the route that matches your interests and the conference’s participation criteria.</span></header>
			<div class="taking-grid"><article><small>01 / Attend</small><h3>Explore a field more deeply.</h3><p>Read the scientific programme and choose sessions relevant to your studies or professional interests.</p><a href="#directory">Find your subject →</a></article><article><small>02 / Present</small><h3>Put your research into discussion.</h3><p>Find a suitable track, prepare your abstract or paper and follow the official submission process.</p><a href="#authors">Review submission dates →</a></article><article><small>03 / Collaborate</small><h3>Connect through a shared question.</h3><p>For invited contributions, institutional participation or industry collaboration, contact the relevant organising team.</p><a href="#callback">Review submission dates →</a></article></div>
			<div class="question-box"><div><h3>A question about a forthcoming edition?</h3><p>Reach the conference’s organising team for eligibility, registration, paper submissions and participation arrangements.</p></div><a href="#callback" class="select-like">Select an announced edition⌄</a></div>
		</div>
	</section>

	<section class="home-section related-section">
		<div class="wrap"><header class="section-heading"><p class="section-kicker">Related academic experiences</p><h2>Different formats. <em>A shared curiosity.</em></h2><p>Discover skills conclaves and professional-development programmes alongside the conference archive.</p></header><div class="related-grid"><article><b>Skills conclave</b><h3>National Healthcare Skills Conclave 2026</h3><p>Simulation-based teamwork, a Skill Marathon and healthcare innovation form a practical complement to academic conference learning.</p><a href="#">Read the conclave report →</a></article><article><b>Professional development programme</b><h3>Generative AI in Compliance, Audit Readiness &amp; Regulatory Alignment</h3><p>Simulation-based teamwork and practical professional development for the modern research ecosystem.</p><a href="#">View the programme announcement →</a></article></div><div class="related-banner"><strong>Looking for individual speakers,<br>campus conversations or the guest archive?</strong><a href="#">Explore PU Talks →</a></div></div>
	</section>

	<section class="faq-section">
		<div class="wrap"><header class="section-heading"><p class="section-kicker">A little more clarity</p><h2><em>Before you join the conversation.</em></h2><p>A guide to participation, submissions and finding the right conference information.</p></header><div class="faq-list"><details open><summary>What conferences does Parul University organise or host?</summary><p>This directory brings together conferences in computing, materials engineering, agriculture, public health, management, commerce, law, liberal arts and hospitality. Each edition identifies the organiser, themes, available dates and official resources.</p></details><details><summary>Can students and researchers from other institutions take part?</summary><p>Participation depends on the individual edition. Check the official conference details and registration criteria.</p></details><details><summary>Can I attend online?</summary><p>Some editions offer hybrid or online participation. The format is shown on each conference record.</p></details></div><a class="btn btn--dark" href="#directory">View more</a></div>
	</section>

	<section id="callback" class="callback-section">
		<div class="wrap callback-grid"><div class="callback-copy"><p>Start here</p><h2>Tell us the problem.</h2><p>The more specific the brief, the faster the quote. Tell us what you need and our team can point you to the right conference or programme.</p><a class="btn btn--yellow" href="#directory">Ask about my programme</a><a class="btn btn--white" href="#callback-form">Talk to a counsellor</a></div><form id="callback-form" class="callback-card" data-pu-callback><h3>Request a callback</h3><div class="form-grid"><label>Name*<input name="name" required></label><label>Mobile Number*<input name="phone" required></label></div><label>Email*<input name="email" type="email" required></label><label>Programme of Interest*<select name="conference"><option value="">Select a programme</option><?php $all = new WP_Query( array( 'post_type' => 'conference', 'post_status' => 'publish', 'posts_per_page' => -1 ) ); while ( $all->have_posts() ) : $all->the_post(); ?><option value="<?php the_ID(); ?>"><?php the_title(); ?></option><?php endwhile; wp_reset_postdata(); ?></select></label><div class="form-grid"><label>Class 12 / Last %<input name="last_percent"></label><label>Your City*<input name="city" required></label></div><label>How can we help? (optional)<textarea name="message" rows="4"></textarea></label><input class="hp" name="website" tabindex="-1" autocomplete="off"><button class="btn btn--yellow" type="submit">Submit Now</button><p class="callback-note" data-callback-note>We’ll only use this to respond to your enquiry. No spam. No sharing.</p></form></div>
	</section>
</main>
<?php get_footer(); ?>
