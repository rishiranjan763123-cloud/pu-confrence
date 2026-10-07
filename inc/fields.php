<?php
/**
 * "Conference Details" field group (Secure Custom Fields / ACF).
 * Field names must match pu_conference_meta_keys() in inc/post-types.php.
 *
 * @package pu-conferences
 */

defined( 'ABSPATH' ) || exit;

/**
 * Small helper to keep the field definitions short.
 *
 * @param string $name  Field name (meta key).
 * @param string $label Label.
 * @param string $type  Field type.
 * @param array  $extra Extra settings.
 * @return array
 */
function pu_field( $name, $label, $type = 'text', $extra = array() ) {
	return array_merge(
		array(
			'key'   => 'field_pu_' . $name,
			'name'  => $name,
			'label' => $label,
			'type'  => $type,
		),
		$extra
	);
}

function pu_register_field_group() {
	if ( ! function_exists( 'acf_add_local_field_group' ) ) {
		return;
	}

	$date = array(
		'display_format' => 'd/m/Y',
		'return_format'  => 'Ymd',
		'first_day'      => 1,
	);

	acf_add_local_field_group(
		array(
			'key'      => 'group_pu_conference_details',
			'title'    => 'Conference Details',
			'fields'   => array(
				pu_field( 'edition', 'Edition (for example 2027)' ),
				pu_field( 'start_date', 'Start date', 'date_picker', $date ),
				pu_field( 'end_date', 'End date', 'date_picker', $date ),
				pu_field( 'location', 'City and country' ),
				pu_field( 'venue', 'Venue' ),
				pu_field( 'abstract_deadline', 'Abstract deadline', 'date_picker', $date ),
				pu_field( 'paper_deadline', 'Full paper deadline', 'date_picker', $date ),
				pu_field( 'registration_url', 'Registration link', 'url' ),
				pu_field(
					'upcoming',
					'Show as upcoming',
					'true_false',
					array(
						'ui'            => 1,
						'default_value' => 1,
					)
				),
			),
			'location' => array(
				array(
					array(
						'param'    => 'post_type',
						'operator' => '==',
						'value'    => 'conference',
					),
				),
			),
		)
	);
}
add_action( 'acf/init', 'pu_register_field_group' );

/**
 * Remind admins to activate the fields plugin.
 */
function pu_fields_notice() {
	if ( function_exists( 'acf_add_local_field_group' ) || ! current_user_can( 'activate_plugins' ) ) {
		return;
	}
	echo '<div class="notice notice-warning"><p><strong>PU Conferences:</strong> install and activate the <em>Secure Custom Fields</em> plugin to edit conference dates, location and deadlines.</p></div>';
}
add_action( 'admin_notices', 'pu_fields_notice' );
