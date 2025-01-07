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

/***/ "./public/script/editBlock/main.js":
/*!*****************************************!*\
  !*** ./public/script/editBlock/main.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/dom */ \"./public/script/editBlock/modules/dom.js\");\n/* harmony import */ var _modules_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/data */ \"./public/script/editBlock/modules/data.js\");\n/* harmony import */ var _modules_block__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/block */ \"./public/script/editBlock/modules/block.js\");\n/* harmony import */ var _modules_blockForm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/blockForm */ \"./public/script/editBlock/modules/blockForm.js\");\n/* harmony import */ var _modules_input__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/input */ \"./public/script/editBlock/modules/input.js\");\n/* harmony import */ var _modules_eventHandler__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/eventHandler */ \"./public/script/editBlock/modules/eventHandler.js\");\n\n\n\n\n\n\n\nconst init = async () => {\n    const path = window.location.pathname;\n    (0,_modules_data__WEBPACK_IMPORTED_MODULE_1__.setBlockExists)((0,_modules_block__WEBPACK_IMPORTED_MODULE_2__.checkIfExists)(path));\n\n    if(_modules_data__WEBPACK_IMPORTED_MODULE_1__.blockExists){\n        (0,_modules_data__WEBPACK_IMPORTED_MODULE_1__.setBlockID)(((0,_modules_block__WEBPACK_IMPORTED_MODULE_2__.getId)(path)));\n        await (0,_modules_input__WEBPACK_IMPORTED_MODULE_4__.getInputData)(_modules_data__WEBPACK_IMPORTED_MODULE_1__.blockID);\n\n        if (_modules_data__WEBPACK_IMPORTED_MODULE_1__.inputData.length > 0) {\n            const highestId = Math.max(..._modules_data__WEBPACK_IMPORTED_MODULE_1__.inputData.map(input => input.id));\n            (0,_modules_data__WEBPACK_IMPORTED_MODULE_1__.setNextInputId)(highestId+1);\n        }\n    }\n\n    console.log(_modules_dom__WEBPACK_IMPORTED_MODULE_0__[\"default\"].addInputContainers);\n    _modules_dom__WEBPACK_IMPORTED_MODULE_0__[\"default\"].addInputContainers.forEach((container)=>{\n        (0,_modules_blockForm__WEBPACK_IMPORTED_MODULE_3__.setupBlockForm)(container);\n    })\n\n    _modules_dom__WEBPACK_IMPORTED_MODULE_0__[\"default\"].blockForm.addEventListener('submit', _modules_eventHandler__WEBPACK_IMPORTED_MODULE_5__.handleBlockSubmit);\n}\n\ninit();\n\n//# sourceURL=webpack://decupla/./public/script/editBlock/main.js?");

/***/ }),

/***/ "./public/script/editBlock/modules/api.js":
/*!************************************************!*\
  !*** ./public/script/editBlock/modules/api.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getBlockById: () => (/* binding */ getBlockById),\n/* harmony export */   getBlockByKey: () => (/* binding */ getBlockByKey),\n/* harmony export */   saveBlock: () => (/* binding */ saveBlock)\n/* harmony export */ });\nconst getBlockById = async (id) => {\n    const response = await fetch(`/blocks/${id}`);\n    return response.json();\n}\n\nconst getBlockByKey = async (key) => {\n    const response = await fetch(`/blocks/key/${key}`);\n    return response.json();\n}\n\nconst saveBlock = async (url, method, data) => {\n    const response = await fetch(url, {\n        method,\n        headers: { 'Content-Type': 'application/json' },\n        body: JSON.stringify(data),\n    });\n    return response.json();\n};\n\n//# sourceURL=webpack://decupla/./public/script/editBlock/modules/api.js?");

/***/ }),

/***/ "./public/script/editBlock/modules/block.js":
/*!**************************************************!*\
  !*** ./public/script/editBlock/modules/block.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   checkIfExists: () => (/* binding */ checkIfExists),\n/* harmony export */   getId: () => (/* binding */ getId),\n/* harmony export */   keyExists: () => (/* binding */ keyExists)\n/* harmony export */ });\n/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api */ \"./public/script/editBlock/modules/api.js\");\n\n\n// checks if we are creating a new block or editing a existing block\nconst checkIfExists = (path) => {\n    const regex = /^\\/blocks\\/edit\\/(\\d+)$/;\n    return path.match(regex);\n}\n\nconst getId = (path) => {\n    const parts = path.split(\"/\");\n    const id = parts[parts.length - 1];\n    return parseInt(id);\n}\n\nconst keyExists = async (key) => {\n    const result = await (0,_api__WEBPACK_IMPORTED_MODULE_0__.getBlockByKey)(key);\n    return result.success;\n}\n\n//# sourceURL=webpack://decupla/./public/script/editBlock/modules/block.js?");

/***/ }),

/***/ "./public/script/editBlock/modules/blockForm.js":
/*!******************************************************!*\
  !*** ./public/script/editBlock/modules/blockForm.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   setupBlockForm: () => (/* binding */ setupBlockForm)\n/* harmony export */ });\n/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom */ \"./public/script/editBlock/modules/dom.js\");\n/* harmony import */ var _eventHandler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./eventHandler */ \"./public/script/editBlock/modules/eventHandler.js\");\n/* harmony import */ var _input__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./input */ \"./public/script/editBlock/modules/input.js\");\n\n\n\n\nconst setupBlockForm = (container) => {\n    // sets all event listeners needed to interact with the block creation\n    const addInputButton = container.querySelector('button.add-input');\n    const inputForm = container.querySelector('.add-input-form');\n    const typeField = inputForm.querySelector('select.type');\n\n    addInputButton.addEventListener('click', () => (0,_input__WEBPACK_IMPORTED_MODULE_2__.createInput)(container));\n    inputForm.addEventListener('submit', _eventHandler__WEBPACK_IMPORTED_MODULE_1__.handleInputSubmit);\n\n    typeField.addEventListener('change', (event) => {\n        (0,_eventHandler__WEBPACK_IMPORTED_MODULE_1__.handleTypeChange)(event.target.value,inputForm);\n    });\n};\n\n//# sourceURL=webpack://decupla/./public/script/editBlock/modules/blockForm.js?");

/***/ }),

/***/ "./public/script/editBlock/modules/data.js":
/*!*************************************************!*\
  !*** ./public/script/editBlock/modules/data.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   blockExists: () => (/* binding */ blockExists),\n/* harmony export */   blockID: () => (/* binding */ blockID),\n/* harmony export */   getInputId: () => (/* binding */ getInputId),\n/* harmony export */   inputData: () => (/* binding */ inputData),\n/* harmony export */   inputID: () => (/* binding */ inputID),\n/* harmony export */   inputMethod: () => (/* binding */ inputMethod),\n/* harmony export */   nextInputId: () => (/* binding */ nextInputId),\n/* harmony export */   setBlockExists: () => (/* binding */ setBlockExists),\n/* harmony export */   setBlockID: () => (/* binding */ setBlockID),\n/* harmony export */   setInputID: () => (/* binding */ setInputID),\n/* harmony export */   setInputMethod: () => (/* binding */ setInputMethod),\n/* harmony export */   setNextInputId: () => (/* binding */ setNextInputId)\n/* harmony export */ });\nconst inputData = [];\n\nlet inputMethod = \"create\";\n// the id of the input in the inputData array we are editing at the moment\nlet inputID;\n// used for the inputData array. Basically the better index. Not used for the database!\nlet nextInputId = 1;\n// tells if we are editing a existing block\nlet blockExists;\n// if we are editing a existing block, the id of the block will be stored here\nlet blockID;\n\nconst setInputMethod = (value) =>  inputMethod = value;\nconst setInputID = (id) => inputID = id;\nconst setBlockExists = (value) => blockExists = value;\nconst setBlockID = (id) => blockID = id;\n\nconst getInputId = () => {\n    return nextInputId++;\n}\n\nconst setNextInputId = (id) => nextInputId = id;\n\n//# sourceURL=webpack://decupla/./public/script/editBlock/modules/data.js?");

/***/ }),

/***/ "./public/script/editBlock/modules/dom.js":
/*!************************************************!*\
  !*** ./public/script/editBlock/modules/dom.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst DOM = {};\nDOM.blockForm = document.querySelector('form#create-block');\nDOM.addInputContainers = document.querySelectorAll('.add-input-container'); //+\nDOM.addInputButton = document.querySelector('button.add-input'); //-\nDOM.inputCreation = document.querySelector('.input-creation'); // used for clone\nDOM.inputForm = document.querySelector('.add-input-form'); //-\nDOM.titleInput = document.querySelector('input#title');\nDOM.keyInput = document.querySelector('input#key');\nDOM.fieldsArea = document.querySelector('#input-fields');\nDOM.messageSuccess = document.querySelector('#message-success');\n\nDOM.inputFormFields = {}; //-\nDOM.inputFormFields.type = DOM.inputForm.querySelector('select#type'); //-\nDOM.inputFormFields.name = DOM.inputForm.querySelector('input#name'); //-\nDOM.inputFormFields.label = DOM.inputForm.querySelector('input#label'); //-\nDOM.inputFormFields.maxLength = DOM.inputForm.querySelector('input#max-length'); //-\n\nDOM.fieldMessages = {};\nDOM.fieldMessages.title = document.querySelector('#message-title');\nDOM.fieldMessages.key = document.querySelector('#message-key');\nDOM.fieldMessages.type = document.querySelector('.message-type'); //-\nDOM.fieldMessages.name = document.querySelector('.message-name'); //-\nDOM.fieldMessages.label = document.querySelector('.message-label'); //-\nDOM.fieldMessages.maxLength = document.querySelector('.message-max-length'); //-\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DOM);\n\n//# sourceURL=webpack://decupla/./public/script/editBlock/modules/dom.js?");

/***/ }),

/***/ "./public/script/editBlock/modules/eventHandler.js":
/*!*********************************************************!*\
  !*** ./public/script/editBlock/modules/eventHandler.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   handleBlockSubmit: () => (/* binding */ handleBlockSubmit),\n/* harmony export */   handleInputSubmit: () => (/* binding */ handleInputSubmit),\n/* harmony export */   handleTypeChange: () => (/* binding */ handleTypeChange)\n/* harmony export */ });\n/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom */ \"./public/script/editBlock/modules/dom.js\");\n/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./api */ \"./public/script/editBlock/modules/api.js\");\n/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./data */ \"./public/script/editBlock/modules/data.js\");\n/* harmony import */ var _validation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./validation */ \"./public/script/editBlock/modules/validation.js\");\n/* harmony import */ var _input__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./input */ \"./public/script/editBlock/modules/input.js\");\n\n\n\n\n\n\n// called when the type of a input is changed while creating / editing input\nconst handleTypeChange = (type,element) => {\n    switch (type) {\n        case 'shortText':\n            (0,_input__WEBPACK_IMPORTED_MODULE_4__.setVisible)(['name', 'label', 'type', 'max-length'],element);\n            break;\n        case 'LongText':\n            (0,_input__WEBPACK_IMPORTED_MODULE_4__.setVisible)(['name', 'label', 'type'],element);\n            break;\n        default:\n            (0,_input__WEBPACK_IMPORTED_MODULE_4__.setVisible)(['name', 'label', 'type'],element);\n    }\n}\n\n// called when the input form is submitted\nconst handleInputSubmit = (event) => {\n    event.preventDefault();\n    const formData = new FormData(event.target);\n    const data = Object.fromEntries(formData.entries());\n\n    if (_data__WEBPACK_IMPORTED_MODULE_2__.inputMethod === \"create\") {\n        (0,_input__WEBPACK_IMPORTED_MODULE_4__.saveNewInput)(data);\n    } else if (_data__WEBPACK_IMPORTED_MODULE_2__.inputMethod === \"update\") {\n        (0,_input__WEBPACK_IMPORTED_MODULE_4__.updateInput)(data);\n    } else {\n        console.log('No input method was given.');\n    }\n}\n\n//handles the event when the main form (block) is submitted\nconst handleBlockSubmit = async (event) => {\n    event.preventDefault();\n    const formData = new FormData(event.target);\n    const data = Object.fromEntries(formData.entries());\n    data.title = _dom__WEBPACK_IMPORTED_MODULE_0__[\"default\"].titleInput.value;\n    data.key = _dom__WEBPACK_IMPORTED_MODULE_0__[\"default\"].keyInput.value;\n\n    data.input = JSON.stringify(_data__WEBPACK_IMPORTED_MODULE_2__.inputData);\n\n    let method = \"POST\"\n    let url = \"/blocks\";\n\n    // if we are editing a existing block, we need a different method and url\n    if (_data__WEBPACK_IMPORTED_MODULE_2__.blockExists) {\n        method = \"PUT\";\n        url = `/blocks/${_data__WEBPACK_IMPORTED_MODULE_2__.blockID}`;\n    }\n\n    try {\n        console.log(data);\n        const response = await (0,_api__WEBPACK_IMPORTED_MODULE_1__.saveBlock)(url, method, data)\n\n        if (!response.validation) {\n            const messages = response.messages;\n            console.log(messages);\n\n            for (const [field, message] of Object.entries(messages)) {\n                (0,_validation__WEBPACK_IMPORTED_MODULE_3__.setFieldMessage)(field,message);\n            }\n\n            return;\n        } else if (response.success) {\n            _dom__WEBPACK_IMPORTED_MODULE_0__[\"default\"].messageSuccess.classList.add('visible');\n\n            if (!_data__WEBPACK_IMPORTED_MODULE_2__.blockExists && 'newID' in response) {\n                (0,_data__WEBPACK_IMPORTED_MODULE_2__.setBlockExists)(true);\n                (0,_data__WEBPACK_IMPORTED_MODULE_2__.setBlockID)(response.newID);\n            } else if (!_data__WEBPACK_IMPORTED_MODULE_2__.blockExists) {\n                console.error('could not get id of the created block')\n            }\n\n        } else {\n            console.error('Something went wrong while trying to save the block');\n        }\n    } catch (error) {\n        console.error('Something went wrong:', error);\n    }\n}\n\n//# sourceURL=webpack://decupla/./public/script/editBlock/modules/eventHandler.js?");

/***/ }),

/***/ "./public/script/editBlock/modules/input.js":
/*!**************************************************!*\
  !*** ./public/script/editBlock/modules/input.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createInput: () => (/* binding */ createInput),\n/* harmony export */   deleteInput: () => (/* binding */ deleteInput),\n/* harmony export */   editInput: () => (/* binding */ editInput),\n/* harmony export */   getInputData: () => (/* binding */ getInputData),\n/* harmony export */   saveNewInput: () => (/* binding */ saveNewInput),\n/* harmony export */   setVisible: () => (/* binding */ setVisible),\n/* harmony export */   updateInput: () => (/* binding */ updateInput)\n/* harmony export */ });\n/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom */ \"./public/script/editBlock/modules/dom.js\");\n/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./data */ \"./public/script/editBlock/modules/data.js\");\n/* harmony import */ var _eventHandler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./eventHandler */ \"./public/script/editBlock/modules/eventHandler.js\");\n/* harmony import */ var _validation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./validation */ \"./public/script/editBlock/modules/validation.js\");\n/* harmony import */ var _visualization__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./visualization */ \"./public/script/editBlock/modules/visualization.js\");\n/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./api */ \"./public/script/editBlock/modules/api.js\");\n\n\n\n\n\n\n\n// sets which settings should be visible in the input creation, hides all other settings\nconst setVisible = (fields,element) => {\n    const inputFields = element.querySelectorAll('input');\n\n    inputFields.forEach((field)=>{\n        parent = field.parentElement;\n\n        if (fields.includes(field.name) && !parent.classList.contains('visible')) {\n            parent.classList.add('visible');\n        } else if (!fields.includes(field.name) && parent.classList.contains('visible')) {\n            parent.classList.remove('visible');\n        }\n    })\n\n    // for (const [name, element] of Object.entries(inputFields)) {\n    //     const parent = element.parentElement;\n    //     console.log(name);\n    //     if (fields.includes(name) && !parent.classList.contains('visible')) {\n    //         parent.classList.add('visible');\n    //     } else if (!fields.includes(name) && parent.classList.contains('visible')) {\n    //         parent.classList.remove('visible');\n    //     }\n    // }\n}\n\n// opens the input form to create a new input\nconst createInput = (container) => {\n    ;(0,_data__WEBPACK_IMPORTED_MODULE_1__.setInputMethod)(\"create\");\n    // handleTypeChange(DOM.inputForm.type.value);\n    toggleInputCreation(container);\n}\n\nconst toggleInputCreation = (container) => {\n    closeInputCreation();\n    container.classList.add('show-input-creation');\n}\n\nconst closeInputCreation = () => {\n    const containers = document.querySelectorAll('.show-input-creation');\n    containers.forEach((container)=>{\n        const form = container.querySelector('form.add-input-form');\n        if(form){\n            form.reset();\n        }\n\n        container.classList.remove('show-input-creation');\n    })\n}\n\n// get the existing input fields of the block\nconst getInputData = async (id) => {\n    try {\n        const blockData = await (0,_api__WEBPACK_IMPORTED_MODULE_5__.getBlockById)(id);\n        if (blockData.success === true) {\n            const input = JSON.parse(blockData.block.input);\n            _data__WEBPACK_IMPORTED_MODULE_1__.inputData.push(...input);\n\n            _data__WEBPACK_IMPORTED_MODULE_1__.inputData.forEach((data) => {\n                (0,_visualization__WEBPACK_IMPORTED_MODULE_4__.addInputVisualization)(data);\n            });\n\n        } else {\n            // to do: fehlermeldung auf der Seite ausgebe\n            console.log(blockData.message);\n        }\n    } catch (error) {\n        console.error('Something went wrong:', error);\n    }\n};\n\n// opens the input form to edit a existing input from the inputData array\nconst editInput = (id,container) => {\n    (0,_data__WEBPACK_IMPORTED_MODULE_1__.setInputMethod)(\"update\");\n\n    const data = _data__WEBPACK_IMPORTED_MODULE_1__.inputData.find(input => input.id === id) || null;\n    if (data === null) {\n        console.log('Input to edit could not be found.');\n        return;\n    }\n\n    console.log(data);\n\n    container.querySelector('select[name=\"type\"]').value = data.type;\n    container.querySelector('input[name=\"name\"]').value = data.name;\n    container.querySelector('input[name=\"label\"]').value = data.label;\n\n    if ('maxLength' in data) {\n        container.querySelector('input[name=\"max-length\"]').value = data.maxLength;\n    }\n\n    (0,_data__WEBPACK_IMPORTED_MODULE_1__.setInputID)(id);\n    (0,_eventHandler__WEBPACK_IMPORTED_MODULE_2__.handleTypeChange)(data.type,container);\n    toggleInputCreation(container);\n}\n\n// deletes existing input from the inputData array\nconst deleteInput = (id) => {\n    const index = _data__WEBPACK_IMPORTED_MODULE_1__.inputData.findIndex(input => input.id === id);\n\n    if (index !== -1) {\n        // remove input from the array\n        _data__WEBPACK_IMPORTED_MODULE_1__.inputData.splice(index, 1);\n        // delete the visualization\n        (0,_visualization__WEBPACK_IMPORTED_MODULE_4__.deleteInputVisualization)(id);\n\n    }\n}\n\nconst saveNewInput = (data) => {\n    if (!(0,_validation__WEBPACK_IMPORTED_MODULE_3__.validateInput)(data, true)) return;\n    data.id = (0,_data__WEBPACK_IMPORTED_MODULE_1__.getInputId)();\n    _data__WEBPACK_IMPORTED_MODULE_1__.inputData.push(data);\n    (0,_visualization__WEBPACK_IMPORTED_MODULE_4__.addInputVisualization)(data);\n    closeInputCreation();\n    _dom__WEBPACK_IMPORTED_MODULE_0__[\"default\"].inputForm.reset();\n};\n\n// updates existing input in the inputData array\nconst updateInput = (data) => {\n    const index = _data__WEBPACK_IMPORTED_MODULE_1__.inputData.findIndex(input => input.id === _data__WEBPACK_IMPORTED_MODULE_1__.inputID);\n    if (index === -1 || _data__WEBPACK_IMPORTED_MODULE_1__.inputID === 0) {\n        console.error('The data of the input field could not be found.');\n        return;\n    }\n\n    if (_data__WEBPACK_IMPORTED_MODULE_1__.inputData[index].name !== data.name) {\n        if (!(0,_validation__WEBPACK_IMPORTED_MODULE_3__.validateInput)(data, true)) return;\n    } else if (!(0,_validation__WEBPACK_IMPORTED_MODULE_3__.validateInput)(data)) {\n        return;\n    }\n\n    data.id = _data__WEBPACK_IMPORTED_MODULE_1__.inputID;\n    _data__WEBPACK_IMPORTED_MODULE_1__.inputData[index] = data;\n    (0,_visualization__WEBPACK_IMPORTED_MODULE_4__.updateInputVisualization)(_data__WEBPACK_IMPORTED_MODULE_1__.inputID, data);\n    closeInputCreation();\n};\n\n//# sourceURL=webpack://decupla/./public/script/editBlock/modules/input.js?");

/***/ }),

/***/ "./public/script/editBlock/modules/validation.js":
/*!*******************************************************!*\
  !*** ./public/script/editBlock/modules/validation.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   setFieldMessage: () => (/* binding */ setFieldMessage),\n/* harmony export */   validateInput: () => (/* binding */ validateInput)\n/* harmony export */ });\n/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom */ \"./public/script/editBlock/modules/dom.js\");\n/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./data */ \"./public/script/editBlock/modules/data.js\");\n\n\n\nconst validateInput = (data, newName = false) => {\n    resetMessages();\n\n    let isValid = true;\n\n    if (!data.name) {\n        setFieldMessage('name', '\"name\" is required.');\n        isValid = false;\n    }\n    if (data.name.includes(\" \")) {\n        setFieldMessage('name', '\"name\" cannot contain spaces.')\n        isValid = false;\n    }\n    if (!data.label) {\n        setFieldMessage('label', '\"label\" is required.');\n        isValid = false;\n    }\n    if (newName && nameExists(data.name)) {\n        setFieldMessage('name', `Input with name \"${data.name}\" already exists`);\n        isValid = false;\n    }\n\n    return isValid;\n};\n\nconst setFieldMessage = (field, message) => {\n\n    const fieldMessageElement = _dom__WEBPACK_IMPORTED_MODULE_0__[\"default\"].fieldMessages[field];\n    if (fieldMessageElement) {\n        fieldMessageElement.innerText = message;\n        fieldMessageElement.classList.add('visible');\n    } else {\n        console.log(`Field \"${field}\" does not exist.`);\n    }\n};\n\n//check if the name of a input already exists\nconst nameExists = (name) => {\n    return _data__WEBPACK_IMPORTED_MODULE_1__.inputData.some(obj => obj.name === name);\n}\n\nconst resetMessages = () => {\n    for (const [name, element] of Object.entries(_dom__WEBPACK_IMPORTED_MODULE_0__[\"default\"].fieldMessages)) {\n        if(element.classList.contains('visible')){\n            element.classList.remove('visible');\n        }\n      }\n}\n\n//# sourceURL=webpack://decupla/./public/script/editBlock/modules/validation.js?");

/***/ }),

/***/ "./public/script/editBlock/modules/visualization.js":
/*!**********************************************************!*\
  !*** ./public/script/editBlock/modules/visualization.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   addInputVisualization: () => (/* binding */ addInputVisualization),\n/* harmony export */   deleteInputVisualization: () => (/* binding */ deleteInputVisualization),\n/* harmony export */   updateInputVisualization: () => (/* binding */ updateInputVisualization)\n/* harmony export */ });\n/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom */ \"./public/script/editBlock/modules/dom.js\");\n/* harmony import */ var _eventHandler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./eventHandler */ \"./public/script/editBlock/modules/eventHandler.js\");\n/* harmony import */ var _input__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./input */ \"./public/script/editBlock/modules/input.js\");\n\n\n\n\n// adds the visualization of a input to the page\nconst addInputVisualization = (data) => {\n    const container = document.createElement('div');\n    const input = document.createElement('div');\n    const titleContainer = document.createElement('div');\n    const inputTitle = document.createElement('h3');\n    const inputParams = document.createElement('div');\n    const buttons = document.createElement('div');\n    const editButton = document.createElement('button');\n    const deleteButton = document.createElement('button');\n    const editIcon = document.createElement('img');\n    const deleteIcon = document.createElement('img');\n\n    editIcon.src = \"/images/icons/edit.png\";\n    editIcon.alt = \"edit\";\n    deleteIcon.src = \"/images/icons/delete_red.png\";\n    deleteIcon.alt = \"delete\";\n\n    container.classList.add('input-vis-container')\n    input.classList.add('input-vis');\n    input.classList.add('visualization');\n    titleContainer.classList.add('title-container');\n    inputTitle.classList.add('label');\n    inputParams.classList.add('params');\n    buttons.classList.add('buttons');\n    editButton.classList.add('edit');\n    deleteButton.classList.add('delete');\n\n    inputTitle.innerText = data.label;\n\n    input.dataset.id = data.id;\n\n    Object.entries(data).forEach(([key, value]) => {\n        if (key !== 'label' && key !== 'id' && value !== \"\") {\n            const param = `<strong>${key}</strong>: ${value}<br>`;\n            inputParams.innerHTML += param;\n        }\n    });\n\n    editButton.appendChild(editIcon);\n    deleteButton.appendChild(deleteIcon);\n    buttons.appendChild(editButton);\n    buttons.appendChild(deleteButton)\n\n    titleContainer.appendChild(inputTitle);\n    titleContainer.appendChild(buttons);\n\n    input.appendChild(titleContainer);\n    input.appendChild(inputParams);\n\n    const inputCreationClone = _dom__WEBPACK_IMPORTED_MODULE_0__[\"default\"].inputCreation.cloneNode(true);\n    const inputForm = inputCreationClone.querySelector('form');\n    const typeSelect = inputForm.querySelector('select[name=\"type\"]');\n\n    container.appendChild(input);\n    container.appendChild(inputCreationClone);\n\n    _dom__WEBPACK_IMPORTED_MODULE_0__[\"default\"].fieldsArea.appendChild(container);\n\n    editButton.addEventListener('click', () => {\n        (0,_input__WEBPACK_IMPORTED_MODULE_2__.editInput)(data.id,container);\n    });\n    deleteButton.addEventListener('click', () => {\n        (0,_input__WEBPACK_IMPORTED_MODULE_2__.deleteInput)(data.id);\n    })\n    typeSelect.addEventListener('change', (event) => {\n        ;(0,_eventHandler__WEBPACK_IMPORTED_MODULE_1__.handleTypeChange)(event.target.value,container);\n    })\n    inputForm.addEventListener('submit', (event) => {\n        ;(0,_eventHandler__WEBPACK_IMPORTED_MODULE_1__.handleInputSubmit)(event);\n    })\n}\n\n// deletes a exisiting visualization of a input\nconst deleteInputVisualization = (id) => {\n    const vis = document.querySelector(`.input-vis[data-id=\"${id}\"]`);\n    vis.remove();\n}\n\n// updates a exisiting visualization of a input\nconst updateInputVisualization = (id, data) => {\n    const vis = document.querySelector(`.input-vis[data-id=\"${id}\"]`);\n    const inputTitle = vis.querySelector('h3');\n    const inputParams = vis.querySelector('.params');\n\n    inputTitle.innerText = data.label;\n\n\n    inputParams.innerHTML = \"\";\n\n    Object.entries(data).forEach(([key, value]) => {\n        if (key !== 'label' && key !== 'id' && value !== \"\") {\n            const param = `<strong>${key}</strong>: ${value}<br>`;\n            inputParams.innerHTML += param;\n        }\n    });\n}\n\n//# sourceURL=webpack://decupla/./public/script/editBlock/modules/visualization.js?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./public/script/editBlock/main.js");
/******/ 	
/******/ })()
;