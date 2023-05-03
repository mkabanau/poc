"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkmf"] = self["webpackChunkmf"] || []).push([["src_CoursesMF_tsx"],{

/***/ "./src/CoursesMF.tsx":
/*!***************************!*\
  !*** ./src/CoursesMF.tsx ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ CoursesMF)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"webpack/sharing/consume/default/react/react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router/index.js\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router-dom/index.js\");\n\n // export default function CoursesMF() {\n//     // These routes are defined when this component is loaded on demand via\n//     // dynamic import() on the home page!\n//     return (\n//         <Routes>\n//             <Route path=\"/\" element={<CoursesLayout />}>\n//                 <Route index element={<CoursesIndex />} />\n//                 <Route path=\":id\" element={<Course />} />\n//             </Route>\n//         </Routes>\n//     );\n// }\n\nfunction CoursesMF() {\n  // These routes are defined when this component is loaded on demand via\n  // dynamic import() on the home page!\n  return (\n    /*#__PURE__*/\n    // <BrowserRouter>\n    react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__.Routes, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__.Route, {\n      path: \"/courses\",\n      element: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(CoursesLayout, null)\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__.Route, {\n      index: true,\n      element: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(CoursesIndex, null)\n    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__.Route, {\n      path: \":id\",\n      element: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Course, null)\n    }))) //</BrowserRouter>\n\n  );\n}\n\nfunction CoursesIndex() {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"div\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"p\", null, \"Please choose a course:\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"nav\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"ul\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"li\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__.Link, {\n    to: \"react-fundamentals\"\n  }, \"React Fundamentals\")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"li\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__.Link, {\n    to: \"advanced-react\"\n  }, \"Advanced React\")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"li\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__.Link, {\n    to: \"react-router\"\n  }, \"React Router\")))));\n}\n\nfunction Course() {\n  let {\n    id\n  } = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_1__.useParams)();\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"div\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"h2\", null, \"Welcome to the \", id.split(\"-\").map(capitalizeString).join(\" \"), \" course!\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"p\", null, \"This is a great course. You're gonna love it!\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__.Link, {\n    to: \"/courses\"\n  }, \"See all courses\"));\n}\n\nfunction capitalizeString(s) {\n  return s.charAt(0).toUpperCase() + s.slice(1);\n}\n\nfunction CoursesLayout() {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__.Outlet, null);\n}\n\n//# sourceURL=webpack://mf/./src/CoursesMF.tsx?");

/***/ })

}]);