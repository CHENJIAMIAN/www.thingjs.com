__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _uino_rsa_wasm_lib_pkg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../uino-rsa-wasm-lib/pkg */ "../uino-rsa-wasm-lib/pkg/rsa_wasm_lib.js");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_uino_rsa_wasm_lib_pkg__WEBPACK_IMPORTED_MODULE_0__]);
_uino_rsa_wasm_lib_pkg__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];


window.wasm = _uino_rsa_wasm_lib_pkg__WEBPACK_IMPORTED_MODULE_0__;

const event = new Event('sso_encrypt_ready');
document.dispatchEvent(event);
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

//# sourceURL=webpack://rust-wasm-www-sample/./app.js?