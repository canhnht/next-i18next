"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _link = _interopRequireDefault(require("next/link"));

var _reactI18next = require("react-i18next");

var _url = require("url");

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

const localeSubpathRequired = (nextI18NextConfig, lng) => {
  const {
    defaultLanguage,
    localeSubpaths
  } = nextI18NextConfig.config;
  return localeSubpaths && lng && lng !== defaultLanguage;
};

const parseHref = href => typeof href === 'string' ? (0, _url.parse)(href, true
/* parseQueryString */
) : href;

const removeWithNamespacesProps = props => {
  const strippedProps = Object.assign({}, props);
  delete strippedProps.defaultNS;
  delete strippedProps.i18n;
  delete strippedProps.i18nOptions;
  delete strippedProps.lng;
  delete strippedProps.reportNS;
  delete strippedProps.t;
  delete strippedProps.tReady;
  return strippedProps;
};

class Link extends _react.default.Component {
  render() {
    const _this$props = this.props,
          {
      as,
      children,
      href: hrefProp,
      lng,
      nextI18NextConfig
    } = _this$props,
          props = _objectWithoutProperties(_this$props, ["as", "children", "href", "lng", "nextI18NextConfig"]);

    if (localeSubpathRequired(nextI18NextConfig, lng)) {
      const {
        config
      } = nextI18NextConfig;
      const href = parseHref(hrefProp);
      const {
        pathname,
        query
      } = href;
      const asPath = as || (0, _url.format)(href, {
        unicode: true
      });
      const [correctedAs, correctedQuery] = (0, _utils.lngPathCorrector)(config, [], {
        asPath,
        query
      }, lng);
      return _react.default.createElement(_link.default, _extends({
        href: {
          pathname,
          query: correctedQuery
        },
        as: correctedAs
      }, removeWithNamespacesProps(props)), children);
    }

    return _react.default.createElement(_link.default, _extends({
      href: hrefProp,
      as: as
    }, removeWithNamespacesProps(props)), children);
  }

}

Link.propTypes = {
  as: _propTypes.default.string,
  children: _propTypes.default.node.isRequired,
  href: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.object]).isRequired,
  nextI18NextConfig: _propTypes.default.shape({
    config: _propTypes.default.shape({
      defaultLanguage: _propTypes.default.string.isRequired,
      localeSubpaths: _propTypes.default.bool.isRequired
    }).isRequired
  }).isRequired
};
Link.defaultProps = {
  as: undefined
  /*
    Usage of `withNamespaces` here is just to
    force `Link` to rerender on language change
  */

};

var _default = (0, _reactI18next.withNamespaces)()(Link);

exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;