(function(e, a) { for(var i in a) e[i] = a[i]; if(a.__esModule) Object.defineProperty(e, "__esModule", { value: true }); }(exports,
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/libram/dist/combat.js":
/*!********************************************!*\
  !*** ./node_modules/libram/dist/combat.js ***!
  \********************************************/
/*! namespace exports */
/*! export Macro [provided] [no usage info] [missing usage info prevents renaming] */
/*! export adventureMacro [provided] [no usage info] [missing usage info prevents renaming] */
/*! export adventureMacroAuto [provided] [no usage info] [missing usage info prevents renaming] */
/*! export banishedMonsters [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getMacroId [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getMacroId": () => /* binding */ getMacroId,
/* harmony export */   "Macro": () => /* binding */ Macro,
/* harmony export */   "banishedMonsters": () => /* binding */ banishedMonsters,
/* harmony export */   "adventureMacro": () => /* binding */ adventureMacro,
/* harmony export */   "adventureMacroAuto": () => /* binding */ adventureMacroAuto
/* harmony export */ });
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! kolmafia */ "kolmafia");
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(kolmafia__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _property__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./property */ "./node_modules/libram/dist/property.js");
/* harmony import */ var _template_string__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./template-string */ "./node_modules/libram/dist/template-string.js");
var __makeTemplateObject = undefined && undefined.__makeTemplateObject || function (cooked, raw) {
  if (Object.defineProperty) {
    Object.defineProperty(cooked, "raw", {
      value: raw
    });
  } else {
    cooked.raw = raw;
  }

  return cooked;
};

var __spreadArrays = undefined && undefined.__spreadArrays || function () {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) {
    s += arguments[i].length;
  }

  for (var r = Array(s), k = 0, i = 0; i < il; i++) {
    for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) {
      r[k] = a[j];
    }
  }

  return r;
};




var MACRO_NAME = "Script Autoattack Macro";
/**
 * Get the KoL native ID of the macro with name Script Autoattack Macro.
 * @returns {number} The macro ID.
 */

function getMacroId() {
  var macroMatches = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.xpath)((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.visitUrl)("account_combatmacros.php"), "//select[@name=\"macroid\"]/option[text()=\"" + MACRO_NAME + "\"]/@value");

  if (macroMatches.length === 0) {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.visitUrl)("account_combatmacros.php?action=new");
    var newMacroText = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.visitUrl)("account_combatmacros.php?macroid=0&name=" + MACRO_NAME + "&macrotext=abort&action=save");
    return parseInt((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.xpath)(newMacroText, "//input[@name=macroid]/@value")[0], 10);
  } else {
    return parseInt(macroMatches[0], 10);
  }
}

function itemOrNameToItem(itemOrName) {
  return typeof itemOrName === "string" ? Item.get(itemOrName) : itemOrName;
}

function itemOrItemsBallsMacroName(itemOrItems) {
  if (Array.isArray(itemOrItems)) {
    return itemOrItems.map(itemOrItemsBallsMacroName).join(", ");
  } else {
    var item = itemOrNameToItem(itemOrItems);
    return item.name;
  }
}

function itemOrItemsBallsMacroPredicate(itemOrItems) {
  if (Array.isArray(itemOrItems)) {
    return itemOrItems.map(itemOrItemsBallsMacroName).join(" && ");
  } else {
    return "hascombatitem " + itemOrItems;
  }
}

function skillOrNameToSkill(skillOrName) {
  if (typeof skillOrName === "string") {
    return Skill.get(skillOrName);
  } else {
    return skillOrName;
  }
}

function skillBallsMacroName(skillOrName) {
  var skill = skillOrNameToSkill(skillOrName);
  return skill.name.match(/^[A-Za-z ]+$/) ? skill.name : (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.toInt)(skill);
}
/**
 * BALLS macro builder for direct submission to KoL.
 * Create a new macro with `new Macro()` and add steps using the instance methods.
 * Uses a fluent interface, so each step returns the object for easy chaining of steps.
 * Each method is also defined as a static method that creates a new Macro with only that step.
 * For example, you can do `Macro.skill('Saucestorm').attack()`.
 */


var Macro =
/** @class */
function () {
  function Macro() {
    this.components = [];
  }
  /**
   * Convert macro to string.
   */


  Macro.prototype.toString = function () {
    return this.components.join(";");
  };
  /**
   * Save a macro to a Mafia property for use in a consult script.
   */


  Macro.prototype.save = function () {
    (0,_property__WEBPACK_IMPORTED_MODULE_1__.set)(Macro.SAVED_MACRO_PROPERTY, this.toString());
  };
  /**
   * Load a saved macro from the Mafia property.
   */


  Macro.load = function () {
    var _a;

    return (_a = new this()).step.apply(_a, (0,_property__WEBPACK_IMPORTED_MODULE_1__.get)(Macro.SAVED_MACRO_PROPERTY).split(";"));
  };
  /**
   * Clear the saved macro in the Mafia property.
   */


  Macro.clearSaved = function () {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.removeProperty)(Macro.SAVED_MACRO_PROPERTY);
  };
  /**
   * Statefully add one or several steps to a macro.
   * @param nextSteps The steps to add to the macro.
   * @returns {Macro} This object itself.
   */


  Macro.prototype.step = function () {
    var _a;

    var nextSteps = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      nextSteps[_i] = arguments[_i];
    }

    var nextStepsStrings = (_a = []).concat.apply(_a, nextSteps.map(function (x) {
      return x instanceof Macro ? x.components : [x];
    }));

    this.components = __spreadArrays(this.components, nextStepsStrings.filter(function (s) {
      return s.length > 0;
    }));
    return this;
  };
  /**
   * Statefully add one or several steps to a macro.
   * @param nextSteps The steps to add to the macro.
   * @returns {Macro} This object itself.
   */


  Macro.step = function () {
    var _a;

    var nextSteps = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      nextSteps[_i] = arguments[_i];
    }

    return (_a = new this()).step.apply(_a, nextSteps);
  };
  /**
   * Submit the built macro to KoL. Only works inside combat.
   */


  Macro.prototype.submit = function () {
    var _final = this.toString();

    return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.visitUrl)("fight.php?action=macro&macrotext=" + (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.urlEncode)(_final), true, true);
  };
  /**
   * Set this macro as a KoL native autoattack.
   */


  Macro.prototype.setAutoAttack = function () {
    if (Macro.cachedMacroId === null) Macro.cachedMacroId = getMacroId();

    if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getAutoAttack)() === 99000000 + Macro.cachedMacroId && this.toString() === Macro.cachedAutoAttack) {
      // This macro is already set. Don"t make the server request.
      return;
    }

    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.visitUrl)("account_combatmacros.php?macroid=" + Macro.cachedMacroId + "&name=" + (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.urlEncode)(MACRO_NAME) + "&macrotext=" + (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.urlEncode)(this.toString()) + "&action=save", true, true);
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.visitUrl)("account.php?am=1&action=autoattack&value=" + (99000000 + Macro.cachedMacroId) + "&ajax=1");
    Macro.cachedAutoAttack = this.toString();
  };
  /**
   * Add an "abort" step to this macro.
   * @returns {Macro} This object itself.
   */


  Macro.prototype.abort = function () {
    return this.step("abort");
  };
  /**
   * Create a new macro with an "abort" step.
   * @returns {Macro} This object itself.
   */


  Macro.abort = function () {
    return new this().abort();
  };
  /**
   * Add an "if" statement to this macro.
   * @param condition The BALLS condition for the if statement.
   * @param ifTrue Continuation if the condition is true.
   * @returns {Macro} This object itself.
   */


  Macro.prototype.if_ = function (condition, ifTrue) {
    return this.step("if " + condition).step(ifTrue).step("endif");
  };
  /**
   * Create a new macro with an "if" statement.
   * @param condition The BALLS condition for the if statement.
   * @param ifTrue Continuation if the condition is true.
   * @returns {Macro} This object itself.
   */


  Macro.if_ = function (condition, ifTrue) {
    return new this().if_(condition, ifTrue);
  };
  /**
   * Add a "while" statement to this macro.
   * @param condition The BALLS condition for the if statement.
   * @param contents Loop to repeat while the condition is true.
   * @returns {Macro} This object itself.
   */


  Macro.prototype.while_ = function (condition, contents) {
    return this.step("while " + condition).step(contents).step("endwhile");
  };
  /**
   * Create a new macro with a "while" statement.
   * @param condition The BALLS condition for the if statement.
   * @param contents Loop to repeat while the condition is true.
   * @returns {Macro} This object itself.
   */


  Macro.while_ = function (condition, contents) {
    return new this().while_(condition, contents);
  };
  /**
   * Conditionally add a step to a macro based on a condition evaluated at the time of building the macro.
   * @param condition The JS condition.
   * @param ifTrue Continuation to add if the condition is true.
   * @returns {Macro} This object itself.
   */


  Macro.prototype.externalIf = function (condition, ifTrue) {
    return condition ? this.step(ifTrue) : this;
  };
  /**
   * Create a new macro with a condition evaluated at the time of building the macro.
   * @param condition The JS condition.
   * @param ifTrue Continuation to add if the condition is true.
   * @returns {Macro} This object itself.
   */


  Macro.externalIf = function (condition, ifTrue) {
    return new this().externalIf(condition, ifTrue);
  };
  /**
   * Add a repeat step to the macro.
   * @returns {Macro} This object itself.
   */


  Macro.prototype.repeat = function () {
    return this.step("repeat");
  };
  /**
   * Add one or more skill cast steps to the macro.
   * @param skills Skills to cast.
   * @returns {Macro} This object itself.
   */


  Macro.prototype.skill = function () {
    var skills = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      skills[_i] = arguments[_i];
    }

    return this.step.apply(this, skills.map(function (skill) {
      return "skill " + skillBallsMacroName(skill);
    }));
  };
  /**
   * Create a new macro with one or more skill cast steps.
   * @param skills Skills to cast.
   * @returns {Macro} This object itself.
   */


  Macro.skill = function () {
    var _a;

    var skills = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      skills[_i] = arguments[_i];
    }

    return (_a = new this()).skill.apply(_a, skills);
  };
  /**
   * Add one or more skill cast steps to the macro, where each step checks if you have the skill first.
   * @param skills Skills to try casting.
   * @returns {Macro} This object itself.
   */


  Macro.prototype.trySkill = function () {
    var skills = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      skills[_i] = arguments[_i];
    }

    return this.step.apply(this, skills.map(function (skill) {
      return Macro.if_("hasskill " + skillBallsMacroName(skill), Macro.skill(skill));
    }));
  };
  /**
   * Create a new macro with one or more skill cast steps, where each step checks if you have the skill first.
   * @param skills Skills to try casting.
   * @returns {Macro} This object itself.
   */


  Macro.trySkill = function () {
    var _a;

    var skills = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      skills[_i] = arguments[_i];
    }

    return (_a = new this()).trySkill.apply(_a, skills);
  };
  /**
   * Add one or more skill-cast-and-repeat steps to the macro, where each step checks if you have the skill first.
   * @param skills Skills to try repeatedly casting.
   * @returns {Macro} This object itself.
   */


  Macro.prototype.trySkillRepeat = function () {
    var skills = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      skills[_i] = arguments[_i];
    }

    return this.step.apply(this, skills.map(function (skill) {
      return Macro.if_("hasskill " + skillBallsMacroName(skill), Macro.skill(skill).repeat());
    }));
  };
  /**
   * Create a new macro with one or more skill-cast-and-repeat steps, where each step checks if you have the skill first.
   * @param skills Skills to try repeatedly casting.
   * @returns {Macro} This object itself.
   */


  Macro.trySkillRepeat = function () {
    var _a;

    var skills = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      skills[_i] = arguments[_i];
    }

    return (_a = new this()).trySkillRepeat.apply(_a, skills);
  };
  /**
   * Add one or more item steps to the macro.
   * @param items Items to use. Pass a tuple [item1, item2] to funksling.
   * @returns {Macro} This object itself.
   */


  Macro.prototype.item = function () {
    var items = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      items[_i] = arguments[_i];
    }

    return this.step.apply(this, items.map(function (itemOrItems) {
      return "use " + itemOrItemsBallsMacroName(itemOrItems);
    }));
  };
  /**
   * Create a new macro with one or more item steps.
   * @param items Items to use. Pass a tuple [item1, item2] to funksling.
   * @returns {Macro} This object itself.
   */


  Macro.item = function () {
    var _a;

    var items = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      items[_i] = arguments[_i];
    }

    return (_a = new this()).item.apply(_a, items);
  };
  /**
   * Add one or more item steps to the macro, where each step checks to see if you have the item first.
   * @param items Items to try using. Pass a tuple [item1, item2] to funksling.
   * @returns {Macro} This object itself.
   */


  Macro.prototype.tryItem = function () {
    var items = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      items[_i] = arguments[_i];
    }

    return this.step.apply(this, items.map(function (item) {
      return Macro.if_("hascombatitem " + itemOrItemsBallsMacroPredicate(item), "use " + itemOrItemsBallsMacroName(item));
    }));
  };
  /**
   * Create a new macro with one or more item steps, where each step checks to see if you have the item first.
   * @param items Items to try using. Pass a tuple [item1, item2] to funksling.
   * @returns {Macro} This object itself.
   */


  Macro.tryItem = function () {
    var _a;

    var items = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      items[_i] = arguments[_i];
    }

    return (_a = new this()).tryItem.apply(_a, items);
  };
  /**
   * Add an attack step to the macro.
   * @returns {Macro} This object itself.
   */


  Macro.prototype.attack = function () {
    return this.step("attack");
  };
  /**
   * Create a new macro with an attack step.
   * @returns {Macro} This object itself.
   */


  Macro.attack = function () {
    return new this().attack();
  };

  Macro.SAVED_MACRO_PROPERTY = "libram_savedMacro";
  Macro.cachedMacroId = null;
  Macro.cachedAutoAttack = null;
  return Macro;
}();


function banishedMonsters() {
  var banishedstring = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getProperty)("banishedMonsters");
  var banishedComponents = banishedstring.split(":");
  var result = new Map();
  if (banishedComponents.length < 3) return result;

  for (var idx = 0; idx < banishedComponents.length / 3 - 1; idx++) {
    var foe = Monster.get(banishedComponents[idx * 3]);
    var banisher = banishedComponents[idx * 3 + 1]; // toItem doesn"t error if the item doesn"t exist, so we have to use that.

    var banisherItem = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.toItem)(banisher);
    var banisherObject = [(0,_template_string__WEBPACK_IMPORTED_MODULE_2__.$item)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["none"], ["none"]))), null].includes(banisherItem) ? Skill.get(banisher) : banisherItem;
    result.set(banisherObject, foe);
  }

  return result;
}
/**
 * Adventure in a location and handle all combats with a given macro.
 * To use this function you will need to create a consult script that runs Macro.load().submit() and a CCS that calls that consult script.
 * See examples/consult.ts for an example.
 * @param loc Location to adventure in.
 * @param macro Macro to execute.
 */

function adventureMacro(loc, macro) {
  macro.save();

  try {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.adv1)(loc, 0, "");

    while ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.inMultiFight)()) {
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.runCombat)();
    }

    if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.choiceFollowsFight)()) (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.visitUrl)("choice.php");
  } finally {
    Macro.clearSaved();
  }
}
/**
 * Adventure in a location and handle all combats with a given autoattack and manual macro.
 * To use the nextMacro parameter you will need to create a consult script that runs Macro.load().submit() and a CCS that calls that consult script.
 * See examples/consult.ts for an example.
 * @param loc Location to adventure in.
 * @param autoMacro Macro to execute via KoL autoattack.
 * @param nextMacro Macro to execute manually after autoattack completes.
 */

function adventureMacroAuto(loc, autoMacro, nextMacro) {
  if (nextMacro === void 0) {
    nextMacro = null;
  }

  nextMacro = nextMacro !== null && nextMacro !== void 0 ? nextMacro : Macro.abort();
  autoMacro.setAutoAttack();
  adventureMacro(loc, nextMacro);
}
var templateObject_1;

/***/ }),

/***/ "./node_modules/libram/dist/lib.js":
/*!*****************************************!*\
  !*** ./node_modules/libram/dist/lib.js ***!
  \*****************************************/
/*! namespace exports */
/*! export Wanderer [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getActiveEffects [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getActiveSongs [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getFamiliarWandererChance [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getFoldGroup [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getKramcoWandererChance [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getMonsterLocations [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getRemainingLiver [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getRemainingSpleen [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getRemainingStomach [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getSongCount [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getSongLimit [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getTotalFamiliarWanderers [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getWandererChance [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getZapGroup [provided] [no usage info] [missing usage info prevents renaming] */
/*! export have [provided] [no usage info] [missing usage info prevents renaming] */
/*! export haveCounter [provided] [no usage info] [missing usage info prevents renaming] */
/*! export haveInCampground [provided] [no usage info] [missing usage info prevents renaming] */
/*! export haveWandererCounter [provided] [no usage info] [missing usage info prevents renaming] */
/*! export isCurrentFamiliar [provided] [no usage info] [missing usage info prevents renaming] */
/*! export isSong [provided] [no usage info] [missing usage info prevents renaming] */
/*! export isVoteWandererNow [provided] [no usage info] [missing usage info prevents renaming] */
/*! export isWandererNow [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getSongLimit": () => /* binding */ getSongLimit,
/* harmony export */   "isSong": () => /* binding */ isSong,
/* harmony export */   "getActiveEffects": () => /* binding */ getActiveEffects,
/* harmony export */   "getActiveSongs": () => /* binding */ getActiveSongs,
/* harmony export */   "getSongCount": () => /* binding */ getSongCount,
/* harmony export */   "getMonsterLocations": () => /* binding */ getMonsterLocations,
/* harmony export */   "getRemainingLiver": () => /* binding */ getRemainingLiver,
/* harmony export */   "getRemainingStomach": () => /* binding */ getRemainingStomach,
/* harmony export */   "getRemainingSpleen": () => /* binding */ getRemainingSpleen,
/* harmony export */   "have": () => /* binding */ have,
/* harmony export */   "haveInCampground": () => /* binding */ haveInCampground,
/* harmony export */   "Wanderer": () => /* binding */ Wanderer,
/* harmony export */   "haveCounter": () => /* binding */ haveCounter,
/* harmony export */   "getTotalFamiliarWanderers": () => /* binding */ getTotalFamiliarWanderers,
/* harmony export */   "haveWandererCounter": () => /* binding */ haveWandererCounter,
/* harmony export */   "isVoteWandererNow": () => /* binding */ isVoteWandererNow,
/* harmony export */   "isWandererNow": () => /* binding */ isWandererNow,
/* harmony export */   "getKramcoWandererChance": () => /* binding */ getKramcoWandererChance,
/* harmony export */   "getFamiliarWandererChance": () => /* binding */ getFamiliarWandererChance,
/* harmony export */   "getWandererChance": () => /* binding */ getWandererChance,
/* harmony export */   "isCurrentFamiliar": () => /* binding */ isCurrentFamiliar,
/* harmony export */   "getFoldGroup": () => /* binding */ getFoldGroup,
/* harmony export */   "getZapGroup": () => /* binding */ getZapGroup
/* harmony export */ });
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! kolmafia */ "kolmafia");
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(kolmafia__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _template_string__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./template-string */ "./node_modules/libram/dist/template-string.js");
/* harmony import */ var _property__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./property */ "./node_modules/libram/dist/property.js");
var __makeTemplateObject = undefined && undefined.__makeTemplateObject || function (cooked, raw) {
  if (Object.defineProperty) {
    Object.defineProperty(cooked, "raw", {
      value: raw
    });
  } else {
    cooked.raw = raw;
  }

  return cooked;
};




/**
 * Returns the current maximum Accordion Thief songs the player can have in their head
 */

function getSongLimit() {
  return 3 + ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.booleanModifier)("Four Songs") ? 1 : 0) + (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.numericModifier)("Additional Song");
}
/**
 * Return whether the Skill or Effect provided is an Accordion Thief song
 * @param skillOrEffect The Skill or Effect
 */

function isSong(skillOrEffect) {
  var skill = skillOrEffect instanceof Effect ? (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.toSkill)(skillOrEffect) : skillOrEffect;
  return skill["class"] === (0,_template_string__WEBPACK_IMPORTED_MODULE_1__.$class)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["Accordion Thief"], ["Accordion Thief"]))) && skill.buff;
}
/**
 * List all active Effects
 */

function getActiveEffects() {
  return Object.keys((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myEffects)()).map(function (e) {
    return Effect.get(e);
  });
}
/**
 * List currently active Accordion Thief songs
 */

function getActiveSongs() {
  return getActiveEffects().filter(isSong);
}
/**
 * List number of active Accordion Thief songs
 */

function getSongCount() {
  return getActiveSongs().length;
}
/**
 * Return the locations in which the given monster can be encountered naturally
 * @param monster Monster to find
 */

function getMonsterLocations(monster) {
  return Location.all().filter(function (location) {
    return monster.name in (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.appearanceRates)(location);
  });
}
/**
 * Return the player's remaining liver space
 */

function getRemainingLiver() {
  return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.inebrietyLimit)() - (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myInebriety)();
}
/**
 * Return the player's remaining stomach space
 */

function getRemainingStomach() {
  return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.fullnessLimit)() - (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myFullness)();
}
/**
 * Return the player's remaining spleen space
 */

function getRemainingSpleen() {
  return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.spleenLimit)() - (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.mySpleenUse)();
}
/**
 * Return whether the player "has" any entity which one could feasibly "have".
 */

function have(thing, quantity) {
  if (quantity === void 0) {
    quantity = 1;
  }

  if (thing instanceof Effect) {
    return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.haveEffect)(thing) >= quantity;
  }

  if (thing instanceof Familiar) {
    return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.haveFamiliar)(thing);
  }

  if (thing instanceof Item) {
    return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)(thing) >= quantity;
  }

  if (thing instanceof Servant) {
    return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.haveServant)(thing);
  }

  if (thing instanceof Skill) {
    return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.haveSkill)(thing);
  }

  if (thing instanceof Thrall) {
    var thrall = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myThrall)();
    return thrall.id === thing.id && thrall.level >= quantity;
  }

  return false;
}
/**
 * Return whether an item is in the player's campground
 */

function haveInCampground(item) {
  return Object.keys((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getCampground)()).map(function (i) {
    return Item.get(i);
  }).includes(item);
}
var Wanderer;

(function (Wanderer) {
  Wanderer["Digitize"] = "Digitize Monster";
  Wanderer["Enamorang"] = "Enamorang Monster";
  Wanderer["Familiar"] = "Familiar";
  Wanderer["Holiday"] = "Holiday Monster";
  Wanderer["Kramco"] = "Kramco";
  Wanderer["Nemesis"] = "Nemesis Assassin";
  Wanderer["Portscan"] = "portscan.edu";
  Wanderer["Romantic"] = "Romantic Monster";
  Wanderer["Vote"] = "Vote Monster";
})(Wanderer || (Wanderer = {}));

var deterministicWanderers = [Wanderer.Digitize, Wanderer.Portscan];
/**
 * Return whether the player has the queried counter
 */

function haveCounter(counterName, minTurns, maxTurns) {
  if (minTurns === void 0) {
    minTurns = 0;
  }

  if (maxTurns === void 0) {
    maxTurns = 500;
  }

  return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getCounters)(counterName, minTurns, maxTurns) === counterName;
}
/**
 * Returns the player's total number of Artistic Goth Kid and/or Mini-Hipster
 * wanderers encountered today
 */

function getTotalFamiliarWanderers() {
  var hipsterFights = (0,_property__WEBPACK_IMPORTED_MODULE_2__.get)("_hipsterAdv");
  var gothFights = (0,_property__WEBPACK_IMPORTED_MODULE_2__.get)("_gothKidFights");
  return hipsterFights + gothFights;
}
/**
 * Return whether the player has the queried wandering counter
 */

function haveWandererCounter(wanderer) {
  if (deterministicWanderers.includes(wanderer)) {
    return haveCounter(wanderer);
  }

  var begin = wanderer + " window begin";
  var end = wanderer + " window end";
  return haveCounter(begin) || haveCounter(end);
}
/**
 * Returns whether the player will encounter a vote wanderer on the next turn,
 * providing an "I Voted!" sticker is equipped.
 */

function isVoteWandererNow() {
  return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.totalTurnsPlayed)() % 11 == 1;
}
/**
 * For deterministic wanderers:
 * Return whether the player will encounter the queried wanderer on the next turn
 *
 * For variable wanderers (window):
 * Return whether the player is within an encounter window for the queried wanderer
 *
 * For variable wanderers (chance per turn):
 * Returns true unless the player has exhausted the number of wanderers possible
 */

function isWandererNow(wanderer) {
  if (deterministicWanderers.includes(wanderer)) {
    return haveCounter(wanderer, 0, 0);
  }

  if (wanderer == Wanderer.Kramco) {
    return true;
  }

  if (wanderer === Wanderer.Vote) {
    return isVoteWandererNow();
  }

  if (wanderer === Wanderer.Familiar) {
    return getTotalFamiliarWanderers() < 7;
  }

  var begin = wanderer + " window begin";
  var end = wanderer + " window end";
  return !haveCounter(begin, 1) && haveCounter(end);
}
/**
 * Returns the float chance the player will encounter a sausage goblin on the
 * next turn, providing the Kramco Sausage-o-Matic is equipped.
 */

function getKramcoWandererChance() {
  var fights = (0,_property__WEBPACK_IMPORTED_MODULE_2__.get)("_sausageFights");
  var lastFight = (0,_property__WEBPACK_IMPORTED_MODULE_2__.get)("_lastSausageMonsterTurn");
  var totalTurns = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.totalTurnsPlayed)();

  if (fights < 1) {
    return lastFight === totalTurns && (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myTurncount)() < 1 ? 0.5 : 1.0;
  }

  var turnsSinceLastFight = totalTurns - lastFight;
  return Math.min(1.0, (turnsSinceLastFight + 1) / (5 + fights * 3 + Math.pow(Math.max(0, fights - 5), 3)));
}
/**
 * Returns the float chance the player will encounter an Artistic Goth Kid or
 * Mini-Hipster wanderer on the next turn, providing a familiar is equipped.
 *
 * NOTE: You must complete one combat with the Artistic Goth Kid before you
 * can encounter any wanderers. Consequently,ƒ the first combat with the
 * Artist Goth Kid is effectively 0% chance to encounter a wanderer.
 */

function getFamiliarWandererChance() {
  var totalFights = getTotalFamiliarWanderers();
  var probability = [0.5, 0.4, 0.3, 0.2];

  if (totalFights < 4) {
    return probability[totalFights];
  }

  return totalFights > 7 ? 0.0 : 0.1;
}
/**
 * Returns the float chance the player will encounter the queried wanderer
 * on the next turn.
 */

function getWandererChance(wanderer) {
  if (deterministicWanderers.includes(wanderer)) {
    return haveCounter(wanderer, 0, 0) ? 1.0 : 0.0;
  }

  if (wanderer === Wanderer.Kramco) {
    getKramcoWandererChance();
  }

  if (wanderer === Wanderer.Vote) {
    return isVoteWandererNow() ? 1.0 : 0.0;
  }

  if (wanderer === Wanderer.Familiar) {
    getFamiliarWandererChance();
  }

  var begin = wanderer + " window begin";
  var end = wanderer + " window end";

  if (haveCounter(begin, 1, 100)) {
    return 0.0;
  }

  var counters = (0,_property__WEBPACK_IMPORTED_MODULE_2__.get)("relayCounters");
  var re = new RegExp("(\\d+):" + end);
  var matches = counters.match(re);

  if (matches && matches.length === 2) {
    var window = Number.parseInt(matches[1]) - (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myTurncount)();
    return 1.0 / window;
  }

  return 0.0;
}
function isCurrentFamiliar(familiar) {
  return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myFamiliar)() === familiar;
}
function getFoldGroup(item) {
  return Object.entries((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getRelated)(item, "fold")).sort(function (_a, _b) {
    var a = _a[1];
    var b = _b[1];
    return a - b;
  }).map(function (_a) {
    var i = _a[0];
    return Item.get(i);
  });
}
function getZapGroup(item) {
  return Object.keys((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getRelated)(item, "zap")).map(function (i) {
    return Item.get(i);
  });
}
var templateObject_1;

/***/ }),

/***/ "./node_modules/libram/dist/property.js":
/*!**********************************************!*\
  !*** ./node_modules/libram/dist/property.js ***!
  \**********************************************/
/*! namespace exports */
/*! export createMafiaClassPropertyGetter [provided] [no usage info] [missing usage info prevents renaming] */
/*! export createPropertyGetter [provided] [no usage info] [missing usage info prevents renaming] */
/*! export get [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getBoolean [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getBounty [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getClass [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getCoinmaster [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getCommaSeparated [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getEffect [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getElement [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getFamiliar [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getItem [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getLocation [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getMonster [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getNumber [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getPhylum [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getServant [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getSkill [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getSlot [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getStat [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getString [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getThrall [provided] [no usage info] [missing usage info prevents renaming] */
/*! export set [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createPropertyGetter": () => /* binding */ createPropertyGetter,
/* harmony export */   "createMafiaClassPropertyGetter": () => /* binding */ createMafiaClassPropertyGetter,
/* harmony export */   "getString": () => /* binding */ getString,
/* harmony export */   "getCommaSeparated": () => /* binding */ getCommaSeparated,
/* harmony export */   "getBoolean": () => /* binding */ getBoolean,
/* harmony export */   "getNumber": () => /* binding */ getNumber,
/* harmony export */   "getBounty": () => /* binding */ getBounty,
/* harmony export */   "getClass": () => /* binding */ getClass,
/* harmony export */   "getCoinmaster": () => /* binding */ getCoinmaster,
/* harmony export */   "getEffect": () => /* binding */ getEffect,
/* harmony export */   "getElement": () => /* binding */ getElement,
/* harmony export */   "getFamiliar": () => /* binding */ getFamiliar,
/* harmony export */   "getItem": () => /* binding */ getItem,
/* harmony export */   "getLocation": () => /* binding */ getLocation,
/* harmony export */   "getMonster": () => /* binding */ getMonster,
/* harmony export */   "getPhylum": () => /* binding */ getPhylum,
/* harmony export */   "getServant": () => /* binding */ getServant,
/* harmony export */   "getSkill": () => /* binding */ getSkill,
/* harmony export */   "getSlot": () => /* binding */ getSlot,
/* harmony export */   "getStat": () => /* binding */ getStat,
/* harmony export */   "getThrall": () => /* binding */ getThrall,
/* harmony export */   "get": () => /* binding */ get,
/* harmony export */   "set": () => /* binding */ set
/* harmony export */ });
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! kolmafia */ "kolmafia");
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(kolmafia__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _propertyTyping__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./propertyTyping */ "./node_modules/libram/dist/propertyTyping.js");


var createPropertyGetter = function createPropertyGetter(transform) {
  return function (property, default_) {
    var value = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getProperty)(property);

    if (default_ !== undefined && value === "") {
      return default_;
    }

    return transform(value, property);
  };
};
var createMafiaClassPropertyGetter = function createMafiaClassPropertyGetter(Type) {
  return createPropertyGetter(function (value) {
    var v = Type.get(value);
    return v === Type.get("none") ? null : v;
  });
};
var getString = createPropertyGetter(function (value) {
  return value;
});
var getCommaSeparated = createPropertyGetter(function (value) {
  return value.split(/, ?/);
});
var getBoolean = createPropertyGetter(function (value) {
  return value === "true";
});
var getNumber = createPropertyGetter(function (value) {
  return Number(value);
});
var getBounty = createMafiaClassPropertyGetter(Bounty);
var getClass = createMafiaClassPropertyGetter(Class);
var getCoinmaster = createMafiaClassPropertyGetter(Coinmaster);
var getEffect = createMafiaClassPropertyGetter(Effect);
var getElement = createMafiaClassPropertyGetter(Element);
var getFamiliar = createMafiaClassPropertyGetter(Familiar);
var getItem = createMafiaClassPropertyGetter(Item);
var getLocation = createMafiaClassPropertyGetter(Location);
var getMonster = createMafiaClassPropertyGetter(Monster);
var getPhylum = createMafiaClassPropertyGetter(Phylum);
var getServant = createMafiaClassPropertyGetter(Servant);
var getSkill = createMafiaClassPropertyGetter(Skill);
var getSlot = createMafiaClassPropertyGetter(Slot);
var getStat = createMafiaClassPropertyGetter(Stat);
var getThrall = createMafiaClassPropertyGetter(Thrall);
function get(property, _default) {
  var value = getString(property);

  if ((0,_propertyTyping__WEBPACK_IMPORTED_MODULE_1__.isMonsterProperty)(property)) {
    return getMonster(property, _default);
  }

  if ((0,_propertyTyping__WEBPACK_IMPORTED_MODULE_1__.isLocationProperty)(property)) {
    return getLocation(property, _default);
  }

  if (value === "") {
    return _default === undefined ? "" : _default;
  }

  if ((0,_propertyTyping__WEBPACK_IMPORTED_MODULE_1__.isBooleanProperty)(property, value)) {
    return getBoolean(property, _default);
  }

  if ((0,_propertyTyping__WEBPACK_IMPORTED_MODULE_1__.isNumericProperty)(property, value)) {
    return getNumber(property, _default);
  }

  return value;
}
function set(property, value) {
  var stringValue = value === null ? "" : value.toString();
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.setProperty)(property, stringValue);
}

/***/ }),

/***/ "./node_modules/libram/dist/propertyTyping.js":
/*!****************************************************!*\
  !*** ./node_modules/libram/dist/propertyTyping.js ***!
  \****************************************************/
/*! namespace exports */
/*! export isBooleanProperty [provided] [no usage info] [missing usage info prevents renaming] */
/*! export isLocationProperty [provided] [no usage info] [missing usage info prevents renaming] */
/*! export isMonsterProperty [provided] [no usage info] [missing usage info prevents renaming] */
/*! export isNumericProperty [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isNumericProperty": () => /* binding */ isNumericProperty,
/* harmony export */   "isBooleanProperty": () => /* binding */ isBooleanProperty,
/* harmony export */   "isLocationProperty": () => /* binding */ isLocationProperty,
/* harmony export */   "isMonsterProperty": () => /* binding */ isMonsterProperty
/* harmony export */ });
function isNumericProperty(property, value) {
  return !isNaN(Number(value)) && !isNaN(parseFloat(value));
}
var fakeBooleans = ["trackVoteMonster", "_jickJarAvailable"];
function isBooleanProperty(property, value) {
  if (fakeBooleans.includes(property)) return false;
  return ["true", "false"].includes(value);
}
var otherLocations = ["nextSpookyravenElizabethRoom", "nextSpookyravenStephenRoom"];
function isLocationProperty(property) {
  return otherLocations.includes(property) || property.endsWith("Location");
}
var otherMonsters = ["romanticTarget"];
function isMonsterProperty(property) {
  if (otherMonsters.includes(property)) return true;
  return property.endsWith("Monster");
}

/***/ }),

/***/ "./node_modules/libram/dist/template-string.js":
/*!*****************************************************!*\
  !*** ./node_modules/libram/dist/template-string.js ***!
  \*****************************************************/
/*! namespace exports */
/*! export $bounties [provided] [no usage info] [missing usage info prevents renaming] */
/*! export $bounty [provided] [no usage info] [missing usage info prevents renaming] */
/*! export $class [provided] [no usage info] [missing usage info prevents renaming] */
/*! export $classes [provided] [no usage info] [missing usage info prevents renaming] */
/*! export $coinmaster [provided] [no usage info] [missing usage info prevents renaming] */
/*! export $coinmasters [provided] [no usage info] [missing usage info prevents renaming] */
/*! export $effect [provided] [no usage info] [missing usage info prevents renaming] */
/*! export $effects [provided] [no usage info] [missing usage info prevents renaming] */
/*! export $element [provided] [no usage info] [missing usage info prevents renaming] */
/*! export $elements [provided] [no usage info] [missing usage info prevents renaming] */
/*! export $familiar [provided] [no usage info] [missing usage info prevents renaming] */
/*! export $familiars [provided] [no usage info] [missing usage info prevents renaming] */
/*! export $item [provided] [no usage info] [missing usage info prevents renaming] */
/*! export $items [provided] [no usage info] [missing usage info prevents renaming] */
/*! export $location [provided] [no usage info] [missing usage info prevents renaming] */
/*! export $locations [provided] [no usage info] [missing usage info prevents renaming] */
/*! export $monster [provided] [no usage info] [missing usage info prevents renaming] */
/*! export $monsters [provided] [no usage info] [missing usage info prevents renaming] */
/*! export $phyla [provided] [no usage info] [missing usage info prevents renaming] */
/*! export $phylum [provided] [no usage info] [missing usage info prevents renaming] */
/*! export $servant [provided] [no usage info] [missing usage info prevents renaming] */
/*! export $servants [provided] [no usage info] [missing usage info prevents renaming] */
/*! export $skill [provided] [no usage info] [missing usage info prevents renaming] */
/*! export $skills [provided] [no usage info] [missing usage info prevents renaming] */
/*! export $slot [provided] [no usage info] [missing usage info prevents renaming] */
/*! export $slots [provided] [no usage info] [missing usage info prevents renaming] */
/*! export $stat [provided] [no usage info] [missing usage info prevents renaming] */
/*! export $stats [provided] [no usage info] [missing usage info prevents renaming] */
/*! export $thrall [provided] [no usage info] [missing usage info prevents renaming] */
/*! export $thralls [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "$bounty": () => /* binding */ $bounty,
/* harmony export */   "$bounties": () => /* binding */ $bounties,
/* harmony export */   "$class": () => /* binding */ $class,
/* harmony export */   "$classes": () => /* binding */ $classes,
/* harmony export */   "$coinmaster": () => /* binding */ $coinmaster,
/* harmony export */   "$coinmasters": () => /* binding */ $coinmasters,
/* harmony export */   "$effect": () => /* binding */ $effect,
/* harmony export */   "$effects": () => /* binding */ $effects,
/* harmony export */   "$element": () => /* binding */ $element,
/* harmony export */   "$elements": () => /* binding */ $elements,
/* harmony export */   "$familiar": () => /* binding */ $familiar,
/* harmony export */   "$familiars": () => /* binding */ $familiars,
/* harmony export */   "$item": () => /* binding */ $item,
/* harmony export */   "$items": () => /* binding */ $items,
/* harmony export */   "$location": () => /* binding */ $location,
/* harmony export */   "$locations": () => /* binding */ $locations,
/* harmony export */   "$monster": () => /* binding */ $monster,
/* harmony export */   "$monsters": () => /* binding */ $monsters,
/* harmony export */   "$phylum": () => /* binding */ $phylum,
/* harmony export */   "$phyla": () => /* binding */ $phyla,
/* harmony export */   "$servant": () => /* binding */ $servant,
/* harmony export */   "$servants": () => /* binding */ $servants,
/* harmony export */   "$skill": () => /* binding */ $skill,
/* harmony export */   "$skills": () => /* binding */ $skills,
/* harmony export */   "$slot": () => /* binding */ $slot,
/* harmony export */   "$slots": () => /* binding */ $slots,
/* harmony export */   "$stat": () => /* binding */ $stat,
/* harmony export */   "$stats": () => /* binding */ $stats,
/* harmony export */   "$thrall": () => /* binding */ $thrall,
/* harmony export */   "$thralls": () => /* binding */ $thralls
/* harmony export */ });
var __spreadArrays = undefined && undefined.__spreadArrays || function () {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) {
    s += arguments[i].length;
  }

  for (var r = Array(s), k = 0, i = 0; i < il; i++) {
    for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) {
      r[k] = a[j];
    }
  }

  return r;
};

var concatTemplateString = function concatTemplateString(literals) {
  var placeholders = [];

  for (var _i = 1; _i < arguments.length; _i++) {
    placeholders[_i - 1] = arguments[_i];
  }

  return literals.reduce(function (acc, literal, i) {
    return acc + literal + (placeholders[i] || "");
  }, "");
};

var createSingleConstant = function createSingleConstant(Type) {
  return function (literals) {
    var placeholders = [];

    for (var _i = 1; _i < arguments.length; _i++) {
      placeholders[_i - 1] = arguments[_i];
    }

    var input = concatTemplateString.apply(void 0, __spreadArrays([literals], placeholders));
    return Type.get(input);
  };
};

var createPluralConstant = function createPluralConstant(Type) {
  return function (literals) {
    var placeholders = [];

    for (var _i = 1; _i < arguments.length; _i++) {
      placeholders[_i - 1] = arguments[_i];
    }

    var input = concatTemplateString.apply(void 0, __spreadArrays([literals], placeholders));

    if (input === "") {
      return Type.all();
    }

    return Type.get(input.split(","));
  };
};
/**
 * A Bounty specified by name.
 */


var $bounty = createSingleConstant(Bounty);
/**
 * A list of Bounties specified by a comma-separated list of names.
 * For a list of all possible Bounties, leave the template string blank.
 */

var $bounties = createPluralConstant(Bounty);
/**
 * A Class specified by name.
 */

var $class = createSingleConstant(Class);
/**
 * A list of Classes specified by a comma-separated list of names.
 * For a list of all possible Classes, leave the template string blank.
 */

var $classes = createPluralConstant(Class);
/**
 * A Coinmaster specified by name.
 */

var $coinmaster = createSingleConstant(Coinmaster);
/**
 * A list of Coinmasters specified by a comma-separated list of names.
 * For a list of all possible Coinmasters, leave the template string blank.
 */

var $coinmasters = createPluralConstant(Coinmaster);
/**
 * An Effect specified by name.
 */

var $effect = createSingleConstant(Effect);
/**
 * A list of Effects specified by a comma-separated list of names.
 * For a list of all possible Effects, leave the template string blank.
 */

var $effects = createPluralConstant(Effect);
/**
 * An Element specified by name.
 */

var $element = createSingleConstant(Element);
/**
 * A list of Elements specified by a comma-separated list of names.
 * For a list of all possible Elements, leave the template string blank.
 */

var $elements = createPluralConstant(Element);
/**
 * A Familiar specified by name.
 */

var $familiar = createSingleConstant(Familiar);
/**
 * A list of Familiars specified by a comma-separated list of names.
 * For a list of all possible Familiars, leave the template string blank.
 */

var $familiars = createPluralConstant(Familiar);
/**
 * An Item specified by name.
 */

var $item = createSingleConstant(Item);
/**
 * A list of Items specified by a comma-separated list of names.
 * For a list of all possible Items, leave the template string blank.
 */

var $items = createPluralConstant(Item);
/**
 * A Location specified by name.
 */

var $location = createSingleConstant(Location);
/**
 * A list of Locations specified by a comma-separated list of names.
 * For a list of all possible Locations, leave the template string blank.
 */

var $locations = createPluralConstant(Location);
/**
 * A Monster specified by name.
 */

var $monster = createSingleConstant(Monster);
/**
 * A list of Monsters specified by a comma-separated list of names.
 * For a list of all possible Monsters, leave the template string blank.
 */

var $monsters = createPluralConstant(Monster);
/**
 * A Phylum specified by name.
 */

var $phylum = createSingleConstant(Phylum);
/**
 * A list of Phyla specified by a comma-separated list of names.
 * For a list of all possible Phyla, leave the template string blank.
 */

var $phyla = createPluralConstant(Phylum);
/**
 * A Servant specified by name.
 */

var $servant = createSingleConstant(Servant);
/**
 * A list of Servants specified by a comma-separated list of names.
 * For a list of all possible Servants, leave the template string blank.
 */

var $servants = createPluralConstant(Servant);
/**
 * A Skill specified by name.
 */

var $skill = createSingleConstant(Skill);
/**
 * A list of Skills specified by a comma-separated list of names.
 * For a list of all possible Skills, leave the template string blank.
 */

var $skills = createPluralConstant(Skill);
/**
 * A Slot specified by name.
 */

var $slot = createSingleConstant(Slot);
/**
 * A list of Slots specified by a comma-separated list of names.
 * For a list of all possible Slots, leave the template string blank.
 */

var $slots = createPluralConstant(Slot);
/**
 * A Stat specified by name.
 */

var $stat = createSingleConstant(Stat);
/**
 * A list of Stats specified by a comma-separated list of names.
 * For a list of all possible Stats, leave the template string blank.
 */

var $stats = createPluralConstant(Stat);
/**
 * A Thrall specified by name.
 */

var $thrall = createSingleConstant(Thrall);
/**
 * A list of Thralls specified by a comma-separated list of names.
 * For a list of all possible Thralls, leave the template string blank.
 */

var $thralls = createPluralConstant(Thrall);

/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! namespace exports */
/*! export calculateFarmingTurns [provided] [maybe used in barfday (runtime-defined)] [usage prevents renaming] */
/*! other exports [not provided] [maybe used in barfday (runtime-defined)] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "calculateFarmingTurns": () => /* binding */ calculateFarmingTurns
/* harmony export */ });
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! kolmafia */ "kolmafia");
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(kolmafia__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var libram__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! libram */ "./node_modules/libram/dist/template-string.js");
/* harmony import */ var libram__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! libram */ "./node_modules/libram/dist/property.js");
/* harmony import */ var libram__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! libram */ "./node_modules/libram/dist/combat.js");
/* harmony import */ var libram__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! libram */ "./node_modules/libram/dist/lib.js");
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9, _templateObject10, _templateObject11, _templateObject12, _templateObject13, _templateObject14, _templateObject15, _templateObject16, _templateObject17, _templateObject18, _templateObject19, _templateObject20, _templateObject21, _templateObject22, _templateObject23, _templateObject24, _templateObject25, _templateObject26, _templateObject27, _templateObject28, _templateObject29, _templateObject30, _templateObject31, _templateObject32, _templateObject33, _templateObject34, _templateObject35, _templateObject36, _templateObject37, _templateObject38, _templateObject39, _templateObject40, _templateObject41, _templateObject42, _templateObject43, _templateObject44, _templateObject45, _templateObject46, _templateObject47, _templateObject48, _templateObject49, _templateObject50, _templateObject51, _templateObject52, _templateObject53, _templateObject54, _templateObject55, _templateObject56, _templateObject57, _templateObject58, _templateObject59, _templateObject60, _templateObject61, _templateObject62, _templateObject63, _templateObject64, _templateObject65, _templateObject66, _templateObject67, _templateObject68, _templateObject69, _templateObject70, _templateObject71, _templateObject72, _templateObject73, _templateObject74, _templateObject75, _templateObject76, _templateObject77, _templateObject78, _templateObject79, _templateObject80, _templateObject81, _templateObject82, _templateObject83, _templateObject84, _templateObject85, _templateObject86, _templateObject87, _templateObject88, _templateObject89, _templateObject90, _templateObject91, _templateObject92, _templateObject93, _templateObject94, _templateObject95, _templateObject96, _templateObject97, _templateObject98, _templateObject99, _templateObject100, _templateObject101, _templateObject102, _templateObject103, _templateObject104, _templateObject105, _templateObject106;

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }



function calculateFarmingTurns() {
  // Assess farming turns given available resources. Currently
  //   just going to use an approximation; I'm making this a
  //   function so that I can make it more effective later!
  //  for now, need to figure out diet/spleen for 510 turns
  return 450;
}

if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getClanId)() != 40382) {
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.cliExecute)("/whitelist alliance from hell");
}

if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_1__.$item)(_templateObject || (_templateObject = _taggedTemplateLiteral(["pantogram pants"])))) == 0) {
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.cliExecute)("acquire 1 porquoise");
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.use)((0,libram__WEBPACK_IMPORTED_MODULE_1__.$item)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["disassembled clover"]))));
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.cliExecute)("pantogram high meat|hilarity|silent");
}

if ((0,libram__WEBPACK_IMPORTED_MODULE_2__.get)("boomBoxSong") != "Total Eclipse of Your Meat") {
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.cliExecute)("boombox meat");
}

while ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.haveEffect)((0,libram__WEBPACK_IMPORTED_MODULE_1__.$effect)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["synthesis: greed"])))) < calculateFarmingTurns() && (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.mySpleenUse)() < (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.spleenLimit)()) {
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.sweetSynthesis)((0,libram__WEBPACK_IMPORTED_MODULE_1__.$item)(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["milk stud"]))), (0,libram__WEBPACK_IMPORTED_MODULE_1__.$item)(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["swizzler"]))));
} // chew(1, $item`beggin\' cologne`);


if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myFullness)() == 0) {
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.useSkill)((0,libram__WEBPACK_IMPORTED_MODULE_1__.$skill)(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["cheat code: triple size"]))), 1);
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.use)((0,libram__WEBPACK_IMPORTED_MODULE_1__.$item)(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["milk of magnesium"]))));
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.eatsilent)(3, (0,libram__WEBPACK_IMPORTED_MODULE_1__.$item)(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral(["ol' scratch's salad fork"]))));
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.eatsilent)(3, (0,libram__WEBPACK_IMPORTED_MODULE_1__.$item)(_templateObject9 || (_templateObject9 = _taggedTemplateLiteral(["extra-greasy slider"]))));
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.chew)(5, (0,libram__WEBPACK_IMPORTED_MODULE_1__.$item)(_templateObject10 || (_templateObject10 = _taggedTemplateLiteral(["voodoo snuff"]))));
}

if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myInebriety)() == 0) {
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.useSkill)((0,libram__WEBPACK_IMPORTED_MODULE_1__.$skill)(_templateObject11 || (_templateObject11 = _taggedTemplateLiteral(["ode to booze"]))), 2);
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.drinksilent)(3, (0,libram__WEBPACK_IMPORTED_MODULE_1__.$item)(_templateObject12 || (_templateObject12 = _taggedTemplateLiteral(["frosty's frosty mug"], ["frosty\\'s frosty mug"]))));
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.drinksilent)(3, (0,libram__WEBPACK_IMPORTED_MODULE_1__.$item)(_templateObject13 || (_templateObject13 = _taggedTemplateLiteral(["jar of fermented pickle juice"]))));
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.chew)(5, (0,libram__WEBPACK_IMPORTED_MODULE_1__.$item)(_templateObject14 || (_templateObject14 = _taggedTemplateLiteral(["voodoo snuff"]))));
}

if ((0,libram__WEBPACK_IMPORTED_MODULE_2__.get)("_loveChocolatesUsed") === 0) {
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.use)((0,libram__WEBPACK_IMPORTED_MODULE_1__.$item)(_templateObject15 || (_templateObject15 = _taggedTemplateLiteral(["LOV extraterrestrial chocolate"]))));
}

if (!(0,libram__WEBPACK_IMPORTED_MODULE_2__.get)("_borrowedTimeUsed")) {
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.use)((0,libram__WEBPACK_IMPORTED_MODULE_1__.$item)(_templateObject16 || (_templateObject16 = _taggedTemplateLiteral(["Borrowed Time"]))));
} //should probably put all this under individual if statements


if (!(0,libram__WEBPACK_IMPORTED_MODULE_2__.get)("_mimeArmyShotglassUsed") && !(0,libram__WEBPACK_IMPORTED_MODULE_2__.get)("_syntheticDogHairPillUsed")) {
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.use)(1, (0,libram__WEBPACK_IMPORTED_MODULE_1__.$item)(_templateObject17 || (_templateObject17 = _taggedTemplateLiteral(["synthetic doghair pill"]))));
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_1__.$item)(_templateObject18 || (_templateObject18 = _taggedTemplateLiteral(["mafia pinky ring"]))));

  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.haveEffect)((0,libram__WEBPACK_IMPORTED_MODULE_1__.$effect)(_templateObject19 || (_templateObject19 = _taggedTemplateLiteral(["Ode to Booze"])))) > 1) {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.drinksilent)(2, (0,libram__WEBPACK_IMPORTED_MODULE_1__.$item)(_templateObject20 || (_templateObject20 = _taggedTemplateLiteral(["sacramento wine"]))));
  } else {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.useSkill)((0,libram__WEBPACK_IMPORTED_MODULE_1__.$skill)(_templateObject21 || (_templateObject21 = _taggedTemplateLiteral(["The Ode to Booze"]))), 1);
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.drinksilent)(2, (0,libram__WEBPACK_IMPORTED_MODULE_1__.$item)(_templateObject22 || (_templateObject22 = _taggedTemplateLiteral(["sacramento wine"]))));
  }
}

if (!(0,libram__WEBPACK_IMPORTED_MODULE_2__.get)("_distentionPillUsed")) {
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.use)(1, (0,libram__WEBPACK_IMPORTED_MODULE_1__.$item)(_templateObject23 || (_templateObject23 = _taggedTemplateLiteral(["distention pill"]))));
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.eatsilent)(1, (0,libram__WEBPACK_IMPORTED_MODULE_1__.$item)(_templateObject24 || (_templateObject24 = _taggedTemplateLiteral(["jumping horseradish"]))));
} // Ensure you have asdon driving observantly all day. Requires Ezandora's
//   asdonmartin script, I believe, although I'm not positive.


while ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.haveEffect)((0,libram__WEBPACK_IMPORTED_MODULE_1__.$effect)(_templateObject25 || (_templateObject25 = _taggedTemplateLiteral(["Driving Observantly"])))) < calculateFarmingTurns()) {
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.cliExecute)("asdonmartin fuel 7 loaf of soda bread");
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.cliExecute)("asdonmartin drive observantly");
} // using half a purse, so get 450 turns of smithsness whatever


while ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.haveEffect)((0,libram__WEBPACK_IMPORTED_MODULE_1__.$effect)(_templateObject26 || (_templateObject26 = _taggedTemplateLiteral(["Merry Smithsness"])))) < calculateFarmingTurns()) {
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.use)(1, (0,libram__WEBPACK_IMPORTED_MODULE_1__.$item)(_templateObject27 || (_templateObject27 = _taggedTemplateLiteral(["Flaskfull of Hollow"]))));
}

while ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.haveEffect)((0,libram__WEBPACK_IMPORTED_MODULE_1__.$effect)(_templateObject28 || (_templateObject28 = _taggedTemplateLiteral(["How to Scam Tourists"])))) < calculateFarmingTurns()) {
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.use)(1, (0,libram__WEBPACK_IMPORTED_MODULE_1__.$item)(_templateObject29 || (_templateObject29 = _taggedTemplateLiteral(["how to avoid scams"]))));
}

while ((0,libram__WEBPACK_IMPORTED_MODULE_2__.get)("_sourceTerminalEnhanceUses") < 3) {
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.cliExecute)("terminal enhance meat.enh");
}

while ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.haveEffect)((0,libram__WEBPACK_IMPORTED_MODULE_1__.$effect)(_templateObject30 || (_templateObject30 = _taggedTemplateLiteral(["polka of plenty"])))) < calculateFarmingTurns()) {
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.useSkill)((0,libram__WEBPACK_IMPORTED_MODULE_1__.$skill)(_templateObject31 || (_templateObject31 = _taggedTemplateLiteral(["polka of plenty"]))), 5);
}

while ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.haveEffect)((0,libram__WEBPACK_IMPORTED_MODULE_1__.$effect)(_templateObject32 || (_templateObject32 = _taggedTemplateLiteral(["Disco Leer"])))) < calculateFarmingTurns()) {
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.useSkill)((0,libram__WEBPACK_IMPORTED_MODULE_1__.$skill)(_templateObject33 || (_templateObject33 = _taggedTemplateLiteral(["Disco Leer"]))), 5);
}

while ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.haveEffect)((0,libram__WEBPACK_IMPORTED_MODULE_1__.$effect)(_templateObject34 || (_templateObject34 = _taggedTemplateLiteral(["Singer's Faithful Ocelot"], ["Singer\\'s Faithful Ocelot"])))) < calculateFarmingTurns()) {
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.useSkill)((0,libram__WEBPACK_IMPORTED_MODULE_1__.$skill)(_templateObject35 || (_templateObject35 = _taggedTemplateLiteral(["Singer's Faithful Ocelot"], ["Singer\\'s Faithful Ocelot"]))), 5);
}

while ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.haveEffect)((0,libram__WEBPACK_IMPORTED_MODULE_1__.$effect)(_templateObject36 || (_templateObject36 = _taggedTemplateLiteral(["Fat Leon's Phat Loot Lyric"], ["Fat Leon\\'s Phat Loot Lyric"])))) < calculateFarmingTurns()) {
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.useSkill)((0,libram__WEBPACK_IMPORTED_MODULE_1__.$skill)(_templateObject37 || (_templateObject37 = _taggedTemplateLiteral(["Fat Leon's Phat Loot Lyric"], ["Fat Leon\\'s Phat Loot Lyric"]))), 5);
}

if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myClass)() == (0,libram__WEBPACK_IMPORTED_MODULE_1__.$class)(_templateObject38 || (_templateObject38 = _taggedTemplateLiteral(["pastamancer"])))) {
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.useSkill)((0,libram__WEBPACK_IMPORTED_MODULE_1__.$skill)(_templateObject39 || (_templateObject39 = _taggedTemplateLiteral(["Bind Lasagmbie"]))));
}

if (!(0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.haveEffect)((0,libram__WEBPACK_IMPORTED_MODULE_1__.$effect)(_templateObject40 || (_templateObject40 = _taggedTemplateLiteral(["meet the meat"])))) && !(0,libram__WEBPACK_IMPORTED_MODULE_2__.get)("_clanFortuneBuffUsed")) {
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.cliExecute)("fortune buff meat");
} // get Unencumbered for +item


if (!(0,libram__WEBPACK_IMPORTED_MODULE_2__.get)("_daycareSpa")) {
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.visitUrl)("/place.php?whichplace=town_wrong&action=townwrong_boxingdaycare");
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.runChoice)(2);
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.runChoice)(3);
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.runChoice)(4);
}

while ((0,libram__WEBPACK_IMPORTED_MODULE_2__.get)("_kgbClicksUsed") < 21) {
  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.haveEffect)((0,libram__WEBPACK_IMPORTED_MODULE_1__.$effect)(_templateObject41 || (_templateObject41 = _taggedTemplateLiteral(["A View to some Meat"])))) == 0) {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.cliExecute)("briefcase buff identify");
  } else if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.haveEffect)((0,libram__WEBPACK_IMPORTED_MODULE_1__.$effect)(_templateObject42 || (_templateObject42 = _taggedTemplateLiteral(["A View to some Meat"])))) != 0) {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.cliExecute)("briefcase buff meat");
  }
} // should have charged pantsgiving in breakfast script, get that fullness when getting pirate outfit


if ((0,libram__WEBPACK_IMPORTED_MODULE_2__.get)("_pantsgivingCount") > 4 && (0,libram__WEBPACK_IMPORTED_MODULE_2__.get)("_pantsgivingFullness") == 0) {
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.takeStash)(1, (0,libram__WEBPACK_IMPORTED_MODULE_1__.$item)(_templateObject43 || (_templateObject43 = _taggedTemplateLiteral(["pantsgiving"]))));
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_1__.$item)(_templateObject44 || (_templateObject44 = _taggedTemplateLiteral(["pantsgiving"]))));
}

while ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_1__.$item)(_templateObject45 || (_templateObject45 = _taggedTemplateLiteral(["Li'l pirate costume"], ["Li\\'l pirate costume"])))) < 1) {
  (0,libram__WEBPACK_IMPORTED_MODULE_3__.adventureMacro)((0,libram__WEBPACK_IMPORTED_MODULE_1__.$location)(_templateObject46 || (_templateObject46 = _taggedTemplateLiteral(["Pirates of the Garbage Barges"]))), libram__WEBPACK_IMPORTED_MODULE_3__.Macro.trySkill((0,libram__WEBPACK_IMPORTED_MODULE_1__.$skill)(_templateObject47 || (_templateObject47 = _taggedTemplateLiteral(["gingerbread mob hit"])))).trySkill((0,libram__WEBPACK_IMPORTED_MODULE_1__.$skill)(_templateObject48 || (_templateObject48 = _taggedTemplateLiteral(["saucestorm"])))).repeat());
}

if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_1__.$item)(_templateObject49 || (_templateObject49 = _taggedTemplateLiteral(["pantsgiving"])))) > 0) {
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_1__.$item)(_templateObject50 || (_templateObject50 = _taggedTemplateLiteral(["none"]))), (0,libram__WEBPACK_IMPORTED_MODULE_1__.$slot)(_templateObject51 || (_templateObject51 = _taggedTemplateLiteral(["pants"]))));
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.putStash)(1, (0,libram__WEBPACK_IMPORTED_MODULE_1__.$item)(_templateObject52 || (_templateObject52 = _taggedTemplateLiteral(["pantsgiving"]))));
}

if ((0,libram__WEBPACK_IMPORTED_MODULE_2__.get)("_pantsgivingFullness") === 1) {
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.eatsilent)(1, (0,libram__WEBPACK_IMPORTED_MODULE_1__.$item)(_templateObject53 || (_templateObject53 = _taggedTemplateLiteral(["jumping horseradish"]))));
}

(0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.useFamiliar)((0,libram__WEBPACK_IMPORTED_MODULE_1__.$familiar)(_templateObject54 || (_templateObject54 = _taggedTemplateLiteral(["trick-or-treating tot"]))));

if ((0,libram__WEBPACK_IMPORTED_MODULE_2__.get)("_mummeryMods") !== "Meat Drop: [30*fam(Trick-or-Treating Tot)],") {
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.cliExecute)("mummery meat");
}

(0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_1__.$item)(_templateObject55 || (_templateObject55 = _taggedTemplateLiteral(["Li'l pirate costume"], ["Li\\'l pirate costume"]))));

if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_1__.$item)(_templateObject56 || (_templateObject56 = _taggedTemplateLiteral(["buddy bjorn"])))) == 0) {
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.takeStash)((0,libram__WEBPACK_IMPORTED_MODULE_1__.$item)(_templateObject57 || (_templateObject57 = _taggedTemplateLiteral(["buddy bjorn"]))), 1);
}
/*
if (availableAmount($item`haiku katana`) == 0) {
    takeStash($item`haiku katana`, 1);
}
*/


(0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.cliExecute)("fold wad of used tape");
(0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_1__.$item)(_templateObject58 || (_templateObject58 = _taggedTemplateLiteral(["wad of used tape"]))));
(0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_1__.$item)(_templateObject59 || (_templateObject59 = _taggedTemplateLiteral(["buddy bjorn"]))));
(0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_1__.$item)(_templateObject60 || (_templateObject60 = _taggedTemplateLiteral(["duct tape shirt"]))));
(0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_1__.$item)(_templateObject61 || (_templateObject61 = _taggedTemplateLiteral(["garbage sticker"])))); // equip($item`haiku katana`);

(0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_1__.$item)(_templateObject62 || (_templateObject62 = _taggedTemplateLiteral(["half a purse"]))));
(0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_1__.$item)(_templateObject63 || (_templateObject63 = _taggedTemplateLiteral(["pantogram pants"]))));
(0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_1__.$item)(_templateObject64 || (_templateObject64 = _taggedTemplateLiteral(["lucky gold ring"]))), (0,libram__WEBPACK_IMPORTED_MODULE_1__.$slot)(_templateObject65 || (_templateObject65 = _taggedTemplateLiteral(["acc1"]))));
(0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_1__.$item)(_templateObject66 || (_templateObject66 = _taggedTemplateLiteral(["mafia thumb ring"]))), (0,libram__WEBPACK_IMPORTED_MODULE_1__.$slot)(_templateObject67 || (_templateObject67 = _taggedTemplateLiteral(["acc2"]))));
(0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_1__.$item)(_templateObject68 || (_templateObject68 = _taggedTemplateLiteral(["cheap sunglasses"]))), (0,libram__WEBPACK_IMPORTED_MODULE_1__.$slot)(_templateObject69 || (_templateObject69 = _taggedTemplateLiteral(["acc3"])))); // equip($item`mafia pointer finger ring`, $slot`acc3`);

(0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.bjornifyFamiliar)((0,libram__WEBPACK_IMPORTED_MODULE_1__.$familiar)(_templateObject70 || (_templateObject70 = _taggedTemplateLiteral(["golden monkey"])))); // fax embezzler, profchain, digitize, wink?
// maybe set it to use pantsgiving for first 50 turns, then eat horseradish, then switch to pantogram

while ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myAdventures)() > 1 && (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.haveEffect)((0,libram__WEBPACK_IMPORTED_MODULE_1__.$effect)(_templateObject71 || (_templateObject71 = _taggedTemplateLiteral(["synthesis: greed"])))) > 1) {
  (0,libram__WEBPACK_IMPORTED_MODULE_3__.adventureMacroAuto)((0,libram__WEBPACK_IMPORTED_MODULE_1__.$location)(_templateObject72 || (_templateObject72 = _taggedTemplateLiteral(["barf mountain"]))), libram__WEBPACK_IMPORTED_MODULE_3__.Macro.externalIf(!(0,libram__WEBPACK_IMPORTED_MODULE_4__.have)((0,libram__WEBPACK_IMPORTED_MODULE_1__.$effect)(_templateObject73 || (_templateObject73 = _taggedTemplateLiteral(["On the Trail"])))), libram__WEBPACK_IMPORTED_MODULE_3__.Macro.if_("monstername garbage tourist", libram__WEBPACK_IMPORTED_MODULE_3__.Macro.skill((0,libram__WEBPACK_IMPORTED_MODULE_1__.$skill)(_templateObject74 || (_templateObject74 = _taggedTemplateLiteral(["curse of weaksauce"])))).skill((0,libram__WEBPACK_IMPORTED_MODULE_1__.$skill)(_templateObject75 || (_templateObject75 = _taggedTemplateLiteral(["transcendent olfaction"])))).skill((0,libram__WEBPACK_IMPORTED_MODULE_1__.$skill)(_templateObject76 || (_templateObject76 = _taggedTemplateLiteral(["Gallapagosian Mating Call"])))).skill((0,libram__WEBPACK_IMPORTED_MODULE_1__.$skill)(_templateObject77 || (_templateObject77 = _taggedTemplateLiteral(["sing along"])))).skill((0,libram__WEBPACK_IMPORTED_MODULE_1__.$skill)(_templateObject78 || (_templateObject78 = _taggedTemplateLiteral(["candyblast"])))).repeat())).skill((0,libram__WEBPACK_IMPORTED_MODULE_1__.$skill)(_templateObject79 || (_templateObject79 = _taggedTemplateLiteral(["curse of weaksauce"])))).skill((0,libram__WEBPACK_IMPORTED_MODULE_1__.$skill)(_templateObject80 || (_templateObject80 = _taggedTemplateLiteral(["sing along"])))).skill((0,libram__WEBPACK_IMPORTED_MODULE_1__.$skill)(_templateObject81 || (_templateObject81 = _taggedTemplateLiteral(["candyblast"])))).repeat());
}

(0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.setAutoAttack)(0);
/* 
while ((myAdventures() > 1) && (haveEffect($effect`synthesis: greed`) > 1)) {
    adventureMacroAuto(
          $location`barf mountain`,
          Macro.externalIf(
            !have($effect`On the Trail`),
            Macro.if_(
              'monstername garbage tourist',
              Macro.skill($skill`curse of weaksauce`)
                .skill($skill`transcendent olfaction`)
                .skill($skill`Gallapagosian Mating Call`)
                .skill($skill`sing along`)
                .skill($skill`summer siesta`)
                .skill($skill`candyblast`)
                .repeat()
            )
          )
            .skill($skill`curse of weaksauce`)
            .skill($skill`sing along`)
            .skill($skill`summer siesta`)
            .skill($skill`candyblast`)
            .repeat()
        );
}
*/
// end of day shit

(0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_1__.$item)(_templateObject82 || (_templateObject82 = _taggedTemplateLiteral(["none"]))), (0,libram__WEBPACK_IMPORTED_MODULE_1__.$slot)(_templateObject83 || (_templateObject83 = _taggedTemplateLiteral(["back"]))));
(0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_1__.$item)(_templateObject84 || (_templateObject84 = _taggedTemplateLiteral(["none"]))), (0,libram__WEBPACK_IMPORTED_MODULE_1__.$slot)(_templateObject85 || (_templateObject85 = _taggedTemplateLiteral(["weapon"]))));

if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_1__.$item)(_templateObject86 || (_templateObject86 = _taggedTemplateLiteral(["haiku katana"])))) > 0) {
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.putStash)((0,libram__WEBPACK_IMPORTED_MODULE_1__.$item)(_templateObject87 || (_templateObject87 = _taggedTemplateLiteral(["haiku katana"]))), 1);
}

if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_1__.$item)(_templateObject88 || (_templateObject88 = _taggedTemplateLiteral(["buddy bjorn"])))) > 0) {
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.putStash)((0,libram__WEBPACK_IMPORTED_MODULE_1__.$item)(_templateObject89 || (_templateObject89 = _taggedTemplateLiteral(["buddy bjorn"]))), 1);
} // make cornucopias, this uses a mafia alias


while ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_1__.$item)(_templateObject90 || (_templateObject90 = _taggedTemplateLiteral(["Pok\xE9-Gro fertilizer"])))) > 1) {
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.cliExecute)("grow");
}

if ((0,libram__WEBPACK_IMPORTED_MODULE_2__.get)("boomBoxSong") != "Food Vibrations") {
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.cliExecute)("boombox food");
}

(0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.autosell)((0,libram__WEBPACK_IMPORTED_MODULE_1__.$item)(_templateObject91 || (_templateObject91 = _taggedTemplateLiteral(["cheap sunglasses"]))), (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_1__.$item)(_templateObject92 || (_templateObject92 = _taggedTemplateLiteral(["cheap sunglasses"])))) - 1);
(0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.autosell)((0,libram__WEBPACK_IMPORTED_MODULE_1__.$item)(_templateObject93 || (_templateObject93 = _taggedTemplateLiteral(["filthy child leash"]))), (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_1__.$item)(_templateObject94 || (_templateObject94 = _taggedTemplateLiteral(["filthy child leash"])))));
(0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.use)((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_1__.$item)(_templateObject95 || (_templateObject95 = _taggedTemplateLiteral(["bag of park garbage"])))) - 30, (0,libram__WEBPACK_IMPORTED_MODULE_1__.$item)(_templateObject96 || (_templateObject96 = _taggedTemplateLiteral(["bag of park garbage"]))));
(0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.use)((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_1__.$item)(_templateObject97 || (_templateObject97 = _taggedTemplateLiteral(["Gathered Meat-Clip"])))), (0,libram__WEBPACK_IMPORTED_MODULE_1__.$item)(_templateObject98 || (_templateObject98 = _taggedTemplateLiteral(["Gathered Meat-Clip"]))));
(0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.autosell)((0,libram__WEBPACK_IMPORTED_MODULE_1__.$item)(_templateObject99 || (_templateObject99 = _taggedTemplateLiteral(["expensive camera"]))), (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_1__.$item)(_templateObject100 || (_templateObject100 = _taggedTemplateLiteral(["expensive camera"])))));
(0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.autosell)((0,libram__WEBPACK_IMPORTED_MODULE_1__.$item)(_templateObject101 || (_templateObject101 = _taggedTemplateLiteral(["bag of gross foreign snacks"]))), (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_1__.$item)(_templateObject102 || (_templateObject102 = _taggedTemplateLiteral(["bag of gross foreign snacks"])))));
(0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.putShop)(300, 0, (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_1__.$item)(_templateObject103 || (_templateObject103 = _taggedTemplateLiteral(["gold nuggets"])))), (0,libram__WEBPACK_IMPORTED_MODULE_1__.$item)(_templateObject104 || (_templateObject104 = _taggedTemplateLiteral(["gold nuggets"]))));
(0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.putShop)(0, 0, (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_1__.$item)(_templateObject105 || (_templateObject105 = _taggedTemplateLiteral(["cornucopia"])))), (0,libram__WEBPACK_IMPORTED_MODULE_1__.$item)(_templateObject106 || (_templateObject106 = _taggedTemplateLiteral(["cornucopia"])))); // check if I have over 200 funfunds, and buy/mall a pass if so

/*
if (availableAmount($item`8205`) > 200) { 
    buy($coinmaster`The Dinsey Company Store`, 1, $item`one-day ticket to dinseylandfill`);
    putShop(0, 0, $item`one-day ticket to dinseylandfill`);
}
*/

/***/ }),

/***/ "kolmafia":
/*!***************************!*\
  !*** external "kolmafia" ***!
  \***************************/
/*! dynamic exports */
/*! export __esModule [maybe provided (runtime-defined)] [no usage info] [provision prevents renaming (no use info)] */
/*! other exports [maybe provided (runtime-defined)] [no usage info] */
/*! runtime requirements: module */
/***/ ((module) => {

module.exports = require("kolmafia");;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
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
/******/ 				() => module['default'] :
/******/ 				() => module;
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
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
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
/******/ 	// module exports must be returned from runtime so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__("./src/main.ts");
/******/ })()

));