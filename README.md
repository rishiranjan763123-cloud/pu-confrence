# PU Conferences (WordPress theme)

Custom theme with 11 React-based Gutenberg blocks, a `conference` post type, and a callback form that stores enquiries.

## Setup (LocalWP + VS Code)

1. Create a site in LocalWP and put this folder at `wp-content/themes/pu-conferences/`.
2. In `wp-config.php` (before "That's all, stop editing!") add:
   ```php
   define( 'WP_DEBUG', true );
   define( 'WP_DEBUG_LOG', true );
   define( 'WP_DEBUG_DISPLAY', false );
   define( 'SCRIPT_DEBUG', true );
   ```
3. In the theme folder run `npm install`, then `npm start` (watch mode) or `npm run build`.
4. WP Admin: install and activate **Secure Custom Fields**, activate the **PU Conferences** theme, then Settings > Permalinks > Post name > Save.
5. Activating the theme adds topics, formats and 4 sample conferences. Edit them under Conferences.
6. Create a page, add the blocks from the **PU Conferences** group, publish, and set it as the front page.
7. Appearance > Menus: create a menu and assign it to "Primary menu".

## Commands

| Command | What it does |
| --- | --- |
| `npm start` | Rebuild blocks on every save |
| `npm run build` | Production build into `build/` |
| `npm test` | Unit tests for the date and filter helpers |
| `npm run lint:js` | Lint the block source |

## Where to change things

| Change | File |
| --- | --- |
| Colours, fonts, radius | `assets/css/global.css` (`:root`) |
| Block markup | `blocks-src/<block>/component.js` |
| Default text and fields | `blocks-src/<block>/block.json` |
| Sidebar controls | `blocks-src/<block>/index.js` |
| Conference fields | `inc/fields.php` and `inc/post-types.php` |
| Callback form saving and email | `inc/enquiry.php` |



