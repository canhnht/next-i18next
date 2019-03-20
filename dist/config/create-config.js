"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defaultConfig = _interopRequireDefault(require("./default-config"));

var _detectNode = _interopRequireDefault(require("detect-node"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = userConfig => {
  let combinedConfig = _objectSpread({}, _defaultConfig.default, userConfig);

  if (!userConfig.fallbackLng) {
    combinedConfig.fallbackLng = process.env.NODE_ENV === 'production' ? combinedConfig.defaultLanguage : null;
  }

  combinedConfig.allLanguages = combinedConfig.otherLanguages.concat([combinedConfig.defaultLanguage]);
  combinedConfig.ns = [combinedConfig.defaultNS];

  if (_detectNode.default && !process.browser) {
    const fs = eval("require('fs')");

    const path = require('path');

    const getAllNamespaces = p => fs.readdirSync(p).map(file => file.replace('.json', ''));

    const {
      allLanguages,
      defaultLanguage,
      localePath,
      localeStructure
    } = combinedConfig;
    combinedConfig = _objectSpread({}, combinedConfig, {
      preload: allLanguages,
      ns: getAllNamespaces(path.join(process.cwd(), `${localePath}/${defaultLanguage}`)),
      backend: {
        loadPath: path.join(process.cwd(), `${localePath}/${localeStructure}.json`),
        addPath: path.join(process.cwd(), `${localePath}/${localeStructure}.missing.json`)
      }
    });
  }

  return combinedConfig;
};

exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;