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

/***/ "./public/script/editMenu/main.js":
/*!****************************************!*\
  !*** ./public/script/editMenu/main.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/dom */ \"./public/script/editMenu/modules/dom.js\");\n/* harmony import */ var _modules_menu__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/menu */ \"./public/script/editMenu/modules/menu.js\");\n/* harmony import */ var _modules_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/data */ \"./public/script/editMenu/modules/data.js\");\n/* harmony import */ var _modules_content__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/content */ \"./public/script/editMenu/modules/content.js\");\n/* harmony import */ var _modules_eventHandler__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/eventHandler */ \"./public/script/editMenu/modules/eventHandler.js\");\n/* harmony import */ var _modules_entries__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/entries */ \"./public/script/editMenu/modules/entries.js\");\n\n\n\n\n\n\n\nconst init = async () => {\n    const path = window.location.pathname;\n    (0,_modules_data__WEBPACK_IMPORTED_MODULE_2__.setMenuExists)((0,_modules_menu__WEBPACK_IMPORTED_MODULE_1__.checkIfExists)(path));\n\n    if(_modules_data__WEBPACK_IMPORTED_MODULE_2__.menuExists){\n        (0,_modules_data__WEBPACK_IMPORTED_MODULE_2__.setMenuID)(((0,_modules_menu__WEBPACK_IMPORTED_MODULE_1__.getId)(path)));\n        await (0,_modules_entries__WEBPACK_IMPORTED_MODULE_5__.getEntriesData)(_modules_data__WEBPACK_IMPORTED_MODULE_2__.menuID);\n    }\n\n    (0,_modules_content__WEBPACK_IMPORTED_MODULE_3__.setupcontentSelection)();\n\n    _modules_dom__WEBPACK_IMPORTED_MODULE_0__[\"default\"].menuForm.addEventListener('submit', async (event) => {\n        await (0,_modules_eventHandler__WEBPACK_IMPORTED_MODULE_4__.handleFormSubmit)(event);\n    })\n}\n\ninit();\n\n//# sourceURL=webpack://decupla/./public/script/editMenu/main.js?");

/***/ }),

/***/ "./public/script/editMenu/modules/api.js":
/*!***********************************************!*\
  !*** ./public/script/editMenu/modules/api.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getMenuById: () => (/* binding */ getMenuById),\n/* harmony export */   saveMenu: () => (/* binding */ saveMenu)\n/* harmony export */ });\nconst saveMenu = async (url, method, data) => {\n    const response = await fetch(url, {\n        method,\n        headers: { 'Content-Type': 'application/json' },\n        body: JSON.stringify(data),\n    });\n    return response.json();\n};\n\nconst getMenuById = async (id) => {\n    const response = await fetch(`/menus/${id}`);\n    return response.json();\n}\n\n//# sourceURL=webpack://decupla/./public/script/editMenu/modules/api.js?");

/***/ }),

/***/ "./public/script/editMenu/modules/content.js":
/*!***************************************************!*\
  !*** ./public/script/editMenu/modules/content.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   setupcontentSelection: () => (/* binding */ setupcontentSelection),\n/* harmony export */   toggleContentSelection: () => (/* binding */ toggleContentSelection)\n/* harmony export */ });\n/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom */ \"./public/script/editMenu/modules/dom.js\");\n/* harmony import */ var _entries__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./entries */ \"./public/script/editMenu/modules/entries.js\");\n\n\n\n//sets up the popup for adding new menu entries\nconst setupcontentSelection = () => {\n    _dom__WEBPACK_IMPORTED_MODULE_0__[\"default\"].selectEntryButton.addEventListener('click',toggleContentSelection);\n\n    _dom__WEBPACK_IMPORTED_MODULE_0__[\"default\"].contentListEntries.forEach((content)=>{\n        content.addEventListener('click',()=>{\n            (0,_entries__WEBPACK_IMPORTED_MODULE_1__.addEntry)(content);\n        });\n    })\n}\n\n// toggles the entry selection popup\nconst toggleContentSelection = () => {\n    _dom__WEBPACK_IMPORTED_MODULE_0__[\"default\"].contentSelection.classList.toggle('visible');\n}\n\n\n\n//# sourceURL=webpack://decupla/./public/script/editMenu/modules/content.js?");

/***/ }),

/***/ "./public/script/editMenu/modules/data.js":
/*!************************************************!*\
  !*** ./public/script/editMenu/modules/data.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   entries: () => (/* binding */ entries),\n/* harmony export */   getEntryId: () => (/* binding */ getEntryId),\n/* harmony export */   menuExists: () => (/* binding */ menuExists),\n/* harmony export */   menuID: () => (/* binding */ menuID),\n/* harmony export */   nextEntryId: () => (/* binding */ nextEntryId),\n/* harmony export */   setMenuExists: () => (/* binding */ setMenuExists),\n/* harmony export */   setMenuID: () => (/* binding */ setMenuID),\n/* harmony export */   setNextEntryId: () => (/* binding */ setNextEntryId)\n/* harmony export */ });\nconst entries = [];\n// tells if we are editing a existing menu\nlet menuExists;\n// if we are editing a existing menu, the id of the menu will be stored here\nlet menuID;\n// used for the entries array. Basically the better index. Not used for the database!\nlet nextEntryId = 1;\n\nconst getEntryId = () => {\n    return nextEntryId++;\n}\n\nconst setMenuExists = (value) => menuExists = value;\nconst setMenuID = (id) => menuID = id;\nconst setNextEntryId = (id) => nextEntryId = id;\n\n//# sourceURL=webpack://decupla/./public/script/editMenu/modules/data.js?");

/***/ }),

/***/ "./public/script/editMenu/modules/dom.js":
/*!***********************************************!*\
  !*** ./public/script/editMenu/modules/dom.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst DOM = {};\nDOM.entriesArea = document.querySelector('#entries');\nDOM.selectEntryButton = document.querySelector('button#selectEntry');\nDOM.contentSelection = document.querySelector('#contentSelection');\nDOM.contentListEntries = document.querySelectorAll('ul#contentList li.content');\nDOM.menuForm = document.querySelector('form#menuForm');\n\nDOM.fieldMessages = {}\nDOM.fieldMessages.title = DOM.menuForm.querySelector('#message-title');\nDOM.fieldMessages.key = DOM.menuForm.querySelector('#message-key');\nDOM.fieldMessages.saved = DOM.menuForm.querySelector('#message-saved');\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DOM);\n\n//# sourceURL=webpack://decupla/./public/script/editMenu/modules/dom.js?");

/***/ }),

/***/ "./public/script/editMenu/modules/entries.js":
/*!***************************************************!*\
  !*** ./public/script/editMenu/modules/entries.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   addEntry: () => (/* binding */ addEntry),\n/* harmony export */   getEntriesData: () => (/* binding */ getEntriesData),\n/* harmony export */   removeEntry: () => (/* binding */ removeEntry)\n/* harmony export */ });\n/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api */ \"./public/script/editMenu/modules/api.js\");\n/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./data */ \"./public/script/editMenu/modules/data.js\");\n/* harmony import */ var _visualization__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./visualization */ \"./public/script/editMenu/modules/visualization.js\");\n\n\n\n\nconst getEntriesData = async (id) => {\n    try {\n        const menuData = await (0,_api__WEBPACK_IMPORTED_MODULE_0__.getMenuById)(id);\n    \n        if (menuData.success === true) {\n            const existingEntries = JSON.parse(menuData.menu.entries);\n            _data__WEBPACK_IMPORTED_MODULE_1__.entries.push(...existingEntries);\n\n\n            _data__WEBPACK_IMPORTED_MODULE_1__.entries.forEach((entry)=>{\n                (0,_visualization__WEBPACK_IMPORTED_MODULE_2__.createEntryVisualization)(entry);\n            })\n\n            console.log(_data__WEBPACK_IMPORTED_MODULE_1__.entries);\n        } else {\n            // to do: fehlermeldung auf der Seite ausgebe\n            console.log(menuData.message);\n        }\n    } catch (error) {\n        console.error('Something went wrong:', error);\n    }\n\n    return;\n}\n\nconst addEntry = (content) => {\n    const title = content.querySelector('.contentTitle').innerText;\n\n    const entryData = {\n        entryID: (0,_data__WEBPACK_IMPORTED_MODULE_1__.getEntryId)(),\n        contentID: content.dataset.id,\n        priority: _data__WEBPACK_IMPORTED_MODULE_1__.entries.length + 1,\n        title\n    }\n\n    _data__WEBPACK_IMPORTED_MODULE_1__.entries.push(entryData);\n    (0,_visualization__WEBPACK_IMPORTED_MODULE_2__.createEntryVisualization)(entryData);\n}\n\nconst removeEntry = (entryID) => {\n    const index = _data__WEBPACK_IMPORTED_MODULE_1__.entries.findIndex(entry => entry.entryID === entryID);\n\n    if (index !== -1) {\n        _data__WEBPACK_IMPORTED_MODULE_1__.entries.splice(index, 1);\n        (0,_visualization__WEBPACK_IMPORTED_MODULE_2__.deleteInputVisualization)(entryID);\n    }\n}\n\n//# sourceURL=webpack://decupla/./public/script/editMenu/modules/entries.js?");

/***/ }),

/***/ "./public/script/editMenu/modules/eventHandler.js":
/*!********************************************************!*\
  !*** ./public/script/editMenu/modules/eventHandler.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   handleFormSubmit: () => (/* binding */ handleFormSubmit)\n/* harmony export */ });\n/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api */ \"./public/script/editMenu/modules/api.js\");\n/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./data */ \"./public/script/editMenu/modules/data.js\");\n/* harmony import */ var _validation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./validation */ \"./public/script/editMenu/modules/validation.js\");\n\n \n\n\n// handles the event when the main form is submitted\nconst handleFormSubmit = async (event) => {\n    event.preventDefault();\n    (0,_validation__WEBPACK_IMPORTED_MODULE_2__.resetMessages)();\n\n    const formData = new FormData(event.target);\n    const data = Object.fromEntries(formData.entries());\n\n    data.entries = JSON.stringify(_data__WEBPACK_IMPORTED_MODULE_1__.entries);\n\n    console.log(data);\n\n    let method = \"POST\"\n    let url = \"/menus\";\n\n    if(_data__WEBPACK_IMPORTED_MODULE_1__.menuExists){\n        method = \"PUT\";\n        url = `/menus/${_data__WEBPACK_IMPORTED_MODULE_1__.menuID}`;\n    }\n\n    try {\n        console.log(url);\n        const response = await (0,_api__WEBPACK_IMPORTED_MODULE_0__.saveMenu)(url,method,data);\n\n        if (!response.validation) {\n            const messages = response.messages;\n            console.log(messages);\n\n            for (const [field, message] of Object.entries(messages)) {\n                (0,_validation__WEBPACK_IMPORTED_MODULE_2__.setFieldMessage)(field,message);\n            }\n\n            return;\n        } else if (response.success) {\n            (0,_validation__WEBPACK_IMPORTED_MODULE_2__.setFieldMessage)('saved','Menu saved successfully');\n\n            if(!_data__WEBPACK_IMPORTED_MODULE_1__.menuExists){\n                (0,_data__WEBPACK_IMPORTED_MODULE_1__.setMenuID)(response.newID);\n                (0,_data__WEBPACK_IMPORTED_MODULE_1__.setMenuExists)(true);\n            }\n        } else {\n            console.error('Something went wrong while trying to save the block');\n        }\n    } catch (error) {\n        console.error('Something went wrong:', error);\n    }\n}\n\n\n//# sourceURL=webpack://decupla/./public/script/editMenu/modules/eventHandler.js?");

/***/ }),

/***/ "./public/script/editMenu/modules/menu.js":
/*!************************************************!*\
  !*** ./public/script/editMenu/modules/menu.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   checkIfExists: () => (/* binding */ checkIfExists),\n/* harmony export */   getId: () => (/* binding */ getId)\n/* harmony export */ });\n// checks if we are creating a new menu or editing a existing menu\nconst checkIfExists = (path) => {\n    const regex = /^\\/menus\\/edit\\/(\\d+)$/;\n    return path.match(regex);\n}\n\nconst getId = (path) => {\n    const parts = path.split(\"/\");\n    const id = parts[parts.length - 1];\n    return parseInt(id);\n}\n\n//# sourceURL=webpack://decupla/./public/script/editMenu/modules/menu.js?");

/***/ }),

/***/ "./public/script/editMenu/modules/validation.js":
/*!******************************************************!*\
  !*** ./public/script/editMenu/modules/validation.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   resetMessages: () => (/* binding */ resetMessages),\n/* harmony export */   setFieldMessage: () => (/* binding */ setFieldMessage)\n/* harmony export */ });\n/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom */ \"./public/script/editMenu/modules/dom.js\");\n\n\nconst setFieldMessage = (field, message) => {\n\n    const fieldMessageElement = _dom__WEBPACK_IMPORTED_MODULE_0__[\"default\"].fieldMessages[field];\n    if (fieldMessageElement) {\n        fieldMessageElement.innerText = message;\n        fieldMessageElement.classList.add('visible');\n    } else {\n        console.log(`Field \"${field}\" does not exist.`);\n    }\n};\n\nconst resetMessages = () => {\n    for (const [name, element] of Object.entries(_dom__WEBPACK_IMPORTED_MODULE_0__[\"default\"].fieldMessages)) {\n        if(element.classList.contains('visible')){\n            element.classList.remove('visible');\n        }\n      }\n}\n\n//# sourceURL=webpack://decupla/./public/script/editMenu/modules/validation.js?");

/***/ }),

/***/ "./public/script/editMenu/modules/visualization.js":
/*!*********************************************************!*\
  !*** ./public/script/editMenu/modules/visualization.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createEntryVisualization: () => (/* binding */ createEntryVisualization),\n/* harmony export */   deleteInputVisualization: () => (/* binding */ deleteInputVisualization)\n/* harmony export */ });\n/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom */ \"./public/script/editMenu/modules/dom.js\");\n/* harmony import */ var _entries__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./entries */ \"./public/script/editMenu/modules/entries.js\");\n\n\n\n// creates a new visualization of a menu entry\nconst createEntryVisualization = (data) => {\n    const entry = document.createElement('div');\n    const entryTitle = document.createElement('div');\n    const removeButton = document.createElement('button');\n    \n    entryTitle.innerText = data.title;\n    removeButton.innerText = 'remove';\n\n    entry.dataset.id = data.entryID;\n    entry.classList.add('entryVis')\n\n    entry.appendChild(entryTitle);\n    entry.appendChild(removeButton);\n    _dom__WEBPACK_IMPORTED_MODULE_0__[\"default\"].entriesArea.appendChild(entry);\n\n    removeButton.addEventListener('click',()=>{\n        (0,_entries__WEBPACK_IMPORTED_MODULE_1__.removeEntry)(data.entryID);\n    })\n}\n\nconst deleteInputVisualization = (id) => {\n    const vis = document.querySelector(`.entryVis[data-id=\"${id}\"]`);\n    vis.remove();\n}\n\n\n//# sourceURL=webpack://decupla/./public/script/editMenu/modules/visualization.js?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./public/script/editMenu/main.js");
/******/ 	
/******/ })()
;