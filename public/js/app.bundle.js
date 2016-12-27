/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmory imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmory exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		Object.defineProperty(exports, name, {
/******/ 			configurable: false,
/******/ 			enumerable: true,
/******/ 			get: getter
/******/ 		});
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

"use strict";
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Base class for complex effects
var Effect = exports.Effect = function () {
  function Effect() {
    _classCallCheck(this, Effect);

    this._elements = [];
  }

  _createClass(Effect, [{
    key: "registerElement",
    value: function registerElement() {
      for (var _len = arguments.length, elements = Array(_len), _key = 0; _key < _len; _key++) {
        elements[_key] = arguments[_key];
      }

      this._elements = this._elements.concat(elements);
    }
  }, {
    key: "moveTo",
    value: function moveTo(coords) {
      this.elements.forEach(function (el) {
        el.tune(coords);
      });
    }
  }, {
    key: "elements",
    get: function get() {
      return this._elements;
    }
  }]);

  return Effect;
}();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _effects = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } // import Effect from './effects';


// console.log('Effect', Effect);

// Mo.js utility
var Timeline = {
  set: function set() {
    for (var _len = arguments.length, items = Array(_len), _key = 0; _key < _len; _key++) {
      items[_key] = arguments[_key];
    }

    if (items.length === 1) {
      items = [items];
    }
    var timeline = new mojs.Timeline();
    timeline.add.apply(timeline, _toConsumableArray(items));
    return timeline;
  }
};

function blastWaveShape(_ref) {
  var _ref$speed = _ref.speed,
      speed = _ref$speed === undefined ? 2000 : _ref$speed,
      _ref$size = _ref.size,
      size = _ref$size === undefined ? 120 : _ref$size,
      _ref$sizeStart = _ref.sizeStart,
      sizeStart = _ref$sizeStart === undefined ? size / 4 : _ref$sizeStart,
      _ref$color = _ref.color,
      color = _ref$color === undefined ? 'white' : _ref$color,
      _ref$colorTo = _ref.colorTo,
      colorTo = _ref$colorTo === undefined ? 'black' : _ref$colorTo,
      _ref$x = _ref.x,
      x = _ref$x === undefined ? 0 : _ref$x,
      _ref$y = _ref.y,
      y = _ref$y === undefined ? 0 : _ref$y;

  return new mojs.Shape({
    left: x, top: y,
    count: 10,
    // stroke: { '#e2441d' : '#f99931' },
    stroke: color, //'#e2441d', // color
    // stroke: { '#e2441d' : 'rgba(249, 153, 49, 0.5)' },
    // strokeWidth: { 50 : 0 },
    strokeWidth: 50,
    fill: colorTo,
    scale: { 0: 1.5, easing: 'elastic.out' },
    radius: _defineProperty({}, sizeStart, size),
    duration: speed,
    opacity: { 1: 0 }
  });
}

var DoubleCircle = function (_Effect) {
  _inherits(DoubleCircle, _Effect);

  function DoubleCircle() {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, DoubleCircle);

    var _this = _possibleConstructorReturn(this, (DoubleCircle.__proto__ || Object.getPrototypeOf(DoubleCircle)).call(this));

    opts = Object.assign({
      color: 'rgba(249, 153, 49, 0.5)'
    }, opts);

    _this.mainCircle = blastWaveShape(opts);

    _this.registerElement(_this.mainCircle);
    return _this;
  }

  return DoubleCircle;
}(_effects.Effect);

// Made of circles


var Starburst = function () {
  function Starburst() {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Starburst);

    this.__id = parseInt(new Date());
    this.initSet(opts);
  }

  _createClass(Starburst, [{
    key: 'initSet',
    value: function initSet(opts) {
      this.circle = new DoubleCircle(opts);

      this.timeline = Timeline.set(this.circle.elements);
    }
  }, {
    key: 'moveTo',
    value: function moveTo(coords) {
      this.circle.moveTo(coords);
    }
  }, {
    key: 'play',
    value: function play() {
      this.timeline.replay();
    }
  }, {
    key: 'moveToCoords',
    value: function moveToCoords(coords) {
      this.moveTo(coords);

      this.timeline.replay();
    }
  }]);

  return Starburst;
}();

function getRandomCoords() {
  var padding = 60;
  var yMax = window.innerHeight;
  var xMax = window.innerWidth;

  return {
    x: _.random(padding, xMax),
    y: _.random(padding, yMax)
  };
}

function orangeBlast() {
  burst(Object.assign({
    size: _.random(100, 150)
  }, getRandomCoords()));
}

function blueBlast() {
  var opts = Object.assign({
    size: _.random(50, 200),
    color: 'rgba(49, 153, 249, 0.5)'
  }, getRandomCoords());
  burst(opts);
}

function burst(opts) {
  new Starburst(opts).play();
}

function greenBlast() {
  var size = _.random(50, 200);
  burst(Object.assign({
    size: size,
    sizeStart: _.max(size / 6, 30),
    color: 'rgba(49, 233, 149, 0.5)'
  }, getRandomCoords()));
}

// ========
// Controls
// --------
/*
Keys:
 [z] - draw orange burst
 [x] - draw blue burst
 [c] - draw green burst
*/

document.addEventListener('click', function (e) {
  var newStarburst = new Starburst();
  newStarburst.moveToCoords({ x: e.pageX, y: e.pageY });
}, false);

window.addEventListener('keydown', function (event) {
  if (event.key === 'z') {
    orangeBlast();
  } else if (event.key === 'x') {
    blueBlast();
  } else if (event.key === 'c') {
    greenBlast();
  }
  switch (event.key) {
    case 'z':
      orangeBlast();
      break;
    case 'x':
      blueBlast();
      break;
    case 'c':
      greenBlast();
      break;
  }
});

/***/ }
/******/ ]);