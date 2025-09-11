/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./app/public/script/editCollection/main.js":
/*!**************************************************!*\
  !*** ./app/public/script/editCollection/main.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/dom */ \"./app/public/script/editCollection/modules/dom.js\");\n/* harmony import */ var _modules_eventHandler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/eventHandler */ \"./app/public/script/editCollection/modules/eventHandler.js\");\n/* harmony import */ var _modules_collection__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/collection */ \"./app/public/script/editCollection/modules/collection.js\");\n/* harmony import */ var _modules_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/data */ \"./app/public/script/editCollection/modules/data.js\");\n\n\n\n\n\nconst init = async () => {\n    const path = window.location.pathname;\n    (0,_modules_data__WEBPACK_IMPORTED_MODULE_3__.setCollectionExists)((0,_modules_collection__WEBPACK_IMPORTED_MODULE_2__.checkIfExists)(path));\n\n    if (_modules_data__WEBPACK_IMPORTED_MODULE_3__.collectionExists) {\n        (0,_modules_data__WEBPACK_IMPORTED_MODULE_3__.setCollectionID)(((0,_modules_collection__WEBPACK_IMPORTED_MODULE_2__.getId)(path)));\n        //await getEntriesData(collectionID);\n    }\n\n    _modules_dom__WEBPACK_IMPORTED_MODULE_0__[\"default\"].collectionForm.addEventListener('submit', _modules_eventHandler__WEBPACK_IMPORTED_MODULE_1__.handleCollectionSubmit);\n}\n\ninit();\n\n//# sourceURL=webpack://decupla/./app/public/script/editCollection/main.js?");

/***/ }),

/***/ "./app/public/script/editCollection/modules/api.js":
/*!*********************************************************!*\
  !*** ./app/public/script/editCollection/modules/api.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   saveCollection: () => (/* binding */ saveCollection)\n/* harmony export */ });\nconst saveCollection = async (url, method, data) => {\n    const response = await fetch(url, {\n        method,\n        headers: { 'Content-Type': 'application/json' },\n        body: JSON.stringify(data),\n    });\n    return response.json();\n};\n\n//# sourceURL=webpack://decupla/./app/public/script/editCollection/modules/api.js?");

/***/ }),

/***/ "./app/public/script/editCollection/modules/collection.js":
/*!****************************************************************!*\
  !*** ./app/public/script/editCollection/modules/collection.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   checkIfExists: () => (/* binding */ checkIfExists),\n/* harmony export */   getId: () => (/* binding */ getId)\n/* harmony export */ });\nconst checkIfExists = (path) => {\n    const regex = /^\\/collections\\/edit\\/(\\d+)$/;\n    return regex.test(path);\n}\n\nconst getId = (path) => {\n    const parts = path.split(\"/\");\n    const id = parts[parts.length - 1];\n    return parseInt(id);\n}\n\n//# sourceURL=webpack://decupla/./app/public/script/editCollection/modules/collection.js?");

/***/ }),

/***/ "./app/public/script/editCollection/modules/data.js":
/*!**********************************************************!*\
  !*** ./app/public/script/editCollection/modules/data.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   collectionExists: () => (/* binding */ collectionExists),\n/* harmony export */   collectionID: () => (/* binding */ collectionID),\n/* harmony export */   setCollectionExists: () => (/* binding */ setCollectionExists),\n/* harmony export */   setCollectionID: () => (/* binding */ setCollectionID)\n/* harmony export */ });\n// tells if we are editing a existing collection\nlet collectionExists;\n// if we are editing a existing collection,the id of the collection will be stored here\nlet collectionID;\n\nconst setCollectionExists = (value) => collectionExists = value;\nconst setCollectionID = (id) => collectionID = id;\n\n//# sourceURL=webpack://decupla/./app/public/script/editCollection/modules/data.js?");

/***/ }),

/***/ "./app/public/script/editCollection/modules/dom.js":
/*!*********************************************************!*\
  !*** ./app/public/script/editCollection/modules/dom.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst DOM = {\n    collectionForm: document.querySelector('#collection-form'),\n    messageSuccess: document.querySelector('#message-saved')\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DOM);\n\n//# sourceURL=webpack://decupla/./app/public/script/editCollection/modules/dom.js?");

/***/ }),

/***/ "./app/public/script/editCollection/modules/eventHandler.js":
/*!******************************************************************!*\
  !*** ./app/public/script/editCollection/modules/eventHandler.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   handleCollectionSubmit: () => (/* binding */ handleCollectionSubmit)\n/* harmony export */ });\n/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom */ \"./app/public/script/editCollection/modules/dom.js\");\n/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./api */ \"./app/public/script/editCollection/modules/api.js\");\n/* harmony import */ var _validation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./validation */ \"./app/public/script/editCollection/modules/validation.js\");\n/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./data */ \"./app/public/script/editCollection/modules/data.js\");\n\n\n\n\n\nconst handleCollectionSubmit = async (event) => {\n    event.preventDefault();\n    (0,_validation__WEBPACK_IMPORTED_MODULE_2__.resetMessages)();\n\n    const formData = new FormData(event.target);\n    const data = Object.fromEntries(formData.entries());\n\n    let url = '/collections';\n    let method = 'POST';\n\n    if (_data__WEBPACK_IMPORTED_MODULE_3__.collectionExists) {\n        method = \"PUT\";\n        url = `/collections/${_data__WEBPACK_IMPORTED_MODULE_3__.collectionID}`;\n    }\n\n    try {\n        const response = await (0,_api__WEBPACK_IMPORTED_MODULE_1__.saveCollection)(url, method, data)\n        console.log(response);\n\n        if (!response.validation) {\n            const messages = response.messages;\n\n            for (const [field, message] of Object.entries(messages)) {\n                (0,_validation__WEBPACK_IMPORTED_MODULE_2__.setFieldMessage)(field, message, true);\n            }\n\n            return;\n        } else if (response.success) {\n            (0,_validation__WEBPACK_IMPORTED_MODULE_2__.showSuccessMessage)();\n\n            if (!_data__WEBPACK_IMPORTED_MODULE_3__.collectionExists) {\n                (0,_data__WEBPACK_IMPORTED_MODULE_3__.setCollectionID)(response.newID);\n                (0,_data__WEBPACK_IMPORTED_MODULE_3__.setCollectionExists)(true);\n            }\n        } else {\n            console.error('Something went wrong while trying to save the block');\n        }\n    } catch (error) {\n        console.error('Something went wrong:', error);\n    }\n}\n\n//# sourceURL=webpack://decupla/./app/public/script/editCollection/modules/eventHandler.js?");

/***/ }),

/***/ "./app/public/script/editCollection/modules/validation.js":
/*!****************************************************************!*\
  !*** ./app/public/script/editCollection/modules/validation.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   resetMessages: () => (/* binding */ resetMessages),\n/* harmony export */   setFieldMessage: () => (/* binding */ setFieldMessage),\n/* harmony export */   showSuccessMessage: () => (/* binding */ showSuccessMessage)\n/* harmony export */ });\n/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom */ \"./app/public/script/editCollection/modules/dom.js\");\n\n\nconst setFieldMessage = (field, message, blockForm = false) => {\n    let fieldMessageElement;\n    if (blockForm) {\n        fieldMessageElement = document.querySelector(`#message-${field}`);\n    } else {\n        fieldMessageElement = submittedForm.querySelector(`.message-${field}`);\n    }\n\n    if (fieldMessageElement) {\n        fieldMessageElement.innerText = message;\n        fieldMessageElement.classList.add('visible');\n    } else {\n        console.log(`Field \"${field}\" does not exist.`);\n    }\n};\n\nconst resetMessages = () => {\n    const messages = document.querySelectorAll('.error-message');\n\n    messages.forEach((message) => {\n        message.innerText = \"\";\n        if (message.classList.contains('visible')) {\n            message.classList.remove('visible');\n        }\n    })\n}\n\nconst showSuccessMessage = () => {\n    _dom__WEBPACK_IMPORTED_MODULE_0__[\"default\"].messageSuccess.classList.remove('visible');\n    void _dom__WEBPACK_IMPORTED_MODULE_0__[\"default\"].messageSuccess.offsetWidth;\n    _dom__WEBPACK_IMPORTED_MODULE_0__[\"default\"].messageSuccess.classList.add('visible');\n}\n\n//# sourceURL=webpack://decupla/./app/public/script/editCollection/modules/validation.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./app/public/script/editCollection/main.js");
/******/ 	
/******/ })()
;