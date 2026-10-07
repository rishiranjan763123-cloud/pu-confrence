/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./blocks-src/shared/CallbackForm.js"
/*!*******************************************!*\
  !*** ./blocks-src/shared/CallbackForm.js ***!
  \*******************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CallbackForm),
/* harmony export */   validate: () => (/* binding */ validate)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ConfSelect__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ConfSelect */ "./blocks-src/shared/ConfSelect.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__);




const EMPTY = {
  name: '',
  email: '',
  phone: '',
  conference: '',
  message: '',
  website: ''
};

/** Client-side checks. The server validates again, so these are only for fast feedback. */
function validate(v) {
  const e = {};
  if (v.name.trim().length < 2) {
    e.name = 'Enter your name.';
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim())) {
    e.email = 'Enter a valid email address.';
  }
  if (!/^[0-9+()\-\s]{7,20}$/.test(v.phone.trim())) {
    e.phone = 'Enter a valid phone number.';
  }
  if (v.message.length > 1000) {
    e.message = 'Keep your message under 1000 characters.';
  }
  return e;
}
function CallbackForm({
  preview = false
}) {
  const [v, setV] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(EMPTY);
  const [errors, setErrors] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)({});
  const [status, setStatus] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)('idle'); // idle | sending | done | error
  const [note, setNote] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)('');
  const formRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const set = key => e => setV(s => ({
    ...s,
    [key]: e.target.value
  }));
  const submit = async e => {
    e.preventDefault();
    if (preview || status === 'sending') {
      return;
    }
    const found = validate(v);
    setErrors(found);
    if (Object.keys(found).length) {
      const first = formRef.current.querySelector(`[name="${Object.keys(found)[0]}"]`);
      first && first.focus();
      return;
    }
    setStatus('sending');
    setNote('');
    try {
      const res = await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1___default()({
        path: '/pu/v1/callback',
        method: 'POST',
        data: v
      });
      setStatus('done');
      setNote(res.message || 'Thank you. We will call you back soon.');
      setV(EMPTY);
    } catch (err) {
      setStatus('error');
      setNote(err.message || 'Something went wrong. Please try again.');
      if (err.data && err.data.fields) {
        setErrors(err.data.fields);
      }
    }
  };
  const field = (key, label, props = {}) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
    className: "field",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("label", {
      htmlFor: `pu-cb-${key}`,
      children: label
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("input", {
      id: `pu-cb-${key}`,
      name: key,
      value: v[key],
      onChange: set(key),
      "aria-invalid": errors[key] ? 'true' : undefined,
      "aria-describedby": errors[key] ? `pu-cb-${key}-err` : undefined,
      required: true,
      ...props
    }), errors[key] && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("p", {
      className: "field__error",
      id: `pu-cb-${key}-err`,
      children: errors[key]
    })]
  });
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("form", {
    ref: formRef,
    className: "cb-form",
    onSubmit: submit,
    noValidate: true,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
      className: "cb-form__grid",
      children: [field('name', 'Full name', {
        autoComplete: 'name',
        maxLength: 80
      }), field('email', 'Email', {
        type: 'email',
        autoComplete: 'email'
      }), field('phone', 'Phone number', {
        type: 'tel',
        autoComplete: 'tel',
        maxLength: 20
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_ConfSelect__WEBPACK_IMPORTED_MODULE_2__.ConfSelect, {
        id: "pu-cb-conference",
        value: v.conference,
        onChange: id => setV(s => ({
          ...s,
          conference: id
        })),
        label: "Conference of interest"
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
      className: "field",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("label", {
        htmlFor: "pu-cb-message",
        children: "Message (optional)"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("textarea", {
        id: "pu-cb-message",
        name: "message",
        rows: "4",
        maxLength: "1000",
        value: v.message,
        onChange: set('message')
      }), errors.message && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("p", {
        className: "field__error",
        children: errors.message
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
      className: "hp",
      "aria-hidden": "true",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("label", {
        htmlFor: "pu-cb-website",
        children: "Leave this field empty"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("input", {
        id: "pu-cb-website",
        name: "website",
        tabIndex: "-1",
        autoComplete: "off",
        value: v.website,
        onChange: set('website')
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("button", {
      type: "submit",
      className: "btn btn--primary",
      disabled: status === 'sending' || preview,
      children: status === 'sending' ? 'Sending...' : 'Request a callback'
    }), preview && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("p", {
      className: "field__hint",
      children: "Form preview. It works on the live page."
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("p", {
      className: `cb-form__note cb-form__note--${status}`,
      role: status === 'error' ? 'alert' : 'status',
      children: note
    })]
  });
}

/***/ },

/***/ "./blocks-src/shared/ConfSelect.js"
/*!*****************************************!*\
  !*** ./blocks-src/shared/ConfSelect.js ***!
  \*****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ConfSelect: () => (/* binding */ ConfSelect),
/* harmony export */   "default": () => (/* binding */ EditionPicker)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./api */ "./blocks-src/shared/api.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__);



/** Dropdown of announced editions. onChange receives the conference id as a string. */

function ConfSelect({
  id,
  value,
  onChange,
  label = 'Select an announced edition',
  required = false
}) {
  const {
    items,
    loading,
    error
  } = (0,_api__WEBPACK_IMPORTED_MODULE_1__.useConferences)();
  const upcoming = items.filter(c => c.upcoming);
  const list = upcoming.length ? upcoming : items;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
    className: "field",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("label", {
      htmlFor: id,
      children: label
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("select", {
      id: id,
      value: value,
      required: required,
      onChange: e => onChange(e.target.value),
      disabled: loading || !!error,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("option", {
        value: "",
        children: loading ? 'Loading...' : 'Choose a conference'
      }), list.map(c => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("option", {
        value: String(c.id),
        children: c.title
      }, c.id))]
    }), error && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("p", {
      className: "field__error",
      role: "alert",
      children: "The list could not be loaded. Refresh the page."
    })]
  });
}

/** Dropdown plus a details panel for the chosen edition. */
function EditionPicker({
  label
}) {
  const {
    items
  } = (0,_api__WEBPACK_IMPORTED_MODULE_1__.useConferences)();
  const [value, setValue] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)('');
  const conf = items.find(c => String(c.id) === value);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
    className: "picker",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(ConfSelect, {
      id: "pu-pick",
      value: value,
      onChange: setValue,
      label: label
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
      className: "picker__out",
      "aria-live": "polite",
      children: conf && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("dl", {
        className: "picker__details",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("dt", {
            children: "Dates"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("dd", {
            children: (0,_api__WEBPACK_IMPORTED_MODULE_1__.fmtRange)(conf.start, conf.end) || 'To be announced'
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("dt", {
            children: "Location"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("dd", {
            children: [conf.venue, conf.location].filter(Boolean).join(', ') || 'To be announced'
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("dt", {
            children: "Abstract deadline"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("dd", {
            children: (0,_api__WEBPACK_IMPORTED_MODULE_1__.fmtDate)(conf.abstractDeadline) || 'To be announced'
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("dt", {
            children: "Paper deadline"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("dd", {
            children: (0,_api__WEBPACK_IMPORTED_MODULE_1__.fmtDate)(conf.paperDeadline) || 'To be announced'
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
          className: "picker__actions",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("a", {
            className: "btn btn--primary",
            href: conf.link,
            children: "View conference"
          }), conf.registrationUrl && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("a", {
            className: "btn btn--outline",
            href: conf.registrationUrl,
            children: "Register"
          })]
        })]
      })
    })]
  });
}

/***/ },

/***/ "./blocks-src/shared/api.js"
/*!**********************************!*\
  !*** ./blocks-src/shared/api.js ***!
  \**********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   byStart: () => (/* binding */ byStart),
/* harmony export */   digits: () => (/* binding */ digits),
/* harmony export */   filterConferences: () => (/* binding */ filterConferences),
/* harmony export */   fmtDate: () => (/* binding */ fmtDate),
/* harmony export */   fmtRange: () => (/* binding */ fmtRange),
/* harmony export */   mountAll: () => (/* binding */ mountAll),
/* harmony export */   normalise: () => (/* binding */ normalise),
/* harmony export */   parseDate: () => (/* binding */ parseDate),
/* harmony export */   useConferences: () => (/* binding */ useConferences)
/* harmony export */ });
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_html_entities__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/html-entities */ "@wordpress/html-entities");
/* harmony import */ var _wordpress_html_entities__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_html_entities__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__);



const digits = v => String(v ?? '').replace(/\D/g, '');

/** Parse "20270212" or "2027-02-12" into a local Date, or null if invalid. */
function parseDate(raw) {
  const d = digits(raw);
  if (d.length !== 8) {
    return null;
  }
  const y = Number(d.slice(0, 4));
  const m = Number(d.slice(4, 6));
  const day = Number(d.slice(6, 8));
  const date = new Date(y, m - 1, day);
  const valid = date.getFullYear() === y && date.getMonth() === m - 1 && date.getDate() === day;
  return valid ? date : null;
}
const DMY = {
  day: 'numeric',
  month: 'short',
  year: 'numeric'
};
const fmt = (d, o) => d.toLocaleDateString('en-GB', o);
function fmtDate(raw) {
  const d = parseDate(raw);
  return d ? fmt(d, DMY) : '';
}

/** "12-14 Feb 2027", "28 Feb - 2 Mar 2027" or a single date. */
function fmtRange(start, end) {
  const s = parseDate(start);
  const e = parseDate(end);
  if (!s) {
    return '';
  }
  if (!e || e.getTime() === s.getTime()) {
    return fmt(s, DMY);
  }
  if (s.getFullYear() === e.getFullYear()) {
    if (s.getMonth() === e.getMonth()) {
      return `${s.getDate()}\u2013${fmt(e, DMY)}`;
    }
    return `${fmt(s, {
      day: 'numeric',
      month: 'short'
    })} \u2013 ${fmt(e, DMY)}`;
  }
  return `${fmt(s, DMY)} \u2013 ${fmt(e, DMY)}`;
}
const plain = html => (0,_wordpress_html_entities__WEBPACK_IMPORTED_MODULE_1__.decodeEntities)(String(html || '').replace(/<[^>]*>/g, '')).trim();

/** Turn a REST conference object into a flat, safe object. */
function normalise(post, topicMap = {}, formatMap = {}) {
  const m = post.meta || {};
  return {
    id: post.id,
    title: plain(post.title && post.title.rendered),
    link: post.link,
    excerpt: plain(post.excerpt && post.excerpt.rendered),
    start: digits(m.start_date),
    end: digits(m.end_date),
    abstractDeadline: digits(m.abstract_deadline),
    paperDeadline: digits(m.paper_deadline),
    location: m.location || '',
    venue: m.venue || '',
    registrationUrl: m.registration_url || '',
    upcoming: Boolean(m.upcoming),
    topics: (post.conference_topic || []).map(id => topicMap[id]).filter(Boolean),
    formats: (post.conference_format || []).map(id => formatMap[id]).filter(Boolean)
  };
}

/** Sort by start date, undated last. */
const byStart = (a, b) => (a.start || '99999999').localeCompare(b.start || '99999999');

/** Search + filter helper used by the directory. */
function filterConferences(items, {
  q = '',
  topic = '',
  format = '',
  upcomingOnly = false
} = {}) {
  const needle = q.trim().toLowerCase();
  return items.filter(c => {
    if (upcomingOnly && !c.upcoming) {
      return false;
    }
    if (topic && !c.topics.includes(topic)) {
      return false;
    }
    if (format && !c.formats.includes(format)) {
      return false;
    }
    if (needle) {
      const hay = `${c.title} ${c.location} ${c.venue} ${c.topics.join(' ')}`.toLowerCase();
      return hay.includes(needle);
    }
    return true;
  });
}
let cache = null;
function load() {
  if (!cache) {
    const q = '_fields=id,title,link,excerpt,meta,conference_topic,conference_format';
    cache = Promise.all([_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
      path: `/wp/v2/conference?per_page=100&${q}`
    }), _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
      path: '/wp/v2/conference-topic?per_page=100&_fields=id,name'
    }), _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
      path: '/wp/v2/conference-format?per_page=100&_fields=id,name'
    })]).then(([posts, topics, formats]) => {
      const tMap = Object.fromEntries(topics.map(t => [t.id, (0,_wordpress_html_entities__WEBPACK_IMPORTED_MODULE_1__.decodeEntities)(t.name)]));
      const fMap = Object.fromEntries(formats.map(t => [t.id, (0,_wordpress_html_entities__WEBPACK_IMPORTED_MODULE_1__.decodeEntities)(t.name)]));
      return {
        items: posts.map(p => normalise(p, tMap, fMap)).sort(byStart),
        topics: Object.values(tMap).sort(),
        formats: Object.values(fMap).sort()
      };
    }).catch(err => {
      cache = null;
      throw err;
    });
  }
  return cache;
}

/** React hook: all conferences plus topic and format names. */
function useConferences() {
  const [state, setState] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)({
    items: [],
    topics: [],
    formats: [],
    loading: true,
    error: null
  });
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useEffect)(() => {
    let live = true;
    load().then(data => live && setState({
      ...data,
      loading: false,
      error: null
    })).catch(error => live && setState(s => ({
      ...s,
      loading: false,
      error
    })));
    return () => {
      live = false;
    };
  }, []);
  return state;
}

/** Mount a React component into every element matching `selector` on the front end. */
function mountAll(selector, renderFn) {
  const run = () => document.querySelectorAll(selector).forEach(el => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.createRoot)(el).render(renderFn(el)));
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
}

/***/ },

/***/ "react/jsx-runtime"
/*!**********************************!*\
  !*** external "ReactJSXRuntime" ***!
  \**********************************/
(module) {

module.exports = window["ReactJSXRuntime"];

/***/ },

/***/ "@wordpress/api-fetch"
/*!**********************************!*\
  !*** external ["wp","apiFetch"] ***!
  \**********************************/
(module) {

module.exports = window["wp"]["apiFetch"];

/***/ },

/***/ "@wordpress/element"
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
(module) {

module.exports = window["wp"]["element"];

/***/ },

/***/ "@wordpress/html-entities"
/*!**************************************!*\
  !*** external ["wp","htmlEntities"] ***!
  \**************************************/
(module) {

module.exports = window["wp"]["htmlEntities"];

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
/*!******************************************!*\
  !*** ./blocks-src/callback-form/view.js ***!
  \******************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _shared_CallbackForm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/CallbackForm */ "./blocks-src/shared/CallbackForm.js");
/* harmony import */ var _shared_api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/api */ "./blocks-src/shared/api.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__);



(0,_shared_api__WEBPACK_IMPORTED_MODULE_1__.mountAll)('.pu-live[data-pu="callback"]', () => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_shared_CallbackForm__WEBPACK_IMPORTED_MODULE_0__["default"], {}));
})();

/******/ })()
;
//# sourceMappingURL=view.js.map