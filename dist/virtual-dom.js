/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["e"] = isString;
/* harmony export (immutable) */ __webpack_exports__["f"] = isArray;
/* harmony export (immutable) */ __webpack_exports__["b"] = isUndefined;
/* harmony export (immutable) */ __webpack_exports__["d"] = isUndef;
/* harmony export (immutable) */ __webpack_exports__["c"] = setAttr;
/* unused harmony export toArray */
/* harmony export (immutable) */ __webpack_exports__["a"] = each;
function isString(value) {
    return typeof value === 'string';
}
function isArray(value) {
    return Array.isArray(value);
}
function isUndefined(value) {
    return typeof value === 'undefined';
}
function isUndef(value) {
    return typeof value === 'undefined' || value === null;
}

function setAttr(node, key, value) {
    switch (key) {
        case 'style':
            let styleValue = '';
            if (isString(value)) {
                styleValue = value;
            } else {
                each(value, function (val, prop) {
                    styleValue += hump2lineae(prop) + ':' + String(val) + ';';
                });
            }
            node.style = styleValue;
            break;
        case 'value':
            var tagName = node.tagName || '';
            tagName = tagName.toLowerCase();
            if (tagName === 'input' || tagName === 'textarea') {
                node.value = value;
            } else {
                // if it is not a input or textarea, use `setAttribute` to set
                node.setAttribute(key, value);
            }
            break;
        default:
            node.setAttribute(key, value);
    }
}

function hump2lineae(str) {
    return str.replace(/[A-Z]/g, function (m, index) {
        return (index !== 0 ? '-' : '') + m.toLowerCase();
    });
}
function toArray(listLike) {
    if (!listLike) {
        return [];
    }

    var list = [];

    for (var i = 0, len = listLike.length; i < len; i++) {
        list.push(listLike[i]);
    }

    return list;
}

function each(list, fn) {
    if (Array.isArray(list)) {
        list.forEach(fn);
    } else if (typeof list === 'object') {
        for (const key in list) {
            fn(list[key], key);
        }
    }
}

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(0);


const types = {
    TEXT: 'TEXT',
    PROPS: 'PROPS',
    REPLACE: 'REPLACE',
    REMOVE: 'REMOVE',
    INSERT: 'INSERT'
};
/* harmony export (immutable) */ __webpack_exports__["b"] = types;


/* harmony default export */ __webpack_exports__["a"] = (function (node, patches) {
    var walker = {
        index: 0
    };
    dfsWalk(node, walker, patches);
});

function dfsWalk(node, walker, patches) {
    var currentPatches = patches[walker.index];

    var len = node.childNodes ? node.childNodes.length : 0;
    for (var i = 0; i < len; i++) {
        var child = node.childNodes[i];
        walker.index++;
        dfsWalk(child, walker, patches);
    }

    if (currentPatches) {
        applyPatches(node, currentPatches);
    }
}

function applyPatches(node, currentPatches) {
    var removeCount = 0;
    __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* each */](currentPatches, function (currentPatch) {
        switch (currentPatch.type) {
            case types.REPLACE:
                var newNode = typeof currentPatch.node === 'string' ? document.createTextNode(currentPatch.node) : currentPatch.node.render();
                node.parentNode.replaceChild(newNode, node);
                break;
            case types.INSERT:
                var insertNode = typeof currentPatch.node === 'object' ? currentPatch.node.render() : document.createTextNode(currentPatch.node);
                node.appendChild(insertNode);
                break;
            case types.REMOVE:
                var removeIndex = currentPatch.index - removeCount;
                node.removeChild(node.childNodes[removeIndex]);
                removeCount++;
                break;
            case types.PROPS:
                setProps(node, currentPatch.props);
                break;
            case types.TEXT:
                if (node.textContent) {
                    node.textContent = currentPatch.content;
                } else {
                    // IE
                    node.nodeValue = currentPatch.content;
                }
                break;
            default:
                throw new Error('Unknown patch type ' + currentPatch.type);
        }
    });
}

function setProps(node, props) {
    for (var key in props) {
        if (__WEBPACK_IMPORTED_MODULE_0__utils__["b" /* isUndefined */](props[key])) {
            node.removeAttribute(key);
        } else {
            var value = props[key];
            __WEBPACK_IMPORTED_MODULE_0__utils__["c" /* setAttr */](node, key, value);
        }
    }
}

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__patch__ = __webpack_require__(1);



/* harmony default export */ __webpack_exports__["a"] = (function (oldTree, newTree) {
    let index = 0;
    let patches = {};
    dfsWalk(oldTree, newTree, index, patches);
    return patches;
});

function dfsWalk(oldNode, newNode, index, patches) {
    let currentPatch = [];
    if (__WEBPACK_IMPORTED_MODULE_0__utils__["d" /* isUndef */](newNode)) {} else if (__WEBPACK_IMPORTED_MODULE_0__utils__["e" /* isString */](oldNode) && __WEBPACK_IMPORTED_MODULE_0__utils__["e" /* isString */](newNode)) {
        if (newNode !== oldNode) {
            currentPatch.push({
                type: __WEBPACK_IMPORTED_MODULE_1__patch__["b" /* types */].TEXT,
                content: newNode
            });
        }
    } else if (oldNode.tagName === newNode.tagName) {
        var propsPatches = diffProps(oldNode, newNode);
        if (propsPatches) {
            currentPatch.push({
                type: __WEBPACK_IMPORTED_MODULE_1__patch__["b" /* types */].PROPS,
                props: propsPatches
            });
        }
        diffChildren(oldNode.children, newNode.children, index, patches, currentPatch);
    } else {
        currentPatch.push({
            type: __WEBPACK_IMPORTED_MODULE_1__patch__["b" /* types */].REPLACE,
            node: newNode
        });
    }
    if (currentPatch.length) {
        patches[index] = currentPatch;
    }
}

function diffChildren(oldChildren, newChildren, index, patches, currentPatch) {
    var leftNode = null;
    var currentNodeIndex = index;
    __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* each */](oldChildren, function (child, i) {
        var newChild = newChildren[i];
        if (newChild) {
            currentNodeIndex = leftNode && leftNode.count ? currentNodeIndex + leftNode.count + 1 : currentNodeIndex + 1;
            dfsWalk(child, newChild, currentNodeIndex, patches);
            leftNode = child;
        } else {
            currentPatch.push({
                type: __WEBPACK_IMPORTED_MODULE_1__patch__["b" /* types */].REMOVE,
                index: i
            });
        }
    });
    if (oldChildren.length < newChildren.length) {
        let i = oldChildren.length;
        while (i < newChildren.length) {
            var newChild = newChildren[i];
            currentPatch.push({
                type: __WEBPACK_IMPORTED_MODULE_1__patch__["b" /* types */].INSERT,
                node: newChild
            });
            i++;
        }
    }
}

function diffProps(oldNode, newNode) {
    let hasDiff = false;
    let oldProps = oldNode.props;
    let newProps = newNode.props;

    let key, value;
    let propsPatches = {};

    // Find out different properties
    for (key in oldProps) {
        value = oldProps[key];
        if (newProps[key] !== value) {
            hasDiff = true;
            propsPatches[key] = newProps[key];
        }
    }

    // Find out new property
    for (key in newProps) {
        value = newProps[key];
        if (!oldProps.hasOwnProperty(key)) {
            hasDiff = true;
            propsPatches[key] = newProps[key];
        }
    }

    if (hasDiff) {
        return propsPatches;
    }
    // If properties all are identical
    return null;
}

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(0);


class Element {
    constructor(tagName, props, children) {
        if (__WEBPACK_IMPORTED_MODULE_0__utils__["f" /* isArray */](props)) {
            children = props;
            props = {};
        }

        this.tagName = tagName;
        this.props = props || {};
        this.key = props ? props.key : void 0;
        this.children = children || [];
        var count = 0;

        __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* each */](this.children, function (child, i) {
            if (child instanceof Element) {
                count += child.count;
            } else {
                children[i] = '' + child;
            }
            count++;
        });

        this.count = count;
    }
    render() {
        let el = document.createElement(this.tagName);
        let props = this.props;

        for (const propName in props) {
            __WEBPACK_IMPORTED_MODULE_0__utils__["c" /* setAttr */](el, propName, props[propName]);
        }

        let children = this.children || [];

        children.forEach(child => {
            let childEl = child instanceof Element ? child.render() : document.createTextNode(child);
            el.appendChild(childEl);
        });

        return el;
    }
}

/* harmony default export */ __webpack_exports__["a"] = (function (tagName, props, children) {
    return new Element(tagName, props, children);
});

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_element_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_diff_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_patch_js__ = __webpack_require__(1);




let tree = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__src_element_js__["a" /* default */])('ul', {
    id: 'list'
}, [__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__src_element_js__["a" /* default */])('li', {
    class: 'item'
}, ['Item 1']), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__src_element_js__["a" /* default */])('li', {
    class: 'item'
}, ['Item 2']), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__src_element_js__["a" /* default */])('li', {
    class: 'item'
}, ['Item 3'])]);

let app = document.getElementById('app');

let ulRoot = tree.render();
app.appendChild(ulRoot);

let newTree = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__src_element_js__["a" /* default */])('ul', {
    class: 'goods-list'
}, [__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__src_element_js__["a" /* default */])('li', { id: 'first' }, ['Item 2']), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__src_element_js__["a" /* default */])('li', ['Item 4']), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__src_element_js__["a" /* default */])('li', ['Item 5']), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__src_element_js__["a" /* default */])('li', ['Item 6']), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__src_element_js__["a" /* default */])('li')]);

let patches = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__src_diff_js__["a" /* default */])(tree, newTree);

__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__src_patch_js__["a" /* default */])(ulRoot, patches);

/***/ })
/******/ ]);