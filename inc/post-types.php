<?php
/**
 * Conference post type, taxonomies, enquiry post type, REST meta, demo content.
 *
 * @package pu-conferences
 */

defined( 'ABSPATH' ) || exit;

/**
 * Conference meta keys exposed to the REST API (key => type).
 * Field names in inc/fields.php must match these keys.
 *
 * @return array
 */
function pu_conference_meta_keys() {
	return array(
		'start_date'        => 'string',
		'end_date'          => 'string',
		'location'          => 'string',
		'venue'             => 'string',
		'abstract_deadline' => 'string',
		'paper_deadline'    => 'string',
		'registration_url'  => 'string',
		'edition'           => 'string',
		'upcoming'          => 'boolean',
	);
}

/**
 * Register post types, taxonomies and meta.
 */
function pu_register_content_types() {
	register_post_type(
		'conference',
		array(
			'labels'       => array(
				'name'          => 'Conferences',
				'singular_name' => 'Conference',
				'add_new_item'  => 'Add new conference',
				'edit_item'     => 'Edit conference',
				'all_items'     => 'All conferences',
			),
			'public'       => true,
			'has_archive'  => false,
			'show_in_rest' => true,
			'menu_icon'    => 'dashicons-groups',
			'rewrite'      => array( 'slug' => 'conference' ),
			'supports'     => array( 'title', 'editor', 'thumbnail', 'excerpt' ),
		)
	);

	register_taxonomy(
		'conference_topic',
		'conference',
		array(
			'labels'            => array(
				'name'          => 'Topics',
				'singular_name' => 'Topic',
			),
			'hierarchical'      => true,
			'public'            => true,
			'show_in_rest'      => true,
			'rest_base'         => 'conference-topic',
			'show_admin_column' => true,
			'rewrite'           => array( 'slug' => 'topic' ),
		)
	);

	register_taxonomy(
		'conference_format',
		'conference',
		array(
			'labels'            => array(
				'name'          => 'Formats',
				'singular_name' => 'Format',
			),
			'hierarchical'      => false,
			'public'            => true,
			'show_in_rest'      => true,
			'rest_base'         => 'conference-format',
			'show_admin_column' => true,
			'rewrite'           => array( 'slug' => 'format' ),
		)
	);

	register_post_type(
		'pu_enquiry',
		array(
			'labels'       => array(
				'name'          => 'Enquiries',
				'singular_name' => 'Enquiry',
			),
			'public'       => false,
			'show_ui'      => true,
			'show_in_rest' => false,
			'menu_icon'    => 'dashicons-email-alt',
			'supports'     => array( 'title' ),
			'map_meta_cap' => true,
			'capabilities' => array( 'create_posts' => 'do_not_allow' ),
		)
	);

	foreach ( pu_conference_meta_keys() as $key => $type ) {
		if ( 'boolean' === $type ) {
			$sanitize = 'rest_sanitize_boolean';
		} elseif ( 'registration_url' === $key ) {
			$sanitize = 'esc_url_raw';
		} else {
			$sanitize = 'sanitize_text_field';
		}

		register_post_meta(
			'conference',
			$key,
			array(
				'single'            => true,
				'type'              => $type,
				'default'           => 'boolean' === $type ? false : '',
				'show_in_rest'      => true,
				'sanitize_callback' => $sanitize,
				'auth_callback'     => static function () {
					return current_user_can( 'edit_posts' );
				},
			)
		);
	}
}
add_action( 'init', 'pu_register_content_types' );

/**
 * Format a stored date (Ymd or Y-m-d) for display.
 *
 * @param string $raw Stored value.
 * @return string
 */
function pu_format_date( $raw ) {
	$digits = preg_replace( '/\D/', '', (string) $raw );
	if ( 8 !== strlen( $digits ) ) {
		return '';
	}
	$date = date_create_from_format( 'Ymd', $digits );
	return $date ? $date->format( 'j M Y' ) : '';
}

/**
 * Label => value pairs shown on a single conference page.
 *
 * @param int $post_id Conference ID.
 * @return array
 */
function pu_conference_details( $post_id ) {
	$get   = static function ( $key ) use ( $post_id ) {
		return get_post_meta( $post_id, $key, true );
	};
	$start = pu_format_date( $get( 'start_date' ) );
	$end   = pu_format_date( $get( 'end_date' ) );
	$rows  = array(
		'Dates'             => $start && $end && $start !== $end ? $start . ' to ' . $end : $start,
		'Location'          => trim( $get( 'venue' ) . ', ' . $get( 'location' ), ', ' ),
		'Abstract deadline' => pu_format_date( $get( 'abstract_deadline' ) ),
		'Paper deadline'    => pu_format_date( $get( 'paper_deadline' ) ),
	);
	return array_filter( $rows );
}

/**
 * Enquiry details box (read-only) on the enquiry edit screen.
 */
function pu_enquiry_meta_box() {
	add_meta_box(
		'pu-enquiry-details',
		'Enquiry details',
		static function ( $post ) {
			$rows = array(
				'pu_name'       => 'Name',
				'pu_email'      => 'Email',
				'pu_phone'      => 'Phone',
				'pu_conference' => 'Conference',
				'pu_message'    => 'Message',
			);
			echo '<table class="form-table" role="presentation"><tbody>';
			foreach ( $rows as $key => $label ) {
				printf(
					'<tr><th scope="row">%s</th><td>%s</td></tr>',
					esc_html( $label ),
					nl2br( esc_html( (string) get_post_meta( $post->ID, $key, true ) ) )
				);
			}
			echo '</tbody></table>';
		},
		'pu_enquiry',
		'normal',
		'high'
	);
}
add_action( 'add_meta_boxes', 'pu_enquiry_meta_box' );

/**
 * On theme activation: flush rewrite rules and add demo terms and conferences once.
 */
function pu_on_activation() {
	flush_rewrite_rules();

	$terms = array(
		'conference_topic'  => array(
			'ai-computing'          => 'AI & Computing',
			'sustainability'        => 'Sustainability',
			'health-life-sciences'  => 'Health & Life Sciences',
			'engineering'           => 'Engineering & Technology',
		),
		'conference_format' => array(
			'hybrid'    => 'Hybrid',
			'in-person' => 'In person',
			'online'    => 'Online',
		),
	);
	foreach ( $terms as $taxonomy => $list ) {
		foreach ( $list as $slug => $name ) {
			if ( ! term_exists( $slug, $taxonomy ) ) {
				wp_insert_term( $name, $taxonomy, array( 'slug' => $slug ) );
			}
		}
	}

	if ( get_option( 'pu_demo_seeded' ) ) {
		return;
	}

	$demo = array(
		array( 'International Conference on Applied AI and Machine Learning', 'ai-computing', 'hybrid', '20270212', '20270214', '20261120', '20261220' ),
		array( 'International Conference on Sustainable Energy Systems', 'sustainability', 'in-person', '20270318', '20270320', '20261215', '20270115' ),
		array( 'Global Summit on Digital Health and Life Sciences', 'health-life-sciences', 'in-person', '20270422', '20270423', '20270105', '20270201' ),
		array( 'International Conference on Smart Manufacturing and Robotics', 'engineering', 'online', '20270610', '20270612', '20270215', '20270315' ),
	);

	foreach ( $demo as $row ) {
		$post_id = wp_insert_post(
			array(
				'post_type'    => 'conference',
				'post_status'  => 'publish',
				'post_title'   => $row[0],
				'post_excerpt' => 'Sample conference entry. Edit or delete it from Conferences in the dashboard.',
				'post_content' => '<!-- wp:paragraph --><p>Sample conference entry. Replace this text with the programme, speakers and venue details.</p><!-- /wp:paragraph -->',
				'meta_input'   => array(
					'start_date'        => $row[3],
					'end_date'          => $row[4],
					'abstract_deadline' => $row[5],
					'paper_deadline'    => $row[6],
					'location'          => 'Vadodara, India',
					'venue'             => 'Parul University Campus',
					'edition'           => substr( $row[3], 0, 4 ),
					'upcoming'          => '1',
				),
			)
		);
		if ( $post_id && ! is_wp_error( $post_id ) ) {
			wp_set_object_terms( $post_id, $row[1], 'conference_topic' );
			wp_set_object_terms( $post_id, $row[2], 'conference_format' );
		}
	}
	update_option( 'pu_demo_seeded', 1 );
}
add_action( 'after_switch_theme', 'pu_on_activation' );
