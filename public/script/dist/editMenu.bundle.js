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

/***/ "./public/script/editMenu/editMenu.js":
/*!********************************************!*\
  !*** ./public/script/editMenu/editMenu.js ***!
  \********************************************/
/***/ (() => {

eval("\n\n(() => {\n\n// === DOM & VARS ===\nconst DOM = {};\nDOM.entriesArea = document.querySelector('#entries');\nDOM.selectEntryButton = document.querySelector('button#selectEntry');\nDOM.contentSelection = document.querySelector('#contentSelection');\nDOM.contentListEntries = document.querySelectorAll('ul#contentList li.content');\nDOM.menuForm = document.querySelector('form#menuForm');\n\n//IDs of the menu entries will be saved here\nconst entries = [];\n// === INIT =========\n\nconst init = () => {\n    if(DOM.contentSelection){\n        setupcontentSelection();\n    }\n\n    if(DOM.menuForm){\n        DOM.menuForm.addEventListener('click',(event)=>{\n            handleFormSubmit(event);\n        })\n    }\n\n}\n\n// === EVENTS =======\n// handles the event when the main form is submitted\nconst handleFormSubmit = (event) => {\n    event.preventDefault();\n}\n\n// === FUNCTIONS ====\n//sets up the popup for adding new menu entries\nconst setupcontentSelection = () => {\n    DOM.selectEntryButton.addEventListener('click',toggleContentSelection);\n\n    DOM.contentListEntries.forEach((content)=>{\n        content.addEventListener('click',()=>{\n            addEntry(content);\n        });\n    })\n}\n\n// toggles the entry selection popup\nconst toggleContentSelection = () => {\n    DOM.contentSelection.classList.toggle('visible');\n}\n\n// adds a new entry to the entries array and creates a visualization\nconst addEntry = (content) => {\n    const title = content.querySelector('.contentTitle').innerText;\n\n    entries.push(content.dataset.id)\n    createEntryVisualization(content.dataset.id,title);\n}\n\n// creates a new visualization of a menu entry\nconst createEntryVisualization = (id,title) => {\n    const entry = document.createElement('div');\n    const entryTitle = document.createElement('div');\n    \n    entryTitle.innerText = title;\n\n    entry.appendChild(entryTitle);\n    DOM.entriesArea.appendChild(entry);\n}\n\n\n\ninit();\n\n})();\n\n//# sourceURL=webpack://decupla/./public/script/editMenu/editMenu.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./public/script/editMenu/editMenu.js"]();
/******/ 	
/******/ })()
;