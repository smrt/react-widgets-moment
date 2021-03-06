'use strict';

exports.__esModule = true;
exports.default = momentLocalizer;

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _configure = require('react-widgets/lib/configure');

var _configure2 = _interopRequireDefault(_configure);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (typeof _moment2.default !== 'function') throw new TypeError('You must provide a valid moment object');

var localField = typeof (0, _moment2.default)().locale === 'function' ? 'locale' : 'lang',
    hasLocaleData = !!_moment2.default.localeData;

if (!hasLocaleData) throw new TypeError('The Moment localizer depends on the `localeData` api, please provide a moment object v2.2.0 or higher');

function getMoment(culture, value, format) {
  return culture ? (0, _moment2.default)(value, format, true)[localField](culture) : (0, _moment2.default)(value, format, true);
}

function endOfDecade(date) {
  return (0, _moment2.default)(date).add(10, 'year').add(-1, 'millisecond').toDate();
}

function endOfCentury(date) {
  return (0, _moment2.default)(date).add(100, 'year').add(-1, 'millisecond').toDate();
}

function momentLocalizer() {
  var localizer = {
    formats: {
      date: 'L',
      time: 'LT',
      default: 'lll',
      header: 'MMMM YYYY',
      footer: 'LL',
      weekday: 'dd',
      dayOfMonth: 'DD',
      month: 'MMM',
      year: 'YYYY',

      decade: function decade(date, culture, localizer) {
        return localizer.format(date, 'YYYY', culture) + ' - ' + localizer.format(endOfDecade(date), 'YYYY', culture);
      },
      century: function century(date, culture, localizer) {
        return localizer.format(date, 'YYYY', culture) + ' - ' + localizer.format(endOfCentury(date), 'YYYY', culture);
      }
    },

    firstOfWeek: function firstOfWeek(culture) {
      return _moment2.default.localeData(culture).firstDayOfWeek();
    },
    parse: function parse(value, format, culture) {
      if (!value) return null;
      var m = getMoment(culture, value, format);
      if (m.isValid()) return m.toDate();
      return null;
    },
    format: function format(value, _format, culture) {
      return getMoment(culture, value).format(_format);
    }
  };

  _configure2.default.setDateLocalizer(localizer);
}
module.exports = exports['default'];
