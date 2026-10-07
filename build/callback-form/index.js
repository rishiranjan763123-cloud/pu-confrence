/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./blocks-src/callback-form/component.js"
/*!***********************************************!*\
  !*** ./blocks-src/callback-form/component.js ***!
  \***********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ View)
/* harmony export */ });
/* harmony import */ var _shared_ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/ui */ "./blocks-src/shared/ui.js");
/* harmony import */ var _shared_CallbackForm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/CallbackForm */ "./blocks-src/shared/CallbackForm.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__);



function View({
  editing,
  t
}) {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("section", {
    className: "pu-sec callback",
    id: "callback",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
      className: "wrap wrap--narrow",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_shared_ui__WEBPACK_IMPORTED_MODULE_0__.Heading, {
        kicker: t('kicker'),
        title: t('title'),
        sub: t('sub')
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
        className: "pu-live",
        "data-pu": "callback",
        children: editing ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_shared_CallbackForm__WEBPACK_IMPORTED_MODULE_1__["default"], {
          preview: true
        }) : null
      })]
    })
  });
}

/***/ },

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

/***/ "@wordpress/api-fetch"
/*!**********************************!*\
  !*** external ["wp","apiFetch"] ***!
  \**********************************/
(module) {

module.exports = window["wp"]["apiFetch"];

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

/***/ "@wordpress/html-entities"
/*!**************************************!*\
  !*** external ["wp","htmlEntities"] ***!
  \**************************************/
(module) {

module.exports = window["wp"]["htmlEntities"];

/***/ },

/***/ "./blocks-src/callback-form/block.json"
/*!*********************************************!*\
  !*** ./blocks-src/callback-form/block.json ***!
  \*********************************************/
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"pu/callback-form","title":"Callback Form (live)","category":"pu-conferences","icon":"phone","description":"Callback request form. Submissions are saved under Enquiries and emailed to the site admin.","attributes":{"kicker":{"type":"string","default":"Talk to us"},"title":{"type":"string","default":"Request a callback"},"sub":{"type":"string","default":"Leave your details and our conference team will call you back."}},"supports":{"anchor":true,"html":false},"editorScript":"file:./index.js","viewScript":"file:./view.js"}');

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
/*!*******************************************!*\
  !*** ./blocks-src/callback-form/index.js ***!
  \*******************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./block.json */ "./blocks-src/callback-form/block.json");
/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./component */ "./blocks-src/callback-form/component.js");
/* harmony import */ var _shared_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/ui */ "./blocks-src/shared/ui.js");



(0,_shared_ui__WEBPACK_IMPORTED_MODULE_2__.registerPU)(_block_json__WEBPACK_IMPORTED_MODULE_0__, _component__WEBPACK_IMPORTED_MODULE_1__["default"]);
})();

/******/ })()
;
//# sourceMappingURL=index.js.map