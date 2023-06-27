__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "__wbg_buffer_5e74a88a1424a2e0": () => (/* binding */ __wbg_buffer_5e74a88a1424a2e0),
/* harmony export */   "__wbg_call_89558c3e96703ca1": () => (/* binding */ __wbg_call_89558c3e96703ca1),
/* harmony export */   "__wbg_crypto_2bc4d5b05161de5b": () => (/* binding */ __wbg_crypto_2bc4d5b05161de5b),
/* harmony export */   "__wbg_getRandomValues_99bbe8a65f4aef87": () => (/* binding */ __wbg_getRandomValues_99bbe8a65f4aef87),
/* harmony export */   "__wbg_globalThis_d61b1f48a57191ae": () => (/* binding */ __wbg_globalThis_d61b1f48a57191ae),
/* harmony export */   "__wbg_global_e7669da72fd7f239": () => (/* binding */ __wbg_global_e7669da72fd7f239),
/* harmony export */   "__wbg_length_30803400a8f15c59": () => (/* binding */ __wbg_length_30803400a8f15c59),
/* harmony export */   "__wbg_msCrypto_d003eebe62c636a9": () => (/* binding */ __wbg_msCrypto_d003eebe62c636a9),
/* harmony export */   "__wbg_new_e3b800e570795b3c": () => (/* binding */ __wbg_new_e3b800e570795b3c),
/* harmony export */   "__wbg_newnoargs_f579424187aa1717": () => (/* binding */ __wbg_newnoargs_f579424187aa1717),
/* harmony export */   "__wbg_newwithlength_5f4ce114a24dfe1e": () => (/* binding */ __wbg_newwithlength_5f4ce114a24dfe1e),
/* harmony export */   "__wbg_node_18b58a160b60d170": () => (/* binding */ __wbg_node_18b58a160b60d170),
/* harmony export */   "__wbg_process_5729605ce9d34ea8": () => (/* binding */ __wbg_process_5729605ce9d34ea8),
/* harmony export */   "__wbg_randomFillSync_378e02b85af41ab6": () => (/* binding */ __wbg_randomFillSync_378e02b85af41ab6),
/* harmony export */   "__wbg_require_edfaedd93e302925": () => (/* binding */ __wbg_require_edfaedd93e302925),
/* harmony export */   "__wbg_self_e23d74ae45fb17d1": () => (/* binding */ __wbg_self_e23d74ae45fb17d1),
/* harmony export */   "__wbg_set_5b8081e9d002f0df": () => (/* binding */ __wbg_set_5b8081e9d002f0df),
/* harmony export */   "__wbg_static_accessor_NODE_MODULE_bdc5ca9096c68aeb": () => (/* binding */ __wbg_static_accessor_NODE_MODULE_bdc5ca9096c68aeb),
/* harmony export */   "__wbg_subarray_a68f835ca2af506f": () => (/* binding */ __wbg_subarray_a68f835ca2af506f),
/* harmony export */   "__wbg_versions_531e16e1a776ee97": () => (/* binding */ __wbg_versions_531e16e1a776ee97),
/* harmony export */   "__wbg_window_b4be7f48b24ac56e": () => (/* binding */ __wbg_window_b4be7f48b24ac56e),
/* harmony export */   "__wbindgen_is_object": () => (/* binding */ __wbindgen_is_object),
/* harmony export */   "__wbindgen_is_string": () => (/* binding */ __wbindgen_is_string),
/* harmony export */   "__wbindgen_is_undefined": () => (/* binding */ __wbindgen_is_undefined),
/* harmony export */   "__wbindgen_memory": () => (/* binding */ __wbindgen_memory),
/* harmony export */   "__wbindgen_object_clone_ref": () => (/* binding */ __wbindgen_object_clone_ref),
/* harmony export */   "__wbindgen_object_drop_ref": () => (/* binding */ __wbindgen_object_drop_ref),
/* harmony export */   "__wbindgen_throw": () => (/* binding */ __wbindgen_throw),
/* harmony export */   "code_decrypt": () => (/* binding */ code_decrypt),
/* harmony export */   "encrypt": () => (/* binding */ encrypt),
/* harmony export */   "encrypt2": () => (/* binding */ encrypt2),
/* harmony export */   "generate_state": () => (/* binding */ generate_state),
/* harmony export */   "log_encrypt": () => (/* binding */ log_encrypt),
/* harmony export */   "vcode_encrypt": () => (/* binding */ vcode_encrypt)
/* harmony export */ });
/* harmony import */ var _rsa_wasm_lib_bg_wasm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rsa_wasm_lib_bg.wasm */ "../uino-rsa-wasm-lib/pkg/rsa_wasm_lib_bg.wasm");
/* module decorator */ module = __webpack_require__.hmd(module);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_rsa_wasm_lib_bg_wasm__WEBPACK_IMPORTED_MODULE_0__]);
_rsa_wasm_lib_bg_wasm__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];


const heap = new Array(32).fill(undefined);

heap.push(undefined, null, true, false);

function getObject(idx) { return heap[idx]; }

let heap_next = heap.length;

function dropObject(idx) {
    if (idx < 36) return;
    heap[idx] = heap_next;
    heap_next = idx;
}

function takeObject(idx) {
    const ret = getObject(idx);
    dropObject(idx);
    return ret;
}

function addHeapObject(obj) {
    if (heap_next === heap.length) heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];

    heap[idx] = obj;
    return idx;
}

const lTextDecoder = typeof TextDecoder === 'undefined' ? (0, module.require)('util').TextDecoder : TextDecoder;

let cachedTextDecoder = new lTextDecoder('utf-8', { ignoreBOM: true, fatal: true });

cachedTextDecoder.decode();

let cachegetUint8Memory0 = null;
function getUint8Memory0() {
    if (cachegetUint8Memory0 === null || cachegetUint8Memory0.buffer !== _rsa_wasm_lib_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.memory.buffer) {
        cachegetUint8Memory0 = new Uint8Array(_rsa_wasm_lib_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.memory.buffer);
    }
    return cachegetUint8Memory0;
}

function getStringFromWasm0(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}

let WASM_VECTOR_LEN = 0;

const lTextEncoder = typeof TextEncoder === 'undefined' ? (0, module.require)('util').TextEncoder : TextEncoder;

let cachedTextEncoder = new lTextEncoder('utf-8');

const encodeString = (typeof cachedTextEncoder.encodeInto === 'function'
    ? function (arg, view) {
    return cachedTextEncoder.encodeInto(arg, view);
}
    : function (arg, view) {
    const buf = cachedTextEncoder.encode(arg);
    view.set(buf);
    return {
        read: arg.length,
        written: buf.length
    };
});

function passStringToWasm0(arg, malloc, realloc) {

    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length);
        getUint8Memory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len);

    const mem = getUint8Memory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }

    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3);
        const view = getUint8Memory0().subarray(ptr + offset, ptr + len);
        const ret = encodeString(arg, view);

        offset += ret.written;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

let cachegetInt32Memory0 = null;
function getInt32Memory0() {
    if (cachegetInt32Memory0 === null || cachegetInt32Memory0.buffer !== _rsa_wasm_lib_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.memory.buffer) {
        cachegetInt32Memory0 = new Int32Array(_rsa_wasm_lib_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.memory.buffer);
    }
    return cachegetInt32Memory0;
}
/**
* @param {string} state
* @param {string} pub_encrypt_base64
* @param {string} text
* @returns {string}
*/
function encrypt(state, pub_encrypt_base64, text) {
    try {
        const retptr = _rsa_wasm_lib_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_add_to_stack_pointer(-16);
        var ptr0 = passStringToWasm0(state, _rsa_wasm_lib_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_malloc, _rsa_wasm_lib_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        var ptr1 = passStringToWasm0(pub_encrypt_base64, _rsa_wasm_lib_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_malloc, _rsa_wasm_lib_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        var ptr2 = passStringToWasm0(text, _rsa_wasm_lib_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_malloc, _rsa_wasm_lib_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_realloc);
        var len2 = WASM_VECTOR_LEN;
        _rsa_wasm_lib_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.encrypt(retptr, ptr0, len0, ptr1, len1, ptr2, len2);
        var r0 = getInt32Memory0()[retptr / 4 + 0];
        var r1 = getInt32Memory0()[retptr / 4 + 1];
        return getStringFromWasm0(r0, r1);
    } finally {
        _rsa_wasm_lib_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_add_to_stack_pointer(16);
        _rsa_wasm_lib_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_free(r0, r1);
    }
}

/**
* @param {string} state
* @param {string} pub_encrypt_base64
* @param {string} text
* @returns {string}
*/
function encrypt2(state, pub_encrypt_base64, text) {
    try {
        const retptr = _rsa_wasm_lib_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_add_to_stack_pointer(-16);
        var ptr0 = passStringToWasm0(state, _rsa_wasm_lib_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_malloc, _rsa_wasm_lib_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        var ptr1 = passStringToWasm0(pub_encrypt_base64, _rsa_wasm_lib_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_malloc, _rsa_wasm_lib_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        var ptr2 = passStringToWasm0(text, _rsa_wasm_lib_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_malloc, _rsa_wasm_lib_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_realloc);
        var len2 = WASM_VECTOR_LEN;
        _rsa_wasm_lib_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.encrypt2(retptr, ptr0, len0, ptr1, len1, ptr2, len2);
        var r0 = getInt32Memory0()[retptr / 4 + 0];
        var r1 = getInt32Memory0()[retptr / 4 + 1];
        return getStringFromWasm0(r0, r1);
    } finally {
        _rsa_wasm_lib_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_add_to_stack_pointer(16);
        _rsa_wasm_lib_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_free(r0, r1);
    }
}

/**
* @param {string} secret
* @param {string} enc
* @returns {string}
*/
function code_decrypt(secret, enc) {
    try {
        const retptr = _rsa_wasm_lib_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_add_to_stack_pointer(-16);
        var ptr0 = passStringToWasm0(secret, _rsa_wasm_lib_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_malloc, _rsa_wasm_lib_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        var ptr1 = passStringToWasm0(enc, _rsa_wasm_lib_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_malloc, _rsa_wasm_lib_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        _rsa_wasm_lib_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.code_decrypt(retptr, ptr0, len0, ptr1, len1);
        var r0 = getInt32Memory0()[retptr / 4 + 0];
        var r1 = getInt32Memory0()[retptr / 4 + 1];
        return getStringFromWasm0(r0, r1);
    } finally {
        _rsa_wasm_lib_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_add_to_stack_pointer(16);
        _rsa_wasm_lib_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_free(r0, r1);
    }
}

/**
* @param {string} key
* @param {string} iv
* @param {string} plaintext
* @returns {string}
*/
function vcode_encrypt(key, iv, plaintext) {
    try {
        const retptr = _rsa_wasm_lib_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_add_to_stack_pointer(-16);
        var ptr0 = passStringToWasm0(key, _rsa_wasm_lib_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_malloc, _rsa_wasm_lib_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        var ptr1 = passStringToWasm0(iv, _rsa_wasm_lib_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_malloc, _rsa_wasm_lib_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        var ptr2 = passStringToWasm0(plaintext, _rsa_wasm_lib_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_malloc, _rsa_wasm_lib_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_realloc);
        var len2 = WASM_VECTOR_LEN;
        _rsa_wasm_lib_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.vcode_encrypt(retptr, ptr0, len0, ptr1, len1, ptr2, len2);
        var r0 = getInt32Memory0()[retptr / 4 + 0];
        var r1 = getInt32Memory0()[retptr / 4 + 1];
        return getStringFromWasm0(r0, r1);
    } finally {
        _rsa_wasm_lib_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_add_to_stack_pointer(16);
        _rsa_wasm_lib_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_free(r0, r1);
    }
}

/**
* @param {string} state
* @param {string} plaintext
* @returns {string}
*/
function log_encrypt(state, plaintext) {
    try {
        const retptr = _rsa_wasm_lib_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_add_to_stack_pointer(-16);
        var ptr0 = passStringToWasm0(state, _rsa_wasm_lib_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_malloc, _rsa_wasm_lib_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        var ptr1 = passStringToWasm0(plaintext, _rsa_wasm_lib_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_malloc, _rsa_wasm_lib_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        _rsa_wasm_lib_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.log_encrypt(retptr, ptr0, len0, ptr1, len1);
        var r0 = getInt32Memory0()[retptr / 4 + 0];
        var r1 = getInt32Memory0()[retptr / 4 + 1];
        return getStringFromWasm0(r0, r1);
    } finally {
        _rsa_wasm_lib_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_add_to_stack_pointer(16);
        _rsa_wasm_lib_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_free(r0, r1);
    }
}

/**
* @returns {string}
*/
function generate_state() {
    try {
        const retptr = _rsa_wasm_lib_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_add_to_stack_pointer(-16);
        _rsa_wasm_lib_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.generate_state(retptr);
        var r0 = getInt32Memory0()[retptr / 4 + 0];
        var r1 = getInt32Memory0()[retptr / 4 + 1];
        return getStringFromWasm0(r0, r1);
    } finally {
        _rsa_wasm_lib_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_add_to_stack_pointer(16);
        _rsa_wasm_lib_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_free(r0, r1);
    }
}

function handleError(f, args) {
    try {
        return f.apply(this, args);
    } catch (e) {
        _rsa_wasm_lib_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_exn_store(addHeapObject(e));
    }
}

function getArrayU8FromWasm0(ptr, len) {
    return getUint8Memory0().subarray(ptr / 1, ptr / 1 + len);
}

function __wbg_randomFillSync_378e02b85af41ab6() { return handleError(function (arg0, arg1, arg2) {
    getObject(arg0).randomFillSync(getArrayU8FromWasm0(arg1, arg2));
}, arguments) };

function __wbindgen_object_drop_ref(arg0) {
    takeObject(arg0);
};

function __wbg_getRandomValues_99bbe8a65f4aef87() { return handleError(function (arg0, arg1) {
    getObject(arg0).getRandomValues(getObject(arg1));
}, arguments) };

function __wbg_process_5729605ce9d34ea8(arg0) {
    var ret = getObject(arg0).process;
    return addHeapObject(ret);
};

function __wbindgen_is_object(arg0) {
    const val = getObject(arg0);
    var ret = typeof(val) === 'object' && val !== null;
    return ret;
};

function __wbg_versions_531e16e1a776ee97(arg0) {
    var ret = getObject(arg0).versions;
    return addHeapObject(ret);
};

function __wbg_node_18b58a160b60d170(arg0) {
    var ret = getObject(arg0).node;
    return addHeapObject(ret);
};

function __wbindgen_is_string(arg0) {
    var ret = typeof(getObject(arg0)) === 'string';
    return ret;
};

function __wbg_crypto_2bc4d5b05161de5b(arg0) {
    var ret = getObject(arg0).crypto;
    return addHeapObject(ret);
};

function __wbg_msCrypto_d003eebe62c636a9(arg0) {
    var ret = getObject(arg0).msCrypto;
    return addHeapObject(ret);
};

function __wbg_static_accessor_NODE_MODULE_bdc5ca9096c68aeb() {
    var ret = module;
    return addHeapObject(ret);
};

function __wbg_require_edfaedd93e302925() { return handleError(function (arg0, arg1, arg2) {
    var ret = getObject(arg0).require(getStringFromWasm0(arg1, arg2));
    return addHeapObject(ret);
}, arguments) };

function __wbg_newnoargs_f579424187aa1717(arg0, arg1) {
    var ret = new Function(getStringFromWasm0(arg0, arg1));
    return addHeapObject(ret);
};

function __wbg_call_89558c3e96703ca1() { return handleError(function (arg0, arg1) {
    var ret = getObject(arg0).call(getObject(arg1));
    return addHeapObject(ret);
}, arguments) };

function __wbindgen_object_clone_ref(arg0) {
    var ret = getObject(arg0);
    return addHeapObject(ret);
};

function __wbg_self_e23d74ae45fb17d1() { return handleError(function () {
    var ret = self.self;
    return addHeapObject(ret);
}, arguments) };

function __wbg_window_b4be7f48b24ac56e() { return handleError(function () {
    var ret = window.window;
    return addHeapObject(ret);
}, arguments) };

function __wbg_globalThis_d61b1f48a57191ae() { return handleError(function () {
    var ret = globalThis.globalThis;
    return addHeapObject(ret);
}, arguments) };

function __wbg_global_e7669da72fd7f239() { return handleError(function () {
    var ret = __webpack_require__.g.global;
    return addHeapObject(ret);
}, arguments) };

function __wbindgen_is_undefined(arg0) {
    var ret = getObject(arg0) === undefined;
    return ret;
};

function __wbg_buffer_5e74a88a1424a2e0(arg0) {
    var ret = getObject(arg0).buffer;
    return addHeapObject(ret);
};

function __wbg_new_e3b800e570795b3c(arg0) {
    var ret = new Uint8Array(getObject(arg0));
    return addHeapObject(ret);
};

function __wbg_set_5b8081e9d002f0df(arg0, arg1, arg2) {
    getObject(arg0).set(getObject(arg1), arg2 >>> 0);
};

function __wbg_length_30803400a8f15c59(arg0) {
    var ret = getObject(arg0).length;
    return ret;
};

function __wbg_newwithlength_5f4ce114a24dfe1e(arg0) {
    var ret = new Uint8Array(arg0 >>> 0);
    return addHeapObject(ret);
};

function __wbg_subarray_a68f835ca2af506f(arg0, arg1, arg2) {
    var ret = getObject(arg0).subarray(arg1 >>> 0, arg2 >>> 0);
    return addHeapObject(ret);
};

function __wbindgen_throw(arg0, arg1) {
    throw new Error(getStringFromWasm0(arg0, arg1));
};

function __wbindgen_memory() {
    var ret = _rsa_wasm_lib_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.memory;
    return addHeapObject(ret);
};


__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

//# sourceURL=webpack://rust-wasm-www-sample/../uino-rsa-wasm-lib/pkg/rsa_wasm_lib_bg.js?