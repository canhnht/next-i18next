"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _url = require("url");

var _index = require("./index");

var _default = (req, res, lng) => {
  const {
    pathname,
    search
  } = (0, _url.parse)(req.url);
  (0, _index.redirectWithoutCache)(res, pathname.replace(`/${lng}`, `/${lng}/`) + (search || ''));
};

exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;