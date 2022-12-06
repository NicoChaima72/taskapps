/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/axios/index.js":
/*!*************************************!*\
  !*** ./node_modules/axios/index.js ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__(/*! ./lib/axios */ \"./node_modules/axios/lib/axios.js\");\n\n//# sourceURL=webpack://taskapps/./node_modules/axios/index.js?");

/***/ }),

/***/ "./node_modules/axios/lib/adapters/xhr.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/adapters/xhr.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\nvar settle = __webpack_require__(/*! ./../core/settle */ \"./node_modules/axios/lib/core/settle.js\");\nvar cookies = __webpack_require__(/*! ./../helpers/cookies */ \"./node_modules/axios/lib/helpers/cookies.js\");\nvar buildURL = __webpack_require__(/*! ./../helpers/buildURL */ \"./node_modules/axios/lib/helpers/buildURL.js\");\nvar buildFullPath = __webpack_require__(/*! ../core/buildFullPath */ \"./node_modules/axios/lib/core/buildFullPath.js\");\nvar parseHeaders = __webpack_require__(/*! ./../helpers/parseHeaders */ \"./node_modules/axios/lib/helpers/parseHeaders.js\");\nvar isURLSameOrigin = __webpack_require__(/*! ./../helpers/isURLSameOrigin */ \"./node_modules/axios/lib/helpers/isURLSameOrigin.js\");\nvar createError = __webpack_require__(/*! ../core/createError */ \"./node_modules/axios/lib/core/createError.js\");\n\nmodule.exports = function xhrAdapter(config) {\n  return new Promise(function dispatchXhrRequest(resolve, reject) {\n    var requestData = config.data;\n    var requestHeaders = config.headers;\n\n    if (utils.isFormData(requestData)) {\n      delete requestHeaders['Content-Type']; // Let the browser set it\n    }\n\n    var request = new XMLHttpRequest();\n\n    // HTTP basic authentication\n    if (config.auth) {\n      var username = config.auth.username || '';\n      var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : '';\n      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);\n    }\n\n    var fullPath = buildFullPath(config.baseURL, config.url);\n    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);\n\n    // Set the request timeout in MS\n    request.timeout = config.timeout;\n\n    // Listen for ready state\n    request.onreadystatechange = function handleLoad() {\n      if (!request || request.readyState !== 4) {\n        return;\n      }\n\n      // The request errored out and we didn't get a response, this will be\n      // handled by onerror instead\n      // With one exception: request that using file: protocol, most browsers\n      // will return status as 0 even though it's a successful request\n      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {\n        return;\n      }\n\n      // Prepare the response\n      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;\n      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;\n      var response = {\n        data: responseData,\n        status: request.status,\n        statusText: request.statusText,\n        headers: responseHeaders,\n        config: config,\n        request: request\n      };\n\n      settle(resolve, reject, response);\n\n      // Clean up request\n      request = null;\n    };\n\n    // Handle browser request cancellation (as opposed to a manual cancellation)\n    request.onabort = function handleAbort() {\n      if (!request) {\n        return;\n      }\n\n      reject(createError('Request aborted', config, 'ECONNABORTED', request));\n\n      // Clean up request\n      request = null;\n    };\n\n    // Handle low level network errors\n    request.onerror = function handleError() {\n      // Real errors are hidden from us by the browser\n      // onerror should only fire if it's a network error\n      reject(createError('Network Error', config, null, request));\n\n      // Clean up request\n      request = null;\n    };\n\n    // Handle timeout\n    request.ontimeout = function handleTimeout() {\n      var timeoutErrorMessage = 'timeout of ' + config.timeout + 'ms exceeded';\n      if (config.timeoutErrorMessage) {\n        timeoutErrorMessage = config.timeoutErrorMessage;\n      }\n      reject(createError(timeoutErrorMessage, config, 'ECONNABORTED',\n        request));\n\n      // Clean up request\n      request = null;\n    };\n\n    // Add xsrf header\n    // This is only done if running in a standard browser environment.\n    // Specifically not if we're in a web worker, or react-native.\n    if (utils.isStandardBrowserEnv()) {\n      // Add xsrf header\n      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ?\n        cookies.read(config.xsrfCookieName) :\n        undefined;\n\n      if (xsrfValue) {\n        requestHeaders[config.xsrfHeaderName] = xsrfValue;\n      }\n    }\n\n    // Add headers to the request\n    if ('setRequestHeader' in request) {\n      utils.forEach(requestHeaders, function setRequestHeader(val, key) {\n        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {\n          // Remove Content-Type if data is undefined\n          delete requestHeaders[key];\n        } else {\n          // Otherwise add header to the request\n          request.setRequestHeader(key, val);\n        }\n      });\n    }\n\n    // Add withCredentials to request if needed\n    if (!utils.isUndefined(config.withCredentials)) {\n      request.withCredentials = !!config.withCredentials;\n    }\n\n    // Add responseType to request if needed\n    if (config.responseType) {\n      try {\n        request.responseType = config.responseType;\n      } catch (e) {\n        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.\n        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.\n        if (config.responseType !== 'json') {\n          throw e;\n        }\n      }\n    }\n\n    // Handle progress if needed\n    if (typeof config.onDownloadProgress === 'function') {\n      request.addEventListener('progress', config.onDownloadProgress);\n    }\n\n    // Not all browsers support upload events\n    if (typeof config.onUploadProgress === 'function' && request.upload) {\n      request.upload.addEventListener('progress', config.onUploadProgress);\n    }\n\n    if (config.cancelToken) {\n      // Handle cancellation\n      config.cancelToken.promise.then(function onCanceled(cancel) {\n        if (!request) {\n          return;\n        }\n\n        request.abort();\n        reject(cancel);\n        // Clean up request\n        request = null;\n      });\n    }\n\n    if (!requestData) {\n      requestData = null;\n    }\n\n    // Send the request\n    request.send(requestData);\n  });\n};\n\n\n//# sourceURL=webpack://taskapps/./node_modules/axios/lib/adapters/xhr.js?");

/***/ }),

/***/ "./node_modules/axios/lib/axios.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/axios.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./utils */ \"./node_modules/axios/lib/utils.js\");\nvar bind = __webpack_require__(/*! ./helpers/bind */ \"./node_modules/axios/lib/helpers/bind.js\");\nvar Axios = __webpack_require__(/*! ./core/Axios */ \"./node_modules/axios/lib/core/Axios.js\");\nvar mergeConfig = __webpack_require__(/*! ./core/mergeConfig */ \"./node_modules/axios/lib/core/mergeConfig.js\");\nvar defaults = __webpack_require__(/*! ./defaults */ \"./node_modules/axios/lib/defaults.js\");\n\n/**\n * Create an instance of Axios\n *\n * @param {Object} defaultConfig The default config for the instance\n * @return {Axios} A new instance of Axios\n */\nfunction createInstance(defaultConfig) {\n  var context = new Axios(defaultConfig);\n  var instance = bind(Axios.prototype.request, context);\n\n  // Copy axios.prototype to instance\n  utils.extend(instance, Axios.prototype, context);\n\n  // Copy context to instance\n  utils.extend(instance, context);\n\n  return instance;\n}\n\n// Create the default instance to be exported\nvar axios = createInstance(defaults);\n\n// Expose Axios class to allow class inheritance\naxios.Axios = Axios;\n\n// Factory for creating new instances\naxios.create = function create(instanceConfig) {\n  return createInstance(mergeConfig(axios.defaults, instanceConfig));\n};\n\n// Expose Cancel & CancelToken\naxios.Cancel = __webpack_require__(/*! ./cancel/Cancel */ \"./node_modules/axios/lib/cancel/Cancel.js\");\naxios.CancelToken = __webpack_require__(/*! ./cancel/CancelToken */ \"./node_modules/axios/lib/cancel/CancelToken.js\");\naxios.isCancel = __webpack_require__(/*! ./cancel/isCancel */ \"./node_modules/axios/lib/cancel/isCancel.js\");\n\n// Expose all/spread\naxios.all = function all(promises) {\n  return Promise.all(promises);\n};\naxios.spread = __webpack_require__(/*! ./helpers/spread */ \"./node_modules/axios/lib/helpers/spread.js\");\n\n// Expose isAxiosError\naxios.isAxiosError = __webpack_require__(/*! ./helpers/isAxiosError */ \"./node_modules/axios/lib/helpers/isAxiosError.js\");\n\nmodule.exports = axios;\n\n// Allow use of default import syntax in TypeScript\nmodule.exports.default = axios;\n\n\n//# sourceURL=webpack://taskapps/./node_modules/axios/lib/axios.js?");

/***/ }),

/***/ "./node_modules/axios/lib/cancel/Cancel.js":
/*!*************************************************!*\
  !*** ./node_modules/axios/lib/cancel/Cancel.js ***!
  \*************************************************/
/***/ ((module) => {

"use strict";
eval("\n\n/**\n * A `Cancel` is an object that is thrown when an operation is canceled.\n *\n * @class\n * @param {string=} message The message.\n */\nfunction Cancel(message) {\n  this.message = message;\n}\n\nCancel.prototype.toString = function toString() {\n  return 'Cancel' + (this.message ? ': ' + this.message : '');\n};\n\nCancel.prototype.__CANCEL__ = true;\n\nmodule.exports = Cancel;\n\n\n//# sourceURL=webpack://taskapps/./node_modules/axios/lib/cancel/Cancel.js?");

/***/ }),

/***/ "./node_modules/axios/lib/cancel/CancelToken.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/cancel/CancelToken.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar Cancel = __webpack_require__(/*! ./Cancel */ \"./node_modules/axios/lib/cancel/Cancel.js\");\n\n/**\n * A `CancelToken` is an object that can be used to request cancellation of an operation.\n *\n * @class\n * @param {Function} executor The executor function.\n */\nfunction CancelToken(executor) {\n  if (typeof executor !== 'function') {\n    throw new TypeError('executor must be a function.');\n  }\n\n  var resolvePromise;\n  this.promise = new Promise(function promiseExecutor(resolve) {\n    resolvePromise = resolve;\n  });\n\n  var token = this;\n  executor(function cancel(message) {\n    if (token.reason) {\n      // Cancellation has already been requested\n      return;\n    }\n\n    token.reason = new Cancel(message);\n    resolvePromise(token.reason);\n  });\n}\n\n/**\n * Throws a `Cancel` if cancellation has been requested.\n */\nCancelToken.prototype.throwIfRequested = function throwIfRequested() {\n  if (this.reason) {\n    throw this.reason;\n  }\n};\n\n/**\n * Returns an object that contains a new `CancelToken` and a function that, when called,\n * cancels the `CancelToken`.\n */\nCancelToken.source = function source() {\n  var cancel;\n  var token = new CancelToken(function executor(c) {\n    cancel = c;\n  });\n  return {\n    token: token,\n    cancel: cancel\n  };\n};\n\nmodule.exports = CancelToken;\n\n\n//# sourceURL=webpack://taskapps/./node_modules/axios/lib/cancel/CancelToken.js?");

/***/ }),

/***/ "./node_modules/axios/lib/cancel/isCancel.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/cancel/isCancel.js ***!
  \***************************************************/
/***/ ((module) => {

"use strict";
eval("\n\nmodule.exports = function isCancel(value) {\n  return !!(value && value.__CANCEL__);\n};\n\n\n//# sourceURL=webpack://taskapps/./node_modules/axios/lib/cancel/isCancel.js?");

/***/ }),

/***/ "./node_modules/axios/lib/core/Axios.js":
/*!**********************************************!*\
  !*** ./node_modules/axios/lib/core/Axios.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\nvar buildURL = __webpack_require__(/*! ../helpers/buildURL */ \"./node_modules/axios/lib/helpers/buildURL.js\");\nvar InterceptorManager = __webpack_require__(/*! ./InterceptorManager */ \"./node_modules/axios/lib/core/InterceptorManager.js\");\nvar dispatchRequest = __webpack_require__(/*! ./dispatchRequest */ \"./node_modules/axios/lib/core/dispatchRequest.js\");\nvar mergeConfig = __webpack_require__(/*! ./mergeConfig */ \"./node_modules/axios/lib/core/mergeConfig.js\");\n\n/**\n * Create a new instance of Axios\n *\n * @param {Object} instanceConfig The default config for the instance\n */\nfunction Axios(instanceConfig) {\n  this.defaults = instanceConfig;\n  this.interceptors = {\n    request: new InterceptorManager(),\n    response: new InterceptorManager()\n  };\n}\n\n/**\n * Dispatch a request\n *\n * @param {Object} config The config specific for this request (merged with this.defaults)\n */\nAxios.prototype.request = function request(config) {\n  /*eslint no-param-reassign:0*/\n  // Allow for axios('example/url'[, config]) a la fetch API\n  if (typeof config === 'string') {\n    config = arguments[1] || {};\n    config.url = arguments[0];\n  } else {\n    config = config || {};\n  }\n\n  config = mergeConfig(this.defaults, config);\n\n  // Set config.method\n  if (config.method) {\n    config.method = config.method.toLowerCase();\n  } else if (this.defaults.method) {\n    config.method = this.defaults.method.toLowerCase();\n  } else {\n    config.method = 'get';\n  }\n\n  // Hook up interceptors middleware\n  var chain = [dispatchRequest, undefined];\n  var promise = Promise.resolve(config);\n\n  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {\n    chain.unshift(interceptor.fulfilled, interceptor.rejected);\n  });\n\n  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {\n    chain.push(interceptor.fulfilled, interceptor.rejected);\n  });\n\n  while (chain.length) {\n    promise = promise.then(chain.shift(), chain.shift());\n  }\n\n  return promise;\n};\n\nAxios.prototype.getUri = function getUri(config) {\n  config = mergeConfig(this.defaults, config);\n  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\\?/, '');\n};\n\n// Provide aliases for supported request methods\nutils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {\n  /*eslint func-names:0*/\n  Axios.prototype[method] = function(url, config) {\n    return this.request(mergeConfig(config || {}, {\n      method: method,\n      url: url,\n      data: (config || {}).data\n    }));\n  };\n});\n\nutils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {\n  /*eslint func-names:0*/\n  Axios.prototype[method] = function(url, data, config) {\n    return this.request(mergeConfig(config || {}, {\n      method: method,\n      url: url,\n      data: data\n    }));\n  };\n});\n\nmodule.exports = Axios;\n\n\n//# sourceURL=webpack://taskapps/./node_modules/axios/lib/core/Axios.js?");

/***/ }),

/***/ "./node_modules/axios/lib/core/InterceptorManager.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/core/InterceptorManager.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\n\nfunction InterceptorManager() {\n  this.handlers = [];\n}\n\n/**\n * Add a new interceptor to the stack\n *\n * @param {Function} fulfilled The function to handle `then` for a `Promise`\n * @param {Function} rejected The function to handle `reject` for a `Promise`\n *\n * @return {Number} An ID used to remove interceptor later\n */\nInterceptorManager.prototype.use = function use(fulfilled, rejected) {\n  this.handlers.push({\n    fulfilled: fulfilled,\n    rejected: rejected\n  });\n  return this.handlers.length - 1;\n};\n\n/**\n * Remove an interceptor from the stack\n *\n * @param {Number} id The ID that was returned by `use`\n */\nInterceptorManager.prototype.eject = function eject(id) {\n  if (this.handlers[id]) {\n    this.handlers[id] = null;\n  }\n};\n\n/**\n * Iterate over all the registered interceptors\n *\n * This method is particularly useful for skipping over any\n * interceptors that may have become `null` calling `eject`.\n *\n * @param {Function} fn The function to call for each interceptor\n */\nInterceptorManager.prototype.forEach = function forEach(fn) {\n  utils.forEach(this.handlers, function forEachHandler(h) {\n    if (h !== null) {\n      fn(h);\n    }\n  });\n};\n\nmodule.exports = InterceptorManager;\n\n\n//# sourceURL=webpack://taskapps/./node_modules/axios/lib/core/InterceptorManager.js?");

/***/ }),

/***/ "./node_modules/axios/lib/core/buildFullPath.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/buildFullPath.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar isAbsoluteURL = __webpack_require__(/*! ../helpers/isAbsoluteURL */ \"./node_modules/axios/lib/helpers/isAbsoluteURL.js\");\nvar combineURLs = __webpack_require__(/*! ../helpers/combineURLs */ \"./node_modules/axios/lib/helpers/combineURLs.js\");\n\n/**\n * Creates a new URL by combining the baseURL with the requestedURL,\n * only when the requestedURL is not already an absolute URL.\n * If the requestURL is absolute, this function returns the requestedURL untouched.\n *\n * @param {string} baseURL The base URL\n * @param {string} requestedURL Absolute or relative URL to combine\n * @returns {string} The combined full path\n */\nmodule.exports = function buildFullPath(baseURL, requestedURL) {\n  if (baseURL && !isAbsoluteURL(requestedURL)) {\n    return combineURLs(baseURL, requestedURL);\n  }\n  return requestedURL;\n};\n\n\n//# sourceURL=webpack://taskapps/./node_modules/axios/lib/core/buildFullPath.js?");

/***/ }),

/***/ "./node_modules/axios/lib/core/createError.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/createError.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar enhanceError = __webpack_require__(/*! ./enhanceError */ \"./node_modules/axios/lib/core/enhanceError.js\");\n\n/**\n * Create an Error with the specified message, config, error code, request and response.\n *\n * @param {string} message The error message.\n * @param {Object} config The config.\n * @param {string} [code] The error code (for example, 'ECONNABORTED').\n * @param {Object} [request] The request.\n * @param {Object} [response] The response.\n * @returns {Error} The created error.\n */\nmodule.exports = function createError(message, config, code, request, response) {\n  var error = new Error(message);\n  return enhanceError(error, config, code, request, response);\n};\n\n\n//# sourceURL=webpack://taskapps/./node_modules/axios/lib/core/createError.js?");

/***/ }),

/***/ "./node_modules/axios/lib/core/dispatchRequest.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/core/dispatchRequest.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\nvar transformData = __webpack_require__(/*! ./transformData */ \"./node_modules/axios/lib/core/transformData.js\");\nvar isCancel = __webpack_require__(/*! ../cancel/isCancel */ \"./node_modules/axios/lib/cancel/isCancel.js\");\nvar defaults = __webpack_require__(/*! ../defaults */ \"./node_modules/axios/lib/defaults.js\");\n\n/**\n * Throws a `Cancel` if cancellation has been requested.\n */\nfunction throwIfCancellationRequested(config) {\n  if (config.cancelToken) {\n    config.cancelToken.throwIfRequested();\n  }\n}\n\n/**\n * Dispatch a request to the server using the configured adapter.\n *\n * @param {object} config The config that is to be used for the request\n * @returns {Promise} The Promise to be fulfilled\n */\nmodule.exports = function dispatchRequest(config) {\n  throwIfCancellationRequested(config);\n\n  // Ensure headers exist\n  config.headers = config.headers || {};\n\n  // Transform request data\n  config.data = transformData(\n    config.data,\n    config.headers,\n    config.transformRequest\n  );\n\n  // Flatten headers\n  config.headers = utils.merge(\n    config.headers.common || {},\n    config.headers[config.method] || {},\n    config.headers\n  );\n\n  utils.forEach(\n    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],\n    function cleanHeaderConfig(method) {\n      delete config.headers[method];\n    }\n  );\n\n  var adapter = config.adapter || defaults.adapter;\n\n  return adapter(config).then(function onAdapterResolution(response) {\n    throwIfCancellationRequested(config);\n\n    // Transform response data\n    response.data = transformData(\n      response.data,\n      response.headers,\n      config.transformResponse\n    );\n\n    return response;\n  }, function onAdapterRejection(reason) {\n    if (!isCancel(reason)) {\n      throwIfCancellationRequested(config);\n\n      // Transform response data\n      if (reason && reason.response) {\n        reason.response.data = transformData(\n          reason.response.data,\n          reason.response.headers,\n          config.transformResponse\n        );\n      }\n    }\n\n    return Promise.reject(reason);\n  });\n};\n\n\n//# sourceURL=webpack://taskapps/./node_modules/axios/lib/core/dispatchRequest.js?");

/***/ }),

/***/ "./node_modules/axios/lib/core/enhanceError.js":
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/core/enhanceError.js ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";
eval("\n\n/**\n * Update an Error with the specified config, error code, and response.\n *\n * @param {Error} error The error to update.\n * @param {Object} config The config.\n * @param {string} [code] The error code (for example, 'ECONNABORTED').\n * @param {Object} [request] The request.\n * @param {Object} [response] The response.\n * @returns {Error} The error.\n */\nmodule.exports = function enhanceError(error, config, code, request, response) {\n  error.config = config;\n  if (code) {\n    error.code = code;\n  }\n\n  error.request = request;\n  error.response = response;\n  error.isAxiosError = true;\n\n  error.toJSON = function toJSON() {\n    return {\n      // Standard\n      message: this.message,\n      name: this.name,\n      // Microsoft\n      description: this.description,\n      number: this.number,\n      // Mozilla\n      fileName: this.fileName,\n      lineNumber: this.lineNumber,\n      columnNumber: this.columnNumber,\n      stack: this.stack,\n      // Axios\n      config: this.config,\n      code: this.code\n    };\n  };\n  return error;\n};\n\n\n//# sourceURL=webpack://taskapps/./node_modules/axios/lib/core/enhanceError.js?");

/***/ }),

/***/ "./node_modules/axios/lib/core/mergeConfig.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/mergeConfig.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ../utils */ \"./node_modules/axios/lib/utils.js\");\n\n/**\n * Config-specific merge-function which creates a new config-object\n * by merging two configuration objects together.\n *\n * @param {Object} config1\n * @param {Object} config2\n * @returns {Object} New object resulting from merging config2 to config1\n */\nmodule.exports = function mergeConfig(config1, config2) {\n  // eslint-disable-next-line no-param-reassign\n  config2 = config2 || {};\n  var config = {};\n\n  var valueFromConfig2Keys = ['url', 'method', 'data'];\n  var mergeDeepPropertiesKeys = ['headers', 'auth', 'proxy', 'params'];\n  var defaultToConfig2Keys = [\n    'baseURL', 'transformRequest', 'transformResponse', 'paramsSerializer',\n    'timeout', 'timeoutMessage', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName',\n    'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress', 'decompress',\n    'maxContentLength', 'maxBodyLength', 'maxRedirects', 'transport', 'httpAgent',\n    'httpsAgent', 'cancelToken', 'socketPath', 'responseEncoding'\n  ];\n  var directMergeKeys = ['validateStatus'];\n\n  function getMergedValue(target, source) {\n    if (utils.isPlainObject(target) && utils.isPlainObject(source)) {\n      return utils.merge(target, source);\n    } else if (utils.isPlainObject(source)) {\n      return utils.merge({}, source);\n    } else if (utils.isArray(source)) {\n      return source.slice();\n    }\n    return source;\n  }\n\n  function mergeDeepProperties(prop) {\n    if (!utils.isUndefined(config2[prop])) {\n      config[prop] = getMergedValue(config1[prop], config2[prop]);\n    } else if (!utils.isUndefined(config1[prop])) {\n      config[prop] = getMergedValue(undefined, config1[prop]);\n    }\n  }\n\n  utils.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {\n    if (!utils.isUndefined(config2[prop])) {\n      config[prop] = getMergedValue(undefined, config2[prop]);\n    }\n  });\n\n  utils.forEach(mergeDeepPropertiesKeys, mergeDeepProperties);\n\n  utils.forEach(defaultToConfig2Keys, function defaultToConfig2(prop) {\n    if (!utils.isUndefined(config2[prop])) {\n      config[prop] = getMergedValue(undefined, config2[prop]);\n    } else if (!utils.isUndefined(config1[prop])) {\n      config[prop] = getMergedValue(undefined, config1[prop]);\n    }\n  });\n\n  utils.forEach(directMergeKeys, function merge(prop) {\n    if (prop in config2) {\n      config[prop] = getMergedValue(config1[prop], config2[prop]);\n    } else if (prop in config1) {\n      config[prop] = getMergedValue(undefined, config1[prop]);\n    }\n  });\n\n  var axiosKeys = valueFromConfig2Keys\n    .concat(mergeDeepPropertiesKeys)\n    .concat(defaultToConfig2Keys)\n    .concat(directMergeKeys);\n\n  var otherKeys = Object\n    .keys(config1)\n    .concat(Object.keys(config2))\n    .filter(function filterAxiosKeys(key) {\n      return axiosKeys.indexOf(key) === -1;\n    });\n\n  utils.forEach(otherKeys, mergeDeepProperties);\n\n  return config;\n};\n\n\n//# sourceURL=webpack://taskapps/./node_modules/axios/lib/core/mergeConfig.js?");

/***/ }),

/***/ "./node_modules/axios/lib/core/settle.js":
/*!***********************************************!*\
  !*** ./node_modules/axios/lib/core/settle.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar createError = __webpack_require__(/*! ./createError */ \"./node_modules/axios/lib/core/createError.js\");\n\n/**\n * Resolve or reject a Promise based on response status.\n *\n * @param {Function} resolve A function that resolves the promise.\n * @param {Function} reject A function that rejects the promise.\n * @param {object} response The response.\n */\nmodule.exports = function settle(resolve, reject, response) {\n  var validateStatus = response.config.validateStatus;\n  if (!response.status || !validateStatus || validateStatus(response.status)) {\n    resolve(response);\n  } else {\n    reject(createError(\n      'Request failed with status code ' + response.status,\n      response.config,\n      null,\n      response.request,\n      response\n    ));\n  }\n};\n\n\n//# sourceURL=webpack://taskapps/./node_modules/axios/lib/core/settle.js?");

/***/ }),

/***/ "./node_modules/axios/lib/core/transformData.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/transformData.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\n\n/**\n * Transform the data for a request or a response\n *\n * @param {Object|String} data The data to be transformed\n * @param {Array} headers The headers for the request or response\n * @param {Array|Function} fns A single function or Array of functions\n * @returns {*} The resulting transformed data\n */\nmodule.exports = function transformData(data, headers, fns) {\n  /*eslint no-param-reassign:0*/\n  utils.forEach(fns, function transform(fn) {\n    data = fn(data, headers);\n  });\n\n  return data;\n};\n\n\n//# sourceURL=webpack://taskapps/./node_modules/axios/lib/core/transformData.js?");

/***/ }),

/***/ "./node_modules/axios/lib/defaults.js":
/*!********************************************!*\
  !*** ./node_modules/axios/lib/defaults.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./utils */ \"./node_modules/axios/lib/utils.js\");\nvar normalizeHeaderName = __webpack_require__(/*! ./helpers/normalizeHeaderName */ \"./node_modules/axios/lib/helpers/normalizeHeaderName.js\");\n\nvar DEFAULT_CONTENT_TYPE = {\n  'Content-Type': 'application/x-www-form-urlencoded'\n};\n\nfunction setContentTypeIfUnset(headers, value) {\n  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {\n    headers['Content-Type'] = value;\n  }\n}\n\nfunction getDefaultAdapter() {\n  var adapter;\n  if (typeof XMLHttpRequest !== 'undefined') {\n    // For browsers use XHR adapter\n    adapter = __webpack_require__(/*! ./adapters/xhr */ \"./node_modules/axios/lib/adapters/xhr.js\");\n  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {\n    // For node use HTTP adapter\n    adapter = __webpack_require__(/*! ./adapters/http */ \"./node_modules/axios/lib/adapters/xhr.js\");\n  }\n  return adapter;\n}\n\nvar defaults = {\n  adapter: getDefaultAdapter(),\n\n  transformRequest: [function transformRequest(data, headers) {\n    normalizeHeaderName(headers, 'Accept');\n    normalizeHeaderName(headers, 'Content-Type');\n    if (utils.isFormData(data) ||\n      utils.isArrayBuffer(data) ||\n      utils.isBuffer(data) ||\n      utils.isStream(data) ||\n      utils.isFile(data) ||\n      utils.isBlob(data)\n    ) {\n      return data;\n    }\n    if (utils.isArrayBufferView(data)) {\n      return data.buffer;\n    }\n    if (utils.isURLSearchParams(data)) {\n      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');\n      return data.toString();\n    }\n    if (utils.isObject(data)) {\n      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');\n      return JSON.stringify(data);\n    }\n    return data;\n  }],\n\n  transformResponse: [function transformResponse(data) {\n    /*eslint no-param-reassign:0*/\n    if (typeof data === 'string') {\n      try {\n        data = JSON.parse(data);\n      } catch (e) { /* Ignore */ }\n    }\n    return data;\n  }],\n\n  /**\n   * A timeout in milliseconds to abort a request. If set to 0 (default) a\n   * timeout is not created.\n   */\n  timeout: 0,\n\n  xsrfCookieName: 'XSRF-TOKEN',\n  xsrfHeaderName: 'X-XSRF-TOKEN',\n\n  maxContentLength: -1,\n  maxBodyLength: -1,\n\n  validateStatus: function validateStatus(status) {\n    return status >= 200 && status < 300;\n  }\n};\n\ndefaults.headers = {\n  common: {\n    'Accept': 'application/json, text/plain, */*'\n  }\n};\n\nutils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {\n  defaults.headers[method] = {};\n});\n\nutils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {\n  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);\n});\n\nmodule.exports = defaults;\n\n\n//# sourceURL=webpack://taskapps/./node_modules/axios/lib/defaults.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/bind.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/bind.js ***!
  \************************************************/
/***/ ((module) => {

"use strict";
eval("\n\nmodule.exports = function bind(fn, thisArg) {\n  return function wrap() {\n    var args = new Array(arguments.length);\n    for (var i = 0; i < args.length; i++) {\n      args[i] = arguments[i];\n    }\n    return fn.apply(thisArg, args);\n  };\n};\n\n\n//# sourceURL=webpack://taskapps/./node_modules/axios/lib/helpers/bind.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/buildURL.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/buildURL.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\n\nfunction encode(val) {\n  return encodeURIComponent(val).\n    replace(/%3A/gi, ':').\n    replace(/%24/g, '$').\n    replace(/%2C/gi, ',').\n    replace(/%20/g, '+').\n    replace(/%5B/gi, '[').\n    replace(/%5D/gi, ']');\n}\n\n/**\n * Build a URL by appending params to the end\n *\n * @param {string} url The base of the url (e.g., http://www.google.com)\n * @param {object} [params] The params to be appended\n * @returns {string} The formatted url\n */\nmodule.exports = function buildURL(url, params, paramsSerializer) {\n  /*eslint no-param-reassign:0*/\n  if (!params) {\n    return url;\n  }\n\n  var serializedParams;\n  if (paramsSerializer) {\n    serializedParams = paramsSerializer(params);\n  } else if (utils.isURLSearchParams(params)) {\n    serializedParams = params.toString();\n  } else {\n    var parts = [];\n\n    utils.forEach(params, function serialize(val, key) {\n      if (val === null || typeof val === 'undefined') {\n        return;\n      }\n\n      if (utils.isArray(val)) {\n        key = key + '[]';\n      } else {\n        val = [val];\n      }\n\n      utils.forEach(val, function parseValue(v) {\n        if (utils.isDate(v)) {\n          v = v.toISOString();\n        } else if (utils.isObject(v)) {\n          v = JSON.stringify(v);\n        }\n        parts.push(encode(key) + '=' + encode(v));\n      });\n    });\n\n    serializedParams = parts.join('&');\n  }\n\n  if (serializedParams) {\n    var hashmarkIndex = url.indexOf('#');\n    if (hashmarkIndex !== -1) {\n      url = url.slice(0, hashmarkIndex);\n    }\n\n    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;\n  }\n\n  return url;\n};\n\n\n//# sourceURL=webpack://taskapps/./node_modules/axios/lib/helpers/buildURL.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/combineURLs.js":
/*!*******************************************************!*\
  !*** ./node_modules/axios/lib/helpers/combineURLs.js ***!
  \*******************************************************/
/***/ ((module) => {

"use strict";
eval("\n\n/**\n * Creates a new URL by combining the specified URLs\n *\n * @param {string} baseURL The base URL\n * @param {string} relativeURL The relative URL\n * @returns {string} The combined URL\n */\nmodule.exports = function combineURLs(baseURL, relativeURL) {\n  return relativeURL\n    ? baseURL.replace(/\\/+$/, '') + '/' + relativeURL.replace(/^\\/+/, '')\n    : baseURL;\n};\n\n\n//# sourceURL=webpack://taskapps/./node_modules/axios/lib/helpers/combineURLs.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/cookies.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/helpers/cookies.js ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\n\nmodule.exports = (\n  utils.isStandardBrowserEnv() ?\n\n  // Standard browser envs support document.cookie\n    (function standardBrowserEnv() {\n      return {\n        write: function write(name, value, expires, path, domain, secure) {\n          var cookie = [];\n          cookie.push(name + '=' + encodeURIComponent(value));\n\n          if (utils.isNumber(expires)) {\n            cookie.push('expires=' + new Date(expires).toGMTString());\n          }\n\n          if (utils.isString(path)) {\n            cookie.push('path=' + path);\n          }\n\n          if (utils.isString(domain)) {\n            cookie.push('domain=' + domain);\n          }\n\n          if (secure === true) {\n            cookie.push('secure');\n          }\n\n          document.cookie = cookie.join('; ');\n        },\n\n        read: function read(name) {\n          var match = document.cookie.match(new RegExp('(^|;\\\\s*)(' + name + ')=([^;]*)'));\n          return (match ? decodeURIComponent(match[3]) : null);\n        },\n\n        remove: function remove(name) {\n          this.write(name, '', Date.now() - 86400000);\n        }\n      };\n    })() :\n\n  // Non standard browser env (web workers, react-native) lack needed support.\n    (function nonStandardBrowserEnv() {\n      return {\n        write: function write() {},\n        read: function read() { return null; },\n        remove: function remove() {}\n      };\n    })()\n);\n\n\n//# sourceURL=webpack://taskapps/./node_modules/axios/lib/helpers/cookies.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAbsoluteURL.js":
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAbsoluteURL.js ***!
  \*********************************************************/
/***/ ((module) => {

"use strict";
eval("\n\n/**\n * Determines whether the specified URL is absolute\n *\n * @param {string} url The URL to test\n * @returns {boolean} True if the specified URL is absolute, otherwise false\n */\nmodule.exports = function isAbsoluteURL(url) {\n  // A URL is considered absolute if it begins with \"<scheme>://\" or \"//\" (protocol-relative URL).\n  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed\n  // by any combination of letters, digits, plus, period, or hyphen.\n  return /^([a-z][a-z\\d\\+\\-\\.]*:)?\\/\\//i.test(url);\n};\n\n\n//# sourceURL=webpack://taskapps/./node_modules/axios/lib/helpers/isAbsoluteURL.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAxiosError.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAxiosError.js ***!
  \********************************************************/
/***/ ((module) => {

"use strict";
eval("\n\n/**\n * Determines whether the payload is an error thrown by Axios\n *\n * @param {*} payload The value to test\n * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false\n */\nmodule.exports = function isAxiosError(payload) {\n  return (typeof payload === 'object') && (payload.isAxiosError === true);\n};\n\n\n//# sourceURL=webpack://taskapps/./node_modules/axios/lib/helpers/isAxiosError.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/isURLSameOrigin.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isURLSameOrigin.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\n\nmodule.exports = (\n  utils.isStandardBrowserEnv() ?\n\n  // Standard browser envs have full support of the APIs needed to test\n  // whether the request URL is of the same origin as current location.\n    (function standardBrowserEnv() {\n      var msie = /(msie|trident)/i.test(navigator.userAgent);\n      var urlParsingNode = document.createElement('a');\n      var originURL;\n\n      /**\n    * Parse a URL to discover it's components\n    *\n    * @param {String} url The URL to be parsed\n    * @returns {Object}\n    */\n      function resolveURL(url) {\n        var href = url;\n\n        if (msie) {\n        // IE needs attribute set twice to normalize properties\n          urlParsingNode.setAttribute('href', href);\n          href = urlParsingNode.href;\n        }\n\n        urlParsingNode.setAttribute('href', href);\n\n        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils\n        return {\n          href: urlParsingNode.href,\n          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',\n          host: urlParsingNode.host,\n          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\\?/, '') : '',\n          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',\n          hostname: urlParsingNode.hostname,\n          port: urlParsingNode.port,\n          pathname: (urlParsingNode.pathname.charAt(0) === '/') ?\n            urlParsingNode.pathname :\n            '/' + urlParsingNode.pathname\n        };\n      }\n\n      originURL = resolveURL(window.location.href);\n\n      /**\n    * Determine if a URL shares the same origin as the current location\n    *\n    * @param {String} requestURL The URL to test\n    * @returns {boolean} True if URL shares the same origin, otherwise false\n    */\n      return function isURLSameOrigin(requestURL) {\n        var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;\n        return (parsed.protocol === originURL.protocol &&\n            parsed.host === originURL.host);\n      };\n    })() :\n\n  // Non standard browser envs (web workers, react-native) lack needed support.\n    (function nonStandardBrowserEnv() {\n      return function isURLSameOrigin() {\n        return true;\n      };\n    })()\n);\n\n\n//# sourceURL=webpack://taskapps/./node_modules/axios/lib/helpers/isURLSameOrigin.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/normalizeHeaderName.js":
/*!***************************************************************!*\
  !*** ./node_modules/axios/lib/helpers/normalizeHeaderName.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ../utils */ \"./node_modules/axios/lib/utils.js\");\n\nmodule.exports = function normalizeHeaderName(headers, normalizedName) {\n  utils.forEach(headers, function processHeader(value, name) {\n    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {\n      headers[normalizedName] = value;\n      delete headers[name];\n    }\n  });\n};\n\n\n//# sourceURL=webpack://taskapps/./node_modules/axios/lib/helpers/normalizeHeaderName.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/parseHeaders.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/parseHeaders.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\n\n// Headers whose duplicates are ignored by node\n// c.f. https://nodejs.org/api/http.html#http_message_headers\nvar ignoreDuplicateOf = [\n  'age', 'authorization', 'content-length', 'content-type', 'etag',\n  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',\n  'last-modified', 'location', 'max-forwards', 'proxy-authorization',\n  'referer', 'retry-after', 'user-agent'\n];\n\n/**\n * Parse headers into an object\n *\n * ```\n * Date: Wed, 27 Aug 2014 08:58:49 GMT\n * Content-Type: application/json\n * Connection: keep-alive\n * Transfer-Encoding: chunked\n * ```\n *\n * @param {String} headers Headers needing to be parsed\n * @returns {Object} Headers parsed into an object\n */\nmodule.exports = function parseHeaders(headers) {\n  var parsed = {};\n  var key;\n  var val;\n  var i;\n\n  if (!headers) { return parsed; }\n\n  utils.forEach(headers.split('\\n'), function parser(line) {\n    i = line.indexOf(':');\n    key = utils.trim(line.substr(0, i)).toLowerCase();\n    val = utils.trim(line.substr(i + 1));\n\n    if (key) {\n      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {\n        return;\n      }\n      if (key === 'set-cookie') {\n        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);\n      } else {\n        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;\n      }\n    }\n  });\n\n  return parsed;\n};\n\n\n//# sourceURL=webpack://taskapps/./node_modules/axios/lib/helpers/parseHeaders.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/spread.js":
/*!**************************************************!*\
  !*** ./node_modules/axios/lib/helpers/spread.js ***!
  \**************************************************/
/***/ ((module) => {

"use strict";
eval("\n\n/**\n * Syntactic sugar for invoking a function and expanding an array for arguments.\n *\n * Common use case would be to use `Function.prototype.apply`.\n *\n *  ```js\n *  function f(x, y, z) {}\n *  var args = [1, 2, 3];\n *  f.apply(null, args);\n *  ```\n *\n * With `spread` this example can be re-written.\n *\n *  ```js\n *  spread(function(x, y, z) {})([1, 2, 3]);\n *  ```\n *\n * @param {Function} callback\n * @returns {Function}\n */\nmodule.exports = function spread(callback) {\n  return function wrap(arr) {\n    return callback.apply(null, arr);\n  };\n};\n\n\n//# sourceURL=webpack://taskapps/./node_modules/axios/lib/helpers/spread.js?");

/***/ }),

/***/ "./node_modules/axios/lib/utils.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/utils.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar bind = __webpack_require__(/*! ./helpers/bind */ \"./node_modules/axios/lib/helpers/bind.js\");\n\n/*global toString:true*/\n\n// utils is a library of generic helper functions non-specific to axios\n\nvar toString = Object.prototype.toString;\n\n/**\n * Determine if a value is an Array\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is an Array, otherwise false\n */\nfunction isArray(val) {\n  return toString.call(val) === '[object Array]';\n}\n\n/**\n * Determine if a value is undefined\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if the value is undefined, otherwise false\n */\nfunction isUndefined(val) {\n  return typeof val === 'undefined';\n}\n\n/**\n * Determine if a value is a Buffer\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a Buffer, otherwise false\n */\nfunction isBuffer(val) {\n  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)\n    && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);\n}\n\n/**\n * Determine if a value is an ArrayBuffer\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is an ArrayBuffer, otherwise false\n */\nfunction isArrayBuffer(val) {\n  return toString.call(val) === '[object ArrayBuffer]';\n}\n\n/**\n * Determine if a value is a FormData\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is an FormData, otherwise false\n */\nfunction isFormData(val) {\n  return (typeof FormData !== 'undefined') && (val instanceof FormData);\n}\n\n/**\n * Determine if a value is a view on an ArrayBuffer\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false\n */\nfunction isArrayBufferView(val) {\n  var result;\n  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {\n    result = ArrayBuffer.isView(val);\n  } else {\n    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);\n  }\n  return result;\n}\n\n/**\n * Determine if a value is a String\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a String, otherwise false\n */\nfunction isString(val) {\n  return typeof val === 'string';\n}\n\n/**\n * Determine if a value is a Number\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a Number, otherwise false\n */\nfunction isNumber(val) {\n  return typeof val === 'number';\n}\n\n/**\n * Determine if a value is an Object\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is an Object, otherwise false\n */\nfunction isObject(val) {\n  return val !== null && typeof val === 'object';\n}\n\n/**\n * Determine if a value is a plain Object\n *\n * @param {Object} val The value to test\n * @return {boolean} True if value is a plain Object, otherwise false\n */\nfunction isPlainObject(val) {\n  if (toString.call(val) !== '[object Object]') {\n    return false;\n  }\n\n  var prototype = Object.getPrototypeOf(val);\n  return prototype === null || prototype === Object.prototype;\n}\n\n/**\n * Determine if a value is a Date\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a Date, otherwise false\n */\nfunction isDate(val) {\n  return toString.call(val) === '[object Date]';\n}\n\n/**\n * Determine if a value is a File\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a File, otherwise false\n */\nfunction isFile(val) {\n  return toString.call(val) === '[object File]';\n}\n\n/**\n * Determine if a value is a Blob\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a Blob, otherwise false\n */\nfunction isBlob(val) {\n  return toString.call(val) === '[object Blob]';\n}\n\n/**\n * Determine if a value is a Function\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a Function, otherwise false\n */\nfunction isFunction(val) {\n  return toString.call(val) === '[object Function]';\n}\n\n/**\n * Determine if a value is a Stream\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a Stream, otherwise false\n */\nfunction isStream(val) {\n  return isObject(val) && isFunction(val.pipe);\n}\n\n/**\n * Determine if a value is a URLSearchParams object\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a URLSearchParams object, otherwise false\n */\nfunction isURLSearchParams(val) {\n  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;\n}\n\n/**\n * Trim excess whitespace off the beginning and end of a string\n *\n * @param {String} str The String to trim\n * @returns {String} The String freed of excess whitespace\n */\nfunction trim(str) {\n  return str.replace(/^\\s*/, '').replace(/\\s*$/, '');\n}\n\n/**\n * Determine if we're running in a standard browser environment\n *\n * This allows axios to run in a web worker, and react-native.\n * Both environments support XMLHttpRequest, but not fully standard globals.\n *\n * web workers:\n *  typeof window -> undefined\n *  typeof document -> undefined\n *\n * react-native:\n *  navigator.product -> 'ReactNative'\n * nativescript\n *  navigator.product -> 'NativeScript' or 'NS'\n */\nfunction isStandardBrowserEnv() {\n  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||\n                                           navigator.product === 'NativeScript' ||\n                                           navigator.product === 'NS')) {\n    return false;\n  }\n  return (\n    typeof window !== 'undefined' &&\n    typeof document !== 'undefined'\n  );\n}\n\n/**\n * Iterate over an Array or an Object invoking a function for each item.\n *\n * If `obj` is an Array callback will be called passing\n * the value, index, and complete array for each item.\n *\n * If 'obj' is an Object callback will be called passing\n * the value, key, and complete object for each property.\n *\n * @param {Object|Array} obj The object to iterate\n * @param {Function} fn The callback to invoke for each item\n */\nfunction forEach(obj, fn) {\n  // Don't bother if no value provided\n  if (obj === null || typeof obj === 'undefined') {\n    return;\n  }\n\n  // Force an array if not already something iterable\n  if (typeof obj !== 'object') {\n    /*eslint no-param-reassign:0*/\n    obj = [obj];\n  }\n\n  if (isArray(obj)) {\n    // Iterate over array values\n    for (var i = 0, l = obj.length; i < l; i++) {\n      fn.call(null, obj[i], i, obj);\n    }\n  } else {\n    // Iterate over object keys\n    for (var key in obj) {\n      if (Object.prototype.hasOwnProperty.call(obj, key)) {\n        fn.call(null, obj[key], key, obj);\n      }\n    }\n  }\n}\n\n/**\n * Accepts varargs expecting each argument to be an object, then\n * immutably merges the properties of each object and returns result.\n *\n * When multiple objects contain the same key the later object in\n * the arguments list will take precedence.\n *\n * Example:\n *\n * ```js\n * var result = merge({foo: 123}, {foo: 456});\n * console.log(result.foo); // outputs 456\n * ```\n *\n * @param {Object} obj1 Object to merge\n * @returns {Object} Result of all merge properties\n */\nfunction merge(/* obj1, obj2, obj3, ... */) {\n  var result = {};\n  function assignValue(val, key) {\n    if (isPlainObject(result[key]) && isPlainObject(val)) {\n      result[key] = merge(result[key], val);\n    } else if (isPlainObject(val)) {\n      result[key] = merge({}, val);\n    } else if (isArray(val)) {\n      result[key] = val.slice();\n    } else {\n      result[key] = val;\n    }\n  }\n\n  for (var i = 0, l = arguments.length; i < l; i++) {\n    forEach(arguments[i], assignValue);\n  }\n  return result;\n}\n\n/**\n * Extends object a by mutably adding to it the properties of object b.\n *\n * @param {Object} a The object to be extended\n * @param {Object} b The object to copy properties from\n * @param {Object} thisArg The object to bind function to\n * @return {Object} The resulting value of object a\n */\nfunction extend(a, b, thisArg) {\n  forEach(b, function assignValue(val, key) {\n    if (thisArg && typeof val === 'function') {\n      a[key] = bind(val, thisArg);\n    } else {\n      a[key] = val;\n    }\n  });\n  return a;\n}\n\n/**\n * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)\n *\n * @param {string} content with BOM\n * @return {string} content value without BOM\n */\nfunction stripBOM(content) {\n  if (content.charCodeAt(0) === 0xFEFF) {\n    content = content.slice(1);\n  }\n  return content;\n}\n\nmodule.exports = {\n  isArray: isArray,\n  isArrayBuffer: isArrayBuffer,\n  isBuffer: isBuffer,\n  isFormData: isFormData,\n  isArrayBufferView: isArrayBufferView,\n  isString: isString,\n  isNumber: isNumber,\n  isObject: isObject,\n  isPlainObject: isPlainObject,\n  isUndefined: isUndefined,\n  isDate: isDate,\n  isFile: isFile,\n  isBlob: isBlob,\n  isFunction: isFunction,\n  isStream: isStream,\n  isURLSearchParams: isURLSearchParams,\n  isStandardBrowserEnv: isStandardBrowserEnv,\n  forEach: forEach,\n  merge: merge,\n  extend: extend,\n  trim: trim,\n  stripBOM: stripBOM\n};\n\n\n//# sourceURL=webpack://taskapps/./node_modules/axios/lib/utils.js?");

/***/ }),

/***/ "./src/public/css/app.css":
/*!********************************!*\
  !*** ./src/public/css/app.css ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://taskapps/./src/public/css/app.css?");

/***/ }),

/***/ "./src/public/js/Services/Category.js":
/*!********************************************!*\
  !*** ./src/public/js/Services/Category.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);\n\r\n\r\nconst editCategory = async (url, nameCategory) => {\r\n    try {\r\n        const res = await axios__WEBPACK_IMPORTED_MODULE_0___default().put(`/categories/${url}`, {name: nameCategory} )\r\n        return res.data;\r\n    } catch (err) {\r\n        return {ok: false, eror: err}\r\n    }\r\n}\r\n\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({editCategory});\n\n//# sourceURL=webpack://taskapps/./src/public/js/Services/Category.js?");

/***/ }),

/***/ "./src/public/js/Services/General.js":
/*!*******************************************!*\
  !*** ./src/public/js/Services/General.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);\n\r\n\r\nconst searchCategoriesAndTasks = async (arg) => {\r\n\ttry {\r\n\t\tconst res = await axios__WEBPACK_IMPORTED_MODULE_0___default().get(`/search/${arg}`);\r\n\t\treturn res.data;\r\n\t} catch (err) {\r\n\t\treturn { ok: false, err };\r\n\t}\r\n};\r\n\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({searchCategoriesAndTasks});\n\n//# sourceURL=webpack://taskapps/./src/public/js/Services/General.js?");

/***/ }),

/***/ "./src/public/js/Services/Task.js":
/*!****************************************!*\
  !*** ./src/public/js/Services/Task.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);\n\r\n\r\nconst addTask = async (url, descriptionTask) => {\r\n\ttry {\r\n\t\tconst res = await axios__WEBPACK_IMPORTED_MODULE_0___default().post(`/tasks/${url}`, {\r\n\t\t\tdescription: descriptionTask,\r\n\t\t});\r\n\t\treturn res.data;\r\n\t} catch (err) {\r\n\t\treturn { ok: false, error: err };\r\n\t}\r\n};\r\n\r\nconst editTask = async (url, descriptionTask) => {\r\n\ttry {\r\n\t\tconst res = await axios__WEBPACK_IMPORTED_MODULE_0___default().put(`/tasks/${url}`, {\r\n\t\t\tdescription: descriptionTask,\r\n\t\t});\r\n\t\treturn res.data;\r\n\t} catch (err) {\r\n\t\treturn { ok: false, error: err };\r\n\t}\r\n};\r\n\r\nconst changeStateTask = async (url) => {\r\n\ttry {\r\n\t\tconst res = await axios__WEBPACK_IMPORTED_MODULE_0___default().put(`/tasks/${url}/state`)\r\n\t\treturn res.data\r\n\t}\r\n\tcatch(err) { return {ok: false, error: err}}\r\n}\r\n\r\nconst deleteTask = async (url) => {\r\n\ttry {\r\n\t\tconst res = await axios__WEBPACK_IMPORTED_MODULE_0___default().delete(`/tasks/${url}`);\r\n\t\treturn res.data;\r\n\t} catch (err) {\r\n\t\treturn { ok: false, error: err };\r\n\t}\r\n};\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({addTask, editTask, deleteTask, changeStateTask});\r\n\n\n//# sourceURL=webpack://taskapps/./src/public/js/Services/Task.js?");

/***/ }),

/***/ "./src/public/js/UI/Category.js":
/*!**************************************!*\
  !*** ./src/public/js/UI/Category.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Services_Category__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Services/Category */ \"./src/public/js/Services/Category.js\");\n\r\n\r\nconst editCategory = async () => {\r\n\tdocument\r\n\t\t.getElementById(\"form-edit-category\")\r\n\t\t.addEventListener(\"submit\", async (e) => {\r\n\t\t\te.preventDefault();\r\n\t\t\tconst categoryName = document.getElementById(\"txt-edit-category\").value;\r\n\t\t\tconst url = document\r\n\t\t\t\t.getElementById(`label-category`)\r\n\t\t\t\t.getAttribute(\"category-url\");\r\n\r\n\t\t\tconst data = await _Services_Category__WEBPACK_IMPORTED_MODULE_0__.default.editCategory(url, categoryName);\r\n\t\t\tif (!data.ok) {\r\n\t\t\t\talert(\"Ha ocurrido un error, intentalo más tarde\");\r\n\t\t\t\treturn;\r\n\t\t\t}\r\n\r\n\t\t\tdocument.getElementById(`label-category`).innerHTML = data.category.name;\r\n\t\t});\r\n};\r\n\r\nconst generateFormEditCategory = () => {\r\n\tconst label = document.getElementById(`label-category`);\r\n\tconst url = label.getAttribute(\"category-url\");\r\n\tconst value = label.textContent;\r\n\r\n\tdocument.getElementById(\"optionsContainer\").classList.add(\"hidden\");\r\n\r\n\tconst html = `\r\n        <form id=\"form-edit-category\" class=\"block w-full\">\r\n            <input required value='${value}' name=\"name\" maxlength=\"32\" id=\"txt-edit-category\" category-url=\"${url}\" class=\"form-input block w-full\" onfocus=\"const value = this.value; this.value = null; this.value=value\">\r\n        </form>\r\n    `;\r\n\r\n\tlabel.innerHTML = `${html}`;\r\n\tconst txtEditCategory = document.getElementById(\"txt-edit-category\");\r\n\ttxtEditCategory.focus();\r\n\r\n\t// destroy form if click out\r\n\ttxtEditCategory.addEventListener(\"blur\", () => (label.innerHTML = value));\r\n\r\n\teditCategory();\r\n};\r\n\r\nconst listenerEditCategory = () => {\r\n\tdocument\r\n\t\t.getElementById(\"btn-edit-category\")\r\n\t\t.addEventListener(\"click\", async () => {\r\n\t\t\tgenerateFormEditCategory();\r\n\t\t});\r\n};\r\n\r\n// ---------------------------------------------------\r\n\r\ndocument.addEventListener(\"DOMContentLoaded\", () => {\r\n\tconst currentPage = document.getElementById(\"current-page\").value || \"\";\r\n\r\n\tif (currentPage === \"categories.show\") {\r\n\t\tlistenerEditCategory();\r\n\t}\r\n});\r\n\n\n//# sourceURL=webpack://taskapps/./src/public/js/UI/Category.js?");

/***/ }),

/***/ "./src/public/js/UI/General.js":
/*!*************************************!*\
  !*** ./src/public/js/UI/General.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Services_General__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Services/General */ \"./src/public/js/Services/General.js\");\n/* harmony import */ var _helpers_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers.js */ \"./src/public/js/helpers.js\");\n\r\n\r\n\r\nconst searchCategoriesAndTasks = async (query) => {\r\n\tconst res = await _Services_General__WEBPACK_IMPORTED_MODULE_0__.default.searchCategoriesAndTasks(query);\r\n\treturn res;\r\n};\r\n\r\nconst drawContainerSearch = (result) => {\r\n\tconst categories = result.categories;\r\n\tconst tasks = result.tasks;\r\n\tconst search = result.search;\r\n\r\n\tconst resultsSearch = document.getElementById(\"results-search\");\r\n\r\n\tlet categoriesHTML = categories.map((category) => {\r\n\t\tconst span = `<span class=\"font-bold\">${search}</span>`;\r\n\t\tconst newName = category.name\r\n\t\t\t.toLowerCase()\r\n\t\t\t.replace(search.toLowerCase(), span);\r\n\t\treturn `\r\n            <a href=\"/categories/${category.url}\" class=\"flex items-center bg-gray-50 rounded-lg px-4 py-4 group shadow-sm\">\r\n                <div class=\"group-hover:bg-${category.color}-500 p-2 rounded-full bg-${category.color}-400\"></div>\r\n                <p class=\"ml-2 leading-none text-sm break-word\">${newName}</p>\r\n            </a>\r\n        `;\r\n\t});\r\n\r\n\tlet tasksHTML = tasks.map((task) => {\r\n\t\tconst span = `<span class=\"font-bold\">${search}</span>`;\r\n\t\tconst newDescription = task.description\r\n\t\t\t.toLowerCase()\r\n\t\t\t.replace(search.toLowerCase(), span);\r\n\r\n\t\treturn `\r\n            <a href=\"/categories/${task.Category.url}\" class=\"block bg-gray-50 rounded-lg pt-3 pb-2 px-4 group shadow-sm\">\r\n                <p class=\"text-sm mr-2 leading-none break-word\">${newDescription}</p>\r\n                <div class=\"flex items-center mt-1\">\r\n                    <p class=\"p-1 rounded-full bg-${task.Category.color}-400 group-hover:bg-${task.Category.color}-500\"></p>\r\n                    <p class=\"ml-1 text-xs text-gray-400\">${task.Category.name}</p>\r\n                </div>\r\n            </a>\r\n        `;\r\n\t});\r\n\r\n\tcategoriesHTML = `\r\n        <div>\r\n            <p class=\"text-gray-400 text-sm mb-1\">Categorias</p>\r\n            <div class=\"space-y-2\">\r\n                ${categoriesHTML.join(\"\")}\r\n            </div>\r\n        </div>\r\n    `;\r\n\r\n\ttasksHTML = `\r\n        <div>\r\n            <p class=\"text-gray-400 text-sm mb-1\">Tareas</p>\r\n            <div class=\"space-y-2\">\r\n                ${tasksHTML.join(\"\")}\r\n            </div>\r\n        </div>\r\n    `;\r\n\r\n\tlet html = ``;\r\n\r\n\tif (categories.length > 0) html += categoriesHTML;\r\n\tif (tasks.length > 0) html += tasksHTML;\r\n\tif (html.length == 0)\r\n\t\thtml = `<p class=\"text-sm text-center text-gray-400\">No hay resultados</p>`;\r\n\r\n\tresultsSearch.innerHTML = html;\r\n};\r\n\r\nconst listenerSearchCategoriesAndTasks = () => {\r\n\tconst txtSearch = document.getElementById(\"txt-search\");\r\n\r\n\ttxtSearch.addEventListener(\"input\", async () => {\r\n\t\tconst resultsSearch = document.getElementById(\"results-search\");\r\n\r\n\t\tresultsSearch.innerHTML = `<img class=\"w-6 mx-auto rotate\" src=\"/img/loader.svg\">`;\r\n\r\n\t\tif (txtSearch.value.length > 1) {\r\n\t\t\tresultsSearch.classList.remove(\"hidden\");\r\n\t\t\tconst data = await searchCategoriesAndTasks(txtSearch.value);\r\n\t\t\tdrawContainerSearch(data);\r\n\t\t} else {\r\n\t\t\tresultsSearch.classList.add(\"hidden\");\r\n\t\t}\r\n\t});\r\n};\r\n// -----------------------------------------------------------------\r\n\r\ndocument.addEventListener(\"DOMContentLoaded\", () => {\r\n\tlistenerSearchCategoriesAndTasks();\r\n})\r\n\r\n;(0,_helpers_js__WEBPACK_IMPORTED_MODULE_1__.toggleShowComponent)(null, document.getElementById(\"results-search\"));\n\n//# sourceURL=webpack://taskapps/./src/public/js/UI/General.js?");

/***/ }),

/***/ "./src/public/js/UI/Task.js":
/*!**********************************!*\
  !*** ./src/public/js/UI/Task.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Services_Task__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Services/Task */ \"./src/public/js/Services/Task.js\");\n\r\n\r\nconst addTask = async () => {\r\n  const categoryUrl = document.getElementById(\"category-url\").value;\r\n  const description = document.getElementById(\"txt-category\").value;\r\n  const data = await _Services_Task__WEBPACK_IMPORTED_MODULE_0__.default.addTask(categoryUrl, description);\r\n\r\n  return data;\r\n};\r\n\r\nconst editTask = async () => {\r\n  const formEditTask = document.getElementById(\"form-edit-task\");\r\n  formEditTask.addEventListener(\"submit\", async (e) => {\r\n    e.preventDefault();\r\n\r\n    const form = new FormData(formEditTask);\r\n\r\n    const txtTask = document.getElementById(\"txt-edit-task\");\r\n    const id = txtTask.getAttribute(\"task-id\");\r\n\r\n    let description = form.get(\"description\");\r\n\r\n    const data = await _Services_Task__WEBPACK_IMPORTED_MODULE_0__.default.editTask(id, description);\r\n    if (!data.ok) {\r\n      alert(\"Ha ocurrido un error, intentalo más tarde\");\r\n      return;\r\n    }\r\n    document.getElementById(`label-task-${id}`).innerHTML =\r\n      data.task.description;\r\n  });\r\n};\r\n\r\nconst deleteTask = async (id) => {\r\n  const data = await _Services_Task__WEBPACK_IMPORTED_MODULE_0__.default.deleteTask(id);\r\n  if (!data.ok) {\r\n    alert(\"Ha ocurrido un error, intentalo más tarde\");\r\n    return;\r\n  }\r\n  return data;\r\n};\r\n\r\nconst changeState = async (taskId) => {\r\n  const data = await _Services_Task__WEBPACK_IMPORTED_MODULE_0__.default.changeStateTask(taskId);\r\n  if (!data.ok) {\r\n    alert(\"Ha ocurrido un error, intentalo más tarde\");\r\n    return;\r\n  }\r\n  return data;\r\n};\r\n\r\nconst generateOrDestroyProgressBar = (\r\n  data,\r\n  generateTrueDestroyFalse = true\r\n) => {\r\n  const stats = data.stats;\r\n  const category = data.category;\r\n  const containerProgressBar = document.getElementById(\r\n    \"container-progress-bar\"\r\n  );\r\n  const textEmptyTasks = document.getElementById(\"text-empty-tasks\");\r\n  const titleTasks = document.getElementById(\"title-tasks\");\r\n\r\n  if (generateTrueDestroyFalse) {\r\n    const html = `\r\n\t\t\t<div>\r\n\t\t\t\t<p class=\"text-xs m-0\">\r\n\t\t\t\t\tProgreso:\r\n\t\t\t\t\t<span class=\"ml-1 font-medium\">\r\n\t\t\t\t\t\t<span id=\"tasks-completed\">${stats.completed}</span>\r\n\t\t\t\t\t\t<span class=\"mx-1\">/</span>\r\n\t\t\t\t\t\t<span id=\"tasks-total\">${stats.tasks}</span>\r\n\t\t\t\t\t</span>\r\n\t\t\t\t\t<span class=\"ml-2\" id=\"tasks-percent\">(${stats.percent}%)</span>\r\n\t\t\t\t</p>\r\n                <div class=\"bg-${category.color}-200 shadow w-full rounded mt-1\">\r\n                    <div class=\"bg-${category.color}-600 leading-none pt-1 pb-2 rounded\" style=\"width: ${stats.percent}%; transition: width 2s\" id=\"progress-category\"></div>\r\n                </div>\r\n            </div>\r\n\t\t`;\r\n\r\n    textEmptyTasks.innerHTML = \"\";\r\n    containerProgressBar.innerHTML = html;\r\n    titleTasks.classList.contains(\"hidden\")\r\n      ? titleTasks.classList.remove(\"hidden\")\r\n      : null;\r\n  } else {\r\n    const containerTasks = document.getElementById(\"container-tasks\");\r\n\r\n    const html = `\r\n\t\t<p class=\"text-gray-400 text-center mt-4 text-sm\">No hay tareas registradas.</p>\r\n\t\t`;\r\n\r\n    containerProgressBar.innerHTML = html;\r\n    textEmptyTasks.innerHTML = `\r\n\t\t\t<img class=\"block md:hidden px-24 py-4 mx-auto\" src=\"/img/empty-tasks.svg\" alt=\"\" onclick=\"document.getElementById('btn-add-category').click()\"/>\r\n\t\t\t<img class=\"hidden md:block px-16 py-4 mx-auto max-w-xs\" src=\"/img/empty-tasks.svg\" alt=\"\" onclick=\"document.getElementById('btn-add-category').click()\"/>\r\n\t\t`;\r\n    !titleTasks.classList.contains(\"hidden\")\r\n      ? titleTasks.classList.add(\"hidden\")\r\n      : null;\r\n  }\r\n};\r\n\r\nconst changeProgressBar = async (stats) => {\r\n  if (document.getElementById(\"progress-category\")) {\r\n    /** DENTRO DE PAGINA SHOW */\r\n    const progressBar = document.getElementById(\"progress-category\");\r\n    const tasksPercent = document.getElementById(\"tasks-percent\");\r\n    const tasksCompleted = document.getElementById(\"tasks-completed\");\r\n    const tasksTotal = document.getElementById(\"tasks-total\");\r\n\r\n    tasksCompleted.textContent = stats.completed;\r\n    tasksTotal.textContent = stats.tasks;\r\n    tasksPercent.textContent = `(${stats.percent}%)`;\r\n    progressBar.style.width = `${stats.percent}%`;\r\n  } else {\r\n    /** DENTRO DE PAGINA PRINCIPAL */\r\n    if (document.getElementById(`progress-category-${stats.id}`)) {\r\n      /** SI LA CATEGORIA SE ENCUENTRA ENTRE LAS CATEGORIAS RECIENTES LA LLEVAMOS AL PRINCIPIO */\r\n      const progressBar = document.getElementById(\r\n        `progress-category-${stats.id}`\r\n      );\r\n      const tasksTotal = document.getElementById(`tasks-total-${stats.id}`);\r\n      const tasksPercent = document.getElementById(`tasks-percent-${stats.id}`);\r\n      const categoryDate = document.getElementById(`category-date-${stats.id}`);\r\n\r\n      progressBar.style.width = `${stats.percent}%`;\r\n      tasksPercent.textContent = `${stats.percent}%`;\r\n      categoryDate.textContent = \"hace unos segundos\";\r\n\r\n      const parent = progressBar.parentNode.parentNode;\r\n\r\n      parent.remove();\r\n\r\n      const containerCategories = document.getElementById(\r\n        \"container-categories\"\r\n      );\r\n      containerCategories.prepend(parent);\r\n    } else {\r\n      /** SI NO SE ENCUENTRA LA CREAMOS Y LA ENVIAMOS AL PRINCIPIO */\r\n      const category = stats.category;\r\n      const containerCategories = document.getElementById(\r\n        \"container-categories\"\r\n      );\r\n\r\n      const html = `\r\n\t\t\t\t<a class=\"w-9/12 md:w-6/12 lg:w-4/12 flex-none bg-white rounded shadow-sm p-4 relative pb-6 mb-2\"\r\n                    href=\"/categories/${category.url}\">\r\n                    <div class=\"flex justify-between items-start\">\r\n                        <div class=\"leading-none\">\r\n                            <h4 class=\"font-semibold text-xl leading-none break-word\">${category.name}</h4>\r\n                            <p class=\"text-gray-400 text-sm\" id=\"tasks-total-2\">${category.Tasks.length} Tareas</p>\r\n                        </div>\r\n                        <p class=\"text-${category.color}-500 text-3xl font-bold ml-2\" id=\"tasks-percent-2\">${stats.percent}%</p>\r\n                    </div>\r\n                    <div class=\"bg-${category.color}-200 shadow w-full rounded\">\r\n                        <div class=\"bg-${category.color}-500 leading-none py-1 rounded my-1\" id=\"progress-category-${category.id}\"\r\n                            style=\"width: ${stats.percent}%\"></div>\r\n                    </div><small class=\"block text-xs text-gray-400 absolute right-4 bottom-2\">hace unos segundos</small>\r\n                </a>\r\n\t\t\t`;\r\n\r\n      containerCategories.innerHTML = html + containerCategories.innerHTML;\r\n    }\r\n  }\r\n};\r\n\r\nconst toggleShowFormAdd = (ShowFormTrueDestroyFormFalse = true) => {\r\n  const btnAdd = document.getElementById(\"btn-add-category\");\r\n  const containerAdd = document.getElementById(\"container-add-category\");\r\n  const btnClose = document.getElementById(\"btn-close-category\");\r\n  const txtTask = document.getElementById(\"txt-category\");\r\n\r\n  txtTask.value = \"\";\r\n\r\n  if (ShowFormTrueDestroyFormFalse) {\r\n    btnAdd.classList.remove(\"hidden\");\r\n    btnClose.classList.add(\"hidden\");\r\n    containerAdd.classList.add(\"hidden\");\r\n  } else {\r\n    btnAdd.classList.add(\"hidden\");\r\n    btnClose.classList.remove(\"hidden\");\r\n    containerAdd.classList.remove(\"hidden\");\r\n  }\r\n};\r\n\r\nconst drawTask = (data) => {\r\n  const category = data.category;\r\n  const stats = data.stats;\r\n  const task = data.task;\r\n\r\n  const containerTasks = document.getElementById(\"container-tasks\");\r\n\r\n  const html = `\r\n\t\t<label class=\"flex items-center p-3 bg-white rounded shadow-sm w-full leading-none cursor-pointer\">\r\n\t\t\t<input class=\"task border-${category.color}-600 text-${category.color}-600 form-checkbox p-4 rounded-full border-2\" type=\"checkbox\" task-id=\"${task.id}\" />\r\n\t\t\t<span class=\"ml-4 block break-word mr-2 w-full\" id=\"label-task-${task.id}\">${task.description}</span>\r\n\t\t\t<div class=\"flex ml-auto space-x-2 text-gray-400\">\r\n\t\t\t\t<button class=\"hover:text-${category.color}-300 btn-edit-task\" task-id=\"${task.id}\">\r\n\t\t\t\t\t<svg class=\"w-6\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\">\r\n\t\t\t\t\t\t<path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z\"></path>\r\n\t\t\t\t\t</svg>\r\n\t\t\t\t</button>\r\n\t\t\t\t<button class=\"hover:text-${category.color}-300 btn-delete-task\" task-id=\"${task.id}\">\r\n\t\t\t\t\t<svg class=\"w-6\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\">\r\n\t\t\t\t\t\t<path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16\"></path>\r\n\t\t\t\t\t</svg>\r\n\t\t\t\t</button>\r\n\t\t\t</div>\r\n\t\t</label>\r\n\t`;\r\n\r\n  containerTasks.innerHTML = html + containerTasks.innerHTML;\r\n\r\n  listenerEditTask();\r\n  listenerDeleteTask();\r\n  listenerChangeState();\r\n};\r\n\r\nconst generateFormEditTask = (id, value) => {\r\n  const label = document.getElementById(`label-task-${id}`);\r\n\r\n  const html = `\r\n\t\t<form id=\"form-edit-task\">\r\n\t\t\t<input required type=\"text\" name=\"description\" maxlength=\"50\" id=\"txt-edit-task\" task-id=\"${id}\" value='${value}' class=\"border border-gray-400 p-1 w-full\" onfocus=\"const value = this.value; this.value = null; this.value=value\">\r\n\t\t</form>\r\n\t`;\r\n\r\n  label.innerHTML = html;\r\n\r\n  const txtEditTask = document.getElementById(\"txt-edit-task\");\r\n  txtEditTask.focus();\r\n\r\n  txtEditTask.addEventListener(\"blur\", () => (label.innerHTML = value));\r\n\r\n  editTask();\r\n};\r\n\r\nconst removeTask = (btnTask) => {\r\n  const labelTask = btnTask.parentNode.parentNode;\r\n  labelTask.remove();\r\n};\r\n\r\nconst listenerAddTask = () => {\r\n  document\r\n    .getElementById(\"form-add-task\")\r\n    .addEventListener(\"submit\", async (e) => {\r\n      e.preventDefault();\r\n      const data = await addTask();\r\n      if (!data.ok) {\r\n        alert(\"Ha ocurrido un error, intentalo más tarde\");\r\n        return;\r\n      }\r\n      if (data.stats.tasks == 1)\r\n        /** Primera tarea creada */\r\n        generateOrDestroyProgressBar(data, true);\r\n      /** ya hay mas tareas */ else changeProgressBar(data.stats);\r\n\r\n      toggleShowFormAdd(true);\r\n      drawTask(data);\r\n    });\r\n};\r\n\r\nconst listenerEditTask = () => {\r\n  document.querySelectorAll(\".btn-edit-task\").forEach((btn) => {\r\n    btn.addEventListener(\"click\", async () => {\r\n      const text = btn.parentNode.parentNode.children[1].textContent;\r\n      // /** span con el nombre de la tarea */\r\n      const taskId = btn.getAttribute(\"task-id\");\r\n\r\n      await generateFormEditTask(taskId, text);\r\n    });\r\n  });\r\n};\r\n\r\nconst listenerDeleteTask = () => {\r\n  document.querySelectorAll(\".btn-delete-task\").forEach((btn) => {\r\n    btn.addEventListener(\"click\", async () => {\r\n      const text = btn.parentNode.parentNode.children[1].textContent;\r\n      const taskId = btn.getAttribute(\"task-id\");\r\n      /** span con el nombre de la tarea */\r\n\r\n      if (confirm(`Se eliminará la tarea \"${text}\"`)) {\r\n        const data = await deleteTask(taskId);\r\n\r\n        if (data.stats.tasks) changeProgressBar(data.stats);\r\n        else generateOrDestroyProgressBar(data, false);\r\n\r\n        removeTask(btn);\r\n      }\r\n    });\r\n  });\r\n};\r\n\r\nconst listenerChangeState = () => {\r\n  document.querySelectorAll(\".task\").forEach((task) => {\r\n    task.addEventListener(\"change\", async (e) => {\r\n      const stats = await changeState(task.getAttribute(\"task-id\"));\r\n      changeProgressBar(stats.stats);\r\n    });\r\n  });\r\n};\r\n\r\n// -----------------------------------------------\r\n\r\ndocument.addEventListener(\"DOMContentLoaded\", () => {\r\n  const currentPage = document.getElementById(\"current-page\").value || \"\";\r\n\r\n  if (currentPage === \"categories.show\") {\r\n    listenerAddTask();\r\n    listenerEditTask();\r\n    listenerDeleteTask();\r\n  }\r\n\r\n  if (currentPage === \"categories.show\" || currentPage === \"pages.home\") {\r\n    listenerChangeState();\r\n  }\r\n});\r\n\n\n//# sourceURL=webpack://taskapps/./src/public/js/UI/Task.js?");

/***/ }),

/***/ "./src/public/js/UI/UI.js":
/*!********************************!*\
  !*** ./src/public/js/UI/UI.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _helpers_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers.js */ \"./src/public/js/helpers.js\");\n\r\n\r\n// NAVBAR --------------------------------------------------\r\nconst btnUser = document.getElementById(\"user-button\");\r\nconst containerUser = document.getElementById(\"user-container\");\r\nconst btnUserResponsive = document.getElementById(\"user-button-bottom\");\r\nconst containerUserResponsive = document.getElementById(\"user-container-bottom\");\r\nconst btnSearch = document.getElementById(\"btn-search\");\r\nconst containerSearch = document.getElementById(\"container-search\");\r\n\r\n(0,_helpers_js__WEBPACK_IMPORTED_MODULE_0__.toggleShowComponent)(btnUser, containerUser)\r\n;(0,_helpers_js__WEBPACK_IMPORTED_MODULE_0__.toggleShowComponent)(btnUserResponsive, containerUserResponsive)\r\n\r\nbtnSearch.addEventListener(\"click\", () => {\r\n\tcontainerUser.classList.contains(\"hidden\")\r\n\t\t? null\r\n\t\t: containerUser.classList.add(\"hidden\");\r\n\tcontainerSearch.classList.toggle(\"hidden\");\r\n\tdocument.getElementById(\"txt-search\").focus();\r\n});\r\n\r\nif (document.getElementById(\"btn-back\")) {\r\n\tconst btnBack = document.getElementById(\"btn-back\");\r\n\tbtnBack.setAttribute(\r\n\t\t\"href\",\r\n\t\tdocument.referrer.length > 0 ? document.referrer : \"/\"\r\n\t);\r\n}\r\n\r\n// ADD CATEGORY --------------------------------------------------\r\ndocument.addEventListener(\"DOMContentLoaded\", () => {\r\n\tconst currentPage = document.getElementById(\"current-page\").value || \"\";\r\n\r\n\tif (currentPage === \"categories.index\" || currentPage === \"pages.home\") {\r\n\t\tconst randomColor = document.getElementById(\"random-color\").value;\r\n\r\n\t\tconst btnAddCategory = document.getElementById(\"btn-add-category\");\r\n\t\tconst btnCloseCategory = document.getElementById(\"btn-close-category\");\r\n\t\tconst btnSubmitCategory = document.getElementById(\"btn-submit-category\");\r\n\t\tconst containerAddCategory = document.getElementById(\r\n\t\t\t\"container-add-category\"\r\n\t\t);\r\n\r\n\t\tbtnAddCategory.classList.add(\r\n\t\t\t`bg-${randomColor}-600`,\r\n\t\t\t`hover:bg-${randomColor}-700`\r\n\t\t);\r\n\t\tbtnCloseCategory.classList.add(\r\n\t\t\t`bg-${randomColor}-600`,\r\n\t\t\t`hover:bg-${randomColor}-700`\r\n\t\t);\r\n\t\tbtnSubmitCategory.classList.add(\r\n\t\t\t`bg-${randomColor}-600`,\r\n\t\t\t`hover:bg-${randomColor}-700`\r\n\t\t);\r\n\t\t\r\n\t\tif (document.getElementById('btn-welcome')) {\r\n\t\t\tdocument.getElementById('btn-welcome').classList.add(\r\n\t\t\t\t`bg-${randomColor}-600`,\r\n\t\t\t\t`hover:bg-${randomColor}-700`\r\n\t\t\t);\r\n\t\t}\r\n\r\n\t\tbtnAddCategory.addEventListener(\"click\", () => {\r\n\t\t\tbtnAddCategory.classList.add(\"hidden\");\r\n\t\t\tbtnCloseCategory.classList.remove(\"hidden\");\r\n\t\t\tcontainerAddCategory.classList.remove(\"hidden\");\r\n\t\t\tdocument.getElementById(\"txt-category\").focus();\r\n\t\t});\r\n\t\t\r\n\t\tif (document.getElementById('home-title')) document.getElementById(\"home-title\").classList.add(`text-${randomColor}-700`) \r\n\r\n\t\tbtnCloseCategory.addEventListener(\"click\", () => {\r\n\t\t\tbtnCloseCategory.classList.add(\"hidden\");\r\n\t\t\tbtnAddCategory.classList.remove(\"hidden\");\r\n\t\t\tcontainerAddCategory.classList.add(\"hidden\");\r\n\t\t});\r\n\r\n\t}\r\n});\r\n\r\n// ADD TASK -------------------------------------------------\r\ndocument.addEventListener(\"DOMContentLoaded\", () => {\r\n\tconst currentPage = document.getElementById(\"current-page\").value || \"\";\r\n\r\n\tif (currentPage === \"categories.show\") {\r\n\t\tconst btnOptions = document.getElementById(\"optionsButton\");\r\n\t\tconst containerOptions = document.getElementById(\"optionsContainer\");\r\n\r\n\t\t(0,_helpers_js__WEBPACK_IMPORTED_MODULE_0__.toggleShowComponent)(btnOptions, containerOptions);\r\n\t\tconst btnAddCategory = document.getElementById(\"btn-add-category\");\r\n\t\tconst btnCloseCategory = document.getElementById(\"btn-close-category\");\r\n\t\tconst containerAddCategory = document.getElementById(\r\n\t\t\t\"container-add-category\"\r\n\t\t);\r\n\r\n\t\tbtnAddCategory.addEventListener(\"click\", () => {\r\n\t\t\tbtnAddCategory.classList.add(\"hidden\");\r\n\t\t\tbtnCloseCategory.classList.remove(\"hidden\");\r\n\t\t\tcontainerAddCategory.classList.remove(\"hidden\");\r\n\t\t\tdocument.getElementById(\"txt-category\").focus();\r\n\t\t});\r\n\r\n\t\tbtnCloseCategory.addEventListener(\"click\", () => {\r\n\t\t\tbtnCloseCategory.classList.add(\"hidden\");\r\n\t\t\tbtnAddCategory.classList.remove(\"hidden\");\r\n\t\t\tcontainerAddCategory.classList.add(\"hidden\");\r\n\t\t});\r\n\t}\r\n});\r\n\n\n//# sourceURL=webpack://taskapps/./src/public/js/UI/UI.js?");

/***/ }),

/***/ "./src/public/js/app.js":
/*!******************************!*\
  !*** ./src/public/js/app.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _css_app_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../css/app.css */ \"./src/public/css/app.css\");\n/* harmony import */ var _UI_UI__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UI/UI */ \"./src/public/js/UI/UI.js\");\n/* harmony import */ var _UI_Task__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./UI/Task */ \"./src/public/js/UI/Task.js\");\n/* harmony import */ var _UI_Category__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./UI/Category */ \"./src/public/js/UI/Category.js\");\n/* harmony import */ var _UI_General__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./UI/General */ \"./src/public/js/UI/General.js\");\n\r\n\r\n\r\n\r\n\r\n\n\n//# sourceURL=webpack://taskapps/./src/public/js/app.js?");

/***/ }),

/***/ "./src/public/js/helpers.js":
/*!**********************************!*\
  !*** ./src/public/js/helpers.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"toggleShowComponent\": () => /* binding */ toggleShowComponent\n/* harmony export */ });\nfunction toggleShowComponent(btnAction, container) {\r\n\tdocument.addEventListener(\"mouseup\", (e) => {\r\n\t\tif (btnAction) {\r\n\t\t\tif (btnAction.contains(e.target)) container.classList.toggle(\"hidden\");\r\n\t\t\telse if (\r\n\t\t\t\t!container.contains(e.target) &&\r\n\t\t\t\t!container.classList.contains(\"hidden\")\r\n\t\t\t)\r\n\t\t\t\tcontainer.classList.add(\"hidden\");\r\n\t\t} else {\r\n\t\t\tif (!container.contains(e.target) && !container.classList.contains(\"hidden\"))\r\n\t\t\t\tcontainer.classList.add(\"hidden\");\r\n\t\t}\r\n\t});\r\n}\r\n\n\n//# sourceURL=webpack://taskapps/./src/public/js/helpers.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => module['default'] :
/******/ 				() => module;
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
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
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/public/js/app.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;