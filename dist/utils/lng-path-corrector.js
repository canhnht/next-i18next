"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (config, i18n, currentRoute, currentLanguage = i18n.languages[0]) => {
  const {
    defaultLanguage,
    allLanguages
  } = config;
  const {
    asPath,
    query
  } = currentRoute;

  if (!allLanguages.includes(currentLanguage)) {
    throw new Error('Invalid configuration: Current language is not included in all languages array');
  }

  let as = asPath;

  for (const lng of allLanguages) {
    if (asPath.startsWith(`/${lng}/`)) {
      as = as.replace(`/${lng}/`, '/');
      break;
    }
  }

  if (currentLanguage !== defaultLanguage) {
    return [`/${currentLanguage}${as}`, _objectSpread({}, query, {
      lng: currentLanguage
    })];
  }

  return [as, query];
};

exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;