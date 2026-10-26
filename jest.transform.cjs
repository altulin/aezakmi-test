const { createTransformer } = require('@swc/jest');

const swc = createTransformer({
  jsc: {
    parser: { syntax: 'typescript', tsx: true },
    transform: { react: { runtime: 'automatic' } },
    target: 'es2022',
  },
  module: { type: 'commonjs' },
});

const IMPORT_META_STUB = '({ env: { DEV: false, PROD: false, MODE: "test" } })';

const replaceImportMeta = (source) =>
  source.replace(/\bimport\.meta\b/g, IMPORT_META_STUB);

module.exports = {
  process(source, filename, options) {
    return swc.process(replaceImportMeta(source), filename, options);
  },
  processAsync(source, filename, options) {
    return swc.processAsync(replaceImportMeta(source), filename, options);
  },
  getCacheKey(source, filename, options) {
    return swc.getCacheKey(replaceImportMeta(source), filename, options);
  },
};
