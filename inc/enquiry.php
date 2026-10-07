<?php
/**
 * Callback form REST endpoint: POST /wp-json/pu/v1/callback
 *
 * Protections: honeypot field, per-IP rate limit, strict sanitising, no raw HTML stored.
 *
 * @package pu-conferences
 */

defined( 'ABSPATH' ) || exit;

function pu_register_enquiry_route() {
	register_rest_route(
		'pu/v1',
		'/callback',
		array(
			'methods'             => WP_REST_Server::CREATABLE,
			'callback'            => 'pu_handle_enquiry',
			'permission_callback' => '__return_true',
		)
	);
}
add_action( 'rest_api_init', 'pu_register_enquiry_route' );

/**
 * Handle a callback request.
 *
 * @param WP_REST_Request $request Request.
 * @return WP_REST_Response|WP_Error
 */
function pu_handle_enquiry( WP_REST_Request $request ) {
	$ok = rest_ensure_response(
		array(
			'ok'      => true,
			'message' => 'Thank you. We will call you back soon.',
		)
	);

	// Honeypot: bots fill hidden fields. Pretend success and stop.
	if ( '' !== trim( (string) $request->get_param( 'website' ) ) ) {
		return $ok;
	}

	// Rate limit: 5 requests per hour per IP.
	$ip  = isset( $_SERVER['REMOTE_ADDR'] ) ? sanitize_text_field( wp_unslash( $_SERVER['REMOTE_ADDR'] ) ) : 'unknown';
	$key = 'pu_rl_' . md5( $ip );
	$hit = (int) get_transient( $key );
	if ( $hit >= 5 ) {
		return new WP_Error( 'pu_rate_limited', 'Too many requests. Please try again later.', array( 'status' => 429 ) );
	}
	set_transient( $key, $hit + 1, HOUR_IN_SECONDS );

	$name    = sanitize_text_field( (string) $request->get_param( 'name' ) );
	$email   = sanitize_email( (string) $request->get_param( 'email' ) );
	$phone   = sanitize_text_field( (string) $request->get_param( 'phone' ) );
	$message = sanitize_textarea_field( (string) $request->get_param( 'message' ) );
	$conf_id = absint( $request->get_param( 'conference' ) );

	$errors = array();
	if ( strlen( $name ) < 2 || strlen( $name ) > 80 ) {
		$errors['name'] = 'Enter your name (2 to 80 characters).';
	}
	if ( ! is_email( $email ) ) {
		$errors['email'] = 'Enter a valid email address.';
	}
	if ( ! preg_match( '/^[0-9+()\-\s]{7,20}$/', $phone ) ) {
		$errors['phone'] = 'Enter a valid phone number.';
	}
	if ( strlen( $message ) > 1000 ) {
		$errors['message'] = 'Keep your message under 1000 characters.';
	}
	if ( $errors ) {
		return new WP_Error( 'pu_invalid', 'Please fix the highlighted fields.', array( 'status' => 400, 'fields' => $errors ) );
	}

	$conference = '';
	if ( $conf_id && 'conference' === get_post_type( $conf_id ) ) {
		$conference = get_the_title( $conf_id );
	}

	$post_id = wp_insert_post(
		array(
			'post_type'   => 'pu_enquiry',
			'post_status' => 'publish',
			'post_title'  => $name . ( $conference ? ' - ' . $conference : '' ),
			'meta_input'  => array(
				'pu_name'       => $name,
				'pu_email'      => $email,
				'pu_phone'      => $phone,
				'pu_conference' => $conference,
				'pu_message'    => $message,
			),
		),
		true
	);
	if ( is_wp_error( $post_id ) ) {
		return new WP_Error( 'pu_save_failed', 'We could not save your request. Please try again.', array( 'status' => 500 ) );
	}

	$body = "Name: {$name}\nEmail: {$email}\nPhone: {$phone}\nConference: {$conference}\n\n{$message}\n";
	wp_mail(
		get_option( 'admin_email' ),
		'New callback request from ' . wp_strip_all_tags( $name ),
		$body,
		array( 'Reply-To: ' . $email )
	);

	return $ok;
}
