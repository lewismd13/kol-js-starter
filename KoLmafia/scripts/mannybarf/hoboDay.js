/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "kolmafia":
/*!***************************!*\
  !*** external "kolmafia" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("kolmafia");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!************************!*\
  !*** ./src/hoboDay.ts ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! kolmafia */ "kolmafia");
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(kolmafia__WEBPACK_IMPORTED_MODULE_0__);
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9, _templateObject10, _templateObject11, _templateObject12, _templateObject13, _templateObject14, _templateObject15, _templateObject16, _templateObject17, _templateObject18, _templateObject19, _templateObject20, _templateObject21, _templateObject22, _templateObject23;

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _readOnlyError(name) { throw new TypeError("\"" + name + "\" is read-only"); }




function hoboPrep() {
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)("I hope you prepped");
}

function scobos() {
  var parts = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.toInt)((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.userPrompt)("How many of each part do you want to me?"));
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)("Ok, we're making " + parts + " parts.");
}

hoboPrep();
scobos();

function scoboParts(partElement) {
  var page = visitUrl("clan_hobopolis.php?place=3&action=talkrichard&whichtalk=3");
  var skinsNum = 0;
  var bootsNum = 0;
  var eyesNum = 0;
  var gutsNum = 0;
  var skullsNum = 0;
  var crotchesNum = 0;
  var result = 0;

  switch (partElement) {
    case "physical":
      var matchSkins = createMatcher("Richard has <b>(\\d+\\,?\\d+)</b> hobo skin", page);

      if (find(matchSkins)) {
        (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.toInt)(group(matchSkins, 1)), _readOnlyError("skinsNum");
      }

      skinsNum, _readOnlyError("result");
      break;

    case "hot":
      var matchBoots = createMatcher("Richard has <b>(\\d+\\,?\\d+)</b> pairs? of charred hobo", page);

      if (find(matchBoots)) {
        (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.toInt)(group(matchBoots, 1)), _readOnlyError("bootsNum");
      }

      bootsNum, _readOnlyError("result");
      break;

    case "cold":
      var matchEyes = createMatcher("Richard has <b>(\\d+\\,?\\d+)</b> pairs? of frozen hobo", page);

      if (find(matchEyes)) {
        (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.toInt)(group(matchEyes, 1)), _readOnlyError("eyesNum");
      }

      eyesNum, _readOnlyError("result");
      break;

    case "stinky":
      var matchGuts = createMatcher("Richard has <b>(\\d+\\,?\\d+)</b> pile", page);

      if (find(matchGuts)) {
        (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.toInt)(group(matchGuts, 1)), _readOnlyError("gutsNum");
      }

      gutsNum, _readOnlyError("result");
      break;

    case "spooky":
      var matchSkulls = createMatcher("Richard has <b>(\\d+\\,?\\d+)</b> creepy hobo skull", page);

      if (find(matchSkulls)) {
        (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.toInt)(group(matchSkulls, 1)), _readOnlyError("skullsNum");
      }

      skullsNum, _readOnlyError("result");
      break;

    case "sleazy":
      var matchCrotches = createMatcher("Richard has <b>(\\d+\\,?\\d+)</b> hobo crotch", page);

      if (find(matchCrotches)) {
        (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.toInt)(group(matchCrotches, 1)), _readOnlyError("crotchesNum");
      }

      crotchesNum, _readOnlyError("result");
      break;
  }

  return result;
}

function main(scobos, skins) {
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)(scobos + " scobos coming right up!", "green");

  if (myFamiliar() !== $familiar(_templateObject || (_templateObject = _taggedTemplateLiteral(["stooper"])))) {
    useFamiliar($familiar(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["red-nosed snapper"]))));

    if (getProperty("redSnapperPhylum") !== "hobo") {
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)("your snapper is sniffing the wrong thing", "red");
      abort();
    }
  }

  useSkill(scobos / 2 + 1, $skill(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["carol of the hells"]))));
  setAutoAttack("gnat extract mortar weak");
  equip($slot(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["weapon"]))), $item(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["staff of simmering hatred"]))));
  useSkill(1, $skill(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["spirit of cayenne"]))));
  chatClan("Making up to " + scobos + " boots.", "hobopolis");

  while (scoboParts("hot") < scobos) {
    adventure(1, $location(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["hobopolis town square"]))));
  } // adventure(scobos, $location[hobopolis town square]);


  useSkill(1, $skill(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral(["spirit of peppermint"]))));
  chatClan("Making up to " + scobos + " eyes.", "hobopolis");

  while (scoboParts("cold") < scobos) {
    adventure(1, $location(_templateObject9 || (_templateObject9 = _taggedTemplateLiteral(["hobopolis town square"]))));
  } // adventure(scobos, $location[hobopolis town square]);


  useSkill(1, $skill(_templateObject10 || (_templateObject10 = _taggedTemplateLiteral(["spirit of garlic"]))));
  chatClan("Making up to " + scobos + " guts.", "hobopolis");

  while (scoboParts("stinky") < scobos) {
    adventure(1, $location(_templateObject11 || (_templateObject11 = _taggedTemplateLiteral(["hobopolis town square"]))));
  } // adventure(scobos, $location[hobopolis town square]);


  useSkill(1, $skill(_templateObject12 || (_templateObject12 = _taggedTemplateLiteral(["spirit of wormwood"]))));
  chatClan("Making up to " + scobos + " skulls.", "hobopolis");

  while (scoboParts("spooky") < scobos) {
    adventure(1, $location(_templateObject13 || (_templateObject13 = _taggedTemplateLiteral(["hobopolis town square"]))));
  } // adventure(scobos, $location[hobopolis town square]);


  useSkill(1, $skill(_templateObject14 || (_templateObject14 = _taggedTemplateLiteral(["spirit of bacon grease"]))));
  chatClan("Making up to " + scobos + " crotches.", "hobopolis");

  while (scoboParts("sleazy") < scobos) {
    adventure(1, $location(_templateObject15 || (_templateObject15 = _taggedTemplateLiteral(["hobopolis town square"]))));
  } // adventure(scobos, $location[hobopolis town square]);


  setAutoAttack(0);
  useSkill(1, $skill(_templateObject16 || (_templateObject16 = _taggedTemplateLiteral(["spirit of nothing"]))));

  if (skins === true) {
    setAutoAttack("hoboskins");
    useSkill(scobos / 10 + 1, $skill(_templateObject17 || (_templateObject17 = _taggedTemplateLiteral(["carol of the bulls"]))));
    useSkill(scobos / 10 + 1, $skill(_templateObject18 || (_templateObject18 = _taggedTemplateLiteral(["song of the north"]))));
    equip($slot(_templateObject19 || (_templateObject19 = _taggedTemplateLiteral(["weapon"]))), $item(_templateObject20 || (_templateObject20 = _taggedTemplateLiteral(["fourth of may cosplay saber"]))));
    equip($slot(_templateObject21 || (_templateObject21 = _taggedTemplateLiteral(["acc2"]))), $item(_templateObject22 || (_templateObject22 = _taggedTemplateLiteral(["wormwood wedding ring"]))));
    chatClan("Making up to " + scobos + " skins.", "hobopolis");

    while (scoboParts("physical") < scobos) {
      adventure(1, $location(_templateObject23 || (_templateObject23 = _taggedTemplateLiteral(["hobopolis town square"]))));
    } // adventure(scobos, $location[hobopolis town square]);


    setAutoAttack(0);
  }
}
})();

var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;