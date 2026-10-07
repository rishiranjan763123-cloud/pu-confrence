<?php
/**
 * PU Conferences theme bootstrap.
 *
 * @package pu-conferences
 */

defined( 'ABSPATH' ) || exit;

define( 'PU_DIR', get_template_directory() );
define( 'PU_URI', get_template_directory_uri() );

require_once PU_DIR . '/inc/post-types.php';
require_once PU_DIR . '/inc/fields.php';
require_once PU_DIR . '/inc/enquiry.php';

/**
 * File-based cache buster: changes whenever the file changes.
 *
 * @param string $relative Path relative to the theme root.
 * @return string
 */
function pu_ver( $relative ) {
	$file = PU_DIR . '/' . ltrim( $relative, '/' );
	return file_exists( $file ) ? (string) filemtime( $file ) : '1.0.0';
}

/**
 * Theme supports and menus.
 */
function pu_setup() {
	add_theme_support( 'title-tag' );
	add_theme_support( 'post-thumbnails' );
	add_theme_support( 'responsive-embeds' );
	add_theme_support( 'align-wide' );
	add_theme_support( 'custom-background', array( 'default-color' => 'ffffff' ) );
	add_theme_support( 'editor-styles' );
	add_theme_support(
		'html5',
		array( 'search-form', 'gallery', 'caption', 'style', 'script' )
	);
	add_theme_support(
		'custom-logo',
		array(
			'height'      => 48,
			'width'       => 180,
			'flex-width'  => true,
			'flex-height' => true,
		)
	);
	add_editor_style( 'assets/css/global.css' );

	register_nav_menus(
		array(
			'primary' => 'Primary menu',
			'footer'  => 'Footer menu',
		)
	);
}
add_action( 'after_setup_theme', 'pu_setup' );

/**
 * Front-end CSS and JS.
 */
function pu_enqueue_assets() {
	wp_enqueue_style( 'pu-global', PU_URI . '/assets/css/global.css', array(), pu_ver( 'assets/css/global.css' ) );
	wp_enqueue_script(
		'pu-front',
		PU_URI . '/assets/js/front.js',
		array(),
		pu_ver( 'assets/js/front.js' ),
		array(
			'in_footer' => true,
			'strategy'  => 'defer',
		)
	);
}
add_action( 'wp_enqueue_scripts', 'pu_enqueue_assets' );

/**
 * Add a "PU Conferences" group to the block inserter.
 *
 * @param array $categories Existing block categories.
 * @return array
 */
function pu_block_category( $categories ) {
	array_unshift(
		$categories,
		array(
			'slug'  => 'pu-conferences',
			'title' => 'PU Conferences',
		)
	);
	return $categories;
}
add_filter( 'block_categories_all', 'pu_block_category' );

/**
 * Register every compiled block found in /build.
 */
function pu_register_blocks() {
	$files = glob( PU_DIR . '/build/*/block.json' );
	if ( ! $files ) {
		return;
	}
	foreach ( $files as $file ) {
		register_block_type( dirname( $file ) );
	}
}
add_action( 'init', 'pu_register_blocks' );

/**
 * Tell admins when the blocks have not been compiled yet.
 */
function pu_build_notice() {
	if ( ! current_user_can( 'edit_theme_options' ) || glob( PU_DIR . '/build/*/block.json' ) ) {
		return;
	}
	echo '<div class="notice notice-warning"><p><strong>PU Conferences:</strong> blocks are not built yet. Run <code>npm install</code> and <code>npm run build</code> inside the theme folder.</p></div>';
}
add_action( 'admin_notices', 'pu_build_notice' );

/**
 * Fallback menu: top-level pages.
 */
function pu_menu_fallback() {
	echo '<ul class="nav__list">';
	wp_list_pages(
		array(
			'title_li' => '',
			'depth'    => 1,
		)
	);
	echo '</ul>';
}
