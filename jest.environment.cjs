const { TestEnvironment } = require('jest-environment-jsdom');

const NODE_GLOBALS = [
  'TextEncoder',
  'TextDecoder',
  'ReadableStream',
  'TransformStream',
  'WritableStream',
  'Blob',
  'FormData',
  'Headers',
  'Request',
  'Response',
  'fetch',
  'AbortController',
  'AbortSignal',
  'structuredClone',
];

class JsdomWithFetchEnvironment extends TestEnvironment {
  constructor(...args) {
    super(...args);
    for (const name of NODE_GLOBALS) {
      this.global[name] = globalThis[name];
    }
  }
}

module.exports = JsdomWithFetchEnvironment;
