(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("tdweb", [], factory);
	else if(typeof exports === 'object')
		exports["tdweb"] = factory();
	else
		root["tdweb"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(13);


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = false;



/***/ }),
/* 2 */
/***/ (function(module, exports) {

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

module.exports = _asyncToGenerator;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

module.exports = _classCallCheck;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

module.exports = _createClass;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

function _typeof2(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

function _typeof(obj) {
  if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
    module.exports = _typeof = function _typeof(obj) {
      return _typeof2(obj);
    };
  } else {
    module.exports = _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
    };
  }

  return _typeof(obj);
}

module.exports = _typeof;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var arrayWithHoles = __webpack_require__(10);

var iterableToArrayLimit = __webpack_require__(11);

var nonIterableRest = __webpack_require__(12);

function _slicedToArray(arr, i) {
  return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || nonIterableRest();
}

module.exports = _slicedToArray;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

module.exports=(function(){var _c="(function(){var _f=self.fetch.bind(self);self.fetch=function(u,o){if(typeof u==='string'&&!/^(https?:|blob:|data:)/.test(u))u=(self.__tdBase||'')+u;return _f(u,o);};}());\n/******/ (function(modules) { // webpackBootstrap\n/******/ \tthis[\"webpackChunktdweb\"] = function webpackChunkCallback(chunkIds, moreModules) {\n/******/ \t\tfor(var moduleId in moreModules) {\n/******/ \t\t\tmodules[moduleId] = moreModules[moduleId];\n/******/ \t\t}\n/******/ \t\twhile(chunkIds.length)\n/******/ \t\t\tinstalledChunks[chunkIds.pop()] = 1;\n/******/ \t};\n/******/\n/******/ \t// The module cache\n/******/ \tvar installedModules = {};\n/******/\n/******/ \t// object to store loaded chunks\n/******/ \t// \"1\" means \"already loaded\"\n/******/ \tvar installedChunks = {\n/******/ \t\t0: 1\n/******/ \t};\n/******/\n/******/ \t// The require function\n/******/ \tfunction __webpack_require__(moduleId) {\n/******/\n/******/ \t\t// Check if module is in cache\n/******/ \t\tif(installedModules[moduleId]) {\n/******/ \t\t\treturn installedModules[moduleId].exports;\n/******/ \t\t}\n/******/ \t\t// Create a new module (and put it into the cache)\n/******/ \t\tvar module = installedModules[moduleId] = {\n/******/ \t\t\ti: moduleId,\n/******/ \t\t\tl: false,\n/******/ \t\t\texports: {}\n/******/ \t\t};\n/******/\n/******/ \t\t// Execute the module function\n/******/ \t\tmodules[moduleId].call(module.exports, module, module.exports, __webpack_require__);\n/******/\n/******/ \t\t// Flag the module as loaded\n/******/ \t\tmodule.l = true;\n/******/\n/******/ \t\t// Return the exports of the module\n/******/ \t\treturn module.exports;\n/******/ \t}\n/******/\n/******/ \t// This file contains only the entry chunk.\n/******/ \t// The chunk loading function for additional chunks\n/******/ \t__webpack_require__.e = function requireEnsure(chunkId) {\n/******/ \t\tvar promises = [];\n/******/ \t\tpromises.push(Promise.resolve().then(function() {\n/******/ \t\t\t// \"1\" is the signal for \"already loaded\"\n/******/ \t\t\tif(!installedChunks[chunkId]) {\n/******/ \t\t\t\t(function(){this[\"webpackChunktdweb\"]([1],[\n/* 0 */,\n/* 1 */,\n/* 2 */,\n/* 3 */,\n/* 4 */,\n/* 5 */,\n/* 6 */,\n/* 7 */,\n/* 8 */,\n/* 9 */,\n/* 10 */\n/***/ (function(module, exports) {\n\n\n\n/***/ }),\n/* 11 */\n/***/ (function(module, exports) {\n\n// shim for using process in browser\nvar process = module.exports = {};\n\n// cached from whatever global is present so that test runners that stub it\n// don't break things.  But we need to wrap it in a try catch in case it is\n// wrapped in strict mode code which doesn't define any globals.  It's inside a\n// function because try/catches deoptimize in certain engines.\n\nvar cachedSetTimeout;\nvar cachedClearTimeout;\n\nfunction defaultSetTimout() {\n    throw new Error('setTimeout has not been defined');\n}\nfunction defaultClearTimeout () {\n    throw new Error('clearTimeout has not been defined');\n}\n(function () {\n    try {\n        if (typeof setTimeout === 'function') {\n            cachedSetTimeout = setTimeout;\n        } else {\n            cachedSetTimeout = defaultSetTimout;\n        }\n    } catch (e) {\n        cachedSetTimeout = defaultSetTimout;\n    }\n    try {\n        if (typeof clearTimeout === 'function') {\n            cachedClearTimeout = clearTimeout;\n        } else {\n            cachedClearTimeout = defaultClearTimeout;\n        }\n    } catch (e) {\n        cachedClearTimeout = defaultClearTimeout;\n    }\n} ())\nfunction runTimeout(fun) {\n    if (cachedSetTimeout === setTimeout) {\n        //normal enviroments in sane situations\n        return setTimeout(fun, 0);\n    }\n    // if setTimeout wasn't available but was latter defined\n    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {\n        cachedSetTimeout = setTimeout;\n        return setTimeout(fun, 0);\n    }\n    try {\n        // when when somebody has screwed with setTimeout but no I.E. maddness\n        return cachedSetTimeout(fun, 0);\n    } catch(e){\n        try {\n            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally\n            return cachedSetTimeout.call(null, fun, 0);\n        } catch(e){\n            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error\n            return cachedSetTimeout.call(this, fun, 0);\n        }\n    }\n\n\n}\nfunction runClearTimeout(marker) {\n    if (cachedClearTimeout === clearTimeout) {\n        //normal enviroments in sane situations\n        return clearTimeout(marker);\n    }\n    // if clearTimeout wasn't available but was latter defined\n    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {\n        cachedClearTimeout = clearTimeout;\n        return clearTimeout(marker);\n    }\n    try {\n        // when when somebody has screwed with setTimeout but no I.E. maddness\n        return cachedClearTimeout(marker);\n    } catch (e){\n        try {\n            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally\n            return cachedClearTimeout.call(null, marker);\n        } catch (e){\n            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.\n            // Some versions of I.E. have different rules for clearTimeout vs setTimeout\n            return cachedClearTimeout.call(this, marker);\n        }\n    }\n\n\n\n}\nvar queue = [];\nvar draining = false;\nvar currentQueue;\nvar queueIndex = -1;\n\nfunction cleanUpNextTick() {\n    if (!draining || !currentQueue) {\n        return;\n    }\n    draining = false;\n    if (currentQueue.length) {\n        queue = currentQueue.concat(queue);\n    } else {\n        queueIndex = -1;\n    }\n    if (queue.length) {\n        drainQueue();\n    }\n}\n\nfunction drainQueue() {\n    if (draining) {\n        return;\n    }\n    var timeout = runTimeout(cleanUpNextTick);\n    draining = true;\n\n    var len = queue.length;\n    while(len) {\n        currentQueue = queue;\n        queue = [];\n        while (++queueIndex < len) {\n            if (currentQueue) {\n                currentQueue[queueIndex].run();\n            }\n        }\n        queueIndex = -1;\n        len = queue.length;\n    }\n    currentQueue = null;\n    draining = false;\n    runClearTimeout(timeout);\n}\n\nprocess.nextTick = function (fun) {\n    var args = new Array(arguments.length - 1);\n    if (arguments.length > 1) {\n        for (var i = 1; i < arguments.length; i++) {\n            args[i - 1] = arguments[i];\n        }\n    }\n    queue.push(new Item(fun, args));\n    if (queue.length === 1 && !draining) {\n        runTimeout(drainQueue);\n    }\n};\n\n// v8 likes predictible objects\nfunction Item(fun, array) {\n    this.fun = fun;\n    this.array = array;\n}\nItem.prototype.run = function () {\n    this.fun.apply(null, this.array);\n};\nprocess.title = 'browser';\nprocess.browser = true;\nprocess.env = {};\nprocess.argv = [];\nprocess.version = ''; // empty string to avoid regexp issues\nprocess.versions = {};\n\nfunction noop() {}\n\nprocess.on = noop;\nprocess.addListener = noop;\nprocess.once = noop;\nprocess.off = noop;\nprocess.removeListener = noop;\nprocess.removeAllListeners = noop;\nprocess.emit = noop;\nprocess.prependListener = noop;\nprocess.prependOnceListener = noop;\n\nprocess.listeners = function (name) { return [] }\n\nprocess.binding = function (name) {\n    throw new Error('process.binding is not supported');\n};\n\nprocess.cwd = function () { return '/' };\nprocess.chdir = function (dir) {\n    throw new Error('process.chdir is not supported');\n};\nprocess.umask = function() { return 0; };\n\n\n/***/ }),\n/* 12 */\n/***/ (function(module, exports, __webpack_require__) {\n\n/* WEBPACK VAR INJECTION */(function(process) {// .dirname, .basename, and .extname methods are extracted from Node.js v8.11.1,\n// backported and transplited with Babel, with backwards-compat fixes\n\n// Copyright Joyent, Inc. and other Node contributors.\n//\n// Permission is hereby granted, free of charge, to any person obtaining a\n// copy of this software and associated documentation files (the\n// \"Software\"), to deal in the Software without restriction, including\n// without limitation the rights to use, copy, modify, merge, publish,\n// distribute, sublicense, and/or sell copies of the Software, and to permit\n// persons to whom the Software is furnished to do so, subject to the\n// following conditions:\n//\n// The above copyright notice and this permission notice shall be included\n// in all copies or substantial portions of the Software.\n//\n// THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS\n// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF\n// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN\n// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,\n// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR\n// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE\n// USE OR OTHER DEALINGS IN THE SOFTWARE.\n\n// resolves . and .. elements in a path array with directory names there\n// must be no slashes, empty elements, or device names (c:\\) in the array\n// (so also no leading and trailing slashes - it does not distinguish\n// relative and absolute paths)\nfunction normalizeArray(parts, allowAboveRoot) {\n  // if the path tries to go above the root, `up` ends up > 0\n  var up = 0;\n  for (var i = parts.length - 1; i >= 0; i--) {\n    var last = parts[i];\n    if (last === '.') {\n      parts.splice(i, 1);\n    } else if (last === '..') {\n      parts.splice(i, 1);\n      up++;\n    } else if (up) {\n      parts.splice(i, 1);\n      up--;\n    }\n  }\n\n  // if the path is allowed to go above the root, restore leading ..s\n  if (allowAboveRoot) {\n    for (; up--; up) {\n      parts.unshift('..');\n    }\n  }\n\n  return parts;\n}\n\n// path.resolve([from ...], to)\n// posix version\nexports.resolve = function() {\n  var resolvedPath = '',\n      resolvedAbsolute = false;\n\n  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {\n    var path = (i >= 0) ? arguments[i] : process.cwd();\n\n    // Skip empty and invalid entries\n    if (typeof path !== 'string') {\n      throw new TypeError('Arguments to path.resolve must be strings');\n    } else if (!path) {\n      continue;\n    }\n\n    resolvedPath = path + '/' + resolvedPath;\n    resolvedAbsolute = path.charAt(0) === '/';\n  }\n\n  // At this point the path should be resolved to a full absolute path, but\n  // handle relative paths to be safe (might happen when process.cwd() fails)\n\n  // Normalize the path\n  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {\n    return !!p;\n  }), !resolvedAbsolute).join('/');\n\n  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';\n};\n\n// path.normalize(path)\n// posix version\nexports.normalize = function(path) {\n  var isAbsolute = exports.isAbsolute(path),\n      trailingSlash = substr(path, -1) === '/';\n\n  // Normalize the path\n  path = normalizeArray(filter(path.split('/'), function(p) {\n    return !!p;\n  }), !isAbsolute).join('/');\n\n  if (!path && !isAbsolute) {\n    path = '.';\n  }\n  if (path && trailingSlash) {\n    path += '/';\n  }\n\n  return (isAbsolute ? '/' : '') + path;\n};\n\n// posix version\nexports.isAbsolute = function(path) {\n  return path.charAt(0) === '/';\n};\n\n// posix version\nexports.join = function() {\n  var paths = Array.prototype.slice.call(arguments, 0);\n  return exports.normalize(filter(paths, function(p, index) {\n    if (typeof p !== 'string') {\n      throw new TypeError('Arguments to path.join must be strings');\n    }\n    return p;\n  }).join('/'));\n};\n\n\n// path.relative(from, to)\n// posix version\nexports.relative = function(from, to) {\n  from = exports.resolve(from).substr(1);\n  to = exports.resolve(to).substr(1);\n\n  function trim(arr) {\n    var start = 0;\n    for (; start < arr.length; start++) {\n      if (arr[start] !== '') break;\n    }\n\n    var end = arr.length - 1;\n    for (; end >= 0; end--) {\n      if (arr[end] !== '') break;\n    }\n\n    if (start > end) return [];\n    return arr.slice(start, end - start + 1);\n  }\n\n  var fromParts = trim(from.split('/'));\n  var toParts = trim(to.split('/'));\n\n  var length = Math.min(fromParts.length, toParts.length);\n  var samePartsLength = length;\n  for (var i = 0; i < length; i++) {\n    if (fromParts[i] !== toParts[i]) {\n      samePartsLength = i;\n      break;\n    }\n  }\n\n  var outputParts = [];\n  for (var i = samePartsLength; i < fromParts.length; i++) {\n    outputParts.push('..');\n  }\n\n  outputParts = outputParts.concat(toParts.slice(samePartsLength));\n\n  return outputParts.join('/');\n};\n\nexports.sep = '/';\nexports.delimiter = ':';\n\nexports.dirname = function (path) {\n  if (typeof path !== 'string') path = path + '';\n  if (path.length === 0) return '.';\n  var code = path.charCodeAt(0);\n  var hasRoot = code === 47 /*/*/;\n  var end = -1;\n  var matchedSlash = true;\n  for (var i = path.length - 1; i >= 1; --i) {\n    code = path.charCodeAt(i);\n    if (code === 47 /*/*/) {\n        if (!matchedSlash) {\n          end = i;\n          break;\n        }\n      } else {\n      // We saw the first non-path separator\n      matchedSlash = false;\n    }\n  }\n\n  if (end === -1) return hasRoot ? '/' : '.';\n  if (hasRoot && end === 1) {\n    // return '//';\n    // Backwards-compat fix:\n    return '/';\n  }\n  return path.slice(0, end);\n};\n\nfunction basename(path) {\n  if (typeof path !== 'string') path = path + '';\n\n  var start = 0;\n  var end = -1;\n  var matchedSlash = true;\n  var i;\n\n  for (i = path.length - 1; i >= 0; --i) {\n    if (path.charCodeAt(i) === 47 /*/*/) {\n        // If we reached a path separator that was not part of a set of path\n        // separators at the end of the string, stop now\n        if (!matchedSlash) {\n          start = i + 1;\n          break;\n        }\n      } else if (end === -1) {\n      // We saw the first non-path separator, mark this as the end of our\n      // path component\n      matchedSlash = false;\n      end = i + 1;\n    }\n  }\n\n  if (end === -1) return '';\n  return path.slice(start, end);\n}\n\n// Uses a mixed approach for backwards-compatibility, as ext behavior changed\n// in new Node.js versions, so only basename() above is backported here\nexports.basename = function (path, ext) {\n  var f = basename(path);\n  if (ext && f.substr(-1 * ext.length) === ext) {\n    f = f.substr(0, f.length - ext.length);\n  }\n  return f;\n};\n\nexports.extname = function (path) {\n  if (typeof path !== 'string') path = path + '';\n  var startDot = -1;\n  var startPart = 0;\n  var end = -1;\n  var matchedSlash = true;\n  // Track the state of characters (if any) we see before our first dot and\n  // after any path separator we find\n  var preDotState = 0;\n  for (var i = path.length - 1; i >= 0; --i) {\n    var code = path.charCodeAt(i);\n    if (code === 47 /*/*/) {\n        // If we reached a path separator that was not part of a set of path\n        // separators at the end of the string, stop now\n        if (!matchedSlash) {\n          startPart = i + 1;\n          break;\n        }\n        continue;\n      }\n    if (end === -1) {\n      // We saw the first non-path separator, mark this as the end of our\n      // extension\n      matchedSlash = false;\n      end = i + 1;\n    }\n    if (code === 46 /*.*/) {\n        // If this is our first dot, mark it as the start of our extension\n        if (startDot === -1)\n          startDot = i;\n        else if (preDotState !== 1)\n          preDotState = 1;\n    } else if (startDot !== -1) {\n      // We saw a non-dot and non-path separator before our dot, so we should\n      // have a good chance at having a non-empty extension\n      preDotState = -1;\n    }\n  }\n\n  if (startDot === -1 || end === -1 ||\n      // We saw a non-dot character immediately before the dot\n      preDotState === 0 ||\n      // The (right-most) trimmed path component is exactly '..'\n      preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {\n    return '';\n  }\n  return path.slice(startDot, end);\n};\n\nfunction filter (xs, f) {\n    if (xs.filter) return xs.filter(f);\n    var res = [];\n    for (var i = 0; i < xs.length; i++) {\n        if (f(xs[i], i, xs)) res.push(xs[i]);\n    }\n    return res;\n}\n\n// String.prototype.substr - negative index don't work in IE8\nvar substr = 'ab'.substr(-1) === 'b'\n    ? function (str, start, len) { return str.substr(start, len) }\n    : function (str, start, len) {\n        if (start < 0) start = str.length + start;\n        return str.substr(start, len);\n    }\n;\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(11)))\n\n/***/ }),\n/* 13 */\n/***/ (function(module, exports, __webpack_require__) {\n\n\"use strict\";\n/* WEBPACK VAR INJECTION */(function(global) {/*!\n * The buffer module from node.js, for the browser.\n *\n * @author   Feross Aboukhadijeh <http://feross.org>\n * @license  MIT\n */\n/* eslint-disable no-proto */\n\n\n\nvar base64 = __webpack_require__(14)\nvar ieee754 = __webpack_require__(15)\nvar isArray = __webpack_require__(16)\n\nexports.Buffer = Buffer\nexports.SlowBuffer = SlowBuffer\nexports.INSPECT_MAX_BYTES = 50\n\n/**\n * If `Buffer.TYPED_ARRAY_SUPPORT`:\n *   === true    Use Uint8Array implementation (fastest)\n *   === false   Use Object implementation (most compatible, even IE6)\n *\n * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,\n * Opera 11.6+, iOS 4.2+.\n *\n * Due to various browser bugs, sometimes the Object implementation will be used even\n * when the browser supports typed arrays.\n *\n * Note:\n *\n *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,\n *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.\n *\n *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.\n *\n *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of\n *     incorrect length in some situations.\n\n * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they\n * get the Object implementation, which is slower but behaves correctly.\n */\nBuffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined\n  ? global.TYPED_ARRAY_SUPPORT\n  : typedArraySupport()\n\n/*\n * Export kMaxLength after typed array support is determined.\n */\nexports.kMaxLength = kMaxLength()\n\nfunction typedArraySupport () {\n  try {\n    var arr = new Uint8Array(1)\n    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}\n    return arr.foo() === 42 && // typed array instances can be augmented\n        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`\n        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`\n  } catch (e) {\n    return false\n  }\n}\n\nfunction kMaxLength () {\n  return Buffer.TYPED_ARRAY_SUPPORT\n    ? 0x7fffffff\n    : 0x3fffffff\n}\n\nfunction createBuffer (that, length) {\n  if (kMaxLength() < length) {\n    throw new RangeError('Invalid typed array length')\n  }\n  if (Buffer.TYPED_ARRAY_SUPPORT) {\n    // Return an augmented `Uint8Array` instance, for best performance\n    that = new Uint8Array(length)\n    that.__proto__ = Buffer.prototype\n  } else {\n    // Fallback: Return an object instance of the Buffer class\n    if (that === null) {\n      that = new Buffer(length)\n    }\n    that.length = length\n  }\n\n  return that\n}\n\n/**\n * The Buffer constructor returns instances of `Uint8Array` that have their\n * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of\n * `Uint8Array`, so the returned instances will have all the node `Buffer` methods\n * and the `Uint8Array` methods. Square bracket notation works as expected -- it\n * returns a single octet.\n *\n * The `Uint8Array` prototype remains unmodified.\n */\n\nfunction Buffer (arg, encodingOrOffset, length) {\n  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {\n    return new Buffer(arg, encodingOrOffset, length)\n  }\n\n  // Common case.\n  if (typeof arg === 'number') {\n    if (typeof encodingOrOffset === 'string') {\n      throw new Error(\n        'If encoding is specified then the first argument must be a string'\n      )\n    }\n    return allocUnsafe(this, arg)\n  }\n  return from(this, arg, encodingOrOffset, length)\n}\n\nBuffer.poolSize = 8192 // not used by this implementation\n\n// TODO: Legacy, not needed anymore. Remove in next major version.\nBuffer._augment = function (arr) {\n  arr.__proto__ = Buffer.prototype\n  return arr\n}\n\nfunction from (that, value, encodingOrOffset, length) {\n  if (typeof value === 'number') {\n    throw new TypeError('\"value\" argument must not be a number')\n  }\n\n  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {\n    return fromArrayBuffer(that, value, encodingOrOffset, length)\n  }\n\n  if (typeof value === 'string') {\n    return fromString(that, value, encodingOrOffset)\n  }\n\n  return fromObject(that, value)\n}\n\n/**\n * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError\n * if value is a number.\n * Buffer.from(str[, encoding])\n * Buffer.from(array)\n * Buffer.from(buffer)\n * Buffer.from(arrayBuffer[, byteOffset[, length]])\n **/\nBuffer.from = function (value, encodingOrOffset, length) {\n  return from(null, value, encodingOrOffset, length)\n}\n\nif (Buffer.TYPED_ARRAY_SUPPORT) {\n  Buffer.prototype.__proto__ = Uint8Array.prototype\n  Buffer.__proto__ = Uint8Array\n  if (typeof Symbol !== 'undefined' && Symbol.species &&\n      Buffer[Symbol.species] === Buffer) {\n    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97\n    Object.defineProperty(Buffer, Symbol.species, {\n      value: null,\n      configurable: true\n    })\n  }\n}\n\nfunction assertSize (size) {\n  if (typeof size !== 'number') {\n    throw new TypeError('\"size\" argument must be a number')\n  } else if (size < 0) {\n    throw new RangeError('\"size\" argument must not be negative')\n  }\n}\n\nfunction alloc (that, size, fill, encoding) {\n  assertSize(size)\n  if (size <= 0) {\n    return createBuffer(that, size)\n  }\n  if (fill !== undefined) {\n    // Only pay attention to encoding if it's a string. This\n    // prevents accidentally sending in a number that would\n    // be interpretted as a start offset.\n    return typeof encoding === 'string'\n      ? createBuffer(that, size).fill(fill, encoding)\n      : createBuffer(that, size).fill(fill)\n  }\n  return createBuffer(that, size)\n}\n\n/**\n * Creates a new filled Buffer instance.\n * alloc(size[, fill[, encoding]])\n **/\nBuffer.alloc = function (size, fill, encoding) {\n  return alloc(null, size, fill, encoding)\n}\n\nfunction allocUnsafe (that, size) {\n  assertSize(size)\n  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)\n  if (!Buffer.TYPED_ARRAY_SUPPORT) {\n    for (var i = 0; i < size; ++i) {\n      that[i] = 0\n    }\n  }\n  return that\n}\n\n/**\n * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.\n * */\nBuffer.allocUnsafe = function (size) {\n  return allocUnsafe(null, size)\n}\n/**\n * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.\n */\nBuffer.allocUnsafeSlow = function (size) {\n  return allocUnsafe(null, size)\n}\n\nfunction fromString (that, string, encoding) {\n  if (typeof encoding !== 'string' || encoding === '') {\n    encoding = 'utf8'\n  }\n\n  if (!Buffer.isEncoding(encoding)) {\n    throw new TypeError('\"encoding\" must be a valid string encoding')\n  }\n\n  var length = byteLength(string, encoding) | 0\n  that = createBuffer(that, length)\n\n  var actual = that.write(string, encoding)\n\n  if (actual !== length) {\n    // Writing a hex string, for example, that contains invalid characters will\n    // cause everything after the first invalid character to be ignored. (e.g.\n    // 'abxxcd' will be treated as 'ab')\n    that = that.slice(0, actual)\n  }\n\n  return that\n}\n\nfunction fromArrayLike (that, array) {\n  var length = array.length < 0 ? 0 : checked(array.length) | 0\n  that = createBuffer(that, length)\n  for (var i = 0; i < length; i += 1) {\n    that[i] = array[i] & 255\n  }\n  return that\n}\n\nfunction fromArrayBuffer (that, array, byteOffset, length) {\n  array.byteLength // this throws if `array` is not a valid ArrayBuffer\n\n  if (byteOffset < 0 || array.byteLength < byteOffset) {\n    throw new RangeError('\\'offset\\' is out of bounds')\n  }\n\n  if (array.byteLength < byteOffset + (length || 0)) {\n    throw new RangeError('\\'length\\' is out of bounds')\n  }\n\n  if (byteOffset === undefined && length === undefined) {\n    array = new Uint8Array(array)\n  } else if (length === undefined) {\n    array = new Uint8Array(array, byteOffset)\n  } else {\n    array = new Uint8Array(array, byteOffset, length)\n  }\n\n  if (Buffer.TYPED_ARRAY_SUPPORT) {\n    // Return an augmented `Uint8Array` instance, for best performance\n    that = array\n    that.__proto__ = Buffer.prototype\n  } else {\n    // Fallback: Return an object instance of the Buffer class\n    that = fromArrayLike(that, array)\n  }\n  return that\n}\n\nfunction fromObject (that, obj) {\n  if (Buffer.isBuffer(obj)) {\n    var len = checked(obj.length) | 0\n    that = createBuffer(that, len)\n\n    if (that.length === 0) {\n      return that\n    }\n\n    obj.copy(that, 0, 0, len)\n    return that\n  }\n\n  if (obj) {\n    if ((typeof ArrayBuffer !== 'undefined' &&\n        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {\n      if (typeof obj.length !== 'number' || isnan(obj.length)) {\n        return createBuffer(that, 0)\n      }\n      return fromArrayLike(that, obj)\n    }\n\n    if (obj.type === 'Buffer' && isArray(obj.data)) {\n      return fromArrayLike(that, obj.data)\n    }\n  }\n\n  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')\n}\n\nfunction checked (length) {\n  // Note: cannot use `length < kMaxLength()` here because that fails when\n  // length is NaN (which is otherwise coerced to zero.)\n  if (length >= kMaxLength()) {\n    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +\n                         'size: 0x' + kMaxLength().toString(16) + ' bytes')\n  }\n  return length | 0\n}\n\nfunction SlowBuffer (length) {\n  if (+length != length) { // eslint-disable-line eqeqeq\n    length = 0\n  }\n  return Buffer.alloc(+length)\n}\n\nBuffer.isBuffer = function isBuffer (b) {\n  return !!(b != null && b._isBuffer)\n}\n\nBuffer.compare = function compare (a, b) {\n  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {\n    throw new TypeError('Arguments must be Buffers')\n  }\n\n  if (a === b) return 0\n\n  var x = a.length\n  var y = b.length\n\n  for (var i = 0, len = Math.min(x, y); i < len; ++i) {\n    if (a[i] !== b[i]) {\n      x = a[i]\n      y = b[i]\n      break\n    }\n  }\n\n  if (x < y) return -1\n  if (y < x) return 1\n  return 0\n}\n\nBuffer.isEncoding = function isEncoding (encoding) {\n  switch (String(encoding).toLowerCase()) {\n    case 'hex':\n    case 'utf8':\n    case 'utf-8':\n    case 'ascii':\n    case 'latin1':\n    case 'binary':\n    case 'base64':\n    case 'ucs2':\n    case 'ucs-2':\n    case 'utf16le':\n    case 'utf-16le':\n      return true\n    default:\n      return false\n  }\n}\n\nBuffer.concat = function concat (list, length) {\n  if (!isArray(list)) {\n    throw new TypeError('\"list\" argument must be an Array of Buffers')\n  }\n\n  if (list.length === 0) {\n    return Buffer.alloc(0)\n  }\n\n  var i\n  if (length === undefined) {\n    length = 0\n    for (i = 0; i < list.length; ++i) {\n      length += list[i].length\n    }\n  }\n\n  var buffer = Buffer.allocUnsafe(length)\n  var pos = 0\n  for (i = 0; i < list.length; ++i) {\n    var buf = list[i]\n    if (!Buffer.isBuffer(buf)) {\n      throw new TypeError('\"list\" argument must be an Array of Buffers')\n    }\n    buf.copy(buffer, pos)\n    pos += buf.length\n  }\n  return buffer\n}\n\nfunction byteLength (string, encoding) {\n  if (Buffer.isBuffer(string)) {\n    return string.length\n  }\n  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&\n      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {\n    return string.byteLength\n  }\n  if (typeof string !== 'string') {\n    string = '' + string\n  }\n\n  var len = string.length\n  if (len === 0) return 0\n\n  // Use a for loop to avoid recursion\n  var loweredCase = false\n  for (;;) {\n    switch (encoding) {\n      case 'ascii':\n      case 'latin1':\n      case 'binary':\n        return len\n      case 'utf8':\n      case 'utf-8':\n      case undefined:\n        return utf8ToBytes(string).length\n      case 'ucs2':\n      case 'ucs-2':\n      case 'utf16le':\n      case 'utf-16le':\n        return len * 2\n      case 'hex':\n        return len >>> 1\n      case 'base64':\n        return base64ToBytes(string).length\n      default:\n        if (loweredCase) return utf8ToBytes(string).length // assume utf8\n        encoding = ('' + encoding).toLowerCase()\n        loweredCase = true\n    }\n  }\n}\nBuffer.byteLength = byteLength\n\nfunction slowToString (encoding, start, end) {\n  var loweredCase = false\n\n  // No need to verify that \"this.length <= MAX_UINT32\" since it's a read-only\n  // property of a typed array.\n\n  // This behaves neither like String nor Uint8Array in that we set start/end\n  // to their upper/lower bounds if the value passed is out of range.\n  // undefined is handled specially as per ECMA-262 6th Edition,\n  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.\n  if (start === undefined || start < 0) {\n    start = 0\n  }\n  // Return early if start > this.length. Done here to prevent potential uint32\n  // coercion fail below.\n  if (start > this.length) {\n    return ''\n  }\n\n  if (end === undefined || end > this.length) {\n    end = this.length\n  }\n\n  if (end <= 0) {\n    return ''\n  }\n\n  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.\n  end >>>= 0\n  start >>>= 0\n\n  if (end <= start) {\n    return ''\n  }\n\n  if (!encoding) encoding = 'utf8'\n\n  while (true) {\n    switch (encoding) {\n      case 'hex':\n        return hexSlice(this, start, end)\n\n      case 'utf8':\n      case 'utf-8':\n        return utf8Slice(this, start, end)\n\n      case 'ascii':\n        return asciiSlice(this, start, end)\n\n      case 'latin1':\n      case 'binary':\n        return latin1Slice(this, start, end)\n\n      case 'base64':\n        return base64Slice(this, start, end)\n\n      case 'ucs2':\n      case 'ucs-2':\n      case 'utf16le':\n      case 'utf-16le':\n        return utf16leSlice(this, start, end)\n\n      default:\n        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)\n        encoding = (encoding + '').toLowerCase()\n        loweredCase = true\n    }\n  }\n}\n\n// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect\n// Buffer instances.\nBuffer.prototype._isBuffer = true\n\nfunction swap (b, n, m) {\n  var i = b[n]\n  b[n] = b[m]\n  b[m] = i\n}\n\nBuffer.prototype.swap16 = function swap16 () {\n  var len = this.length\n  if (len % 2 !== 0) {\n    throw new RangeError('Buffer size must be a multiple of 16-bits')\n  }\n  for (var i = 0; i < len; i += 2) {\n    swap(this, i, i + 1)\n  }\n  return this\n}\n\nBuffer.prototype.swap32 = function swap32 () {\n  var len = this.length\n  if (len % 4 !== 0) {\n    throw new RangeError('Buffer size must be a multiple of 32-bits')\n  }\n  for (var i = 0; i < len; i += 4) {\n    swap(this, i, i + 3)\n    swap(this, i + 1, i + 2)\n  }\n  return this\n}\n\nBuffer.prototype.swap64 = function swap64 () {\n  var len = this.length\n  if (len % 8 !== 0) {\n    throw new RangeError('Buffer size must be a multiple of 64-bits')\n  }\n  for (var i = 0; i < len; i += 8) {\n    swap(this, i, i + 7)\n    swap(this, i + 1, i + 6)\n    swap(this, i + 2, i + 5)\n    swap(this, i + 3, i + 4)\n  }\n  return this\n}\n\nBuffer.prototype.toString = function toString () {\n  var length = this.length | 0\n  if (length === 0) return ''\n  if (arguments.length === 0) return utf8Slice(this, 0, length)\n  return slowToString.apply(this, arguments)\n}\n\nBuffer.prototype.equals = function equals (b) {\n  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')\n  if (this === b) return true\n  return Buffer.compare(this, b) === 0\n}\n\nBuffer.prototype.inspect = function inspect () {\n  var str = ''\n  var max = exports.INSPECT_MAX_BYTES\n  if (this.length > 0) {\n    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')\n    if (this.length > max) str += ' ... '\n  }\n  return '<Buffer ' + str + '>'\n}\n\nBuffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {\n  if (!Buffer.isBuffer(target)) {\n    throw new TypeError('Argument must be a Buffer')\n  }\n\n  if (start === undefined) {\n    start = 0\n  }\n  if (end === undefined) {\n    end = target ? target.length : 0\n  }\n  if (thisStart === undefined) {\n    thisStart = 0\n  }\n  if (thisEnd === undefined) {\n    thisEnd = this.length\n  }\n\n  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {\n    throw new RangeError('out of range index')\n  }\n\n  if (thisStart >= thisEnd && start >= end) {\n    return 0\n  }\n  if (thisStart >= thisEnd) {\n    return -1\n  }\n  if (start >= end) {\n    return 1\n  }\n\n  start >>>= 0\n  end >>>= 0\n  thisStart >>>= 0\n  thisEnd >>>= 0\n\n  if (this === target) return 0\n\n  var x = thisEnd - thisStart\n  var y = end - start\n  var len = Math.min(x, y)\n\n  var thisCopy = this.slice(thisStart, thisEnd)\n  var targetCopy = target.slice(start, end)\n\n  for (var i = 0; i < len; ++i) {\n    if (thisCopy[i] !== targetCopy[i]) {\n      x = thisCopy[i]\n      y = targetCopy[i]\n      break\n    }\n  }\n\n  if (x < y) return -1\n  if (y < x) return 1\n  return 0\n}\n\n// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,\n// OR the last index of `val` in `buffer` at offset <= `byteOffset`.\n//\n// Arguments:\n// - buffer - a Buffer to search\n// - val - a string, Buffer, or number\n// - byteOffset - an index into `buffer`; will be clamped to an int32\n// - encoding - an optional encoding, relevant is val is a string\n// - dir - true for indexOf, false for lastIndexOf\nfunction bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {\n  // Empty buffer means no match\n  if (buffer.length === 0) return -1\n\n  // Normalize byteOffset\n  if (typeof byteOffset === 'string') {\n    encoding = byteOffset\n    byteOffset = 0\n  } else if (byteOffset > 0x7fffffff) {\n    byteOffset = 0x7fffffff\n  } else if (byteOffset < -0x80000000) {\n    byteOffset = -0x80000000\n  }\n  byteOffset = +byteOffset  // Coerce to Number.\n  if (isNaN(byteOffset)) {\n    // byteOffset: it it's undefined, null, NaN, \"foo\", etc, search whole buffer\n    byteOffset = dir ? 0 : (buffer.length - 1)\n  }\n\n  // Normalize byteOffset: negative offsets start from the end of the buffer\n  if (byteOffset < 0) byteOffset = buffer.length + byteOffset\n  if (byteOffset >= buffer.length) {\n    if (dir) return -1\n    else byteOffset = buffer.length - 1\n  } else if (byteOffset < 0) {\n    if (dir) byteOffset = 0\n    else return -1\n  }\n\n  // Normalize val\n  if (typeof val === 'string') {\n    val = Buffer.from(val, encoding)\n  }\n\n  // Finally, search either indexOf (if dir is true) or lastIndexOf\n  if (Buffer.isBuffer(val)) {\n    // Special case: looking for empty string/buffer always fails\n    if (val.length === 0) {\n      return -1\n    }\n    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)\n  } else if (typeof val === 'number') {\n    val = val & 0xFF // Search for a byte value [0-255]\n    if (Buffer.TYPED_ARRAY_SUPPORT &&\n        typeof Uint8Array.prototype.indexOf === 'function') {\n      if (dir) {\n        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)\n      } else {\n        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)\n      }\n    }\n    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)\n  }\n\n  throw new TypeError('val must be string, number or Buffer')\n}\n\nfunction arrayIndexOf (arr, val, byteOffset, encoding, dir) {\n  var indexSize = 1\n  var arrLength = arr.length\n  var valLength = val.length\n\n  if (encoding !== undefined) {\n    encoding = String(encoding).toLowerCase()\n    if (encoding === 'ucs2' || encoding === 'ucs-2' ||\n        encoding === 'utf16le' || encoding === 'utf-16le') {\n      if (arr.length < 2 || val.length < 2) {\n        return -1\n      }\n      indexSize = 2\n      arrLength /= 2\n      valLength /= 2\n      byteOffset /= 2\n    }\n  }\n\n  function read (buf, i) {\n    if (indexSize === 1) {\n      return buf[i]\n    } else {\n      return buf.readUInt16BE(i * indexSize)\n    }\n  }\n\n  var i\n  if (dir) {\n    var foundIndex = -1\n    for (i = byteOffset; i < arrLength; i++) {\n      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {\n        if (foundIndex === -1) foundIndex = i\n        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize\n      } else {\n        if (foundIndex !== -1) i -= i - foundIndex\n        foundIndex = -1\n      }\n    }\n  } else {\n    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength\n    for (i = byteOffset; i >= 0; i--) {\n      var found = true\n      for (var j = 0; j < valLength; j++) {\n        if (read(arr, i + j) !== read(val, j)) {\n          found = false\n          break\n        }\n      }\n      if (found) return i\n    }\n  }\n\n  return -1\n}\n\nBuffer.prototype.includes = function includes (val, byteOffset, encoding) {\n  return this.indexOf(val, byteOffset, encoding) !== -1\n}\n\nBuffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {\n  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)\n}\n\nBuffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {\n  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)\n}\n\nfunction hexWrite (buf, string, offset, length) {\n  offset = Number(offset) || 0\n  var remaining = buf.length - offset\n  if (!length) {\n    length = remaining\n  } else {\n    length = Number(length)\n    if (length > remaining) {\n      length = remaining\n    }\n  }\n\n  // must be an even number of digits\n  var strLen = string.length\n  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')\n\n  if (length > strLen / 2) {\n    length = strLen / 2\n  }\n  for (var i = 0; i < length; ++i) {\n    var parsed = parseInt(string.substr(i * 2, 2), 16)\n    if (isNaN(parsed)) return i\n    buf[offset + i] = parsed\n  }\n  return i\n}\n\nfunction utf8Write (buf, string, offset, length) {\n  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)\n}\n\nfunction asciiWrite (buf, string, offset, length) {\n  return blitBuffer(asciiToBytes(string), buf, offset, length)\n}\n\nfunction latin1Write (buf, string, offset, length) {\n  return asciiWrite(buf, string, offset, length)\n}\n\nfunction base64Write (buf, string, offset, length) {\n  return blitBuffer(base64ToBytes(string), buf, offset, length)\n}\n\nfunction ucs2Write (buf, string, offset, length) {\n  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)\n}\n\nBuffer.prototype.write = function write (string, offset, length, encoding) {\n  // Buffer#write(string)\n  if (offset === undefined) {\n    encoding = 'utf8'\n    length = this.length\n    offset = 0\n  // Buffer#write(string, encoding)\n  } else if (length === undefined && typeof offset === 'string') {\n    encoding = offset\n    length = this.length\n    offset = 0\n  // Buffer#write(string, offset[, length][, encoding])\n  } else if (isFinite(offset)) {\n    offset = offset | 0\n    if (isFinite(length)) {\n      length = length | 0\n      if (encoding === undefined) encoding = 'utf8'\n    } else {\n      encoding = length\n      length = undefined\n    }\n  // legacy write(string, encoding, offset, length) - remove in v0.13\n  } else {\n    throw new Error(\n      'Buffer.write(string, encoding, offset[, length]) is no longer supported'\n    )\n  }\n\n  var remaining = this.length - offset\n  if (length === undefined || length > remaining) length = remaining\n\n  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {\n    throw new RangeError('Attempt to write outside buffer bounds')\n  }\n\n  if (!encoding) encoding = 'utf8'\n\n  var loweredCase = false\n  for (;;) {\n    switch (encoding) {\n      case 'hex':\n        return hexWrite(this, string, offset, length)\n\n      case 'utf8':\n      case 'utf-8':\n        return utf8Write(this, string, offset, length)\n\n      case 'ascii':\n        return asciiWrite(this, string, offset, length)\n\n      case 'latin1':\n      case 'binary':\n        return latin1Write(this, string, offset, length)\n\n      case 'base64':\n        // Warning: maxLength not taken into account in base64Write\n        return base64Write(this, string, offset, length)\n\n      case 'ucs2':\n      case 'ucs-2':\n      case 'utf16le':\n      case 'utf-16le':\n        return ucs2Write(this, string, offset, length)\n\n      default:\n        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)\n        encoding = ('' + encoding).toLowerCase()\n        loweredCase = true\n    }\n  }\n}\n\nBuffer.prototype.toJSON = function toJSON () {\n  return {\n    type: 'Buffer',\n    data: Array.prototype.slice.call(this._arr || this, 0)\n  }\n}\n\nfunction base64Slice (buf, start, end) {\n  if (start === 0 && end === buf.length) {\n    return base64.fromByteArray(buf)\n  } else {\n    return base64.fromByteArray(buf.slice(start, end))\n  }\n}\n\nfunction utf8Slice (buf, start, end) {\n  end = Math.min(buf.length, end)\n  var res = []\n\n  var i = start\n  while (i < end) {\n    var firstByte = buf[i]\n    var codePoint = null\n    var bytesPerSequence = (firstByte > 0xEF) ? 4\n      : (firstByte > 0xDF) ? 3\n      : (firstByte > 0xBF) ? 2\n      : 1\n\n    if (i + bytesPerSequence <= end) {\n      var secondByte, thirdByte, fourthByte, tempCodePoint\n\n      switch (bytesPerSequence) {\n        case 1:\n          if (firstByte < 0x80) {\n            codePoint = firstByte\n          }\n          break\n        case 2:\n          secondByte = buf[i + 1]\n          if ((secondByte & 0xC0) === 0x80) {\n            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)\n            if (tempCodePoint > 0x7F) {\n              codePoint = tempCodePoint\n            }\n          }\n          break\n        case 3:\n          secondByte = buf[i + 1]\n          thirdByte = buf[i + 2]\n          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {\n            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)\n            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {\n              codePoint = tempCodePoint\n            }\n          }\n          break\n        case 4:\n          secondByte = buf[i + 1]\n          thirdByte = buf[i + 2]\n          fourthByte = buf[i + 3]\n          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {\n            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)\n            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {\n              codePoint = tempCodePoint\n            }\n          }\n      }\n    }\n\n    if (codePoint === null) {\n      // we did not generate a valid codePoint so insert a\n      // replacement char (U+FFFD) and advance only 1 byte\n      codePoint = 0xFFFD\n      bytesPerSequence = 1\n    } else if (codePoint > 0xFFFF) {\n      // encode to utf16 (surrogate pair dance)\n      codePoint -= 0x10000\n      res.push(codePoint >>> 10 & 0x3FF | 0xD800)\n      codePoint = 0xDC00 | codePoint & 0x3FF\n    }\n\n    res.push(codePoint)\n    i += bytesPerSequence\n  }\n\n  return decodeCodePointsArray(res)\n}\n\n// Based on http://stackoverflow.com/a/22747272/680742, the browser with\n// the lowest limit is Chrome, with 0x10000 args.\n// We go 1 magnitude less, for safety\nvar MAX_ARGUMENTS_LENGTH = 0x1000\n\nfunction decodeCodePointsArray (codePoints) {\n  var len = codePoints.length\n  if (len <= MAX_ARGUMENTS_LENGTH) {\n    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()\n  }\n\n  // Decode in chunks to avoid \"call stack size exceeded\".\n  var res = ''\n  var i = 0\n  while (i < len) {\n    res += String.fromCharCode.apply(\n      String,\n      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)\n    )\n  }\n  return res\n}\n\nfunction asciiSlice (buf, start, end) {\n  var ret = ''\n  end = Math.min(buf.length, end)\n\n  for (var i = start; i < end; ++i) {\n    ret += String.fromCharCode(buf[i] & 0x7F)\n  }\n  return ret\n}\n\nfunction latin1Slice (buf, start, end) {\n  var ret = ''\n  end = Math.min(buf.length, end)\n\n  for (var i = start; i < end; ++i) {\n    ret += String.fromCharCode(buf[i])\n  }\n  return ret\n}\n\nfunction hexSlice (buf, start, end) {\n  var len = buf.length\n\n  if (!start || start < 0) start = 0\n  if (!end || end < 0 || end > len) end = len\n\n  var out = ''\n  for (var i = start; i < end; ++i) {\n    out += toHex(buf[i])\n  }\n  return out\n}\n\nfunction utf16leSlice (buf, start, end) {\n  var bytes = buf.slice(start, end)\n  var res = ''\n  for (var i = 0; i < bytes.length; i += 2) {\n    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)\n  }\n  return res\n}\n\nBuffer.prototype.slice = function slice (start, end) {\n  var len = this.length\n  start = ~~start\n  end = end === undefined ? len : ~~end\n\n  if (start < 0) {\n    start += len\n    if (start < 0) start = 0\n  } else if (start > len) {\n    start = len\n  }\n\n  if (end < 0) {\n    end += len\n    if (end < 0) end = 0\n  } else if (end > len) {\n    end = len\n  }\n\n  if (end < start) end = start\n\n  var newBuf\n  if (Buffer.TYPED_ARRAY_SUPPORT) {\n    newBuf = this.subarray(start, end)\n    newBuf.__proto__ = Buffer.prototype\n  } else {\n    var sliceLen = end - start\n    newBuf = new Buffer(sliceLen, undefined)\n    for (var i = 0; i < sliceLen; ++i) {\n      newBuf[i] = this[i + start]\n    }\n  }\n\n  return newBuf\n}\n\n/*\n * Need to make sure that buffer isn't trying to write out of bounds.\n */\nfunction checkOffset (offset, ext, length) {\n  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')\n  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')\n}\n\nBuffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {\n  offset = offset | 0\n  byteLength = byteLength | 0\n  if (!noAssert) checkOffset(offset, byteLength, this.length)\n\n  var val = this[offset]\n  var mul = 1\n  var i = 0\n  while (++i < byteLength && (mul *= 0x100)) {\n    val += this[offset + i] * mul\n  }\n\n  return val\n}\n\nBuffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {\n  offset = offset | 0\n  byteLength = byteLength | 0\n  if (!noAssert) {\n    checkOffset(offset, byteLength, this.length)\n  }\n\n  var val = this[offset + --byteLength]\n  var mul = 1\n  while (byteLength > 0 && (mul *= 0x100)) {\n    val += this[offset + --byteLength] * mul\n  }\n\n  return val\n}\n\nBuffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {\n  if (!noAssert) checkOffset(offset, 1, this.length)\n  return this[offset]\n}\n\nBuffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {\n  if (!noAssert) checkOffset(offset, 2, this.length)\n  return this[offset] | (this[offset + 1] << 8)\n}\n\nBuffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {\n  if (!noAssert) checkOffset(offset, 2, this.length)\n  return (this[offset] << 8) | this[offset + 1]\n}\n\nBuffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {\n  if (!noAssert) checkOffset(offset, 4, this.length)\n\n  return ((this[offset]) |\n      (this[offset + 1] << 8) |\n      (this[offset + 2] << 16)) +\n      (this[offset + 3] * 0x1000000)\n}\n\nBuffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {\n  if (!noAssert) checkOffset(offset, 4, this.length)\n\n  return (this[offset] * 0x1000000) +\n    ((this[offset + 1] << 16) |\n    (this[offset + 2] << 8) |\n    this[offset + 3])\n}\n\nBuffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {\n  offset = offset | 0\n  byteLength = byteLength | 0\n  if (!noAssert) checkOffset(offset, byteLength, this.length)\n\n  var val = this[offset]\n  var mul = 1\n  var i = 0\n  while (++i < byteLength && (mul *= 0x100)) {\n    val += this[offset + i] * mul\n  }\n  mul *= 0x80\n\n  if (val >= mul) val -= Math.pow(2, 8 * byteLength)\n\n  return val\n}\n\nBuffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {\n  offset = offset | 0\n  byteLength = byteLength | 0\n  if (!noAssert) checkOffset(offset, byteLength, this.length)\n\n  var i = byteLength\n  var mul = 1\n  var val = this[offset + --i]\n  while (i > 0 && (mul *= 0x100)) {\n    val += this[offset + --i] * mul\n  }\n  mul *= 0x80\n\n  if (val >= mul) val -= Math.pow(2, 8 * byteLength)\n\n  return val\n}\n\nBuffer.prototype.readInt8 = function readInt8 (offset, noAssert) {\n  if (!noAssert) checkOffset(offset, 1, this.length)\n  if (!(this[offset] & 0x80)) return (this[offset])\n  return ((0xff - this[offset] + 1) * -1)\n}\n\nBuffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {\n  if (!noAssert) checkOffset(offset, 2, this.length)\n  var val = this[offset] | (this[offset + 1] << 8)\n  return (val & 0x8000) ? val | 0xFFFF0000 : val\n}\n\nBuffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {\n  if (!noAssert) checkOffset(offset, 2, this.length)\n  var val = this[offset + 1] | (this[offset] << 8)\n  return (val & 0x8000) ? val | 0xFFFF0000 : val\n}\n\nBuffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {\n  if (!noAssert) checkOffset(offset, 4, this.length)\n\n  return (this[offset]) |\n    (this[offset + 1] << 8) |\n    (this[offset + 2] << 16) |\n    (this[offset + 3] << 24)\n}\n\nBuffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {\n  if (!noAssert) checkOffset(offset, 4, this.length)\n\n  return (this[offset] << 24) |\n    (this[offset + 1] << 16) |\n    (this[offset + 2] << 8) |\n    (this[offset + 3])\n}\n\nBuffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {\n  if (!noAssert) checkOffset(offset, 4, this.length)\n  return ieee754.read(this, offset, true, 23, 4)\n}\n\nBuffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {\n  if (!noAssert) checkOffset(offset, 4, this.length)\n  return ieee754.read(this, offset, false, 23, 4)\n}\n\nBuffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {\n  if (!noAssert) checkOffset(offset, 8, this.length)\n  return ieee754.read(this, offset, true, 52, 8)\n}\n\nBuffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {\n  if (!noAssert) checkOffset(offset, 8, this.length)\n  return ieee754.read(this, offset, false, 52, 8)\n}\n\nfunction checkInt (buf, value, offset, ext, max, min) {\n  if (!Buffer.isBuffer(buf)) throw new TypeError('\"buffer\" argument must be a Buffer instance')\n  if (value > max || value < min) throw new RangeError('\"value\" argument is out of bounds')\n  if (offset + ext > buf.length) throw new RangeError('Index out of range')\n}\n\nBuffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {\n  value = +value\n  offset = offset | 0\n  byteLength = byteLength | 0\n  if (!noAssert) {\n    var maxBytes = Math.pow(2, 8 * byteLength) - 1\n    checkInt(this, value, offset, byteLength, maxBytes, 0)\n  }\n\n  var mul = 1\n  var i = 0\n  this[offset] = value & 0xFF\n  while (++i < byteLength && (mul *= 0x100)) {\n    this[offset + i] = (value / mul) & 0xFF\n  }\n\n  return offset + byteLength\n}\n\nBuffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {\n  value = +value\n  offset = offset | 0\n  byteLength = byteLength | 0\n  if (!noAssert) {\n    var maxBytes = Math.pow(2, 8 * byteLength) - 1\n    checkInt(this, value, offset, byteLength, maxBytes, 0)\n  }\n\n  var i = byteLength - 1\n  var mul = 1\n  this[offset + i] = value & 0xFF\n  while (--i >= 0 && (mul *= 0x100)) {\n    this[offset + i] = (value / mul) & 0xFF\n  }\n\n  return offset + byteLength\n}\n\nBuffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {\n  value = +value\n  offset = offset | 0\n  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)\n  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)\n  this[offset] = (value & 0xff)\n  return offset + 1\n}\n\nfunction objectWriteUInt16 (buf, value, offset, littleEndian) {\n  if (value < 0) value = 0xffff + value + 1\n  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {\n    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>\n      (littleEndian ? i : 1 - i) * 8\n  }\n}\n\nBuffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {\n  value = +value\n  offset = offset | 0\n  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)\n  if (Buffer.TYPED_ARRAY_SUPPORT) {\n    this[offset] = (value & 0xff)\n    this[offset + 1] = (value >>> 8)\n  } else {\n    objectWriteUInt16(this, value, offset, true)\n  }\n  return offset + 2\n}\n\nBuffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {\n  value = +value\n  offset = offset | 0\n  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)\n  if (Buffer.TYPED_ARRAY_SUPPORT) {\n    this[offset] = (value >>> 8)\n    this[offset + 1] = (value & 0xff)\n  } else {\n    objectWriteUInt16(this, value, offset, false)\n  }\n  return offset + 2\n}\n\nfunction objectWriteUInt32 (buf, value, offset, littleEndian) {\n  if (value < 0) value = 0xffffffff + value + 1\n  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {\n    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff\n  }\n}\n\nBuffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {\n  value = +value\n  offset = offset | 0\n  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)\n  if (Buffer.TYPED_ARRAY_SUPPORT) {\n    this[offset + 3] = (value >>> 24)\n    this[offset + 2] = (value >>> 16)\n    this[offset + 1] = (value >>> 8)\n    this[offset] = (value & 0xff)\n  } else {\n    objectWriteUInt32(this, value, offset, true)\n  }\n  return offset + 4\n}\n\nBuffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {\n  value = +value\n  offset = offset | 0\n  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)\n  if (Buffer.TYPED_ARRAY_SUPPORT) {\n    this[offset] = (value >>> 24)\n    this[offset + 1] = (value >>> 16)\n    this[offset + 2] = (value >>> 8)\n    this[offset + 3] = (value & 0xff)\n  } else {\n    objectWriteUInt32(this, value, offset, false)\n  }\n  return offset + 4\n}\n\nBuffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {\n  value = +value\n  offset = offset | 0\n  if (!noAssert) {\n    var limit = Math.pow(2, 8 * byteLength - 1)\n\n    checkInt(this, value, offset, byteLength, limit - 1, -limit)\n  }\n\n  var i = 0\n  var mul = 1\n  var sub = 0\n  this[offset] = value & 0xFF\n  while (++i < byteLength && (mul *= 0x100)) {\n    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {\n      sub = 1\n    }\n    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF\n  }\n\n  return offset + byteLength\n}\n\nBuffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {\n  value = +value\n  offset = offset | 0\n  if (!noAssert) {\n    var limit = Math.pow(2, 8 * byteLength - 1)\n\n    checkInt(this, value, offset, byteLength, limit - 1, -limit)\n  }\n\n  var i = byteLength - 1\n  var mul = 1\n  var sub = 0\n  this[offset + i] = value & 0xFF\n  while (--i >= 0 && (mul *= 0x100)) {\n    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {\n      sub = 1\n    }\n    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF\n  }\n\n  return offset + byteLength\n}\n\nBuffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {\n  value = +value\n  offset = offset | 0\n  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)\n  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)\n  if (value < 0) value = 0xff + value + 1\n  this[offset] = (value & 0xff)\n  return offset + 1\n}\n\nBuffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {\n  value = +value\n  offset = offset | 0\n  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)\n  if (Buffer.TYPED_ARRAY_SUPPORT) {\n    this[offset] = (value & 0xff)\n    this[offset + 1] = (value >>> 8)\n  } else {\n    objectWriteUInt16(this, value, offset, true)\n  }\n  return offset + 2\n}\n\nBuffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {\n  value = +value\n  offset = offset | 0\n  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)\n  if (Buffer.TYPED_ARRAY_SUPPORT) {\n    this[offset] = (value >>> 8)\n    this[offset + 1] = (value & 0xff)\n  } else {\n    objectWriteUInt16(this, value, offset, false)\n  }\n  return offset + 2\n}\n\nBuffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {\n  value = +value\n  offset = offset | 0\n  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)\n  if (Buffer.TYPED_ARRAY_SUPPORT) {\n    this[offset] = (value & 0xff)\n    this[offset + 1] = (value >>> 8)\n    this[offset + 2] = (value >>> 16)\n    this[offset + 3] = (value >>> 24)\n  } else {\n    objectWriteUInt32(this, value, offset, true)\n  }\n  return offset + 4\n}\n\nBuffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {\n  value = +value\n  offset = offset | 0\n  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)\n  if (value < 0) value = 0xffffffff + value + 1\n  if (Buffer.TYPED_ARRAY_SUPPORT) {\n    this[offset] = (value >>> 24)\n    this[offset + 1] = (value >>> 16)\n    this[offset + 2] = (value >>> 8)\n    this[offset + 3] = (value & 0xff)\n  } else {\n    objectWriteUInt32(this, value, offset, false)\n  }\n  return offset + 4\n}\n\nfunction checkIEEE754 (buf, value, offset, ext, max, min) {\n  if (offset + ext > buf.length) throw new RangeError('Index out of range')\n  if (offset < 0) throw new RangeError('Index out of range')\n}\n\nfunction writeFloat (buf, value, offset, littleEndian, noAssert) {\n  if (!noAssert) {\n    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)\n  }\n  ieee754.write(buf, value, offset, littleEndian, 23, 4)\n  return offset + 4\n}\n\nBuffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {\n  return writeFloat(this, value, offset, true, noAssert)\n}\n\nBuffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {\n  return writeFloat(this, value, offset, false, noAssert)\n}\n\nfunction writeDouble (buf, value, offset, littleEndian, noAssert) {\n  if (!noAssert) {\n    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)\n  }\n  ieee754.write(buf, value, offset, littleEndian, 52, 8)\n  return offset + 8\n}\n\nBuffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {\n  return writeDouble(this, value, offset, true, noAssert)\n}\n\nBuffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {\n  return writeDouble(this, value, offset, false, noAssert)\n}\n\n// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)\nBuffer.prototype.copy = function copy (target, targetStart, start, end) {\n  if (!start) start = 0\n  if (!end && end !== 0) end = this.length\n  if (targetStart >= target.length) targetStart = target.length\n  if (!targetStart) targetStart = 0\n  if (end > 0 && end < start) end = start\n\n  // Copy 0 bytes; we're done\n  if (end === start) return 0\n  if (target.length === 0 || this.length === 0) return 0\n\n  // Fatal error conditions\n  if (targetStart < 0) {\n    throw new RangeError('targetStart out of bounds')\n  }\n  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')\n  if (end < 0) throw new RangeError('sourceEnd out of bounds')\n\n  // Are we oob?\n  if (end > this.length) end = this.length\n  if (target.length - targetStart < end - start) {\n    end = target.length - targetStart + start\n  }\n\n  var len = end - start\n  var i\n\n  if (this === target && start < targetStart && targetStart < end) {\n    // descending copy from end\n    for (i = len - 1; i >= 0; --i) {\n      target[i + targetStart] = this[i + start]\n    }\n  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {\n    // ascending copy from start\n    for (i = 0; i < len; ++i) {\n      target[i + targetStart] = this[i + start]\n    }\n  } else {\n    Uint8Array.prototype.set.call(\n      target,\n      this.subarray(start, start + len),\n      targetStart\n    )\n  }\n\n  return len\n}\n\n// Usage:\n//    buffer.fill(number[, offset[, end]])\n//    buffer.fill(buffer[, offset[, end]])\n//    buffer.fill(string[, offset[, end]][, encoding])\nBuffer.prototype.fill = function fill (val, start, end, encoding) {\n  // Handle string cases:\n  if (typeof val === 'string') {\n    if (typeof start === 'string') {\n      encoding = start\n      start = 0\n      end = this.length\n    } else if (typeof end === 'string') {\n      encoding = end\n      end = this.length\n    }\n    if (val.length === 1) {\n      var code = val.charCodeAt(0)\n      if (code < 256) {\n        val = code\n      }\n    }\n    if (encoding !== undefined && typeof encoding !== 'string') {\n      throw new TypeError('encoding must be a string')\n    }\n    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {\n      throw new TypeError('Unknown encoding: ' + encoding)\n    }\n  } else if (typeof val === 'number') {\n    val = val & 255\n  }\n\n  // Invalid ranges are not set to a default, so can range check early.\n  if (start < 0 || this.length < start || this.length < end) {\n    throw new RangeError('Out of range index')\n  }\n\n  if (end <= start) {\n    return this\n  }\n\n  start = start >>> 0\n  end = end === undefined ? this.length : end >>> 0\n\n  if (!val) val = 0\n\n  var i\n  if (typeof val === 'number') {\n    for (i = start; i < end; ++i) {\n      this[i] = val\n    }\n  } else {\n    var bytes = Buffer.isBuffer(val)\n      ? val\n      : utf8ToBytes(new Buffer(val, encoding).toString())\n    var len = bytes.length\n    for (i = 0; i < end - start; ++i) {\n      this[i + start] = bytes[i % len]\n    }\n  }\n\n  return this\n}\n\n// HELPER FUNCTIONS\n// ================\n\nvar INVALID_BASE64_RE = /[^+\\/0-9A-Za-z-_]/g\n\nfunction base64clean (str) {\n  // Node strips out invalid characters like \\n and \\t from the string, base64-js does not\n  str = stringtrim(str).replace(INVALID_BASE64_RE, '')\n  // Node converts strings with length < 2 to ''\n  if (str.length < 2) return ''\n  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not\n  while (str.length % 4 !== 0) {\n    str = str + '='\n  }\n  return str\n}\n\nfunction stringtrim (str) {\n  if (str.trim) return str.trim()\n  return str.replace(/^\\s+|\\s+$/g, '')\n}\n\nfunction toHex (n) {\n  if (n < 16) return '0' + n.toString(16)\n  return n.toString(16)\n}\n\nfunction utf8ToBytes (string, units) {\n  units = units || Infinity\n  var codePoint\n  var length = string.length\n  var leadSurrogate = null\n  var bytes = []\n\n  for (var i = 0; i < length; ++i) {\n    codePoint = string.charCodeAt(i)\n\n    // is surrogate component\n    if (codePoint > 0xD7FF && codePoint < 0xE000) {\n      // last char was a lead\n      if (!leadSurrogate) {\n        // no lead yet\n        if (codePoint > 0xDBFF) {\n          // unexpected trail\n          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)\n          continue\n        } else if (i + 1 === length) {\n          // unpaired lead\n          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)\n          continue\n        }\n\n        // valid lead\n        leadSurrogate = codePoint\n\n        continue\n      }\n\n      // 2 leads in a row\n      if (codePoint < 0xDC00) {\n        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)\n        leadSurrogate = codePoint\n        continue\n      }\n\n      // valid surrogate pair\n      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000\n    } else if (leadSurrogate) {\n      // valid bmp char, but last char was a lead\n      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)\n    }\n\n    leadSurrogate = null\n\n    // encode utf8\n    if (codePoint < 0x80) {\n      if ((units -= 1) < 0) break\n      bytes.push(codePoint)\n    } else if (codePoint < 0x800) {\n      if ((units -= 2) < 0) break\n      bytes.push(\n        codePoint >> 0x6 | 0xC0,\n        codePoint & 0x3F | 0x80\n      )\n    } else if (codePoint < 0x10000) {\n      if ((units -= 3) < 0) break\n      bytes.push(\n        codePoint >> 0xC | 0xE0,\n        codePoint >> 0x6 & 0x3F | 0x80,\n        codePoint & 0x3F | 0x80\n      )\n    } else if (codePoint < 0x110000) {\n      if ((units -= 4) < 0) break\n      bytes.push(\n        codePoint >> 0x12 | 0xF0,\n        codePoint >> 0xC & 0x3F | 0x80,\n        codePoint >> 0x6 & 0x3F | 0x80,\n        codePoint & 0x3F | 0x80\n      )\n    } else {\n      throw new Error('Invalid code point')\n    }\n  }\n\n  return bytes\n}\n\nfunction asciiToBytes (str) {\n  var byteArray = []\n  for (var i = 0; i < str.length; ++i) {\n    // Node's code seems to be doing this and not & 0x7F..\n    byteArray.push(str.charCodeAt(i) & 0xFF)\n  }\n  return byteArray\n}\n\nfunction utf16leToBytes (str, units) {\n  var c, hi, lo\n  var byteArray = []\n  for (var i = 0; i < str.length; ++i) {\n    if ((units -= 2) < 0) break\n\n    c = str.charCodeAt(i)\n    hi = c >> 8\n    lo = c % 256\n    byteArray.push(lo)\n    byteArray.push(hi)\n  }\n\n  return byteArray\n}\n\nfunction base64ToBytes (str) {\n  return base64.toByteArray(base64clean(str))\n}\n\nfunction blitBuffer (src, dst, offset, length) {\n  for (var i = 0; i < length; ++i) {\n    if ((i + offset >= dst.length) || (i >= src.length)) break\n    dst[i + offset] = src[i]\n  }\n  return i\n}\n\nfunction isnan (val) {\n  return val !== val // eslint-disable-line no-self-compare\n}\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(7)))\n\n/***/ }),\n/* 14 */\n/***/ (function(module, exports, __webpack_require__) {\n\n\"use strict\";\n\n\nexports.byteLength = byteLength\nexports.toByteArray = toByteArray\nexports.fromByteArray = fromByteArray\n\nvar lookup = []\nvar revLookup = []\nvar Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array\n\nvar code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'\nfor (var i = 0, len = code.length; i < len; ++i) {\n  lookup[i] = code[i]\n  revLookup[code.charCodeAt(i)] = i\n}\n\n// Support decoding URL-safe base64 strings, as Node.js does.\n// See: https://en.wikipedia.org/wiki/Base64#URL_applications\nrevLookup['-'.charCodeAt(0)] = 62\nrevLookup['_'.charCodeAt(0)] = 63\n\nfunction getLens (b64) {\n  var len = b64.length\n\n  if (len % 4 > 0) {\n    throw new Error('Invalid string. Length must be a multiple of 4')\n  }\n\n  // Trim off extra bytes after placeholder bytes are found\n  // See: https://github.com/beatgammit/base64-js/issues/42\n  var validLen = b64.indexOf('=')\n  if (validLen === -1) validLen = len\n\n  var placeHoldersLen = validLen === len\n    ? 0\n    : 4 - (validLen % 4)\n\n  return [validLen, placeHoldersLen]\n}\n\n// base64 is 4/3 + up to two characters of the original data\nfunction byteLength (b64) {\n  var lens = getLens(b64)\n  var validLen = lens[0]\n  var placeHoldersLen = lens[1]\n  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen\n}\n\nfunction _byteLength (b64, validLen, placeHoldersLen) {\n  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen\n}\n\nfunction toByteArray (b64) {\n  var tmp\n  var lens = getLens(b64)\n  var validLen = lens[0]\n  var placeHoldersLen = lens[1]\n\n  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))\n\n  var curByte = 0\n\n  // if there are placeholders, only get up to the last complete 4 chars\n  var len = placeHoldersLen > 0\n    ? validLen - 4\n    : validLen\n\n  var i\n  for (i = 0; i < len; i += 4) {\n    tmp =\n      (revLookup[b64.charCodeAt(i)] << 18) |\n      (revLookup[b64.charCodeAt(i + 1)] << 12) |\n      (revLookup[b64.charCodeAt(i + 2)] << 6) |\n      revLookup[b64.charCodeAt(i + 3)]\n    arr[curByte++] = (tmp >> 16) & 0xFF\n    arr[curByte++] = (tmp >> 8) & 0xFF\n    arr[curByte++] = tmp & 0xFF\n  }\n\n  if (placeHoldersLen === 2) {\n    tmp =\n      (revLookup[b64.charCodeAt(i)] << 2) |\n      (revLookup[b64.charCodeAt(i + 1)] >> 4)\n    arr[curByte++] = tmp & 0xFF\n  }\n\n  if (placeHoldersLen === 1) {\n    tmp =\n      (revLookup[b64.charCodeAt(i)] << 10) |\n      (revLookup[b64.charCodeAt(i + 1)] << 4) |\n      (revLookup[b64.charCodeAt(i + 2)] >> 2)\n    arr[curByte++] = (tmp >> 8) & 0xFF\n    arr[curByte++] = tmp & 0xFF\n  }\n\n  return arr\n}\n\nfunction tripletToBase64 (num) {\n  return lookup[num >> 18 & 0x3F] +\n    lookup[num >> 12 & 0x3F] +\n    lookup[num >> 6 & 0x3F] +\n    lookup[num & 0x3F]\n}\n\nfunction encodeChunk (uint8, start, end) {\n  var tmp\n  var output = []\n  for (var i = start; i < end; i += 3) {\n    tmp =\n      ((uint8[i] << 16) & 0xFF0000) +\n      ((uint8[i + 1] << 8) & 0xFF00) +\n      (uint8[i + 2] & 0xFF)\n    output.push(tripletToBase64(tmp))\n  }\n  return output.join('')\n}\n\nfunction fromByteArray (uint8) {\n  var tmp\n  var len = uint8.length\n  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes\n  var parts = []\n  var maxChunkLength = 16383 // must be multiple of 3\n\n  // go through the array every three bytes, we'll deal with trailing stuff later\n  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {\n    parts.push(encodeChunk(\n      uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)\n    ))\n  }\n\n  // pad the end with zeros, but make sure to not forget the extra bytes\n  if (extraBytes === 1) {\n    tmp = uint8[len - 1]\n    parts.push(\n      lookup[tmp >> 2] +\n      lookup[(tmp << 4) & 0x3F] +\n      '=='\n    )\n  } else if (extraBytes === 2) {\n    tmp = (uint8[len - 2] << 8) + uint8[len - 1]\n    parts.push(\n      lookup[tmp >> 10] +\n      lookup[(tmp >> 4) & 0x3F] +\n      lookup[(tmp << 2) & 0x3F] +\n      '='\n    )\n  }\n\n  return parts.join('')\n}\n\n\n/***/ }),\n/* 15 */\n/***/ (function(module, exports) {\n\nexports.read = function (buffer, offset, isLE, mLen, nBytes) {\n  var e, m\n  var eLen = (nBytes * 8) - mLen - 1\n  var eMax = (1 << eLen) - 1\n  var eBias = eMax >> 1\n  var nBits = -7\n  var i = isLE ? (nBytes - 1) : 0\n  var d = isLE ? -1 : 1\n  var s = buffer[offset + i]\n\n  i += d\n\n  e = s & ((1 << (-nBits)) - 1)\n  s >>= (-nBits)\n  nBits += eLen\n  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}\n\n  m = e & ((1 << (-nBits)) - 1)\n  e >>= (-nBits)\n  nBits += mLen\n  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}\n\n  if (e === 0) {\n    e = 1 - eBias\n  } else if (e === eMax) {\n    return m ? NaN : ((s ? -1 : 1) * Infinity)\n  } else {\n    m = m + Math.pow(2, mLen)\n    e = e - eBias\n  }\n  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)\n}\n\nexports.write = function (buffer, value, offset, isLE, mLen, nBytes) {\n  var e, m, c\n  var eLen = (nBytes * 8) - mLen - 1\n  var eMax = (1 << eLen) - 1\n  var eBias = eMax >> 1\n  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)\n  var i = isLE ? 0 : (nBytes - 1)\n  var d = isLE ? 1 : -1\n  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0\n\n  value = Math.abs(value)\n\n  if (isNaN(value) || value === Infinity) {\n    m = isNaN(value) ? 1 : 0\n    e = eMax\n  } else {\n    e = Math.floor(Math.log(value) / Math.LN2)\n    if (value * (c = Math.pow(2, -e)) < 1) {\n      e--\n      c *= 2\n    }\n    if (e + eBias >= 1) {\n      value += rt / c\n    } else {\n      value += rt * Math.pow(2, 1 - eBias)\n    }\n    if (value * c >= 2) {\n      e++\n      c /= 2\n    }\n\n    if (e + eBias >= eMax) {\n      m = 0\n      e = eMax\n    } else if (e + eBias >= 1) {\n      m = ((value * c) - 1) * Math.pow(2, mLen)\n      e = e + eBias\n    } else {\n      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)\n      e = 0\n    }\n  }\n\n  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}\n\n  e = (e << mLen) | m\n  eLen += mLen\n  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}\n\n  buffer[offset + i - d] |= s * 128\n}\n\n\n/***/ }),\n/* 16 */\n/***/ (function(module, exports) {\n\nvar toString = {}.toString;\n\nmodule.exports = Array.isArray || function (arr) {\n  return toString.call(arr) == '[object Array]';\n};\n\n\n/***/ }),\n/* 17 */\n/***/ (function(module, exports, __webpack_require__) {\n\n/* WEBPACK VAR INJECTION */(function(__filename, process, __dirname, Buffer) {\nvar createTdwebModule = (() => {\n  var _scriptDir = typeof document !== 'undefined' && document.currentScript ? document.currentScript.src : undefined;\n  if (true) _scriptDir = _scriptDir || __filename;\n  return (\nfunction(createTdwebModule) {\n  createTdwebModule = createTdwebModule || {};\n\nvar Module=typeof createTdwebModule!==\"undefined\"?createTdwebModule:{};var objAssign=Object.assign;var readyPromiseResolve,readyPromiseReject;Module[\"ready\"]=new Promise(function(resolve,reject){readyPromiseResolve=resolve;readyPromiseReject=reject});var moduleOverrides=objAssign({},Module);var arguments_=[];var thisProgram=\"./this.program\";var quit_=(status,toThrow)=>{throw toThrow};var ENVIRONMENT_IS_WEB=typeof window===\"object\";var ENVIRONMENT_IS_WORKER=typeof importScripts===\"function\";var ENVIRONMENT_IS_NODE=typeof process===\"object\"&&typeof process.versions===\"object\"&&typeof process.versions.node===\"string\";var scriptDirectory=\"\";function locateFile(path){if(Module[\"locateFile\"]){return Module[\"locateFile\"](path,scriptDirectory)}return scriptDirectory+path}var read_,readAsync,readBinary,setWindowTitle;function logExceptionOnExit(e){if(e instanceof ExitStatus)return;let toLog=e;err(\"exiting due to exception: \"+toLog)}var fs;var nodePath;var requireNodeFS;if(ENVIRONMENT_IS_NODE){if(ENVIRONMENT_IS_WORKER){scriptDirectory=__webpack_require__(12).dirname(scriptDirectory)+\"/\"}else{scriptDirectory=__dirname+\"/\"}requireNodeFS=function(){if(!nodePath){fs=__webpack_require__(10);nodePath=__webpack_require__(12)}};read_=function shell_read(filename,binary){requireNodeFS();filename=nodePath[\"normalize\"](filename);return fs.readFileSync(filename,binary?null:\"utf8\")};readBinary=function readBinary(filename){var ret=read_(filename,true);if(!ret.buffer){ret=new Uint8Array(ret)}return ret};readAsync=function readAsync(filename,onload,onerror){requireNodeFS();filename=nodePath[\"normalize\"](filename);fs.readFile(filename,function(err,data){if(err)onerror(err);else onload(data.buffer)})};if(process[\"argv\"].length>1){thisProgram=process[\"argv\"][1].replace(/\\\\/g,\"/\")}arguments_=process[\"argv\"].slice(2);process[\"on\"](\"uncaughtException\",function(ex){if(!(ex instanceof ExitStatus)){throw ex}});process[\"on\"](\"unhandledRejection\",function(reason){throw reason});quit_=((status,toThrow)=>{if(keepRuntimeAlive()){process[\"exitCode\"]=status;throw toThrow}logExceptionOnExit(toThrow);process[\"exit\"](status)});Module[\"inspect\"]=function(){return\"[Emscripten Module object]\"}}else if(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER){if(ENVIRONMENT_IS_WORKER){scriptDirectory=self.location.href}else if(typeof document!==\"undefined\"&&document.currentScript){scriptDirectory=document.currentScript.src}if(_scriptDir){scriptDirectory=_scriptDir}if(scriptDirectory.indexOf(\"blob:\")!==0){scriptDirectory=scriptDirectory.substr(0,scriptDirectory.replace(/[?#].*/,\"\").lastIndexOf(\"/\")+1)}else{scriptDirectory=\"\"}{read_=function(url){var xhr=new XMLHttpRequest;xhr.open(\"GET\",url,false);xhr.send(null);return xhr.responseText};if(ENVIRONMENT_IS_WORKER){readBinary=function(url){var xhr=new XMLHttpRequest;xhr.open(\"GET\",url,false);xhr.responseType=\"arraybuffer\";xhr.send(null);return new Uint8Array(xhr.response)}}readAsync=function(url,onload,onerror){var xhr=new XMLHttpRequest;xhr.open(\"GET\",url,true);xhr.responseType=\"arraybuffer\";xhr.onload=function(){if(xhr.status==200||xhr.status==0&&xhr.response){onload(xhr.response);return}onerror()};xhr.onerror=onerror;xhr.send(null)}}setWindowTitle=(title=>document.title=title)}else{}var out=Module[\"print\"]||console.log.bind(console);var err=Module[\"printErr\"]||console.warn.bind(console);objAssign(Module,moduleOverrides);moduleOverrides=null;if(Module[\"arguments\"])arguments_=Module[\"arguments\"];if(Module[\"thisProgram\"])thisProgram=Module[\"thisProgram\"];if(Module[\"quit\"])quit_=Module[\"quit\"];function warnOnce(text){if(!warnOnce.shown)warnOnce.shown={};if(!warnOnce.shown[text]){warnOnce.shown[text]=1;err(text)}}var wasmBinary;if(Module[\"wasmBinary\"])wasmBinary=Module[\"wasmBinary\"];var noExitRuntime=Module[\"noExitRuntime\"]||true;if(typeof WebAssembly!==\"object\"){abort(\"no native wasm support detected\")}var wasmMemory;var ABORT=false;var EXITSTATUS;function assert(condition,text){if(!condition){abort(text)}}function getCFunc(ident){var func=Module[\"_\"+ident];return func}function ccall(ident,returnType,argTypes,args,opts){var toC={\"string\":function(str){var ret=0;if(str!==null&&str!==undefined&&str!==0){var len=(str.length<<2)+1;ret=stackAlloc(len);stringToUTF8(str,ret,len)}return ret},\"array\":function(arr){var ret=stackAlloc(arr.length);writeArrayToMemory(arr,ret);return ret}};function convertReturnValue(ret){if(returnType===\"string\")return UTF8ToString(ret);if(returnType===\"boolean\")return Boolean(ret);return ret}var func=getCFunc(ident);var cArgs=[];var stack=0;if(args){for(var i=0;i<args.length;i++){var converter=toC[argTypes[i]];if(converter){if(stack===0)stack=stackSave();cArgs[i]=converter(args[i])}else{cArgs[i]=args[i]}}}var ret=func.apply(null,cArgs);function onDone(ret){if(stack!==0)stackRestore(stack);return convertReturnValue(ret)}ret=onDone(ret);return ret}function cwrap(ident,returnType,argTypes,opts){argTypes=argTypes||[];var numericArgs=argTypes.every(function(type){return type===\"number\"});var numericRet=returnType!==\"string\";if(numericRet&&numericArgs&&!opts){return getCFunc(ident)}return function(){return ccall(ident,returnType,argTypes,arguments,opts)}}var UTF8Decoder=typeof TextDecoder!==\"undefined\"?new TextDecoder(\"utf8\"):undefined;function UTF8ArrayToString(heap,idx,maxBytesToRead){var endIdx=idx+maxBytesToRead;var endPtr=idx;while(heap[endPtr]&&!(endPtr>=endIdx))++endPtr;if(endPtr-idx>16&&heap.subarray&&UTF8Decoder){return UTF8Decoder.decode(heap.subarray(idx,endPtr))}else{var str=\"\";while(idx<endPtr){var u0=heap[idx++];if(!(u0&128)){str+=String.fromCharCode(u0);continue}var u1=heap[idx++]&63;if((u0&224)==192){str+=String.fromCharCode((u0&31)<<6|u1);continue}var u2=heap[idx++]&63;if((u0&240)==224){u0=(u0&15)<<12|u1<<6|u2}else{u0=(u0&7)<<18|u1<<12|u2<<6|heap[idx++]&63}if(u0<65536){str+=String.fromCharCode(u0)}else{var ch=u0-65536;str+=String.fromCharCode(55296|ch>>10,56320|ch&1023)}}}return str}function UTF8ToString(ptr,maxBytesToRead){return ptr?UTF8ArrayToString(HEAPU8,ptr,maxBytesToRead):\"\"}function stringToUTF8Array(str,heap,outIdx,maxBytesToWrite){if(!(maxBytesToWrite>0))return 0;var startIdx=outIdx;var endIdx=outIdx+maxBytesToWrite-1;for(var i=0;i<str.length;++i){var u=str.charCodeAt(i);if(u>=55296&&u<=57343){var u1=str.charCodeAt(++i);u=65536+((u&1023)<<10)|u1&1023}if(u<=127){if(outIdx>=endIdx)break;heap[outIdx++]=u}else if(u<=2047){if(outIdx+1>=endIdx)break;heap[outIdx++]=192|u>>6;heap[outIdx++]=128|u&63}else if(u<=65535){if(outIdx+2>=endIdx)break;heap[outIdx++]=224|u>>12;heap[outIdx++]=128|u>>6&63;heap[outIdx++]=128|u&63}else{if(outIdx+3>=endIdx)break;heap[outIdx++]=240|u>>18;heap[outIdx++]=128|u>>12&63;heap[outIdx++]=128|u>>6&63;heap[outIdx++]=128|u&63}}heap[outIdx]=0;return outIdx-startIdx}function stringToUTF8(str,outPtr,maxBytesToWrite){return stringToUTF8Array(str,HEAPU8,outPtr,maxBytesToWrite)}function lengthBytesUTF8(str){var len=0;for(var i=0;i<str.length;++i){var u=str.charCodeAt(i);if(u>=55296&&u<=57343)u=65536+((u&1023)<<10)|str.charCodeAt(++i)&1023;if(u<=127)++len;else if(u<=2047)len+=2;else if(u<=65535)len+=3;else len+=4}return len}function allocateUTF8(str){var size=lengthBytesUTF8(str)+1;var ret=_malloc(size);if(ret)stringToUTF8Array(str,HEAP8,ret,size);return ret}function writeArrayToMemory(array,buffer){HEAP8.set(array,buffer)}function writeAsciiToMemory(str,buffer,dontAddNull){for(var i=0;i<str.length;++i){HEAP8[buffer++>>0]=str.charCodeAt(i)}if(!dontAddNull)HEAP8[buffer>>0]=0}function alignUp(x,multiple){if(x%multiple>0){x+=multiple-x%multiple}return x}var buffer,HEAP8,HEAPU8,HEAP16,HEAPU16,HEAP32,HEAPU32,HEAPF32,HEAPF64;function updateGlobalBufferAndViews(buf){buffer=buf;Module[\"HEAP8\"]=HEAP8=new Int8Array(buf);Module[\"HEAP16\"]=HEAP16=new Int16Array(buf);Module[\"HEAP32\"]=HEAP32=new Int32Array(buf);Module[\"HEAPU8\"]=HEAPU8=new Uint8Array(buf);Module[\"HEAPU16\"]=HEAPU16=new Uint16Array(buf);Module[\"HEAPU32\"]=HEAPU32=new Uint32Array(buf);Module[\"HEAPF32\"]=HEAPF32=new Float32Array(buf);Module[\"HEAPF64\"]=HEAPF64=new Float64Array(buf)}var INITIAL_MEMORY=Module[\"INITIAL_MEMORY\"]||16777216;var wasmTable;var __ATPRERUN__=[];var __ATINIT__=[];var __ATMAIN__=[];var __ATPOSTRUN__=[];var runtimeInitialized=false;var runtimeExited=false;var runtimeKeepaliveCounter=0;function keepRuntimeAlive(){return noExitRuntime||runtimeKeepaliveCounter>0}function preRun(){if(Module[\"preRun\"]){if(typeof Module[\"preRun\"]==\"function\")Module[\"preRun\"]=[Module[\"preRun\"]];while(Module[\"preRun\"].length){addOnPreRun(Module[\"preRun\"].shift())}}callRuntimeCallbacks(__ATPRERUN__)}function initRuntime(){runtimeInitialized=true;if(!Module[\"noFSInit\"]&&!FS.init.initialized)FS.init();FS.ignorePermissions=false;TTY.init();SOCKFS.root=FS.mount(SOCKFS,{},null);callRuntimeCallbacks(__ATINIT__)}function preMain(){callRuntimeCallbacks(__ATMAIN__)}function exitRuntime(){runtimeExited=true}function postRun(){if(Module[\"postRun\"]){if(typeof Module[\"postRun\"]==\"function\")Module[\"postRun\"]=[Module[\"postRun\"]];while(Module[\"postRun\"].length){addOnPostRun(Module[\"postRun\"].shift())}}callRuntimeCallbacks(__ATPOSTRUN__)}function addOnPreRun(cb){__ATPRERUN__.unshift(cb)}function addOnInit(cb){__ATINIT__.unshift(cb)}function addOnPostRun(cb){__ATPOSTRUN__.unshift(cb)}var runDependencies=0;var runDependencyWatcher=null;var dependenciesFulfilled=null;function getUniqueRunDependency(id){return id}function addRunDependency(id){runDependencies++;if(Module[\"monitorRunDependencies\"]){Module[\"monitorRunDependencies\"](runDependencies)}}function removeRunDependency(id){runDependencies--;if(Module[\"monitorRunDependencies\"]){Module[\"monitorRunDependencies\"](runDependencies)}if(runDependencies==0){if(runDependencyWatcher!==null){clearInterval(runDependencyWatcher);runDependencyWatcher=null}if(dependenciesFulfilled){var callback=dependenciesFulfilled;dependenciesFulfilled=null;callback()}}}Module[\"preloadedImages\"]={};Module[\"preloadedAudios\"]={};function abort(what){{if(Module[\"onAbort\"]){Module[\"onAbort\"](what)}}what=\"Aborted(\"+what+\")\";err(what);ABORT=true;EXITSTATUS=1;what+=\". Build with -s ASSERTIONS=1 for more info.\";var e=new WebAssembly.RuntimeError(what);readyPromiseReject(e);throw e}var dataURIPrefix=\"data:application/octet-stream;base64,\";function isDataURI(filename){return filename.startsWith(dataURIPrefix)}function isFileURI(filename){return filename.startsWith(\"file://\")}var wasmBinaryFile;wasmBinaryFile=\"td_wasm.wasm\";if(!isDataURI(wasmBinaryFile)){wasmBinaryFile=locateFile(wasmBinaryFile)}function getBinary(file){try{if(file==wasmBinaryFile&&wasmBinary){return new Uint8Array(wasmBinary)}if(readBinary){return readBinary(file)}else{throw\"both async and sync fetching of the wasm failed\"}}catch(err){abort(err)}}function getBinaryPromise(){if(!wasmBinary&&(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER)){if(typeof fetch===\"function\"&&!isFileURI(wasmBinaryFile)){return fetch(wasmBinaryFile,{credentials:\"same-origin\"}).then(function(response){if(!response[\"ok\"]){throw\"failed to load wasm binary file at '\"+wasmBinaryFile+\"'\"}return response[\"arrayBuffer\"]()}).catch(function(){return getBinary(wasmBinaryFile)})}else{if(readAsync){return new Promise(function(resolve,reject){readAsync(wasmBinaryFile,function(response){resolve(new Uint8Array(response))},reject)})}}}return Promise.resolve().then(function(){return getBinary(wasmBinaryFile)})}function createWasm(){var info={\"a\":asmLibraryArg};function receiveInstance(instance,module){var exports=instance.exports;Module[\"asm\"]=exports;wasmMemory=Module[\"asm\"][\"ka\"];updateGlobalBufferAndViews(wasmMemory.buffer);wasmTable=Module[\"asm\"][\"sa\"];addOnInit(Module[\"asm\"][\"la\"]);removeRunDependency(\"wasm-instantiate\")}addRunDependency(\"wasm-instantiate\");function receiveInstantiationResult(result){receiveInstance(result[\"instance\"])}function instantiateArrayBuffer(receiver){return getBinaryPromise().then(function(binary){return WebAssembly.instantiate(binary,info)}).then(function(instance){return instance}).then(receiver,function(reason){err(\"failed to asynchronously prepare wasm: \"+reason);abort(reason)})}function instantiateAsync(){if(!wasmBinary&&typeof WebAssembly.instantiateStreaming===\"function\"&&!isDataURI(wasmBinaryFile)&&!isFileURI(wasmBinaryFile)&&typeof fetch===\"function\"){return fetch(wasmBinaryFile,{credentials:\"same-origin\"}).then(function(response){var result=WebAssembly.instantiateStreaming(response,info);return result.then(receiveInstantiationResult,function(reason){err(\"wasm streaming compile failed: \"+reason);err(\"falling back to ArrayBuffer instantiation\");return instantiateArrayBuffer(receiveInstantiationResult)})})}else{return instantiateArrayBuffer(receiveInstantiationResult)}}if(Module[\"instantiateWasm\"]){try{var exports=Module[\"instantiateWasm\"](info,receiveInstance);return exports}catch(e){err(\"Module.instantiateWasm callback failed with error: \"+e);return false}}instantiateAsync().catch(readyPromiseReject);return{}}var tempDouble;var tempI64;var ASM_CONSTS={1712048:function(){function detectOsName(){if(typeof process===\"object\"&&typeof process.platform===\"string\"){switch(process.platform){case\"aix\":return\"IBM AIX\";case\"android\":return\"Android\";case\"darwin\":return\"macOS\";case\"freebsd\":return\"FreeBSD\";case\"linux\":return\"Linux\";case\"openbsd\":return\"OpenBSD\";case\"sunos\":return\"SunOS\";case\"win32\":return\"Windows\";case\"darwin\":return\"macOS\";default:return\"Node.js\"}}var userAgent=\"Unknown\";if(typeof window===\"object\"){userAgent=window.navigator.userAgent}else if(typeof importScripts===\"function\"){userAgent=navigator.userAgent}var match=/(Mac OS|Mac OS X|MacPPC|MacIntel|Mac_PowerPC|Macintosh) ([._0-9]+)/.exec(userAgent);if(match!==null){return\"macOS \"+match[2].replace(\"_\",\".\")}match=/Android [._0-9]+/.exec(userAgent);if(match!==null){return match[0].replace(\"_\",\".\")}if(/(iPhone|iPad|iPod)/.test(userAgent)){match=/OS ([._0-9]+)/.exec(userAgent);if(match!==null){return\"iOS \"+match[1].replace(\"_\",\".\")}return\"iOS\"}var clientStrings=[{s:\"Windows 11\",r:/(Windows 11|Windows NT 11)/},{s:\"Windows 8.1\",r:/(Windows 8.1|Windows NT 6.3)/},{s:\"Windows 8\",r:/(Windows 8|Windows NT 6.2)/},{s:\"Windows 7\",r:/(Windows 7|Windows NT 6.1)/},{s:\"Windows Vista\",r:/Windows NT 6.0/},{s:\"Windows Server 2003\",r:/Windows NT 5.2/},{s:\"Windows XP\",r:/(Windows XP|Windows NT 5.1)/},{s:\"Windows\",r:/Windows/},{s:\"Android\",r:/Android/},{s:\"FreeBSD\",r:/FreeBSD/},{s:\"OpenBSD\",r:/OpenBSD/},{s:\"Chrome OS\",r:/CrOS/},{s:\"Linux\",r:/(Linux|X11)/},{s:\"macOS\",r:/(Mac OS|MacPPC|MacIntel|Mac_PowerPC|Macintosh)/},{s:\"QNX\",r:/QNX/},{s:\"BeOS\",r:/BeOS/}];for(var id in clientStrings){var cs=clientStrings[id];if(cs.r.test(userAgent)){return cs.s}}return\"Emscripten\"}var os_name=detectOsName();var length=lengthBytesUTF8(os_name)+1;var result=_malloc(length);stringToUTF8(os_name,result,length);return result},1714051:function($0){throw UTF8ToString($0)}};function callRuntimeCallbacks(callbacks){while(callbacks.length>0){var callback=callbacks.shift();if(typeof callback==\"function\"){callback(Module);continue}var func=callback.func;if(typeof func===\"number\"){if(callback.arg===undefined){getWasmTableEntry(func)()}else{getWasmTableEntry(func)(callback.arg)}}else{func(callback.arg===undefined?null:callback.arg)}}}function demangle(func){return func}function demangleAll(text){var regex=/\\b_Z[\\w\\d_]+/g;return text.replace(regex,function(x){var y=demangle(x);return x===y?x:y+\" [\"+x+\"]\"})}function getWasmTableEntry(funcPtr){return wasmTable.get(funcPtr)}function handleException(e){if(e instanceof ExitStatus||e==\"unwind\"){return EXITSTATUS}quit_(1,e)}function jsStackTrace(){var error=new Error;if(!error.stack){try{throw new Error}catch(e){error=e}if(!error.stack){return\"(no stack trace available)\"}}return error.stack.toString()}function stackTrace(){var js=jsStackTrace();if(Module[\"extraStackTrace\"])js+=\"\\n\"+Module[\"extraStackTrace\"]();return demangleAll(js)}var _emscripten_get_now;if(ENVIRONMENT_IS_NODE){_emscripten_get_now=(()=>{var t=process[\"hrtime\"]();return t[0]*1e3+t[1]/1e6})}else _emscripten_get_now=(()=>performance.now());var _emscripten_get_now_is_monotonic=true;function setErrNo(value){HEAP32[___errno_location()>>2]=value;return value}function _clock_gettime(clk_id,tp){var now;if(clk_id===0){now=Date.now()}else if((clk_id===1||clk_id===4)&&_emscripten_get_now_is_monotonic){now=_emscripten_get_now()}else{setErrNo(28);return-1}HEAP32[tp>>2]=now/1e3|0;HEAP32[tp+4>>2]=now%1e3*1e3*1e3|0;return 0}function ___clock_gettime(a0,a1){return _clock_gettime(a0,a1)}function _tzset_impl(){var currentYear=(new Date).getFullYear();var winter=new Date(currentYear,0,1);var summer=new Date(currentYear,6,1);var winterOffset=winter.getTimezoneOffset();var summerOffset=summer.getTimezoneOffset();var stdTimezoneOffset=Math.max(winterOffset,summerOffset);HEAP32[__get_timezone()>>2]=stdTimezoneOffset*60;HEAP32[__get_daylight()>>2]=Number(winterOffset!=summerOffset);function extractZone(date){var match=date.toTimeString().match(/\\(([A-Za-z ]+)\\)$/);return match?match[1]:\"GMT\"}var winterName=extractZone(winter);var summerName=extractZone(summer);var winterNamePtr=allocateUTF8(winterName);var summerNamePtr=allocateUTF8(summerName);if(summerOffset<winterOffset){HEAP32[__get_tzname()>>2]=winterNamePtr;HEAP32[__get_tzname()+4>>2]=summerNamePtr}else{HEAP32[__get_tzname()>>2]=summerNamePtr;HEAP32[__get_tzname()+4>>2]=winterNamePtr}}function _tzset(){if(_tzset.called)return;_tzset.called=true;_tzset_impl()}function _localtime_r(time,tmPtr){_tzset();var date=new Date(HEAP32[time>>2]*1e3);HEAP32[tmPtr>>2]=date.getSeconds();HEAP32[tmPtr+4>>2]=date.getMinutes();HEAP32[tmPtr+8>>2]=date.getHours();HEAP32[tmPtr+12>>2]=date.getDate();HEAP32[tmPtr+16>>2]=date.getMonth();HEAP32[tmPtr+20>>2]=date.getFullYear()-1900;HEAP32[tmPtr+24>>2]=date.getDay();var start=new Date(date.getFullYear(),0,1);var yday=(date.getTime()-start.getTime())/(1e3*60*60*24)|0;HEAP32[tmPtr+28>>2]=yday;HEAP32[tmPtr+36>>2]=-(date.getTimezoneOffset()*60);var summerOffset=new Date(date.getFullYear(),6,1).getTimezoneOffset();var winterOffset=start.getTimezoneOffset();var dst=(summerOffset!=winterOffset&&date.getTimezoneOffset()==Math.min(winterOffset,summerOffset))|0;HEAP32[tmPtr+32>>2]=dst;var zonePtr=HEAP32[__get_tzname()+(dst?4:0)>>2];HEAP32[tmPtr+40>>2]=zonePtr;return tmPtr}function ___localtime_r(a0,a1){return _localtime_r(a0,a1)}var PATH={splitPath:function(filename){var splitPathRe=/^(\\/?|)([\\s\\S]*?)((?:\\.{1,2}|[^\\/]+?|)(\\.[^.\\/]*|))(?:[\\/]*)$/;return splitPathRe.exec(filename).slice(1)},normalizeArray:function(parts,allowAboveRoot){var up=0;for(var i=parts.length-1;i>=0;i--){var last=parts[i];if(last===\".\"){parts.splice(i,1)}else if(last===\"..\"){parts.splice(i,1);up++}else if(up){parts.splice(i,1);up--}}if(allowAboveRoot){for(;up;up--){parts.unshift(\"..\")}}return parts},normalize:function(path){var isAbsolute=path.charAt(0)===\"/\",trailingSlash=path.substr(-1)===\"/\";path=PATH.normalizeArray(path.split(\"/\").filter(function(p){return!!p}),!isAbsolute).join(\"/\");if(!path&&!isAbsolute){path=\".\"}if(path&&trailingSlash){path+=\"/\"}return(isAbsolute?\"/\":\"\")+path},dirname:function(path){var result=PATH.splitPath(path),root=result[0],dir=result[1];if(!root&&!dir){return\".\"}if(dir){dir=dir.substr(0,dir.length-1)}return root+dir},basename:function(path){if(path===\"/\")return\"/\";path=PATH.normalize(path);path=path.replace(/\\/$/,\"\");var lastSlash=path.lastIndexOf(\"/\");if(lastSlash===-1)return path;return path.substr(lastSlash+1)},extname:function(path){return PATH.splitPath(path)[3]},join:function(){var paths=Array.prototype.slice.call(arguments,0);return PATH.normalize(paths.join(\"/\"))},join2:function(l,r){return PATH.normalize(l+\"/\"+r)}};function getRandomDevice(){if(typeof crypto===\"object\"&&typeof crypto[\"getRandomValues\"]===\"function\"){var randomBuffer=new Uint8Array(1);return function(){crypto.getRandomValues(randomBuffer);return randomBuffer[0]}}else if(ENVIRONMENT_IS_NODE){try{var crypto_module=__webpack_require__(10);return function(){return crypto_module[\"randomBytes\"](1)[0]}}catch(e){}}return function(){abort(\"randomDevice\")}}var PATH_FS={resolve:function(){var resolvedPath=\"\",resolvedAbsolute=false;for(var i=arguments.length-1;i>=-1&&!resolvedAbsolute;i--){var path=i>=0?arguments[i]:FS.cwd();if(typeof path!==\"string\"){throw new TypeError(\"Arguments to path.resolve must be strings\")}else if(!path){return\"\"}resolvedPath=path+\"/\"+resolvedPath;resolvedAbsolute=path.charAt(0)===\"/\"}resolvedPath=PATH.normalizeArray(resolvedPath.split(\"/\").filter(function(p){return!!p}),!resolvedAbsolute).join(\"/\");return(resolvedAbsolute?\"/\":\"\")+resolvedPath||\".\"},relative:function(from,to){from=PATH_FS.resolve(from).substr(1);to=PATH_FS.resolve(to).substr(1);function trim(arr){var start=0;for(;start<arr.length;start++){if(arr[start]!==\"\")break}var end=arr.length-1;for(;end>=0;end--){if(arr[end]!==\"\")break}if(start>end)return[];return arr.slice(start,end-start+1)}var fromParts=trim(from.split(\"/\"));var toParts=trim(to.split(\"/\"));var length=Math.min(fromParts.length,toParts.length);var samePartsLength=length;for(var i=0;i<length;i++){if(fromParts[i]!==toParts[i]){samePartsLength=i;break}}var outputParts=[];for(var i=samePartsLength;i<fromParts.length;i++){outputParts.push(\"..\")}outputParts=outputParts.concat(toParts.slice(samePartsLength));return outputParts.join(\"/\")}};var TTY={ttys:[],init:function(){},shutdown:function(){},register:function(dev,ops){TTY.ttys[dev]={input:[],output:[],ops:ops};FS.registerDevice(dev,TTY.stream_ops)},stream_ops:{open:function(stream){var tty=TTY.ttys[stream.node.rdev];if(!tty){throw new FS.ErrnoError(43)}stream.tty=tty;stream.seekable=false},close:function(stream){stream.tty.ops.flush(stream.tty)},flush:function(stream){stream.tty.ops.flush(stream.tty)},read:function(stream,buffer,offset,length,pos){if(!stream.tty||!stream.tty.ops.get_char){throw new FS.ErrnoError(60)}var bytesRead=0;for(var i=0;i<length;i++){var result;try{result=stream.tty.ops.get_char(stream.tty)}catch(e){throw new FS.ErrnoError(29)}if(result===undefined&&bytesRead===0){throw new FS.ErrnoError(6)}if(result===null||result===undefined)break;bytesRead++;buffer[offset+i]=result}if(bytesRead){stream.node.timestamp=Date.now()}return bytesRead},write:function(stream,buffer,offset,length,pos){if(!stream.tty||!stream.tty.ops.put_char){throw new FS.ErrnoError(60)}try{for(var i=0;i<length;i++){stream.tty.ops.put_char(stream.tty,buffer[offset+i])}}catch(e){throw new FS.ErrnoError(29)}if(length){stream.node.timestamp=Date.now()}return i}},default_tty_ops:{get_char:function(tty){if(!tty.input.length){var result=null;if(ENVIRONMENT_IS_NODE){var BUFSIZE=256;var buf=Buffer.alloc(BUFSIZE);var bytesRead=0;try{bytesRead=fs.readSync(process.stdin.fd,buf,0,BUFSIZE,null)}catch(e){if(e.toString().includes(\"EOF\"))bytesRead=0;else throw e}if(bytesRead>0){result=buf.slice(0,bytesRead).toString(\"utf-8\")}else{result=null}}else if(typeof window!=\"undefined\"&&typeof window.prompt==\"function\"){result=window.prompt(\"Input: \");if(result!==null){result+=\"\\n\"}}else if(typeof readline==\"function\"){result=readline();if(result!==null){result+=\"\\n\"}}if(!result){return null}tty.input=intArrayFromString(result,true)}return tty.input.shift()},put_char:function(tty,val){if(val===null||val===10){out(UTF8ArrayToString(tty.output,0));tty.output=[]}else{if(val!=0)tty.output.push(val)}},flush:function(tty){if(tty.output&&tty.output.length>0){out(UTF8ArrayToString(tty.output,0));tty.output=[]}}},default_tty1_ops:{put_char:function(tty,val){if(val===null||val===10){err(UTF8ArrayToString(tty.output,0));tty.output=[]}else{if(val!=0)tty.output.push(val)}},flush:function(tty){if(tty.output&&tty.output.length>0){err(UTF8ArrayToString(tty.output,0));tty.output=[]}}}};function zeroMemory(address,size){HEAPU8.fill(0,address,address+size)}function alignMemory(size,alignment){return Math.ceil(size/alignment)*alignment}function mmapAlloc(size){size=alignMemory(size,65536);var ptr=_memalign(65536,size);if(!ptr)return 0;zeroMemory(ptr,size);return ptr}var MEMFS={ops_table:null,mount:function(mount){return MEMFS.createNode(null,\"/\",16384|511,0)},createNode:function(parent,name,mode,dev){if(FS.isBlkdev(mode)||FS.isFIFO(mode)){throw new FS.ErrnoError(63)}if(!MEMFS.ops_table){MEMFS.ops_table={dir:{node:{getattr:MEMFS.node_ops.getattr,setattr:MEMFS.node_ops.setattr,lookup:MEMFS.node_ops.lookup,mknod:MEMFS.node_ops.mknod,rename:MEMFS.node_ops.rename,unlink:MEMFS.node_ops.unlink,rmdir:MEMFS.node_ops.rmdir,readdir:MEMFS.node_ops.readdir,symlink:MEMFS.node_ops.symlink},stream:{llseek:MEMFS.stream_ops.llseek}},file:{node:{getattr:MEMFS.node_ops.getattr,setattr:MEMFS.node_ops.setattr},stream:{llseek:MEMFS.stream_ops.llseek,read:MEMFS.stream_ops.read,write:MEMFS.stream_ops.write,allocate:MEMFS.stream_ops.allocate,mmap:MEMFS.stream_ops.mmap,msync:MEMFS.stream_ops.msync}},link:{node:{getattr:MEMFS.node_ops.getattr,setattr:MEMFS.node_ops.setattr,readlink:MEMFS.node_ops.readlink},stream:{}},chrdev:{node:{getattr:MEMFS.node_ops.getattr,setattr:MEMFS.node_ops.setattr},stream:FS.chrdev_stream_ops}}}var node=FS.createNode(parent,name,mode,dev);if(FS.isDir(node.mode)){node.node_ops=MEMFS.ops_table.dir.node;node.stream_ops=MEMFS.ops_table.dir.stream;node.contents={}}else if(FS.isFile(node.mode)){node.node_ops=MEMFS.ops_table.file.node;node.stream_ops=MEMFS.ops_table.file.stream;node.usedBytes=0;node.contents=null}else if(FS.isLink(node.mode)){node.node_ops=MEMFS.ops_table.link.node;node.stream_ops=MEMFS.ops_table.link.stream}else if(FS.isChrdev(node.mode)){node.node_ops=MEMFS.ops_table.chrdev.node;node.stream_ops=MEMFS.ops_table.chrdev.stream}node.timestamp=Date.now();if(parent){parent.contents[name]=node;parent.timestamp=node.timestamp}return node},getFileDataAsTypedArray:function(node){if(!node.contents)return new Uint8Array(0);if(node.contents.subarray)return node.contents.subarray(0,node.usedBytes);return new Uint8Array(node.contents)},expandFileStorage:function(node,newCapacity){var prevCapacity=node.contents?node.contents.length:0;if(prevCapacity>=newCapacity)return;var CAPACITY_DOUBLING_MAX=1024*1024;newCapacity=Math.max(newCapacity,prevCapacity*(prevCapacity<CAPACITY_DOUBLING_MAX?2:1.125)>>>0);if(prevCapacity!=0)newCapacity=Math.max(newCapacity,256);var oldContents=node.contents;node.contents=new Uint8Array(newCapacity);if(node.usedBytes>0)node.contents.set(oldContents.subarray(0,node.usedBytes),0)},resizeFileStorage:function(node,newSize){if(node.usedBytes==newSize)return;if(newSize==0){node.contents=null;node.usedBytes=0}else{var oldContents=node.contents;node.contents=new Uint8Array(newSize);if(oldContents){node.contents.set(oldContents.subarray(0,Math.min(newSize,node.usedBytes)))}node.usedBytes=newSize}},node_ops:{getattr:function(node){var attr={};attr.dev=FS.isChrdev(node.mode)?node.id:1;attr.ino=node.id;attr.mode=node.mode;attr.nlink=1;attr.uid=0;attr.gid=0;attr.rdev=node.rdev;if(FS.isDir(node.mode)){attr.size=4096}else if(FS.isFile(node.mode)){attr.size=node.usedBytes}else if(FS.isLink(node.mode)){attr.size=node.link.length}else{attr.size=0}attr.atime=new Date(node.timestamp);attr.mtime=new Date(node.timestamp);attr.ctime=new Date(node.timestamp);attr.blksize=4096;attr.blocks=Math.ceil(attr.size/attr.blksize);return attr},setattr:function(node,attr){if(attr.mode!==undefined){node.mode=attr.mode}if(attr.timestamp!==undefined){node.timestamp=attr.timestamp}if(attr.size!==undefined){MEMFS.resizeFileStorage(node,attr.size)}},lookup:function(parent,name){throw FS.genericErrors[44]},mknod:function(parent,name,mode,dev){return MEMFS.createNode(parent,name,mode,dev)},rename:function(old_node,new_dir,new_name){if(FS.isDir(old_node.mode)){var new_node;try{new_node=FS.lookupNode(new_dir,new_name)}catch(e){}if(new_node){for(var i in new_node.contents){throw new FS.ErrnoError(55)}}}delete old_node.parent.contents[old_node.name];old_node.parent.timestamp=Date.now();old_node.name=new_name;new_dir.contents[new_name]=old_node;new_dir.timestamp=old_node.parent.timestamp;old_node.parent=new_dir},unlink:function(parent,name){delete parent.contents[name];parent.timestamp=Date.now()},rmdir:function(parent,name){var node=FS.lookupNode(parent,name);for(var i in node.contents){throw new FS.ErrnoError(55)}delete parent.contents[name];parent.timestamp=Date.now()},readdir:function(node){var entries=[\".\",\"..\"];for(var key in node.contents){if(!node.contents.hasOwnProperty(key)){continue}entries.push(key)}return entries},symlink:function(parent,newname,oldpath){var node=MEMFS.createNode(parent,newname,511|40960,0);node.link=oldpath;return node},readlink:function(node){if(!FS.isLink(node.mode)){throw new FS.ErrnoError(28)}return node.link}},stream_ops:{read:function(stream,buffer,offset,length,position){var contents=stream.node.contents;if(position>=stream.node.usedBytes)return 0;var size=Math.min(stream.node.usedBytes-position,length);if(size>8&&contents.subarray){buffer.set(contents.subarray(position,position+size),offset)}else{for(var i=0;i<size;i++)buffer[offset+i]=contents[position+i]}return size},write:function(stream,buffer,offset,length,position,canOwn){if(buffer.buffer===HEAP8.buffer){canOwn=false}if(!length)return 0;var node=stream.node;node.timestamp=Date.now();if(buffer.subarray&&(!node.contents||node.contents.subarray)){if(canOwn){node.contents=buffer.subarray(offset,offset+length);node.usedBytes=length;return length}else if(node.usedBytes===0&&position===0){node.contents=buffer.slice(offset,offset+length);node.usedBytes=length;return length}else if(position+length<=node.usedBytes){node.contents.set(buffer.subarray(offset,offset+length),position);return length}}MEMFS.expandFileStorage(node,position+length);if(node.contents.subarray&&buffer.subarray){node.contents.set(buffer.subarray(offset,offset+length),position)}else{for(var i=0;i<length;i++){node.contents[position+i]=buffer[offset+i]}}node.usedBytes=Math.max(node.usedBytes,position+length);return length},llseek:function(stream,offset,whence){var position=offset;if(whence===1){position+=stream.position}else if(whence===2){if(FS.isFile(stream.node.mode)){position+=stream.node.usedBytes}}if(position<0){throw new FS.ErrnoError(28)}return position},allocate:function(stream,offset,length){MEMFS.expandFileStorage(stream.node,offset+length);stream.node.usedBytes=Math.max(stream.node.usedBytes,offset+length)},mmap:function(stream,address,length,position,prot,flags){if(address!==0){throw new FS.ErrnoError(28)}if(!FS.isFile(stream.node.mode)){throw new FS.ErrnoError(43)}var ptr;var allocated;var contents=stream.node.contents;if(!(flags&2)&&contents.buffer===buffer){allocated=false;ptr=contents.byteOffset}else{if(position>0||position+length<contents.length){if(contents.subarray){contents=contents.subarray(position,position+length)}else{contents=Array.prototype.slice.call(contents,position,position+length)}}allocated=true;ptr=mmapAlloc(length);if(!ptr){throw new FS.ErrnoError(48)}HEAP8.set(contents,ptr)}return{ptr:ptr,allocated:allocated}},msync:function(stream,buffer,offset,length,mmapFlags){if(!FS.isFile(stream.node.mode)){throw new FS.ErrnoError(43)}if(mmapFlags&2){return 0}var bytesWritten=MEMFS.stream_ops.write(stream,buffer,0,length,offset,false);return 0}}};function asyncLoad(url,onload,onerror,noRunDep){var dep=!noRunDep?getUniqueRunDependency(\"al \"+url):\"\";readAsync(url,function(arrayBuffer){assert(arrayBuffer,'Loading data file \"'+url+'\" failed (no arrayBuffer).');onload(new Uint8Array(arrayBuffer));if(dep)removeRunDependency(dep)},function(event){if(onerror){onerror()}else{throw'Loading data file \"'+url+'\" failed.'}});if(dep)addRunDependency(dep)}var IDBFS={dbs:{},indexedDB:function(){if(typeof indexedDB!==\"undefined\")return indexedDB;var ret=null;if(typeof window===\"object\")ret=window.indexedDB||window.mozIndexedDB||window.webkitIndexedDB||window.msIndexedDB;assert(ret,\"IDBFS used, but indexedDB not supported\");return ret},DB_VERSION:21,DB_STORE_NAME:\"FILE_DATA\",mount:function(mount){return MEMFS.mount.apply(null,arguments)},syncfs:function(mount,populate,callback){IDBFS.getLocalSet(mount,function(err,local){if(err)return callback(err);IDBFS.getRemoteSet(mount,function(err,remote){if(err)return callback(err);var src=populate?remote:local;var dst=populate?local:remote;IDBFS.reconcile(src,dst,callback)})})},getDB:function(name,callback){var db=IDBFS.dbs[name];if(db){return callback(null,db)}var req;try{req=IDBFS.indexedDB().open(name,IDBFS.DB_VERSION)}catch(e){return callback(e)}if(!req){return callback(\"Unable to connect to IndexedDB\")}req.onupgradeneeded=function(e){var db=e.target.result;var transaction=e.target.transaction;var fileStore;if(db.objectStoreNames.contains(IDBFS.DB_STORE_NAME)){fileStore=transaction.objectStore(IDBFS.DB_STORE_NAME)}else{fileStore=db.createObjectStore(IDBFS.DB_STORE_NAME)}if(!fileStore.indexNames.contains(\"timestamp\")){fileStore.createIndex(\"timestamp\",\"timestamp\",{unique:false})}};req.onsuccess=function(){db=req.result;IDBFS.dbs[name]=db;callback(null,db)};req.onerror=function(e){callback(this.error);e.preventDefault()}},getLocalSet:function(mount,callback){var entries={};function isRealDir(p){return p!==\".\"&&p!==\"..\"}function toAbsolute(root){return function(p){return PATH.join2(root,p)}}var check=FS.readdir(mount.mountpoint).filter(isRealDir).map(toAbsolute(mount.mountpoint));while(check.length){var path=check.pop();var stat;try{stat=FS.stat(path)}catch(e){return callback(e)}if(FS.isDir(stat.mode)){check.push.apply(check,FS.readdir(path).filter(isRealDir).map(toAbsolute(path)))}entries[path]={\"timestamp\":stat.mtime}}return callback(null,{type:\"local\",entries:entries})},getRemoteSet:function(mount,callback){var entries={};IDBFS.getDB(mount.mountpoint,function(err,db){if(err)return callback(err);try{var transaction=db.transaction([IDBFS.DB_STORE_NAME],\"readonly\");transaction.onerror=function(e){callback(this.error);e.preventDefault()};var store=transaction.objectStore(IDBFS.DB_STORE_NAME);var index=store.index(\"timestamp\");index.openKeyCursor().onsuccess=function(event){var cursor=event.target.result;if(!cursor){return callback(null,{type:\"remote\",db:db,entries:entries})}entries[cursor.primaryKey]={\"timestamp\":cursor.key};cursor.continue()}}catch(e){return callback(e)}})},loadLocalEntry:function(path,callback){var stat,node;try{var lookup=FS.lookupPath(path);node=lookup.node;stat=FS.stat(path)}catch(e){return callback(e)}if(FS.isDir(stat.mode)){return callback(null,{\"timestamp\":stat.mtime,\"mode\":stat.mode})}else if(FS.isFile(stat.mode)){node.contents=MEMFS.getFileDataAsTypedArray(node);return callback(null,{\"timestamp\":stat.mtime,\"mode\":stat.mode,\"contents\":node.contents})}else{return callback(new Error(\"node type not supported\"))}},storeLocalEntry:function(path,entry,callback){try{if(FS.isDir(entry[\"mode\"])){FS.mkdirTree(path,entry[\"mode\"])}else if(FS.isFile(entry[\"mode\"])){FS.writeFile(path,entry[\"contents\"],{canOwn:true})}else{return callback(new Error(\"node type not supported\"))}FS.chmod(path,entry[\"mode\"]);FS.utime(path,entry[\"timestamp\"],entry[\"timestamp\"])}catch(e){return callback(e)}callback(null)},removeLocalEntry:function(path,callback){try{var lookup=FS.lookupPath(path);var stat=FS.stat(path);if(FS.isDir(stat.mode)){FS.rmdir(path)}else if(FS.isFile(stat.mode)){FS.unlink(path)}}catch(e){return callback(e)}callback(null)},loadRemoteEntry:function(store,path,callback){var req=store.get(path);req.onsuccess=function(event){callback(null,event.target.result)};req.onerror=function(e){callback(this.error);e.preventDefault()}},storeRemoteEntry:function(store,path,entry,callback){try{var req=store.put(entry,path)}catch(e){callback(e);return}req.onsuccess=function(){callback(null)};req.onerror=function(e){callback(this.error);e.preventDefault()}},removeRemoteEntry:function(store,path,callback){var req=store.delete(path);req.onsuccess=function(){callback(null)};req.onerror=function(e){callback(this.error);e.preventDefault()}},reconcile:function(src,dst,callback){var total=0;var create=[];Object.keys(src.entries).forEach(function(key){var e=src.entries[key];var e2=dst.entries[key];if(!e2||e[\"timestamp\"].getTime()!=e2[\"timestamp\"].getTime()){create.push(key);total++}});var remove=[];Object.keys(dst.entries).forEach(function(key){if(!src.entries[key]){remove.push(key);total++}});if(!total){return callback(null)}var errored=false;var db=src.type===\"remote\"?src.db:dst.db;var transaction=db.transaction([IDBFS.DB_STORE_NAME],\"readwrite\");var store=transaction.objectStore(IDBFS.DB_STORE_NAME);function done(err){if(err&&!errored){errored=true;return callback(err)}}transaction.onerror=function(e){done(this.error);e.preventDefault()};transaction.oncomplete=function(e){if(!errored){callback(null)}};create.sort().forEach(function(path){if(dst.type===\"local\"){IDBFS.loadRemoteEntry(store,path,function(err,entry){if(err)return done(err);IDBFS.storeLocalEntry(path,entry,done)})}else{IDBFS.loadLocalEntry(path,function(err,entry){if(err)return done(err);IDBFS.storeRemoteEntry(store,path,entry,done)})}});remove.sort().reverse().forEach(function(path){if(dst.type===\"local\"){IDBFS.removeLocalEntry(path,done)}else{IDBFS.removeRemoteEntry(store,path,done)}})}};var WORKERFS={DIR_MODE:16895,FILE_MODE:33279,reader:null,mount:function(mount){assert(ENVIRONMENT_IS_WORKER);if(!WORKERFS.reader)WORKERFS.reader=new FileReaderSync;var root=WORKERFS.createNode(null,\"/\",WORKERFS.DIR_MODE,0);var createdParents={};function ensureParent(path){var parts=path.split(\"/\");var parent=root;for(var i=0;i<parts.length-1;i++){var curr=parts.slice(0,i+1).join(\"/\");if(!createdParents[curr]){createdParents[curr]=WORKERFS.createNode(parent,parts[i],WORKERFS.DIR_MODE,0)}parent=createdParents[curr]}return parent}function base(path){var parts=path.split(\"/\");return parts[parts.length-1]}Array.prototype.forEach.call(mount.opts[\"files\"]||[],function(file){WORKERFS.createNode(ensureParent(file.name),base(file.name),WORKERFS.FILE_MODE,0,file,file.lastModifiedDate)});(mount.opts[\"blobs\"]||[]).forEach(function(obj){WORKERFS.createNode(ensureParent(obj[\"name\"]),base(obj[\"name\"]),WORKERFS.FILE_MODE,0,obj[\"data\"])});(mount.opts[\"packages\"]||[]).forEach(function(pack){pack[\"metadata\"].files.forEach(function(file){var name=file.filename.substr(1);WORKERFS.createNode(ensureParent(name),base(name),WORKERFS.FILE_MODE,0,pack[\"blob\"].slice(file.start,file.end))})});return root},createNode:function(parent,name,mode,dev,contents,mtime){var node=FS.createNode(parent,name,mode);node.mode=mode;node.node_ops=WORKERFS.node_ops;node.stream_ops=WORKERFS.stream_ops;node.timestamp=(mtime||new Date).getTime();assert(WORKERFS.FILE_MODE!==WORKERFS.DIR_MODE);if(mode===WORKERFS.FILE_MODE){node.size=contents.size;node.contents=contents}else{node.size=4096;node.contents={}}if(parent){parent.contents[name]=node}return node},node_ops:{getattr:function(node){return{dev:1,ino:node.id,mode:node.mode,nlink:1,uid:0,gid:0,rdev:undefined,size:node.size,atime:new Date(node.timestamp),mtime:new Date(node.timestamp),ctime:new Date(node.timestamp),blksize:4096,blocks:Math.ceil(node.size/4096)}},setattr:function(node,attr){if(attr.mode!==undefined){node.mode=attr.mode}if(attr.timestamp!==undefined){node.timestamp=attr.timestamp}},lookup:function(parent,name){throw new FS.ErrnoError(44)},mknod:function(parent,name,mode,dev){throw new FS.ErrnoError(63)},rename:function(oldNode,newDir,newName){throw new FS.ErrnoError(63)},unlink:function(parent,name){throw new FS.ErrnoError(63)},rmdir:function(parent,name){throw new FS.ErrnoError(63)},readdir:function(node){var entries=[\".\",\"..\"];for(var key in node.contents){if(!node.contents.hasOwnProperty(key)){continue}entries.push(key)}return entries},symlink:function(parent,newName,oldPath){throw new FS.ErrnoError(63)},readlink:function(node){throw new FS.ErrnoError(63)}},stream_ops:{read:function(stream,buffer,offset,length,position){if(position>=stream.node.size)return 0;var chunk=stream.node.contents.slice(position,position+length);var ab=WORKERFS.reader.readAsArrayBuffer(chunk);buffer.set(new Uint8Array(ab),offset);return chunk.size},write:function(stream,buffer,offset,length,position){throw new FS.ErrnoError(29)},llseek:function(stream,offset,whence){var position=offset;if(whence===1){position+=stream.position}else if(whence===2){if(FS.isFile(stream.node.mode)){position+=stream.node.size}}if(position<0){throw new FS.ErrnoError(28)}return position}}};var FS={root:null,mounts:[],devices:{},streams:[],nextInode:1,nameTable:null,currentPath:\"/\",initialized:false,ignorePermissions:true,ErrnoError:null,genericErrors:{},filesystems:null,syncFSRequests:0,lookupPath:function(path,opts){path=PATH_FS.resolve(FS.cwd(),path);opts=opts||{};if(!path)return{path:\"\",node:null};var defaults={follow_mount:true,recurse_count:0};for(var key in defaults){if(opts[key]===undefined){opts[key]=defaults[key]}}if(opts.recurse_count>8){throw new FS.ErrnoError(32)}var parts=PATH.normalizeArray(path.split(\"/\").filter(function(p){return!!p}),false);var current=FS.root;var current_path=\"/\";for(var i=0;i<parts.length;i++){var islast=i===parts.length-1;if(islast&&opts.parent){break}current=FS.lookupNode(current,parts[i]);current_path=PATH.join2(current_path,parts[i]);if(FS.isMountpoint(current)){if(!islast||islast&&opts.follow_mount){current=current.mounted.root}}if(!islast||opts.follow){var count=0;while(FS.isLink(current.mode)){var link=FS.readlink(current_path);current_path=PATH_FS.resolve(PATH.dirname(current_path),link);var lookup=FS.lookupPath(current_path,{recurse_count:opts.recurse_count});current=lookup.node;if(count++>40){throw new FS.ErrnoError(32)}}}}return{path:current_path,node:current}},getPath:function(node){var path;while(true){if(FS.isRoot(node)){var mount=node.mount.mountpoint;if(!path)return mount;return mount[mount.length-1]!==\"/\"?mount+\"/\"+path:mount+path}path=path?node.name+\"/\"+path:node.name;node=node.parent}},hashName:function(parentid,name){var hash=0;for(var i=0;i<name.length;i++){hash=(hash<<5)-hash+name.charCodeAt(i)|0}return(parentid+hash>>>0)%FS.nameTable.length},hashAddNode:function(node){var hash=FS.hashName(node.parent.id,node.name);node.name_next=FS.nameTable[hash];FS.nameTable[hash]=node},hashRemoveNode:function(node){var hash=FS.hashName(node.parent.id,node.name);if(FS.nameTable[hash]===node){FS.nameTable[hash]=node.name_next}else{var current=FS.nameTable[hash];while(current){if(current.name_next===node){current.name_next=node.name_next;break}current=current.name_next}}},lookupNode:function(parent,name){var errCode=FS.mayLookup(parent);if(errCode){throw new FS.ErrnoError(errCode,parent)}var hash=FS.hashName(parent.id,name);for(var node=FS.nameTable[hash];node;node=node.name_next){var nodeName=node.name;if(node.parent.id===parent.id&&nodeName===name){return node}}return FS.lookup(parent,name)},createNode:function(parent,name,mode,rdev){var node=new FS.FSNode(parent,name,mode,rdev);FS.hashAddNode(node);return node},destroyNode:function(node){FS.hashRemoveNode(node)},isRoot:function(node){return node===node.parent},isMountpoint:function(node){return!!node.mounted},isFile:function(mode){return(mode&61440)===32768},isDir:function(mode){return(mode&61440)===16384},isLink:function(mode){return(mode&61440)===40960},isChrdev:function(mode){return(mode&61440)===8192},isBlkdev:function(mode){return(mode&61440)===24576},isFIFO:function(mode){return(mode&61440)===4096},isSocket:function(mode){return(mode&49152)===49152},flagModes:{\"r\":0,\"r+\":2,\"w\":577,\"w+\":578,\"a\":1089,\"a+\":1090},modeStringToFlags:function(str){var flags=FS.flagModes[str];if(typeof flags===\"undefined\"){throw new Error(\"Unknown file open mode: \"+str)}return flags},flagsToPermissionString:function(flag){var perms=[\"r\",\"w\",\"rw\"][flag&3];if(flag&512){perms+=\"w\"}return perms},nodePermissions:function(node,perms){if(FS.ignorePermissions){return 0}if(perms.includes(\"r\")&&!(node.mode&292)){return 2}else if(perms.includes(\"w\")&&!(node.mode&146)){return 2}else if(perms.includes(\"x\")&&!(node.mode&73)){return 2}return 0},mayLookup:function(dir){var errCode=FS.nodePermissions(dir,\"x\");if(errCode)return errCode;if(!dir.node_ops.lookup)return 2;return 0},mayCreate:function(dir,name){try{var node=FS.lookupNode(dir,name);return 20}catch(e){}return FS.nodePermissions(dir,\"wx\")},mayDelete:function(dir,name,isdir){var node;try{node=FS.lookupNode(dir,name)}catch(e){return e.errno}var errCode=FS.nodePermissions(dir,\"wx\");if(errCode){return errCode}if(isdir){if(!FS.isDir(node.mode)){return 54}if(FS.isRoot(node)||FS.getPath(node)===FS.cwd()){return 10}}else{if(FS.isDir(node.mode)){return 31}}return 0},mayOpen:function(node,flags){if(!node){return 44}if(FS.isLink(node.mode)){return 32}else if(FS.isDir(node.mode)){if(FS.flagsToPermissionString(flags)!==\"r\"||flags&512){return 31}}return FS.nodePermissions(node,FS.flagsToPermissionString(flags))},MAX_OPEN_FDS:4096,nextfd:function(fd_start,fd_end){fd_start=fd_start||0;fd_end=fd_end||FS.MAX_OPEN_FDS;for(var fd=fd_start;fd<=fd_end;fd++){if(!FS.streams[fd]){return fd}}throw new FS.ErrnoError(33)},getStream:function(fd){return FS.streams[fd]},createStream:function(stream,fd_start,fd_end){if(!FS.FSStream){FS.FSStream=function(){};FS.FSStream.prototype={object:{get:function(){return this.node},set:function(val){this.node=val}},isRead:{get:function(){return(this.flags&2097155)!==1}},isWrite:{get:function(){return(this.flags&2097155)!==0}},isAppend:{get:function(){return this.flags&1024}}}}var newStream=new FS.FSStream;for(var p in stream){newStream[p]=stream[p]}stream=newStream;var fd=FS.nextfd(fd_start,fd_end);stream.fd=fd;FS.streams[fd]=stream;return stream},closeStream:function(fd){FS.streams[fd]=null},chrdev_stream_ops:{open:function(stream){var device=FS.getDevice(stream.node.rdev);stream.stream_ops=device.stream_ops;if(stream.stream_ops.open){stream.stream_ops.open(stream)}},llseek:function(){throw new FS.ErrnoError(70)}},major:function(dev){return dev>>8},minor:function(dev){return dev&255},makedev:function(ma,mi){return ma<<8|mi},registerDevice:function(dev,ops){FS.devices[dev]={stream_ops:ops}},getDevice:function(dev){return FS.devices[dev]},getMounts:function(mount){var mounts=[];var check=[mount];while(check.length){var m=check.pop();mounts.push(m);check.push.apply(check,m.mounts)}return mounts},syncfs:function(populate,callback){if(typeof populate===\"function\"){callback=populate;populate=false}FS.syncFSRequests++;if(FS.syncFSRequests>1){err(\"warning: \"+FS.syncFSRequests+\" FS.syncfs operations in flight at once, probably just doing extra work\")}var mounts=FS.getMounts(FS.root.mount);var completed=0;function doCallback(errCode){FS.syncFSRequests--;return callback(errCode)}function done(errCode){if(errCode){if(!done.errored){done.errored=true;return doCallback(errCode)}return}if(++completed>=mounts.length){doCallback(null)}}mounts.forEach(function(mount){if(!mount.type.syncfs){return done(null)}mount.type.syncfs(mount,populate,done)})},mount:function(type,opts,mountpoint){var root=mountpoint===\"/\";var pseudo=!mountpoint;var node;if(root&&FS.root){throw new FS.ErrnoError(10)}else if(!root&&!pseudo){var lookup=FS.lookupPath(mountpoint,{follow_mount:false});mountpoint=lookup.path;node=lookup.node;if(FS.isMountpoint(node)){throw new FS.ErrnoError(10)}if(!FS.isDir(node.mode)){throw new FS.ErrnoError(54)}}var mount={type:type,opts:opts,mountpoint:mountpoint,mounts:[]};var mountRoot=type.mount(mount);mountRoot.mount=mount;mount.root=mountRoot;if(root){FS.root=mountRoot}else if(node){node.mounted=mount;if(node.mount){node.mount.mounts.push(mount)}}return mountRoot},unmount:function(mountpoint){var lookup=FS.lookupPath(mountpoint,{follow_mount:false});if(!FS.isMountpoint(lookup.node)){throw new FS.ErrnoError(28)}var node=lookup.node;var mount=node.mounted;var mounts=FS.getMounts(mount);Object.keys(FS.nameTable).forEach(function(hash){var current=FS.nameTable[hash];while(current){var next=current.name_next;if(mounts.includes(current.mount)){FS.destroyNode(current)}current=next}});node.mounted=null;var idx=node.mount.mounts.indexOf(mount);node.mount.mounts.splice(idx,1)},lookup:function(parent,name){return parent.node_ops.lookup(parent,name)},mknod:function(path,mode,dev){var lookup=FS.lookupPath(path,{parent:true});var parent=lookup.node;var name=PATH.basename(path);if(!name||name===\".\"||name===\"..\"){throw new FS.ErrnoError(28)}var errCode=FS.mayCreate(parent,name);if(errCode){throw new FS.ErrnoError(errCode)}if(!parent.node_ops.mknod){throw new FS.ErrnoError(63)}return parent.node_ops.mknod(parent,name,mode,dev)},create:function(path,mode){mode=mode!==undefined?mode:438;mode&=4095;mode|=32768;return FS.mknod(path,mode,0)},mkdir:function(path,mode){mode=mode!==undefined?mode:511;mode&=511|512;mode|=16384;return FS.mknod(path,mode,0)},mkdirTree:function(path,mode){var dirs=path.split(\"/\");var d=\"\";for(var i=0;i<dirs.length;++i){if(!dirs[i])continue;d+=\"/\"+dirs[i];try{FS.mkdir(d,mode)}catch(e){if(e.errno!=20)throw e}}},mkdev:function(path,mode,dev){if(typeof dev===\"undefined\"){dev=mode;mode=438}mode|=8192;return FS.mknod(path,mode,dev)},symlink:function(oldpath,newpath){if(!PATH_FS.resolve(oldpath)){throw new FS.ErrnoError(44)}var lookup=FS.lookupPath(newpath,{parent:true});var parent=lookup.node;if(!parent){throw new FS.ErrnoError(44)}var newname=PATH.basename(newpath);var errCode=FS.mayCreate(parent,newname);if(errCode){throw new FS.ErrnoError(errCode)}if(!parent.node_ops.symlink){throw new FS.ErrnoError(63)}return parent.node_ops.symlink(parent,newname,oldpath)},rename:function(old_path,new_path){var old_dirname=PATH.dirname(old_path);var new_dirname=PATH.dirname(new_path);var old_name=PATH.basename(old_path);var new_name=PATH.basename(new_path);var lookup,old_dir,new_dir;lookup=FS.lookupPath(old_path,{parent:true});old_dir=lookup.node;lookup=FS.lookupPath(new_path,{parent:true});new_dir=lookup.node;if(!old_dir||!new_dir)throw new FS.ErrnoError(44);if(old_dir.mount!==new_dir.mount){throw new FS.ErrnoError(75)}var old_node=FS.lookupNode(old_dir,old_name);var relative=PATH_FS.relative(old_path,new_dirname);if(relative.charAt(0)!==\".\"){throw new FS.ErrnoError(28)}relative=PATH_FS.relative(new_path,old_dirname);if(relative.charAt(0)!==\".\"){throw new FS.ErrnoError(55)}var new_node;try{new_node=FS.lookupNode(new_dir,new_name)}catch(e){}if(old_node===new_node){return}var isdir=FS.isDir(old_node.mode);var errCode=FS.mayDelete(old_dir,old_name,isdir);if(errCode){throw new FS.ErrnoError(errCode)}errCode=new_node?FS.mayDelete(new_dir,new_name,isdir):FS.mayCreate(new_dir,new_name);if(errCode){throw new FS.ErrnoError(errCode)}if(!old_dir.node_ops.rename){throw new FS.ErrnoError(63)}if(FS.isMountpoint(old_node)||new_node&&FS.isMountpoint(new_node)){throw new FS.ErrnoError(10)}if(new_dir!==old_dir){errCode=FS.nodePermissions(old_dir,\"w\");if(errCode){throw new FS.ErrnoError(errCode)}}FS.hashRemoveNode(old_node);try{old_dir.node_ops.rename(old_node,new_dir,new_name)}catch(e){throw e}finally{FS.hashAddNode(old_node)}},rmdir:function(path){var lookup=FS.lookupPath(path,{parent:true});var parent=lookup.node;var name=PATH.basename(path);var node=FS.lookupNode(parent,name);var errCode=FS.mayDelete(parent,name,true);if(errCode){throw new FS.ErrnoError(errCode)}if(!parent.node_ops.rmdir){throw new FS.ErrnoError(63)}if(FS.isMountpoint(node)){throw new FS.ErrnoError(10)}parent.node_ops.rmdir(parent,name);FS.destroyNode(node)},readdir:function(path){var lookup=FS.lookupPath(path,{follow:true});var node=lookup.node;if(!node.node_ops.readdir){throw new FS.ErrnoError(54)}return node.node_ops.readdir(node)},unlink:function(path){var lookup=FS.lookupPath(path,{parent:true});var parent=lookup.node;if(!parent){throw new FS.ErrnoError(44)}var name=PATH.basename(path);var node=FS.lookupNode(parent,name);var errCode=FS.mayDelete(parent,name,false);if(errCode){throw new FS.ErrnoError(errCode)}if(!parent.node_ops.unlink){throw new FS.ErrnoError(63)}if(FS.isMountpoint(node)){throw new FS.ErrnoError(10)}parent.node_ops.unlink(parent,name);FS.destroyNode(node)},readlink:function(path){var lookup=FS.lookupPath(path);var link=lookup.node;if(!link){throw new FS.ErrnoError(44)}if(!link.node_ops.readlink){throw new FS.ErrnoError(28)}return PATH_FS.resolve(FS.getPath(link.parent),link.node_ops.readlink(link))},stat:function(path,dontFollow){var lookup=FS.lookupPath(path,{follow:!dontFollow});var node=lookup.node;if(!node){throw new FS.ErrnoError(44)}if(!node.node_ops.getattr){throw new FS.ErrnoError(63)}return node.node_ops.getattr(node)},lstat:function(path){return FS.stat(path,true)},chmod:function(path,mode,dontFollow){var node;if(typeof path===\"string\"){var lookup=FS.lookupPath(path,{follow:!dontFollow});node=lookup.node}else{node=path}if(!node.node_ops.setattr){throw new FS.ErrnoError(63)}node.node_ops.setattr(node,{mode:mode&4095|node.mode&~4095,timestamp:Date.now()})},lchmod:function(path,mode){FS.chmod(path,mode,true)},fchmod:function(fd,mode){var stream=FS.getStream(fd);if(!stream){throw new FS.ErrnoError(8)}FS.chmod(stream.node,mode)},chown:function(path,uid,gid,dontFollow){var node;if(typeof path===\"string\"){var lookup=FS.lookupPath(path,{follow:!dontFollow});node=lookup.node}else{node=path}if(!node.node_ops.setattr){throw new FS.ErrnoError(63)}node.node_ops.setattr(node,{timestamp:Date.now()})},lchown:function(path,uid,gid){FS.chown(path,uid,gid,true)},fchown:function(fd,uid,gid){var stream=FS.getStream(fd);if(!stream){throw new FS.ErrnoError(8)}FS.chown(stream.node,uid,gid)},truncate:function(path,len){if(len<0){throw new FS.ErrnoError(28)}var node;if(typeof path===\"string\"){var lookup=FS.lookupPath(path,{follow:true});node=lookup.node}else{node=path}if(!node.node_ops.setattr){throw new FS.ErrnoError(63)}if(FS.isDir(node.mode)){throw new FS.ErrnoError(31)}if(!FS.isFile(node.mode)){throw new FS.ErrnoError(28)}var errCode=FS.nodePermissions(node,\"w\");if(errCode){throw new FS.ErrnoError(errCode)}node.node_ops.setattr(node,{size:len,timestamp:Date.now()})},ftruncate:function(fd,len){var stream=FS.getStream(fd);if(!stream){throw new FS.ErrnoError(8)}if((stream.flags&2097155)===0){throw new FS.ErrnoError(28)}FS.truncate(stream.node,len)},utime:function(path,atime,mtime){var lookup=FS.lookupPath(path,{follow:true});var node=lookup.node;node.node_ops.setattr(node,{timestamp:Math.max(atime,mtime)})},open:function(path,flags,mode,fd_start,fd_end){if(path===\"\"){throw new FS.ErrnoError(44)}flags=typeof flags===\"string\"?FS.modeStringToFlags(flags):flags;mode=typeof mode===\"undefined\"?438:mode;if(flags&64){mode=mode&4095|32768}else{mode=0}var node;if(typeof path===\"object\"){node=path}else{path=PATH.normalize(path);try{var lookup=FS.lookupPath(path,{follow:!(flags&131072)});node=lookup.node}catch(e){}}var created=false;if(flags&64){if(node){if(flags&128){throw new FS.ErrnoError(20)}}else{node=FS.mknod(path,mode,0);created=true}}if(!node){throw new FS.ErrnoError(44)}if(FS.isChrdev(node.mode)){flags&=~512}if(flags&65536&&!FS.isDir(node.mode)){throw new FS.ErrnoError(54)}if(!created){var errCode=FS.mayOpen(node,flags);if(errCode){throw new FS.ErrnoError(errCode)}}if(flags&512){FS.truncate(node,0)}flags&=~(128|512|131072);var stream=FS.createStream({node:node,path:FS.getPath(node),id:node.id,flags:flags,mode:node.mode,seekable:true,position:0,stream_ops:node.stream_ops,node_ops:node.node_ops,ungotten:[],error:false},fd_start,fd_end);if(stream.stream_ops.open){stream.stream_ops.open(stream)}if(Module[\"logReadFiles\"]&&!(flags&1)){if(!FS.readFiles)FS.readFiles={};if(!(path in FS.readFiles)){FS.readFiles[path]=1}}return stream},close:function(stream){if(FS.isClosed(stream)){throw new FS.ErrnoError(8)}if(stream.getdents)stream.getdents=null;try{if(stream.stream_ops.close){stream.stream_ops.close(stream)}}catch(e){throw e}finally{FS.closeStream(stream.fd)}stream.fd=null},isClosed:function(stream){return stream.fd===null},llseek:function(stream,offset,whence){if(FS.isClosed(stream)){throw new FS.ErrnoError(8)}if(!stream.seekable||!stream.stream_ops.llseek){throw new FS.ErrnoError(70)}if(whence!=0&&whence!=1&&whence!=2){throw new FS.ErrnoError(28)}stream.position=stream.stream_ops.llseek(stream,offset,whence);stream.ungotten=[];return stream.position},read:function(stream,buffer,offset,length,position){if(length<0||position<0){throw new FS.ErrnoError(28)}if(FS.isClosed(stream)){throw new FS.ErrnoError(8)}if((stream.flags&2097155)===1){throw new FS.ErrnoError(8)}if(FS.isDir(stream.node.mode)){throw new FS.ErrnoError(31)}if(!stream.stream_ops.read){throw new FS.ErrnoError(28)}var seeking=typeof position!==\"undefined\";if(!seeking){position=stream.position}else if(!stream.seekable){throw new FS.ErrnoError(70)}var bytesRead=stream.stream_ops.read(stream,buffer,offset,length,position);if(!seeking)stream.position+=bytesRead;return bytesRead},write:function(stream,buffer,offset,length,position,canOwn){if(length<0||position<0){throw new FS.ErrnoError(28)}if(FS.isClosed(stream)){throw new FS.ErrnoError(8)}if((stream.flags&2097155)===0){throw new FS.ErrnoError(8)}if(FS.isDir(stream.node.mode)){throw new FS.ErrnoError(31)}if(!stream.stream_ops.write){throw new FS.ErrnoError(28)}if(stream.seekable&&stream.flags&1024){FS.llseek(stream,0,2)}var seeking=typeof position!==\"undefined\";if(!seeking){position=stream.position}else if(!stream.seekable){throw new FS.ErrnoError(70)}var bytesWritten=stream.stream_ops.write(stream,buffer,offset,length,position,canOwn);if(!seeking)stream.position+=bytesWritten;return bytesWritten},allocate:function(stream,offset,length){if(FS.isClosed(stream)){throw new FS.ErrnoError(8)}if(offset<0||length<=0){throw new FS.ErrnoError(28)}if((stream.flags&2097155)===0){throw new FS.ErrnoError(8)}if(!FS.isFile(stream.node.mode)&&!FS.isDir(stream.node.mode)){throw new FS.ErrnoError(43)}if(!stream.stream_ops.allocate){throw new FS.ErrnoError(138)}stream.stream_ops.allocate(stream,offset,length)},mmap:function(stream,address,length,position,prot,flags){if((prot&2)!==0&&(flags&2)===0&&(stream.flags&2097155)!==2){throw new FS.ErrnoError(2)}if((stream.flags&2097155)===1){throw new FS.ErrnoError(2)}if(!stream.stream_ops.mmap){throw new FS.ErrnoError(43)}return stream.stream_ops.mmap(stream,address,length,position,prot,flags)},msync:function(stream,buffer,offset,length,mmapFlags){if(!stream||!stream.stream_ops.msync){return 0}return stream.stream_ops.msync(stream,buffer,offset,length,mmapFlags)},munmap:function(stream){return 0},ioctl:function(stream,cmd,arg){if(!stream.stream_ops.ioctl){throw new FS.ErrnoError(59)}return stream.stream_ops.ioctl(stream,cmd,arg)},readFile:function(path,opts){opts=opts||{};opts.flags=opts.flags||0;opts.encoding=opts.encoding||\"binary\";if(opts.encoding!==\"utf8\"&&opts.encoding!==\"binary\"){throw new Error('Invalid encoding type \"'+opts.encoding+'\"')}var ret;var stream=FS.open(path,opts.flags);var stat=FS.stat(path);var length=stat.size;var buf=new Uint8Array(length);FS.read(stream,buf,0,length,0);if(opts.encoding===\"utf8\"){ret=UTF8ArrayToString(buf,0)}else if(opts.encoding===\"binary\"){ret=buf}FS.close(stream);return ret},writeFile:function(path,data,opts){opts=opts||{};opts.flags=opts.flags||577;var stream=FS.open(path,opts.flags,opts.mode);if(typeof data===\"string\"){var buf=new Uint8Array(lengthBytesUTF8(data)+1);var actualNumBytes=stringToUTF8Array(data,buf,0,buf.length);FS.write(stream,buf,0,actualNumBytes,undefined,opts.canOwn)}else if(ArrayBuffer.isView(data)){FS.write(stream,data,0,data.byteLength,undefined,opts.canOwn)}else{throw new Error(\"Unsupported data type\")}FS.close(stream)},cwd:function(){return FS.currentPath},chdir:function(path){var lookup=FS.lookupPath(path,{follow:true});if(lookup.node===null){throw new FS.ErrnoError(44)}if(!FS.isDir(lookup.node.mode)){throw new FS.ErrnoError(54)}var errCode=FS.nodePermissions(lookup.node,\"x\");if(errCode){throw new FS.ErrnoError(errCode)}FS.currentPath=lookup.path},createDefaultDirectories:function(){FS.mkdir(\"/tmp\");FS.mkdir(\"/home\");FS.mkdir(\"/home/web_user\")},createDefaultDevices:function(){FS.mkdir(\"/dev\");FS.registerDevice(FS.makedev(1,3),{read:function(){return 0},write:function(stream,buffer,offset,length,pos){return length}});FS.mkdev(\"/dev/null\",FS.makedev(1,3));TTY.register(FS.makedev(5,0),TTY.default_tty_ops);TTY.register(FS.makedev(6,0),TTY.default_tty1_ops);FS.mkdev(\"/dev/tty\",FS.makedev(5,0));FS.mkdev(\"/dev/tty1\",FS.makedev(6,0));var random_device=getRandomDevice();FS.createDevice(\"/dev\",\"random\",random_device);FS.createDevice(\"/dev\",\"urandom\",random_device);FS.mkdir(\"/dev/shm\");FS.mkdir(\"/dev/shm/tmp\")},createSpecialDirectories:function(){FS.mkdir(\"/proc\");var proc_self=FS.mkdir(\"/proc/self\");FS.mkdir(\"/proc/self/fd\");FS.mount({mount:function(){var node=FS.createNode(proc_self,\"fd\",16384|511,73);node.node_ops={lookup:function(parent,name){var fd=+name;var stream=FS.getStream(fd);if(!stream)throw new FS.ErrnoError(8);var ret={parent:null,mount:{mountpoint:\"fake\"},node_ops:{readlink:function(){return stream.path}}};ret.parent=ret;return ret}};return node}},{},\"/proc/self/fd\")},createStandardStreams:function(){if(Module[\"stdin\"]){FS.createDevice(\"/dev\",\"stdin\",Module[\"stdin\"])}else{FS.symlink(\"/dev/tty\",\"/dev/stdin\")}if(Module[\"stdout\"]){FS.createDevice(\"/dev\",\"stdout\",null,Module[\"stdout\"])}else{FS.symlink(\"/dev/tty\",\"/dev/stdout\")}if(Module[\"stderr\"]){FS.createDevice(\"/dev\",\"stderr\",null,Module[\"stderr\"])}else{FS.symlink(\"/dev/tty1\",\"/dev/stderr\")}var stdin=FS.open(\"/dev/stdin\",0);var stdout=FS.open(\"/dev/stdout\",1);var stderr=FS.open(\"/dev/stderr\",1)},ensureErrnoError:function(){if(FS.ErrnoError)return;FS.ErrnoError=function ErrnoError(errno,node){this.node=node;this.setErrno=function(errno){this.errno=errno};this.setErrno(errno);this.message=\"FS error\"};FS.ErrnoError.prototype=new Error;FS.ErrnoError.prototype.constructor=FS.ErrnoError;[44].forEach(function(code){FS.genericErrors[code]=new FS.ErrnoError(code);FS.genericErrors[code].stack=\"<generic error, no stack>\"})},staticInit:function(){FS.ensureErrnoError();FS.nameTable=new Array(4096);FS.mount(MEMFS,{},\"/\");FS.createDefaultDirectories();FS.createDefaultDevices();FS.createSpecialDirectories();FS.filesystems={\"MEMFS\":MEMFS,\"IDBFS\":IDBFS,\"WORKERFS\":WORKERFS}},init:function(input,output,error){FS.init.initialized=true;FS.ensureErrnoError();Module[\"stdin\"]=input||Module[\"stdin\"];Module[\"stdout\"]=output||Module[\"stdout\"];Module[\"stderr\"]=error||Module[\"stderr\"];FS.createStandardStreams()},quit:function(){FS.init.initialized=false;for(var i=0;i<FS.streams.length;i++){var stream=FS.streams[i];if(!stream){continue}FS.close(stream)}},getMode:function(canRead,canWrite){var mode=0;if(canRead)mode|=292|73;if(canWrite)mode|=146;return mode},findObject:function(path,dontResolveLastLink){var ret=FS.analyzePath(path,dontResolveLastLink);if(ret.exists){return ret.object}else{return null}},analyzePath:function(path,dontResolveLastLink){try{var lookup=FS.lookupPath(path,{follow:!dontResolveLastLink});path=lookup.path}catch(e){}var ret={isRoot:false,exists:false,error:0,name:null,path:null,object:null,parentExists:false,parentPath:null,parentObject:null};try{var lookup=FS.lookupPath(path,{parent:true});ret.parentExists=true;ret.parentPath=lookup.path;ret.parentObject=lookup.node;ret.name=PATH.basename(path);lookup=FS.lookupPath(path,{follow:!dontResolveLastLink});ret.exists=true;ret.path=lookup.path;ret.object=lookup.node;ret.name=lookup.node.name;ret.isRoot=lookup.path===\"/\"}catch(e){ret.error=e.errno}return ret},createPath:function(parent,path,canRead,canWrite){parent=typeof parent===\"string\"?parent:FS.getPath(parent);var parts=path.split(\"/\").reverse();while(parts.length){var part=parts.pop();if(!part)continue;var current=PATH.join2(parent,part);try{FS.mkdir(current)}catch(e){}parent=current}return current},createFile:function(parent,name,properties,canRead,canWrite){var path=PATH.join2(typeof parent===\"string\"?parent:FS.getPath(parent),name);var mode=FS.getMode(canRead,canWrite);return FS.create(path,mode)},createDataFile:function(parent,name,data,canRead,canWrite,canOwn){var path=name?PATH.join2(typeof parent===\"string\"?parent:FS.getPath(parent),name):parent;var mode=FS.getMode(canRead,canWrite);var node=FS.create(path,mode);if(data){if(typeof data===\"string\"){var arr=new Array(data.length);for(var i=0,len=data.length;i<len;++i)arr[i]=data.charCodeAt(i);data=arr}FS.chmod(node,mode|146);var stream=FS.open(node,577);FS.write(stream,data,0,data.length,0,canOwn);FS.close(stream);FS.chmod(node,mode)}return node},createDevice:function(parent,name,input,output){var path=PATH.join2(typeof parent===\"string\"?parent:FS.getPath(parent),name);var mode=FS.getMode(!!input,!!output);if(!FS.createDevice.major)FS.createDevice.major=64;var dev=FS.makedev(FS.createDevice.major++,0);FS.registerDevice(dev,{open:function(stream){stream.seekable=false},close:function(stream){if(output&&output.buffer&&output.buffer.length){output(10)}},read:function(stream,buffer,offset,length,pos){var bytesRead=0;for(var i=0;i<length;i++){var result;try{result=input()}catch(e){throw new FS.ErrnoError(29)}if(result===undefined&&bytesRead===0){throw new FS.ErrnoError(6)}if(result===null||result===undefined)break;bytesRead++;buffer[offset+i]=result}if(bytesRead){stream.node.timestamp=Date.now()}return bytesRead},write:function(stream,buffer,offset,length,pos){for(var i=0;i<length;i++){try{output(buffer[offset+i])}catch(e){throw new FS.ErrnoError(29)}}if(length){stream.node.timestamp=Date.now()}return i}});return FS.mkdev(path,mode,dev)},forceLoadFile:function(obj){if(obj.isDevice||obj.isFolder||obj.link||obj.contents)return true;if(typeof XMLHttpRequest!==\"undefined\"){throw new Error(\"Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.\")}else if(read_){try{obj.contents=intArrayFromString(read_(obj.url),true);obj.usedBytes=obj.contents.length}catch(e){throw new FS.ErrnoError(29)}}else{throw new Error(\"Cannot load without read() or XMLHttpRequest.\")}},createLazyFile:function(parent,name,url,canRead,canWrite){function LazyUint8Array(){this.lengthKnown=false;this.chunks=[]}LazyUint8Array.prototype.get=function LazyUint8Array_get(idx){if(idx>this.length-1||idx<0){return undefined}var chunkOffset=idx%this.chunkSize;var chunkNum=idx/this.chunkSize|0;return this.getter(chunkNum)[chunkOffset]};LazyUint8Array.prototype.setDataGetter=function LazyUint8Array_setDataGetter(getter){this.getter=getter};LazyUint8Array.prototype.cacheLength=function LazyUint8Array_cacheLength(){var xhr=new XMLHttpRequest;xhr.open(\"HEAD\",url,false);xhr.send(null);if(!(xhr.status>=200&&xhr.status<300||xhr.status===304))throw new Error(\"Couldn't load \"+url+\". Status: \"+xhr.status);var datalength=Number(xhr.getResponseHeader(\"Content-length\"));var header;var hasByteServing=(header=xhr.getResponseHeader(\"Accept-Ranges\"))&&header===\"bytes\";var usesGzip=(header=xhr.getResponseHeader(\"Content-Encoding\"))&&header===\"gzip\";var chunkSize=1024*1024;if(!hasByteServing)chunkSize=datalength;var doXHR=function(from,to){if(from>to)throw new Error(\"invalid range (\"+from+\", \"+to+\") or no bytes requested!\");if(to>datalength-1)throw new Error(\"only \"+datalength+\" bytes available! programmer error!\");var xhr=new XMLHttpRequest;xhr.open(\"GET\",url,false);if(datalength!==chunkSize)xhr.setRequestHeader(\"Range\",\"bytes=\"+from+\"-\"+to);if(typeof Uint8Array!=\"undefined\")xhr.responseType=\"arraybuffer\";if(xhr.overrideMimeType){xhr.overrideMimeType(\"text/plain; charset=x-user-defined\")}xhr.send(null);if(!(xhr.status>=200&&xhr.status<300||xhr.status===304))throw new Error(\"Couldn't load \"+url+\". Status: \"+xhr.status);if(xhr.response!==undefined){return new Uint8Array(xhr.response||[])}else{return intArrayFromString(xhr.responseText||\"\",true)}};var lazyArray=this;lazyArray.setDataGetter(function(chunkNum){var start=chunkNum*chunkSize;var end=(chunkNum+1)*chunkSize-1;end=Math.min(end,datalength-1);if(typeof lazyArray.chunks[chunkNum]===\"undefined\"){lazyArray.chunks[chunkNum]=doXHR(start,end)}if(typeof lazyArray.chunks[chunkNum]===\"undefined\")throw new Error(\"doXHR failed!\");return lazyArray.chunks[chunkNum]});if(usesGzip||!datalength){chunkSize=datalength=1;datalength=this.getter(0).length;chunkSize=datalength;out(\"LazyFiles on gzip forces download of the whole file when length is accessed\")}this._length=datalength;this._chunkSize=chunkSize;this.lengthKnown=true};if(typeof XMLHttpRequest!==\"undefined\"){if(!ENVIRONMENT_IS_WORKER)throw\"Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc\";var lazyArray=new LazyUint8Array;Object.defineProperties(lazyArray,{length:{get:function(){if(!this.lengthKnown){this.cacheLength()}return this._length}},chunkSize:{get:function(){if(!this.lengthKnown){this.cacheLength()}return this._chunkSize}}});var properties={isDevice:false,contents:lazyArray}}else{var properties={isDevice:false,url:url}}var node=FS.createFile(parent,name,properties,canRead,canWrite);if(properties.contents){node.contents=properties.contents}else if(properties.url){node.contents=null;node.url=properties.url}Object.defineProperties(node,{usedBytes:{get:function(){return this.contents.length}}});var stream_ops={};var keys=Object.keys(node.stream_ops);keys.forEach(function(key){var fn=node.stream_ops[key];stream_ops[key]=function forceLoadLazyFile(){FS.forceLoadFile(node);return fn.apply(null,arguments)}});stream_ops.read=function stream_ops_read(stream,buffer,offset,length,position){FS.forceLoadFile(node);var contents=stream.node.contents;if(position>=contents.length)return 0;var size=Math.min(contents.length-position,length);if(contents.slice){for(var i=0;i<size;i++){buffer[offset+i]=contents[position+i]}}else{for(var i=0;i<size;i++){buffer[offset+i]=contents.get(position+i)}}return size};node.stream_ops=stream_ops;return node},createPreloadedFile:function(parent,name,url,canRead,canWrite,onload,onerror,dontCreateFile,canOwn,preFinish){Browser.init();var fullname=name?PATH_FS.resolve(PATH.join2(parent,name)):parent;var dep=getUniqueRunDependency(\"cp \"+fullname);function processData(byteArray){function finish(byteArray){if(preFinish)preFinish();if(!dontCreateFile){FS.createDataFile(parent,name,byteArray,canRead,canWrite,canOwn)}if(onload)onload();removeRunDependency(dep)}var handled=false;Module[\"preloadPlugins\"].forEach(function(plugin){if(handled)return;if(plugin[\"canHandle\"](fullname)){plugin[\"handle\"](byteArray,fullname,finish,function(){if(onerror)onerror();removeRunDependency(dep)});handled=true}});if(!handled)finish(byteArray)}addRunDependency(dep);if(typeof url==\"string\"){asyncLoad(url,function(byteArray){processData(byteArray)},onerror)}else{processData(url)}},indexedDB:function(){return window.indexedDB||window.mozIndexedDB||window.webkitIndexedDB||window.msIndexedDB},DB_NAME:function(){return\"EM_FS_\"+window.location.pathname},DB_VERSION:20,DB_STORE_NAME:\"FILE_DATA\",saveFilesToDB:function(paths,onload,onerror){onload=onload||function(){};onerror=onerror||function(){};var indexedDB=FS.indexedDB();try{var openRequest=indexedDB.open(FS.DB_NAME(),FS.DB_VERSION)}catch(e){return onerror(e)}openRequest.onupgradeneeded=function openRequest_onupgradeneeded(){out(\"creating db\");var db=openRequest.result;db.createObjectStore(FS.DB_STORE_NAME)};openRequest.onsuccess=function openRequest_onsuccess(){var db=openRequest.result;var transaction=db.transaction([FS.DB_STORE_NAME],\"readwrite\");var files=transaction.objectStore(FS.DB_STORE_NAME);var ok=0,fail=0,total=paths.length;function finish(){if(fail==0)onload();else onerror()}paths.forEach(function(path){var putRequest=files.put(FS.analyzePath(path).object.contents,path);putRequest.onsuccess=function putRequest_onsuccess(){ok++;if(ok+fail==total)finish()};putRequest.onerror=function putRequest_onerror(){fail++;if(ok+fail==total)finish()}});transaction.onerror=onerror};openRequest.onerror=onerror},loadFilesFromDB:function(paths,onload,onerror){onload=onload||function(){};onerror=onerror||function(){};var indexedDB=FS.indexedDB();try{var openRequest=indexedDB.open(FS.DB_NAME(),FS.DB_VERSION)}catch(e){return onerror(e)}openRequest.onupgradeneeded=onerror;openRequest.onsuccess=function openRequest_onsuccess(){var db=openRequest.result;try{var transaction=db.transaction([FS.DB_STORE_NAME],\"readonly\")}catch(e){onerror(e);return}var files=transaction.objectStore(FS.DB_STORE_NAME);var ok=0,fail=0,total=paths.length;function finish(){if(fail==0)onload();else onerror()}paths.forEach(function(path){var getRequest=files.get(path);getRequest.onsuccess=function getRequest_onsuccess(){if(FS.analyzePath(path).exists){FS.unlink(path)}FS.createDataFile(PATH.dirname(path),PATH.basename(path),getRequest.result,true,true,true);ok++;if(ok+fail==total)finish()};getRequest.onerror=function getRequest_onerror(){fail++;if(ok+fail==total)finish()}});transaction.onerror=onerror};openRequest.onerror=onerror}};var SYSCALLS={mappings:{},DEFAULT_POLLMASK:5,calculateAt:function(dirfd,path,allowEmpty){if(path[0]===\"/\"){return path}var dir;if(dirfd===-100){dir=FS.cwd()}else{var dirstream=FS.getStream(dirfd);if(!dirstream)throw new FS.ErrnoError(8);dir=dirstream.path}if(path.length==0){if(!allowEmpty){throw new FS.ErrnoError(44)}return dir}return PATH.join2(dir,path)},doStat:function(func,path,buf){try{var stat=func(path)}catch(e){if(e&&e.node&&PATH.normalize(path)!==PATH.normalize(FS.getPath(e.node))){return-54}throw e}HEAP32[buf>>2]=stat.dev;HEAP32[buf+4>>2]=0;HEAP32[buf+8>>2]=stat.ino;HEAP32[buf+12>>2]=stat.mode;HEAP32[buf+16>>2]=stat.nlink;HEAP32[buf+20>>2]=stat.uid;HEAP32[buf+24>>2]=stat.gid;HEAP32[buf+28>>2]=stat.rdev;HEAP32[buf+32>>2]=0;tempI64=[stat.size>>>0,(tempDouble=stat.size,+Math.abs(tempDouble)>=1?tempDouble>0?(Math.min(+Math.floor(tempDouble/4294967296),4294967295)|0)>>>0:~~+Math.ceil((tempDouble-+(~~tempDouble>>>0))/4294967296)>>>0:0)],HEAP32[buf+40>>2]=tempI64[0],HEAP32[buf+44>>2]=tempI64[1];HEAP32[buf+48>>2]=4096;HEAP32[buf+52>>2]=stat.blocks;HEAP32[buf+56>>2]=stat.atime.getTime()/1e3|0;HEAP32[buf+60>>2]=0;HEAP32[buf+64>>2]=stat.mtime.getTime()/1e3|0;HEAP32[buf+68>>2]=0;HEAP32[buf+72>>2]=stat.ctime.getTime()/1e3|0;HEAP32[buf+76>>2]=0;tempI64=[stat.ino>>>0,(tempDouble=stat.ino,+Math.abs(tempDouble)>=1?tempDouble>0?(Math.min(+Math.floor(tempDouble/4294967296),4294967295)|0)>>>0:~~+Math.ceil((tempDouble-+(~~tempDouble>>>0))/4294967296)>>>0:0)],HEAP32[buf+80>>2]=tempI64[0],HEAP32[buf+84>>2]=tempI64[1];return 0},doMsync:function(addr,stream,len,flags,offset){var buffer=HEAPU8.slice(addr,addr+len);FS.msync(stream,buffer,offset,len,flags)},doMkdir:function(path,mode){path=PATH.normalize(path);if(path[path.length-1]===\"/\")path=path.substr(0,path.length-1);FS.mkdir(path,mode,0);return 0},doMknod:function(path,mode,dev){switch(mode&61440){case 32768:case 8192:case 24576:case 4096:case 49152:break;default:return-28}FS.mknod(path,mode,dev);return 0},doReadlink:function(path,buf,bufsize){if(bufsize<=0)return-28;var ret=FS.readlink(path);var len=Math.min(bufsize,lengthBytesUTF8(ret));var endChar=HEAP8[buf+len];stringToUTF8(ret,buf,bufsize+1);HEAP8[buf+len]=endChar;return len},doAccess:function(path,amode){if(amode&~7){return-28}var lookup=FS.lookupPath(path,{follow:true});var node=lookup.node;if(!node){return-44}var perms=\"\";if(amode&4)perms+=\"r\";if(amode&2)perms+=\"w\";if(amode&1)perms+=\"x\";if(perms&&FS.nodePermissions(node,perms)){return-2}return 0},doDup:function(path,flags,suggestFD){var suggest=FS.getStream(suggestFD);if(suggest)FS.close(suggest);return FS.open(path,flags,0,suggestFD,suggestFD).fd},doReadv:function(stream,iov,iovcnt,offset){var ret=0;for(var i=0;i<iovcnt;i++){var ptr=HEAP32[iov+i*8>>2];var len=HEAP32[iov+(i*8+4)>>2];var curr=FS.read(stream,HEAP8,ptr,len,offset);if(curr<0)return-1;ret+=curr;if(curr<len)break}return ret},doWritev:function(stream,iov,iovcnt,offset){var ret=0;for(var i=0;i<iovcnt;i++){var ptr=HEAP32[iov+i*8>>2];var len=HEAP32[iov+(i*8+4)>>2];var curr=FS.write(stream,HEAP8,ptr,len,offset);if(curr<0)return-1;ret+=curr}return ret},varargs:undefined,get:function(){SYSCALLS.varargs+=4;var ret=HEAP32[SYSCALLS.varargs-4>>2];return ret},getStr:function(ptr){var ret=UTF8ToString(ptr);return ret},getStreamFromFD:function(fd){var stream=FS.getStream(fd);if(!stream)throw new FS.ErrnoError(8);return stream},get64:function(low,high){return low}};function ___syscall__newselect(nfds,readfds,writefds,exceptfds,timeout){try{var total=0;var srcReadLow=readfds?HEAP32[readfds>>2]:0,srcReadHigh=readfds?HEAP32[readfds+4>>2]:0;var srcWriteLow=writefds?HEAP32[writefds>>2]:0,srcWriteHigh=writefds?HEAP32[writefds+4>>2]:0;var srcExceptLow=exceptfds?HEAP32[exceptfds>>2]:0,srcExceptHigh=exceptfds?HEAP32[exceptfds+4>>2]:0;var dstReadLow=0,dstReadHigh=0;var dstWriteLow=0,dstWriteHigh=0;var dstExceptLow=0,dstExceptHigh=0;var allLow=(readfds?HEAP32[readfds>>2]:0)|(writefds?HEAP32[writefds>>2]:0)|(exceptfds?HEAP32[exceptfds>>2]:0);var allHigh=(readfds?HEAP32[readfds+4>>2]:0)|(writefds?HEAP32[writefds+4>>2]:0)|(exceptfds?HEAP32[exceptfds+4>>2]:0);var check=function(fd,low,high,val){return fd<32?low&val:high&val};for(var fd=0;fd<nfds;fd++){var mask=1<<fd%32;if(!check(fd,allLow,allHigh,mask)){continue}var stream=FS.getStream(fd);if(!stream)throw new FS.ErrnoError(8);var flags=SYSCALLS.DEFAULT_POLLMASK;if(stream.stream_ops.poll){flags=stream.stream_ops.poll(stream)}if(flags&1&&check(fd,srcReadLow,srcReadHigh,mask)){fd<32?dstReadLow=dstReadLow|mask:dstReadHigh=dstReadHigh|mask;total++}if(flags&4&&check(fd,srcWriteLow,srcWriteHigh,mask)){fd<32?dstWriteLow=dstWriteLow|mask:dstWriteHigh=dstWriteHigh|mask;total++}if(flags&2&&check(fd,srcExceptLow,srcExceptHigh,mask)){fd<32?dstExceptLow=dstExceptLow|mask:dstExceptHigh=dstExceptHigh|mask;total++}}if(readfds){HEAP32[readfds>>2]=dstReadLow;HEAP32[readfds+4>>2]=dstReadHigh}if(writefds){HEAP32[writefds>>2]=dstWriteLow;HEAP32[writefds+4>>2]=dstWriteHigh}if(exceptfds){HEAP32[exceptfds>>2]=dstExceptLow;HEAP32[exceptfds+4>>2]=dstExceptHigh}return total}catch(e){if(typeof FS===\"undefined\"||!(e instanceof FS.ErrnoError))throw e;return-e.errno}}function ___syscall_access(path,amode){try{path=SYSCALLS.getStr(path);return SYSCALLS.doAccess(path,amode)}catch(e){if(typeof FS===\"undefined\"||!(e instanceof FS.ErrnoError))throw e;return-e.errno}}function ___syscall_chmod(path,mode){try{path=SYSCALLS.getStr(path);FS.chmod(path,mode);return 0}catch(e){if(typeof FS===\"undefined\"||!(e instanceof FS.ErrnoError))throw e;return-e.errno}}function ___syscall_chown32(path,owner,group){try{path=SYSCALLS.getStr(path);FS.chown(path,owner,group);return 0}catch(e){if(typeof FS===\"undefined\"||!(e instanceof FS.ErrnoError))throw e;return-e.errno}}var SOCKFS={mount:function(mount){Module[\"websocket\"]=Module[\"websocket\"]&&\"object\"===typeof Module[\"websocket\"]?Module[\"websocket\"]:{};Module[\"websocket\"]._callbacks={};Module[\"websocket\"][\"on\"]=function(event,callback){if(\"function\"===typeof callback){this._callbacks[event]=callback}return this};Module[\"websocket\"].emit=function(event,param){if(\"function\"===typeof this._callbacks[event]){this._callbacks[event].call(this,param)}};return FS.createNode(null,\"/\",16384|511,0)},createSocket:function(family,type,protocol){type&=~526336;var streaming=type==1;if(protocol){assert(streaming==(protocol==6))}var sock={family:family,type:type,protocol:protocol,server:null,error:null,peers:{},pending:[],recv_queue:[],sock_ops:SOCKFS.websocket_sock_ops};var name=SOCKFS.nextname();var node=FS.createNode(SOCKFS.root,name,49152,0);node.sock=sock;var stream=FS.createStream({path:name,node:node,flags:2,seekable:false,stream_ops:SOCKFS.stream_ops});sock.stream=stream;return sock},getSocket:function(fd){var stream=FS.getStream(fd);if(!stream||!FS.isSocket(stream.node.mode)){return null}return stream.node.sock},stream_ops:{poll:function(stream){var sock=stream.node.sock;return sock.sock_ops.poll(sock)},ioctl:function(stream,request,varargs){var sock=stream.node.sock;return sock.sock_ops.ioctl(sock,request,varargs)},read:function(stream,buffer,offset,length,position){var sock=stream.node.sock;var msg=sock.sock_ops.recvmsg(sock,length);if(!msg){return 0}buffer.set(msg.buffer,offset);return msg.buffer.length},write:function(stream,buffer,offset,length,position){var sock=stream.node.sock;return sock.sock_ops.sendmsg(sock,buffer,offset,length)},close:function(stream){var sock=stream.node.sock;sock.sock_ops.close(sock)}},nextname:function(){if(!SOCKFS.nextname.current){SOCKFS.nextname.current=0}return\"socket[\"+SOCKFS.nextname.current+++\"]\"},websocket_sock_ops:{createPeer:function(sock,addr,port){var ws;if(typeof addr===\"object\"){ws=addr;addr=null;port=null}if(ws){if(ws._socket){addr=ws._socket.remoteAddress;port=ws._socket.remotePort}else{var result=/ws[s]?:\\/\\/([^:]+):(\\d+)/.exec(ws.url);if(!result){throw new Error(\"WebSocket URL must be in the format ws(s)://address:port\")}addr=result[1];port=parseInt(result[2],10)}}else{try{var runtimeConfig=Module[\"websocket\"]&&\"object\"===typeof Module[\"websocket\"];var url=\"wss:#\".replace(\"#\",\"//\");if(runtimeConfig){if(\"string\"===typeof Module[\"websocket\"][\"url\"]){url=Module[\"websocket\"][\"url\"]}}if(url===\"ws://\"||url===\"wss://\"){var parts=addr.split(\"/\");url=url+parts[0]+\":\"+port+\"/\"+parts.slice(1).join(\"/\")}var subProtocols=\"binary\";if(runtimeConfig){if(\"string\"===typeof Module[\"websocket\"][\"subprotocol\"]){subProtocols=Module[\"websocket\"][\"subprotocol\"]}}var opts=undefined;if(subProtocols!==\"null\"){subProtocols=subProtocols.replace(/^ +| +$/g,\"\").split(/ *, */);opts=ENVIRONMENT_IS_NODE?{\"protocol\":subProtocols.toString()}:subProtocols}if(runtimeConfig&&null===Module[\"websocket\"][\"subprotocol\"]){subProtocols=\"null\";opts=undefined}var WebSocketConstructor;if(ENVIRONMENT_IS_NODE){WebSocketConstructor=__webpack_require__(10)}else{WebSocketConstructor=WebSocket}ws=new WebSocketConstructor(url,opts);ws.binaryType=\"arraybuffer\"}catch(e){throw new FS.ErrnoError(23)}}var peer={addr:addr,port:port,socket:ws,dgram_send_queue:[]};SOCKFS.websocket_sock_ops.addPeer(sock,peer);SOCKFS.websocket_sock_ops.handlePeerEvents(sock,peer);if(sock.type===2&&typeof sock.sport!==\"undefined\"){peer.dgram_send_queue.push(new Uint8Array([255,255,255,255,\"p\".charCodeAt(0),\"o\".charCodeAt(0),\"r\".charCodeAt(0),\"t\".charCodeAt(0),(sock.sport&65280)>>8,sock.sport&255]))}return peer},getPeer:function(sock,addr,port){return sock.peers[addr+\":\"+port]},addPeer:function(sock,peer){sock.peers[peer.addr+\":\"+peer.port]=peer},removePeer:function(sock,peer){delete sock.peers[peer.addr+\":\"+peer.port]},handlePeerEvents:function(sock,peer){var first=true;var handleOpen=function(){Module[\"websocket\"].emit(\"open\",sock.stream.fd);try{var queued=peer.dgram_send_queue.shift();while(queued){peer.socket.send(queued);queued=peer.dgram_send_queue.shift()}}catch(e){peer.socket.close()}};function handleMessage(data){if(typeof data===\"string\"){var encoder=new TextEncoder;data=encoder.encode(data)}else{assert(data.byteLength!==undefined);if(data.byteLength==0){return}else{data=new Uint8Array(data)}}var wasfirst=first;first=false;if(wasfirst&&data.length===10&&data[0]===255&&data[1]===255&&data[2]===255&&data[3]===255&&data[4]===\"p\".charCodeAt(0)&&data[5]===\"o\".charCodeAt(0)&&data[6]===\"r\".charCodeAt(0)&&data[7]===\"t\".charCodeAt(0)){var newport=data[8]<<8|data[9];SOCKFS.websocket_sock_ops.removePeer(sock,peer);peer.port=newport;SOCKFS.websocket_sock_ops.addPeer(sock,peer);return}sock.recv_queue.push({addr:peer.addr,port:peer.port,data:data});Module[\"websocket\"].emit(\"message\",sock.stream.fd)}if(ENVIRONMENT_IS_NODE){peer.socket.on(\"open\",handleOpen);peer.socket.on(\"message\",function(data,flags){if(!flags.binary){return}handleMessage(new Uint8Array(data).buffer)});peer.socket.on(\"close\",function(){Module[\"websocket\"].emit(\"close\",sock.stream.fd)});peer.socket.on(\"error\",function(error){sock.error=14;Module[\"websocket\"].emit(\"error\",[sock.stream.fd,sock.error,\"ECONNREFUSED: Connection refused\"])})}else{peer.socket.onopen=handleOpen;peer.socket.onclose=function(){Module[\"websocket\"].emit(\"close\",sock.stream.fd)};peer.socket.onmessage=function peer_socket_onmessage(event){handleMessage(event.data)};peer.socket.onerror=function(error){sock.error=14;Module[\"websocket\"].emit(\"error\",[sock.stream.fd,sock.error,\"ECONNREFUSED: Connection refused\"])}}},poll:function(sock){if(sock.type===1&&sock.server){return sock.pending.length?64|1:0}var mask=0;var dest=sock.type===1?SOCKFS.websocket_sock_ops.getPeer(sock,sock.daddr,sock.dport):null;if(sock.recv_queue.length||!dest||dest&&dest.socket.readyState===dest.socket.CLOSING||dest&&dest.socket.readyState===dest.socket.CLOSED){mask|=64|1}if(!dest||dest&&dest.socket.readyState===dest.socket.OPEN){mask|=4}if(dest&&dest.socket.readyState===dest.socket.CLOSING||dest&&dest.socket.readyState===dest.socket.CLOSED){mask|=16}return mask},ioctl:function(sock,request,arg){switch(request){case 21531:var bytes=0;if(sock.recv_queue.length){bytes=sock.recv_queue[0].data.length}HEAP32[arg>>2]=bytes;return 0;default:return 28}},close:function(sock){if(sock.server){try{sock.server.close()}catch(e){}sock.server=null}var peers=Object.keys(sock.peers);for(var i=0;i<peers.length;i++){var peer=sock.peers[peers[i]];try{peer.socket.close()}catch(e){}SOCKFS.websocket_sock_ops.removePeer(sock,peer)}return 0},bind:function(sock,addr,port){if(typeof sock.saddr!==\"undefined\"||typeof sock.sport!==\"undefined\"){throw new FS.ErrnoError(28)}sock.saddr=addr;sock.sport=port;if(sock.type===2){if(sock.server){sock.server.close();sock.server=null}try{sock.sock_ops.listen(sock,0)}catch(e){if(!(e instanceof FS.ErrnoError))throw e;if(e.errno!==138)throw e}}},connect:function(sock,addr,port){if(sock.server){throw new FS.ErrnoError(138)}if(typeof sock.daddr!==\"undefined\"&&typeof sock.dport!==\"undefined\"){var dest=SOCKFS.websocket_sock_ops.getPeer(sock,sock.daddr,sock.dport);if(dest){if(dest.socket.readyState===dest.socket.CONNECTING){throw new FS.ErrnoError(7)}else{throw new FS.ErrnoError(30)}}}var peer=SOCKFS.websocket_sock_ops.createPeer(sock,addr,port);sock.daddr=peer.addr;sock.dport=peer.port;throw new FS.ErrnoError(26)},listen:function(sock,backlog){if(!ENVIRONMENT_IS_NODE){throw new FS.ErrnoError(138)}if(sock.server){throw new FS.ErrnoError(28)}var WebSocketServer=__webpack_require__(10).Server;var host=sock.saddr;sock.server=new WebSocketServer({host:host,port:sock.sport});Module[\"websocket\"].emit(\"listen\",sock.stream.fd);sock.server.on(\"connection\",function(ws){if(sock.type===1){var newsock=SOCKFS.createSocket(sock.family,sock.type,sock.protocol);var peer=SOCKFS.websocket_sock_ops.createPeer(newsock,ws);newsock.daddr=peer.addr;newsock.dport=peer.port;sock.pending.push(newsock);Module[\"websocket\"].emit(\"connection\",newsock.stream.fd)}else{SOCKFS.websocket_sock_ops.createPeer(sock,ws);Module[\"websocket\"].emit(\"connection\",sock.stream.fd)}});sock.server.on(\"closed\",function(){Module[\"websocket\"].emit(\"close\",sock.stream.fd);sock.server=null});sock.server.on(\"error\",function(error){sock.error=23;Module[\"websocket\"].emit(\"error\",[sock.stream.fd,sock.error,\"EHOSTUNREACH: Host is unreachable\"])})},accept:function(listensock){if(!listensock.server){throw new FS.ErrnoError(28)}var newsock=listensock.pending.shift();newsock.stream.flags=listensock.stream.flags;return newsock},getname:function(sock,peer){var addr,port;if(peer){if(sock.daddr===undefined||sock.dport===undefined){throw new FS.ErrnoError(53)}addr=sock.daddr;port=sock.dport}else{addr=sock.saddr||0;port=sock.sport||0}return{addr:addr,port:port}},sendmsg:function(sock,buffer,offset,length,addr,port){if(sock.type===2){if(addr===undefined||port===undefined){addr=sock.daddr;port=sock.dport}if(addr===undefined||port===undefined){throw new FS.ErrnoError(17)}}else{addr=sock.daddr;port=sock.dport}var dest=SOCKFS.websocket_sock_ops.getPeer(sock,addr,port);if(sock.type===1){if(!dest||dest.socket.readyState===dest.socket.CLOSING||dest.socket.readyState===dest.socket.CLOSED){throw new FS.ErrnoError(53)}else if(dest.socket.readyState===dest.socket.CONNECTING){throw new FS.ErrnoError(6)}}if(ArrayBuffer.isView(buffer)){offset+=buffer.byteOffset;buffer=buffer.buffer}var data;data=buffer.slice(offset,offset+length);if(sock.type===2){if(!dest||dest.socket.readyState!==dest.socket.OPEN){if(!dest||dest.socket.readyState===dest.socket.CLOSING||dest.socket.readyState===dest.socket.CLOSED){dest=SOCKFS.websocket_sock_ops.createPeer(sock,addr,port)}dest.dgram_send_queue.push(data);return length}}try{dest.socket.send(data);return length}catch(e){throw new FS.ErrnoError(28)}},recvmsg:function(sock,length){if(sock.type===1&&sock.server){throw new FS.ErrnoError(53)}var queued=sock.recv_queue.shift();if(!queued){if(sock.type===1){var dest=SOCKFS.websocket_sock_ops.getPeer(sock,sock.daddr,sock.dport);if(!dest){throw new FS.ErrnoError(53)}else if(dest.socket.readyState===dest.socket.CLOSING||dest.socket.readyState===dest.socket.CLOSED){return null}else{throw new FS.ErrnoError(6)}}else{throw new FS.ErrnoError(6)}}var queuedLength=queued.data.byteLength||queued.data.length;var queuedOffset=queued.data.byteOffset||0;var queuedBuffer=queued.data.buffer||queued.data;var bytesRead=Math.min(length,queuedLength);var res={buffer:new Uint8Array(queuedBuffer,queuedOffset,bytesRead),addr:queued.addr,port:queued.port};if(sock.type===1&&bytesRead<queuedLength){var bytesRemaining=queuedLength-bytesRead;queued.data=new Uint8Array(queuedBuffer,queuedOffset+bytesRead,bytesRemaining);sock.recv_queue.unshift(queued)}return res}}};function getSocketFromFD(fd){var socket=SOCKFS.getSocket(fd);if(!socket)throw new FS.ErrnoError(8);return socket}function inetNtop4(addr){return(addr&255)+\".\"+(addr>>8&255)+\".\"+(addr>>16&255)+\".\"+(addr>>24&255)}function inetNtop6(ints){var str=\"\";var word=0;var longest=0;var lastzero=0;var zstart=0;var len=0;var i=0;var parts=[ints[0]&65535,ints[0]>>16,ints[1]&65535,ints[1]>>16,ints[2]&65535,ints[2]>>16,ints[3]&65535,ints[3]>>16];var hasipv4=true;var v4part=\"\";for(i=0;i<5;i++){if(parts[i]!==0){hasipv4=false;break}}if(hasipv4){v4part=inetNtop4(parts[6]|parts[7]<<16);if(parts[5]===-1){str=\"::ffff:\";str+=v4part;return str}if(parts[5]===0){str=\"::\";if(v4part===\"0.0.0.0\")v4part=\"\";if(v4part===\"0.0.0.1\")v4part=\"1\";str+=v4part;return str}}for(word=0;word<8;word++){if(parts[word]===0){if(word-lastzero>1){len=0}lastzero=word;len++}if(len>longest){longest=len;zstart=word-longest+1}}for(word=0;word<8;word++){if(longest>1){if(parts[word]===0&&word>=zstart&&word<zstart+longest){if(word===zstart){str+=\":\";if(zstart===0)str+=\":\"}continue}}str+=Number(_ntohs(parts[word]&65535)).toString(16);str+=word<7?\":\":\"\"}return str}function readSockaddr(sa,salen){var family=HEAP16[sa>>1];var port=_ntohs(HEAPU16[sa+2>>1]);var addr;switch(family){case 2:if(salen!==16){return{errno:28}}addr=HEAP32[sa+4>>2];addr=inetNtop4(addr);break;case 10:if(salen!==28){return{errno:28}}addr=[HEAP32[sa+8>>2],HEAP32[sa+12>>2],HEAP32[sa+16>>2],HEAP32[sa+20>>2]];addr=inetNtop6(addr);break;default:return{errno:5}}return{family:family,addr:addr,port:port}}function inetPton4(str){var b=str.split(\".\");for(var i=0;i<4;i++){var tmp=Number(b[i]);if(isNaN(tmp))return null;b[i]=tmp}return(b[0]|b[1]<<8|b[2]<<16|b[3]<<24)>>>0}function jstoi_q(str){return parseInt(str)}function inetPton6(str){var words;var w,offset,z;var valid6regx=/^((?=.*::)(?!.*::.+::)(::)?([\\dA-F]{1,4}:(:|\\b)|){5}|([\\dA-F]{1,4}:){6})((([\\dA-F]{1,4}((?!\\3)::|:\\b|$))|(?!\\2\\3)){2}|(((2[0-4]|1\\d|[1-9])?\\d|25[0-5])\\.?\\b){4})$/i;var parts=[];if(!valid6regx.test(str)){return null}if(str===\"::\"){return[0,0,0,0,0,0,0,0]}if(str.startsWith(\"::\")){str=str.replace(\"::\",\"Z:\")}else{str=str.replace(\"::\",\":Z:\")}if(str.indexOf(\".\")>0){str=str.replace(new RegExp(\"[.]\",\"g\"),\":\");words=str.split(\":\");words[words.length-4]=jstoi_q(words[words.length-4])+jstoi_q(words[words.length-3])*256;words[words.length-3]=jstoi_q(words[words.length-2])+jstoi_q(words[words.length-1])*256;words=words.slice(0,words.length-2)}else{words=str.split(\":\")}offset=0;z=0;for(w=0;w<words.length;w++){if(typeof words[w]===\"string\"){if(words[w]===\"Z\"){for(z=0;z<8-words.length+1;z++){parts[w+z]=0}offset=z-1}else{parts[w+offset]=_htons(parseInt(words[w],16))}}else{parts[w+offset]=words[w]}}return[parts[1]<<16|parts[0],parts[3]<<16|parts[2],parts[5]<<16|parts[4],parts[7]<<16|parts[6]]}var DNS={address_map:{id:1,addrs:{},names:{}},lookup_name:function(name){var res=inetPton4(name);if(res!==null){return name}res=inetPton6(name);if(res!==null){return name}var addr;if(DNS.address_map.addrs[name]){addr=DNS.address_map.addrs[name]}else{var id=DNS.address_map.id++;assert(id<65535,\"exceeded max address mappings of 65535\");addr=\"172.29.\"+(id&255)+\".\"+(id&65280);DNS.address_map.names[addr]=name;DNS.address_map.addrs[name]=addr}return addr},lookup_addr:function(addr){if(DNS.address_map.names[addr]){return DNS.address_map.names[addr]}return null}};function getSocketAddress(addrp,addrlen,allowNull){if(allowNull&&addrp===0)return null;var info=readSockaddr(addrp,addrlen);if(info.errno)throw new FS.ErrnoError(info.errno);info.addr=DNS.lookup_addr(info.addr)||info.addr;return info}function ___syscall_connect(fd,addr,addrlen){try{var sock=getSocketFromFD(fd);var info=getSocketAddress(addr,addrlen);sock.sock_ops.connect(sock,info.addr,info.port);return 0}catch(e){if(typeof FS===\"undefined\"||!(e instanceof FS.ErrnoError))throw e;return-e.errno}}function ___syscall_dup3(fd,suggestFD,flags){try{var old=SYSCALLS.getStreamFromFD(fd);if(old.fd===suggestFD)return-28;return SYSCALLS.doDup(old.path,old.flags,suggestFD)}catch(e){if(typeof FS===\"undefined\"||!(e instanceof FS.ErrnoError))throw e;return-e.errno}}function ___syscall_fchmod(fd,mode){try{FS.fchmod(fd,mode);return 0}catch(e){if(typeof FS===\"undefined\"||!(e instanceof FS.ErrnoError))throw e;return-e.errno}}function ___syscall_fchown32(fd,owner,group){try{FS.fchown(fd,owner,group);return 0}catch(e){if(typeof FS===\"undefined\"||!(e instanceof FS.ErrnoError))throw e;return-e.errno}}function ___syscall_fcntl64(fd,cmd,varargs){SYSCALLS.varargs=varargs;try{var stream=SYSCALLS.getStreamFromFD(fd);switch(cmd){case 0:{var arg=SYSCALLS.get();if(arg<0){return-28}var newStream;newStream=FS.open(stream.path,stream.flags,0,arg);return newStream.fd}case 1:case 2:return 0;case 3:return stream.flags;case 4:{var arg=SYSCALLS.get();stream.flags|=arg;return 0}case 5:{var arg=SYSCALLS.get();var offset=0;HEAP16[arg+offset>>1]=2;return 0}case 6:case 7:return 0;case 16:case 8:return-28;case 9:setErrNo(28);return-1;default:{return-28}}}catch(e){if(typeof FS===\"undefined\"||!(e instanceof FS.ErrnoError))throw e;return-e.errno}}function ___syscall_fstat64(fd,buf){try{var stream=SYSCALLS.getStreamFromFD(fd);return SYSCALLS.doStat(FS.stat,stream.path,buf)}catch(e){if(typeof FS===\"undefined\"||!(e instanceof FS.ErrnoError))throw e;return-e.errno}}function ___syscall_fstatat64(dirfd,path,buf,flags){try{path=SYSCALLS.getStr(path);var nofollow=flags&256;var allowEmpty=flags&4096;flags=flags&~4352;path=SYSCALLS.calculateAt(dirfd,path,allowEmpty);return SYSCALLS.doStat(nofollow?FS.lstat:FS.stat,path,buf)}catch(e){if(typeof FS===\"undefined\"||!(e instanceof FS.ErrnoError))throw e;return-e.errno}}function ___syscall_ftruncate64(fd,low,high){try{var length=SYSCALLS.get64(low,high);FS.ftruncate(fd,length);return 0}catch(e){if(typeof FS===\"undefined\"||!(e instanceof FS.ErrnoError))throw e;return-e.errno}}function ___syscall_getcwd(buf,size){try{if(size===0)return-28;var cwd=FS.cwd();var cwdLengthInBytes=lengthBytesUTF8(cwd);if(size<cwdLengthInBytes+1)return-68;stringToUTF8(cwd,buf,size);return buf}catch(e){if(typeof FS===\"undefined\"||!(e instanceof FS.ErrnoError))throw e;return-e.errno}}function ___syscall_getdents64(fd,dirp,count){try{var stream=SYSCALLS.getStreamFromFD(fd);if(!stream.getdents){stream.getdents=FS.readdir(stream.path)}var struct_size=280;var pos=0;var off=FS.llseek(stream,0,1);var idx=Math.floor(off/struct_size);while(idx<stream.getdents.length&&pos+struct_size<=count){var id;var type;var name=stream.getdents[idx];if(name===\".\"){id=stream.id;type=4}else if(name===\"..\"){var lookup=FS.lookupPath(stream.path,{parent:true});id=lookup.node.id;type=4}else{var child=FS.lookupNode(stream,name);id=child.id;type=FS.isChrdev(child.mode)?2:FS.isDir(child.mode)?4:FS.isLink(child.mode)?10:8}tempI64=[id>>>0,(tempDouble=id,+Math.abs(tempDouble)>=1?tempDouble>0?(Math.min(+Math.floor(tempDouble/4294967296),4294967295)|0)>>>0:~~+Math.ceil((tempDouble-+(~~tempDouble>>>0))/4294967296)>>>0:0)],HEAP32[dirp+pos>>2]=tempI64[0],HEAP32[dirp+pos+4>>2]=tempI64[1];tempI64=[(idx+1)*struct_size>>>0,(tempDouble=(idx+1)*struct_size,+Math.abs(tempDouble)>=1?tempDouble>0?(Math.min(+Math.floor(tempDouble/4294967296),4294967295)|0)>>>0:~~+Math.ceil((tempDouble-+(~~tempDouble>>>0))/4294967296)>>>0:0)],HEAP32[dirp+pos+8>>2]=tempI64[0],HEAP32[dirp+pos+12>>2]=tempI64[1];HEAP16[dirp+pos+16>>1]=280;HEAP8[dirp+pos+18>>0]=type;stringToUTF8(name,dirp+pos+19,256);pos+=struct_size;idx+=1}FS.llseek(stream,idx*struct_size,0);return pos}catch(e){if(typeof FS===\"undefined\"||!(e instanceof FS.ErrnoError))throw e;return-e.errno}}function ___syscall_getegid32(){return 0}function ___syscall_geteuid32(){return ___syscall_getegid32()}function ___syscall_getgid32(){return ___syscall_getegid32()}function writeSockaddr(sa,family,addr,port,addrlen){switch(family){case 2:addr=inetPton4(addr);zeroMemory(sa,16);if(addrlen){HEAP32[addrlen>>2]=16}HEAP16[sa>>1]=family;HEAP32[sa+4>>2]=addr;HEAP16[sa+2>>1]=_htons(port);break;case 10:addr=inetPton6(addr);zeroMemory(sa,28);if(addrlen){HEAP32[addrlen>>2]=28}HEAP32[sa>>2]=family;HEAP32[sa+8>>2]=addr[0];HEAP32[sa+12>>2]=addr[1];HEAP32[sa+16>>2]=addr[2];HEAP32[sa+20>>2]=addr[3];HEAP16[sa+2>>1]=_htons(port);break;default:return 5}return 0}function ___syscall_getpeername(fd,addr,addrlen){try{var sock=getSocketFromFD(fd);if(!sock.daddr){return-53}var errno=writeSockaddr(addr,sock.family,DNS.lookup_name(sock.daddr),sock.dport,addrlen);return 0}catch(e){if(typeof FS===\"undefined\"||!(e instanceof FS.ErrnoError))throw e;return-e.errno}}function ___syscall_getsockname(fd,addr,addrlen){try{err(\"__syscall_getsockname \"+fd);var sock=getSocketFromFD(fd);var errno=writeSockaddr(addr,sock.family,DNS.lookup_name(sock.saddr||\"0.0.0.0\"),sock.sport,addrlen);return 0}catch(e){if(typeof FS===\"undefined\"||!(e instanceof FS.ErrnoError))throw e;return-e.errno}}function ___syscall_getsockopt(fd,level,optname,optval,optlen){try{var sock=getSocketFromFD(fd);if(level===1){if(optname===4){HEAP32[optval>>2]=sock.error;HEAP32[optlen>>2]=4;sock.error=null;return 0}}return-50}catch(e){if(typeof FS===\"undefined\"||!(e instanceof FS.ErrnoError))throw e;return-e.errno}}function ___syscall_getuid32(){return ___syscall_getegid32()}function ___syscall_ioctl(fd,op,varargs){SYSCALLS.varargs=varargs;try{var stream=SYSCALLS.getStreamFromFD(fd);switch(op){case 21509:case 21505:{if(!stream.tty)return-59;return 0}case 21510:case 21511:case 21512:case 21506:case 21507:case 21508:{if(!stream.tty)return-59;return 0}case 21519:{if(!stream.tty)return-59;var argp=SYSCALLS.get();HEAP32[argp>>2]=0;return 0}case 21520:{if(!stream.tty)return-59;return-28}case 21531:{var argp=SYSCALLS.get();return FS.ioctl(stream,op,argp)}case 21523:{if(!stream.tty)return-59;return 0}case 21524:{if(!stream.tty)return-59;return 0}default:abort(\"bad ioctl syscall \"+op)}}catch(e){if(typeof FS===\"undefined\"||!(e instanceof FS.ErrnoError))throw e;return-e.errno}}function ___syscall_lstat64(path,buf){try{path=SYSCALLS.getStr(path);return SYSCALLS.doStat(FS.lstat,path,buf)}catch(e){if(typeof FS===\"undefined\"||!(e instanceof FS.ErrnoError))throw e;return-e.errno}}function ___syscall_mkdir(path,mode){try{path=SYSCALLS.getStr(path);return SYSCALLS.doMkdir(path,mode)}catch(e){if(typeof FS===\"undefined\"||!(e instanceof FS.ErrnoError))throw e;return-e.errno}}function syscallMmap2(addr,len,prot,flags,fd,off){off<<=12;var ptr;var allocated=false;if((flags&16)!==0&&addr%65536!==0){return-28}if((flags&32)!==0){ptr=mmapAlloc(len);if(!ptr)return-48;allocated=true}else{var info=FS.getStream(fd);if(!info)return-8;var res=FS.mmap(info,addr,len,off,prot,flags);ptr=res.ptr;allocated=res.allocated}SYSCALLS.mappings[ptr]={malloc:ptr,len:len,allocated:allocated,fd:fd,prot:prot,flags:flags,offset:off};return ptr}function ___syscall_mmap2(addr,len,prot,flags,fd,off){try{return syscallMmap2(addr,len,prot,flags,fd,off)}catch(e){if(typeof FS===\"undefined\"||!(e instanceof FS.ErrnoError))throw e;return-e.errno}}function syscallMunmap(addr,len){var info=SYSCALLS.mappings[addr];if(len===0||!info){return-28}if(len===info.len){var stream=FS.getStream(info.fd);if(stream){if(info.prot&2){SYSCALLS.doMsync(addr,stream,len,info.flags,info.offset)}FS.munmap(stream)}SYSCALLS.mappings[addr]=null;if(info.allocated){_free(info.malloc)}}return 0}function ___syscall_munmap(addr,len){try{return syscallMunmap(addr,len)}catch(e){if(typeof FS===\"undefined\"||!(e instanceof FS.ErrnoError))throw e;return-e.errno}}function ___syscall_open(path,flags,varargs){SYSCALLS.varargs=varargs;try{var pathname=SYSCALLS.getStr(path);var mode=varargs?SYSCALLS.get():0;var stream=FS.open(pathname,flags,mode);return stream.fd}catch(e){if(typeof FS===\"undefined\"||!(e instanceof FS.ErrnoError))throw e;return-e.errno}}function ___syscall_poll(fds,nfds,timeout){try{var nonzero=0;for(var i=0;i<nfds;i++){var pollfd=fds+8*i;var fd=HEAP32[pollfd>>2];var events=HEAP16[pollfd+4>>1];var mask=32;var stream=FS.getStream(fd);if(stream){mask=SYSCALLS.DEFAULT_POLLMASK;if(stream.stream_ops.poll){mask=stream.stream_ops.poll(stream)}}mask&=events|8|16;if(mask)nonzero++;HEAP16[pollfd+6>>1]=mask}return nonzero}catch(e){if(typeof FS===\"undefined\"||!(e instanceof FS.ErrnoError))throw e;return-e.errno}}function ___syscall_readlink(path,buf,bufsize){try{path=SYSCALLS.getStr(path);return SYSCALLS.doReadlink(path,buf,bufsize)}catch(e){if(typeof FS===\"undefined\"||!(e instanceof FS.ErrnoError))throw e;return-e.errno}}function ___syscall_rename(old_path,new_path){try{old_path=SYSCALLS.getStr(old_path);new_path=SYSCALLS.getStr(new_path);FS.rename(old_path,new_path);return 0}catch(e){if(typeof FS===\"undefined\"||!(e instanceof FS.ErrnoError))throw e;return-e.errno}}function ___syscall_rmdir(path){try{path=SYSCALLS.getStr(path);FS.rmdir(path);return 0}catch(e){if(typeof FS===\"undefined\"||!(e instanceof FS.ErrnoError))throw e;return-e.errno}}function ___syscall_sendmsg(fd,message,flags){try{var sock=getSocketFromFD(fd);var iov=HEAP32[message+8>>2];var num=HEAP32[message+12>>2];var addr,port;var name=HEAP32[message>>2];var namelen=HEAP32[message+4>>2];if(name){var info=readSockaddr(name,namelen);if(info.errno)return-info.errno;port=info.port;addr=DNS.lookup_addr(info.addr)||info.addr}var total=0;for(var i=0;i<num;i++){total+=HEAP32[iov+(8*i+4)>>2]}var view=new Uint8Array(total);var offset=0;for(var i=0;i<num;i++){var iovbase=HEAP32[iov+(8*i+0)>>2];var iovlen=HEAP32[iov+(8*i+4)>>2];for(var j=0;j<iovlen;j++){view[offset++]=HEAP8[iovbase+j>>0]}}return sock.sock_ops.sendmsg(sock,view,0,total,addr,port)}catch(e){if(typeof FS===\"undefined\"||!(e instanceof FS.ErrnoError))throw e;return-e.errno}}function ___syscall_socket(domain,type,protocol){try{var sock=SOCKFS.createSocket(domain,type,protocol);return sock.stream.fd}catch(e){if(typeof FS===\"undefined\"||!(e instanceof FS.ErrnoError))throw e;return-e.errno}}function ___syscall_stat64(path,buf){try{path=SYSCALLS.getStr(path);return SYSCALLS.doStat(FS.stat,path,buf)}catch(e){if(typeof FS===\"undefined\"||!(e instanceof FS.ErrnoError))throw e;return-e.errno}}function ___syscall_unlink(path){try{path=SYSCALLS.getStr(path);FS.unlink(path);return 0}catch(e){if(typeof FS===\"undefined\"||!(e instanceof FS.ErrnoError))throw e;return-e.errno}}function __gmtime_js(time,tmPtr){var date=new Date(HEAP32[time>>2]*1e3);HEAP32[tmPtr>>2]=date.getUTCSeconds();HEAP32[tmPtr+4>>2]=date.getUTCMinutes();HEAP32[tmPtr+8>>2]=date.getUTCHours();HEAP32[tmPtr+12>>2]=date.getUTCDate();HEAP32[tmPtr+16>>2]=date.getUTCMonth();HEAP32[tmPtr+20>>2]=date.getUTCFullYear()-1900;HEAP32[tmPtr+24>>2]=date.getUTCDay();var start=Date.UTC(date.getUTCFullYear(),0,1,0,0,0,0);var yday=(date.getTime()-start)/(1e3*60*60*24)|0;HEAP32[tmPtr+28>>2]=yday}function _abort(){abort(\"\")}var readAsmConstArgsArray=[];function readAsmConstArgs(sigPtr,buf){readAsmConstArgsArray.length=0;var ch;buf>>=2;while(ch=HEAPU8[sigPtr++]){var readAsmConstArgsDouble=ch<105;if(readAsmConstArgsDouble&&buf&1)buf++;readAsmConstArgsArray.push(readAsmConstArgsDouble?HEAPF64[buf++>>1]:HEAP32[buf]);++buf}return readAsmConstArgsArray}function _emscripten_asm_const_int(code,sigPtr,argbuf){var args=readAsmConstArgs(sigPtr,argbuf);return ASM_CONSTS[code].apply(null,args)}function _emscripten_exit_with_live_runtime(){throw\"unwind\"}function _emscripten_get_heap_max(){return 2147483648}function reallyNegative(x){return x<0||x===0&&1/x===-Infinity}function convertI32PairToI53(lo,hi){return(lo>>>0)+hi*4294967296}function convertU32PairToI53(lo,hi){return(lo>>>0)+(hi>>>0)*4294967296}function reSign(value,bits){if(value<=0){return value}var half=bits<=32?Math.abs(1<<bits-1):Math.pow(2,bits-1);if(value>=half&&(bits<=32||value>half)){value=-2*half+value}return value}function unSign(value,bits){if(value>=0){return value}return bits<=32?2*Math.abs(1<<bits-1)+value:Math.pow(2,bits)+value}function formatString(format,varargs){var textIndex=format;var argIndex=varargs;function prepVararg(ptr,type){if(type===\"double\"||type===\"i64\"){if(ptr&7){ptr+=4}}else{}return ptr}function getNextArg(type){var ret;argIndex=prepVararg(argIndex,type);if(type===\"double\"){ret=Number(HEAPF64[argIndex>>3]);argIndex+=8}else if(type==\"i64\"){ret=[HEAP32[argIndex>>2],HEAP32[argIndex+4>>2]];argIndex+=8}else{type=\"i32\";ret=HEAP32[argIndex>>2];argIndex+=4}return ret}var ret=[];var curr,next,currArg;while(1){var startTextIndex=textIndex;curr=HEAP8[textIndex>>0];if(curr===0)break;next=HEAP8[textIndex+1>>0];if(curr==37){var flagAlwaysSigned=false;var flagLeftAlign=false;var flagAlternative=false;var flagZeroPad=false;var flagPadSign=false;flagsLoop:while(1){switch(next){case 43:flagAlwaysSigned=true;break;case 45:flagLeftAlign=true;break;case 35:flagAlternative=true;break;case 48:if(flagZeroPad){break flagsLoop}else{flagZeroPad=true;break}case 32:flagPadSign=true;break;default:break flagsLoop}textIndex++;next=HEAP8[textIndex+1>>0]}var width=0;if(next==42){width=getNextArg(\"i32\");textIndex++;next=HEAP8[textIndex+1>>0]}else{while(next>=48&&next<=57){width=width*10+(next-48);textIndex++;next=HEAP8[textIndex+1>>0]}}var precisionSet=false,precision=-1;if(next==46){precision=0;precisionSet=true;textIndex++;next=HEAP8[textIndex+1>>0];if(next==42){precision=getNextArg(\"i32\");textIndex++}else{while(1){var precisionChr=HEAP8[textIndex+1>>0];if(precisionChr<48||precisionChr>57)break;precision=precision*10+(precisionChr-48);textIndex++}}next=HEAP8[textIndex+1>>0]}if(precision<0){precision=6;precisionSet=false}var argSize;switch(String.fromCharCode(next)){case\"h\":var nextNext=HEAP8[textIndex+2>>0];if(nextNext==104){textIndex++;argSize=1}else{argSize=2}break;case\"l\":var nextNext=HEAP8[textIndex+2>>0];if(nextNext==108){textIndex++;argSize=8}else{argSize=4}break;case\"L\":case\"q\":case\"j\":argSize=8;break;case\"z\":case\"t\":case\"I\":argSize=4;break;default:argSize=null}if(argSize)textIndex++;next=HEAP8[textIndex+1>>0];switch(String.fromCharCode(next)){case\"d\":case\"i\":case\"u\":case\"o\":case\"x\":case\"X\":case\"p\":{var signed=next==100||next==105;argSize=argSize||4;currArg=getNextArg(\"i\"+argSize*8);var argText;if(argSize==8){currArg=next==117?convertU32PairToI53(currArg[0],currArg[1]):convertI32PairToI53(currArg[0],currArg[1])}if(argSize<=4){var limit=Math.pow(256,argSize)-1;currArg=(signed?reSign:unSign)(currArg&limit,argSize*8)}var currAbsArg=Math.abs(currArg);var prefix=\"\";if(next==100||next==105){argText=reSign(currArg,8*argSize,1).toString(10)}else if(next==117){argText=unSign(currArg,8*argSize,1).toString(10);currArg=Math.abs(currArg)}else if(next==111){argText=(flagAlternative?\"0\":\"\")+currAbsArg.toString(8)}else if(next==120||next==88){prefix=flagAlternative&&currArg!=0?\"0x\":\"\";if(currArg<0){currArg=-currArg;argText=(currAbsArg-1).toString(16);var buffer=[];for(var i=0;i<argText.length;i++){buffer.push((15-parseInt(argText[i],16)).toString(16))}argText=buffer.join(\"\");while(argText.length<argSize*2)argText=\"f\"+argText}else{argText=currAbsArg.toString(16)}if(next==88){prefix=prefix.toUpperCase();argText=argText.toUpperCase()}}else if(next==112){if(currAbsArg===0){argText=\"(nil)\"}else{prefix=\"0x\";argText=currAbsArg.toString(16)}}if(precisionSet){while(argText.length<precision){argText=\"0\"+argText}}if(currArg>=0){if(flagAlwaysSigned){prefix=\"+\"+prefix}else if(flagPadSign){prefix=\" \"+prefix}}if(argText.charAt(0)==\"-\"){prefix=\"-\"+prefix;argText=argText.substr(1)}while(prefix.length+argText.length<width){if(flagLeftAlign){argText+=\" \"}else{if(flagZeroPad){argText=\"0\"+argText}else{prefix=\" \"+prefix}}}argText=prefix+argText;argText.split(\"\").forEach(function(chr){ret.push(chr.charCodeAt(0))});break}case\"f\":case\"F\":case\"e\":case\"E\":case\"g\":case\"G\":{currArg=getNextArg(\"double\");var argText;if(isNaN(currArg)){argText=\"nan\";flagZeroPad=false}else if(!isFinite(currArg)){argText=(currArg<0?\"-\":\"\")+\"inf\";flagZeroPad=false}else{var isGeneral=false;var effectivePrecision=Math.min(precision,20);if(next==103||next==71){isGeneral=true;precision=precision||1;var exponent=parseInt(currArg.toExponential(effectivePrecision).split(\"e\")[1],10);if(precision>exponent&&exponent>=-4){next=(next==103?\"f\":\"F\").charCodeAt(0);precision-=exponent+1}else{next=(next==103?\"e\":\"E\").charCodeAt(0);precision--}effectivePrecision=Math.min(precision,20)}if(next==101||next==69){argText=currArg.toExponential(effectivePrecision);if(/[eE][-+]\\d$/.test(argText)){argText=argText.slice(0,-1)+\"0\"+argText.slice(-1)}}else if(next==102||next==70){argText=currArg.toFixed(effectivePrecision);if(currArg===0&&reallyNegative(currArg)){argText=\"-\"+argText}}var parts=argText.split(\"e\");if(isGeneral&&!flagAlternative){while(parts[0].length>1&&parts[0].includes(\".\")&&(parts[0].slice(-1)==\"0\"||parts[0].slice(-1)==\".\")){parts[0]=parts[0].slice(0,-1)}}else{if(flagAlternative&&argText.indexOf(\".\")==-1)parts[0]+=\".\";while(precision>effectivePrecision++)parts[0]+=\"0\"}argText=parts[0]+(parts.length>1?\"e\"+parts[1]:\"\");if(next==69)argText=argText.toUpperCase();if(currArg>=0){if(flagAlwaysSigned){argText=\"+\"+argText}else if(flagPadSign){argText=\" \"+argText}}}while(argText.length<width){if(flagLeftAlign){argText+=\" \"}else{if(flagZeroPad&&(argText[0]==\"-\"||argText[0]==\"+\")){argText=argText[0]+\"0\"+argText.slice(1)}else{argText=(flagZeroPad?\"0\":\" \")+argText}}}if(next<97)argText=argText.toUpperCase();argText.split(\"\").forEach(function(chr){ret.push(chr.charCodeAt(0))});break}case\"s\":{var arg=getNextArg(\"i8*\");var argLength=arg?_strlen(arg):\"(null)\".length;if(precisionSet)argLength=Math.min(argLength,precision);if(!flagLeftAlign){while(argLength<width--){ret.push(32)}}if(arg){for(var i=0;i<argLength;i++){ret.push(HEAPU8[arg++>>0])}}else{ret=ret.concat(intArrayFromString(\"(null)\".substr(0,argLength),true))}if(flagLeftAlign){while(argLength<width--){ret.push(32)}}break}case\"c\":{if(flagLeftAlign)ret.push(getNextArg(\"i8\"));while(--width>0){ret.push(32)}if(!flagLeftAlign)ret.push(getNextArg(\"i8\"));break}case\"n\":{var ptr=getNextArg(\"i32*\");HEAP32[ptr>>2]=ret.length;break}case\"%\":{ret.push(curr);break}default:{for(var i=startTextIndex;i<textIndex+2;i++){ret.push(HEAP8[i>>0])}}}textIndex+=2}else{ret.push(curr);textIndex+=1}}return ret}function traverseStack(args){if(!args||!args.callee||!args.callee.name){return[null,\"\",\"\"]}var funstr=args.callee.toString();var funcname=args.callee.name;var str=\"(\";var first=true;for(var i in args){var a=args[i];if(!first){str+=\", \"}first=false;if(typeof a===\"number\"||typeof a===\"string\"){str+=a}else{str+=\"(\"+typeof a+\")\"}}str+=\")\";var caller=args.callee.caller;args=caller?caller.arguments:[];if(first)str=\"\";return[args,funcname,str]}function _emscripten_get_callstack_js(flags){var callstack=jsStackTrace();var iThisFunc=callstack.lastIndexOf(\"_emscripten_log\");var iThisFunc2=callstack.lastIndexOf(\"_emscripten_get_callstack\");var iNextLine=callstack.indexOf(\"\\n\",Math.max(iThisFunc,iThisFunc2))+1;callstack=callstack.slice(iNextLine);if(flags&32){warnOnce(\"EM_LOG_DEMANGLE is deprecated; ignoring\")}if(flags&8&&typeof emscripten_source_map===\"undefined\"){warnOnce('Source map information is not available, emscripten_log with EM_LOG_C_STACK will be ignored. Build with \"--pre-js $EMSCRIPTEN/src/emscripten-source-map.min.js\" linker flag to add source map loading to code.');flags^=8;flags|=16}var stack_args=null;if(flags&128){stack_args=traverseStack(arguments);while(stack_args[1].includes(\"_emscripten_\"))stack_args=traverseStack(stack_args[0])}var lines=callstack.split(\"\\n\");callstack=\"\";var newFirefoxRe=new RegExp(\"\\\\s*(.*?)@(.*?):([0-9]+):([0-9]+)\");var firefoxRe=new RegExp(\"\\\\s*(.*?)@(.*):(.*)(:(.*))?\");var chromeRe=new RegExp(\"\\\\s*at (.*?) \\\\((.*):(.*):(.*)\\\\)\");for(var l in lines){var line=lines[l];var symbolName=\"\";var file=\"\";var lineno=0;var column=0;var parts=chromeRe.exec(line);if(parts&&parts.length==5){symbolName=parts[1];file=parts[2];lineno=parts[3];column=parts[4]}else{parts=newFirefoxRe.exec(line);if(!parts)parts=firefoxRe.exec(line);if(parts&&parts.length>=4){symbolName=parts[1];file=parts[2];lineno=parts[3];column=parts[4]|0}else{callstack+=line+\"\\n\";continue}}var haveSourceMap=false;if(flags&8){var orig=emscripten_source_map.originalPositionFor({line:lineno,column:column});haveSourceMap=orig&&orig.source;if(haveSourceMap){if(flags&64){orig.source=orig.source.substring(orig.source.replace(/\\\\/g,\"/\").lastIndexOf(\"/\")+1)}callstack+=\"    at \"+symbolName+\" (\"+orig.source+\":\"+orig.line+\":\"+orig.column+\")\\n\"}}if(flags&16||!haveSourceMap){if(flags&64){file=file.substring(file.replace(/\\\\/g,\"/\").lastIndexOf(\"/\")+1)}callstack+=(haveSourceMap?\"     = \"+symbolName:\"    at \"+symbolName)+\" (\"+file+\":\"+lineno+\":\"+column+\")\\n\"}if(flags&128&&stack_args[0]){if(stack_args[1]==symbolName&&stack_args[2].length>0){callstack=callstack.replace(/\\s+$/,\"\");callstack+=\" with values: \"+stack_args[1]+stack_args[2]+\"\\n\"}stack_args=traverseStack(stack_args[0])}}callstack=callstack.replace(/\\s+$/,\"\");return callstack}function _emscripten_log_js(flags,str){if(flags&24){str=str.replace(/\\s+$/,\"\");str+=(str.length>0?\"\\n\":\"\")+_emscripten_get_callstack_js(flags)}if(flags&1){if(flags&4){console.error(str)}else if(flags&2){console.warn(str)}else if(flags&512){console.info(str)}else if(flags&256){console.debug(str)}else{console.log(str)}}else if(flags&6){err(str)}else{out(str)}}function _emscripten_log(flags,format,varargs){var result=formatString(format,varargs);var str=UTF8ArrayToString(result,0);_emscripten_log_js(flags,str)}function _emscripten_memcpy_big(dest,src,num){HEAPU8.copyWithin(dest,src,src+num)}function emscripten_realloc_buffer(size){try{wasmMemory.grow(size-buffer.byteLength+65535>>>16);updateGlobalBufferAndViews(wasmMemory.buffer);return 1}catch(e){}}function _emscripten_resize_heap(requestedSize){var oldSize=HEAPU8.length;requestedSize=requestedSize>>>0;var maxHeapSize=2147483648;if(requestedSize>maxHeapSize){return false}for(var cutDown=1;cutDown<=4;cutDown*=2){var overGrownHeapSize=oldSize*(1+.2/cutDown);overGrownHeapSize=Math.min(overGrownHeapSize,requestedSize+100663296);var newSize=Math.min(maxHeapSize,alignUp(Math.max(requestedSize,overGrownHeapSize),65536));var replacement=emscripten_realloc_buffer(newSize);if(replacement){return true}}return false}var ENV={};function getExecutableName(){return thisProgram||\"./this.program\"}function getEnvStrings(){if(!getEnvStrings.strings){var lang=(typeof navigator===\"object\"&&navigator.languages&&navigator.languages[0]||\"C\").replace(\"-\",\"_\")+\".UTF-8\";var env={\"USER\":\"web_user\",\"LOGNAME\":\"web_user\",\"PATH\":\"/\",\"PWD\":\"/\",\"HOME\":\"/home/web_user\",\"LANG\":lang,\"_\":getExecutableName()};for(var x in ENV){if(ENV[x]===undefined)delete env[x];else env[x]=ENV[x]}var strings=[];for(var x in env){strings.push(x+\"=\"+env[x])}getEnvStrings.strings=strings}return getEnvStrings.strings}function _environ_get(__environ,environ_buf){var bufSize=0;getEnvStrings().forEach(function(string,i){var ptr=environ_buf+bufSize;HEAP32[__environ+i*4>>2]=ptr;writeAsciiToMemory(string,ptr);bufSize+=string.length+1});return 0}function _environ_sizes_get(penviron_count,penviron_buf_size){var strings=getEnvStrings();HEAP32[penviron_count>>2]=strings.length;var bufSize=0;strings.forEach(function(string){bufSize+=string.length+1});HEAP32[penviron_buf_size>>2]=bufSize;return 0}function _fd_close(fd){try{var stream=SYSCALLS.getStreamFromFD(fd);FS.close(stream);return 0}catch(e){if(typeof FS===\"undefined\"||!(e instanceof FS.ErrnoError))throw e;return e.errno}}function _fd_fdstat_get(fd,pbuf){try{var stream=SYSCALLS.getStreamFromFD(fd);var type=stream.tty?2:FS.isDir(stream.mode)?3:FS.isLink(stream.mode)?7:4;HEAP8[pbuf>>0]=type;return 0}catch(e){if(typeof FS===\"undefined\"||!(e instanceof FS.ErrnoError))throw e;return e.errno}}function _fd_pread(fd,iov,iovcnt,offset_low,offset_high,pnum){try{var stream=SYSCALLS.getStreamFromFD(fd);var num=SYSCALLS.doReadv(stream,iov,iovcnt,offset_low);HEAP32[pnum>>2]=num;return 0}catch(e){if(typeof FS===\"undefined\"||!(e instanceof FS.ErrnoError))throw e;return e.errno}}function _fd_pwrite(fd,iov,iovcnt,offset_low,offset_high,pnum){try{var stream=SYSCALLS.getStreamFromFD(fd);var num=SYSCALLS.doWritev(stream,iov,iovcnt,offset_low);HEAP32[pnum>>2]=num;return 0}catch(e){if(typeof FS===\"undefined\"||!(e instanceof FS.ErrnoError))throw e;return e.errno}}function _fd_read(fd,iov,iovcnt,pnum){try{var stream=SYSCALLS.getStreamFromFD(fd);var num=SYSCALLS.doReadv(stream,iov,iovcnt);HEAP32[pnum>>2]=num;return 0}catch(e){if(typeof FS===\"undefined\"||!(e instanceof FS.ErrnoError))throw e;return e.errno}}function _fd_seek(fd,offset_low,offset_high,whence,newOffset){try{var stream=SYSCALLS.getStreamFromFD(fd);var HIGH_OFFSET=4294967296;var offset=offset_high*HIGH_OFFSET+(offset_low>>>0);var DOUBLE_LIMIT=9007199254740992;if(offset<=-DOUBLE_LIMIT||offset>=DOUBLE_LIMIT){return-61}FS.llseek(stream,offset,whence);tempI64=[stream.position>>>0,(tempDouble=stream.position,+Math.abs(tempDouble)>=1?tempDouble>0?(Math.min(+Math.floor(tempDouble/4294967296),4294967295)|0)>>>0:~~+Math.ceil((tempDouble-+(~~tempDouble>>>0))/4294967296)>>>0:0)],HEAP32[newOffset>>2]=tempI64[0],HEAP32[newOffset+4>>2]=tempI64[1];if(stream.getdents&&offset===0&&whence===0)stream.getdents=null;return 0}catch(e){if(typeof FS===\"undefined\"||!(e instanceof FS.ErrnoError))throw e;return e.errno}}function _fd_sync(fd){try{var stream=SYSCALLS.getStreamFromFD(fd);if(stream.stream_ops&&stream.stream_ops.fsync){return-stream.stream_ops.fsync(stream)}return 0}catch(e){if(typeof FS===\"undefined\"||!(e instanceof FS.ErrnoError))throw e;return e.errno}}function _fd_write(fd,iov,iovcnt,pnum){try{var stream=SYSCALLS.getStreamFromFD(fd);var num=SYSCALLS.doWritev(stream,iov,iovcnt);HEAP32[pnum>>2]=num;return 0}catch(e){if(typeof FS===\"undefined\"||!(e instanceof FS.ErrnoError))throw e;return e.errno}}var GAI_ERRNO_MESSAGES={};function _gai_strerror(val){var buflen=256;if(!_gai_strerror.buffer){_gai_strerror.buffer=_malloc(buflen);GAI_ERRNO_MESSAGES[\"0\"]=\"Success\";GAI_ERRNO_MESSAGES[\"\"+-1]=\"Invalid value for 'ai_flags' field\";GAI_ERRNO_MESSAGES[\"\"+-2]=\"NAME or SERVICE is unknown\";GAI_ERRNO_MESSAGES[\"\"+-3]=\"Temporary failure in name resolution\";GAI_ERRNO_MESSAGES[\"\"+-4]=\"Non-recoverable failure in name res\";GAI_ERRNO_MESSAGES[\"\"+-6]=\"'ai_family' not supported\";GAI_ERRNO_MESSAGES[\"\"+-7]=\"'ai_socktype' not supported\";GAI_ERRNO_MESSAGES[\"\"+-8]=\"SERVICE not supported for 'ai_socktype'\";GAI_ERRNO_MESSAGES[\"\"+-10]=\"Memory allocation failure\";GAI_ERRNO_MESSAGES[\"\"+-11]=\"System error returned in 'errno'\";GAI_ERRNO_MESSAGES[\"\"+-12]=\"Argument buffer overflow\"}var msg=\"Unknown error\";if(val in GAI_ERRNO_MESSAGES){if(GAI_ERRNO_MESSAGES[val].length>buflen-1){msg=\"Message too long\"}else{msg=GAI_ERRNO_MESSAGES[val]}}writeAsciiToMemory(msg,_gai_strerror.buffer);return _gai_strerror.buffer}function _getaddrinfo(node,service,hint,out){var addr=0;var port=0;var flags=0;var family=0;var type=0;var proto=0;var ai;function allocaddrinfo(family,type,proto,canon,addr,port){var sa,salen,ai;var errno;salen=family===10?28:16;addr=family===10?inetNtop6(addr):inetNtop4(addr);sa=_malloc(salen);errno=writeSockaddr(sa,family,addr,port);assert(!errno);ai=_malloc(32);HEAP32[ai+4>>2]=family;HEAP32[ai+8>>2]=type;HEAP32[ai+12>>2]=proto;HEAP32[ai+24>>2]=canon;HEAP32[ai+20>>2]=sa;if(family===10){HEAP32[ai+16>>2]=28}else{HEAP32[ai+16>>2]=16}HEAP32[ai+28>>2]=0;return ai}if(hint){flags=HEAP32[hint>>2];family=HEAP32[hint+4>>2];type=HEAP32[hint+8>>2];proto=HEAP32[hint+12>>2]}if(type&&!proto){proto=type===2?17:6}if(!type&&proto){type=proto===17?2:1}if(proto===0){proto=6}if(type===0){type=1}if(!node&&!service){return-2}if(flags&~(1|2|4|1024|8|16|32)){return-1}if(hint!==0&&HEAP32[hint>>2]&2&&!node){return-1}if(flags&32){return-2}if(type!==0&&type!==1&&type!==2){return-7}if(family!==0&&family!==2&&family!==10){return-6}if(service){service=UTF8ToString(service);port=parseInt(service,10);if(isNaN(port)){if(flags&1024){return-2}return-8}}if(!node){if(family===0){family=2}if((flags&1)===0){if(family===2){addr=_htonl(2130706433)}else{addr=[0,0,0,1]}}ai=allocaddrinfo(family,type,proto,null,addr,port);HEAP32[out>>2]=ai;return 0}node=UTF8ToString(node);addr=inetPton4(node);if(addr!==null){if(family===0||family===2){family=2}else if(family===10&&flags&8){addr=[0,0,_htonl(65535),addr];family=10}else{return-2}}else{addr=inetPton6(node);if(addr!==null){if(family===0||family===10){family=10}else{return-2}}}if(addr!=null){ai=allocaddrinfo(family,type,proto,node,addr,port);HEAP32[out>>2]=ai;return 0}if(flags&4){return-2}node=DNS.lookup_name(node);addr=inetPton4(node);if(family===0){family=2}else if(family===10){addr=[0,0,_htonl(65535),addr]}ai=allocaddrinfo(family,type,proto,null,addr,port);HEAP32[out>>2]=ai;return 0}function _getentropy(buffer,size){if(!_getentropy.randomDevice){_getentropy.randomDevice=getRandomDevice()}for(var i=0;i<size;i++){HEAP8[buffer+i>>0]=_getentropy.randomDevice()}return 0}function _gettimeofday(ptr){var now=Date.now();HEAP32[ptr>>2]=now/1e3|0;HEAP32[ptr+4>>2]=now%1e3*1e3|0;return 0}function __isLeapYear(year){return year%4===0&&(year%100!==0||year%400===0)}function __arraySum(array,index){var sum=0;for(var i=0;i<=index;sum+=array[i++]){}return sum}var __MONTH_DAYS_LEAP=[31,29,31,30,31,30,31,31,30,31,30,31];var __MONTH_DAYS_REGULAR=[31,28,31,30,31,30,31,31,30,31,30,31];function __addDays(date,days){var newDate=new Date(date.getTime());while(days>0){var leap=__isLeapYear(newDate.getFullYear());var currentMonth=newDate.getMonth();var daysInCurrentMonth=(leap?__MONTH_DAYS_LEAP:__MONTH_DAYS_REGULAR)[currentMonth];if(days>daysInCurrentMonth-newDate.getDate()){days-=daysInCurrentMonth-newDate.getDate()+1;newDate.setDate(1);if(currentMonth<11){newDate.setMonth(currentMonth+1)}else{newDate.setMonth(0);newDate.setFullYear(newDate.getFullYear()+1)}}else{newDate.setDate(newDate.getDate()+days);return newDate}}return newDate}function _strftime(s,maxsize,format,tm){var tm_zone=HEAP32[tm+40>>2];var date={tm_sec:HEAP32[tm>>2],tm_min:HEAP32[tm+4>>2],tm_hour:HEAP32[tm+8>>2],tm_mday:HEAP32[tm+12>>2],tm_mon:HEAP32[tm+16>>2],tm_year:HEAP32[tm+20>>2],tm_wday:HEAP32[tm+24>>2],tm_yday:HEAP32[tm+28>>2],tm_isdst:HEAP32[tm+32>>2],tm_gmtoff:HEAP32[tm+36>>2],tm_zone:tm_zone?UTF8ToString(tm_zone):\"\"};var pattern=UTF8ToString(format);var EXPANSION_RULES_1={\"%c\":\"%a %b %d %H:%M:%S %Y\",\"%D\":\"%m/%d/%y\",\"%F\":\"%Y-%m-%d\",\"%h\":\"%b\",\"%r\":\"%I:%M:%S %p\",\"%R\":\"%H:%M\",\"%T\":\"%H:%M:%S\",\"%x\":\"%m/%d/%y\",\"%X\":\"%H:%M:%S\",\"%Ec\":\"%c\",\"%EC\":\"%C\",\"%Ex\":\"%m/%d/%y\",\"%EX\":\"%H:%M:%S\",\"%Ey\":\"%y\",\"%EY\":\"%Y\",\"%Od\":\"%d\",\"%Oe\":\"%e\",\"%OH\":\"%H\",\"%OI\":\"%I\",\"%Om\":\"%m\",\"%OM\":\"%M\",\"%OS\":\"%S\",\"%Ou\":\"%u\",\"%OU\":\"%U\",\"%OV\":\"%V\",\"%Ow\":\"%w\",\"%OW\":\"%W\",\"%Oy\":\"%y\"};for(var rule in EXPANSION_RULES_1){pattern=pattern.replace(new RegExp(rule,\"g\"),EXPANSION_RULES_1[rule])}var WEEKDAYS=[\"Sunday\",\"Monday\",\"Tuesday\",\"Wednesday\",\"Thursday\",\"Friday\",\"Saturday\"];var MONTHS=[\"January\",\"February\",\"March\",\"April\",\"May\",\"June\",\"July\",\"August\",\"September\",\"October\",\"November\",\"December\"];function leadingSomething(value,digits,character){var str=typeof value===\"number\"?value.toString():value||\"\";while(str.length<digits){str=character[0]+str}return str}function leadingNulls(value,digits){return leadingSomething(value,digits,\"0\")}function compareByDay(date1,date2){function sgn(value){return value<0?-1:value>0?1:0}var compare;if((compare=sgn(date1.getFullYear()-date2.getFullYear()))===0){if((compare=sgn(date1.getMonth()-date2.getMonth()))===0){compare=sgn(date1.getDate()-date2.getDate())}}return compare}function getFirstWeekStartDate(janFourth){switch(janFourth.getDay()){case 0:return new Date(janFourth.getFullYear()-1,11,29);case 1:return janFourth;case 2:return new Date(janFourth.getFullYear(),0,3);case 3:return new Date(janFourth.getFullYear(),0,2);case 4:return new Date(janFourth.getFullYear(),0,1);case 5:return new Date(janFourth.getFullYear()-1,11,31);case 6:return new Date(janFourth.getFullYear()-1,11,30)}}function getWeekBasedYear(date){var thisDate=__addDays(new Date(date.tm_year+1900,0,1),date.tm_yday);var janFourthThisYear=new Date(thisDate.getFullYear(),0,4);var janFourthNextYear=new Date(thisDate.getFullYear()+1,0,4);var firstWeekStartThisYear=getFirstWeekStartDate(janFourthThisYear);var firstWeekStartNextYear=getFirstWeekStartDate(janFourthNextYear);if(compareByDay(firstWeekStartThisYear,thisDate)<=0){if(compareByDay(firstWeekStartNextYear,thisDate)<=0){return thisDate.getFullYear()+1}else{return thisDate.getFullYear()}}else{return thisDate.getFullYear()-1}}var EXPANSION_RULES_2={\"%a\":function(date){return WEEKDAYS[date.tm_wday].substring(0,3)},\"%A\":function(date){return WEEKDAYS[date.tm_wday]},\"%b\":function(date){return MONTHS[date.tm_mon].substring(0,3)},\"%B\":function(date){return MONTHS[date.tm_mon]},\"%C\":function(date){var year=date.tm_year+1900;return leadingNulls(year/100|0,2)},\"%d\":function(date){return leadingNulls(date.tm_mday,2)},\"%e\":function(date){return leadingSomething(date.tm_mday,2,\" \")},\"%g\":function(date){return getWeekBasedYear(date).toString().substring(2)},\"%G\":function(date){return getWeekBasedYear(date)},\"%H\":function(date){return leadingNulls(date.tm_hour,2)},\"%I\":function(date){var twelveHour=date.tm_hour;if(twelveHour==0)twelveHour=12;else if(twelveHour>12)twelveHour-=12;return leadingNulls(twelveHour,2)},\"%j\":function(date){return leadingNulls(date.tm_mday+__arraySum(__isLeapYear(date.tm_year+1900)?__MONTH_DAYS_LEAP:__MONTH_DAYS_REGULAR,date.tm_mon-1),3)},\"%m\":function(date){return leadingNulls(date.tm_mon+1,2)},\"%M\":function(date){return leadingNulls(date.tm_min,2)},\"%n\":function(){return\"\\n\"},\"%p\":function(date){if(date.tm_hour>=0&&date.tm_hour<12){return\"AM\"}else{return\"PM\"}},\"%S\":function(date){return leadingNulls(date.tm_sec,2)},\"%t\":function(){return\"\\t\"},\"%u\":function(date){return date.tm_wday||7},\"%U\":function(date){var janFirst=new Date(date.tm_year+1900,0,1);var firstSunday=janFirst.getDay()===0?janFirst:__addDays(janFirst,7-janFirst.getDay());var endDate=new Date(date.tm_year+1900,date.tm_mon,date.tm_mday);if(compareByDay(firstSunday,endDate)<0){var februaryFirstUntilEndMonth=__arraySum(__isLeapYear(endDate.getFullYear())?__MONTH_DAYS_LEAP:__MONTH_DAYS_REGULAR,endDate.getMonth()-1)-31;var firstSundayUntilEndJanuary=31-firstSunday.getDate();var days=firstSundayUntilEndJanuary+februaryFirstUntilEndMonth+endDate.getDate();return leadingNulls(Math.ceil(days/7),2)}return compareByDay(firstSunday,janFirst)===0?\"01\":\"00\"},\"%V\":function(date){var janFourthThisYear=new Date(date.tm_year+1900,0,4);var janFourthNextYear=new Date(date.tm_year+1901,0,4);var firstWeekStartThisYear=getFirstWeekStartDate(janFourthThisYear);var firstWeekStartNextYear=getFirstWeekStartDate(janFourthNextYear);var endDate=__addDays(new Date(date.tm_year+1900,0,1),date.tm_yday);if(compareByDay(endDate,firstWeekStartThisYear)<0){return\"53\"}if(compareByDay(firstWeekStartNextYear,endDate)<=0){return\"01\"}var daysDifference;if(firstWeekStartThisYear.getFullYear()<date.tm_year+1900){daysDifference=date.tm_yday+32-firstWeekStartThisYear.getDate()}else{daysDifference=date.tm_yday+1-firstWeekStartThisYear.getDate()}return leadingNulls(Math.ceil(daysDifference/7),2)},\"%w\":function(date){return date.tm_wday},\"%W\":function(date){var janFirst=new Date(date.tm_year,0,1);var firstMonday=janFirst.getDay()===1?janFirst:__addDays(janFirst,janFirst.getDay()===0?1:7-janFirst.getDay()+1);var endDate=new Date(date.tm_year+1900,date.tm_mon,date.tm_mday);if(compareByDay(firstMonday,endDate)<0){var februaryFirstUntilEndMonth=__arraySum(__isLeapYear(endDate.getFullYear())?__MONTH_DAYS_LEAP:__MONTH_DAYS_REGULAR,endDate.getMonth()-1)-31;var firstMondayUntilEndJanuary=31-firstMonday.getDate();var days=firstMondayUntilEndJanuary+februaryFirstUntilEndMonth+endDate.getDate();return leadingNulls(Math.ceil(days/7),2)}return compareByDay(firstMonday,janFirst)===0?\"01\":\"00\"},\"%y\":function(date){return(date.tm_year+1900).toString().substring(2)},\"%Y\":function(date){return date.tm_year+1900},\"%z\":function(date){var off=date.tm_gmtoff;var ahead=off>=0;off=Math.abs(off)/60;off=off/60*100+off%60;return(ahead?\"+\":\"-\")+String(\"0000\"+off).slice(-4)},\"%Z\":function(date){return date.tm_zone},\"%%\":function(){return\"%\"}};for(var rule in EXPANSION_RULES_2){if(pattern.includes(rule)){pattern=pattern.replace(new RegExp(rule,\"g\"),EXPANSION_RULES_2[rule](date))}}var bytes=intArrayFromString(pattern,false);if(bytes.length>maxsize){return 0}writeArrayToMemory(bytes,s);return bytes.length-1}function _strftime_l(s,maxsize,format,tm){return _strftime(s,maxsize,format,tm)}function _time(ptr){var ret=Date.now()/1e3|0;if(ptr){HEAP32[ptr>>2]=ret}return ret}function setFileTime(path,time){path=UTF8ToString(path);try{FS.utime(path,time,time);return 0}catch(e){if(!(e instanceof FS.ErrnoError))throw e+\" : \"+stackTrace();setErrNo(e.errno);return-1}}function _utimes(path,times){var time;if(times){var mtime=times+8;time=HEAP32[mtime>>2]*1e3;time+=HEAP32[mtime+4>>2]/1e3}else{time=Date.now()}return setFileTime(path,time)}var FSNode=function(parent,name,mode,rdev){if(!parent){parent=this}this.parent=parent;this.mount=parent.mount;this.mounted=null;this.id=FS.nextInode++;this.name=name;this.mode=mode;this.node_ops={};this.stream_ops={};this.rdev=rdev};var readMode=292|73;var writeMode=146;Object.defineProperties(FSNode.prototype,{read:{get:function(){return(this.mode&readMode)===readMode},set:function(val){val?this.mode|=readMode:this.mode&=~readMode}},write:{get:function(){return(this.mode&writeMode)===writeMode},set:function(val){val?this.mode|=writeMode:this.mode&=~writeMode}},isFolder:{get:function(){return FS.isDir(this.mode)}},isDevice:{get:function(){return FS.isChrdev(this.mode)}}});FS.FSNode=FSNode;FS.staticInit();function intArrayFromString(stringy,dontAddNull,length){var len=length>0?length:lengthBytesUTF8(stringy)+1;var u8array=new Array(len);var numBytesWritten=stringToUTF8Array(stringy,u8array,0,u8array.length);if(dontAddNull)u8array.length=numBytesWritten;return u8array}var asmLibraryArg={\"Q\":___clock_gettime,\"S\":___localtime_r,\"H\":___syscall__newselect,\"p\":___syscall_access,\"ga\":___syscall_chmod,\"ea\":___syscall_chown32,\"y\":___syscall_connect,\"ia\":___syscall_dup3,\"ha\":___syscall_fchmod,\"fa\":___syscall_fchown32,\"a\":___syscall_fcntl64,\"ca\":___syscall_fstat64,\"aa\":___syscall_fstatat64,\"Z\":___syscall_ftruncate64,\"Y\":___syscall_getcwd,\"L\":___syscall_getdents64,\"X\":___syscall_getegid32,\"l\":___syscall_geteuid32,\"U\":___syscall_getgid32,\"x\":___syscall_getpeername,\"w\":___syscall_getsockname,\"v\":___syscall_getsockopt,\"k\":___syscall_getuid32,\"da\":___syscall_ioctl,\"$\":___syscall_lstat64,\"R\":___syscall_mkdir,\"P\":___syscall_mmap2,\"N\":___syscall_munmap,\"o\":___syscall_open,\"M\":___syscall_poll,\"K\":___syscall_readlink,\"J\":___syscall_rename,\"I\":___syscall_rmdir,\"u\":___syscall_sendmsg,\"h\":___syscall_socket,\"ba\":___syscall_stat64,\"F\":___syscall_unlink,\"T\":__gmtime_js,\"b\":_abort,\"i\":_clock_gettime,\"g\":_emscripten_asm_const_int,\"ja\":_emscripten_exit_with_live_runtime,\"G\":_emscripten_get_heap_max,\"j\":_emscripten_get_now,\"e\":_emscripten_log,\"z\":_emscripten_memcpy_big,\"A\":_emscripten_resize_heap,\"V\":_environ_get,\"W\":_environ_sizes_get,\"d\":_fd_close,\"E\":_fd_fdstat_get,\"r\":_fd_pread,\"q\":_fd_pwrite,\"n\":_fd_read,\"s\":_fd_seek,\"_\":_fd_sync,\"f\":_fd_write,\"t\":_gai_strerror,\"D\":_getaddrinfo,\"B\":_getentropy,\"m\":_gettimeofday,\"C\":_strftime_l,\"c\":_time,\"O\":_utimes};var asm=createWasm();var ___wasm_call_ctors=Module[\"___wasm_call_ctors\"]=function(){return(___wasm_call_ctors=Module[\"___wasm_call_ctors\"]=Module[\"asm\"][\"la\"]).apply(null,arguments)};var _td_emscripten_create_client_id=Module[\"_td_emscripten_create_client_id\"]=function(){return(_td_emscripten_create_client_id=Module[\"_td_emscripten_create_client_id\"]=Module[\"asm\"][\"ma\"]).apply(null,arguments)};var _td_emscripten_send=Module[\"_td_emscripten_send\"]=function(){return(_td_emscripten_send=Module[\"_td_emscripten_send\"]=Module[\"asm\"][\"na\"]).apply(null,arguments)};var _td_emscripten_receive=Module[\"_td_emscripten_receive\"]=function(){return(_td_emscripten_receive=Module[\"_td_emscripten_receive\"]=Module[\"asm\"][\"oa\"]).apply(null,arguments)};var _td_emscripten_execute=Module[\"_td_emscripten_execute\"]=function(){return(_td_emscripten_execute=Module[\"_td_emscripten_execute\"]=Module[\"asm\"][\"pa\"]).apply(null,arguments)};var _td_emscripten_get_timeout=Module[\"_td_emscripten_get_timeout\"]=function(){return(_td_emscripten_get_timeout=Module[\"_td_emscripten_get_timeout\"]=Module[\"asm\"][\"qa\"]).apply(null,arguments)};var _main=Module[\"_main\"]=function(){return(_main=Module[\"_main\"]=Module[\"asm\"][\"ra\"]).apply(null,arguments)};var _strlen=Module[\"_strlen\"]=function(){return(_strlen=Module[\"_strlen\"]=Module[\"asm\"][\"ta\"]).apply(null,arguments)};var ___errno_location=Module[\"___errno_location\"]=function(){return(___errno_location=Module[\"___errno_location\"]=Module[\"asm\"][\"ua\"]).apply(null,arguments)};var _malloc=Module[\"_malloc\"]=function(){return(_malloc=Module[\"_malloc\"]=Module[\"asm\"][\"va\"]).apply(null,arguments)};var _free=Module[\"_free\"]=function(){return(_free=Module[\"_free\"]=Module[\"asm\"][\"wa\"]).apply(null,arguments)};var _htonl=Module[\"_htonl\"]=function(){return(_htonl=Module[\"_htonl\"]=Module[\"asm\"][\"xa\"]).apply(null,arguments)};var _htons=Module[\"_htons\"]=function(){return(_htons=Module[\"_htons\"]=Module[\"asm\"][\"ya\"]).apply(null,arguments)};var _ntohs=Module[\"_ntohs\"]=function(){return(_ntohs=Module[\"_ntohs\"]=Module[\"asm\"][\"za\"]).apply(null,arguments)};var __get_tzname=Module[\"__get_tzname\"]=function(){return(__get_tzname=Module[\"__get_tzname\"]=Module[\"asm\"][\"Aa\"]).apply(null,arguments)};var __get_daylight=Module[\"__get_daylight\"]=function(){return(__get_daylight=Module[\"__get_daylight\"]=Module[\"asm\"][\"Ba\"]).apply(null,arguments)};var __get_timezone=Module[\"__get_timezone\"]=function(){return(__get_timezone=Module[\"__get_timezone\"]=Module[\"asm\"][\"Ca\"]).apply(null,arguments)};var stackSave=Module[\"stackSave\"]=function(){return(stackSave=Module[\"stackSave\"]=Module[\"asm\"][\"Da\"]).apply(null,arguments)};var stackRestore=Module[\"stackRestore\"]=function(){return(stackRestore=Module[\"stackRestore\"]=Module[\"asm\"][\"Ea\"]).apply(null,arguments)};var stackAlloc=Module[\"stackAlloc\"]=function(){return(stackAlloc=Module[\"stackAlloc\"]=Module[\"asm\"][\"Fa\"]).apply(null,arguments)};var _memalign=Module[\"_memalign\"]=function(){return(_memalign=Module[\"_memalign\"]=Module[\"asm\"][\"Ga\"]).apply(null,arguments)};Module[\"cwrap\"]=cwrap;Module[\"FS\"]=FS;var calledRun;function ExitStatus(status){this.name=\"ExitStatus\";this.message=\"Program terminated with exit(\"+status+\")\";this.status=status}var calledMain=false;dependenciesFulfilled=function runCaller(){if(!calledRun)run();if(!calledRun)dependenciesFulfilled=runCaller};function callMain(args){var entryFunction=Module[\"_main\"];var argc=0;var argv=0;try{var ret=entryFunction(argc,argv);exit(ret,true);return ret}catch(e){return handleException(e)}finally{calledMain=true}}function run(args){args=args||arguments_;if(runDependencies>0){return}preRun();if(runDependencies>0){return}function doRun(){if(calledRun)return;calledRun=true;Module[\"calledRun\"]=true;if(ABORT)return;initRuntime();preMain();readyPromiseResolve(Module);if(Module[\"onRuntimeInitialized\"])Module[\"onRuntimeInitialized\"]();if(shouldRunNow)callMain(args);postRun()}if(Module[\"setStatus\"]){Module[\"setStatus\"](\"Running...\");setTimeout(function(){setTimeout(function(){Module[\"setStatus\"](\"\")},1);doRun()},1)}else{doRun()}}Module[\"run\"]=run;function exit(status,implicit){EXITSTATUS=status;if(keepRuntimeAlive()){}else{exitRuntime()}procExit(status)}function procExit(code){EXITSTATUS=code;if(!keepRuntimeAlive()){if(Module[\"onExit\"])Module[\"onExit\"](code);ABORT=true}quit_(code,new ExitStatus(code))}if(Module[\"preInit\"]){if(typeof Module[\"preInit\"]==\"function\")Module[\"preInit\"]=[Module[\"preInit\"]];while(Module[\"preInit\"].length>0){Module[\"preInit\"].pop()()}}var shouldRunNow=true;if(Module[\"noInitialRun\"])shouldRunNow=false;run();createTdwebModule.ready.FS=Module.FS;\n\n\n  return createTdwebModule.ready\n}\n);\n})();\nif (true)\n  module.exports = createTdwebModule;\nelse {}\n\n/* WEBPACK VAR INJECTION */}.call(this, \"/index.js\", __webpack_require__(11), \"/\", __webpack_require__(13).Buffer))\n\n/***/ })\n]);})();\n/******/ \t\t\t}\n/******/ \t\t}));\n/******/ \t\treturn Promise.all(promises);\n/******/ \t};\n/******/\n/******/ \t// expose the modules object (__webpack_modules__)\n/******/ \t__webpack_require__.m = modules;\n/******/\n/******/ \t// expose the module cache\n/******/ \t__webpack_require__.c = installedModules;\n/******/\n/******/ \t// define getter function for harmony exports\n/******/ \t__webpack_require__.d = function(exports, name, getter) {\n/******/ \t\tif(!__webpack_require__.o(exports, name)) {\n/******/ \t\t\tObject.defineProperty(exports, name, { enumerable: true, get: getter });\n/******/ \t\t}\n/******/ \t};\n/******/\n/******/ \t// define __esModule on exports\n/******/ \t__webpack_require__.r = function(exports) {\n/******/ \t\tif(typeof Symbol !== 'undefined' && Symbol.toStringTag) {\n/******/ \t\t\tObject.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });\n/******/ \t\t}\n/******/ \t\tObject.defineProperty(exports, '__esModule', { value: true });\n/******/ \t};\n/******/\n/******/ \t// create a fake namespace object\n/******/ \t// mode & 1: value is a module id, require it\n/******/ \t// mode & 2: merge all properties of value into the ns\n/******/ \t// mode & 4: return value when already ns object\n/******/ \t// mode & 8|1: behave like require\n/******/ \t__webpack_require__.t = function(value, mode) {\n/******/ \t\tif(mode & 1) value = __webpack_require__(value);\n/******/ \t\tif(mode & 8) return value;\n/******/ \t\tif((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;\n/******/ \t\tvar ns = Object.create(null);\n/******/ \t\t__webpack_require__.r(ns);\n/******/ \t\tObject.defineProperty(ns, 'default', { enumerable: true, value: value });\n/******/ \t\tif(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));\n/******/ \t\treturn ns;\n/******/ \t};\n/******/\n/******/ \t// getDefaultExport function for compatibility with non-harmony modules\n/******/ \t__webpack_require__.n = function(module) {\n/******/ \t\tvar getter = module && module.__esModule ?\n/******/ \t\t\tfunction getDefault() { return module['default']; } :\n/******/ \t\t\tfunction getModuleExports() { return module; };\n/******/ \t\t__webpack_require__.d(getter, 'a', getter);\n/******/ \t\treturn getter;\n/******/ \t};\n/******/\n/******/ \t// Object.prototype.hasOwnProperty.call\n/******/ \t__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };\n/******/\n/******/ \t// __webpack_public_path__\n/******/ \t__webpack_require__.p = \"\";\n/******/\n/******/\n/******/ \t// Load entry module and return exports\n/******/ \treturn __webpack_require__(__webpack_require__.s = 9);\n/******/ })\n/************************************************************************/\n/******/ ([\n/* 0 */\n/***/ (function(module, exports, __webpack_require__) {\n\nmodule.exports = __webpack_require__(8);\n\n\n/***/ }),\n/* 1 */\n/***/ (function(module, exports) {\n\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {\n  try {\n    var info = gen[key](arg);\n    var value = info.value;\n  } catch (error) {\n    reject(error);\n    return;\n  }\n\n  if (info.done) {\n    resolve(value);\n  } else {\n    Promise.resolve(value).then(_next, _throw);\n  }\n}\n\nfunction _asyncToGenerator(fn) {\n  return function () {\n    var self = this,\n        args = arguments;\n    return new Promise(function (resolve, reject) {\n      var gen = fn.apply(self, args);\n\n      function _next(value) {\n        asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value);\n      }\n\n      function _throw(err) {\n        asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err);\n      }\n\n      _next(undefined);\n    });\n  };\n}\n\nmodule.exports = _asyncToGenerator;\n\n/***/ }),\n/* 2 */\n/***/ (function(module, exports, __webpack_require__) {\n\n/* WEBPACK VAR INJECTION */(function(global) {var require;var require;/*!\n    localForage -- Offline Storage, Improved\n    Version 1.7.3\n    https://localforage.github.io/localForage\n    (c) 2013-2017 Mozilla, Apache License 2.0\n*/\n(function(f){if(true){module.exports=f()}else { var g; }})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require==\"function\"&&require;if(!u&&a)return require(o,!0);if(i)return i(o,!0);var f=new Error(\"Cannot find module '\"+o+\"'\");throw (f.code=\"MODULE_NOT_FOUND\", f)}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require==\"function\"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){\n(function (global){\n'use strict';\nvar Mutation = global.MutationObserver || global.WebKitMutationObserver;\n\nvar scheduleDrain;\n\n{\n  if (Mutation) {\n    var called = 0;\n    var observer = new Mutation(nextTick);\n    var element = global.document.createTextNode('');\n    observer.observe(element, {\n      characterData: true\n    });\n    scheduleDrain = function () {\n      element.data = (called = ++called % 2);\n    };\n  } else if (!global.setImmediate && typeof global.MessageChannel !== 'undefined') {\n    var channel = new global.MessageChannel();\n    channel.port1.onmessage = nextTick;\n    scheduleDrain = function () {\n      channel.port2.postMessage(0);\n    };\n  } else if ('document' in global && 'onreadystatechange' in global.document.createElement('script')) {\n    scheduleDrain = function () {\n\n      // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted\n      // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.\n      var scriptEl = global.document.createElement('script');\n      scriptEl.onreadystatechange = function () {\n        nextTick();\n\n        scriptEl.onreadystatechange = null;\n        scriptEl.parentNode.removeChild(scriptEl);\n        scriptEl = null;\n      };\n      global.document.documentElement.appendChild(scriptEl);\n    };\n  } else {\n    scheduleDrain = function () {\n      setTimeout(nextTick, 0);\n    };\n  }\n}\n\nvar draining;\nvar queue = [];\n//named nextTick for less confusing stack traces\nfunction nextTick() {\n  draining = true;\n  var i, oldQueue;\n  var len = queue.length;\n  while (len) {\n    oldQueue = queue;\n    queue = [];\n    i = -1;\n    while (++i < len) {\n      oldQueue[i]();\n    }\n    len = queue.length;\n  }\n  draining = false;\n}\n\nmodule.exports = immediate;\nfunction immediate(task) {\n  if (queue.push(task) === 1 && !draining) {\n    scheduleDrain();\n  }\n}\n\n}).call(this,typeof global !== \"undefined\" ? global : typeof self !== \"undefined\" ? self : typeof window !== \"undefined\" ? window : {})\n},{}],2:[function(_dereq_,module,exports){\n'use strict';\nvar immediate = _dereq_(1);\n\n/* istanbul ignore next */\nfunction INTERNAL() {}\n\nvar handlers = {};\n\nvar REJECTED = ['REJECTED'];\nvar FULFILLED = ['FULFILLED'];\nvar PENDING = ['PENDING'];\n\nmodule.exports = Promise;\n\nfunction Promise(resolver) {\n  if (typeof resolver !== 'function') {\n    throw new TypeError('resolver must be a function');\n  }\n  this.state = PENDING;\n  this.queue = [];\n  this.outcome = void 0;\n  if (resolver !== INTERNAL) {\n    safelyResolveThenable(this, resolver);\n  }\n}\n\nPromise.prototype[\"catch\"] = function (onRejected) {\n  return this.then(null, onRejected);\n};\nPromise.prototype.then = function (onFulfilled, onRejected) {\n  if (typeof onFulfilled !== 'function' && this.state === FULFILLED ||\n    typeof onRejected !== 'function' && this.state === REJECTED) {\n    return this;\n  }\n  var promise = new this.constructor(INTERNAL);\n  if (this.state !== PENDING) {\n    var resolver = this.state === FULFILLED ? onFulfilled : onRejected;\n    unwrap(promise, resolver, this.outcome);\n  } else {\n    this.queue.push(new QueueItem(promise, onFulfilled, onRejected));\n  }\n\n  return promise;\n};\nfunction QueueItem(promise, onFulfilled, onRejected) {\n  this.promise = promise;\n  if (typeof onFulfilled === 'function') {\n    this.onFulfilled = onFulfilled;\n    this.callFulfilled = this.otherCallFulfilled;\n  }\n  if (typeof onRejected === 'function') {\n    this.onRejected = onRejected;\n    this.callRejected = this.otherCallRejected;\n  }\n}\nQueueItem.prototype.callFulfilled = function (value) {\n  handlers.resolve(this.promise, value);\n};\nQueueItem.prototype.otherCallFulfilled = function (value) {\n  unwrap(this.promise, this.onFulfilled, value);\n};\nQueueItem.prototype.callRejected = function (value) {\n  handlers.reject(this.promise, value);\n};\nQueueItem.prototype.otherCallRejected = function (value) {\n  unwrap(this.promise, this.onRejected, value);\n};\n\nfunction unwrap(promise, func, value) {\n  immediate(function () {\n    var returnValue;\n    try {\n      returnValue = func(value);\n    } catch (e) {\n      return handlers.reject(promise, e);\n    }\n    if (returnValue === promise) {\n      handlers.reject(promise, new TypeError('Cannot resolve promise with itself'));\n    } else {\n      handlers.resolve(promise, returnValue);\n    }\n  });\n}\n\nhandlers.resolve = function (self, value) {\n  var result = tryCatch(getThen, value);\n  if (result.status === 'error') {\n    return handlers.reject(self, result.value);\n  }\n  var thenable = result.value;\n\n  if (thenable) {\n    safelyResolveThenable(self, thenable);\n  } else {\n    self.state = FULFILLED;\n    self.outcome = value;\n    var i = -1;\n    var len = self.queue.length;\n    while (++i < len) {\n      self.queue[i].callFulfilled(value);\n    }\n  }\n  return self;\n};\nhandlers.reject = function (self, error) {\n  self.state = REJECTED;\n  self.outcome = error;\n  var i = -1;\n  var len = self.queue.length;\n  while (++i < len) {\n    self.queue[i].callRejected(error);\n  }\n  return self;\n};\n\nfunction getThen(obj) {\n  // Make sure we only access the accessor once as required by the spec\n  var then = obj && obj.then;\n  if (obj && (typeof obj === 'object' || typeof obj === 'function') && typeof then === 'function') {\n    return function appyThen() {\n      then.apply(obj, arguments);\n    };\n  }\n}\n\nfunction safelyResolveThenable(self, thenable) {\n  // Either fulfill, reject or reject with error\n  var called = false;\n  function onError(value) {\n    if (called) {\n      return;\n    }\n    called = true;\n    handlers.reject(self, value);\n  }\n\n  function onSuccess(value) {\n    if (called) {\n      return;\n    }\n    called = true;\n    handlers.resolve(self, value);\n  }\n\n  function tryToUnwrap() {\n    thenable(onSuccess, onError);\n  }\n\n  var result = tryCatch(tryToUnwrap);\n  if (result.status === 'error') {\n    onError(result.value);\n  }\n}\n\nfunction tryCatch(func, value) {\n  var out = {};\n  try {\n    out.value = func(value);\n    out.status = 'success';\n  } catch (e) {\n    out.status = 'error';\n    out.value = e;\n  }\n  return out;\n}\n\nPromise.resolve = resolve;\nfunction resolve(value) {\n  if (value instanceof this) {\n    return value;\n  }\n  return handlers.resolve(new this(INTERNAL), value);\n}\n\nPromise.reject = reject;\nfunction reject(reason) {\n  var promise = new this(INTERNAL);\n  return handlers.reject(promise, reason);\n}\n\nPromise.all = all;\nfunction all(iterable) {\n  var self = this;\n  if (Object.prototype.toString.call(iterable) !== '[object Array]') {\n    return this.reject(new TypeError('must be an array'));\n  }\n\n  var len = iterable.length;\n  var called = false;\n  if (!len) {\n    return this.resolve([]);\n  }\n\n  var values = new Array(len);\n  var resolved = 0;\n  var i = -1;\n  var promise = new this(INTERNAL);\n\n  while (++i < len) {\n    allResolver(iterable[i], i);\n  }\n  return promise;\n  function allResolver(value, i) {\n    self.resolve(value).then(resolveFromAll, function (error) {\n      if (!called) {\n        called = true;\n        handlers.reject(promise, error);\n      }\n    });\n    function resolveFromAll(outValue) {\n      values[i] = outValue;\n      if (++resolved === len && !called) {\n        called = true;\n        handlers.resolve(promise, values);\n      }\n    }\n  }\n}\n\nPromise.race = race;\nfunction race(iterable) {\n  var self = this;\n  if (Object.prototype.toString.call(iterable) !== '[object Array]') {\n    return this.reject(new TypeError('must be an array'));\n  }\n\n  var len = iterable.length;\n  var called = false;\n  if (!len) {\n    return this.resolve([]);\n  }\n\n  var i = -1;\n  var promise = new this(INTERNAL);\n\n  while (++i < len) {\n    resolver(iterable[i]);\n  }\n  return promise;\n  function resolver(value) {\n    self.resolve(value).then(function (response) {\n      if (!called) {\n        called = true;\n        handlers.resolve(promise, response);\n      }\n    }, function (error) {\n      if (!called) {\n        called = true;\n        handlers.reject(promise, error);\n      }\n    });\n  }\n}\n\n},{\"1\":1}],3:[function(_dereq_,module,exports){\n(function (global){\n'use strict';\nif (typeof global.Promise !== 'function') {\n  global.Promise = _dereq_(2);\n}\n\n}).call(this,typeof global !== \"undefined\" ? global : typeof self !== \"undefined\" ? self : typeof window !== \"undefined\" ? window : {})\n},{\"2\":2}],4:[function(_dereq_,module,exports){\n'use strict';\n\nvar _typeof = typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; };\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction getIDB() {\n    /* global indexedDB,webkitIndexedDB,mozIndexedDB,OIndexedDB,msIndexedDB */\n    try {\n        if (typeof indexedDB !== 'undefined') {\n            return indexedDB;\n        }\n        if (typeof webkitIndexedDB !== 'undefined') {\n            return webkitIndexedDB;\n        }\n        if (typeof mozIndexedDB !== 'undefined') {\n            return mozIndexedDB;\n        }\n        if (typeof OIndexedDB !== 'undefined') {\n            return OIndexedDB;\n        }\n        if (typeof msIndexedDB !== 'undefined') {\n            return msIndexedDB;\n        }\n    } catch (e) {\n        return;\n    }\n}\n\nvar idb = getIDB();\n\nfunction isIndexedDBValid() {\n    try {\n        // Initialize IndexedDB; fall back to vendor-prefixed versions\n        // if needed.\n        if (!idb) {\n            return false;\n        }\n        // We mimic PouchDB here;\n        //\n        // We test for openDatabase because IE Mobile identifies itself\n        // as Safari. Oh the lulz...\n        var isSafari = typeof openDatabase !== 'undefined' && /(Safari|iPhone|iPad|iPod)/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent) && !/BlackBerry/.test(navigator.platform);\n\n        var hasFetch = typeof fetch === 'function' && fetch.toString().indexOf('[native code') !== -1;\n\n        // Safari <10.1 does not meet our requirements for IDB support (#5572)\n        // since Safari 10.1 shipped with fetch, we can use that to detect it\n        return (!isSafari || hasFetch) && typeof indexedDB !== 'undefined' &&\n        // some outdated implementations of IDB that appear on Samsung\n        // and HTC Android devices <4.4 are missing IDBKeyRange\n        // See: https://github.com/mozilla/localForage/issues/128\n        // See: https://github.com/mozilla/localForage/issues/272\n        typeof IDBKeyRange !== 'undefined';\n    } catch (e) {\n        return false;\n    }\n}\n\n// Abstracts constructing a Blob object, so it also works in older\n// browsers that don't support the native Blob constructor. (i.e.\n// old QtWebKit versions, at least).\n// Abstracts constructing a Blob object, so it also works in older\n// browsers that don't support the native Blob constructor. (i.e.\n// old QtWebKit versions, at least).\nfunction createBlob(parts, properties) {\n    /* global BlobBuilder,MSBlobBuilder,MozBlobBuilder,WebKitBlobBuilder */\n    parts = parts || [];\n    properties = properties || {};\n    try {\n        return new Blob(parts, properties);\n    } catch (e) {\n        if (e.name !== 'TypeError') {\n            throw e;\n        }\n        var Builder = typeof BlobBuilder !== 'undefined' ? BlobBuilder : typeof MSBlobBuilder !== 'undefined' ? MSBlobBuilder : typeof MozBlobBuilder !== 'undefined' ? MozBlobBuilder : WebKitBlobBuilder;\n        var builder = new Builder();\n        for (var i = 0; i < parts.length; i += 1) {\n            builder.append(parts[i]);\n        }\n        return builder.getBlob(properties.type);\n    }\n}\n\n// This is CommonJS because lie is an external dependency, so Rollup\n// can just ignore it.\nif (typeof Promise === 'undefined') {\n    // In the \"nopromises\" build this will just throw if you don't have\n    // a global promise object, but it would throw anyway later.\n    _dereq_(3);\n}\nvar Promise$1 = Promise;\n\nfunction executeCallback(promise, callback) {\n    if (callback) {\n        promise.then(function (result) {\n            callback(null, result);\n        }, function (error) {\n            callback(error);\n        });\n    }\n}\n\nfunction executeTwoCallbacks(promise, callback, errorCallback) {\n    if (typeof callback === 'function') {\n        promise.then(callback);\n    }\n\n    if (typeof errorCallback === 'function') {\n        promise[\"catch\"](errorCallback);\n    }\n}\n\nfunction normalizeKey(key) {\n    // Cast the key to a string, as that's all we can set as a key.\n    if (typeof key !== 'string') {\n        console.warn(key + ' used as a key, but it is not a string.');\n        key = String(key);\n    }\n\n    return key;\n}\n\nfunction getCallback() {\n    if (arguments.length && typeof arguments[arguments.length - 1] === 'function') {\n        return arguments[arguments.length - 1];\n    }\n}\n\n// Some code originally from async_storage.js in\n// [Gaia](https://github.com/mozilla-b2g/gaia).\n\nvar DETECT_BLOB_SUPPORT_STORE = 'local-forage-detect-blob-support';\nvar supportsBlobs = void 0;\nvar dbContexts = {};\nvar toString = Object.prototype.toString;\n\n// Transaction Modes\nvar READ_ONLY = 'readonly';\nvar READ_WRITE = 'readwrite';\n\n// Transform a binary string to an array buffer, because otherwise\n// weird stuff happens when you try to work with the binary string directly.\n// It is known.\n// From http://stackoverflow.com/questions/14967647/ (continues on next line)\n// encode-decode-image-with-base64-breaks-image (2013-04-21)\nfunction _binStringToArrayBuffer(bin) {\n    var length = bin.length;\n    var buf = new ArrayBuffer(length);\n    var arr = new Uint8Array(buf);\n    for (var i = 0; i < length; i++) {\n        arr[i] = bin.charCodeAt(i);\n    }\n    return buf;\n}\n\n//\n// Blobs are not supported in all versions of IndexedDB, notably\n// Chrome <37 and Android <5. In those versions, storing a blob will throw.\n//\n// Various other blob bugs exist in Chrome v37-42 (inclusive).\n// Detecting them is expensive and confusing to users, and Chrome 37-42\n// is at very low usage worldwide, so we do a hacky userAgent check instead.\n//\n// content-type bug: https://code.google.com/p/chromium/issues/detail?id=408120\n// 404 bug: https://code.google.com/p/chromium/issues/detail?id=447916\n// FileReader bug: https://code.google.com/p/chromium/issues/detail?id=447836\n//\n// Code borrowed from PouchDB. See:\n// https://github.com/pouchdb/pouchdb/blob/master/packages/node_modules/pouchdb-adapter-idb/src/blobSupport.js\n//\nfunction _checkBlobSupportWithoutCaching(idb) {\n    return new Promise$1(function (resolve) {\n        var txn = idb.transaction(DETECT_BLOB_SUPPORT_STORE, READ_WRITE);\n        var blob = createBlob(['']);\n        txn.objectStore(DETECT_BLOB_SUPPORT_STORE).put(blob, 'key');\n\n        txn.onabort = function (e) {\n            // If the transaction aborts now its due to not being able to\n            // write to the database, likely due to the disk being full\n            e.preventDefault();\n            e.stopPropagation();\n            resolve(false);\n        };\n\n        txn.oncomplete = function () {\n            var matchedChrome = navigator.userAgent.match(/Chrome\\/(\\d+)/);\n            var matchedEdge = navigator.userAgent.match(/Edge\\//);\n            // MS Edge pretends to be Chrome 42:\n            // https://msdn.microsoft.com/en-us/library/hh869301%28v=vs.85%29.aspx\n            resolve(matchedEdge || !matchedChrome || parseInt(matchedChrome[1], 10) >= 43);\n        };\n    })[\"catch\"](function () {\n        return false; // error, so assume unsupported\n    });\n}\n\nfunction _checkBlobSupport(idb) {\n    if (typeof supportsBlobs === 'boolean') {\n        return Promise$1.resolve(supportsBlobs);\n    }\n    return _checkBlobSupportWithoutCaching(idb).then(function (value) {\n        supportsBlobs = value;\n        return supportsBlobs;\n    });\n}\n\nfunction _deferReadiness(dbInfo) {\n    var dbContext = dbContexts[dbInfo.name];\n\n    // Create a deferred object representing the current database operation.\n    var deferredOperation = {};\n\n    deferredOperation.promise = new Promise$1(function (resolve, reject) {\n        deferredOperation.resolve = resolve;\n        deferredOperation.reject = reject;\n    });\n\n    // Enqueue the deferred operation.\n    dbContext.deferredOperations.push(deferredOperation);\n\n    // Chain its promise to the database readiness.\n    if (!dbContext.dbReady) {\n        dbContext.dbReady = deferredOperation.promise;\n    } else {\n        dbContext.dbReady = dbContext.dbReady.then(function () {\n            return deferredOperation.promise;\n        });\n    }\n}\n\nfunction _advanceReadiness(dbInfo) {\n    var dbContext = dbContexts[dbInfo.name];\n\n    // Dequeue a deferred operation.\n    var deferredOperation = dbContext.deferredOperations.pop();\n\n    // Resolve its promise (which is part of the database readiness\n    // chain of promises).\n    if (deferredOperation) {\n        deferredOperation.resolve();\n        return deferredOperation.promise;\n    }\n}\n\nfunction _rejectReadiness(dbInfo, err) {\n    var dbContext = dbContexts[dbInfo.name];\n\n    // Dequeue a deferred operation.\n    var deferredOperation = dbContext.deferredOperations.pop();\n\n    // Reject its promise (which is part of the database readiness\n    // chain of promises).\n    if (deferredOperation) {\n        deferredOperation.reject(err);\n        return deferredOperation.promise;\n    }\n}\n\nfunction _getConnection(dbInfo, upgradeNeeded) {\n    return new Promise$1(function (resolve, reject) {\n        dbContexts[dbInfo.name] = dbContexts[dbInfo.name] || createDbContext();\n\n        if (dbInfo.db) {\n            if (upgradeNeeded) {\n                _deferReadiness(dbInfo);\n                dbInfo.db.close();\n            } else {\n                return resolve(dbInfo.db);\n            }\n        }\n\n        var dbArgs = [dbInfo.name];\n\n        if (upgradeNeeded) {\n            dbArgs.push(dbInfo.version);\n        }\n\n        var openreq = idb.open.apply(idb, dbArgs);\n\n        if (upgradeNeeded) {\n            openreq.onupgradeneeded = function (e) {\n                var db = openreq.result;\n                try {\n                    db.createObjectStore(dbInfo.storeName);\n                    if (e.oldVersion <= 1) {\n                        // Added when support for blob shims was added\n                        db.createObjectStore(DETECT_BLOB_SUPPORT_STORE);\n                    }\n                } catch (ex) {\n                    if (ex.name === 'ConstraintError') {\n                        console.warn('The database \"' + dbInfo.name + '\"' + ' has been upgraded from version ' + e.oldVersion + ' to version ' + e.newVersion + ', but the storage \"' + dbInfo.storeName + '\" already exists.');\n                    } else {\n                        throw ex;\n                    }\n                }\n            };\n        }\n\n        openreq.onerror = function (e) {\n            e.preventDefault();\n            reject(openreq.error);\n        };\n\n        openreq.onsuccess = function () {\n            resolve(openreq.result);\n            _advanceReadiness(dbInfo);\n        };\n    });\n}\n\nfunction _getOriginalConnection(dbInfo) {\n    return _getConnection(dbInfo, false);\n}\n\nfunction _getUpgradedConnection(dbInfo) {\n    return _getConnection(dbInfo, true);\n}\n\nfunction _isUpgradeNeeded(dbInfo, defaultVersion) {\n    if (!dbInfo.db) {\n        return true;\n    }\n\n    var isNewStore = !dbInfo.db.objectStoreNames.contains(dbInfo.storeName);\n    var isDowngrade = dbInfo.version < dbInfo.db.version;\n    var isUpgrade = dbInfo.version > dbInfo.db.version;\n\n    if (isDowngrade) {\n        // If the version is not the default one\n        // then warn for impossible downgrade.\n        if (dbInfo.version !== defaultVersion) {\n            console.warn('The database \"' + dbInfo.name + '\"' + \" can't be downgraded from version \" + dbInfo.db.version + ' to version ' + dbInfo.version + '.');\n        }\n        // Align the versions to prevent errors.\n        dbInfo.version = dbInfo.db.version;\n    }\n\n    if (isUpgrade || isNewStore) {\n        // If the store is new then increment the version (if needed).\n        // This will trigger an \"upgradeneeded\" event which is required\n        // for creating a store.\n        if (isNewStore) {\n            var incVersion = dbInfo.db.version + 1;\n            if (incVersion > dbInfo.version) {\n                dbInfo.version = incVersion;\n            }\n        }\n\n        return true;\n    }\n\n    return false;\n}\n\n// encode a blob for indexeddb engines that don't support blobs\nfunction _encodeBlob(blob) {\n    return new Promise$1(function (resolve, reject) {\n        var reader = new FileReader();\n        reader.onerror = reject;\n        reader.onloadend = function (e) {\n            var base64 = btoa(e.target.result || '');\n            resolve({\n                __local_forage_encoded_blob: true,\n                data: base64,\n                type: blob.type\n            });\n        };\n        reader.readAsBinaryString(blob);\n    });\n}\n\n// decode an encoded blob\nfunction _decodeBlob(encodedBlob) {\n    var arrayBuff = _binStringToArrayBuffer(atob(encodedBlob.data));\n    return createBlob([arrayBuff], { type: encodedBlob.type });\n}\n\n// is this one of our fancy encoded blobs?\nfunction _isEncodedBlob(value) {\n    return value && value.__local_forage_encoded_blob;\n}\n\n// Specialize the default `ready()` function by making it dependent\n// on the current database operations. Thus, the driver will be actually\n// ready when it's been initialized (default) *and* there are no pending\n// operations on the database (initiated by some other instances).\nfunction _fullyReady(callback) {\n    var self = this;\n\n    var promise = self._initReady().then(function () {\n        var dbContext = dbContexts[self._dbInfo.name];\n\n        if (dbContext && dbContext.dbReady) {\n            return dbContext.dbReady;\n        }\n    });\n\n    executeTwoCallbacks(promise, callback, callback);\n    return promise;\n}\n\n// Try to establish a new db connection to replace the\n// current one which is broken (i.e. experiencing\n// InvalidStateError while creating a transaction).\nfunction _tryReconnect(dbInfo) {\n    _deferReadiness(dbInfo);\n\n    var dbContext = dbContexts[dbInfo.name];\n    var forages = dbContext.forages;\n\n    for (var i = 0; i < forages.length; i++) {\n        var forage = forages[i];\n        if (forage._dbInfo.db) {\n            forage._dbInfo.db.close();\n            forage._dbInfo.db = null;\n        }\n    }\n    dbInfo.db = null;\n\n    return _getOriginalConnection(dbInfo).then(function (db) {\n        dbInfo.db = db;\n        if (_isUpgradeNeeded(dbInfo)) {\n            // Reopen the database for upgrading.\n            return _getUpgradedConnection(dbInfo);\n        }\n        return db;\n    }).then(function (db) {\n        // store the latest db reference\n        // in case the db was upgraded\n        dbInfo.db = dbContext.db = db;\n        for (var i = 0; i < forages.length; i++) {\n            forages[i]._dbInfo.db = db;\n        }\n    })[\"catch\"](function (err) {\n        _rejectReadiness(dbInfo, err);\n        throw err;\n    });\n}\n\n// FF doesn't like Promises (micro-tasks) and IDDB store operations,\n// so we have to do it with callbacks\nfunction createTransaction(dbInfo, mode, callback, retries) {\n    if (retries === undefined) {\n        retries = 1;\n    }\n\n    try {\n        var tx = dbInfo.db.transaction(dbInfo.storeName, mode);\n        callback(null, tx);\n    } catch (err) {\n        if (retries > 0 && (!dbInfo.db || err.name === 'InvalidStateError' || err.name === 'NotFoundError')) {\n            return Promise$1.resolve().then(function () {\n                if (!dbInfo.db || err.name === 'NotFoundError' && !dbInfo.db.objectStoreNames.contains(dbInfo.storeName) && dbInfo.version <= dbInfo.db.version) {\n                    // increase the db version, to create the new ObjectStore\n                    if (dbInfo.db) {\n                        dbInfo.version = dbInfo.db.version + 1;\n                    }\n                    // Reopen the database for upgrading.\n                    return _getUpgradedConnection(dbInfo);\n                }\n            }).then(function () {\n                return _tryReconnect(dbInfo).then(function () {\n                    createTransaction(dbInfo, mode, callback, retries - 1);\n                });\n            })[\"catch\"](callback);\n        }\n\n        callback(err);\n    }\n}\n\nfunction createDbContext() {\n    return {\n        // Running localForages sharing a database.\n        forages: [],\n        // Shared database.\n        db: null,\n        // Database readiness (promise).\n        dbReady: null,\n        // Deferred operations on the database.\n        deferredOperations: []\n    };\n}\n\n// Open the IndexedDB database (automatically creates one if one didn't\n// previously exist), using any options set in the config.\nfunction _initStorage(options) {\n    var self = this;\n    var dbInfo = {\n        db: null\n    };\n\n    if (options) {\n        for (var i in options) {\n            dbInfo[i] = options[i];\n        }\n    }\n\n    // Get the current context of the database;\n    var dbContext = dbContexts[dbInfo.name];\n\n    // ...or create a new context.\n    if (!dbContext) {\n        dbContext = createDbContext();\n        // Register the new context in the global container.\n        dbContexts[dbInfo.name] = dbContext;\n    }\n\n    // Register itself as a running localForage in the current context.\n    dbContext.forages.push(self);\n\n    // Replace the default `ready()` function with the specialized one.\n    if (!self._initReady) {\n        self._initReady = self.ready;\n        self.ready = _fullyReady;\n    }\n\n    // Create an array of initialization states of the related localForages.\n    var initPromises = [];\n\n    function ignoreErrors() {\n        // Don't handle errors here,\n        // just makes sure related localForages aren't pending.\n        return Promise$1.resolve();\n    }\n\n    for (var j = 0; j < dbContext.forages.length; j++) {\n        var forage = dbContext.forages[j];\n        if (forage !== self) {\n            // Don't wait for itself...\n            initPromises.push(forage._initReady()[\"catch\"](ignoreErrors));\n        }\n    }\n\n    // Take a snapshot of the related localForages.\n    var forages = dbContext.forages.slice(0);\n\n    // Initialize the connection process only when\n    // all the related localForages aren't pending.\n    return Promise$1.all(initPromises).then(function () {\n        dbInfo.db = dbContext.db;\n        // Get the connection or open a new one without upgrade.\n        return _getOriginalConnection(dbInfo);\n    }).then(function (db) {\n        dbInfo.db = db;\n        if (_isUpgradeNeeded(dbInfo, self._defaultConfig.version)) {\n            // Reopen the database for upgrading.\n            return _getUpgradedConnection(dbInfo);\n        }\n        return db;\n    }).then(function (db) {\n        dbInfo.db = dbContext.db = db;\n        self._dbInfo = dbInfo;\n        // Share the final connection amongst related localForages.\n        for (var k = 0; k < forages.length; k++) {\n            var forage = forages[k];\n            if (forage !== self) {\n                // Self is already up-to-date.\n                forage._dbInfo.db = dbInfo.db;\n                forage._dbInfo.version = dbInfo.version;\n            }\n        }\n    });\n}\n\nfunction getItem(key, callback) {\n    var self = this;\n\n    key = normalizeKey(key);\n\n    var promise = new Promise$1(function (resolve, reject) {\n        self.ready().then(function () {\n            createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {\n                if (err) {\n                    return reject(err);\n                }\n\n                try {\n                    var store = transaction.objectStore(self._dbInfo.storeName);\n                    var req = store.get(key);\n\n                    req.onsuccess = function () {\n                        var value = req.result;\n                        if (value === undefined) {\n                            value = null;\n                        }\n                        if (_isEncodedBlob(value)) {\n                            value = _decodeBlob(value);\n                        }\n                        resolve(value);\n                    };\n\n                    req.onerror = function () {\n                        reject(req.error);\n                    };\n                } catch (e) {\n                    reject(e);\n                }\n            });\n        })[\"catch\"](reject);\n    });\n\n    executeCallback(promise, callback);\n    return promise;\n}\n\n// Iterate over all items stored in database.\nfunction iterate(iterator, callback) {\n    var self = this;\n\n    var promise = new Promise$1(function (resolve, reject) {\n        self.ready().then(function () {\n            createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {\n                if (err) {\n                    return reject(err);\n                }\n\n                try {\n                    var store = transaction.objectStore(self._dbInfo.storeName);\n                    var req = store.openCursor();\n                    var iterationNumber = 1;\n\n                    req.onsuccess = function () {\n                        var cursor = req.result;\n\n                        if (cursor) {\n                            var value = cursor.value;\n                            if (_isEncodedBlob(value)) {\n                                value = _decodeBlob(value);\n                            }\n                            var result = iterator(value, cursor.key, iterationNumber++);\n\n                            // when the iterator callback retuns any\n                            // (non-`undefined`) value, then we stop\n                            // the iteration immediately\n                            if (result !== void 0) {\n                                resolve(result);\n                            } else {\n                                cursor[\"continue\"]();\n                            }\n                        } else {\n                            resolve();\n                        }\n                    };\n\n                    req.onerror = function () {\n                        reject(req.error);\n                    };\n                } catch (e) {\n                    reject(e);\n                }\n            });\n        })[\"catch\"](reject);\n    });\n\n    executeCallback(promise, callback);\n\n    return promise;\n}\n\nfunction setItem(key, value, callback) {\n    var self = this;\n\n    key = normalizeKey(key);\n\n    var promise = new Promise$1(function (resolve, reject) {\n        var dbInfo;\n        self.ready().then(function () {\n            dbInfo = self._dbInfo;\n            if (toString.call(value) === '[object Blob]') {\n                return _checkBlobSupport(dbInfo.db).then(function (blobSupport) {\n                    if (blobSupport) {\n                        return value;\n                    }\n                    return _encodeBlob(value);\n                });\n            }\n            return value;\n        }).then(function (value) {\n            createTransaction(self._dbInfo, READ_WRITE, function (err, transaction) {\n                if (err) {\n                    return reject(err);\n                }\n\n                try {\n                    var store = transaction.objectStore(self._dbInfo.storeName);\n\n                    // The reason we don't _save_ null is because IE 10 does\n                    // not support saving the `null` type in IndexedDB. How\n                    // ironic, given the bug below!\n                    // See: https://github.com/mozilla/localForage/issues/161\n                    if (value === null) {\n                        value = undefined;\n                    }\n\n                    var req = store.put(value, key);\n\n                    transaction.oncomplete = function () {\n                        // Cast to undefined so the value passed to\n                        // callback/promise is the same as what one would get out\n                        // of `getItem()` later. This leads to some weirdness\n                        // (setItem('foo', undefined) will return `null`), but\n                        // it's not my fault localStorage is our baseline and that\n                        // it's weird.\n                        if (value === undefined) {\n                            value = null;\n                        }\n\n                        resolve(value);\n                    };\n                    transaction.onabort = transaction.onerror = function () {\n                        var err = req.error ? req.error : req.transaction.error;\n                        reject(err);\n                    };\n                } catch (e) {\n                    reject(e);\n                }\n            });\n        })[\"catch\"](reject);\n    });\n\n    executeCallback(promise, callback);\n    return promise;\n}\n\nfunction removeItem(key, callback) {\n    var self = this;\n\n    key = normalizeKey(key);\n\n    var promise = new Promise$1(function (resolve, reject) {\n        self.ready().then(function () {\n            createTransaction(self._dbInfo, READ_WRITE, function (err, transaction) {\n                if (err) {\n                    return reject(err);\n                }\n\n                try {\n                    var store = transaction.objectStore(self._dbInfo.storeName);\n                    // We use a Grunt task to make this safe for IE and some\n                    // versions of Android (including those used by Cordova).\n                    // Normally IE won't like `.delete()` and will insist on\n                    // using `['delete']()`, but we have a build step that\n                    // fixes this for us now.\n                    var req = store[\"delete\"](key);\n                    transaction.oncomplete = function () {\n                        resolve();\n                    };\n\n                    transaction.onerror = function () {\n                        reject(req.error);\n                    };\n\n                    // The request will be also be aborted if we've exceeded our storage\n                    // space.\n                    transaction.onabort = function () {\n                        var err = req.error ? req.error : req.transaction.error;\n                        reject(err);\n                    };\n                } catch (e) {\n                    reject(e);\n                }\n            });\n        })[\"catch\"](reject);\n    });\n\n    executeCallback(promise, callback);\n    return promise;\n}\n\nfunction clear(callback) {\n    var self = this;\n\n    var promise = new Promise$1(function (resolve, reject) {\n        self.ready().then(function () {\n            createTransaction(self._dbInfo, READ_WRITE, function (err, transaction) {\n                if (err) {\n                    return reject(err);\n                }\n\n                try {\n                    var store = transaction.objectStore(self._dbInfo.storeName);\n                    var req = store.clear();\n\n                    transaction.oncomplete = function () {\n                        resolve();\n                    };\n\n                    transaction.onabort = transaction.onerror = function () {\n                        var err = req.error ? req.error : req.transaction.error;\n                        reject(err);\n                    };\n                } catch (e) {\n                    reject(e);\n                }\n            });\n        })[\"catch\"](reject);\n    });\n\n    executeCallback(promise, callback);\n    return promise;\n}\n\nfunction length(callback) {\n    var self = this;\n\n    var promise = new Promise$1(function (resolve, reject) {\n        self.ready().then(function () {\n            createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {\n                if (err) {\n                    return reject(err);\n                }\n\n                try {\n                    var store = transaction.objectStore(self._dbInfo.storeName);\n                    var req = store.count();\n\n                    req.onsuccess = function () {\n                        resolve(req.result);\n                    };\n\n                    req.onerror = function () {\n                        reject(req.error);\n                    };\n                } catch (e) {\n                    reject(e);\n                }\n            });\n        })[\"catch\"](reject);\n    });\n\n    executeCallback(promise, callback);\n    return promise;\n}\n\nfunction key(n, callback) {\n    var self = this;\n\n    var promise = new Promise$1(function (resolve, reject) {\n        if (n < 0) {\n            resolve(null);\n\n            return;\n        }\n\n        self.ready().then(function () {\n            createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {\n                if (err) {\n                    return reject(err);\n                }\n\n                try {\n                    var store = transaction.objectStore(self._dbInfo.storeName);\n                    var advanced = false;\n                    var req = store.openCursor();\n\n                    req.onsuccess = function () {\n                        var cursor = req.result;\n                        if (!cursor) {\n                            // this means there weren't enough keys\n                            resolve(null);\n\n                            return;\n                        }\n\n                        if (n === 0) {\n                            // We have the first key, return it if that's what they\n                            // wanted.\n                            resolve(cursor.key);\n                        } else {\n                            if (!advanced) {\n                                // Otherwise, ask the cursor to skip ahead n\n                                // records.\n                                advanced = true;\n                                cursor.advance(n);\n                            } else {\n                                // When we get here, we've got the nth key.\n                                resolve(cursor.key);\n                            }\n                        }\n                    };\n\n                    req.onerror = function () {\n                        reject(req.error);\n                    };\n                } catch (e) {\n                    reject(e);\n                }\n            });\n        })[\"catch\"](reject);\n    });\n\n    executeCallback(promise, callback);\n    return promise;\n}\n\nfunction keys(callback) {\n    var self = this;\n\n    var promise = new Promise$1(function (resolve, reject) {\n        self.ready().then(function () {\n            createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {\n                if (err) {\n                    return reject(err);\n                }\n\n                try {\n                    var store = transaction.objectStore(self._dbInfo.storeName);\n                    var req = store.openCursor();\n                    var keys = [];\n\n                    req.onsuccess = function () {\n                        var cursor = req.result;\n\n                        if (!cursor) {\n                            resolve(keys);\n                            return;\n                        }\n\n                        keys.push(cursor.key);\n                        cursor[\"continue\"]();\n                    };\n\n                    req.onerror = function () {\n                        reject(req.error);\n                    };\n                } catch (e) {\n                    reject(e);\n                }\n            });\n        })[\"catch\"](reject);\n    });\n\n    executeCallback(promise, callback);\n    return promise;\n}\n\nfunction dropInstance(options, callback) {\n    callback = getCallback.apply(this, arguments);\n\n    var currentConfig = this.config();\n    options = typeof options !== 'function' && options || {};\n    if (!options.name) {\n        options.name = options.name || currentConfig.name;\n        options.storeName = options.storeName || currentConfig.storeName;\n    }\n\n    var self = this;\n    var promise;\n    if (!options.name) {\n        promise = Promise$1.reject('Invalid arguments');\n    } else {\n        var isCurrentDb = options.name === currentConfig.name && self._dbInfo.db;\n\n        var dbPromise = isCurrentDb ? Promise$1.resolve(self._dbInfo.db) : _getOriginalConnection(options).then(function (db) {\n            var dbContext = dbContexts[options.name];\n            var forages = dbContext.forages;\n            dbContext.db = db;\n            for (var i = 0; i < forages.length; i++) {\n                forages[i]._dbInfo.db = db;\n            }\n            return db;\n        });\n\n        if (!options.storeName) {\n            promise = dbPromise.then(function (db) {\n                _deferReadiness(options);\n\n                var dbContext = dbContexts[options.name];\n                var forages = dbContext.forages;\n\n                db.close();\n                for (var i = 0; i < forages.length; i++) {\n                    var forage = forages[i];\n                    forage._dbInfo.db = null;\n                }\n\n                var dropDBPromise = new Promise$1(function (resolve, reject) {\n                    var req = idb.deleteDatabase(options.name);\n\n                    req.onerror = req.onblocked = function (err) {\n                        var db = req.result;\n                        if (db) {\n                            db.close();\n                        }\n                        reject(err);\n                    };\n\n                    req.onsuccess = function () {\n                        var db = req.result;\n                        if (db) {\n                            db.close();\n                        }\n                        resolve(db);\n                    };\n                });\n\n                return dropDBPromise.then(function (db) {\n                    dbContext.db = db;\n                    for (var i = 0; i < forages.length; i++) {\n                        var _forage = forages[i];\n                        _advanceReadiness(_forage._dbInfo);\n                    }\n                })[\"catch\"](function (err) {\n                    (_rejectReadiness(options, err) || Promise$1.resolve())[\"catch\"](function () {});\n                    throw err;\n                });\n            });\n        } else {\n            promise = dbPromise.then(function (db) {\n                if (!db.objectStoreNames.contains(options.storeName)) {\n                    return;\n                }\n\n                var newVersion = db.version + 1;\n\n                _deferReadiness(options);\n\n                var dbContext = dbContexts[options.name];\n                var forages = dbContext.forages;\n\n                db.close();\n                for (var i = 0; i < forages.length; i++) {\n                    var forage = forages[i];\n                    forage._dbInfo.db = null;\n                    forage._dbInfo.version = newVersion;\n                }\n\n                var dropObjectPromise = new Promise$1(function (resolve, reject) {\n                    var req = idb.open(options.name, newVersion);\n\n                    req.onerror = function (err) {\n                        var db = req.result;\n                        db.close();\n                        reject(err);\n                    };\n\n                    req.onupgradeneeded = function () {\n                        var db = req.result;\n                        db.deleteObjectStore(options.storeName);\n                    };\n\n                    req.onsuccess = function () {\n                        var db = req.result;\n                        db.close();\n                        resolve(db);\n                    };\n                });\n\n                return dropObjectPromise.then(function (db) {\n                    dbContext.db = db;\n                    for (var j = 0; j < forages.length; j++) {\n                        var _forage2 = forages[j];\n                        _forage2._dbInfo.db = db;\n                        _advanceReadiness(_forage2._dbInfo);\n                    }\n                })[\"catch\"](function (err) {\n                    (_rejectReadiness(options, err) || Promise$1.resolve())[\"catch\"](function () {});\n                    throw err;\n                });\n            });\n        }\n    }\n\n    executeCallback(promise, callback);\n    return promise;\n}\n\nvar asyncStorage = {\n    _driver: 'asyncStorage',\n    _initStorage: _initStorage,\n    _support: isIndexedDBValid(),\n    iterate: iterate,\n    getItem: getItem,\n    setItem: setItem,\n    removeItem: removeItem,\n    clear: clear,\n    length: length,\n    key: key,\n    keys: keys,\n    dropInstance: dropInstance\n};\n\nfunction isWebSQLValid() {\n    return typeof openDatabase === 'function';\n}\n\n// Sadly, the best way to save binary data in WebSQL/localStorage is serializing\n// it to Base64, so this is how we store it to prevent very strange errors with less\n// verbose ways of binary <-> string data storage.\nvar BASE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';\n\nvar BLOB_TYPE_PREFIX = '~~local_forage_type~';\nvar BLOB_TYPE_PREFIX_REGEX = /^~~local_forage_type~([^~]+)~/;\n\nvar SERIALIZED_MARKER = '__lfsc__:';\nvar SERIALIZED_MARKER_LENGTH = SERIALIZED_MARKER.length;\n\n// OMG the serializations!\nvar TYPE_ARRAYBUFFER = 'arbf';\nvar TYPE_BLOB = 'blob';\nvar TYPE_INT8ARRAY = 'si08';\nvar TYPE_UINT8ARRAY = 'ui08';\nvar TYPE_UINT8CLAMPEDARRAY = 'uic8';\nvar TYPE_INT16ARRAY = 'si16';\nvar TYPE_INT32ARRAY = 'si32';\nvar TYPE_UINT16ARRAY = 'ur16';\nvar TYPE_UINT32ARRAY = 'ui32';\nvar TYPE_FLOAT32ARRAY = 'fl32';\nvar TYPE_FLOAT64ARRAY = 'fl64';\nvar TYPE_SERIALIZED_MARKER_LENGTH = SERIALIZED_MARKER_LENGTH + TYPE_ARRAYBUFFER.length;\n\nvar toString$1 = Object.prototype.toString;\n\nfunction stringToBuffer(serializedString) {\n    // Fill the string into a ArrayBuffer.\n    var bufferLength = serializedString.length * 0.75;\n    var len = serializedString.length;\n    var i;\n    var p = 0;\n    var encoded1, encoded2, encoded3, encoded4;\n\n    if (serializedString[serializedString.length - 1] === '=') {\n        bufferLength--;\n        if (serializedString[serializedString.length - 2] === '=') {\n            bufferLength--;\n        }\n    }\n\n    var buffer = new ArrayBuffer(bufferLength);\n    var bytes = new Uint8Array(buffer);\n\n    for (i = 0; i < len; i += 4) {\n        encoded1 = BASE_CHARS.indexOf(serializedString[i]);\n        encoded2 = BASE_CHARS.indexOf(serializedString[i + 1]);\n        encoded3 = BASE_CHARS.indexOf(serializedString[i + 2]);\n        encoded4 = BASE_CHARS.indexOf(serializedString[i + 3]);\n\n        /*jslint bitwise: true */\n        bytes[p++] = encoded1 << 2 | encoded2 >> 4;\n        bytes[p++] = (encoded2 & 15) << 4 | encoded3 >> 2;\n        bytes[p++] = (encoded3 & 3) << 6 | encoded4 & 63;\n    }\n    return buffer;\n}\n\n// Converts a buffer to a string to store, serialized, in the backend\n// storage library.\nfunction bufferToString(buffer) {\n    // base64-arraybuffer\n    var bytes = new Uint8Array(buffer);\n    var base64String = '';\n    var i;\n\n    for (i = 0; i < bytes.length; i += 3) {\n        /*jslint bitwise: true */\n        base64String += BASE_CHARS[bytes[i] >> 2];\n        base64String += BASE_CHARS[(bytes[i] & 3) << 4 | bytes[i + 1] >> 4];\n        base64String += BASE_CHARS[(bytes[i + 1] & 15) << 2 | bytes[i + 2] >> 6];\n        base64String += BASE_CHARS[bytes[i + 2] & 63];\n    }\n\n    if (bytes.length % 3 === 2) {\n        base64String = base64String.substring(0, base64String.length - 1) + '=';\n    } else if (bytes.length % 3 === 1) {\n        base64String = base64String.substring(0, base64String.length - 2) + '==';\n    }\n\n    return base64String;\n}\n\n// Serialize a value, afterwards executing a callback (which usually\n// instructs the `setItem()` callback/promise to be executed). This is how\n// we store binary data with localStorage.\nfunction serialize(value, callback) {\n    var valueType = '';\n    if (value) {\n        valueType = toString$1.call(value);\n    }\n\n    // Cannot use `value instanceof ArrayBuffer` or such here, as these\n    // checks fail when running the tests using casper.js...\n    //\n    // TODO: See why those tests fail and use a better solution.\n    if (value && (valueType === '[object ArrayBuffer]' || value.buffer && toString$1.call(value.buffer) === '[object ArrayBuffer]')) {\n        // Convert binary arrays to a string and prefix the string with\n        // a special marker.\n        var buffer;\n        var marker = SERIALIZED_MARKER;\n\n        if (value instanceof ArrayBuffer) {\n            buffer = value;\n            marker += TYPE_ARRAYBUFFER;\n        } else {\n            buffer = value.buffer;\n\n            if (valueType === '[object Int8Array]') {\n                marker += TYPE_INT8ARRAY;\n            } else if (valueType === '[object Uint8Array]') {\n                marker += TYPE_UINT8ARRAY;\n            } else if (valueType === '[object Uint8ClampedArray]') {\n                marker += TYPE_UINT8CLAMPEDARRAY;\n            } else if (valueType === '[object Int16Array]') {\n                marker += TYPE_INT16ARRAY;\n            } else if (valueType === '[object Uint16Array]') {\n                marker += TYPE_UINT16ARRAY;\n            } else if (valueType === '[object Int32Array]') {\n                marker += TYPE_INT32ARRAY;\n            } else if (valueType === '[object Uint32Array]') {\n                marker += TYPE_UINT32ARRAY;\n            } else if (valueType === '[object Float32Array]') {\n                marker += TYPE_FLOAT32ARRAY;\n            } else if (valueType === '[object Float64Array]') {\n                marker += TYPE_FLOAT64ARRAY;\n            } else {\n                callback(new Error('Failed to get type for BinaryArray'));\n            }\n        }\n\n        callback(marker + bufferToString(buffer));\n    } else if (valueType === '[object Blob]') {\n        // Conver the blob to a binaryArray and then to a string.\n        var fileReader = new FileReader();\n\n        fileReader.onload = function () {\n            // Backwards-compatible prefix for the blob type.\n            var str = BLOB_TYPE_PREFIX + value.type + '~' + bufferToString(this.result);\n\n            callback(SERIALIZED_MARKER + TYPE_BLOB + str);\n        };\n\n        fileReader.readAsArrayBuffer(value);\n    } else {\n        try {\n            callback(JSON.stringify(value));\n        } catch (e) {\n            console.error(\"Couldn't convert value into a JSON string: \", value);\n\n            callback(null, e);\n        }\n    }\n}\n\n// Deserialize data we've inserted into a value column/field. We place\n// special markers into our strings to mark them as encoded; this isn't\n// as nice as a meta field, but it's the only sane thing we can do whilst\n// keeping localStorage support intact.\n//\n// Oftentimes this will just deserialize JSON content, but if we have a\n// special marker (SERIALIZED_MARKER, defined above), we will extract\n// some kind of arraybuffer/binary data/typed array out of the string.\nfunction deserialize(value) {\n    // If we haven't marked this string as being specially serialized (i.e.\n    // something other than serialized JSON), we can just return it and be\n    // done with it.\n    if (value.substring(0, SERIALIZED_MARKER_LENGTH) !== SERIALIZED_MARKER) {\n        return JSON.parse(value);\n    }\n\n    // The following code deals with deserializing some kind of Blob or\n    // TypedArray. First we separate out the type of data we're dealing\n    // with from the data itself.\n    var serializedString = value.substring(TYPE_SERIALIZED_MARKER_LENGTH);\n    var type = value.substring(SERIALIZED_MARKER_LENGTH, TYPE_SERIALIZED_MARKER_LENGTH);\n\n    var blobType;\n    // Backwards-compatible blob type serialization strategy.\n    // DBs created with older versions of localForage will simply not have the blob type.\n    if (type === TYPE_BLOB && BLOB_TYPE_PREFIX_REGEX.test(serializedString)) {\n        var matcher = serializedString.match(BLOB_TYPE_PREFIX_REGEX);\n        blobType = matcher[1];\n        serializedString = serializedString.substring(matcher[0].length);\n    }\n    var buffer = stringToBuffer(serializedString);\n\n    // Return the right type based on the code/type set during\n    // serialization.\n    switch (type) {\n        case TYPE_ARRAYBUFFER:\n            return buffer;\n        case TYPE_BLOB:\n            return createBlob([buffer], { type: blobType });\n        case TYPE_INT8ARRAY:\n            return new Int8Array(buffer);\n        case TYPE_UINT8ARRAY:\n            return new Uint8Array(buffer);\n        case TYPE_UINT8CLAMPEDARRAY:\n            return new Uint8ClampedArray(buffer);\n        case TYPE_INT16ARRAY:\n            return new Int16Array(buffer);\n        case TYPE_UINT16ARRAY:\n            return new Uint16Array(buffer);\n        case TYPE_INT32ARRAY:\n            return new Int32Array(buffer);\n        case TYPE_UINT32ARRAY:\n            return new Uint32Array(buffer);\n        case TYPE_FLOAT32ARRAY:\n            return new Float32Array(buffer);\n        case TYPE_FLOAT64ARRAY:\n            return new Float64Array(buffer);\n        default:\n            throw new Error('Unkown type: ' + type);\n    }\n}\n\nvar localforageSerializer = {\n    serialize: serialize,\n    deserialize: deserialize,\n    stringToBuffer: stringToBuffer,\n    bufferToString: bufferToString\n};\n\n/*\n * Includes code from:\n *\n * base64-arraybuffer\n * https://github.com/niklasvh/base64-arraybuffer\n *\n * Copyright (c) 2012 Niklas von Hertzen\n * Licensed under the MIT license.\n */\n\nfunction createDbTable(t, dbInfo, callback, errorCallback) {\n    t.executeSql('CREATE TABLE IF NOT EXISTS ' + dbInfo.storeName + ' ' + '(id INTEGER PRIMARY KEY, key unique, value)', [], callback, errorCallback);\n}\n\n// Open the WebSQL database (automatically creates one if one didn't\n// previously exist), using any options set in the config.\nfunction _initStorage$1(options) {\n    var self = this;\n    var dbInfo = {\n        db: null\n    };\n\n    if (options) {\n        for (var i in options) {\n            dbInfo[i] = typeof options[i] !== 'string' ? options[i].toString() : options[i];\n        }\n    }\n\n    var dbInfoPromise = new Promise$1(function (resolve, reject) {\n        // Open the database; the openDatabase API will automatically\n        // create it for us if it doesn't exist.\n        try {\n            dbInfo.db = openDatabase(dbInfo.name, String(dbInfo.version), dbInfo.description, dbInfo.size);\n        } catch (e) {\n            return reject(e);\n        }\n\n        // Create our key/value table if it doesn't exist.\n        dbInfo.db.transaction(function (t) {\n            createDbTable(t, dbInfo, function () {\n                self._dbInfo = dbInfo;\n                resolve();\n            }, function (t, error) {\n                reject(error);\n            });\n        }, reject);\n    });\n\n    dbInfo.serializer = localforageSerializer;\n    return dbInfoPromise;\n}\n\nfunction tryExecuteSql(t, dbInfo, sqlStatement, args, callback, errorCallback) {\n    t.executeSql(sqlStatement, args, callback, function (t, error) {\n        if (error.code === error.SYNTAX_ERR) {\n            t.executeSql('SELECT name FROM sqlite_master ' + \"WHERE type='table' AND name = ?\", [dbInfo.storeName], function (t, results) {\n                if (!results.rows.length) {\n                    // if the table is missing (was deleted)\n                    // re-create it table and retry\n                    createDbTable(t, dbInfo, function () {\n                        t.executeSql(sqlStatement, args, callback, errorCallback);\n                    }, errorCallback);\n                } else {\n                    errorCallback(t, error);\n                }\n            }, errorCallback);\n        } else {\n            errorCallback(t, error);\n        }\n    }, errorCallback);\n}\n\nfunction getItem$1(key, callback) {\n    var self = this;\n\n    key = normalizeKey(key);\n\n    var promise = new Promise$1(function (resolve, reject) {\n        self.ready().then(function () {\n            var dbInfo = self._dbInfo;\n            dbInfo.db.transaction(function (t) {\n                tryExecuteSql(t, dbInfo, 'SELECT * FROM ' + dbInfo.storeName + ' WHERE key = ? LIMIT 1', [key], function (t, results) {\n                    var result = results.rows.length ? results.rows.item(0).value : null;\n\n                    // Check to see if this is serialized content we need to\n                    // unpack.\n                    if (result) {\n                        result = dbInfo.serializer.deserialize(result);\n                    }\n\n                    resolve(result);\n                }, function (t, error) {\n                    reject(error);\n                });\n            });\n        })[\"catch\"](reject);\n    });\n\n    executeCallback(promise, callback);\n    return promise;\n}\n\nfunction iterate$1(iterator, callback) {\n    var self = this;\n\n    var promise = new Promise$1(function (resolve, reject) {\n        self.ready().then(function () {\n            var dbInfo = self._dbInfo;\n\n            dbInfo.db.transaction(function (t) {\n                tryExecuteSql(t, dbInfo, 'SELECT * FROM ' + dbInfo.storeName, [], function (t, results) {\n                    var rows = results.rows;\n                    var length = rows.length;\n\n                    for (var i = 0; i < length; i++) {\n                        var item = rows.item(i);\n                        var result = item.value;\n\n                        // Check to see if this is serialized content\n                        // we need to unpack.\n                        if (result) {\n                            result = dbInfo.serializer.deserialize(result);\n                        }\n\n                        result = iterator(result, item.key, i + 1);\n\n                        // void(0) prevents problems with redefinition\n                        // of `undefined`.\n                        if (result !== void 0) {\n                            resolve(result);\n                            return;\n                        }\n                    }\n\n                    resolve();\n                }, function (t, error) {\n                    reject(error);\n                });\n            });\n        })[\"catch\"](reject);\n    });\n\n    executeCallback(promise, callback);\n    return promise;\n}\n\nfunction _setItem(key, value, callback, retriesLeft) {\n    var self = this;\n\n    key = normalizeKey(key);\n\n    var promise = new Promise$1(function (resolve, reject) {\n        self.ready().then(function () {\n            // The localStorage API doesn't return undefined values in an\n            // \"expected\" way, so undefined is always cast to null in all\n            // drivers. See: https://github.com/mozilla/localForage/pull/42\n            if (value === undefined) {\n                value = null;\n            }\n\n            // Save the original value to pass to the callback.\n            var originalValue = value;\n\n            var dbInfo = self._dbInfo;\n            dbInfo.serializer.serialize(value, function (value, error) {\n                if (error) {\n                    reject(error);\n                } else {\n                    dbInfo.db.transaction(function (t) {\n                        tryExecuteSql(t, dbInfo, 'INSERT OR REPLACE INTO ' + dbInfo.storeName + ' ' + '(key, value) VALUES (?, ?)', [key, value], function () {\n                            resolve(originalValue);\n                        }, function (t, error) {\n                            reject(error);\n                        });\n                    }, function (sqlError) {\n                        // The transaction failed; check\n                        // to see if it's a quota error.\n                        if (sqlError.code === sqlError.QUOTA_ERR) {\n                            // We reject the callback outright for now, but\n                            // it's worth trying to re-run the transaction.\n                            // Even if the user accepts the prompt to use\n                            // more storage on Safari, this error will\n                            // be called.\n                            //\n                            // Try to re-run the transaction.\n                            if (retriesLeft > 0) {\n                                resolve(_setItem.apply(self, [key, originalValue, callback, retriesLeft - 1]));\n                                return;\n                            }\n                            reject(sqlError);\n                        }\n                    });\n                }\n            });\n        })[\"catch\"](reject);\n    });\n\n    executeCallback(promise, callback);\n    return promise;\n}\n\nfunction setItem$1(key, value, callback) {\n    return _setItem.apply(this, [key, value, callback, 1]);\n}\n\nfunction removeItem$1(key, callback) {\n    var self = this;\n\n    key = normalizeKey(key);\n\n    var promise = new Promise$1(function (resolve, reject) {\n        self.ready().then(function () {\n            var dbInfo = self._dbInfo;\n            dbInfo.db.transaction(function (t) {\n                tryExecuteSql(t, dbInfo, 'DELETE FROM ' + dbInfo.storeName + ' WHERE key = ?', [key], function () {\n                    resolve();\n                }, function (t, error) {\n                    reject(error);\n                });\n            });\n        })[\"catch\"](reject);\n    });\n\n    executeCallback(promise, callback);\n    return promise;\n}\n\n// Deletes every item in the table.\n// TODO: Find out if this resets the AUTO_INCREMENT number.\nfunction clear$1(callback) {\n    var self = this;\n\n    var promise = new Promise$1(function (resolve, reject) {\n        self.ready().then(function () {\n            var dbInfo = self._dbInfo;\n            dbInfo.db.transaction(function (t) {\n                tryExecuteSql(t, dbInfo, 'DELETE FROM ' + dbInfo.storeName, [], function () {\n                    resolve();\n                }, function (t, error) {\n                    reject(error);\n                });\n            });\n        })[\"catch\"](reject);\n    });\n\n    executeCallback(promise, callback);\n    return promise;\n}\n\n// Does a simple `COUNT(key)` to get the number of items stored in\n// localForage.\nfunction length$1(callback) {\n    var self = this;\n\n    var promise = new Promise$1(function (resolve, reject) {\n        self.ready().then(function () {\n            var dbInfo = self._dbInfo;\n            dbInfo.db.transaction(function (t) {\n                // Ahhh, SQL makes this one soooooo easy.\n                tryExecuteSql(t, dbInfo, 'SELECT COUNT(key) as c FROM ' + dbInfo.storeName, [], function (t, results) {\n                    var result = results.rows.item(0).c;\n                    resolve(result);\n                }, function (t, error) {\n                    reject(error);\n                });\n            });\n        })[\"catch\"](reject);\n    });\n\n    executeCallback(promise, callback);\n    return promise;\n}\n\n// Return the key located at key index X; essentially gets the key from a\n// `WHERE id = ?`. This is the most efficient way I can think to implement\n// this rarely-used (in my experience) part of the API, but it can seem\n// inconsistent, because we do `INSERT OR REPLACE INTO` on `setItem()`, so\n// the ID of each key will change every time it's updated. Perhaps a stored\n// procedure for the `setItem()` SQL would solve this problem?\n// TODO: Don't change ID on `setItem()`.\nfunction key$1(n, callback) {\n    var self = this;\n\n    var promise = new Promise$1(function (resolve, reject) {\n        self.ready().then(function () {\n            var dbInfo = self._dbInfo;\n            dbInfo.db.transaction(function (t) {\n                tryExecuteSql(t, dbInfo, 'SELECT key FROM ' + dbInfo.storeName + ' WHERE id = ? LIMIT 1', [n + 1], function (t, results) {\n                    var result = results.rows.length ? results.rows.item(0).key : null;\n                    resolve(result);\n                }, function (t, error) {\n                    reject(error);\n                });\n            });\n        })[\"catch\"](reject);\n    });\n\n    executeCallback(promise, callback);\n    return promise;\n}\n\nfunction keys$1(callback) {\n    var self = this;\n\n    var promise = new Promise$1(function (resolve, reject) {\n        self.ready().then(function () {\n            var dbInfo = self._dbInfo;\n            dbInfo.db.transaction(function (t) {\n                tryExecuteSql(t, dbInfo, 'SELECT key FROM ' + dbInfo.storeName, [], function (t, results) {\n                    var keys = [];\n\n                    for (var i = 0; i < results.rows.length; i++) {\n                        keys.push(results.rows.item(i).key);\n                    }\n\n                    resolve(keys);\n                }, function (t, error) {\n                    reject(error);\n                });\n            });\n        })[\"catch\"](reject);\n    });\n\n    executeCallback(promise, callback);\n    return promise;\n}\n\n// https://www.w3.org/TR/webdatabase/#databases\n// > There is no way to enumerate or delete the databases available for an origin from this API.\nfunction getAllStoreNames(db) {\n    return new Promise$1(function (resolve, reject) {\n        db.transaction(function (t) {\n            t.executeSql('SELECT name FROM sqlite_master ' + \"WHERE type='table' AND name <> '__WebKitDatabaseInfoTable__'\", [], function (t, results) {\n                var storeNames = [];\n\n                for (var i = 0; i < results.rows.length; i++) {\n                    storeNames.push(results.rows.item(i).name);\n                }\n\n                resolve({\n                    db: db,\n                    storeNames: storeNames\n                });\n            }, function (t, error) {\n                reject(error);\n            });\n        }, function (sqlError) {\n            reject(sqlError);\n        });\n    });\n}\n\nfunction dropInstance$1(options, callback) {\n    callback = getCallback.apply(this, arguments);\n\n    var currentConfig = this.config();\n    options = typeof options !== 'function' && options || {};\n    if (!options.name) {\n        options.name = options.name || currentConfig.name;\n        options.storeName = options.storeName || currentConfig.storeName;\n    }\n\n    var self = this;\n    var promise;\n    if (!options.name) {\n        promise = Promise$1.reject('Invalid arguments');\n    } else {\n        promise = new Promise$1(function (resolve) {\n            var db;\n            if (options.name === currentConfig.name) {\n                // use the db reference of the current instance\n                db = self._dbInfo.db;\n            } else {\n                db = openDatabase(options.name, '', '', 0);\n            }\n\n            if (!options.storeName) {\n                // drop all database tables\n                resolve(getAllStoreNames(db));\n            } else {\n                resolve({\n                    db: db,\n                    storeNames: [options.storeName]\n                });\n            }\n        }).then(function (operationInfo) {\n            return new Promise$1(function (resolve, reject) {\n                operationInfo.db.transaction(function (t) {\n                    function dropTable(storeName) {\n                        return new Promise$1(function (resolve, reject) {\n                            t.executeSql('DROP TABLE IF EXISTS ' + storeName, [], function () {\n                                resolve();\n                            }, function (t, error) {\n                                reject(error);\n                            });\n                        });\n                    }\n\n                    var operations = [];\n                    for (var i = 0, len = operationInfo.storeNames.length; i < len; i++) {\n                        operations.push(dropTable(operationInfo.storeNames[i]));\n                    }\n\n                    Promise$1.all(operations).then(function () {\n                        resolve();\n                    })[\"catch\"](function (e) {\n                        reject(e);\n                    });\n                }, function (sqlError) {\n                    reject(sqlError);\n                });\n            });\n        });\n    }\n\n    executeCallback(promise, callback);\n    return promise;\n}\n\nvar webSQLStorage = {\n    _driver: 'webSQLStorage',\n    _initStorage: _initStorage$1,\n    _support: isWebSQLValid(),\n    iterate: iterate$1,\n    getItem: getItem$1,\n    setItem: setItem$1,\n    removeItem: removeItem$1,\n    clear: clear$1,\n    length: length$1,\n    key: key$1,\n    keys: keys$1,\n    dropInstance: dropInstance$1\n};\n\nfunction isLocalStorageValid() {\n    try {\n        return typeof localStorage !== 'undefined' && 'setItem' in localStorage &&\n        // in IE8 typeof localStorage.setItem === 'object'\n        !!localStorage.setItem;\n    } catch (e) {\n        return false;\n    }\n}\n\nfunction _getKeyPrefix(options, defaultConfig) {\n    var keyPrefix = options.name + '/';\n\n    if (options.storeName !== defaultConfig.storeName) {\n        keyPrefix += options.storeName + '/';\n    }\n    return keyPrefix;\n}\n\n// Check if localStorage throws when saving an item\nfunction checkIfLocalStorageThrows() {\n    var localStorageTestKey = '_localforage_support_test';\n\n    try {\n        localStorage.setItem(localStorageTestKey, true);\n        localStorage.removeItem(localStorageTestKey);\n\n        return false;\n    } catch (e) {\n        return true;\n    }\n}\n\n// Check if localStorage is usable and allows to save an item\n// This method checks if localStorage is usable in Safari Private Browsing\n// mode, or in any other case where the available quota for localStorage\n// is 0 and there wasn't any saved items yet.\nfunction _isLocalStorageUsable() {\n    return !checkIfLocalStorageThrows() || localStorage.length > 0;\n}\n\n// Config the localStorage backend, using options set in the config.\nfunction _initStorage$2(options) {\n    var self = this;\n    var dbInfo = {};\n    if (options) {\n        for (var i in options) {\n            dbInfo[i] = options[i];\n        }\n    }\n\n    dbInfo.keyPrefix = _getKeyPrefix(options, self._defaultConfig);\n\n    if (!_isLocalStorageUsable()) {\n        return Promise$1.reject();\n    }\n\n    self._dbInfo = dbInfo;\n    dbInfo.serializer = localforageSerializer;\n\n    return Promise$1.resolve();\n}\n\n// Remove all keys from the datastore, effectively destroying all data in\n// the app's key/value store!\nfunction clear$2(callback) {\n    var self = this;\n    var promise = self.ready().then(function () {\n        var keyPrefix = self._dbInfo.keyPrefix;\n\n        for (var i = localStorage.length - 1; i >= 0; i--) {\n            var key = localStorage.key(i);\n\n            if (key.indexOf(keyPrefix) === 0) {\n                localStorage.removeItem(key);\n            }\n        }\n    });\n\n    executeCallback(promise, callback);\n    return promise;\n}\n\n// Retrieve an item from the store. Unlike the original async_storage\n// library in Gaia, we don't modify return values at all. If a key's value\n// is `undefined`, we pass that value to the callback function.\nfunction getItem$2(key, callback) {\n    var self = this;\n\n    key = normalizeKey(key);\n\n    var promise = self.ready().then(function () {\n        var dbInfo = self._dbInfo;\n        var result = localStorage.getItem(dbInfo.keyPrefix + key);\n\n        // If a result was found, parse it from the serialized\n        // string into a JS object. If result isn't truthy, the key\n        // is likely undefined and we'll pass it straight to the\n        // callback.\n        if (result) {\n            result = dbInfo.serializer.deserialize(result);\n        }\n\n        return result;\n    });\n\n    executeCallback(promise, callback);\n    return promise;\n}\n\n// Iterate over all items in the store.\nfunction iterate$2(iterator, callback) {\n    var self = this;\n\n    var promise = self.ready().then(function () {\n        var dbInfo = self._dbInfo;\n        var keyPrefix = dbInfo.keyPrefix;\n        var keyPrefixLength = keyPrefix.length;\n        var length = localStorage.length;\n\n        // We use a dedicated iterator instead of the `i` variable below\n        // so other keys we fetch in localStorage aren't counted in\n        // the `iterationNumber` argument passed to the `iterate()`\n        // callback.\n        //\n        // See: github.com/mozilla/localForage/pull/435#discussion_r38061530\n        var iterationNumber = 1;\n\n        for (var i = 0; i < length; i++) {\n            var key = localStorage.key(i);\n            if (key.indexOf(keyPrefix) !== 0) {\n                continue;\n            }\n            var value = localStorage.getItem(key);\n\n            // If a result was found, parse it from the serialized\n            // string into a JS object. If result isn't truthy, the\n            // key is likely undefined and we'll pass it straight\n            // to the iterator.\n            if (value) {\n                value = dbInfo.serializer.deserialize(value);\n            }\n\n            value = iterator(value, key.substring(keyPrefixLength), iterationNumber++);\n\n            if (value !== void 0) {\n                return value;\n            }\n        }\n    });\n\n    executeCallback(promise, callback);\n    return promise;\n}\n\n// Same as localStorage's key() method, except takes a callback.\nfunction key$2(n, callback) {\n    var self = this;\n    var promise = self.ready().then(function () {\n        var dbInfo = self._dbInfo;\n        var result;\n        try {\n            result = localStorage.key(n);\n        } catch (error) {\n            result = null;\n        }\n\n        // Remove the prefix from the key, if a key is found.\n        if (result) {\n            result = result.substring(dbInfo.keyPrefix.length);\n        }\n\n        return result;\n    });\n\n    executeCallback(promise, callback);\n    return promise;\n}\n\nfunction keys$2(callback) {\n    var self = this;\n    var promise = self.ready().then(function () {\n        var dbInfo = self._dbInfo;\n        var length = localStorage.length;\n        var keys = [];\n\n        for (var i = 0; i < length; i++) {\n            var itemKey = localStorage.key(i);\n            if (itemKey.indexOf(dbInfo.keyPrefix) === 0) {\n                keys.push(itemKey.substring(dbInfo.keyPrefix.length));\n            }\n        }\n\n        return keys;\n    });\n\n    executeCallback(promise, callback);\n    return promise;\n}\n\n// Supply the number of keys in the datastore to the callback function.\nfunction length$2(callback) {\n    var self = this;\n    var promise = self.keys().then(function (keys) {\n        return keys.length;\n    });\n\n    executeCallback(promise, callback);\n    return promise;\n}\n\n// Remove an item from the store, nice and simple.\nfunction removeItem$2(key, callback) {\n    var self = this;\n\n    key = normalizeKey(key);\n\n    var promise = self.ready().then(function () {\n        var dbInfo = self._dbInfo;\n        localStorage.removeItem(dbInfo.keyPrefix + key);\n    });\n\n    executeCallback(promise, callback);\n    return promise;\n}\n\n// Set a key's value and run an optional callback once the value is set.\n// Unlike Gaia's implementation, the callback function is passed the value,\n// in case you want to operate on that value only after you're sure it\n// saved, or something like that.\nfunction setItem$2(key, value, callback) {\n    var self = this;\n\n    key = normalizeKey(key);\n\n    var promise = self.ready().then(function () {\n        // Convert undefined values to null.\n        // https://github.com/mozilla/localForage/pull/42\n        if (value === undefined) {\n            value = null;\n        }\n\n        // Save the original value to pass to the callback.\n        var originalValue = value;\n\n        return new Promise$1(function (resolve, reject) {\n            var dbInfo = self._dbInfo;\n            dbInfo.serializer.serialize(value, function (value, error) {\n                if (error) {\n                    reject(error);\n                } else {\n                    try {\n                        localStorage.setItem(dbInfo.keyPrefix + key, value);\n                        resolve(originalValue);\n                    } catch (e) {\n                        // localStorage capacity exceeded.\n                        // TODO: Make this a specific error/event.\n                        if (e.name === 'QuotaExceededError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {\n                            reject(e);\n                        }\n                        reject(e);\n                    }\n                }\n            });\n        });\n    });\n\n    executeCallback(promise, callback);\n    return promise;\n}\n\nfunction dropInstance$2(options, callback) {\n    callback = getCallback.apply(this, arguments);\n\n    options = typeof options !== 'function' && options || {};\n    if (!options.name) {\n        var currentConfig = this.config();\n        options.name = options.name || currentConfig.name;\n        options.storeName = options.storeName || currentConfig.storeName;\n    }\n\n    var self = this;\n    var promise;\n    if (!options.name) {\n        promise = Promise$1.reject('Invalid arguments');\n    } else {\n        promise = new Promise$1(function (resolve) {\n            if (!options.storeName) {\n                resolve(options.name + '/');\n            } else {\n                resolve(_getKeyPrefix(options, self._defaultConfig));\n            }\n        }).then(function (keyPrefix) {\n            for (var i = localStorage.length - 1; i >= 0; i--) {\n                var key = localStorage.key(i);\n\n                if (key.indexOf(keyPrefix) === 0) {\n                    localStorage.removeItem(key);\n                }\n            }\n        });\n    }\n\n    executeCallback(promise, callback);\n    return promise;\n}\n\nvar localStorageWrapper = {\n    _driver: 'localStorageWrapper',\n    _initStorage: _initStorage$2,\n    _support: isLocalStorageValid(),\n    iterate: iterate$2,\n    getItem: getItem$2,\n    setItem: setItem$2,\n    removeItem: removeItem$2,\n    clear: clear$2,\n    length: length$2,\n    key: key$2,\n    keys: keys$2,\n    dropInstance: dropInstance$2\n};\n\nvar sameValue = function sameValue(x, y) {\n    return x === y || typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y);\n};\n\nvar includes = function includes(array, searchElement) {\n    var len = array.length;\n    var i = 0;\n    while (i < len) {\n        if (sameValue(array[i], searchElement)) {\n            return true;\n        }\n        i++;\n    }\n\n    return false;\n};\n\nvar isArray = Array.isArray || function (arg) {\n    return Object.prototype.toString.call(arg) === '[object Array]';\n};\n\n// Drivers are stored here when `defineDriver()` is called.\n// They are shared across all instances of localForage.\nvar DefinedDrivers = {};\n\nvar DriverSupport = {};\n\nvar DefaultDrivers = {\n    INDEXEDDB: asyncStorage,\n    WEBSQL: webSQLStorage,\n    LOCALSTORAGE: localStorageWrapper\n};\n\nvar DefaultDriverOrder = [DefaultDrivers.INDEXEDDB._driver, DefaultDrivers.WEBSQL._driver, DefaultDrivers.LOCALSTORAGE._driver];\n\nvar OptionalDriverMethods = ['dropInstance'];\n\nvar LibraryMethods = ['clear', 'getItem', 'iterate', 'key', 'keys', 'length', 'removeItem', 'setItem'].concat(OptionalDriverMethods);\n\nvar DefaultConfig = {\n    description: '',\n    driver: DefaultDriverOrder.slice(),\n    name: 'localforage',\n    // Default DB size is _JUST UNDER_ 5MB, as it's the highest size\n    // we can use without a prompt.\n    size: 4980736,\n    storeName: 'keyvaluepairs',\n    version: 1.0\n};\n\nfunction callWhenReady(localForageInstance, libraryMethod) {\n    localForageInstance[libraryMethod] = function () {\n        var _args = arguments;\n        return localForageInstance.ready().then(function () {\n            return localForageInstance[libraryMethod].apply(localForageInstance, _args);\n        });\n    };\n}\n\nfunction extend() {\n    for (var i = 1; i < arguments.length; i++) {\n        var arg = arguments[i];\n\n        if (arg) {\n            for (var _key in arg) {\n                if (arg.hasOwnProperty(_key)) {\n                    if (isArray(arg[_key])) {\n                        arguments[0][_key] = arg[_key].slice();\n                    } else {\n                        arguments[0][_key] = arg[_key];\n                    }\n                }\n            }\n        }\n    }\n\n    return arguments[0];\n}\n\nvar LocalForage = function () {\n    function LocalForage(options) {\n        _classCallCheck(this, LocalForage);\n\n        for (var driverTypeKey in DefaultDrivers) {\n            if (DefaultDrivers.hasOwnProperty(driverTypeKey)) {\n                var driver = DefaultDrivers[driverTypeKey];\n                var driverName = driver._driver;\n                this[driverTypeKey] = driverName;\n\n                if (!DefinedDrivers[driverName]) {\n                    // we don't need to wait for the promise,\n                    // since the default drivers can be defined\n                    // in a blocking manner\n                    this.defineDriver(driver);\n                }\n            }\n        }\n\n        this._defaultConfig = extend({}, DefaultConfig);\n        this._config = extend({}, this._defaultConfig, options);\n        this._driverSet = null;\n        this._initDriver = null;\n        this._ready = false;\n        this._dbInfo = null;\n\n        this._wrapLibraryMethodsWithReady();\n        this.setDriver(this._config.driver)[\"catch\"](function () {});\n    }\n\n    // Set any config values for localForage; can be called anytime before\n    // the first API call (e.g. `getItem`, `setItem`).\n    // We loop through options so we don't overwrite existing config\n    // values.\n\n\n    LocalForage.prototype.config = function config(options) {\n        // If the options argument is an object, we use it to set values.\n        // Otherwise, we return either a specified config value or all\n        // config values.\n        if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object') {\n            // If localforage is ready and fully initialized, we can't set\n            // any new configuration values. Instead, we return an error.\n            if (this._ready) {\n                return new Error(\"Can't call config() after localforage \" + 'has been used.');\n            }\n\n            for (var i in options) {\n                if (i === 'storeName') {\n                    options[i] = options[i].replace(/\\W/g, '_');\n                }\n\n                if (i === 'version' && typeof options[i] !== 'number') {\n                    return new Error('Database version must be a number.');\n                }\n\n                this._config[i] = options[i];\n            }\n\n            // after all config options are set and\n            // the driver option is used, try setting it\n            if ('driver' in options && options.driver) {\n                return this.setDriver(this._config.driver);\n            }\n\n            return true;\n        } else if (typeof options === 'string') {\n            return this._config[options];\n        } else {\n            return this._config;\n        }\n    };\n\n    // Used to define a custom driver, shared across all instances of\n    // localForage.\n\n\n    LocalForage.prototype.defineDriver = function defineDriver(driverObject, callback, errorCallback) {\n        var promise = new Promise$1(function (resolve, reject) {\n            try {\n                var driverName = driverObject._driver;\n                var complianceError = new Error('Custom driver not compliant; see ' + 'https://mozilla.github.io/localForage/#definedriver');\n\n                // A driver name should be defined and not overlap with the\n                // library-defined, default drivers.\n                if (!driverObject._driver) {\n                    reject(complianceError);\n                    return;\n                }\n\n                var driverMethods = LibraryMethods.concat('_initStorage');\n                for (var i = 0, len = driverMethods.length; i < len; i++) {\n                    var driverMethodName = driverMethods[i];\n\n                    // when the property is there,\n                    // it should be a method even when optional\n                    var isRequired = !includes(OptionalDriverMethods, driverMethodName);\n                    if ((isRequired || driverObject[driverMethodName]) && typeof driverObject[driverMethodName] !== 'function') {\n                        reject(complianceError);\n                        return;\n                    }\n                }\n\n                var configureMissingMethods = function configureMissingMethods() {\n                    var methodNotImplementedFactory = function methodNotImplementedFactory(methodName) {\n                        return function () {\n                            var error = new Error('Method ' + methodName + ' is not implemented by the current driver');\n                            var promise = Promise$1.reject(error);\n                            executeCallback(promise, arguments[arguments.length - 1]);\n                            return promise;\n                        };\n                    };\n\n                    for (var _i = 0, _len = OptionalDriverMethods.length; _i < _len; _i++) {\n                        var optionalDriverMethod = OptionalDriverMethods[_i];\n                        if (!driverObject[optionalDriverMethod]) {\n                            driverObject[optionalDriverMethod] = methodNotImplementedFactory(optionalDriverMethod);\n                        }\n                    }\n                };\n\n                configureMissingMethods();\n\n                var setDriverSupport = function setDriverSupport(support) {\n                    if (DefinedDrivers[driverName]) {\n                        console.info('Redefining LocalForage driver: ' + driverName);\n                    }\n                    DefinedDrivers[driverName] = driverObject;\n                    DriverSupport[driverName] = support;\n                    // don't use a then, so that we can define\n                    // drivers that have simple _support methods\n                    // in a blocking manner\n                    resolve();\n                };\n\n                if ('_support' in driverObject) {\n                    if (driverObject._support && typeof driverObject._support === 'function') {\n                        driverObject._support().then(setDriverSupport, reject);\n                    } else {\n                        setDriverSupport(!!driverObject._support);\n                    }\n                } else {\n                    setDriverSupport(true);\n                }\n            } catch (e) {\n                reject(e);\n            }\n        });\n\n        executeTwoCallbacks(promise, callback, errorCallback);\n        return promise;\n    };\n\n    LocalForage.prototype.driver = function driver() {\n        return this._driver || null;\n    };\n\n    LocalForage.prototype.getDriver = function getDriver(driverName, callback, errorCallback) {\n        var getDriverPromise = DefinedDrivers[driverName] ? Promise$1.resolve(DefinedDrivers[driverName]) : Promise$1.reject(new Error('Driver not found.'));\n\n        executeTwoCallbacks(getDriverPromise, callback, errorCallback);\n        return getDriverPromise;\n    };\n\n    LocalForage.prototype.getSerializer = function getSerializer(callback) {\n        var serializerPromise = Promise$1.resolve(localforageSerializer);\n        executeTwoCallbacks(serializerPromise, callback);\n        return serializerPromise;\n    };\n\n    LocalForage.prototype.ready = function ready(callback) {\n        var self = this;\n\n        var promise = self._driverSet.then(function () {\n            if (self._ready === null) {\n                self._ready = self._initDriver();\n            }\n\n            return self._ready;\n        });\n\n        executeTwoCallbacks(promise, callback, callback);\n        return promise;\n    };\n\n    LocalForage.prototype.setDriver = function setDriver(drivers, callback, errorCallback) {\n        var self = this;\n\n        if (!isArray(drivers)) {\n            drivers = [drivers];\n        }\n\n        var supportedDrivers = this._getSupportedDrivers(drivers);\n\n        function setDriverToConfig() {\n            self._config.driver = self.driver();\n        }\n\n        function extendSelfWithDriver(driver) {\n            self._extend(driver);\n            setDriverToConfig();\n\n            self._ready = self._initStorage(self._config);\n            return self._ready;\n        }\n\n        function initDriver(supportedDrivers) {\n            return function () {\n                var currentDriverIndex = 0;\n\n                function driverPromiseLoop() {\n                    while (currentDriverIndex < supportedDrivers.length) {\n                        var driverName = supportedDrivers[currentDriverIndex];\n                        currentDriverIndex++;\n\n                        self._dbInfo = null;\n                        self._ready = null;\n\n                        return self.getDriver(driverName).then(extendSelfWithDriver)[\"catch\"](driverPromiseLoop);\n                    }\n\n                    setDriverToConfig();\n                    var error = new Error('No available storage method found.');\n                    self._driverSet = Promise$1.reject(error);\n                    return self._driverSet;\n                }\n\n                return driverPromiseLoop();\n            };\n        }\n\n        // There might be a driver initialization in progress\n        // so wait for it to finish in order to avoid a possible\n        // race condition to set _dbInfo\n        var oldDriverSetDone = this._driverSet !== null ? this._driverSet[\"catch\"](function () {\n            return Promise$1.resolve();\n        }) : Promise$1.resolve();\n\n        this._driverSet = oldDriverSetDone.then(function () {\n            var driverName = supportedDrivers[0];\n            self._dbInfo = null;\n            self._ready = null;\n\n            return self.getDriver(driverName).then(function (driver) {\n                self._driver = driver._driver;\n                setDriverToConfig();\n                self._wrapLibraryMethodsWithReady();\n                self._initDriver = initDriver(supportedDrivers);\n            });\n        })[\"catch\"](function () {\n            setDriverToConfig();\n            var error = new Error('No available storage method found.');\n            self._driverSet = Promise$1.reject(error);\n            return self._driverSet;\n        });\n\n        executeTwoCallbacks(this._driverSet, callback, errorCallback);\n        return this._driverSet;\n    };\n\n    LocalForage.prototype.supports = function supports(driverName) {\n        return !!DriverSupport[driverName];\n    };\n\n    LocalForage.prototype._extend = function _extend(libraryMethodsAndProperties) {\n        extend(this, libraryMethodsAndProperties);\n    };\n\n    LocalForage.prototype._getSupportedDrivers = function _getSupportedDrivers(drivers) {\n        var supportedDrivers = [];\n        for (var i = 0, len = drivers.length; i < len; i++) {\n            var driverName = drivers[i];\n            if (this.supports(driverName)) {\n                supportedDrivers.push(driverName);\n            }\n        }\n        return supportedDrivers;\n    };\n\n    LocalForage.prototype._wrapLibraryMethodsWithReady = function _wrapLibraryMethodsWithReady() {\n        // Add a stub for each driver API method that delays the call to the\n        // corresponding driver method until localForage is ready. These stubs\n        // will be replaced by the driver methods as soon as the driver is\n        // loaded, so there is no performance impact.\n        for (var i = 0, len = LibraryMethods.length; i < len; i++) {\n            callWhenReady(this, LibraryMethods[i]);\n        }\n    };\n\n    LocalForage.prototype.createInstance = function createInstance(options) {\n        return new LocalForage(options);\n    };\n\n    return LocalForage;\n}();\n\n// The actual localForage object that we expose as a module or via a\n// global. It's extended by pulling in one of our other libraries.\n\n\nvar localforage_js = new LocalForage();\n\nmodule.exports = localforage_js;\n\n},{\"3\":3}]},{},[4])(4)\n});\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(7)))\n\n/***/ }),\n/* 3 */\n/***/ (function(module, exports) {\n\nfunction _classCallCheck(instance, Constructor) {\n  if (!(instance instanceof Constructor)) {\n    throw new TypeError(\"Cannot call a class as a function\");\n  }\n}\n\nmodule.exports = _classCallCheck;\n\n/***/ }),\n/* 4 */\n/***/ (function(module, exports) {\n\nfunction _defineProperties(target, props) {\n  for (var i = 0; i < props.length; i++) {\n    var descriptor = props[i];\n    descriptor.enumerable = descriptor.enumerable || false;\n    descriptor.configurable = true;\n    if (\"value\" in descriptor) descriptor.writable = true;\n    Object.defineProperty(target, descriptor.key, descriptor);\n  }\n}\n\nfunction _createClass(Constructor, protoProps, staticProps) {\n  if (protoProps) _defineProperties(Constructor.prototype, protoProps);\n  if (staticProps) _defineProperties(Constructor, staticProps);\n  return Constructor;\n}\n\nmodule.exports = _createClass;\n\n/***/ }),\n/* 5 */\n/***/ (function(module, exports) {\n\nfunction _typeof2(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof2(obj); }\n\nfunction _typeof(obj) {\n  if (typeof Symbol === \"function\" && _typeof2(Symbol.iterator) === \"symbol\") {\n    module.exports = _typeof = function _typeof(obj) {\n      return _typeof2(obj);\n    };\n  } else {\n    module.exports = _typeof = function _typeof(obj) {\n      return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : _typeof2(obj);\n    };\n  }\n\n  return _typeof(obj);\n}\n\nmodule.exports = _typeof;\n\n/***/ }),\n/* 6 */\n/***/ (function(module, exports, __webpack_require__) {\n\nmodule.exports = __webpack_require__.p + \"5e206a8f21790c38ae50cf54b7b9aca7.wasm\";\n\n/***/ }),\n/* 7 */\n/***/ (function(module, exports) {\n\nvar g;\n\n// This works in non-strict mode\ng = (function() {\n\treturn this;\n})();\n\ntry {\n\t// This works if eval is allowed (see CSP)\n\tg = g || new Function(\"return this\")();\n} catch (e) {\n\t// This works if the window reference is available\n\tif (typeof window === \"object\") g = window;\n}\n\n// g can still be undefined, but nothing to do about it...\n// We return undefined, instead of nothing here, so it's\n// easier to handle this case. if(!global) { ...}\n\nmodule.exports = g;\n\n\n/***/ }),\n/* 8 */\n/***/ (function(module, exports, __webpack_require__) {\n\n/**\n * Copyright (c) 2014-present, Facebook, Inc.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE file in the root directory of this source tree.\n */\n\nvar runtime = (function (exports) {\n  \"use strict\";\n\n  var Op = Object.prototype;\n  var hasOwn = Op.hasOwnProperty;\n  var undefined; // More compressible than void 0.\n  var $Symbol = typeof Symbol === \"function\" ? Symbol : {};\n  var iteratorSymbol = $Symbol.iterator || \"@@iterator\";\n  var asyncIteratorSymbol = $Symbol.asyncIterator || \"@@asyncIterator\";\n  var toStringTagSymbol = $Symbol.toStringTag || \"@@toStringTag\";\n\n  function wrap(innerFn, outerFn, self, tryLocsList) {\n    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.\n    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;\n    var generator = Object.create(protoGenerator.prototype);\n    var context = new Context(tryLocsList || []);\n\n    // The ._invoke method unifies the implementations of the .next,\n    // .throw, and .return methods.\n    generator._invoke = makeInvokeMethod(innerFn, self, context);\n\n    return generator;\n  }\n  exports.wrap = wrap;\n\n  // Try/catch helper to minimize deoptimizations. Returns a completion\n  // record like context.tryEntries[i].completion. This interface could\n  // have been (and was previously) designed to take a closure to be\n  // invoked without arguments, but in all the cases we care about we\n  // already have an existing method we want to call, so there's no need\n  // to create a new function object. We can even get away with assuming\n  // the method takes exactly one argument, since that happens to be true\n  // in every case, so we don't have to touch the arguments object. The\n  // only additional allocation required is the completion record, which\n  // has a stable shape and so hopefully should be cheap to allocate.\n  function tryCatch(fn, obj, arg) {\n    try {\n      return { type: \"normal\", arg: fn.call(obj, arg) };\n    } catch (err) {\n      return { type: \"throw\", arg: err };\n    }\n  }\n\n  var GenStateSuspendedStart = \"suspendedStart\";\n  var GenStateSuspendedYield = \"suspendedYield\";\n  var GenStateExecuting = \"executing\";\n  var GenStateCompleted = \"completed\";\n\n  // Returning this object from the innerFn has the same effect as\n  // breaking out of the dispatch switch statement.\n  var ContinueSentinel = {};\n\n  // Dummy constructor functions that we use as the .constructor and\n  // .constructor.prototype properties for functions that return Generator\n  // objects. For full spec compliance, you may wish to configure your\n  // minifier not to mangle the names of these two functions.\n  function Generator() {}\n  function GeneratorFunction() {}\n  function GeneratorFunctionPrototype() {}\n\n  // This is a polyfill for %IteratorPrototype% for environments that\n  // don't natively support it.\n  var IteratorPrototype = {};\n  IteratorPrototype[iteratorSymbol] = function () {\n    return this;\n  };\n\n  var getProto = Object.getPrototypeOf;\n  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));\n  if (NativeIteratorPrototype &&\n      NativeIteratorPrototype !== Op &&\n      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {\n    // This environment has a native %IteratorPrototype%; use it instead\n    // of the polyfill.\n    IteratorPrototype = NativeIteratorPrototype;\n  }\n\n  var Gp = GeneratorFunctionPrototype.prototype =\n    Generator.prototype = Object.create(IteratorPrototype);\n  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;\n  GeneratorFunctionPrototype.constructor = GeneratorFunction;\n  GeneratorFunctionPrototype[toStringTagSymbol] =\n    GeneratorFunction.displayName = \"GeneratorFunction\";\n\n  // Helper for defining the .next, .throw, and .return methods of the\n  // Iterator interface in terms of a single ._invoke method.\n  function defineIteratorMethods(prototype) {\n    [\"next\", \"throw\", \"return\"].forEach(function(method) {\n      prototype[method] = function(arg) {\n        return this._invoke(method, arg);\n      };\n    });\n  }\n\n  exports.isGeneratorFunction = function(genFun) {\n    var ctor = typeof genFun === \"function\" && genFun.constructor;\n    return ctor\n      ? ctor === GeneratorFunction ||\n        // For the native GeneratorFunction constructor, the best we can\n        // do is to check its .name property.\n        (ctor.displayName || ctor.name) === \"GeneratorFunction\"\n      : false;\n  };\n\n  exports.mark = function(genFun) {\n    if (Object.setPrototypeOf) {\n      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);\n    } else {\n      genFun.__proto__ = GeneratorFunctionPrototype;\n      if (!(toStringTagSymbol in genFun)) {\n        genFun[toStringTagSymbol] = \"GeneratorFunction\";\n      }\n    }\n    genFun.prototype = Object.create(Gp);\n    return genFun;\n  };\n\n  // Within the body of any async function, `await x` is transformed to\n  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test\n  // `hasOwn.call(value, \"__await\")` to determine if the yielded value is\n  // meant to be awaited.\n  exports.awrap = function(arg) {\n    return { __await: arg };\n  };\n\n  function AsyncIterator(generator) {\n    function invoke(method, arg, resolve, reject) {\n      var record = tryCatch(generator[method], generator, arg);\n      if (record.type === \"throw\") {\n        reject(record.arg);\n      } else {\n        var result = record.arg;\n        var value = result.value;\n        if (value &&\n            typeof value === \"object\" &&\n            hasOwn.call(value, \"__await\")) {\n          return Promise.resolve(value.__await).then(function(value) {\n            invoke(\"next\", value, resolve, reject);\n          }, function(err) {\n            invoke(\"throw\", err, resolve, reject);\n          });\n        }\n\n        return Promise.resolve(value).then(function(unwrapped) {\n          // When a yielded Promise is resolved, its final value becomes\n          // the .value of the Promise<{value,done}> result for the\n          // current iteration.\n          result.value = unwrapped;\n          resolve(result);\n        }, function(error) {\n          // If a rejected Promise was yielded, throw the rejection back\n          // into the async generator function so it can be handled there.\n          return invoke(\"throw\", error, resolve, reject);\n        });\n      }\n    }\n\n    var previousPromise;\n\n    function enqueue(method, arg) {\n      function callInvokeWithMethodAndArg() {\n        return new Promise(function(resolve, reject) {\n          invoke(method, arg, resolve, reject);\n        });\n      }\n\n      return previousPromise =\n        // If enqueue has been called before, then we want to wait until\n        // all previous Promises have been resolved before calling invoke,\n        // so that results are always delivered in the correct order. If\n        // enqueue has not been called before, then it is important to\n        // call invoke immediately, without waiting on a callback to fire,\n        // so that the async generator function has the opportunity to do\n        // any necessary setup in a predictable way. This predictability\n        // is why the Promise constructor synchronously invokes its\n        // executor callback, and why async functions synchronously\n        // execute code before the first await. Since we implement simple\n        // async functions in terms of async generators, it is especially\n        // important to get this right, even though it requires care.\n        previousPromise ? previousPromise.then(\n          callInvokeWithMethodAndArg,\n          // Avoid propagating failures to Promises returned by later\n          // invocations of the iterator.\n          callInvokeWithMethodAndArg\n        ) : callInvokeWithMethodAndArg();\n    }\n\n    // Define the unified helper method that is used to implement .next,\n    // .throw, and .return (see defineIteratorMethods).\n    this._invoke = enqueue;\n  }\n\n  defineIteratorMethods(AsyncIterator.prototype);\n  AsyncIterator.prototype[asyncIteratorSymbol] = function () {\n    return this;\n  };\n  exports.AsyncIterator = AsyncIterator;\n\n  // Note that simple async functions are implemented on top of\n  // AsyncIterator objects; they just return a Promise for the value of\n  // the final result produced by the iterator.\n  exports.async = function(innerFn, outerFn, self, tryLocsList) {\n    var iter = new AsyncIterator(\n      wrap(innerFn, outerFn, self, tryLocsList)\n    );\n\n    return exports.isGeneratorFunction(outerFn)\n      ? iter // If outerFn is a generator, return the full iterator.\n      : iter.next().then(function(result) {\n          return result.done ? result.value : iter.next();\n        });\n  };\n\n  function makeInvokeMethod(innerFn, self, context) {\n    var state = GenStateSuspendedStart;\n\n    return function invoke(method, arg) {\n      if (state === GenStateExecuting) {\n        throw new Error(\"Generator is already running\");\n      }\n\n      if (state === GenStateCompleted) {\n        if (method === \"throw\") {\n          throw arg;\n        }\n\n        // Be forgiving, per 25.3.3.3.3 of the spec:\n        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume\n        return doneResult();\n      }\n\n      context.method = method;\n      context.arg = arg;\n\n      while (true) {\n        var delegate = context.delegate;\n        if (delegate) {\n          var delegateResult = maybeInvokeDelegate(delegate, context);\n          if (delegateResult) {\n            if (delegateResult === ContinueSentinel) continue;\n            return delegateResult;\n          }\n        }\n\n        if (context.method === \"next\") {\n          // Setting context._sent for legacy support of Babel's\n          // function.sent implementation.\n          context.sent = context._sent = context.arg;\n\n        } else if (context.method === \"throw\") {\n          if (state === GenStateSuspendedStart) {\n            state = GenStateCompleted;\n            throw context.arg;\n          }\n\n          context.dispatchException(context.arg);\n\n        } else if (context.method === \"return\") {\n          context.abrupt(\"return\", context.arg);\n        }\n\n        state = GenStateExecuting;\n\n        var record = tryCatch(innerFn, self, context);\n        if (record.type === \"normal\") {\n          // If an exception is thrown from innerFn, we leave state ===\n          // GenStateExecuting and loop back for another invocation.\n          state = context.done\n            ? GenStateCompleted\n            : GenStateSuspendedYield;\n\n          if (record.arg === ContinueSentinel) {\n            continue;\n          }\n\n          return {\n            value: record.arg,\n            done: context.done\n          };\n\n        } else if (record.type === \"throw\") {\n          state = GenStateCompleted;\n          // Dispatch the exception by looping back around to the\n          // context.dispatchException(context.arg) call above.\n          context.method = \"throw\";\n          context.arg = record.arg;\n        }\n      }\n    };\n  }\n\n  // Call delegate.iterator[context.method](context.arg) and handle the\n  // result, either by returning a { value, done } result from the\n  // delegate iterator, or by modifying context.method and context.arg,\n  // setting context.delegate to null, and returning the ContinueSentinel.\n  function maybeInvokeDelegate(delegate, context) {\n    var method = delegate.iterator[context.method];\n    if (method === undefined) {\n      // A .throw or .return when the delegate iterator has no .throw\n      // method always terminates the yield* loop.\n      context.delegate = null;\n\n      if (context.method === \"throw\") {\n        // Note: [\"return\"] must be used for ES3 parsing compatibility.\n        if (delegate.iterator[\"return\"]) {\n          // If the delegate iterator has a return method, give it a\n          // chance to clean up.\n          context.method = \"return\";\n          context.arg = undefined;\n          maybeInvokeDelegate(delegate, context);\n\n          if (context.method === \"throw\") {\n            // If maybeInvokeDelegate(context) changed context.method from\n            // \"return\" to \"throw\", let that override the TypeError below.\n            return ContinueSentinel;\n          }\n        }\n\n        context.method = \"throw\";\n        context.arg = new TypeError(\n          \"The iterator does not provide a 'throw' method\");\n      }\n\n      return ContinueSentinel;\n    }\n\n    var record = tryCatch(method, delegate.iterator, context.arg);\n\n    if (record.type === \"throw\") {\n      context.method = \"throw\";\n      context.arg = record.arg;\n      context.delegate = null;\n      return ContinueSentinel;\n    }\n\n    var info = record.arg;\n\n    if (! info) {\n      context.method = \"throw\";\n      context.arg = new TypeError(\"iterator result is not an object\");\n      context.delegate = null;\n      return ContinueSentinel;\n    }\n\n    if (info.done) {\n      // Assign the result of the finished delegate to the temporary\n      // variable specified by delegate.resultName (see delegateYield).\n      context[delegate.resultName] = info.value;\n\n      // Resume execution at the desired location (see delegateYield).\n      context.next = delegate.nextLoc;\n\n      // If context.method was \"throw\" but the delegate handled the\n      // exception, let the outer generator proceed normally. If\n      // context.method was \"next\", forget context.arg since it has been\n      // \"consumed\" by the delegate iterator. If context.method was\n      // \"return\", allow the original .return call to continue in the\n      // outer generator.\n      if (context.method !== \"return\") {\n        context.method = \"next\";\n        context.arg = undefined;\n      }\n\n    } else {\n      // Re-yield the result returned by the delegate method.\n      return info;\n    }\n\n    // The delegate iterator is finished, so forget it and continue with\n    // the outer generator.\n    context.delegate = null;\n    return ContinueSentinel;\n  }\n\n  // Define Generator.prototype.{next,throw,return} in terms of the\n  // unified ._invoke helper method.\n  defineIteratorMethods(Gp);\n\n  Gp[toStringTagSymbol] = \"Generator\";\n\n  // A Generator should always return itself as the iterator object when the\n  // @@iterator function is called on it. Some browsers' implementations of the\n  // iterator prototype chain incorrectly implement this, causing the Generator\n  // object to not be returned from this call. This ensures that doesn't happen.\n  // See https://github.com/facebook/regenerator/issues/274 for more details.\n  Gp[iteratorSymbol] = function() {\n    return this;\n  };\n\n  Gp.toString = function() {\n    return \"[object Generator]\";\n  };\n\n  function pushTryEntry(locs) {\n    var entry = { tryLoc: locs[0] };\n\n    if (1 in locs) {\n      entry.catchLoc = locs[1];\n    }\n\n    if (2 in locs) {\n      entry.finallyLoc = locs[2];\n      entry.afterLoc = locs[3];\n    }\n\n    this.tryEntries.push(entry);\n  }\n\n  function resetTryEntry(entry) {\n    var record = entry.completion || {};\n    record.type = \"normal\";\n    delete record.arg;\n    entry.completion = record;\n  }\n\n  function Context(tryLocsList) {\n    // The root entry object (effectively a try statement without a catch\n    // or a finally block) gives us a place to store values thrown from\n    // locations where there is no enclosing try statement.\n    this.tryEntries = [{ tryLoc: \"root\" }];\n    tryLocsList.forEach(pushTryEntry, this);\n    this.reset(true);\n  }\n\n  exports.keys = function(object) {\n    var keys = [];\n    for (var key in object) {\n      keys.push(key);\n    }\n    keys.reverse();\n\n    // Rather than returning an object with a next method, we keep\n    // things simple and return the next function itself.\n    return function next() {\n      while (keys.length) {\n        var key = keys.pop();\n        if (key in object) {\n          next.value = key;\n          next.done = false;\n          return next;\n        }\n      }\n\n      // To avoid creating an additional object, we just hang the .value\n      // and .done properties off the next function object itself. This\n      // also ensures that the minifier will not anonymize the function.\n      next.done = true;\n      return next;\n    };\n  };\n\n  function values(iterable) {\n    if (iterable) {\n      var iteratorMethod = iterable[iteratorSymbol];\n      if (iteratorMethod) {\n        return iteratorMethod.call(iterable);\n      }\n\n      if (typeof iterable.next === \"function\") {\n        return iterable;\n      }\n\n      if (!isNaN(iterable.length)) {\n        var i = -1, next = function next() {\n          while (++i < iterable.length) {\n            if (hasOwn.call(iterable, i)) {\n              next.value = iterable[i];\n              next.done = false;\n              return next;\n            }\n          }\n\n          next.value = undefined;\n          next.done = true;\n\n          return next;\n        };\n\n        return next.next = next;\n      }\n    }\n\n    // Return an iterator with no values.\n    return { next: doneResult };\n  }\n  exports.values = values;\n\n  function doneResult() {\n    return { value: undefined, done: true };\n  }\n\n  Context.prototype = {\n    constructor: Context,\n\n    reset: function(skipTempReset) {\n      this.prev = 0;\n      this.next = 0;\n      // Resetting context._sent for legacy support of Babel's\n      // function.sent implementation.\n      this.sent = this._sent = undefined;\n      this.done = false;\n      this.delegate = null;\n\n      this.method = \"next\";\n      this.arg = undefined;\n\n      this.tryEntries.forEach(resetTryEntry);\n\n      if (!skipTempReset) {\n        for (var name in this) {\n          // Not sure about the optimal order of these conditions:\n          if (name.charAt(0) === \"t\" &&\n              hasOwn.call(this, name) &&\n              !isNaN(+name.slice(1))) {\n            this[name] = undefined;\n          }\n        }\n      }\n    },\n\n    stop: function() {\n      this.done = true;\n\n      var rootEntry = this.tryEntries[0];\n      var rootRecord = rootEntry.completion;\n      if (rootRecord.type === \"throw\") {\n        throw rootRecord.arg;\n      }\n\n      return this.rval;\n    },\n\n    dispatchException: function(exception) {\n      if (this.done) {\n        throw exception;\n      }\n\n      var context = this;\n      function handle(loc, caught) {\n        record.type = \"throw\";\n        record.arg = exception;\n        context.next = loc;\n\n        if (caught) {\n          // If the dispatched exception was caught by a catch block,\n          // then let that catch block handle the exception normally.\n          context.method = \"next\";\n          context.arg = undefined;\n        }\n\n        return !! caught;\n      }\n\n      for (var i = this.tryEntries.length - 1; i >= 0; --i) {\n        var entry = this.tryEntries[i];\n        var record = entry.completion;\n\n        if (entry.tryLoc === \"root\") {\n          // Exception thrown outside of any try block that could handle\n          // it, so set the completion value of the entire function to\n          // throw the exception.\n          return handle(\"end\");\n        }\n\n        if (entry.tryLoc <= this.prev) {\n          var hasCatch = hasOwn.call(entry, \"catchLoc\");\n          var hasFinally = hasOwn.call(entry, \"finallyLoc\");\n\n          if (hasCatch && hasFinally) {\n            if (this.prev < entry.catchLoc) {\n              return handle(entry.catchLoc, true);\n            } else if (this.prev < entry.finallyLoc) {\n              return handle(entry.finallyLoc);\n            }\n\n          } else if (hasCatch) {\n            if (this.prev < entry.catchLoc) {\n              return handle(entry.catchLoc, true);\n            }\n\n          } else if (hasFinally) {\n            if (this.prev < entry.finallyLoc) {\n              return handle(entry.finallyLoc);\n            }\n\n          } else {\n            throw new Error(\"try statement without catch or finally\");\n          }\n        }\n      }\n    },\n\n    abrupt: function(type, arg) {\n      for (var i = this.tryEntries.length - 1; i >= 0; --i) {\n        var entry = this.tryEntries[i];\n        if (entry.tryLoc <= this.prev &&\n            hasOwn.call(entry, \"finallyLoc\") &&\n            this.prev < entry.finallyLoc) {\n          var finallyEntry = entry;\n          break;\n        }\n      }\n\n      if (finallyEntry &&\n          (type === \"break\" ||\n           type === \"continue\") &&\n          finallyEntry.tryLoc <= arg &&\n          arg <= finallyEntry.finallyLoc) {\n        // Ignore the finally entry if control is not jumping to a\n        // location outside the try/catch block.\n        finallyEntry = null;\n      }\n\n      var record = finallyEntry ? finallyEntry.completion : {};\n      record.type = type;\n      record.arg = arg;\n\n      if (finallyEntry) {\n        this.method = \"next\";\n        this.next = finallyEntry.finallyLoc;\n        return ContinueSentinel;\n      }\n\n      return this.complete(record);\n    },\n\n    complete: function(record, afterLoc) {\n      if (record.type === \"throw\") {\n        throw record.arg;\n      }\n\n      if (record.type === \"break\" ||\n          record.type === \"continue\") {\n        this.next = record.arg;\n      } else if (record.type === \"return\") {\n        this.rval = this.arg = record.arg;\n        this.method = \"return\";\n        this.next = \"end\";\n      } else if (record.type === \"normal\" && afterLoc) {\n        this.next = afterLoc;\n      }\n\n      return ContinueSentinel;\n    },\n\n    finish: function(finallyLoc) {\n      for (var i = this.tryEntries.length - 1; i >= 0; --i) {\n        var entry = this.tryEntries[i];\n        if (entry.finallyLoc === finallyLoc) {\n          this.complete(entry.completion, entry.afterLoc);\n          resetTryEntry(entry);\n          return ContinueSentinel;\n        }\n      }\n    },\n\n    \"catch\": function(tryLoc) {\n      for (var i = this.tryEntries.length - 1; i >= 0; --i) {\n        var entry = this.tryEntries[i];\n        if (entry.tryLoc === tryLoc) {\n          var record = entry.completion;\n          if (record.type === \"throw\") {\n            var thrown = record.arg;\n            resetTryEntry(entry);\n          }\n          return thrown;\n        }\n      }\n\n      // The context.catch method must only be called with a location\n      // argument that corresponds to a known catch block.\n      throw new Error(\"illegal catch attempt\");\n    },\n\n    delegateYield: function(iterable, resultName, nextLoc) {\n      this.delegate = {\n        iterator: values(iterable),\n        resultName: resultName,\n        nextLoc: nextLoc\n      };\n\n      if (this.method === \"next\") {\n        // Deliberately forget the last sent value so that we don't\n        // accidentally pass it on to the delegate.\n        this.arg = undefined;\n      }\n\n      return ContinueSentinel;\n    }\n  };\n\n  // Regardless of whether this script is executing as a CommonJS module\n  // or not, return the runtime object so that we can declare the variable\n  // regeneratorRuntime in the outer scope, which allows this module to be\n  // injected easily by `bin/regenerator --include-runtime script.js`.\n  return exports;\n\n}(\n  // If this script is executing as a CommonJS module, use module.exports\n  // as the regeneratorRuntime namespace. Otherwise create a new empty\n  // object. Either way, the resulting object will be used to initialize\n  // the regeneratorRuntime variable at the top of this file.\n   true ? module.exports : undefined\n));\n\ntry {\n  regeneratorRuntime = runtime;\n} catch (accidentalStrictMode) {\n  // This module should not be running in strict mode, so the above\n  // assignment should always work unless something is misconfigured. Just\n  // in case runtime.js accidentally runs in strict mode, we can escape\n  // strict mode using a global Function call. This could conceivably fail\n  // if a Content Security Policy forbids using Function, but in that case\n  // the proper solution is to fix the accidental strict mode problem. If\n  // you've misconfigured your bundler to force strict mode and applied a\n  // CSP to forbid Function, and you're not willing to fix either of those\n  // problems, please detail your unique predicament in a GitHub issue.\n  Function(\"r\", \"regeneratorRuntime = r\")(runtime);\n}\n\n\n/***/ }),\n/* 9 */\n/***/ (function(module, __webpack_exports__, __webpack_require__) {\n\n\"use strict\";\n// ESM COMPAT FLAG\n__webpack_require__.r(__webpack_exports__);\n\n// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/typeof.js\nvar helpers_typeof = __webpack_require__(5);\nvar typeof_default = /*#__PURE__*/__webpack_require__.n(helpers_typeof);\n\n// EXTERNAL MODULE: ./node_modules/@babel/runtime/regenerator/index.js\nvar regenerator = __webpack_require__(0);\nvar regenerator_default = /*#__PURE__*/__webpack_require__.n(regenerator);\n\n// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/classCallCheck.js\nvar classCallCheck = __webpack_require__(3);\nvar classCallCheck_default = /*#__PURE__*/__webpack_require__.n(classCallCheck);\n\n// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/createClass.js\nvar createClass = __webpack_require__(4);\nvar createClass_default = /*#__PURE__*/__webpack_require__.n(createClass);\n\n// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/asyncToGenerator.js\nvar asyncToGenerator = __webpack_require__(1);\nvar asyncToGenerator_default = /*#__PURE__*/__webpack_require__.n(asyncToGenerator);\n\n// EXTERNAL MODULE: ./node_modules/localforage/dist/localforage.js\nvar localforage = __webpack_require__(2);\nvar localforage_default = /*#__PURE__*/__webpack_require__.n(localforage);\n\n// CONCATENATED MODULE: ./src/logger.js\n\n\nvar logger_Logger = /*#__PURE__*/function () {\n  function Logger() {\n    classCallCheck_default()(this, Logger);\n    this.setVerbosity('WARNING');\n  }\n  createClass_default()(Logger, [{\n    key: \"debug\",\n    value: function debug() {\n      if (this.checkVerbosity(4)) {\n        var _console;\n        (_console = console).log.apply(_console, arguments);\n      }\n    }\n  }, {\n    key: \"log\",\n    value: function log() {\n      if (this.checkVerbosity(4)) {\n        var _console2;\n        (_console2 = console).log.apply(_console2, arguments);\n      }\n    }\n  }, {\n    key: \"info\",\n    value: function info() {\n      if (this.checkVerbosity(3)) {\n        var _console3;\n        (_console3 = console).info.apply(_console3, arguments);\n      }\n    }\n  }, {\n    key: \"warn\",\n    value: function warn() {\n      if (this.checkVerbosity(2)) {\n        var _console4;\n        (_console4 = console).warn.apply(_console4, arguments);\n      }\n    }\n  }, {\n    key: \"error\",\n    value: function error() {\n      if (this.checkVerbosity(1)) {\n        var _console5;\n        (_console5 = console).error.apply(_console5, arguments);\n      }\n    }\n  }, {\n    key: \"setVerbosity\",\n    value: function setVerbosity(level) {\n      var default_level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'info';\n      if (level === undefined) {\n        level = default_level;\n      }\n      if (typeof level === 'string') {\n        level = {\n          ERROR: 1,\n          WARNING: 2,\n          INFO: 3,\n          LOG: 4,\n          DEBUG: 4\n        }[level.toUpperCase()] || 2;\n      }\n      this.level = level;\n    }\n  }, {\n    key: \"checkVerbosity\",\n    value: function checkVerbosity(level) {\n      return this.level >= level;\n    }\n  }]);\n  return Logger;\n}();\nvar log = new logger_Logger();\n/* harmony default export */ var logger = (log);\n// CONCATENATED MODULE: ./src/wasm-utils.js\n\n\n// 1. +++ fetchAndInstantiate() +++ //\n\n// This library function fetches the wasm module at 'url', instantiates it with\n// the given 'importObject', and returns the instantiated object instance\n\nfunction instantiateStreaming(_x, _x2) {\n  return _instantiateStreaming.apply(this, arguments);\n}\nfunction _instantiateStreaming() {\n  _instantiateStreaming = asyncToGenerator_default()(/*#__PURE__*/regenerator_default.a.mark(function _callee(url, importObject) {\n    var result;\n    return regenerator_default.a.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            _context.next = 2;\n            return WebAssembly.instantiateStreaming(fetch(url), importObject);\n          case 2:\n            result = _context.sent;\n            return _context.abrupt(\"return\", result.instance);\n          case 4:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee);\n  }));\n  return _instantiateStreaming.apply(this, arguments);\n}\nfunction fetchAndInstantiate(url, importObject) {\n  return fetch(url).then(function (response) {\n    return response.arrayBuffer();\n  }).then(function (bytes) {\n    return WebAssembly.instantiate(bytes, importObject);\n  }).then(function (results) {\n    return results.instance;\n  });\n}\n\n// 2. +++ instantiateCachedURL() +++ //\n\n// This library function fetches the wasm Module at 'url', instantiates it with\n// the given 'importObject', and returns a Promise resolving to the finished\n// wasm Instance. Additionally, the function attempts to cache the compiled wasm\n// Module in IndexedDB using 'url' as the key. The entire site's wasm cache (not\n// just the given URL) is versioned by dbVersion and any change in dbVersion on\n// any call to instantiateCachedURL() will conservatively clear out the entire\n// cache to avoid stale modules.\nfunction instantiateCachedURL(dbVersion, url, importObject) {\n  var dbName = 'wasm-cache';\n  var storeName = 'wasm-cache';\n\n  // This helper function Promise-ifies the operation of opening an IndexedDB\n  // database and clearing out the cache when the version changes.\n  function openDatabase() {\n    return new Promise(function (resolve, reject) {\n      var request = indexedDB.open(dbName, dbVersion);\n      request.onerror = reject.bind(null, 'Error opening wasm cache database');\n      request.onsuccess = function () {\n        resolve(request.result);\n      };\n      request.onupgradeneeded = function (event) {\n        var db = request.result;\n        if (db.objectStoreNames.contains(storeName)) {\n          console.log(\"Clearing out version \".concat(event.oldVersion, \" wasm cache\"));\n          db.deleteObjectStore(storeName);\n        }\n        console.log(\"Creating version \".concat(event.newVersion, \" wasm cache\"));\n        db.createObjectStore(storeName);\n      };\n    });\n  }\n\n  // This helper function Promise-ifies the operation of looking up 'url' in the\n  // given IDBDatabase.\n  function lookupInDatabase(db) {\n    return new Promise(function (resolve, reject) {\n      var store = db.transaction([storeName]).objectStore(storeName);\n      var request = store.get(url);\n      request.onerror = reject.bind(null, \"Error getting wasm module \".concat(url));\n      request.onsuccess = function (event) {\n        if (request.result) resolve(request.result);else reject(\"Module \".concat(url, \" was not found in wasm cache\"));\n      };\n    });\n  }\n\n  // This helper function fires off an async operation to store the given wasm\n  // Module in the given IDBDatabase.\n  function storeInDatabase(db, module) {\n    var store = db.transaction([storeName], 'readwrite').objectStore(storeName);\n    var request = store.put(module, url);\n    request.onerror = function (err) {\n      console.log(\"Failed to store in wasm cache: \".concat(err));\n    };\n    request.onsuccess = function (err) {\n      console.log(\"Successfully stored \".concat(url, \" in wasm cache\"));\n    };\n  }\n\n  // This helper function fetches 'url', compiles it into a Module,\n  // instantiates the Module with the given import object.\n  function fetchAndInstantiate() {\n    return fetch(url).then(function (response) {\n      return response.arrayBuffer();\n    }).then(function (buffer) {\n      return WebAssembly.instantiate(buffer, importObject);\n    });\n  }\n\n  // With all the Promise helper functions defined, we can now express the core\n  // logic of an IndexedDB cache lookup. We start by trying to open a database.\n  return openDatabase().then(function (db) {\n    // Now see if we already have a compiled Module with key 'url' in 'db':\n    return lookupInDatabase(db).then(function (module) {\n      // We do! Instantiate it with the given import object.\n      console.log(\"Found \".concat(url, \" in wasm cache\"));\n      return WebAssembly.instantiate(module, importObject);\n    }, function (errMsg) {\n      // Nope! Compile from scratch and then store the compiled Module in 'db'\n      // with key 'url' for next time.\n      console.log(errMsg);\n      return fetchAndInstantiate().then(function (results) {\n        try {\n          storeInDatabase(db, results.module);\n        } catch (e) {\n          console.log('Failed to store module into db');\n        }\n        return results.instance;\n      });\n    });\n  }, function (errMsg) {\n    // If opening the database failed (due to permissions or quota), fall back\n    // to simply fetching and compiling the module and don't try to store the\n    // results.\n    console.log(errMsg);\n    return fetchAndInstantiate().then(function (results) {\n      return results.instance;\n    });\n  });\n}\nfunction instantiateAny(_x3, _x4, _x5) {\n  return _instantiateAny.apply(this, arguments);\n}\nfunction _instantiateAny() {\n  _instantiateAny = asyncToGenerator_default()(/*#__PURE__*/regenerator_default.a.mark(function _callee2(version, url, importObject) {\n    return regenerator_default.a.wrap(function _callee2$(_context2) {\n      while (1) {\n        switch (_context2.prev = _context2.next) {\n          case 0:\n            console.log(\"instantiate\");\n            _context2.prev = 1;\n            _context2.next = 4;\n            return instantiateStreaming(url, importObject);\n          case 4:\n            return _context2.abrupt(\"return\", _context2.sent);\n          case 7:\n            _context2.prev = 7;\n            _context2.t0 = _context2[\"catch\"](1);\n            console.log(\"instantiateStreaming failed\", _context2.t0);\n          case 10:\n            _context2.prev = 10;\n            _context2.next = 13;\n            return instantiateCachedURL(version, url, importObject);\n          case 13:\n            return _context2.abrupt(\"return\", _context2.sent);\n          case 16:\n            _context2.prev = 16;\n            _context2.t1 = _context2[\"catch\"](10);\n            console.log(\"instantiateCachedURL failed\", _context2.t1);\n          case 19:\n            throw new Error(\"can't instantiate wasm\");\n          case 20:\n          case \"end\":\n            return _context2.stop();\n        }\n      }\n    }, _callee2, null, [[1, 7], [10, 16]]);\n  }));\n  return _instantiateAny.apply(this, arguments);\n}\n// EXTERNAL MODULE: ./src/prebuilt/release/td_wasm.wasm\nvar release_td_wasm = __webpack_require__(6);\nvar td_wasm_default = /*#__PURE__*/__webpack_require__.n(release_td_wasm);\n\n// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/eslint-loader!./src/worker.js\n\n\n\n\n\n\n\n\n\nvar tdlibVersion = 6;\nvar localForageDrivers = [localforage_default.a.INDEXEDDB, localforage_default.a.LOCALSTORAGE, 'memoryDriver'];\nfunction initLocalForage() {\n  return _initLocalForage.apply(this, arguments);\n}\nfunction _initLocalForage() {\n  _initLocalForage = asyncToGenerator_default()(/*#__PURE__*/regenerator_default.a.mark(function _callee29() {\n    var memoryDriver;\n    return regenerator_default.a.wrap(function _callee29$(_context29) {\n      while (1) {\n        switch (_context29.prev = _context29.next) {\n          case 0:\n            // Implement the driver here.\n            memoryDriver = {\n              _driver: 'memoryDriver',\n              _initStorage: function _initStorage(options) {\n                var dbInfo = {};\n                if (options) {\n                  for (var i in options) {\n                    dbInfo[i] = options[i];\n                  }\n                }\n                this._dbInfo = dbInfo;\n                this._map = new Map();\n              },\n              clear: function () {\n                var _clear = asyncToGenerator_default()(/*#__PURE__*/regenerator_default.a.mark(function _callee21() {\n                  return regenerator_default.a.wrap(function _callee21$(_context21) {\n                    while (1) {\n                      switch (_context21.prev = _context21.next) {\n                        case 0:\n                          this._map.clear();\n                        case 1:\n                        case \"end\":\n                          return _context21.stop();\n                      }\n                    }\n                  }, _callee21, this);\n                }));\n                function clear() {\n                  return _clear.apply(this, arguments);\n                }\n                return clear;\n              }(),\n              getItem: function () {\n                var _getItem = asyncToGenerator_default()(/*#__PURE__*/regenerator_default.a.mark(function _callee22(key) {\n                  var value;\n                  return regenerator_default.a.wrap(function _callee22$(_context22) {\n                    while (1) {\n                      switch (_context22.prev = _context22.next) {\n                        case 0:\n                          value = this._map.get(key);\n                          console.log('getItem', this._map, key, value);\n                          return _context22.abrupt(\"return\", value);\n                        case 3:\n                        case \"end\":\n                          return _context22.stop();\n                      }\n                    }\n                  }, _callee22, this);\n                }));\n                function getItem(_x32) {\n                  return _getItem.apply(this, arguments);\n                }\n                return getItem;\n              }(),\n              iterate: function () {\n                var _iterate = asyncToGenerator_default()(/*#__PURE__*/regenerator_default.a.mark(function _callee23(iteratorCallback) {\n                  return regenerator_default.a.wrap(function _callee23$(_context23) {\n                    while (1) {\n                      switch (_context23.prev = _context23.next) {\n                        case 0:\n                          logger.error('iterate is not supported');\n                        case 1:\n                        case \"end\":\n                          return _context23.stop();\n                      }\n                    }\n                  }, _callee23);\n                }));\n                function iterate(_x33) {\n                  return _iterate.apply(this, arguments);\n                }\n                return iterate;\n              }(),\n              key: function () {\n                var _key = asyncToGenerator_default()(/*#__PURE__*/regenerator_default.a.mark(function _callee24(n) {\n                  return regenerator_default.a.wrap(function _callee24$(_context24) {\n                    while (1) {\n                      switch (_context24.prev = _context24.next) {\n                        case 0:\n                          logger.error('key n is not supported');\n                        case 1:\n                        case \"end\":\n                          return _context24.stop();\n                      }\n                    }\n                  }, _callee24);\n                }));\n                function key(_x34) {\n                  return _key.apply(this, arguments);\n                }\n                return key;\n              }(),\n              keys: function () {\n                var _keys = asyncToGenerator_default()(/*#__PURE__*/regenerator_default.a.mark(function _callee25() {\n                  return regenerator_default.a.wrap(function _callee25$(_context25) {\n                    while (1) {\n                      switch (_context25.prev = _context25.next) {\n                        case 0:\n                          return _context25.abrupt(\"return\", this._map.keys());\n                        case 1:\n                        case \"end\":\n                          return _context25.stop();\n                      }\n                    }\n                  }, _callee25, this);\n                }));\n                function keys() {\n                  return _keys.apply(this, arguments);\n                }\n                return keys;\n              }(),\n              length: function () {\n                var _length = asyncToGenerator_default()(/*#__PURE__*/regenerator_default.a.mark(function _callee26() {\n                  return regenerator_default.a.wrap(function _callee26$(_context26) {\n                    while (1) {\n                      switch (_context26.prev = _context26.next) {\n                        case 0:\n                          return _context26.abrupt(\"return\", this._map.size());\n                        case 1:\n                        case \"end\":\n                          return _context26.stop();\n                      }\n                    }\n                  }, _callee26, this);\n                }));\n                function length() {\n                  return _length.apply(this, arguments);\n                }\n                return length;\n              }(),\n              removeItem: function () {\n                var _removeItem = asyncToGenerator_default()(/*#__PURE__*/regenerator_default.a.mark(function _callee27(key) {\n                  return regenerator_default.a.wrap(function _callee27$(_context27) {\n                    while (1) {\n                      switch (_context27.prev = _context27.next) {\n                        case 0:\n                          this._map[\"delete\"](key);\n                        case 1:\n                        case \"end\":\n                          return _context27.stop();\n                      }\n                    }\n                  }, _callee27, this);\n                }));\n                function removeItem(_x35) {\n                  return _removeItem.apply(this, arguments);\n                }\n                return removeItem;\n              }(),\n              setItem: function () {\n                var _setItem = asyncToGenerator_default()(/*#__PURE__*/regenerator_default.a.mark(function _callee28(key, value) {\n                  var originalValue;\n                  return regenerator_default.a.wrap(function _callee28$(_context28) {\n                    while (1) {\n                      switch (_context28.prev = _context28.next) {\n                        case 0:\n                          originalValue = this._map.get(key);\n                          console.log('setItem', this._map, key, value);\n                          this._map.set(key, value);\n                          return _context28.abrupt(\"return\", originalValue);\n                        case 4:\n                        case \"end\":\n                          return _context28.stop();\n                      }\n                    }\n                  }, _callee28, this);\n                }));\n                function setItem(_x36, _x37) {\n                  return _setItem.apply(this, arguments);\n                }\n                return setItem;\n              }()\n            }; // Add the driver to localForage.\n            localforage_default.a.defineDriver(memoryDriver);\n          case 2:\n          case \"end\":\n            return _context29.stop();\n        }\n      }\n    }, _callee29);\n  }));\n  return _initLocalForage.apply(this, arguments);\n}\nfunction loadTdlibWasm(_x, _x2) {\n  return _loadTdlibWasm.apply(this, arguments);\n}\nfunction _loadTdlibWasm() {\n  _loadTdlibWasm = asyncToGenerator_default()(/*#__PURE__*/regenerator_default.a.mark(function _callee30(onFS, wasmUrl) {\n    var td_module, createTdwebModule, td_wasm, module;\n    return regenerator_default.a.wrap(function _callee30$(_context30) {\n      while (1) {\n        switch (_context30.prev = _context30.next) {\n          case 0:\n            console.log('loadTdlibWasm');\n            _context30.next = 3;\n            return __webpack_require__.e(/* import() */ 1).then(__webpack_require__.t.bind(null, 17, 7));\n          case 3:\n            td_module = _context30.sent;\n            createTdwebModule = td_module[\"default\"];\n            logger.info('receive td_wasm.js', td_module, createTdwebModule);\n            td_wasm = td_wasm_default.a;\n            if (wasmUrl) {\n              td_wasm = wasmUrl;\n            }\n            module = createTdwebModule({\n              onRuntimeInitialized: function onRuntimeInitialized() {\n                logger.info('runtime initialized');\n                onFS(module.FS);\n              },\n              instantiateWasm: function instantiateWasm(imports, successCallback) {\n                logger.info('start instantiateWasm', td_wasm, imports);\n                var next = function next(instance) {\n                  logger.info('finish instantiateWasm');\n                  successCallback(instance);\n                };\n                instantiateAny(tdlibVersion, td_wasm, imports).then(next);\n                return {};\n              }\n            });\n            logger.info('Wait module');\n            _context30.next = 12;\n            return module;\n          case 12:\n            module = _context30.sent;\n            logger.info('Loaded module', module);\n            //onFS(module.FS);\n            return _context30.abrupt(\"return\", module);\n          case 15:\n          case \"end\":\n            return _context30.stop();\n        }\n      }\n    }, _callee30);\n  }));\n  return _loadTdlibWasm.apply(this, arguments);\n}\nfunction loadTdlib(_x3, _x4) {\n  return _loadTdlib.apply(this, arguments);\n}\nfunction _loadTdlib() {\n  _loadTdlib = asyncToGenerator_default()(/*#__PURE__*/regenerator_default.a.mark(function _callee31(onFS, wasmUrl) {\n    var wasmSupported;\n    return regenerator_default.a.wrap(function _callee31$(_context31) {\n      while (1) {\n        switch (_context31.prev = _context31.next) {\n          case 0:\n            wasmSupported = function () {\n              try {\n                if ((typeof WebAssembly === \"undefined\" ? \"undefined\" : typeof_default()(WebAssembly)) === 'object' && typeof WebAssembly.instantiate === 'function') {\n                  var module = new WebAssembly.Module(Uint8Array.of(0x0, 0x61, 0x73, 0x6d, 0x01, 0x00, 0x00, 0x00));\n                  if (module instanceof WebAssembly.Module) return new WebAssembly.Instance(module) instanceof WebAssembly.Instance;\n                }\n              } catch (e) {}\n              return false;\n            }();\n            if (!wasmSupported) {\n              logger.error('WebAssembly is not supported, trying to use it anyway');\n            }\n            return _context31.abrupt(\"return\", loadTdlibWasm(onFS, wasmUrl));\n          case 3:\n          case \"end\":\n            return _context31.stop();\n        }\n      }\n    }, _callee31);\n  }));\n  return _loadTdlib.apply(this, arguments);\n}\nvar worker_OutboundFileSystem = /*#__PURE__*/function () {\n  function OutboundFileSystem(root, FS) {\n    classCallCheck_default()(this, OutboundFileSystem);\n    this.root = root;\n    this.nextFileId = 0;\n    this.FS = FS;\n    this.files = new Set();\n    FS.mkdir(root);\n  }\n  createClass_default()(OutboundFileSystem, [{\n    key: \"blobToPath\",\n    value: function blobToPath(blob, name) {\n      var dir = this.root + '/' + this.nextFileId;\n      if (!name) {\n        name = 'blob';\n      }\n      this.nextFileId++;\n      this.FS.mkdir(dir);\n      this.FS.mount(this.FS.filesystems.WORKERFS, {\n        blobs: [{\n          name: name,\n          data: blob\n        }]\n      }, dir);\n      var path = dir + '/' + name;\n      this.files.add(path);\n      return path;\n    }\n  }, {\n    key: \"forgetPath\",\n    value: function forgetPath(path) {\n      if (this.files.has(path)) {\n        this.FS.unmount(path);\n        this.files[\"delete\"](path);\n      }\n    }\n  }]);\n  return OutboundFileSystem;\n}();\nvar worker_InboundFileSystem = /*#__PURE__*/function () {\n  function InboundFileSystem() {\n    classCallCheck_default()(this, InboundFileSystem);\n  }\n  createClass_default()(InboundFileSystem, [{\n    key: \"load_pids\",\n    value: function () {\n      var _load_pids = asyncToGenerator_default()(/*#__PURE__*/regenerator_default.a.mark(function _callee() {\n        var keys_start, idb, read, keys, keys_time;\n        return regenerator_default.a.wrap(function _callee$(_context) {\n          while (1) {\n            switch (_context.prev = _context.next) {\n              case 0:\n                keys_start = performance.now();\n                logger.debug('InboundFileSystem::create::keys start');\n                //const keys = await this.store.keys();\n                _context.next = 4;\n                return this.idb;\n              case 4:\n                idb = _context.sent;\n                read = idb.transaction(['keyvaluepairs'], 'readonly').objectStore('keyvaluepairs');\n                _context.next = 8;\n                return new Promise(function (resolve, reject) {\n                  var request = read.getAllKeys();\n                  request.onsuccess = function () {\n                    return resolve(request.result);\n                  };\n                  request.onerror = function () {\n                    return reject(request.error);\n                  };\n                });\n              case 8:\n                keys = _context.sent;\n                keys_time = (performance.now() - keys_start) / 1000;\n                logger.debug('InboundFileSystem::create::keys ' + keys_time + ' ' + keys.length);\n                this.pids = new Set(keys);\n              case 12:\n              case \"end\":\n                return _context.stop();\n            }\n          }\n        }, _callee, this);\n      }));\n      function load_pids() {\n        return _load_pids.apply(this, arguments);\n      }\n      return load_pids;\n    }()\n  }, {\n    key: \"has\",\n    value: function has(pid) {\n      if (!this.pids) {\n        return true;\n      }\n      return this.pids.has(pid);\n    }\n  }, {\n    key: \"forget\",\n    value: function forget(pid) {\n      if (this.pids) {\n        this.pids[\"delete\"](pid);\n      }\n    }\n  }, {\n    key: \"doPersist\",\n    value: function () {\n      var _doPersist = asyncToGenerator_default()(/*#__PURE__*/regenerator_default.a.mark(function _callee2(pid, path, arr, resolve, reject, write) {\n        var size;\n        return regenerator_default.a.wrap(function _callee2$(_context2) {\n          while (1) {\n            switch (_context2.prev = _context2.next) {\n              case 0:\n                this.persistCount++;\n                size = arr.length;\n                this.persistSize += size;\n                _context2.prev = 3;\n                _context2.next = 6;\n                return new Promise(function (resolve, reject) {\n                  var request = write.put(new Blob([arr]), pid);\n                  request.onsuccess = function () {\n                    return resolve(request.result);\n                  };\n                  request.onerror = function () {\n                    return reject(request.error);\n                  };\n                });\n              case 6:\n                if (this.pids) {\n                  this.pids.add(pid);\n                }\n                this.FS.unlink(path);\n                _context2.next = 13;\n                break;\n              case 10:\n                _context2.prev = 10;\n                _context2.t0 = _context2[\"catch\"](3);\n                logger.error('Failed persist ' + path + ' ', _context2.t0);\n              case 13:\n                //log.debug('persist.do finish', pid, path, arr.length);\n                this.persistCount--;\n                this.persistSize -= size;\n                resolve();\n                this.tryFinishPersist();\n              case 17:\n              case \"end\":\n                return _context2.stop();\n            }\n          }\n        }, _callee2, this, [[3, 10]]);\n      }));\n      function doPersist(_x5, _x6, _x7, _x8, _x9, _x10) {\n        return _doPersist.apply(this, arguments);\n      }\n      return doPersist;\n    }()\n  }, {\n    key: \"flushPersist\",\n    value: function () {\n      var _flushPersist = asyncToGenerator_default()(/*#__PURE__*/regenerator_default.a.mark(function _callee3() {\n        var idb, write, q;\n        return regenerator_default.a.wrap(function _callee3$(_context3) {\n          while (1) {\n            switch (_context3.prev = _context3.next) {\n              case 0:\n                if (!this.inPersist) {\n                  _context3.next = 2;\n                  break;\n                }\n                return _context3.abrupt(\"return\");\n              case 2:\n                logger.debug('persist.flush');\n                this.inPersist = true;\n                _context3.next = 6;\n                return this.idb;\n              case 6:\n                idb = _context3.sent;\n                this.writeBegin = performance.now();\n                write = idb.transaction(['keyvaluepairs'], 'readwrite').objectStore('keyvaluepairs');\n                while (this.pendingI < this.pending.length && this.persistCount < 20 && this.persistSize < 50 << 20) {\n                  q = this.pending[this.pendingI];\n                  this.pending[this.pendingI] = null;\n                  // TODO: add to transaction\n                  this.doPersist(q.pid, q.path, q.arr, q.resolve, q.reject, write);\n                  this.pendingI++;\n                  this.totalCount++;\n                }\n                logger.debug('persist.flush transaction cnt=' + this.persistCount + ', size=' + this.persistSize);\n                this.inPersist = false;\n                this.tryFinishPersist();\n              case 13:\n              case \"end\":\n                return _context3.stop();\n            }\n          }\n        }, _callee3, this);\n      }));\n      function flushPersist() {\n        return _flushPersist.apply(this, arguments);\n      }\n      return flushPersist;\n    }()\n  }, {\n    key: \"tryFinishPersist\",\n    value: function () {\n      var _tryFinishPersist = asyncToGenerator_default()(/*#__PURE__*/regenerator_default.a.mark(function _callee4() {\n        return regenerator_default.a.wrap(function _callee4$(_context4) {\n          while (1) {\n            switch (_context4.prev = _context4.next) {\n              case 0:\n                if (!this.inPersist) {\n                  _context4.next = 2;\n                  break;\n                }\n                return _context4.abrupt(\"return\");\n              case 2:\n                if (!(this.persistCount !== 0)) {\n                  _context4.next = 4;\n                  break;\n                }\n                return _context4.abrupt(\"return\");\n              case 4:\n                logger.debug('persist.finish ' + (performance.now() - this.writeBegin) / 1000);\n                if (!(this.pendingI === this.pending.length)) {\n                  _context4.next = 11;\n                  break;\n                }\n                this.pending = [];\n                this.pendingHasTimeout = false;\n                this.pendingI = 0;\n                logger.debug('persist.finish done');\n                return _context4.abrupt(\"return\");\n              case 11:\n                logger.debug('persist.finish continue');\n                this.flushPersist();\n              case 13:\n              case \"end\":\n                return _context4.stop();\n            }\n          }\n        }, _callee4, this);\n      }));\n      function tryFinishPersist() {\n        return _tryFinishPersist.apply(this, arguments);\n      }\n      return tryFinishPersist;\n    }()\n  }, {\n    key: \"persist\",\n    value: function () {\n      var _persist = asyncToGenerator_default()(/*#__PURE__*/regenerator_default.a.mark(function _callee5(pid, path, arr) {\n        var _this = this;\n        return regenerator_default.a.wrap(function _callee5$(_context5) {\n          while (1) {\n            switch (_context5.prev = _context5.next) {\n              case 0:\n                if (!this.pendingHasTimeout) {\n                  this.pendingHasTimeout = true;\n                  logger.debug('persist set timeout');\n                  setTimeout(function () {\n                    _this.flushPersist();\n                  }, 1);\n                }\n                _context5.next = 3;\n                return new Promise(function (resolve, reject) {\n                  _this.pending.push({\n                    pid: pid,\n                    path: path,\n                    arr: arr,\n                    resolve: resolve,\n                    reject: reject\n                  });\n                });\n              case 3:\n              case \"end\":\n                return _context5.stop();\n            }\n          }\n        }, _callee5, this);\n      }));\n      function persist(_x11, _x12, _x13) {\n        return _persist.apply(this, arguments);\n      }\n      return persist;\n    }()\n  }, {\n    key: \"unlink\",\n    value: function () {\n      var _unlink = asyncToGenerator_default()(/*#__PURE__*/regenerator_default.a.mark(function _callee6(pid) {\n        var idb;\n        return regenerator_default.a.wrap(function _callee6$(_context6) {\n          while (1) {\n            switch (_context6.prev = _context6.next) {\n              case 0:\n                logger.debug('Unlink ' + pid);\n                _context6.prev = 1;\n                this.forget(pid);\n                //await this.store.removeItem(pid);\n                _context6.next = 5;\n                return this.idb;\n              case 5:\n                idb = _context6.sent;\n                _context6.next = 8;\n                return new Promise(function (resolve, reject) {\n                  var write = idb.transaction(['keyvaluepairs'], 'readwrite').objectStore('keyvaluepairs');\n                  var request = write[\"delete\"](pid);\n                  request.onsuccess = function () {\n                    return resolve(request.result);\n                  };\n                  request.onerror = function () {\n                    return reject(request.error);\n                  };\n                });\n              case 8:\n                _context6.next = 13;\n                break;\n              case 10:\n                _context6.prev = 10;\n                _context6.t0 = _context6[\"catch\"](1);\n                logger.error('Failed unlink ' + pid + ' ', _context6.t0);\n              case 13:\n              case \"end\":\n                return _context6.stop();\n            }\n          }\n        }, _callee6, this, [[1, 10]]);\n      }));\n      function unlink(_x14) {\n        return _unlink.apply(this, arguments);\n      }\n      return unlink;\n    }()\n  }], [{\n    key: \"create\",\n    value: function () {\n      var _create = asyncToGenerator_default()(/*#__PURE__*/regenerator_default.a.mark(function _callee7(dbName, root, FS_promise) {\n        var start, ifs, FS, create_time;\n        return regenerator_default.a.wrap(function _callee7$(_context7) {\n          while (1) {\n            switch (_context7.prev = _context7.next) {\n              case 0:\n                start = performance.now();\n                _context7.prev = 1;\n                ifs = new InboundFileSystem();\n                ifs.pending = [];\n                ifs.pendingHasTimeout = false;\n                ifs.persistCount = 0;\n                ifs.persistSize = 0;\n                ifs.pendingI = 0;\n                ifs.inPersist = false;\n                ifs.totalCount = 0;\n                ifs.root = root;\n\n                //ifs.store = localforage.createInstance({\n                //name: dbName,\n                //driver: localForageDrivers\n                //});\n                logger.debug('IDB name: ' + dbName);\n                ifs.idb = new Promise(function (resolve, reject) {\n                  var request = indexedDB.open(dbName);\n                  request.onsuccess = function () {\n                    return resolve(request.result);\n                  };\n                  request.onerror = function () {\n                    return reject(request.error);\n                  };\n                  request.onupgradeneeded = function () {\n                    request.result.createObjectStore('keyvaluepairs');\n                  };\n                });\n                ifs.load_pids();\n                _context7.next = 16;\n                return FS_promise;\n              case 16:\n                FS = _context7.sent;\n                _context7.next = 19;\n                return ifs.idb;\n              case 19:\n                ifs.FS = FS;\n                ifs.FS.mkdir(root);\n                create_time = (performance.now() - start) / 1000;\n                logger.debug('InboundFileSystem::create ' + create_time);\n                return _context7.abrupt(\"return\", ifs);\n              case 26:\n                _context7.prev = 26;\n                _context7.t0 = _context7[\"catch\"](1);\n                logger.error('Failed to init Inbound FileSystem: ', _context7.t0);\n              case 29:\n              case \"end\":\n                return _context7.stop();\n            }\n          }\n        }, _callee7, null, [[1, 26]]);\n      }));\n      function create(_x15, _x16, _x17) {\n        return _create.apply(this, arguments);\n      }\n      return create;\n    }()\n  }]);\n  return InboundFileSystem;\n}();\nvar worker_DbFileSystem = /*#__PURE__*/function () {\n  function DbFileSystem() {\n    classCallCheck_default()(this, DbFileSystem);\n  }\n  createClass_default()(DbFileSystem, [{\n    key: \"sync\",\n    value: function () {\n      var _sync = asyncToGenerator_default()(/*#__PURE__*/regenerator_default.a.mark(function _callee8(force) {\n        var _this2 = this;\n        var start;\n        return regenerator_default.a.wrap(function _callee8$(_context8) {\n          while (1) {\n            switch (_context8.prev = _context8.next) {\n              case 0:\n                if (!this.readOnly) {\n                  _context8.next = 2;\n                  break;\n                }\n                return _context8.abrupt(\"return\");\n              case 2:\n                if (!(this.syncActive > 0 && !force)) {\n                  _context8.next = 5;\n                  break;\n                }\n                logger.debug('SYNC: skip');\n                return _context8.abrupt(\"return\");\n              case 5:\n                this.syncActive++;\n                start = performance.now();\n                _context8.next = 9;\n                return new Promise(function (resolve, reject) {\n                  _this2.FS.syncfs(false, function () {\n                    var syncfs_time = (performance.now() - start) / 1000;\n                    _this2.syncfs_total_time += syncfs_time;\n                    logger.debug('SYNC: ' + syncfs_time);\n                    logger.debug('SYNC total: ' + _this2.syncfs_total_time);\n                    resolve();\n                  });\n                });\n              case 9:\n                this.syncActive--;\n              case 10:\n              case \"end\":\n                return _context8.stop();\n            }\n          }\n        }, _callee8, this);\n      }));\n      function sync(_x18) {\n        return _sync.apply(this, arguments);\n      }\n      return sync;\n    }()\n  }, {\n    key: \"close\",\n    value: function () {\n      var _close = asyncToGenerator_default()(/*#__PURE__*/regenerator_default.a.mark(function _callee9() {\n        return regenerator_default.a.wrap(function _callee9$(_context9) {\n          while (1) {\n            switch (_context9.prev = _context9.next) {\n              case 0:\n                clearInterval(this.syncfsInterval);\n                _context9.next = 3;\n                return this.sync(true);\n              case 3:\n              case \"end\":\n                return _context9.stop();\n            }\n          }\n        }, _callee9, this);\n      }));\n      function close() {\n        return _close.apply(this, arguments);\n      }\n      return close;\n    }()\n  }, {\n    key: \"destroy\",\n    value: function () {\n      var _destroy = asyncToGenerator_default()(/*#__PURE__*/regenerator_default.a.mark(function _callee10() {\n        var req;\n        return regenerator_default.a.wrap(function _callee10$(_context10) {\n          while (1) {\n            switch (_context10.prev = _context10.next) {\n              case 0:\n                clearInterval(this.syncfsInterval);\n                if (!this.readOnly) {\n                  _context10.next = 3;\n                  break;\n                }\n                return _context10.abrupt(\"return\");\n              case 3:\n                this.FS.unmount(this.root);\n                req = indexedDB.deleteDatabase(this.root);\n                _context10.next = 7;\n                return new Promise(function (resolve, reject) {\n                  req.onsuccess = function (e) {\n                    logger.info('SUCCESS');\n                    resolve(e.result);\n                  };\n                  req.onerror = function (e) {\n                    logger.info('ONERROR');\n                    reject(e.error);\n                  };\n                  req.onblocked = function (e) {\n                    logger.info('ONBLOCKED');\n                    reject('blocked');\n                  };\n                });\n              case 7:\n              case \"end\":\n                return _context10.stop();\n            }\n          }\n        }, _callee10, this);\n      }));\n      function destroy() {\n        return _destroy.apply(this, arguments);\n      }\n      return destroy;\n    }()\n  }], [{\n    key: \"create\",\n    value: function () {\n      var _create2 = asyncToGenerator_default()(/*#__PURE__*/regenerator_default.a.mark(function _callee11(root, FS_promise) {\n        var readOnly,\n          start,\n          dbfs,\n          FS,\n          rmrf,\n          dirs,\n          root_dir,\n          key,\n          value,\n          i,\n          dir,\n          create_time,\n          _args11 = arguments;\n        return regenerator_default.a.wrap(function _callee11$(_context11) {\n          while (1) {\n            switch (_context11.prev = _context11.next) {\n              case 0:\n                readOnly = _args11.length > 2 && _args11[2] !== undefined ? _args11[2] : false;\n                start = performance.now();\n                _context11.prev = 2;\n                dbfs = new DbFileSystem();\n                dbfs.root = root;\n                _context11.next = 7;\n                return FS_promise;\n              case 7:\n                FS = _context11.sent;\n                dbfs.FS = FS;\n                dbfs.syncfs_total_time = 0;\n                dbfs.readOnly = readOnly;\n                dbfs.syncActive = 0;\n                FS.mkdir(root);\n                FS.mount(FS.filesystems.IDBFS, {}, root);\n                _context11.next = 16;\n                return new Promise(function (resolve, reject) {\n                  FS.syncfs(true, function (err) {\n                    resolve();\n                  });\n                });\n              case 16:\n                rmrf = function rmrf(path) {\n                  logger.debug('rmrf ', path);\n                  var info;\n                  try {\n                    info = FS.lookupPath(path);\n                  } catch (e) {\n                    return;\n                  }\n                  logger.debug('rmrf ', path, info);\n                  if (info.node.isFolder) {\n                    for (var key in info.node.contents) {\n                      rmrf(info.path + '/' + info.node.contents[key].name);\n                    }\n                    logger.debug('rmdir ', path);\n                    FS.rmdir(path);\n                  } else {\n                    logger.debug('unlink ', path);\n                    FS.unlink(path);\n                  }\n                }; //const dirs = ['thumbnails', 'profile_photos', 'secret', 'stickers', 'temp', 'wallpapers', 'secret_thumbnails', 'passport'];\n                dirs = [];\n                root_dir = FS.lookupPath(root);\n                _context11.t0 = regenerator_default.a.keys(root_dir.node.contents);\n              case 20:\n                if ((_context11.t1 = _context11.t0()).done) {\n                  _context11.next = 29;\n                  break;\n                }\n                key = _context11.t1.value;\n                value = root_dir.node.contents[key];\n                logger.debug('node ', key, value);\n                if (value.isFolder) {\n                  _context11.next = 26;\n                  break;\n                }\n                return _context11.abrupt(\"continue\", 20);\n              case 26:\n                dirs.push(root_dir.path + '/' + value.name);\n                _context11.next = 20;\n                break;\n              case 29:\n                for (i in dirs) {\n                  dir = dirs[i];\n                  rmrf(dir);\n                  //FS.mkdir(dir);\n                  //FS.mount(FS.filesystems.MEMFS, {}, dir);\n                }\n                dbfs.syncfsInterval = setInterval(function () {\n                  dbfs.sync();\n                }, 5000);\n                create_time = (performance.now() - start) / 1000;\n                logger.debug('DbFileSystem::create ' + create_time);\n                return _context11.abrupt(\"return\", dbfs);\n              case 36:\n                _context11.prev = 36;\n                _context11.t2 = _context11[\"catch\"](2);\n                logger.error('Failed to init DbFileSystem: ', _context11.t2);\n              case 39:\n              case \"end\":\n                return _context11.stop();\n            }\n          }\n        }, _callee11, null, [[2, 36]]);\n      }));\n      function create(_x19, _x20) {\n        return _create2.apply(this, arguments);\n      }\n      return create;\n    }()\n  }]);\n  return DbFileSystem;\n}();\nvar worker_TdFileSystem = /*#__PURE__*/function () {\n  function TdFileSystem() {\n    classCallCheck_default()(this, TdFileSystem);\n  }\n  createClass_default()(TdFileSystem, [{\n    key: \"destroy\",\n    value: function () {\n      var _destroy2 = asyncToGenerator_default()(/*#__PURE__*/regenerator_default.a.mark(function _callee12() {\n        return regenerator_default.a.wrap(function _callee12$(_context12) {\n          while (1) {\n            switch (_context12.prev = _context12.next) {\n              case 0:\n                _context12.next = 2;\n                return this.dbFileSystem.destroy();\n              case 2:\n              case \"end\":\n                return _context12.stop();\n            }\n          }\n        }, _callee12, this);\n      }));\n      function destroy() {\n        return _destroy2.apply(this, arguments);\n      }\n      return destroy;\n    }()\n  }], [{\n    key: \"init_fs\",\n    value: function () {\n      var _init_fs = asyncToGenerator_default()(/*#__PURE__*/regenerator_default.a.mark(function _callee13(prefix, FS_promise) {\n        var FS;\n        return regenerator_default.a.wrap(function _callee13$(_context13) {\n          while (1) {\n            switch (_context13.prev = _context13.next) {\n              case 0:\n                _context13.next = 2;\n                return FS_promise;\n              case 2:\n                FS = _context13.sent;\n                FS.mkdir(prefix);\n                return _context13.abrupt(\"return\", FS);\n              case 5:\n              case \"end\":\n                return _context13.stop();\n            }\n          }\n        }, _callee13);\n      }));\n      function init_fs(_x21, _x22) {\n        return _init_fs.apply(this, arguments);\n      }\n      return init_fs;\n    }()\n  }, {\n    key: \"create\",\n    value: function () {\n      var _create3 = asyncToGenerator_default()(/*#__PURE__*/regenerator_default.a.mark(function _callee14(instanceName, FS_promise) {\n        var readOnly,\n          tdfs,\n          prefix,\n          inboundFileSystem,\n          dbFileSystem,\n          FS,\n          _args14 = arguments;\n        return regenerator_default.a.wrap(function _callee14$(_context14) {\n          while (1) {\n            switch (_context14.prev = _context14.next) {\n              case 0:\n                readOnly = _args14.length > 2 && _args14[2] !== undefined ? _args14[2] : false;\n                _context14.prev = 1;\n                tdfs = new TdFileSystem();\n                prefix = '/' + instanceName;\n                tdfs.prefix = prefix;\n                FS_promise = TdFileSystem.init_fs(prefix, FS_promise);\n\n                //MEMFS. Store to IDB and delete files as soon as possible\n                inboundFileSystem = worker_InboundFileSystem.create(instanceName, prefix + '/inboundfs', FS_promise); //IDBFS. MEMFS which is flushed to IDB from time to time\n                dbFileSystem = worker_DbFileSystem.create(prefix + '/dbfs', FS_promise, readOnly);\n                _context14.next = 10;\n                return FS_promise;\n              case 10:\n                FS = _context14.sent;\n                tdfs.FS = FS;\n\n                //WORKERFS. Temporary stores Blobs for outbound files\n                tdfs.outboundFileSystem = new worker_OutboundFileSystem(prefix + '/outboundfs', tdfs.FS);\n                _context14.next = 15;\n                return inboundFileSystem;\n              case 15:\n                tdfs.inboundFileSystem = _context14.sent;\n                _context14.next = 18;\n                return dbFileSystem;\n              case 18:\n                tdfs.dbFileSystem = _context14.sent;\n                return _context14.abrupt(\"return\", tdfs);\n              case 22:\n                _context14.prev = 22;\n                _context14.t0 = _context14[\"catch\"](1);\n                logger.error('Failed to init TdFileSystem: ', _context14.t0);\n              case 25:\n              case \"end\":\n                return _context14.stop();\n            }\n          }\n        }, _callee14, null, [[1, 22]]);\n      }));\n      function create(_x23, _x24) {\n        return _create3.apply(this, arguments);\n      }\n      return create;\n    }()\n  }]);\n  return TdFileSystem;\n}();\nvar worker_TdClient = /*#__PURE__*/function () {\n  function TdClient(callback) {\n    classCallCheck_default()(this, TdClient);\n    logger.info('Start worker');\n    this.pendingQueries = [];\n    this.isPending = true;\n    this.callback = callback;\n    this.wasInit = false;\n  }\n  createClass_default()(TdClient, [{\n    key: \"testLocalForage\",\n    value: function () {\n      var _testLocalForage = asyncToGenerator_default()(/*#__PURE__*/regenerator_default.a.mark(function _callee15() {\n        var DRIVERS, _i, _DRIVERS, driverName, x;\n        return regenerator_default.a.wrap(function _callee15$(_context15) {\n          while (1) {\n            switch (_context15.prev = _context15.next) {\n              case 0:\n                _context15.next = 2;\n                return initLocalForage();\n              case 2:\n                DRIVERS = [localforage_default.a.INDEXEDDB, 'memoryDriver', localforage_default.a.LOCALSTORAGE, localforage_default.a.WEBSQL, localForageDrivers];\n                _i = 0, _DRIVERS = DRIVERS;\n              case 4:\n                if (!(_i < _DRIVERS.length)) {\n                  _context15.next = 29;\n                  break;\n                }\n                driverName = _DRIVERS[_i];\n                console.log('Test ', driverName);\n                _context15.prev = 7;\n                _context15.next = 10;\n                return localforage_default.a.setDriver(driverName);\n              case 10:\n                console.log('A');\n                _context15.next = 13;\n                return localforage_default.a.setItem('hello', 'world');\n              case 13:\n                console.log('B');\n                _context15.next = 16;\n                return localforage_default.a.getItem('hello');\n              case 16:\n                x = _context15.sent;\n                console.log('receive ', x);\n                _context15.next = 20;\n                return localforage_default.a.clear();\n              case 20:\n                console.log('C');\n                _context15.next = 26;\n                break;\n              case 23:\n                _context15.prev = 23;\n                _context15.t0 = _context15[\"catch\"](7);\n                console.log('Error', _context15.t0);\n              case 26:\n                _i++;\n                _context15.next = 4;\n                break;\n              case 29:\n              case \"end\":\n                return _context15.stop();\n            }\n          }\n        }, _callee15, null, [[7, 23]]);\n      }));\n      function testLocalForage() {\n        return _testLocalForage.apply(this, arguments);\n      }\n      return testLocalForage;\n    }()\n  }, {\n    key: \"init\",\n    value: function () {\n      var _init = asyncToGenerator_default()(/*#__PURE__*/regenerator_default.a.mark(function _callee16(options) {\n        var _this3 = this;\n        var FS_promise, tdfs_promise;\n        return regenerator_default.a.wrap(function _callee16$(_context16) {\n          while (1) {\n            switch (_context16.prev = _context16.next) {\n              case 0:\n                if (!this.wasInit) {\n                  _context16.next = 2;\n                  break;\n                }\n                return _context16.abrupt(\"return\");\n              case 2:\n                //await this.testLocalForage();\n                logger.setVerbosity(options.jsLogVerbosityLevel);\n                this.wasInit = true;\n                options = options || {};\n                FS_promise = new Promise(function (resolve) {\n                  _this3.onFS = resolve;\n                });\n                tdfs_promise = worker_TdFileSystem.create(options.instanceName, FS_promise, options.readOnly);\n                this.useDatabase = true;\n                if ('useDatabase' in options) {\n                  this.useDatabase = options.useDatabase;\n                }\n                logger.info('load TdModule');\n                _context16.next = 12;\n                return loadTdlib(this.onFS, options.wasmUrl);\n              case 12:\n                this.TdModule = _context16.sent;\n                logger.info('loaded TdModule');\n                this.td_functions = {\n                  td_create: this.TdModule.cwrap('td_emscripten_create_client_id', 'number', []),\n                  td_send: this.TdModule.cwrap('td_emscripten_send', null, ['number', 'string']),\n                  td_execute: this.TdModule.cwrap('td_emscripten_execute', 'string', ['string']),\n                  td_receive: this.TdModule.cwrap('td_emscripten_receive', 'string', []),\n                  td_set_verbosity: function td_set_verbosity(verbosity) {\n                    _this3.td_functions.td_execute(JSON.stringify({\n                      '@type': 'setLogVerbosityLevel',\n                      new_verbosity_level: verbosity\n                    }));\n                  },\n                  td_get_timeout: this.TdModule.cwrap('td_emscripten_get_timeout', 'number', [])\n                };\n                //this.onFS(this.TdModule.FS);\n                this.FS = this.TdModule.FS;\n                this.TdModule['websocket']['on']('error', function (error) {\n                  _this3.scheduleReceiveSoon();\n                });\n                this.TdModule['websocket']['on']('open', function (fd) {\n                  _this3.scheduleReceiveSoon();\n                });\n                this.TdModule['websocket']['on']('listen', function (fd) {\n                  _this3.scheduleReceiveSoon();\n                });\n                this.TdModule['websocket']['on']('connection', function (fd) {\n                  _this3.scheduleReceiveSoon();\n                });\n                this.TdModule['websocket']['on']('message', function (fd) {\n                  _this3.scheduleReceiveSoon();\n                });\n                this.TdModule['websocket']['on']('close', function (fd) {\n                  _this3.scheduleReceiveSoon();\n                });\n\n                // wait till it is allowed to start\n                this.callback({\n                  '@type': 'inited'\n                });\n                _context16.next = 25;\n                return new Promise(function (resolve) {\n                  _this3.onStart = resolve;\n                });\n              case 25:\n                this.isStarted = true;\n                logger.info('may start now');\n                if (!this.isClosing) {\n                  _context16.next = 29;\n                  break;\n                }\n                return _context16.abrupt(\"return\");\n              case 29:\n                logger.info('FS start init');\n                _context16.next = 32;\n                return tdfs_promise;\n              case 32:\n                this.tdfs = _context16.sent;\n                logger.info('FS inited');\n                this.callback({\n                  '@type': 'fsInited'\n                });\n\n                // no async initialization after this point\n                if (options.logVerbosityLevel === undefined) {\n                  options.logVerbosityLevel = 2;\n                }\n                this.td_functions.td_set_verbosity(options.logVerbosityLevel);\n                this.client_id = this.td_functions.td_create();\n                this.savingFiles = new Map();\n                this.send({\n                  '@type': 'setOption',\n                  name: 'store_all_files_in_files_directory',\n                  value: {\n                    '@type': 'optionValueBoolean',\n                    value: true\n                  }\n                });\n                this.send({\n                  '@type': 'setOption',\n                  name: 'language_pack_database_path',\n                  value: {\n                    '@type': 'optionValueString',\n                    value: this.tdfs.dbFileSystem.root + '/language'\n                  }\n                });\n                this.send({\n                  '@type': 'setOption',\n                  name: 'ignore_background_updates',\n                  value: {\n                    '@type': 'optionValueBoolean',\n                    value: !this.useDatabase\n                  }\n                });\n                this.flushPendingQueries();\n                this.receive();\n              case 44:\n              case \"end\":\n                return _context16.stop();\n            }\n          }\n        }, _callee16, this);\n      }));\n      function init(_x25) {\n        return _init.apply(this, arguments);\n      }\n      return init;\n    }()\n  }, {\n    key: \"prepareQueryRecursive\",\n    value: function prepareQueryRecursive(query) {\n      if (query['@type'] === 'inputFileBlob') {\n        return {\n          '@type': 'inputFileLocal',\n          path: this.tdfs.outboundFileSystem.blobToPath(query.data, query.name)\n        };\n      }\n      for (var key in query) {\n        var field = query[key];\n        if (field && typeof_default()(field) === 'object') {\n          query[key] = this.prepareQueryRecursive(field);\n        }\n      }\n      return query;\n    }\n  }, {\n    key: \"prepareQuery\",\n    value: function prepareQuery(query) {\n      if (query['@type'] === 'setTdlibParameters') {\n        query.database_directory = this.tdfs.dbFileSystem.root;\n        query.files_directory = this.tdfs.inboundFileSystem.root;\n        var useDb = this.useDatabase;\n        query.use_file_database = useDb;\n        query.use_chat_info_database = useDb;\n        query.use_message_database = useDb;\n        query.use_secret_chats = useDb;\n      }\n      if (query['@type'] === 'getLanguagePackString') {\n        query.language_pack_database_path = this.tdfs.dbFileSystem.root + '/language';\n      }\n      return this.prepareQueryRecursive(query);\n    }\n  }, {\n    key: \"onStart\",\n    value: function onStart() {\n      //nop\n      logger.info('ignore on_start');\n    }\n  }, {\n    key: \"deleteIdbKey\",\n    value: function deleteIdbKey(query) {\n      try {} catch (e) {\n        this.callback({\n          '@type': 'error',\n          '@extra': query['@extra'],\n          code: 400,\n          message: e\n        });\n        return;\n      }\n      this.callback({\n        '@type': 'ok',\n        '@extra': query['@extra']\n      });\n    }\n  }, {\n    key: \"readFilePart\",\n    value: function readFilePart(query) {\n      var res;\n      try {\n        //const file_size = this.FS.stat(query.path).size;\n        var stream = this.FS.open(query.path, 'r');\n        var buf = new Uint8Array(query.count);\n        this.FS.read(stream, buf, 0, query.count, query.offset);\n        this.FS.close(stream);\n        res = buf;\n      } catch (e) {\n        this.callback({\n          '@type': 'error',\n          '@extra': query['@extra'],\n          code: 400,\n          message: e.toString()\n        });\n        return;\n      }\n      this.callback({\n        '@type': 'filePart',\n        '@extra': query['@extra'],\n        data: res\n      }, [res.buffer]);\n    }\n  }, {\n    key: \"send\",\n    value: function send(query) {\n      if (this.isClosing) {\n        return;\n      }\n      if (this.wasFatalError) {\n        if (query['@type'] === 'destroy') {\n          this.destroy({\n            '@type': 'ok',\n            '@extra': query['@extra']\n          });\n        }\n        return;\n      }\n      if (query['@type'] === 'init') {\n        this.init(query.options);\n        return;\n      }\n      if (query['@type'] === 'start') {\n        logger.info('on_start');\n        this.onStart();\n        return;\n      }\n      if (query['@type'] === 'setJsLogVerbosityLevel') {\n        logger.setVerbosity(query.new_verbosity_level);\n        return;\n      }\n      if (this.isPending) {\n        this.pendingQueries.push(query);\n        return;\n      }\n      if (query['@type'] === 'setLogVerbosityLevel' || query['@type'] === 'getLogVerbosityLevel' || query['@type'] === 'setLogTagVerbosityLevel' || query['@type'] === 'getLogTagVerbosityLevel' || query['@type'] === 'getLogTags') {\n        this.execute(query);\n        return;\n      }\n      if (query['@type'] === 'readFilePart') {\n        this.readFilePart(query);\n        return;\n      }\n      if (query['@type'] === 'deleteIdbKey') {\n        this.deleteIdbKey(query);\n        return;\n      }\n      query = this.prepareQuery(query);\n      this.td_functions.td_send(this.client_id, JSON.stringify(query));\n      this.scheduleReceiveSoon();\n    }\n  }, {\n    key: \"execute\",\n    value: function execute(query) {\n      try {\n        var res = this.td_functions.td_execute(JSON.stringify(query));\n        var response = JSON.parse(res);\n        this.callback(response);\n      } catch (error) {\n        this.onFatalError(error);\n      }\n    }\n  }, {\n    key: \"receive\",\n    value: function receive() {\n      this.cancelReceive();\n      if (this.wasFatalError) {\n        return;\n      }\n      try {\n        while (true) {\n          var msg = this.td_functions.td_receive();\n          if (!msg) {\n            break;\n          }\n          var response = this.prepareResponse(JSON.parse(msg));\n          if (response['@type'] === 'updateAuthorizationState' && response.authorization_state['@type'] === 'authorizationStateClosed') {\n            this.close(response);\n            break;\n          }\n          this.callback(response);\n        }\n        this.scheduleReceive();\n      } catch (error) {\n        this.onFatalError(error);\n      }\n    }\n  }, {\n    key: \"cancelReceive\",\n    value: function cancelReceive() {\n      if (this.receiveTimeout) {\n        clearTimeout(this.receiveTimeout);\n        delete this.receiveTimeout;\n      }\n      delete this.receiveSoon;\n    }\n  }, {\n    key: \"scheduleReceiveSoon\",\n    value: function scheduleReceiveSoon() {\n      if (this.receiveSoon) {\n        return;\n      }\n      this.cancelReceive();\n      this.receiveSoon = true;\n      this.scheduleReceiveIn(0.001);\n    }\n  }, {\n    key: \"scheduleReceive\",\n    value: function scheduleReceive() {\n      if (this.receiveSoon) {\n        return;\n      }\n      this.cancelReceive();\n      var timeout = this.td_functions.td_get_timeout();\n      this.scheduleReceiveIn(timeout);\n    }\n  }, {\n    key: \"scheduleReceiveIn\",\n    value: function scheduleReceiveIn(timeout) {\n      var _this4 = this;\n      //return;\n      logger.debug('Scheduler receive in ' + timeout + 's');\n      this.receiveTimeout = setTimeout(function () {\n        return _this4.receive();\n      }, timeout * 1000);\n    }\n  }, {\n    key: \"onFatalError\",\n    value: function onFatalError(error) {\n      this.wasFatalError = true;\n      this.asyncOnFatalError(error);\n    }\n  }, {\n    key: \"close\",\n    value: function () {\n      var _close2 = asyncToGenerator_default()(/*#__PURE__*/regenerator_default.a.mark(function _callee17(last_update) {\n        return regenerator_default.a.wrap(function _callee17$(_context17) {\n          while (1) {\n            switch (_context17.prev = _context17.next) {\n              case 0:\n                // close db and cancel all timers\n                this.isClosing = true;\n                if (!this.isStarted) {\n                  _context17.next = 7;\n                  break;\n                }\n                logger.debug('close worker: start');\n                _context17.next = 5;\n                return this.tdfs.dbFileSystem.close();\n              case 5:\n                this.cancelReceive();\n                logger.debug('close worker: finish');\n              case 7:\n                this.callback(last_update);\n              case 8:\n              case \"end\":\n                return _context17.stop();\n            }\n          }\n        }, _callee17, this);\n      }));\n      function close(_x26) {\n        return _close2.apply(this, arguments);\n      }\n      return close;\n    }()\n  }, {\n    key: \"destroy\",\n    value: function () {\n      var _destroy3 = asyncToGenerator_default()(/*#__PURE__*/regenerator_default.a.mark(function _callee18(result) {\n        return regenerator_default.a.wrap(function _callee18$(_context18) {\n          while (1) {\n            switch (_context18.prev = _context18.next) {\n              case 0:\n                _context18.prev = 0;\n                logger.info('destroy tdfs ...');\n                _context18.next = 4;\n                return this.tdfs.destroy();\n              case 4:\n                logger.info('destroy tdfs ok');\n                _context18.next = 10;\n                break;\n              case 7:\n                _context18.prev = 7;\n                _context18.t0 = _context18[\"catch\"](0);\n                logger.error('Failed destroy', _context18.t0);\n              case 10:\n                this.callback(result);\n                this.callback({\n                  '@type': 'updateAuthorizationState',\n                  authorization_state: {\n                    '@type': 'authorizationStateClosed'\n                  }\n                });\n              case 12:\n              case \"end\":\n                return _context18.stop();\n            }\n          }\n        }, _callee18, this, [[0, 7]]);\n      }));\n      function destroy(_x27) {\n        return _destroy3.apply(this, arguments);\n      }\n      return destroy;\n    }()\n  }, {\n    key: \"asyncOnFatalError\",\n    value: function () {\n      var _asyncOnFatalError = asyncToGenerator_default()(/*#__PURE__*/regenerator_default.a.mark(function _callee19(error) {\n        return regenerator_default.a.wrap(function _callee19$(_context19) {\n          while (1) {\n            switch (_context19.prev = _context19.next) {\n              case 0:\n                _context19.next = 2;\n                return this.tdfs.dbFileSystem.sync();\n              case 2:\n                this.callback({\n                  '@type': 'updateFatalError',\n                  error: error\n                });\n              case 3:\n              case \"end\":\n                return _context19.stop();\n            }\n          }\n        }, _callee19, this);\n      }));\n      function asyncOnFatalError(_x28) {\n        return _asyncOnFatalError.apply(this, arguments);\n      }\n      return asyncOnFatalError;\n    }()\n  }, {\n    key: \"saveFile\",\n    value: function saveFile(pid, file) {\n      var isSaving = this.savingFiles.has(pid);\n      this.savingFiles.set(pid, file);\n      if (isSaving) {\n        return file;\n      }\n      try {\n        var arr = this.FS.readFile(file.local.path);\n        if (arr) {\n          file = Object.assign({}, file);\n          file.arr = arr;\n          this.doSaveFile(pid, file, arr);\n        }\n      } catch (e) {\n        logger.error('Failed to readFile: ', e);\n      }\n      return file;\n    }\n  }, {\n    key: \"doSaveFile\",\n    value: function () {\n      var _doSaveFile = asyncToGenerator_default()(/*#__PURE__*/regenerator_default.a.mark(function _callee20(pid, file, arr) {\n        return regenerator_default.a.wrap(function _callee20$(_context20) {\n          while (1) {\n            switch (_context20.prev = _context20.next) {\n              case 0:\n                _context20.next = 2;\n                return this.tdfs.inboundFileSystem.persist(pid, file.local.path, arr);\n              case 2:\n                file = this.savingFiles.get(pid);\n                file.idb_key = pid;\n                this.callback({\n                  '@type': 'updateFile',\n                  file: file\n                });\n                this.savingFiles[\"delete\"](pid);\n              case 6:\n              case \"end\":\n                return _context20.stop();\n            }\n          }\n        }, _callee20, this);\n      }));\n      function doSaveFile(_x29, _x30, _x31) {\n        return _doSaveFile.apply(this, arguments);\n      }\n      return doSaveFile;\n    }()\n  }, {\n    key: \"prepareFile\",\n    value: function prepareFile(file) {\n      var pid = file.remote.unique_id ? file.remote.unique_id : file.remote.id;\n      if (!pid) {\n        return file;\n      }\n      if (file.local.is_downloading_active) {\n        this.tdfs.inboundFileSystem.forget(pid);\n      } else if (this.tdfs.inboundFileSystem.has(pid)) {\n        file.idb_key = pid;\n        return file;\n      }\n      if (file.local.is_downloading_completed) {\n        file = this.saveFile(pid, file);\n      }\n      return file;\n    }\n  }, {\n    key: \"prepareResponse\",\n    value: function prepareResponse(response) {\n      if (response['@type'] === 'file') {\n        return this.prepareFile(response);\n      }\n      for (var key in response) {\n        var field = response[key];\n        if (field && typeof_default()(field) === 'object') {\n          response[key] = this.prepareResponse(field);\n        }\n      }\n      return response;\n    }\n  }, {\n    key: \"flushPendingQueries\",\n    value: function flushPendingQueries() {\n      this.isPending = false;\n      var _iteratorNormalCompletion = true;\n      var _didIteratorError = false;\n      var _iteratorError = undefined;\n      try {\n        for (var _iterator = this.pendingQueries[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {\n          var query = _step.value;\n          this.send(query);\n        }\n      } catch (err) {\n        _didIteratorError = true;\n        _iteratorError = err;\n      } finally {\n        try {\n          if (!_iteratorNormalCompletion && _iterator[\"return\"] != null) {\n            _iterator[\"return\"]();\n          }\n        } finally {\n          if (_didIteratorError) {\n            throw _iteratorError;\n          }\n        }\n      }\n    }\n  }]);\n  return TdClient;\n}();\nvar client = new worker_TdClient(function (e) {\n  var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];\n  return postMessage(e, t);\n});\nonmessage = function onmessage(e) {\n  try {\n    client.send(e.data);\n  } catch (error) {\n    client.onFatalError(error);\n  }\n};\n\n/***/ })\n/******/ ]);";return function(){var _b=new Blob(['self.__tdBase='+JSON.stringify(location.href.slice(0,location.href.lastIndexOf('/')+1))+';'+_c],{type:'application/javascript'});return new Worker(URL.createObjectURL(_b));};}());

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var rng = __webpack_require__(15);
var bytesToUuid = __webpack_require__(16);

function v4(options, buf, offset) {
  var i = buf && offset || 0;

  if (typeof(options) == 'string') {
    buf = options === 'binary' ? new Array(16) : null;
    options = null;
  }
  options = options || {};

  var rnds = options.random || (options.rng || rng)();

  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
  rnds[6] = (rnds[6] & 0x0f) | 0x40;
  rnds[8] = (rnds[8] & 0x3f) | 0x80;

  // Copy bytes to buffer, if provided
  if (buf) {
    for (var ii = 0; ii < 16; ++ii) {
      buf[i + ii] = rnds[ii];
    }
  }

  return buf || bytesToUuid(rnds);
}

module.exports = v4;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(17);


/***/ }),
/* 10 */
/***/ (function(module, exports) {

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

module.exports = _arrayWithHoles;

/***/ }),
/* 11 */
/***/ (function(module, exports) {

function _iterableToArrayLimit(arr, i) {
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

module.exports = _iterableToArrayLimit;

/***/ }),
/* 12 */
/***/ (function(module, exports) {

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

module.exports = _nonIterableRest;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   true ? module.exports : undefined
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}


/***/ }),
/* 14 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),
/* 15 */
/***/ (function(module, exports) {

// Unique ID creation requires a high quality random # generator.  In the
// browser this is a little complicated due to unknown quality of Math.random()
// and inconsistent support for the `crypto` API.  We do the best we can via
// feature-detection

// getRandomValues needs to be invoked in a context where "this" is a Crypto
// implementation. Also, find the complete implementation of crypto on IE11.
var getRandomValues = (typeof(crypto) != 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto)) ||
                      (typeof(msCrypto) != 'undefined' && typeof window.msCrypto.getRandomValues == 'function' && msCrypto.getRandomValues.bind(msCrypto));

if (getRandomValues) {
  // WHATWG crypto RNG - http://wiki.whatwg.org/wiki/Crypto
  var rnds8 = new Uint8Array(16); // eslint-disable-line no-undef

  module.exports = function whatwgRNG() {
    getRandomValues(rnds8);
    return rnds8;
  };
} else {
  // Math.random()-based (RNG)
  //
  // If all else fails, use Math.random().  It's fast, but is of unspecified
  // quality.
  var rnds = new Array(16);

  module.exports = function mathRNG() {
    for (var i = 0, r; i < 16; i++) {
      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
      rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
    }

    return rnds;
  };
}


/***/ }),
/* 16 */
/***/ (function(module, exports) {

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
var byteToHex = [];
for (var i = 0; i < 256; ++i) {
  byteToHex[i] = (i + 0x100).toString(16).substr(1);
}

function bytesToUuid(buf, offset) {
  var i = offset || 0;
  var bth = byteToHex;
  // join used to fix memory issue caused by concatenation: https://bugs.chromium.org/p/v8/issues/detail?id=3175#c4
  return ([bth[buf[i++]], bth[buf[i++]], 
	bth[buf[i++]], bth[buf[i++]], '-',
	bth[buf[i++]], bth[buf[i++]], '-',
	bth[buf[i++]], bth[buf[i++]], '-',
	bth[buf[i++]], bth[buf[i++]], '-',
	bth[buf[i++]], bth[buf[i++]],
	bth[buf[i++]], bth[buf[i++]],
	bth[buf[i++]], bth[buf[i++]]]).join('');
}

module.exports = bytesToUuid;


/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/typeof.js
var helpers_typeof = __webpack_require__(5);
var typeof_default = /*#__PURE__*/__webpack_require__.n(helpers_typeof);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/slicedToArray.js
var slicedToArray = __webpack_require__(6);
var slicedToArray_default = /*#__PURE__*/__webpack_require__.n(slicedToArray);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/regenerator/index.js
var regenerator = __webpack_require__(0);
var regenerator_default = /*#__PURE__*/__webpack_require__.n(regenerator);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/asyncToGenerator.js
var asyncToGenerator = __webpack_require__(2);
var asyncToGenerator_default = /*#__PURE__*/__webpack_require__.n(asyncToGenerator);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/classCallCheck.js
var classCallCheck = __webpack_require__(3);
var classCallCheck_default = /*#__PURE__*/__webpack_require__.n(classCallCheck);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/createClass.js
var createClass = __webpack_require__(4);
var createClass_default = /*#__PURE__*/__webpack_require__.n(createClass);

// EXTERNAL MODULE: ./src/worker.js
var worker = __webpack_require__(7);
var worker_default = /*#__PURE__*/__webpack_require__.n(worker);

// CONCATENATED MODULE: ./node_modules/broadcast-channel/dist/es/util.js
/**
 * returns true if the given object is a promise
 */
function isPromise(obj) {
  if (obj && typeof obj.then === 'function') {
    return true;
  } else {
    return false;
  }
}
function sleep(time) {
  if (!time) time = 0;
  return new Promise(function (res) {
    return setTimeout(res, time);
  });
}
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
/**
 * https://stackoverflow.com/a/1349426/3443137
 */

function randomToken(length) {
  if (!length) length = 5;
  var text = '';
  var possible = 'abcdefghijklmnopqrstuvwxzy0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
}
var lastMs = 0;
var additional = 0;
/**
 * returns the current time in micro-seconds,
 * WARNING: This is a pseudo-function
 * Performance.now is not reliable in webworkers, so we just make sure to never return the same time.
 * This is enough in browsers, and this function will not be used in nodejs.
 * The main reason for this hack is to ensure that BroadcastChannel behaves equal to production when it is used in fast-running unit tests.
 */

function microSeconds() {
  var ms = new Date().getTime();

  if (ms === lastMs) {
    additional++;
    return ms * 1000 + additional;
  } else {
    lastMs = ms;
    additional = 0;
    return ms * 1000;
  }
}
// EXTERNAL MODULE: ./node_modules/detect-node/browser.js
var browser = __webpack_require__(1);
var browser_default = /*#__PURE__*/__webpack_require__.n(browser);

// CONCATENATED MODULE: ./node_modules/broadcast-channel/dist/es/methods/native.js


var native_microSeconds = microSeconds;
var type = 'native';
function create(channelName) {
  var state = {
    messagesCallback: null,
    bc: new BroadcastChannel(channelName),
    subFns: [] // subscriberFunctions

  };

  state.bc.onmessage = function (msg) {
    if (state.messagesCallback) {
      state.messagesCallback(msg.data);
    }
  };

  return state;
}
function native_close(channelState) {
  channelState.bc.close();
  channelState.subFns = [];
}
function postMessage(channelState, messageJson) {
  channelState.bc.postMessage(messageJson, false);
}
function onMessage(channelState, fn, time) {
  channelState.messagesCallbackTime = time;
  channelState.messagesCallback = fn;
}
function canBeUsed() {
  /**
   * in the electron-renderer, isNode will be true even if we are in browser-context
   * so we also check if window is undefined
   */
  if (browser_default.a && typeof window === 'undefined') return false;

  if (typeof BroadcastChannel === 'function') {
    if (BroadcastChannel._pubkey) {
      throw new Error('BroadcastChannel: Do not overwrite window.BroadcastChannel with this module, this is not a polyfill');
    }

    return true;
  } else return false;
}
function averageResponseTime() {
  return 100;
}
/* harmony default export */ var methods_native = ({
  create: create,
  close: native_close,
  onMessage: onMessage,
  postMessage: postMessage,
  canBeUsed: canBeUsed,
  type: type,
  averageResponseTime: averageResponseTime,
  microSeconds: native_microSeconds
});
// CONCATENATED MODULE: ./node_modules/broadcast-channel/dist/es/oblivious-set.js
/**
 *
 *
 */
var ObliviousSet = function ObliviousSet(ttl) {
  this.ttl = ttl;
  this.set = new Set();
  this.timeMap = new Map();
  this.has = this.set.has.bind(this.set);
};

ObliviousSet.prototype = {
  add: function add(value) {
    this.timeMap.set(value, oblivious_set_now());
    this.set.add(value);

    _removeTooOldValues(this);
  },
  clear: function clear() {
    this.set.clear();
    this.timeMap.clear();
  }
};
function _removeTooOldValues(obliviousSet) {
  var olderThen = oblivious_set_now() - obliviousSet.ttl;
  var iterator = obliviousSet.set[Symbol.iterator]();

  while (true) {
    var value = iterator.next().value;
    if (!value) return; // no more elements

    var time = obliviousSet.timeMap.get(value);

    if (time < olderThen) {
      obliviousSet.timeMap["delete"](value);
      obliviousSet.set["delete"](value);
    } else {
      // we reached a value that is not old enough
      return;
    }
  }
}

function oblivious_set_now() {
  return new Date().getTime();
}

/* harmony default export */ var oblivious_set = (ObliviousSet);
// CONCATENATED MODULE: ./node_modules/broadcast-channel/dist/es/options.js
function fillOptionsWithDefaults(options) {
  if (!options) options = {};
  options = JSON.parse(JSON.stringify(options)); // main

  if (typeof options.webWorkerSupport === 'undefined') options.webWorkerSupport = true; // indexed-db

  if (!options.idb) options.idb = {}; //  after this time the messages get deleted

  if (!options.idb.ttl) options.idb.ttl = 1000 * 45;
  if (!options.idb.fallbackInterval) options.idb.fallbackInterval = 150; // localstorage

  if (!options.localstorage) options.localstorage = {};
  if (!options.localstorage.removeTimeout) options.localstorage.removeTimeout = 1000 * 60; // node

  if (!options.node) options.node = {};
  if (!options.node.ttl) options.node.ttl = 1000 * 60 * 2; // 2 minutes;

  if (typeof options.node.useFastPath === 'undefined') options.node.useFastPath = true;
  return options;
}
// CONCATENATED MODULE: ./node_modules/broadcast-channel/dist/es/methods/indexed-db.js
/**
 * this method uses indexeddb to store the messages
 * There is currently no observerAPI for idb
 * @link https://github.com/w3c/IndexedDB/issues/51
 */


var indexed_db_microSeconds = microSeconds;


var DB_PREFIX = 'pubkey.broadcast-channel-0-';
var OBJECT_STORE_ID = 'messages';
var indexed_db_type = 'idb';
function getIdb() {
  if (typeof indexedDB !== 'undefined') return indexedDB;
  if (typeof window.mozIndexedDB !== 'undefined') return window.mozIndexedDB;
  if (typeof window.webkitIndexedDB !== 'undefined') return window.webkitIndexedDB;
  if (typeof window.msIndexedDB !== 'undefined') return window.msIndexedDB;
  return false;
}
function createDatabase(channelName) {
  var IndexedDB = getIdb(); // create table

  var dbName = DB_PREFIX + channelName;
  var openRequest = IndexedDB.open(dbName, 1);

  openRequest.onupgradeneeded = function (ev) {
    var db = ev.target.result;
    db.createObjectStore(OBJECT_STORE_ID, {
      keyPath: 'id',
      autoIncrement: true
    });
  };

  var dbPromise = new Promise(function (res, rej) {
    openRequest.onerror = function (ev) {
      return rej(ev);
    };

    openRequest.onsuccess = function () {
      res(openRequest.result);
    };
  });
  return dbPromise;
}
/**
 * writes the new message to the database
 * so other readers can find it
 */

function writeMessage(db, readerUuid, messageJson) {
  var time = new Date().getTime();
  var writeObject = {
    uuid: readerUuid,
    time: time,
    data: messageJson
  };
  var transaction = db.transaction([OBJECT_STORE_ID], 'readwrite');
  return new Promise(function (res, rej) {
    transaction.oncomplete = function () {
      return res();
    };

    transaction.onerror = function (ev) {
      return rej(ev);
    };

    var objectStore = transaction.objectStore(OBJECT_STORE_ID);
    objectStore.add(writeObject);
  });
}
function getAllMessages(db) {
  var objectStore = db.transaction(OBJECT_STORE_ID).objectStore(OBJECT_STORE_ID);
  var ret = [];
  return new Promise(function (res) {
    objectStore.openCursor().onsuccess = function (ev) {
      var cursor = ev.target.result;

      if (cursor) {
        ret.push(cursor.value); //alert("Name for SSN " + cursor.key + " is " + cursor.value.name);

        cursor["continue"]();
      } else {
        res(ret);
      }
    };
  });
}
function getMessagesHigherThen(db, lastCursorId) {
  var objectStore = db.transaction(OBJECT_STORE_ID).objectStore(OBJECT_STORE_ID);
  var ret = [];
  var keyRangeValue = IDBKeyRange.bound(lastCursorId + 1, Infinity);
  return new Promise(function (res) {
    objectStore.openCursor(keyRangeValue).onsuccess = function (ev) {
      var cursor = ev.target.result;

      if (cursor) {
        ret.push(cursor.value); //alert("Name for SSN " + cursor.key + " is " + cursor.value.name);

        cursor["continue"]();
      } else {
        res(ret);
      }
    };
  });
}
function removeMessageById(db, id) {
  var request = db.transaction([OBJECT_STORE_ID], 'readwrite').objectStore(OBJECT_STORE_ID)["delete"](id);
  return new Promise(function (res) {
    request.onsuccess = function () {
      return res();
    };
  });
}
function getOldMessages(db, ttl) {
  var olderThen = new Date().getTime() - ttl;
  var objectStore = db.transaction(OBJECT_STORE_ID).objectStore(OBJECT_STORE_ID);
  var ret = [];
  return new Promise(function (res) {
    objectStore.openCursor().onsuccess = function (ev) {
      var cursor = ev.target.result;

      if (cursor) {
        var msgObk = cursor.value;

        if (msgObk.time < olderThen) {
          ret.push(msgObk); //alert("Name for SSN " + cursor.key + " is " + cursor.value.name);

          cursor["continue"]();
        } else {
          // no more old messages,
          res(ret);
          return;
        }
      } else {
        res(ret);
      }
    };
  });
}
function cleanOldMessages(db, ttl) {
  return getOldMessages(db, ttl).then(function (tooOld) {
    return Promise.all(tooOld.map(function (msgObj) {
      return removeMessageById(db, msgObj.id);
    }));
  });
}
function indexed_db_create(channelName, options) {
  options = fillOptionsWithDefaults(options);
  return createDatabase(channelName).then(function (db) {
    var state = {
      closed: false,
      lastCursorId: 0,
      channelName: channelName,
      options: options,
      uuid: randomToken(10),

      /**
       * emittedMessagesIds
       * contains all messages that have been emitted before
       * @type {ObliviousSet}
       */
      eMIs: new oblivious_set(options.idb.ttl * 2),
      // ensures we do not read messages in parrallel
      writeBlockPromise: Promise.resolve(),
      messagesCallback: null,
      readQueuePromises: [],
      db: db
    };
    /**
     * if service-workers are used,
     * we have no 'storage'-event if they post a message,
     * therefore we also have to set an interval
     */

    _readLoop(state);

    return state;
  });
}

function _readLoop(state) {
  if (state.closed) return;
  return readNewMessages(state).then(function () {
    return sleep(state.options.idb.fallbackInterval);
  }).then(function () {
    return _readLoop(state);
  });
}

function _filterMessage(msgObj, state) {
  if (msgObj.uuid === state.uuid) return false; // send by own

  if (state.eMIs.has(msgObj.id)) return false; // already emitted

  if (msgObj.data.time < state.messagesCallbackTime) return false; // older then onMessageCallback

  return true;
}
/**
 * reads all new messages from the database and emits them
 */


function readNewMessages(state) {
  // channel already closed
  if (state.closed) return Promise.resolve(); // if no one is listening, we do not need to scan for new messages

  if (!state.messagesCallback) return Promise.resolve();
  return getMessagesHigherThen(state.db, state.lastCursorId).then(function (newerMessages) {
    var useMessages = newerMessages.map(function (msgObj) {
      if (msgObj.id > state.lastCursorId) {
        state.lastCursorId = msgObj.id;
      }

      return msgObj;
    }).filter(function (msgObj) {
      return _filterMessage(msgObj, state);
    }).sort(function (msgObjA, msgObjB) {
      return msgObjA.time - msgObjB.time;
    }); // sort by time

    useMessages.forEach(function (msgObj) {
      if (state.messagesCallback) {
        state.eMIs.add(msgObj.id);
        state.messagesCallback(msgObj.data);
      }
    });
    return Promise.resolve();
  });
}

function indexed_db_close(channelState) {
  channelState.closed = true;
  channelState.db.close();
}
function indexed_db_postMessage(channelState, messageJson) {
  channelState.writeBlockPromise = channelState.writeBlockPromise.then(function () {
    return writeMessage(channelState.db, channelState.uuid, messageJson);
  }).then(function () {
    if (randomInt(0, 10) === 0) {
      /* await (do not await) */
      cleanOldMessages(channelState.db, channelState.options.idb.ttl);
    }
  });
  return channelState.writeBlockPromise;
}
function indexed_db_onMessage(channelState, fn, time) {
  channelState.messagesCallbackTime = time;
  channelState.messagesCallback = fn;
  readNewMessages(channelState);
}
function indexed_db_canBeUsed() {
  if (browser_default.a) return false;
  var idb = getIdb();
  if (!idb) return false;
  return true;
}
function indexed_db_averageResponseTime(options) {
  return options.idb.fallbackInterval * 2;
}
/* harmony default export */ var indexed_db = ({
  create: indexed_db_create,
  close: indexed_db_close,
  onMessage: indexed_db_onMessage,
  postMessage: indexed_db_postMessage,
  canBeUsed: indexed_db_canBeUsed,
  type: indexed_db_type,
  averageResponseTime: indexed_db_averageResponseTime,
  microSeconds: indexed_db_microSeconds
});
// CONCATENATED MODULE: ./node_modules/broadcast-channel/dist/es/methods/localstorage.js
/**
 * A localStorage-only method which uses localstorage and its 'storage'-event
 * This does not work inside of webworkers because they have no access to locastorage
 * This is basically implemented to support IE9 or your grandmothers toaster.
 * @link https://caniuse.com/#feat=namevalue-storage
 * @link https://caniuse.com/#feat=indexeddb
 */




var localstorage_microSeconds = microSeconds;
var KEY_PREFIX = 'pubkey.broadcastChannel-';
var localstorage_type = 'localstorage';
/**
 * copied from crosstab
 * @link https://github.com/tejacques/crosstab/blob/master/src/crosstab.js#L32
 */

function getLocalStorage() {
  var localStorage;
  if (typeof window === 'undefined') return null;

  try {
    localStorage = window.localStorage;
    localStorage = window['ie8-eventlistener/storage'] || window.localStorage;
  } catch (e) {// New versions of Firefox throw a Security exception
    // if cookies are disabled. See
    // https://bugzilla.mozilla.org/show_bug.cgi?id=1028153
  }

  return localStorage;
}
function storageKey(channelName) {
  return KEY_PREFIX + channelName;
}
/**
* writes the new message to the storage
* and fires the storage-event so other readers can find it
*/

function localstorage_postMessage(channelState, messageJson) {
  return new Promise(function (res) {
    sleep().then(function () {
      var key = storageKey(channelState.channelName);
      var writeObj = {
        token: randomToken(10),
        time: new Date().getTime(),
        data: messageJson,
        uuid: channelState.uuid
      };
      var value = JSON.stringify(writeObj);
      localStorage.setItem(key, value);
      /**
       * StorageEvent does not fire the 'storage' event
       * in the window that changes the state of the local storage.
       * So we fire it manually
       */

      var ev = document.createEvent('Event');
      ev.initEvent('storage', true, true);
      ev.key = key;
      ev.newValue = value;
      window.dispatchEvent(ev);
      res();
    });
  });
}
function addStorageEventListener(channelName, fn) {
  var key = storageKey(channelName);

  var listener = function listener(ev) {
    if (ev.key === key) {
      fn(JSON.parse(ev.newValue));
    }
  };

  window.addEventListener('storage', listener);
  return listener;
}
function removeStorageEventListener(listener) {
  window.removeEventListener('storage', listener);
}
function localstorage_create(channelName, options) {
  options = fillOptionsWithDefaults(options);

  if (!localstorage_canBeUsed()) {
    throw new Error('BroadcastChannel: localstorage cannot be used');
  }

  var uuid = randomToken(10);
  /**
   * eMIs
   * contains all messages that have been emitted before
   * @type {ObliviousSet}
   */

  var eMIs = new oblivious_set(options.localstorage.removeTimeout);
  var state = {
    channelName: channelName,
    uuid: uuid,
    eMIs: eMIs // emittedMessagesIds

  };
  state.listener = addStorageEventListener(channelName, function (msgObj) {
    if (!state.messagesCallback) return; // no listener

    if (msgObj.uuid === uuid) return; // own message

    if (!msgObj.token || eMIs.has(msgObj.token)) return; // already emitted

    if (msgObj.data.time && msgObj.data.time < state.messagesCallbackTime) return; // too old

    eMIs.add(msgObj.token);
    state.messagesCallback(msgObj.data);
  });
  return state;
}
function localstorage_close(channelState) {
  removeStorageEventListener(channelState.listener);
}
function localstorage_onMessage(channelState, fn, time) {
  channelState.messagesCallbackTime = time;
  channelState.messagesCallback = fn;
}
function localstorage_canBeUsed() {
  if (browser_default.a) return false;
  var ls = getLocalStorage();
  if (!ls) return false;
  return true;
}
function localstorage_averageResponseTime() {
  return 120;
}
/* harmony default export */ var localstorage = ({
  create: localstorage_create,
  close: localstorage_close,
  onMessage: localstorage_onMessage,
  postMessage: localstorage_postMessage,
  canBeUsed: localstorage_canBeUsed,
  type: localstorage_type,
  averageResponseTime: localstorage_averageResponseTime,
  microSeconds: localstorage_microSeconds
});
// CONCATENATED MODULE: ./node_modules/broadcast-channel/dist/es/method-chooser.js
var require;


 // order is important

var METHODS = [methods_native, // fastest
indexed_db, localstorage];
var REQUIRE_FUN = require;
/**
 * The NodeMethod is loaded lazy
 * so it will not get bundled in browser-builds
 */

if (browser_default.a) {
  /**
   * we use the non-transpiled code for nodejs
   * because it runs faster
   */
  var NodeMethod = __webpack_require__(14);
  /**
   * this will be false for webpackbuilds
   * which will shim the node-method with an empty object {}
   */

  if (typeof NodeMethod.canBeUsed === 'function') {
    METHODS.push(NodeMethod);
  }
}

function chooseMethod(options) {
  // directly chosen
  if (options.type) {
    var ret = METHODS.find(function (m) {
      return m.type === options.type;
    });
    if (!ret) throw new Error('method-type ' + options.type + ' not found');else return ret;
  }

  var chooseMethods = METHODS;

  if (!options.webWorkerSupport && !browser_default.a) {
    // prefer localstorage over idb when no webworker-support needed
    chooseMethods = METHODS.filter(function (m) {
      return m.type !== 'idb';
    });
  }

  var useMethod = chooseMethods.find(function (method) {
    return method.canBeUsed();
  });
  if (!useMethod) throw new Error('No useable methode found:' + JSON.stringify(METHODS.map(function (m) {
    return m.type;
  })));else return useMethod;
}
// CONCATENATED MODULE: ./node_modules/broadcast-channel/dist/es/index.js




var es_BroadcastChannel = function BroadcastChannel(name, options) {
  this.name = name;
  this.options = fillOptionsWithDefaults(options);
  this.method = chooseMethod(this.options); // isListening

  this._iL = false;
  /**
   * _onMessageListener
   * setting onmessage twice,
   * will overwrite the first listener
   */

  this._onML = null;
  /**
   * _addEventListeners
   */

  this._addEL = {
    message: [],
    internal: []
  };
  /**
   * _beforeClose
   * array of promises that will be awaited
   * before the channel is closed
   */

  this._befC = [];
  /**
   * _preparePromise
   */

  this._prepP = null;

  _prepareChannel(this);
}; // STATICS

/**
 * used to identify if someone overwrites
 * window.BroadcastChannel with this
 * See methods/native.js
 */


es_BroadcastChannel._pubkey = true;
/**
 * clears the tmp-folder if is node
 * @return {Promise<boolean>} true if has run, false if not node
 */

es_BroadcastChannel.clearNodeFolder = function (options) {
  options = fillOptionsWithDefaults(options);
  var method = chooseMethod(options);

  if (method.type === 'node') {
    return method.clearNodeFolder().then(function () {
      return true;
    });
  } else {
    return Promise.resolve(false);
  }
}; // PROTOTYPE


es_BroadcastChannel.prototype = {
  postMessage: function postMessage(msg) {
    if (this.closed) {
      throw new Error('BroadcastChannel.postMessage(): ' + 'Cannot post message after channel has closed');
    }

    return _post(this, 'message', msg);
  },
  postInternal: function postInternal(msg) {
    return _post(this, 'internal', msg);
  },

  set onmessage(fn) {
    var time = this.method.microSeconds();
    var listenObj = {
      time: time,
      fn: fn
    };

    _removeListenerObject(this, 'message', this._onML);

    if (fn && typeof fn === 'function') {
      this._onML = listenObj;

      _addListenerObject(this, 'message', listenObj);
    } else {
      this._onML = null;
    }
  },

  addEventListener: function addEventListener(type, fn) {
    var time = this.method.microSeconds();
    var listenObj = {
      time: time,
      fn: fn
    };

    _addListenerObject(this, type, listenObj);
  },
  removeEventListener: function removeEventListener(type, fn) {
    var obj = this._addEL[type].find(function (obj) {
      return obj.fn === fn;
    });

    _removeListenerObject(this, type, obj);
  },
  close: function close() {
    var _this = this;

    if (this.closed) return;
    this.closed = true;
    var awaitPrepare = this._prepP ? this._prepP : Promise.resolve();
    this._onML = null;
    this._addEL.message = [];
    return awaitPrepare.then(function () {
      return Promise.all(_this._befC.map(function (fn) {
        return fn();
      }));
    }).then(function () {
      return _this.method.close(_this._state);
    });
  },

  get type() {
    return this.method.type;
  }

};

function _post(broadcastChannel, type, msg) {
  var time = broadcastChannel.method.microSeconds();
  var msgObj = {
    time: time,
    type: type,
    data: msg
  };
  var awaitPrepare = broadcastChannel._prepP ? broadcastChannel._prepP : Promise.resolve();
  return awaitPrepare.then(function () {
    return broadcastChannel.method.postMessage(broadcastChannel._state, msgObj);
  });
}

function _prepareChannel(channel) {
  var maybePromise = channel.method.create(channel.name, channel.options);

  if (isPromise(maybePromise)) {
    channel._prepP = maybePromise;
    maybePromise.then(function (s) {
      // used in tests to simulate slow runtime

      /*if (channel.options.prepareDelay) {
           await new Promise(res => setTimeout(res, this.options.prepareDelay));
      }*/
      channel._state = s;
    });
  } else {
    channel._state = maybePromise;
  }
}

function _hasMessageListeners(channel) {
  if (channel._addEL.message.length > 0) return true;
  if (channel._addEL.internal.length > 0) return true;
  return false;
}

function _addListenerObject(channel, type, obj) {
  channel._addEL[type].push(obj);

  _startListening(channel);
}

function _removeListenerObject(channel, type, obj) {
  channel._addEL[type] = channel._addEL[type].filter(function (o) {
    return o !== obj;
  });

  _stopListening(channel);
}

function _startListening(channel) {
  if (!channel._iL && _hasMessageListeners(channel)) {
    // someone is listening, start subscribing
    var listenerFn = function listenerFn(msgObj) {
      channel._addEL[msgObj.type].forEach(function (obj) {
        if (msgObj.time >= obj.time) {
          obj.fn(msgObj.data);
        }
      });
    };

    var time = channel.method.microSeconds();

    if (channel._prepP) {
      channel._prepP.then(function () {
        channel._iL = true;
        channel.method.onMessage(channel._state, listenerFn, time);
      });
    } else {
      channel._iL = true;
      channel.method.onMessage(channel._state, listenerFn, time);
    }
  }
}

function _stopListening(channel) {
  if (channel._iL && !_hasMessageListeners(channel)) {
    // noone is listening, stop subscribing
    channel._iL = false;
    var time = channel.method.microSeconds();
    channel.method.onMessage(channel._state, null, time);
  }
}

/* harmony default export */ var es = (es_BroadcastChannel);
// EXTERNAL MODULE: ./node_modules/uuid/v4.js
var v4 = __webpack_require__(8);
var v4_default = /*#__PURE__*/__webpack_require__.n(v4);

// CONCATENATED MODULE: ./src/logger.js


var logger_Logger = /*#__PURE__*/function () {
  function Logger() {
    classCallCheck_default()(this, Logger);
    this.setVerbosity('WARNING');
  }
  createClass_default()(Logger, [{
    key: "debug",
    value: function debug() {
      if (this.checkVerbosity(4)) {
        var _console;
        (_console = console).log.apply(_console, arguments);
      }
    }
  }, {
    key: "log",
    value: function log() {
      if (this.checkVerbosity(4)) {
        var _console2;
        (_console2 = console).log.apply(_console2, arguments);
      }
    }
  }, {
    key: "info",
    value: function info() {
      if (this.checkVerbosity(3)) {
        var _console3;
        (_console3 = console).info.apply(_console3, arguments);
      }
    }
  }, {
    key: "warn",
    value: function warn() {
      if (this.checkVerbosity(2)) {
        var _console4;
        (_console4 = console).warn.apply(_console4, arguments);
      }
    }
  }, {
    key: "error",
    value: function error() {
      if (this.checkVerbosity(1)) {
        var _console5;
        (_console5 = console).error.apply(_console5, arguments);
      }
    }
  }, {
    key: "setVerbosity",
    value: function setVerbosity(level) {
      var default_level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'info';
      if (level === undefined) {
        level = default_level;
      }
      if (typeof level === 'string') {
        level = {
          ERROR: 1,
          WARNING: 2,
          INFO: 3,
          LOG: 4,
          DEBUG: 4
        }[level.toUpperCase()] || 2;
      }
      this.level = level;
    }
  }, {
    key: "checkVerbosity",
    value: function checkVerbosity(level) {
      return this.level >= level;
    }
  }]);
  return Logger;
}();
var log = new logger_Logger();
/* harmony default export */ var logger = (log);
// CONCATENATED MODULE: ./src/index.js







//import localforage from 'localforage';



var src_sleep = function sleep(ms) {
  return new Promise(function (res) {
    return setTimeout(res, ms);
  });
};

/**
 * TDLib in a browser
 *
 * TDLib can be compiled to WebAssembly using Emscripten compiler and used in a browser from JavaScript.
 * This is a convenient wrapper for TDLib in a browser which controls TDLib instance creation, handles interaction
 * with TDLib and manages a filesystem for persistent TDLib data.
 * TDLib instance is created in a Web Worker to run it in a separate thread.
 * TdClient just sends queries to the Web Worker and receives updates and results from it.
 * <br>
 * <br>
 * Differences from the TDLib JSON API:<br>
 * 1. Added the update <code>updateFatalError error:string = Update;</code> which is sent whenever TDLib encounters a fatal error.<br>
 * 2. Added the method <code>setJsLogVerbosityLevel new_verbosity_level:string = Ok;</code>, which allows to change the verbosity level of tdweb logging.<br>
 * 3. Added the possibility to use blobs as input files via the constructor <code>inputFileBlob data:<JavaScript blob> = InputFile;</code>.<br>
 * 4. The class <code>filePart</code> contains data as a JavaScript blob instead of a base64-encoded string.<br>
 * 5. The methods <code>getStorageStatistics</code>, <code>getStorageStatisticsFast</code>, <code>optimizeStorage</code>, and <code>addProxy</code> are not supported.<br>
 * <br>
 */
var src_TdClient = /*#__PURE__*/function () {
  /**
   * @callback TdClient~updateCallback
   * @param {Object} update The update.
   */

  /**
   * Create TdClient.
   * @param {Object} options - Options for TDLib instance creation.
   * @param {TdClient~updateCallback} options.onUpdate - Callback for all incoming updates.
   * @param {string} [options.instanceName=tdlib] - Name of the TDLib instance. Currently, only one instance of TdClient with a given name is allowed. All but one instances with the same name will be automatically closed. Usually, the newest non-background instance is kept alive. Files will be stored in an IndexedDb table with the same name.
   * @param {boolean} [options.isBackground=false] - Pass true if the instance is opened from the background.
   * @param {string} [options.jsLogVerbosityLevel=info] - The initial verbosity level of the JavaScript part of the code (one of 'error', 'warning', 'info', 'log', 'debug').
   * @param {number} [options.logVerbosityLevel=2] - The initial verbosity level for the TDLib internal logging (0-1023).
   * @param {boolean} [options.useDatabase=true] - Pass false to use TDLib without database and secret chats. It significantly improves loading time, but some functionality is unavailable without the database.
   * @param {boolean} [options.readOnly=false] - For debug only. Pass true to open TDLib database in read-only mode
   */
  function TdClient(options) {
    var _this = this;
    classCallCheck_default()(this, TdClient);
    logger.setVerbosity(options.jsLogVerbosityLevel);
    this.worker = new worker_default.a();
    this.worker.onmessage = function (e) {
      _this.onResponse(e.data);
    };
    this.query_id = 0;
    this.query_callbacks = new Map();
    if ('onUpdate' in options) {
      this.onUpdate = options.onUpdate;
      delete options.onUpdate;
    }
    options.instanceName = options.instanceName || 'tdlib';
    this.fileManager = new src_FileManager(options.instanceName, this);
    this.worker.postMessage({
      '@type': 'init',
      options: options
    });
    this.closeOtherClients(options);
  }

  /**
   * Send a query to TDLib.
   *
   * If the query contains the field '@extra', the same field will be added into the result.
   *
   * @param {Object} query - The query for TDLib. See the [td_api.tl]{@link https://github.com/tdlib/td/blob/master/td/generate/scheme/td_api.tl} scheme or
   *                         the automatically generated [HTML documentation]{@link https://core.telegram.org/tdlib/docs/td__api_8h.html}
   *                         for a list of all available TDLib [methods]{@link https://core.telegram.org/tdlib/docs/classtd_1_1td__api_1_1_function.html} and
   *                         [classes]{@link https://core.telegram.org/tdlib/docs/classtd_1_1td__api_1_1_object.html}.
   * @returns {Promise} Promise object represents the result of the query.
   */
  createClass_default()(TdClient, [{
    key: "send",
    value: function send(query) {
      return this.doSend(query, true);
    } /** @private */
  }, {
    key: "sendInternal",
    value: function sendInternal(query) {
      return this.doSend(query, false);
    } /** @private */
  }, {
    key: "doSend",
    value: function doSend(query, isExternal) {
      var _this2 = this;
      this.query_id++;
      if (query['@extra']) {
        query['@extra'] = {
          '@old_extra': JSON.parse(JSON.stringify(query['@extra'])),
          query_id: this.query_id
        };
      } else {
        query['@extra'] = {
          query_id: this.query_id
        };
      }
      if (query['@type'] === 'setJsLogVerbosityLevel') {
        logger.setVerbosity(query.new_verbosity_level);
      }
      logger.debug('send to worker: ', query);
      var res = new Promise(function (resolve, reject) {
        _this2.query_callbacks.set(_this2.query_id, [resolve, reject]);
      });
      if (isExternal) {
        this.externalPostMessage(query);
      } else {
        this.worker.postMessage(query);
      }
      return res;
    } /** @private */
  }, {
    key: "externalPostMessage",
    value: function externalPostMessage(query) {
      var unsupportedMethods = ['getStorageStatistics', 'getStorageStatisticsFast', 'optimizeStorage', 'addProxy', 'init', 'start'];
      if (unsupportedMethods.includes(query['@type'])) {
        this.onResponse({
          '@type': 'error',
          '@extra': query['@extra'],
          code: 400,
          message: "Method '" + query['@type'] + "' is not supported"
        });
        return;
      }
      if (query['@type'] === 'readFile' || query['@type'] === 'readFilePart') {
        this.readFile(query);
        return;
      }
      if (query['@type'] === 'deleteFile') {
        this.deleteFile(query);
        return;
      }
      this.worker.postMessage(query);
    } /** @private */
  }, {
    key: "readFile",
    value: function () {
      var _readFile = asyncToGenerator_default()(/*#__PURE__*/regenerator_default.a.mark(function _callee(query) {
        var response;
        return regenerator_default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.fileManager.readFile(query);
              case 2:
                response = _context.sent;
                this.onResponse(response);
              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
      function readFile(_x) {
        return _readFile.apply(this, arguments);
      }
      return readFile;
    }() /** @private */
  }, {
    key: "deleteFile",
    value: function () {
      var _deleteFile = asyncToGenerator_default()(/*#__PURE__*/regenerator_default.a.mark(function _callee2(query) {
        var response;
        return regenerator_default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                response = this.fileManager.deleteFile(query);
                _context2.prev = 1;
                if (!response.idb_key) {
                  _context2.next = 6;
                  break;
                }
                _context2.next = 5;
                return this.sendInternal({
                  '@type': 'deleteIdbKey',
                  idb_key: response.idb_key
                });
              case 5:
                delete response.idb_key;
              case 6:
                _context2.next = 8;
                return this.sendInternal({
                  '@type': 'deleteFile',
                  file_id: query.file_id
                });
              case 8:
                _context2.next = 12;
                break;
              case 10:
                _context2.prev = 10;
                _context2.t0 = _context2["catch"](1);
              case 12:
                this.onResponse(response);
              case 13:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[1, 10]]);
      }));
      function deleteFile(_x2) {
        return _deleteFile.apply(this, arguments);
      }
      return deleteFile;
    }() /** @private */
  }, {
    key: "onResponse",
    value: function onResponse(response) {
      logger.debug('receive from worker: ', JSON.parse(JSON.stringify(response, function (key, value) {
        if (key === 'arr' || key === 'data') {
          return undefined;
        }
        return value;
      })));

      // for FileManager
      response = this.prepareResponse(response);
      if ('@extra' in response) {
        var query_id = response['@extra'].query_id;
        var _this$query_callbacks = this.query_callbacks.get(query_id),
          _this$query_callbacks2 = slicedToArray_default()(_this$query_callbacks, 2),
          resolve = _this$query_callbacks2[0],
          reject = _this$query_callbacks2[1];
        this.query_callbacks["delete"](query_id);
        if ('@old_extra' in response['@extra']) {
          response['@extra'] = response['@extra']['@old_extra'];
        }
        if (resolve) {
          if (response['@type'] === 'error') {
            reject(response);
          } else {
            resolve(response);
          }
        }
      } else {
        if (response['@type'] === 'inited') {
          this.onInited();
          return;
        }
        if (response['@type'] === 'fsInited') {
          this.onFsInited();
          return;
        }
        if (response['@type'] === 'updateAuthorizationState' && response.authorization_state['@type'] === 'authorizationStateClosed') {
          this.onClosed();
        }
        this.onUpdate(response);
      }
    } /** @private */
  }, {
    key: "prepareFile",
    value: function prepareFile(file) {
      return this.fileManager.registerFile(file);
    } /** @private */
  }, {
    key: "prepareResponse",
    value: function prepareResponse(response) {
      var _this3 = this;
      if (response['@type'] === 'file') {
        if (false) {}
        return this.prepareFile(response);
      }
      for (var key in response) {
        var field = response[key];
        if (field && typeof_default()(field) === 'object' && key !== 'data' && key !== 'arr') {
          response[key] = this.prepareResponse(field);
        }
      }
      return response;
    } /** @private */
  }, {
    key: "onBroadcastMessage",
    value: function onBroadcastMessage(e) {
      //const message = e.data;
      var message = e;
      if (message.uid === this.uid) {
        logger.info('ignore self broadcast message: ', message);
        return;
      }
      logger.info('receive broadcast message: ', message);
      if (message.isBackground && !this.isBackground) {
        // continue
      } else if (!message.isBackground && this.isBackground || message.timestamp > this.timestamp) {
        this.close();
        return;
      }
      if (message.state === 'closed') {
        this.waitSet["delete"](message.uid);
        if (this.waitSet.size === 0) {
          logger.info('onWaitSetEmpty');
          this.onWaitSetEmpty();
          this.onWaitSetEmpty = function () {};
        }
      } else {
        this.waitSet.add(message.uid);
        if (message.state !== 'closing') {
          this.postState();
        }
      }
    } /** @private */
  }, {
    key: "postState",
    value: function postState() {
      var state = {
        uid: this.uid,
        state: this.state,
        timestamp: this.timestamp,
        isBackground: this.isBackground
      };
      logger.info('Post state: ', state);
      this.channel.postMessage(state);
    } /** @private */
  }, {
    key: "onWaitSetEmpty",
    value: function onWaitSetEmpty() {
      // nop
    } /** @private */
  }, {
    key: "onFsInited",
    value: function onFsInited() {
      this.fileManager.init();
    } /** @private */
  }, {
    key: "onInited",
    value: function onInited() {
      this.isInited = true;
      this.doSendStart();
    } /** @private */
  }, {
    key: "sendStart",
    value: function sendStart() {
      this.wantSendStart = true;
      this.doSendStart();
    } /** @private */
  }, {
    key: "doSendStart",
    value: function doSendStart() {
      if (!this.isInited || !this.wantSendStart || this.state !== 'start') {
        return;
      }
      this.wantSendStart = false;
      this.state = 'active';
      var query = {
        '@type': 'start'
      };
      logger.info('send to worker: ', query);
      this.worker.postMessage(query);
    } /** @private */
  }, {
    key: "onClosed",
    value: function onClosed() {
      this.isClosing = true;
      this.worker.terminate();
      logger.info('worker is terminated');
      this.state = 'closed';
      this.postState();
    } /** @private */
  }, {
    key: "close",
    value: function close() {
      if (this.isClosing) {
        return;
      }
      this.isClosing = true;
      logger.info('close state: ', this.state);
      if (this.state === 'start') {
        this.onClosed();
        this.onUpdate({
          '@type': 'updateAuthorizationState',
          authorization_state: {
            '@type': 'authorizationStateClosed'
          }
        });
        return;
      }
      var query = {
        '@type': 'close'
      };
      logger.info('send to worker: ', query);
      this.worker.postMessage(query);
      this.state = 'closing';
      this.postState();
    } /** @private */
  }, {
    key: "closeOtherClients",
    value: function () {
      var _closeOtherClients = asyncToGenerator_default()(/*#__PURE__*/regenerator_default.a.mark(function _callee4(options) {
        var _this4 = this;
        return regenerator_default.a.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                this.uid = v4_default()();
                this.state = 'start';
                this.isBackground = !!options.isBackground;
                this.timestamp = Date.now();
                this.waitSet = new Set();
                logger.info('close other clients');
                this.channel = new es(options.instanceName, {
                  webWorkerSupport: false
                });
                this.postState();
                this.channel.onmessage = function (message) {
                  _this4.onBroadcastMessage(message);
                };
                _context4.next = 11;
                return src_sleep(300);
              case 11:
                if (!(this.waitSet.size !== 0)) {
                  _context4.next = 14;
                  break;
                }
                _context4.next = 14;
                return new Promise(function (resolve) {
                  _this4.onWaitSetEmpty = resolve;
                });
              case 14:
                this.sendStart();
              case 15:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));
      function closeOtherClients(_x3) {
        return _closeOtherClients.apply(this, arguments);
      }
      return closeOtherClients;
    }() /** @private */
  }, {
    key: "onUpdate",
    value: function onUpdate(update) {
      logger.info('ignore onUpdate');
      //nop
    }
  }]);
  return TdClient;
}();
/** @private */
var src_ListNode = /*#__PURE__*/function () {
  function ListNode(value) {
    classCallCheck_default()(this, ListNode);
    this.value = value;
    this.clear();
  }
  createClass_default()(ListNode, [{
    key: "erase",
    value: function erase() {
      this.prev.connect(this.next);
      this.clear();
    }
  }, {
    key: "clear",
    value: function clear() {
      this.prev = this;
      this.next = this;
    }
  }, {
    key: "connect",
    value: function connect(other) {
      this.next = other;
      other.prev = this;
    }
  }, {
    key: "onUsed",
    value: function onUsed(other) {
      other.usedAt = Date.now();
      other.erase();
      other.connect(this.next);
      logger.debug('LRU: used file_id: ', other.value);
      this.connect(other);
    }
  }, {
    key: "getLru",
    value: function getLru() {
      if (this === this.next) {
        throw new Error('popLru from empty list');
      }
      return this.prev;
    }
  }]);
  return ListNode;
}();
/** @private */
var src_FileManager = /*#__PURE__*/function () {
  function FileManager(instanceName, client) {
    classCallCheck_default()(this, FileManager);
    this.instanceName = instanceName;
    this.cache = new Map();
    this.pending = [];
    this.transaction_id = 0;
    this.totalSize = 0;
    this.lru = new src_ListNode(-1);
    this.client = client;
  }
  createClass_default()(FileManager, [{
    key: "init",
    value: function init() {
      var _this5 = this;
      this.idb = new Promise(function (resolve, reject) {
        var request = indexedDB.open(_this5.instanceName);
        request.onsuccess = function () {
          return resolve(request.result);
        };
        request.onerror = function () {
          return reject(request.error);
        };
      });
      //this.store = localforage.createInstance({
      //name: instanceName
      //});
      this.isInited = true;
    }
  }, {
    key: "unload",
    value: function unload(info) {
      if (info.arr) {
        logger.debug('LRU: delete file_id: ', info.node.value, ' with arr.length: ', info.arr.length);
        this.totalSize -= info.arr.length;
        delete info.arr;
      }
      if (info.node) {
        info.node.erase();
        delete info.node;
      }
    }
  }, {
    key: "registerFile",
    value: function registerFile(file) {
      if (file.idb_key || file.arr) {
        file.local.is_downloading_completed = true;
      } else {
        file.local.is_downloading_completed = false;
      }
      var info = {};
      var cached_info = this.cache.get(file.id);
      if (cached_info) {
        info = cached_info;
      } else {
        this.cache.set(file.id, info);
      }
      if (file.idb_key) {
        info.idb_key = file.idb_key;
        delete file.idb_key;
      } else {
        delete info.idb_key;
      }
      if (file.arr) {
        var now = Date.now();
        while (this.totalSize > 100000000) {
          var node = this.lru.getLru();
          // immunity for 60 seconds
          if (node.usedAt + 60 * 1000 > now) {
            break;
          }
          var lru_info = this.cache.get(node.value);
          this.unload(lru_info);
        }
        if (info.arr) {
          logger.warn('Receive file.arr at least twice for the same file');
          this.totalSize -= info.arr.length;
        }
        info.arr = file.arr;
        delete file.arr;
        this.totalSize += info.arr.length;
        if (!info.node) {
          logger.debug('LRU: create file_id: ', file.id, ' with arr.length: ', info.arr.length);
          info.node = new src_ListNode(file.id);
        }
        this.lru.onUsed(info.node);
        logger.info('Total file.arr size: ', this.totalSize);
      }
      info.file = file;
      return file;
    }
  }, {
    key: "flushLoad",
    value: function () {
      var _flushLoad = asyncToGenerator_default()(/*#__PURE__*/regenerator_default.a.mark(function _callee5() {
        var pending, idb, transaction_id, read, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _loop, _iterator, _step;
        return regenerator_default.a.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                pending = this.pending;
                this.pending = [];
                _context5.next = 4;
                return this.idb;
              case 4:
                idb = _context5.sent;
                transaction_id = this.transaction_id++;
                read = idb.transaction(['keyvaluepairs'], 'readonly').objectStore('keyvaluepairs');
                logger.debug('Load group of files from idb', pending.length);
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context5.prev = 11;
                _loop = function _loop() {
                  var query = _step.value;
                  var request = read.get(query.key);
                  request.onsuccess = function (event) {
                    var blob = event.target.result;
                    if (blob) {
                      if (blob.size === 0) {
                        logger.error('Receive empty blob from db ', query.key);
                      }
                      query.resolve({
                        data: blob,
                        transaction_id: transaction_id
                      });
                    } else {
                      query.reject();
                    }
                  };
                  request.onerror = function () {
                    return query.reject(request.error);
                  };
                };
                for (_iterator = pending[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                  _loop();
                }
                _context5.next = 20;
                break;
              case 16:
                _context5.prev = 16;
                _context5.t0 = _context5["catch"](11);
                _didIteratorError = true;
                _iteratorError = _context5.t0;
              case 20:
                _context5.prev = 20;
                _context5.prev = 21;
                if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                  _iterator["return"]();
                }
              case 23:
                _context5.prev = 23;
                if (!_didIteratorError) {
                  _context5.next = 26;
                  break;
                }
                throw _iteratorError;
              case 26:
                return _context5.finish(23);
              case 27:
                return _context5.finish(20);
              case 28:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this, [[11, 16, 20, 28], [21,, 23, 27]]);
      }));
      function flushLoad() {
        return _flushLoad.apply(this, arguments);
      }
      return flushLoad;
    }()
  }, {
    key: "load",
    value: function load(key, resolve, reject) {
      var _this6 = this;
      if (this.pending.length === 0) {
        setTimeout(function () {
          _this6.flushLoad();
        }, 1);
      }
      this.pending.push({
        key: key,
        resolve: resolve,
        reject: reject
      });
    }
  }, {
    key: "doLoadFull",
    value: function () {
      var _doLoadFull = asyncToGenerator_default()(/*#__PURE__*/regenerator_default.a.mark(function _callee6(info) {
        var _this7 = this;
        var idb_key;
        return regenerator_default.a.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (!info.arr) {
                  _context6.next = 2;
                  break;
                }
                return _context6.abrupt("return", {
                  data: new Blob([info.arr]),
                  transaction_id: -1
                });
              case 2:
                if (!info.idb_key) {
                  _context6.next = 7;
                  break;
                }
                idb_key = info.idb_key; //return this.store.getItem(idb_key);
                _context6.next = 6;
                return new Promise(function (resolve, reject) {
                  _this7.load(idb_key, resolve, reject);
                });
              case 6:
                return _context6.abrupt("return", _context6.sent);
              case 7:
                throw new Error('File is not loaded');
              case 8:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));
      function doLoadFull(_x4) {
        return _doLoadFull.apply(this, arguments);
      }
      return doLoadFull;
    }()
  }, {
    key: "doLoad",
    value: function () {
      var _doLoad = asyncToGenerator_default()(/*#__PURE__*/regenerator_default.a.mark(function _callee7(info, offset, size) {
        var count, _res, res, data_size;
        return regenerator_default.a.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                if (!(!info.arr && !info.idb_key && info.file.local.path)) {
                  _context7.next = 22;
                  break;
                }
                _context7.prev = 1;
                _context7.next = 4;
                return this.client.sendInternal({
                  '@type': 'getFileDownloadedPrefixSize',
                  file_id: info.file.id,
                  offset: offset
                });
              case 4:
                count = _context7.sent;
                if (size) {
                  _context7.next = 9;
                  break;
                }
                size = count.count;
                _context7.next = 11;
                break;
              case 9:
                if (!(size > count.count)) {
                  _context7.next = 11;
                  break;
                }
                throw new Error('File not loaded yet');
              case 11:
                _context7.next = 13;
                return this.client.sendInternal({
                  '@type': 'readFilePart',
                  path: info.file.local.path,
                  offset: offset,
                  count: size
                });
              case 13:
                _res = _context7.sent;
                _res.data = new Blob([_res.data]);
                _res.transaction_id = -2;
                //log.error(res);
                return _context7.abrupt("return", _res);
              case 19:
                _context7.prev = 19;
                _context7.t0 = _context7["catch"](1);
                logger.info('readFilePart failed', info, offset, size, _context7.t0);
              case 22:
                _context7.next = 24;
                return this.doLoadFull(info);
              case 24:
                res = _context7.sent;
                // return slice(size, offset + size)
                data_size = res.data.size;
                if (!size) {
                  size = data_size;
                }
                if (offset > data_size) {
                  offset = data_size;
                }
                res.data = res.data.slice(offset, offset + size);
                return _context7.abrupt("return", res);
              case 30:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this, [[1, 19]]);
      }));
      function doLoad(_x5, _x6, _x7) {
        return _doLoad.apply(this, arguments);
      }
      return doLoad;
    }()
  }, {
    key: "doDelete",
    value: function doDelete(info) {
      this.unload(info);
      return info.idb_key;
    }
  }, {
    key: "readFile",
    value: function () {
      var _readFile2 = asyncToGenerator_default()(/*#__PURE__*/regenerator_default.a.mark(function _callee8(query) {
        var info, response;
        return regenerator_default.a.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.prev = 0;
                if (this.isInited) {
                  _context8.next = 3;
                  break;
                }
                throw new Error('FileManager is not inited');
              case 3:
                info = this.cache.get(query.file_id);
                if (info) {
                  _context8.next = 6;
                  break;
                }
                throw new Error('File is not loaded');
              case 6:
                if (info.node) {
                  this.lru.onUsed(info.node);
                }
                query.offset = query.offset || 0;
                query.size = query.count || query.size || 0;
                _context8.next = 11;
                return this.doLoad(info, query.offset, query.size);
              case 11:
                response = _context8.sent;
                return _context8.abrupt("return", {
                  '@type': 'filePart',
                  '@extra': query['@extra'],
                  data: response.data,
                  transaction_id: response.transaction_id
                });
              case 15:
                _context8.prev = 15;
                _context8.t0 = _context8["catch"](0);
                return _context8.abrupt("return", {
                  '@type': 'error',
                  '@extra': query['@extra'],
                  code: 400,
                  message: _context8.t0
                });
              case 18:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this, [[0, 15]]);
      }));
      function readFile(_x8) {
        return _readFile2.apply(this, arguments);
      }
      return readFile;
    }()
  }, {
    key: "deleteFile",
    value: function deleteFile(query) {
      var res = {
        '@type': 'ok',
        '@extra': query['@extra']
      };
      try {
        if (!this.isInited) {
          throw new Error('FileManager is not inited');
        }
        var info = this.cache.get(query.file_id);
        if (!info) {
          throw new Error('File is not loaded');
        }
        var idb_key = this.doDelete(info);
        if (idb_key) {
          res.idb_key = idb_key;
        }
      } catch (e) {}
      return res;
    }
  }]);
  return FileManager;
}();
/* harmony default export */ var src = __webpack_exports__["default"] = (src_TdClient);

/***/ })
/******/ ]);
});