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

/***/ "./public/script/editContent/main.js":
/*!*******************************************!*\
  !*** ./public/script/editContent/main.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/dom */ \"./public/script/editContent/modules/dom.js\");\n/* harmony import */ var _modules_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/data */ \"./public/script/editContent/modules/data.js\");\n/* harmony import */ var _modules_eventHandler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/eventHandler */ \"./public/script/editContent/modules/eventHandler.js\");\n/* harmony import */ var _modules_blocks__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/blocks */ \"./public/script/editContent/modules/blocks.js\");\n/* harmony import */ var _modules_blockForm__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/blockForm */ \"./public/script/editContent/modules/blockForm.js\");\n/* harmony import */ var _modules_content__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/content */ \"./public/script/editContent/modules/content.js\");\n\n\n\n\n\n\n\n\nconst init = async () => {\n    const path = window.location.pathname;\n    \n    (0,_modules_data__WEBPACK_IMPORTED_MODULE_1__.setContentExists)((0,_modules_content__WEBPACK_IMPORTED_MODULE_5__.checkIfExists)(path));\n\n    if (_modules_data__WEBPACK_IMPORTED_MODULE_1__.contentExists) {\n        (0,_modules_data__WEBPACK_IMPORTED_MODULE_1__.setContentID)((0,_modules_content__WEBPACK_IMPORTED_MODULE_5__.getId)(path));\n        await (0,_modules_blocks__WEBPACK_IMPORTED_MODULE_3__.getBlocks)(_modules_data__WEBPACK_IMPORTED_MODULE_1__.contentID);\n    }\n\n    _modules_dom__WEBPACK_IMPORTED_MODULE_0__[\"default\"].addBlockButtonContainers.forEach((container) => {\n        (0,_modules_blockForm__WEBPACK_IMPORTED_MODULE_4__.setupBlockSelection)(container);\n    })\n\n    _modules_dom__WEBPACK_IMPORTED_MODULE_0__[\"default\"].contentForm.addEventListener('submit', (event) => {\n        ;(0,_modules_eventHandler__WEBPACK_IMPORTED_MODULE_2__.handleContentSubmit)(event)\n    }\n    );\n\n    _modules_dom__WEBPACK_IMPORTED_MODULE_0__[\"default\"].blockForm.addEventListener('submit', (event) => {\n        (0,_modules_eventHandler__WEBPACK_IMPORTED_MODULE_2__.handleBlockSubmit)(event);\n    });\n\n}\n\ninit();\n\n\n\n//# sourceURL=webpack://decupla/./public/script/editContent/main.js?");

/***/ }),

/***/ "./public/script/editContent/modules/api.js":
/*!**************************************************!*\
  !*** ./public/script/editContent/modules/api.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   deleteBlockInstance: () => (/* binding */ deleteBlockInstance),\n/* harmony export */   fetchContentBlocks: () => (/* binding */ fetchContentBlocks),\n/* harmony export */   saveBlockData: () => (/* binding */ saveBlockData),\n/* harmony export */   saveContentData: () => (/* binding */ saveContentData)\n/* harmony export */ });\nconst fetchContentBlocks = async (id) => {\n    const response = await fetch(`/content/${id}/blocks`);\n    return response.json();\n};\n\nconst saveContentData = async (url, method, data) => {\n    const response = await fetch(url, {\n        method,\n        headers: { 'Content-Type': 'application/json' },\n        body: JSON.stringify(data),\n    });\n    return response.json();\n};\n\nconst saveBlockData = async (url, method, data) => {\n    const response = await fetch(url, {\n        method,\n        headers: { 'Content-Type': 'application/json' },\n        body: JSON.stringify(data),\n    });\n    return response.json();\n};\n\nconst deleteBlockInstance = async (id) => {\n    const response = await fetch(`/blocks/instances/${id}`, { method: 'DELETE' });\n    return response.json();\n};\n\n\n//# sourceURL=webpack://decupla/./public/script/editContent/modules/api.js?");

/***/ }),

/***/ "./public/script/editContent/modules/blockForm.js":
/*!********************************************************!*\
  !*** ./public/script/editContent/modules/blockForm.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   closeBlockForm: () => (/* binding */ closeBlockForm),\n/* harmony export */   setupBlockForm: () => (/* binding */ setupBlockForm),\n/* harmony export */   setupBlockSelection: () => (/* binding */ setupBlockSelection)\n/* harmony export */ });\n/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom */ \"./public/script/editContent/modules/dom.js\");\n/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./data */ \"./public/script/editContent/modules/data.js\");\n\n\n\n// loads the Form / Popup for creating or editing a block instance\nconst setupBlockForm = async (blockID, setOutput = {}) => {\n    // param blockID is the id of the block used to create or edit the instance\n    const response = await fetch(`/blocks/${blockID}`);\n    const blocksData = await response.json();\n\n    if (blocksData.success) {\n        const block = blocksData.block;\n        const inputFields = JSON.parse(block.input);\n\n        _dom__WEBPACK_IMPORTED_MODULE_0__[\"default\"].blockFormTitle.innerText = block.title;\n        _dom__WEBPACK_IMPORTED_MODULE_0__[\"default\"].blockFormWrapper.classList.add('visible');\n\n        inputFields.forEach((input) => {\n            if (setOutput[input.name]) {\n                createInput(input, setOutput[input.name]);\n            } else {\n                createInput(input);\n            }\n        })\n\n        ;(0,_data__WEBPACK_IMPORTED_MODULE_1__.setCurrentBlock)(block);\n    }\n}\n\nconst closeBlockForm = () => {\n    _dom__WEBPACK_IMPORTED_MODULE_0__[\"default\"].blockFormWrapper.classList.remove('visible');\n    _dom__WEBPACK_IMPORTED_MODULE_0__[\"default\"].blockFormInput.innerHTML = \"\";\n}\n\n// sets up the block selection dropdown\nconst setupBlockSelection = (container) => {\n    const button = container.querySelector('.addBlockButton');\n    const dropdown = container.querySelector('.addBlockDropdown');\n    const blocks = container.querySelectorAll('ul li.block');\n\n    button.addEventListener('click', () => {\n        dropdown.classList.toggle('visible');\n    })\n\n    blocks.forEach((block) => {\n        block.addEventListener('click', () => {\n            ;(0,_data__WEBPACK_IMPORTED_MODULE_1__.setBlockMethod)(\"create\");\n            dropdown.classList.remove('visible');\n            setupBlockForm(block.dataset.id);\n        })\n    })\n}\n\n// loads the input fields to the block form. Param \"value\" is used while editing a existing instance\nconst createInput = (inputData, value = \"\") => {\n    let newInput;\n\n    switch (inputData.type) {\n        case 'shortText':\n            newInput = document.createElement('input');\n            newInput.type = \"text\";\n            if (value !== \"\") {\n                newInput.value = value;\n            }\n            break;\n        case 'longText':\n            newInput = document.createElement('textarea');\n\n            if (value !== \"\") {\n                newInput.innerText = value;\n            }\n            break;\n        default:\n            console.log('Invalid input type given: ' + inputData.type);\n            return;\n    }\n\n    const newLabel = document.createElement('label');\n    newLabel.for = inputData.name;\n    newLabel.innerText = inputData.label;\n\n    newInput.id = inputData.name;\n    newInput.name = inputData.name;\n\n    const newFieldset = document.createElement('div');\n\n    newFieldset.appendChild(newLabel);\n    newFieldset.appendChild(newInput);\n\n    _dom__WEBPACK_IMPORTED_MODULE_0__[\"default\"].blockFormInput.appendChild(newFieldset);\n}\n\n//# sourceURL=webpack://decupla/./public/script/editContent/modules/blockForm.js?");

/***/ }),

/***/ "./public/script/editContent/modules/blocks.js":
/*!*****************************************************!*\
  !*** ./public/script/editContent/modules/blocks.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   deleteBlock: () => (/* binding */ deleteBlock),\n/* harmony export */   editBlock: () => (/* binding */ editBlock),\n/* harmony export */   getBlocks: () => (/* binding */ getBlocks),\n/* harmony export */   reloadBlocks: () => (/* binding */ reloadBlocks),\n/* harmony export */   saveNewBlock: () => (/* binding */ saveNewBlock),\n/* harmony export */   updateBlock: () => (/* binding */ updateBlock)\n/* harmony export */ });\n/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom */ \"./public/script/editContent/modules/dom.js\");\n/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./data */ \"./public/script/editContent/modules/data.js\");\n/* harmony import */ var _visualization__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./visualization */ \"./public/script/editContent/modules/visualization.js\");\n/* harmony import */ var _blockForm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./blockForm */ \"./public/script/editContent/modules/blockForm.js\");\n\n\n\n\n\n// if content already exists and has blocks this will load in the block instances\nconst getBlocks = async (id) => {\n    try {\n        const response = await fetch(`/content/${id}/blocks`);\n        const data = await response.json();\n\n        if (data.success === true) {\n            const blocks = data.blocks;\n\n            const blocksParsed = blocks.map(({ id, ...block }) => ({\n                // this is the id the block instances has in the blocksData Array, used for frontend purposes\n                instanceID: (0,_data__WEBPACK_IMPORTED_MODULE_1__.getInstanceId)(),\n                // this is the id the block instance has in the database\n                databaseID: id,\n                ...block,\n                output: JSON.parse(block.output),\n            }));\n\n            _data__WEBPACK_IMPORTED_MODULE_1__.blocksData.push(...blocksParsed);\n\n            _data__WEBPACK_IMPORTED_MODULE_1__.blocksData.forEach((data) => {\n                (0,_visualization__WEBPACK_IMPORTED_MODULE_2__.addBlockVisualization)(data);\n            });\n\n\n        } else {\n            // to do: fehlermeldung auf der Seite ausgebe\n            console.log(data.message);\n        }\n\n    } catch (error) {\n        console.error('Something went wrong:', error);\n    }\n}\n\n//loads the block form for editing a existing block instance\nconst editBlock = (instanceID, blockID) => {\n    ;(0,_data__WEBPACK_IMPORTED_MODULE_1__.setBlockMethod)(\"update\");\n\n    // selects the block from the blockData Array. ID is passed as a parameter when setting up the event listener for the edit button\n    const data = _data__WEBPACK_IMPORTED_MODULE_1__.blocksData.find(block => block.instanceID === instanceID) || null;\n    // note: if we are working on a existing content, property databaseID whill exist at this point. If we are working on new content it wont\n\n    // returns if for some reason the data could not be found inside the array\n    if (data === null) {\n        console.log('Input to edit could not be found.');\n        return;\n    }\n\n    // the output set for this instance\n    const setOutput = data.output;\n\n    // set global currentInstanceID, so we now which instance form the array we want to update\n    (0,_data__WEBPACK_IMPORTED_MODULE_1__.setCurrentInstanceID)(instanceID);\n\n    // sets up the block Form with the existing output\n    (0,_blockForm__WEBPACK_IMPORTED_MODULE_3__.setupBlockForm)(blockID, setOutput);\n}\n\n// adds a block instance to the deletedBlocks array and removes the visualization\nconst deleteBlock = (instanceID) => {\n\n    // get the index of the block instance in the blocksData array\n    const index = _data__WEBPACK_IMPORTED_MODULE_1__.blocksData.findIndex(block => block.instanceID === instanceID);\n\n    if (index !== -1) {\n\n        // if we are editing existing content, we need to save the database id of the block instance, so we can delete it from the database later\n        if (_data__WEBPACK_IMPORTED_MODULE_1__.contentExists) {\n            _data__WEBPACK_IMPORTED_MODULE_1__.deletedBlocks.push(_data__WEBPACK_IMPORTED_MODULE_1__.blocksData[index].databaseID);\n        }\n\n        // remove instance from the array\n        _data__WEBPACK_IMPORTED_MODULE_1__.blocksData.splice(index, 1);\n\n        // we also need to remove the visualization\n        (0,_visualization__WEBPACK_IMPORTED_MODULE_2__.deleteBlockVisualization)(instanceID);\n\n    }\n}\n\n// reloads the blockData array and also reloads the block visualizations\nconst reloadBlocks = async (id) => {\n    ;(0,_data__WEBPACK_IMPORTED_MODULE_1__.clearBlocksData)();\n    (0,_data__WEBPACK_IMPORTED_MODULE_1__.clearDeletedBlocks)();\n    _dom__WEBPACK_IMPORTED_MODULE_0__[\"default\"].blocksArea.innerHTML = \"\";\n    getBlocks(id);\n}\n\n// updating a existing block instance in the blockData array and update the visualization\nconst updateBlock = (data) => {\n\n    // get the index of the block instance in the blockData array\n    const index = _data__WEBPACK_IMPORTED_MODULE_1__.blocksData.findIndex(block => block.instanceID === _data__WEBPACK_IMPORTED_MODULE_1__.currentInstanceID);\n\n    if (index !== -1 && _data__WEBPACK_IMPORTED_MODULE_1__.currentInstanceID !== 0) {\n        // the only thing that can change in a existing instance is the output. That way we can keep database id etc.\n        _data__WEBPACK_IMPORTED_MODULE_1__.blocksData[index].output = data.output;\n\n        // we also need to update the visualization\n        (0,_visualization__WEBPACK_IMPORTED_MODULE_2__.updateBlockVisualization)(_data__WEBPACK_IMPORTED_MODULE_1__.currentInstanceID, data);\n\n        (0,_blockForm__WEBPACK_IMPORTED_MODULE_3__.closeBlockForm)();\n    }\n}\n\n// saves a new block to the blockData array and creates new visualization\nconst saveNewBlock = (data) => {\n    // adds the id of the instance for the blockData Array. NOT the id for the database\n    data.instanceID = (0,_data__WEBPACK_IMPORTED_MODULE_1__.getInstanceId)();\n\n    _data__WEBPACK_IMPORTED_MODULE_1__.blocksData.push(data);\n    (0,_visualization__WEBPACK_IMPORTED_MODULE_2__.addBlockVisualization)(data);\n\n    (0,_blockForm__WEBPACK_IMPORTED_MODULE_3__.closeBlockForm)();\n}\n\n//# sourceURL=webpack://decupla/./public/script/editContent/modules/blocks.js?");

/***/ }),

/***/ "./public/script/editContent/modules/content.js":
/*!******************************************************!*\
  !*** ./public/script/editContent/modules/content.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   checkIfExists: () => (/* binding */ checkIfExists),\n/* harmony export */   getId: () => (/* binding */ getId)\n/* harmony export */ });\n// checks if we are creating new content or editing existing content\nconst checkIfExists = (path) => {\n    const regex = /^\\/content\\/edit\\/(\\d+)$/;\n    return path.match(regex);\n}\n\nconst getId = (path) => {\n    const parts = path.split(\"/\");\n    const id = parts[parts.length - 1];\n    return parseInt(id);\n}\n\n//# sourceURL=webpack://decupla/./public/script/editContent/modules/content.js?");

/***/ }),

/***/ "./public/script/editContent/modules/data.js":
/*!***************************************************!*\
  !*** ./public/script/editContent/modules/data.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   blockMethod: () => (/* binding */ blockMethod),\n/* harmony export */   blocksData: () => (/* binding */ blocksData),\n/* harmony export */   clearBlocksData: () => (/* binding */ clearBlocksData),\n/* harmony export */   clearDeletedBlocks: () => (/* binding */ clearDeletedBlocks),\n/* harmony export */   contentExists: () => (/* binding */ contentExists),\n/* harmony export */   contentID: () => (/* binding */ contentID),\n/* harmony export */   currentBlock: () => (/* binding */ currentBlock),\n/* harmony export */   currentInstanceID: () => (/* binding */ currentInstanceID),\n/* harmony export */   deletedBlocks: () => (/* binding */ deletedBlocks),\n/* harmony export */   getInstanceId: () => (/* binding */ getInstanceId),\n/* harmony export */   nextInstanceId: () => (/* binding */ nextInstanceId),\n/* harmony export */   setBlockMethod: () => (/* binding */ setBlockMethod),\n/* harmony export */   setContentExists: () => (/* binding */ setContentExists),\n/* harmony export */   setContentID: () => (/* binding */ setContentID),\n/* harmony export */   setCurrentBlock: () => (/* binding */ setCurrentBlock),\n/* harmony export */   setCurrentInstanceID: () => (/* binding */ setCurrentInstanceID)\n/* harmony export */ });\nlet blocksData = [];\n\n// if we are deleting existing block instances, the database ids of the blocks will be saved here \nlet deletedBlocks = [];\n// saves the data of the current block which is used to create or edit a instance \nlet currentBlock = {};\n// the ID of the block instance currently being edited. Used for updating the instance. Not used for the database!\nlet currentInstanceID = 0;\n// used for the blocksData array. Basically the better index. Not used for the database!\nlet nextInstanceId = 1;\n\nlet blockMethod = \"create\";\n\nlet contentExists = false;\n// if content already exist the id will be stored here\nlet contentID;\n\nconst setBlockMethod = (value) => blockMethod = value;\nconst setContentExists = (value) => contentExists = value;\nconst setContentID = (id) => contentID = id;\nconst setCurrentInstanceID = (id) => currentInstanceID = id;\nconst setCurrentBlock = (data) => currentBlock = data;\n\nconst clearBlocksData= () => {\n    blocksData = [];\n}\n\nconst clearDeletedBlocks= () => {\n    deletedBlocks = [];\n}\n\nconst getInstanceId = () => { \n    return nextInstanceId++ \n};\n\n//# sourceURL=webpack://decupla/./public/script/editContent/modules/data.js?");

/***/ }),

/***/ "./public/script/editContent/modules/dom.js":
/*!**************************************************!*\
  !*** ./public/script/editContent/modules/dom.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst DOM = {\n    contentForm: document.querySelector('form#contentForm'),\n    blocksArea: document.querySelector('#blocks'),\n    titleMessage: document.querySelector('#message-title'),\n    savedMessage: document.querySelector('#message-saved'),\n    addBlockButtonContainers: document.querySelectorAll('.addBlockContainer'),\n    blockFormWrapper: document.querySelector('#blockFormWrapper'),\n    blockFormTitle: document.querySelector('#blockFormTitle'),\n    blockForm: document.querySelector('form#blockForm'),\n    blockFormInput: document.querySelector('#blockFormInput')\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DOM);\n\n\n//# sourceURL=webpack://decupla/./public/script/editContent/modules/dom.js?");

/***/ }),

/***/ "./public/script/editContent/modules/eventHandler.js":
/*!***********************************************************!*\
  !*** ./public/script/editContent/modules/eventHandler.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   handleBlockSubmit: () => (/* binding */ handleBlockSubmit),\n/* harmony export */   handleContentSubmit: () => (/* binding */ handleContentSubmit)\n/* harmony export */ });\n/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom */ \"./public/script/editContent/modules/dom.js\");\n/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./data */ \"./public/script/editContent/modules/data.js\");\n/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./api */ \"./public/script/editContent/modules/api.js\");\n/* harmony import */ var _blocks__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./blocks */ \"./public/script/editContent/modules/blocks.js\");\n\n\n\n\n\nconst handleContentSubmit = async (event) => {\n    event.preventDefault();\n\n    const formData = new FormData(event.target);\n    // the data from the form. No blocks jet.\n    const data = Object.fromEntries(formData.entries());\n\n    if (!data.title) {\n        _dom__WEBPACK_IMPORTED_MODULE_0__[\"default\"].titleMessage.classList.add('visible');\n        return;\n    }\n\n    try {\n        let method = \"POST\";\n        let contentUrl = \"/content/\";\n\n        // if we are editing existing content, we need a different method and url\n        if (_data__WEBPACK_IMPORTED_MODULE_1__.contentExists) {\n            method = \"PUT\";\n            contentUrl = `/content/${_data__WEBPACK_IMPORTED_MODULE_1__.contentID}`;\n        }\n\n        const response = await (0,_api__WEBPACK_IMPORTED_MODULE_2__.saveContentData)(contentUrl, method, data);\n\n        // check if saving the basic data was successfull\n        if (!response.success) {\n            console.error(response.message);\n            return;\n        }\n\n        // if we are creating new content, we need the id of the new saved content \n        let newID;\n        if (!_data__WEBPACK_IMPORTED_MODULE_1__.contentExists) {\n            if ('newID' in response) {\n                newID = response.newID;\n            }\n        }\n\n        for (const instance of _data__WEBPACK_IMPORTED_MODULE_1__.blocksData) {\n            const instanceData = {\n                blockID: instance.blockID,\n                output: JSON.stringify(instance.output)\n            };\n\n            // if we are creating new content use the id of the new saved content, otherwise use the global contentID\n            if (!_data__WEBPACK_IMPORTED_MODULE_1__.contentExists) {\n                instanceData.contentID = newID;\n            } else {\n                instanceData.contentID = _data__WEBPACK_IMPORTED_MODULE_1__.contentID;\n            }\n\n            method = \"POST\"\n            let blockUrl = \"/blocks/instances/\"\n            //if the instance has the property 'databaseID' we need to update it in the database\n            if ('databaseID' in instance) {\n                method = \"PUT\";\n                blockUrl = `/blocks/instances/${instance.databaseID}`;\n            }\n\n            const blockResponse = await (0,_api__WEBPACK_IMPORTED_MODULE_2__.saveBlockData)(blockUrl, method, instanceData);\n\n            // check if saving the block data was successfull\n            if (!blockResponse.success) {\n                console.error(blockResponse.message);\n                return;\n            }\n        }\n\n        if (_data__WEBPACK_IMPORTED_MODULE_1__.contentExists && _data__WEBPACK_IMPORTED_MODULE_1__.deletedBlocks.length > 0) {\n            for (const id of _data__WEBPACK_IMPORTED_MODULE_1__.deletedBlocks) {\n                const deletedResponse = await (0,_api__WEBPACK_IMPORTED_MODULE_2__.deleteBlockInstance)(id);\n\n                // check if deleting the block data was successfull\n                if (!deletedResponse.success) {\n                    console.error(deletedResponse.message);\n                    return;\n                }\n            }\n        }\n\n        _dom__WEBPACK_IMPORTED_MODULE_0__[\"default\"].savedMessage.classList.add('visible');\n\n        // if we created new content we are now editing it after the first save\n        if (!_data__WEBPACK_IMPORTED_MODULE_1__.contentExists) {\n            (0,_data__WEBPACK_IMPORTED_MODULE_1__.setContentExists)(true);\n            (0,_data__WEBPACK_IMPORTED_MODULE_1__.setContentID)(newID);\n            (0,_blocks__WEBPACK_IMPORTED_MODULE_3__.reloadBlocks)(newID);\n        } else {\n            (0,_blocks__WEBPACK_IMPORTED_MODULE_3__.reloadBlocks)(_data__WEBPACK_IMPORTED_MODULE_1__.contentID);\n        }\n\n    } catch (error) {\n        console.error('An error occurred:', error);\n    }\n}\n\nconst handleBlockSubmit = (event) => {\n    event.preventDefault();\n\n    const formData = new FormData(event.target);\n    // the data of the block form. Only the output, no more informations about the block\n    const output = Object.fromEntries(formData.entries());\n\n    // the data we want to be saved in the blocksData Array\n    const data = {\n        title: _data__WEBPACK_IMPORTED_MODULE_1__.currentBlock.title,\n        blockID: _data__WEBPACK_IMPORTED_MODULE_1__.currentBlock.id,\n        output\n    }\n\n    if (_data__WEBPACK_IMPORTED_MODULE_1__.blockMethod === \"create\") {\n        (0,_blocks__WEBPACK_IMPORTED_MODULE_3__.saveNewBlock)(data);\n    } else if (_data__WEBPACK_IMPORTED_MODULE_1__.blockMethod === \"update\") {\n        (0,_blocks__WEBPACK_IMPORTED_MODULE_3__.updateBlock)(data);\n    } else {\n        console.log('No block method was given.');\n    }\n}\n\n//# sourceURL=webpack://decupla/./public/script/editContent/modules/eventHandler.js?");

/***/ }),

/***/ "./public/script/editContent/modules/visualization.js":
/*!************************************************************!*\
  !*** ./public/script/editContent/modules/visualization.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   addBlockVisualization: () => (/* binding */ addBlockVisualization),\n/* harmony export */   deleteBlockVisualization: () => (/* binding */ deleteBlockVisualization),\n/* harmony export */   updateBlockVisualization: () => (/* binding */ updateBlockVisualization)\n/* harmony export */ });\n/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom */ \"./public/script/editContent/modules/dom.js\");\n/* harmony import */ var _blocks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./blocks */ \"./public/script/editContent/modules/blocks.js\");\n\n\n\nconst addBlockVisualization = (data) => {\n    const block = document.createElement('div');\n    const blockTitle = document.createElement('h3');\n    const blockOutput = document.createElement('div');\n    const editButton = document.createElement('button');\n    const deleteButton = document.createElement('button');\n\n    block.classList.add('blockVis');\n    blockTitle.classList.add('title');\n    blockOutput.classList.add('output');\n    editButton.classList.add('edit');\n    deleteButton.classList.add('delete');\n\n    blockTitle.innerText = data.title;\n    editButton.innerText = \"edit\";\n    deleteButton.innerText = \"delete\";\n\n    block.dataset.instance = data.instanceID;\n\n    Object.entries(data.output).forEach(([key, value]) => {\n        const output = `<strong>${key}</strong>: ${value}<br>`;\n        blockOutput.innerHTML += output;\n    });\n\n    block.appendChild(blockTitle);\n    block.appendChild(blockOutput);\n    block.appendChild(editButton);\n    block.appendChild(deleteButton);\n    _dom__WEBPACK_IMPORTED_MODULE_0__[\"default\"].blocksArea.appendChild(block);\n\n    editButton.addEventListener('click', () => (0,_blocks__WEBPACK_IMPORTED_MODULE_1__.editBlock)(data.instanceID, data.blockID));\n    deleteButton.addEventListener('click', () => (0,_blocks__WEBPACK_IMPORTED_MODULE_1__.deleteBlock)(data.instanceID));\n};\n\n// updates a existing visualization\nconst updateBlockVisualization = (instanceID, data) => {\n    const vis = document.querySelector(`.blockVis[data-instance=\"${instanceID}\"]`);\n    const blockTitle = vis.querySelector('h3');\n    const blockOutput = vis.querySelector('.output');\n\n    blockTitle.innerText = data.title;\n\n    blockOutput.innerHTML = \"\";\n\n    Object.entries(data.output).forEach(([key, value]) => {\n        const output = `<strong>${key}</strong>: ${value}<br>`;\n        blockOutput.innerHTML += output;\n    });\n}\n\n// deletes a existing visualization\nconst deleteBlockVisualization = (instanceID) => {\n    const vis = document.querySelector(`.blockVis[data-instance=\"${instanceID}\"]`);\n    vis.remove();\n}\n\n//# sourceURL=webpack://decupla/./public/script/editContent/modules/visualization.js?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./public/script/editContent/main.js");
/******/ 	
/******/ })()
;