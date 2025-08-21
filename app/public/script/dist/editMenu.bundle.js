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

/***/ "./app/public/script/editMenu/main.js":
/*!********************************************!*\
  !*** ./app/public/script/editMenu/main.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/dom */ \"./app/public/script/editMenu/modules/dom.js\");\n/* harmony import */ var _modules_menu__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/menu */ \"./app/public/script/editMenu/modules/menu.js\");\n/* harmony import */ var _modules_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/data */ \"./app/public/script/editMenu/modules/data.js\");\n/* harmony import */ var _modules_content__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/content */ \"./app/public/script/editMenu/modules/content.js\");\n/* harmony import */ var _modules_eventHandler__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/eventHandler */ \"./app/public/script/editMenu/modules/eventHandler.js\");\n/* harmony import */ var _modules_entries__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/entries */ \"./app/public/script/editMenu/modules/entries.js\");\n\n\n\n\n\n\n\nconst init = async () => {\n    const path = window.location.pathname;\n    (0,_modules_data__WEBPACK_IMPORTED_MODULE_2__.setMenuExists)((0,_modules_menu__WEBPACK_IMPORTED_MODULE_1__.checkIfExists)(path));\n\n    if(_modules_data__WEBPACK_IMPORTED_MODULE_2__.menuExists){\n        (0,_modules_data__WEBPACK_IMPORTED_MODULE_2__.setMenuID)(((0,_modules_menu__WEBPACK_IMPORTED_MODULE_1__.getId)(path)));\n        await (0,_modules_entries__WEBPACK_IMPORTED_MODULE_5__.getEntriesData)(_modules_data__WEBPACK_IMPORTED_MODULE_2__.menuID);\n    }\n\n    (0,_modules_content__WEBPACK_IMPORTED_MODULE_3__.setupcontentSelection)();\n\n    _modules_dom__WEBPACK_IMPORTED_MODULE_0__[\"default\"].menuForm.addEventListener('submit', async (event) => {\n        await (0,_modules_eventHandler__WEBPACK_IMPORTED_MODULE_4__.handleFormSubmit)(event);\n    })\n}\n\ninit();\n\n//# sourceURL=webpack://decupla/./app/public/script/editMenu/main.js?");

/***/ }),

/***/ "./app/public/script/editMenu/modules/api.js":
/*!***************************************************!*\
  !*** ./app/public/script/editMenu/modules/api.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getMenuById: () => (/* binding */ getMenuById),\n/* harmony export */   saveMenu: () => (/* binding */ saveMenu)\n/* harmony export */ });\nconst saveMenu = async (url, method, data) => {\n    const response = await fetch(url, {\n        method,\n        headers: { 'Content-Type': 'application/json' },\n        body: JSON.stringify(data),\n    });\n    return response.json();\n};\n\nconst getMenuById = async (id) => {\n    const response = await fetch(`/menus/${id}`);\n    return response.json();\n}\n\n//# sourceURL=webpack://decupla/./app/public/script/editMenu/modules/api.js?");

/***/ }),

/***/ "./app/public/script/editMenu/modules/content.js":
/*!*******************************************************!*\
  !*** ./app/public/script/editMenu/modules/content.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   setupcontentSelection: () => (/* binding */ setupcontentSelection),\n/* harmony export */   toggleContentSelection: () => (/* binding */ toggleContentSelection)\n/* harmony export */ });\n/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom */ \"./app/public/script/editMenu/modules/dom.js\");\n/* harmony import */ var _entries__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./entries */ \"./app/public/script/editMenu/modules/entries.js\");\n\n\n\n//sets up the popup for adding new menu entries\nconst setupcontentSelection = () => {\n    _dom__WEBPACK_IMPORTED_MODULE_0__[\"default\"].selectEntryButton.addEventListener('click',toggleContentSelection);\n\n    _dom__WEBPACK_IMPORTED_MODULE_0__[\"default\"].contentListEntries.forEach((content)=>{\n        content.addEventListener('click',()=>{\n            (0,_entries__WEBPACK_IMPORTED_MODULE_1__.addEntry)(content);\n        });\n    })\n}\n\n// toggles the entry selection popup\nconst toggleContentSelection = () => {\n    _dom__WEBPACK_IMPORTED_MODULE_0__[\"default\"].contentSelection.classList.toggle('visible');\n}\n\n//# sourceURL=webpack://decupla/./app/public/script/editMenu/modules/content.js?");

/***/ }),

/***/ "./app/public/script/editMenu/modules/data.js":
/*!****************************************************!*\
  !*** ./app/public/script/editMenu/modules/data.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   entries: () => (/* binding */ entries),\n/* harmony export */   getEntryId: () => (/* binding */ getEntryId),\n/* harmony export */   getPriority: () => (/* binding */ getPriority),\n/* harmony export */   menuExists: () => (/* binding */ menuExists),\n/* harmony export */   menuID: () => (/* binding */ menuID),\n/* harmony export */   nextEntryId: () => (/* binding */ nextEntryId),\n/* harmony export */   nextPriority: () => (/* binding */ nextPriority),\n/* harmony export */   setMenuExists: () => (/* binding */ setMenuExists),\n/* harmony export */   setMenuID: () => (/* binding */ setMenuID),\n/* harmony export */   setNextEntryId: () => (/* binding */ setNextEntryId),\n/* harmony export */   setNextPriority: () => (/* binding */ setNextPriority)\n/* harmony export */ });\nconst entries = [];\n// tells if we are editing a existing menu\nlet menuExists;\n// if we are editing a existing menu, the id of the menu will be stored here\nlet menuID;\n// used for the entries array. Basically the better index. Not used for the database!\nlet nextEntryId = 1;\nlet nextPriority = 1;\n\nconst getEntryId = () => {\n    return nextEntryId++;\n}\n\nconst getPriority = () => {\n    return nextPriority++;\n}\n\nconst setMenuExists = (value) => menuExists = value;\nconst setMenuID = (id) => menuID = id;\nconst setNextEntryId = (id) => nextEntryId = id;\nconst setNextPriority = (priority) => nextPriority = priority;\n\n//# sourceURL=webpack://decupla/./app/public/script/editMenu/modules/data.js?");

/***/ }),

/***/ "./app/public/script/editMenu/modules/dom.js":
/*!***************************************************!*\
  !*** ./app/public/script/editMenu/modules/dom.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst DOM = {};\nDOM.entriesArea = document.querySelector('#entries');\nDOM.selectEntryButton = document.querySelector('button#select-entry');\nDOM.contentSelection = document.querySelector('#content-selection');\nDOM.contentListEntries = document.querySelectorAll('table#content-list tr.content');\nDOM.menuForm = document.querySelector('form#menuForm');\n\nDOM.fieldMessages = {}\nDOM.fieldMessages.title = DOM.menuForm.querySelector('#message-title');\nDOM.fieldMessages.key = DOM.menuForm.querySelector('#message-key');\nDOM.fieldMessages.saved = DOM.menuForm.querySelector('#message-saved');\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DOM);\n\n//# sourceURL=webpack://decupla/./app/public/script/editMenu/modules/dom.js?");

/***/ }),

/***/ "./app/public/script/editMenu/modules/entries.js":
/*!*******************************************************!*\
  !*** ./app/public/script/editMenu/modules/entries.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   addEntry: () => (/* binding */ addEntry),\n/* harmony export */   getEntriesData: () => (/* binding */ getEntriesData),\n/* harmony export */   removeEntry: () => (/* binding */ removeEntry)\n/* harmony export */ });\n/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api */ \"./app/public/script/editMenu/modules/api.js\");\n/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./data */ \"./app/public/script/editMenu/modules/data.js\");\n/* harmony import */ var _visualization__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./visualization */ \"./app/public/script/editMenu/modules/visualization.js\");\n\n\n\n\nconst getEntriesData = async (id) => {\n    try {\n        const menuData = await (0,_api__WEBPACK_IMPORTED_MODULE_0__.getMenuById)(id);\n    \n        if (menuData.success === true) {\n            const existingEntries = JSON.parse(menuData.menu.entries);\n            _data__WEBPACK_IMPORTED_MODULE_1__.entries.push(...existingEntries);\n\n            if(_data__WEBPACK_IMPORTED_MODULE_1__.entries.length>0){\n                (0,_data__WEBPACK_IMPORTED_MODULE_1__.setNextEntryId)(_data__WEBPACK_IMPORTED_MODULE_1__.entries[_data__WEBPACK_IMPORTED_MODULE_1__.entries.length - 1].entryID + 1);\n                const currentMaxPriority = Math.max(0, ..._data__WEBPACK_IMPORTED_MODULE_1__.entries.map(entry => entry.priority));\n                (0,_data__WEBPACK_IMPORTED_MODULE_1__.setNextPriority)(currentMaxPriority + 1);\n            }\n\n            _data__WEBPACK_IMPORTED_MODULE_1__.entries.forEach((entry)=>{\n                (0,_visualization__WEBPACK_IMPORTED_MODULE_2__.createEntryVisualization)(entry);\n            })\n        } else {\n            // to do: error message on page\n            console.log(menuData.message);\n        }\n    } catch (error) {\n        console.error('Something went wrong:', error);\n    }\n\n    return;\n}\n\nconst addEntry = (content) => {\n    const title = content.querySelector('.content-title').innerText;\n\n    const entryData = {\n        entryID: (0,_data__WEBPACK_IMPORTED_MODULE_1__.getEntryId)(),\n        contentID: parseInt(content.dataset.id),\n        priority: (0,_data__WEBPACK_IMPORTED_MODULE_1__.getPriority)(),\n        title,\n        url: content.dataset.url\n    }\n\n    _data__WEBPACK_IMPORTED_MODULE_1__.entries.push(entryData);\n    (0,_visualization__WEBPACK_IMPORTED_MODULE_2__.createEntryVisualization)(entryData);\n}\n\nconst removeEntry = (entryID) => {\n    const index = _data__WEBPACK_IMPORTED_MODULE_1__.entries.findIndex(entry => entry.entryID === entryID);\n\n    if (index !== -1) {\n        const removedPriority = _data__WEBPACK_IMPORTED_MODULE_1__.entries[index].priority;\n\n        _data__WEBPACK_IMPORTED_MODULE_1__.entries.splice(index, 1);\n\n        _data__WEBPACK_IMPORTED_MODULE_1__.entries.forEach(entry => {\n            if (entry.priority > removedPriority) {\n                entry.priority -= 1;\n                (0,_visualization__WEBPACK_IMPORTED_MODULE_2__.updateVisualizationPriority)(entry.entryID,entry.priority);\n            }\n        });\n\n        const currentMaxPriority = Math.max(0, ..._data__WEBPACK_IMPORTED_MODULE_1__.entries.map(entry => entry.priority));\n        (0,_data__WEBPACK_IMPORTED_MODULE_1__.setNextPriority)(currentMaxPriority + 1);\n\n        (0,_visualization__WEBPACK_IMPORTED_MODULE_2__.deleteInputVisualization)(entryID);\n    }\n};\n\n\n//# sourceURL=webpack://decupla/./app/public/script/editMenu/modules/entries.js?");

/***/ }),

/***/ "./app/public/script/editMenu/modules/eventHandler.js":
/*!************************************************************!*\
  !*** ./app/public/script/editMenu/modules/eventHandler.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   handleFormSubmit: () => (/* binding */ handleFormSubmit)\n/* harmony export */ });\n/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api */ \"./app/public/script/editMenu/modules/api.js\");\n/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./data */ \"./app/public/script/editMenu/modules/data.js\");\n/* harmony import */ var _validation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./validation */ \"./app/public/script/editMenu/modules/validation.js\");\n\n \n\n\n// handles the event when the main form is submitted\nconst handleFormSubmit = async (event) => {\n    event.preventDefault();\n    (0,_validation__WEBPACK_IMPORTED_MODULE_2__.resetMessages)();\n\n    const formData = new FormData(event.target);\n    const data = Object.fromEntries(formData.entries());\n\n    data.entries = JSON.stringify(_data__WEBPACK_IMPORTED_MODULE_1__.entries);\n\n    let method = \"POST\"\n    let url = \"/menus\";\n\n    if(_data__WEBPACK_IMPORTED_MODULE_1__.menuExists){\n        method = \"PUT\";\n        url = `/menus/${_data__WEBPACK_IMPORTED_MODULE_1__.menuID}`;\n    }\n\n    try {\n        const response = await (0,_api__WEBPACK_IMPORTED_MODULE_0__.saveMenu)(url,method,data);\n\n        if (!response.validation) {\n            const messages = response.messages;\n\n            for (const [field, message] of Object.entries(messages)) {\n                (0,_validation__WEBPACK_IMPORTED_MODULE_2__.setFieldMessage)(field,message);\n            }\n\n            return;\n        } else if (response.success) {\n            (0,_validation__WEBPACK_IMPORTED_MODULE_2__.setFieldMessage)('saved','Menu saved successfully');\n\n            if(!_data__WEBPACK_IMPORTED_MODULE_1__.menuExists){\n                (0,_data__WEBPACK_IMPORTED_MODULE_1__.setMenuID)(response.newID);\n                (0,_data__WEBPACK_IMPORTED_MODULE_1__.setMenuExists)(true);\n            }\n        } else {\n            console.error('Something went wrong while trying to save the block');\n        }\n    } catch (error) {\n        console.error('Something went wrong:', error);\n    }\n}\n\n\n//# sourceURL=webpack://decupla/./app/public/script/editMenu/modules/eventHandler.js?");

/***/ }),

/***/ "./app/public/script/editMenu/modules/menu.js":
/*!****************************************************!*\
  !*** ./app/public/script/editMenu/modules/menu.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   checkIfExists: () => (/* binding */ checkIfExists),\n/* harmony export */   getId: () => (/* binding */ getId)\n/* harmony export */ });\n// checks if we are creating a new menu or editing a existing menu\nconst checkIfExists = (path) => {\n    const regex = /^\\/menus\\/edit\\/(\\d+)$/;\n    return regex.test(path);  // Gibt true zurück, wenn der Pfad übereinstimmt, ansonsten false.\n}\n\nconst getId = (path) => {\n    const parts = path.split(\"/\");\n    const id = parts[parts.length - 1];\n    return parseInt(id);\n}\n\n//# sourceURL=webpack://decupla/./app/public/script/editMenu/modules/menu.js?");

/***/ }),

/***/ "./app/public/script/editMenu/modules/priority.js":
/*!********************************************************!*\
  !*** ./app/public/script/editMenu/modules/priority.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   priorityDown: () => (/* binding */ priorityDown),\n/* harmony export */   priorityUp: () => (/* binding */ priorityUp)\n/* harmony export */ });\n/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./data */ \"./app/public/script/editMenu/modules/data.js\");\n/* harmony import */ var _visualization__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./visualization */ \"./app/public/script/editMenu/modules/visualization.js\");\n\n\n\nconst priorityUp = (entryID) => {\n    const index = _data__WEBPACK_IMPORTED_MODULE_0__.entries.findIndex(entry => entry.entryID === entryID);\n\n    if (index !== -1) {\n        const priority = _data__WEBPACK_IMPORTED_MODULE_0__.entries[index].priority;\n        const newPriority = priority - 1;\n\n        if (priority > 1) {\n            const prevEntry = _data__WEBPACK_IMPORTED_MODULE_0__.entries.find(entry => entry.priority === newPriority);\n\n            if (prevEntry) {\n                prevEntry.priority++;\n                _data__WEBPACK_IMPORTED_MODULE_0__.entries[index].priority = newPriority;\n\n                (0,_visualization__WEBPACK_IMPORTED_MODULE_1__.updateVisualizationPriority)(entryID, newPriority);\n                (0,_visualization__WEBPACK_IMPORTED_MODULE_1__.updateVisualizationPriority)(prevEntry.entryID, prevEntry.priority);\n            }\n        }\n    }\n}\n\nconst priorityDown = (entryID) => {\n    const index = _data__WEBPACK_IMPORTED_MODULE_0__.entries.findIndex(entry => entry.entryID === entryID);\n\n    if (index !== -1) {\n        const priority = _data__WEBPACK_IMPORTED_MODULE_0__.entries[index].priority;\n        const newPriority = priority + 1;\n\n        if (priority !== _data__WEBPACK_IMPORTED_MODULE_0__.entries.length) {\n            const nextEntry = _data__WEBPACK_IMPORTED_MODULE_0__.entries.find(entry => entry.priority === newPriority);\n\n            if (nextEntry) {\n                nextEntry.priority--;\n                _data__WEBPACK_IMPORTED_MODULE_0__.entries[index].priority = newPriority;\n\n                (0,_visualization__WEBPACK_IMPORTED_MODULE_1__.updateVisualizationPriority)(entryID, newPriority);\n                (0,_visualization__WEBPACK_IMPORTED_MODULE_1__.updateVisualizationPriority)(nextEntry.entryID, nextEntry.priority);\n            }\n        }\n    }\n}\n\n//# sourceURL=webpack://decupla/./app/public/script/editMenu/modules/priority.js?");

/***/ }),

/***/ "./app/public/script/editMenu/modules/validation.js":
/*!**********************************************************!*\
  !*** ./app/public/script/editMenu/modules/validation.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   resetMessages: () => (/* binding */ resetMessages),\n/* harmony export */   setFieldMessage: () => (/* binding */ setFieldMessage)\n/* harmony export */ });\n/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom */ \"./app/public/script/editMenu/modules/dom.js\");\n\n\nconst setFieldMessage = (field, message) => {\n\n    const fieldMessageElement = _dom__WEBPACK_IMPORTED_MODULE_0__[\"default\"].fieldMessages[field];\n    if (fieldMessageElement) {\n        fieldMessageElement.innerText = message;\n        fieldMessageElement.classList.add('visible');\n    } else {\n        console.log(`Field \"${field}\" does not exist.`);\n    }\n};\n\nconst resetMessages = () => {\n    for (const [name, element] of Object.entries(_dom__WEBPACK_IMPORTED_MODULE_0__[\"default\"].fieldMessages)) {\n        if(element.classList.contains('visible')){\n            element.classList.remove('visible');\n        }\n      }\n}\n\n//# sourceURL=webpack://decupla/./app/public/script/editMenu/modules/validation.js?");

/***/ }),

/***/ "./app/public/script/editMenu/modules/visualization.js":
/*!*************************************************************!*\
  !*** ./app/public/script/editMenu/modules/visualization.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createEntryVisualization: () => (/* binding */ createEntryVisualization),\n/* harmony export */   deleteInputVisualization: () => (/* binding */ deleteInputVisualization),\n/* harmony export */   updateVisualizationPriority: () => (/* binding */ updateVisualizationPriority)\n/* harmony export */ });\n/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom */ \"./app/public/script/editMenu/modules/dom.js\");\n/* harmony import */ var _entries__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./entries */ \"./app/public/script/editMenu/modules/entries.js\");\n/* harmony import */ var _priority__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./priority */ \"./app/public/script/editMenu/modules/priority.js\");\n\n\n\n\n// creates a new visualization of a menu entry\nconst createEntryVisualization = (data) => {\n    const entry = document.createElement('div');\n    const entryTitle = document.createElement('div');\n    const buttonsContainer = document.createElement('div');\n    const removeButton = document.createElement('button');\n    const removeIcon = document.createElement('img');\n    const priorityButtons = document.createElement('div');\n    const upButton = document.createElement('button');\n    const upIcon = document.createElement('img');\n    const downButton = document.createElement('button');\n    const downIcon = document.createElement('img');\n    \n    entryTitle.innerText = data.title;\n    removeIcon.src = \"/images/icons/delete_red.png\";\n    upIcon.src = \"/images/icons/up.png\";\n    downIcon.src = \"/images/icons/down.png\";\n\n    removeButton.classList.add('remove');\n    buttonsContainer.classList.add('buttons');\n    priorityButtons.classList.add('priority');\n\n    removeButton.type = \"button\";\n    upButton.type = \"button\";\n    downButton.type = \"button\";\n\n    entry.dataset.id = data.entryID;\n    entry.classList.add('entryVis')\n    entry.style.order = data.priority;\n\n    removeButton.appendChild(removeIcon);\n    upButton.appendChild(upIcon);\n    downButton.appendChild(downIcon);\n\n    priorityButtons.appendChild(upButton);\n    priorityButtons.appendChild(downButton);\n\n    buttonsContainer.appendChild(priorityButtons);\n    buttonsContainer.appendChild(removeButton);\n\n    entry.appendChild(entryTitle);\n    entry.appendChild(buttonsContainer);\n    _dom__WEBPACK_IMPORTED_MODULE_0__[\"default\"].entriesArea.appendChild(entry);\n\n    upButton.addEventListener('click',()=>{\n        (0,_priority__WEBPACK_IMPORTED_MODULE_2__.priorityUp)(data.entryID);\n    })\n\n    downButton.addEventListener('click',()=>{\n        ;(0,_priority__WEBPACK_IMPORTED_MODULE_2__.priorityDown)(data.entryID);\n    })\n    \n    removeButton.addEventListener('click',()=>{\n        ;(0,_entries__WEBPACK_IMPORTED_MODULE_1__.removeEntry)(data.entryID);\n    })\n}\n\nconst deleteInputVisualization = (id) => {\n    const vis = document.querySelector(`.entryVis[data-id=\"${id}\"]`);\n    vis.remove();\n}\n\nconst updateVisualizationPriority = (id,priority) => {\n    const vis = document.querySelector(`.entryVis[data-id=\"${id}\"]`);\n    vis.style.order = priority\n}\n\n//# sourceURL=webpack://decupla/./app/public/script/editMenu/modules/visualization.js?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./app/public/script/editMenu/main.js");
/******/ 	
/******/ })()
;