"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _i18nextExpressMiddleware = _interopRequireDefault(require("i18next-express-middleware"));

var _utils = require("../utils");

var _url = require("url");

var _pathMatch = _interopRequireDefault(require("path-match"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const route = (0, _pathMatch.default)();

function _default(nexti18next) {
  const {
    config,
    i18n
  } = nexti18next;
  const {
    allLanguages,
    ignoreRoutes,
    localeSubpaths
  } = config;
  const ignoreRegex = new RegExp(`^\/(?!${ignoreRoutes.map(x => x.replace('/', '')).join('|')}).*$`);
  const ignoreRoute = route(ignoreRegex);

  const isI18nRoute = url => ignoreRoute(url);

  const localeSubpathRoute = route(`/:lng(${allLanguages.join('|')})/*`);
  const middleware = []; // If not using server side language detection,
  // we need to manually set the language for
  // each request

  if (!config.serverLanguageDetection) {
    middleware.push((req, res, next) => {
      if (isI18nRoute(req.url)) {
        req.lng = config.defaultLanguage;
      }

      next();
    });
  }

  middleware.push(_i18nextExpressMiddleware.default.handle(i18n, {
    ignoreRoutes
  }));

  if (localeSubpaths) {
    middleware.push((req, res, next) => {
      if (isI18nRoute(req.url)) {
        const {
          pathname
        } = (0, _url.parse)(req.url);

        if (allLanguages.some(lng => pathname === `/${lng}`)) {
          return (0, _utils.forceTrailingSlash)(req, res, pathname.slice(1));
        }

        (0, _utils.lngPathDetector)(req, res);
        const params = localeSubpathRoute(req.url);

        if (params !== false) {
          const {
            lng
          } = params;
          req.query = _objectSpread({}, req.query, {
            lng
          });
          req.url = req.url.replace(`/${lng}`, '');
        }
      }

      return next();
    });
  }

  return middleware;
}

module.exports = exports.default;
module.exports.default = exports.default;