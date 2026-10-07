/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./blocks-src/faq/component.js"
/*!*************************************!*\
  !*** ./blocks-src/faq/component.js ***!
  \*************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ View)
/* harmony export */ });
/* harmony import */ var _shared_ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/ui */ "./blocks-src/shared/ui.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);


function View({
  a,
  set,
  editing,
  t
}) {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("section", {
    className: "pu-sec pu-sec--alt faq",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
      className: "wrap wrap--narrow",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_shared_ui__WEBPACK_IMPORTED_MODULE_0__.Heading, {
        kicker: t('kicker'),
        title: t('title'),
        sub: t('sub')
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_shared_ui__WEBPACK_IMPORTED_MODULE_0__.Repeater, {
        items: a.items,
        set: items => set({
          items
        }),
        editing: editing,
        noun: "question",
        className: "faq__list",
        blank: {
          q: 'New question',
          a: 'Answer'
        },
        children: (it, i, f, tools) => editing ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
          className: "faq__item faq__item--edit",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_shared_ui__WEBPACK_IMPORTED_MODULE_0__.T, {
            tag: "h3",
            className: "faq__q",
            ...f('q')
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_shared_ui__WEBPACK_IMPORTED_MODULE_0__.T, {
            tag: "p",
            className: "faq__a",
            ...f('a')
          }), tools]
        }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("details", {
          className: "faq__item",
          name: "pu-faq",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("summary", {
            className: "faq__q",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_shared_ui__WEBPACK_IMPORTED_MODULE_0__.T, {
              tag: "span",
              ...f('q')
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_shared_ui__WEBPACK_IMPORTED_MODULE_0__.T, {
            tag: "p",
            className: "faq__a",
            ...f('a')
          })]
        })
      })]
    })
  });
}

/***/ },

/***/ "./blocks-src/shared/ui.js"
/*!*********************************!*\
  !*** ./blocks-src/shared/ui.js ***!
  \*********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Btn: () => (/* binding */ Btn),
/* harmony export */   Heading: () => (/* binding */ Heading),
/* harmony export */   Img: () => (/* binding */ Img),
/* harmony export */   Panel: () => (/* binding */ Panel),
/* harmony export */   Repeater: () => (/* binding */ Repeater),
/* harmony export */   T: () => (/* binding */ T),
/* harmony export */   TitleLink: () => (/* binding */ TitleLink),
/* harmony export */   UrlControl: () => (/* binding */ UrlControl),
/* harmony export */   UrlField: () => (/* binding */ UrlField),
/* harmony export */   fieldsFor: () => (/* binding */ fieldsFor),
/* harmony export */   registerPU: () => (/* binding */ registerPU),
/* harmony export */   safeUrl: () => (/* binding */ safeUrl)
/* harmony export */ });
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__);





const noop = () => {};

/** Only allow safe URL schemes in saved markup. */
function safeUrl(url) {
  return /^(https?:|mailto:|tel:|\/|#)/i.test(url || '') ? url : '#';
}

/** Build the `t( 'field' )` helper that returns props for <T />. */
const fieldsFor = (a, set, editing) => (key, placeholder) => ({
  value: a[key],
  onChange: v => set({
    [key]: v
  }),
  editing,
  placeholder
});
const hasContent = p => p && (p.editing || p.value);

/** Editable rich text in the editor, plain HTML on the front end. */
function T({
  tag = 'span',
  value,
  onChange,
  editing,
  placeholder,
  className
}) {
  if (editing) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.RichText, {
      tagName: tag,
      className: className,
      value: value || '',
      onChange: onChange,
      placeholder: placeholder || 'Type here',
      allowedFormats: ['core/bold', 'core/italic', 'core/link']
    });
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.RichText.Content, {
    tagName: tag,
    className: className,
    value: value || ''
  });
}

/** Title that becomes a link on the front end when a URL is set. */
function TitleLink({
  tag = 'h3',
  className,
  text,
  url
}) {
  if (text.editing || !url) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(T, {
      tag: tag,
      className: className,
      ...text
    });
  }
  const Tag = tag;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(Tag, {
    className: className,
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("a", {
      href: safeUrl(url),
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.RichText.Content, {
        value: text.value || ''
      })
    })
  });
}

/** Section heading: kicker, title, optional sub line. */
function Heading({
  kicker,
  title,
  sub
}) {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("header", {
    className: "sec-head",
    children: [hasContent(kicker) && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(T, {
      tag: "p",
      className: "sec-head__kicker",
      ...kicker
    }), hasContent(title) && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(T, {
      tag: "h2",
      className: "sec-head__title",
      ...title
    }), hasContent(sub) && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(T, {
      tag: "p",
      className: "sec-head__sub",
      ...sub
    })]
  });
}

/** Button: label is editable in the editor, link is a normal <a> on the front end. */
function Btn({
  text,
  url,
  className = 'btn btn--primary',
  editing
}) {
  if (editing) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("span", {
      className: className,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(T, {
        ...text
      })
    });
  }
  if (!text.value) {
    return null;
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("a", {
    className: className,
    href: safeUrl(url),
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.RichText.Content, {
      value: text.value
    })
  });
}

/** Inline URL box, only visible in the editor. */
function UrlField({
  value,
  onChange,
  editing,
  label = 'Link URL'
}) {
  if (!editing) {
    return null;
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("input", {
    type: "url",
    className: "pu-urlfield",
    "aria-label": label,
    placeholder: "Link: https://...",
    value: value || '',
    onChange: e => onChange(e.target.value)
  });
}

/** Image: <img> on the front end, picker button in the editor. */
function Img({
  img,
  onChange,
  editing,
  className = ''
}) {
  const url = img && img.url;
  if (!editing) {
    return url ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("img", {
      className: className,
      src: url,
      alt: img.alt || '',
      loading: "lazy",
      decoding: "async"
    }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
      className: `${className} img-ph`,
      "aria-hidden": "true"
    });
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
    className: `${className} img-edit`,
    children: [url ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("img", {
      src: url,
      alt: img.alt || ''
    }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
      className: "img-ph"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.MediaUploadCheck, {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.MediaUpload, {
        allowedTypes: ['image'],
        value: img && img.id,
        onSelect: m => onChange({
          id: m.id,
          url: m.url,
          alt: m.alt || ''
        }),
        render: ({
          open
        }) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
          variant: "secondary",
          className: "img-edit__btn",
          onClick: open,
          children: url ? 'Replace image' : 'Choose image'
        })
      })
    })]
  });
}

/** Sidebar panel wrapper. */
function Panel({
  title,
  children,
  open = true
}) {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InspectorControls, {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
      title: title,
      initialOpen: open,
      children: children
    })
  });
}

/** Sidebar URL input. */
function UrlControl({
  label,
  value,
  onChange
}) {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
    __nextHasNoMarginBottom: true,
    __next40pxDefaultSize: true,
    label: label,
    type: "url",
    value: value || '',
    onChange: onChange,
    help: "Use https://..., /page or #section"
  });
}

/**
 * Editable list. Children is a render function:
 * ( item, index, f, tools, patch ) => JSX
 * f( 'key' ) gives <T /> props for that item field, patch( {k: v} ) updates the item.
 */
function Repeater({
  items = [],
  set,
  editing,
  noun = 'item',
  blank = {},
  className = '',
  tag = 'div',
  children
}) {
  const Wrap = tag;
  const update = (i, patch) => set(items.map((it, n) => n === i ? {
    ...it,
    ...patch
  } : it));
  const remove = i => set(items.filter((_, n) => n !== i));
  const move = (i, d) => {
    const j = i + d;
    if (j < 0 || j >= items.length) {
      return;
    }
    const next = [...items];
    [next[i], next[j]] = [next[j], next[i]];
    set(next);
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(Wrap, {
      className: className,
      children: items.map((it, i) => {
        const f = (key, placeholder) => ({
          value: it[key],
          onChange: v => update(i, {
            [key]: v
          }),
          editing,
          placeholder
        });
        const tools = editing ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("span", {
          className: "pu-tools",
          contentEditable: false,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("button", {
            type: "button",
            "aria-label": `Move ${noun} up`,
            onClick: () => move(i, -1),
            children: "\u2191"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("button", {
            type: "button",
            "aria-label": `Move ${noun} down`,
            onClick: () => move(i, 1),
            children: "\u2193"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("button", {
            type: "button",
            "aria-label": `Remove ${noun}`,
            onClick: () => remove(i),
            children: "\xD7"
          })]
        }) : null;
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.Fragment, {
          children: children(it, i, f, tools, patch => update(i, patch))
        }, i);
      })
    }), editing && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
      variant: "secondary",
      className: "pu-add",
      onClick: () => set([...items, {
        ...blank
      }]),
      children: `Add ${noun}`
    })]
  });
}

/**
 * Register a block. View renders the same markup in the editor and in saved content.
 * options.inspector: component for sidebar controls, receives { a, set }.
 */
function registerPU(metadata, View, {
  inspector: Inspector
} = {}) {
  function Edit({
    attributes,
    setAttributes
  }) {
    const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps)();
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
      ...blockProps,
      children: [Inspector && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(Inspector, {
        a: attributes,
        set: setAttributes
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(View, {
        a: attributes,
        set: setAttributes,
        editing: true,
        t: fieldsFor(attributes, setAttributes, true)
      })]
    });
  }
  function Save({
    attributes
  }) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
      ..._wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps.save(),
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(View, {
        a: attributes,
        set: noop,
        editing: false,
        t: fieldsFor(attributes, noop, false)
      })
    });
  }
  ;(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)(metadata.name, {
    edit: Edit,
    save: Save
  });
}

/***/ },

/***/ "react/jsx-runtime"
/*!**********************************!*\
  !*** external "ReactJSXRuntime" ***!
  \**********************************/
(module) {

module.exports = window["ReactJSXRuntime"];

/***/ },

/***/ "@wordpress/block-editor"
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
(module) {

module.exports = window["wp"]["blockEditor"];

/***/ },

/***/ "@wordpress/blocks"
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
(module) {

module.exports = window["wp"]["blocks"];

/***/ },

/***/ "@wordpress/components"
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
(module) {

module.exports = window["wp"]["components"];

/***/ },

/***/ "@wordpress/element"
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
(module) {

module.exports = window["wp"]["element"];

/***/ },

/***/ "./blocks-src/faq/block.json"
/*!***********************************!*\
  !*** ./blocks-src/faq/block.json ***!
  \***********************************/
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"pu/faq","title":"FAQ","category":"pu-conferences","icon":"editor-help","description":"Accordion of questions and answers. Works without JavaScript.","attributes":{"kicker":{"type":"string","default":"Questions"},"title":{"type":"string","default":"Frequently asked questions"},"sub":{"type":"string","default":""},"items":{"type":"array","default":[{"q":"Who can submit a paper?","a":"Faculty, researchers, industry professionals and students can submit original work."},{"q":"Can I attend online?","a":"Hybrid and online editions offer live streaming and recorded sessions. Check the format on each conference card."},{"q":"Are papers published?","a":"Accepted and presented papers are included in the conference proceedings."},{"q":"How do I register?","a":"Open the conference page and use its registration link, or request a callback and we will help."},{"q":"Is there a fee waiver for students?","a":"Reduced rates are listed on each registration page."}]}},"supports":{"anchor":true,"html":false},"editorScript":"file:./index.js"}');

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	const __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		const cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		const module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			const e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = (module) => {
/******/ 		const getter = module && module.__esModule ?
/******/ 			() => (module['default']) :
/******/ 			() => (module);
/******/ 		__webpack_require__.d(getter, { a: getter });
/******/ 		return getter;
/******/ 	};
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	// define getter/value functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	__webpack_require__.o = (obj, prop) => (Object.hasOwn(obj, prop));
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = (exports) => {
/******/ 		Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ 	
/************************************************************************/
let __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!*********************************!*\
  !*** ./blocks-src/faq/index.js ***!
  \*********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./block.json */ "./blocks-src/faq/block.json");
/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./component */ "./blocks-src/faq/component.js");
/* harmony import */ var _shared_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/ui */ "./blocks-src/shared/ui.js");



(0,_shared_ui__WEBPACK_IMPORTED_MODULE_2__.registerPU)(_block_json__WEBPACK_IMPORTED_MODULE_0__, _component__WEBPACK_IMPORTED_MODULE_1__["default"]);
})();

/******/ })()
;
//# sourceMappingURL=index.js.map