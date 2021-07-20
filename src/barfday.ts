import {
  autosell,
  availableAmount,
  bjornifyFamiliar,
  buy,
  chew,
  cliExecute,
  drinksilent,
  eatsilent,
  equip,
  fullnessLimit,
  getClanId,
  getFuel,
  getProperty,
  haveEffect,
  inebrietyLimit,
  itemAmount,
  myAdventures,
  myClass,
  myFullness,
  myInebriety,
  mySpleenUse,
  print,
  putCloset,
  putShop,
  putStash,
  retrieveItem,
  runChoice,
  setAutoAttack,
  spleenLimit,
  sweetSynthesis,
  takeStash,
  toInt,
  use,
  useFamiliar,
  useSkill,
  visitUrl,
} from "kolmafia";
import {
  $class,
  $effect,
  $familiar,
  $item,
  $items,
  $location,
  $monster,
  $skill,
  $slot,
  adventureMacroAuto,
  get,
  have,
  Macro,
  Witchess,
} from "libram";
import { embezzlerChain, gingerBread } from "./lib";

export function calculateFarmingTurns(): number {
  // Assess farming turns given available resources. Currently
  //   just going to use an approximation; I'm making this a
  //   function so that I can make it more effective later!
  //  for now, need to figure out diet/spleen for 510 turns
  if (inebrietyLimit() === 20) {
    return 540;
  } else {
    return 510;
  }
}

if (getClanId() !== 40382) {
  cliExecute("/whitelist alliance from hell");
}

setAutoAttack(0);

if (availableAmount($item`pantogram pants`) === 0) {
  cliExecute("acquire 1 porquoise");
  use($item`disassembled clover`);
  cliExecute("pantogram high meat|hilarity|silent");
}
if (get("boomBoxSong") !== "Total Eclipse of Your Meat") {
  cliExecute("boombox meat");
}

if (itemAmount($item`hobo nickel`) > 0) {
  putCloset(itemAmount($item`hobo nickel`), $item`hobo nickel`);
}

while (
  haveEffect($effect`synthesis: greed`) < calculateFarmingTurns() &&
  mySpleenUse() < spleenLimit()
) {
  sweetSynthesis($item`box of Dweebs`, $item`PEEZ dispenser`);
}

if (myFullness() === 0) {
  useSkill($skill`cheat code: triple size`, 1);
  use($item`milk of magnesium`);
  eatsilent(3, $item`ol' scratch's salad fork`);
  eatsilent(3, $item`extra-greasy slider`);
  chew(5, $item`voodoo snuff`);
  // chew(1, $item`antimatter wad`);
  // chew(1, $item`beggin\' cologne`);
}

if (myInebriety() === 0) {
  useSkill($skill`ode to booze`, 2);
  drinksilent(3, $item`frosty\'s frosty mug`);
  drinksilent(3, $item`jar of fermented pickle juice`);
  chew(4, $item`voodoo snuff`);
  sweetSynthesis($item`box of Dweebs`, $item`PEEZ dispenser`);
  sweetSynthesis($item`box of Dweebs`, $item`PEEZ dispenser`);
  sweetSynthesis($item`box of Dweebs`, $item`PEEZ dispenser`);
  if (inebrietyLimit() === 20 && myInebriety() === 15) {
    drinksilent(1, $item`frosty\'s frosty mug`);
    drinksilent(1, $item`jar of fermented pickle juice`);
    chew(1, $item`voodoo snuff`);
    sweetSynthesis($item`box of Dweebs`, $item`PEEZ dispenser`);
    sweetSynthesis($item`box of Dweebs`, $item`PEEZ dispenser`);
  }
}

if (
  mySpleenUse() === spleenLimit() &&
  haveEffect($effect`eau d\' clochard`) === 0 &&
  get("currentMojoFilters") < 3
) {
  retrieveItem($item`mojo filter`);
  use($item`mojo filter`);
  retrieveItem($item`beggin\' cologne`);
  use($item`beggin\' cologne`);
}

if (get("_loveChocolatesUsed") === 0) {
  use($item`LOV extraterrestrial chocolate`);
}

if (!get("_borrowedTimeUsed")) {
  use($item`Borrowed Time`);
}

// TODO: essential tofu (with price limit)
if (get("_essentialTofuUsed") === false) {
  buy(1, $item`essential tofu`, 5000);
  use($item`essential tofu`);
}

//should probably put all this under individual if statements
if (!get("_mimeArmyShotglassUsed") && !get("_syntheticDogHairPillUsed")) {
  use(1, $item`synthetic doghair pill`);
  equip($item`mafia pinky ring`);
  if (haveEffect($effect`Ode to Booze`) > 1) {
    drinksilent(2, $item`sacramento wine`);
  } else {
    useSkill($skill`The Ode to Booze`, 1);
    drinksilent(2, $item`sacramento wine`);
  }
}

if (get("_sausagesEaten") === 0) {
  eatsilent(20, $item`magical sausage`);
}

// Ensure you have asdon driving observantly all day. Requires Ezandora's
//   asdonmartin script, I believe, although I'm not positive.
while (
  // getWorkshed().containsText("asdon") &&
  getFuel() < (calculateFarmingTurns() / 30) * 37 &&
  haveEffect($effect`Driving Observantly`) < calculateFarmingTurns()
) {
  cliExecute("asdonmartin fuel 1 pie man was not meant to eat");
}

// ash import AsdonMartinGUI.ash; asdonFuelUpTo(xxx);

while (haveEffect($effect`Driving Observantly`) < calculateFarmingTurns()) {
  cliExecute("asdonmartin drive observantly");
}
/*
// using half a purse, so get 450 turns of smithsness whatever
while (haveEffect($effect`Merry Smithsness`) < calculateFarmingTurns()) {
  use(1, $item`Flaskfull of Hollow`);
}
*/
while (haveEffect($effect`How to Scam Tourists`) < calculateFarmingTurns()) {
  use(1, $item`how to avoid scams`);
}

while (get("_sourceTerminalEnhanceUses") < 3) {
  cliExecute("terminal enhance meat.enh");
}

while (haveEffect($effect`polka of plenty`) < calculateFarmingTurns()) {
  useSkill($skill`polka of plenty`, 5);
}

while (haveEffect($effect`Disco Leer`) < calculateFarmingTurns()) {
  useSkill($skill`Disco Leer`, 5);
}

while (haveEffect($effect`Singer\'s Faithful Ocelot`) < calculateFarmingTurns()) {
  useSkill($skill`Singer\'s Faithful Ocelot`, 5);
}
// MP refill
if (get("_sausagesEaten") === 20) {
  eatsilent(3, $item`magical sausage`);
}

while (haveEffect($effect`Fat Leon\'s Phat Loot Lyric`) < calculateFarmingTurns()) {
  useSkill($skill`Fat Leon\'s Phat Loot Lyric`, 5);
}

while (haveEffect($effect`leash of linguini`) < calculateFarmingTurns()) {
  useSkill($skill`leash of linguini`, 5);
}

while (haveEffect($effect`empathy`) < calculateFarmingTurns()) {
  useSkill($skill`empathy of the newt`, 5);
}

while (haveEffect($effect`blood bond`) < calculateFarmingTurns()) {
  useSkill($skill`cannelloni cocoon`);
  useSkill($skill`blood bond`, 10);
}

while (get("_poolGames") < 3) {
  cliExecute("pool aggressive");
}

if (myClass() === $class`pastamancer`) {
  useSkill($skill`Bind Lasagmbie`);
}

if (!haveEffect($effect`meet the meat`) && !get("_clanFortuneBuffUsed")) {
  cliExecute("fortune buff meat");
}

// get Unencumbered for +item
if (!get("_daycareSpa")) {
  visitUrl("/place.php?whichplace=town_wrong&action=townwrong_boxingdaycare");
  runChoice(2);
  runChoice(3);
  runChoice(4);
}

gingerBread();

while (get("_kgbClicksUsed") < 21) {
  if (haveEffect($effect`A View to some Meat`) === 0) {
    cliExecute("briefcase buff identify");
  } else if (haveEffect($effect`A View to some Meat`) !== 0) {
    cliExecute("briefcase buff meat");
  }
}
// TODO: robort changes a lot of this. might fight something for a good drop while getting pantsgiving full?
// should have charged pantsgiving in breakfast script, get that fullness when getting pirate outfit
if (get("_pantsgivingCount") > 4 && get("_pantsgivingFullness") === 0) {
  takeStash(1, $item`pantsgiving`);
  equip($item`pantsgiving`);
}
/*
while (availableAmount($item`Li\'l pirate costume`) < 1) {
  adventureMacro(
    $location`Pirates of the Garbage Barges`,
    Macro.trySkill($skill`gingerbread mob hit`)
      .trySkill($skill`saucestorm`)
      .repeat()
  );
} */

if (get("_witchessFights") < 5) {
  Witchess.fightPiece($monster`Witchess Knight`);
}

if (availableAmount($item`pantsgiving`) > 0) {
  equip($item`none`, $slot`pants`);
  putStash(1, $item`pantsgiving`);
}

if (get("_pantsgivingFullness") === 1 && myFullness() < fullnessLimit()) {
  if (!get("_distentionPillUsed")) {
    use(1, $item`distention pill`);
    eatsilent(1, $item`tin cup of mulligan stew`);
  } else {
    eatsilent(1, $item`jumping horseradish`);
  }
}

if (itemAmount($item`amulet coin`) === 0) {
  useFamiliar($familiar`cornbeefadon`);
  use($item`box of familiar jacks`, 1);
}

useFamiliar($familiar`robortender`);
equip($item`amulet coin`);

for (const drink of $items`Newark, drive-by shooting, Feliz Navidad, single entendre`) {
  if (get("_roboDrinks").includes(drink.name)) continue;
  useFamiliar($familiar`robortender`);
  if (itemAmount(drink) === 0) retrieveItem(1, drink);
  print(`Feeding robortender ${drink}.`, "blue");
  visitUrl(`inventory.php?action=robooze&which=1&whichitem=${toInt(drink)}`);
}

if (get("_mummeryMods") !== "Meat Drop: [30*fam(Robortender)],") {
  cliExecute("mummery meat");
}

// equip($item`Li\'l pirate costume`);

// TODO: buff up more for this
if (haveEffect($effect`greedy resolve`) === 0) {
  use(1, $item`resolution: be wealthier`);
}

embezzlerChain();

// useFamiliar($familiar`trick-or-treating tot`);

/*
// figure out digitize that doesn't break mafia
Macro.externalIf(
  get("_sourceTerminalDigitizeMonster") != $monster`Knob Goblin Embezzler` &&
    get("_sourceTerminalDigitizeUses") < 3,
  Macro.trySkill($skill`digitize`)
)
*/

setAutoAttack(0);
useFamiliar($familiar`robortender`);

if (get("_saberMod") === 0) {
  visitUrl("main.php?action=may4");
  runChoice(4);
} else if (get("_saberMod") !== 4) {
  throw "Your saber isn't set to famwt.";
}

if (availableAmount($item`buddy bjorn`) === 0) {
  takeStash($item`buddy bjorn`, 1);
}

if (availableAmount($item`haiku katana`) === 0) {
  takeStash($item`haiku katana`, 1);
}

cliExecute("fold wad of used tape");
// TODO: switch to some famwt, possibly for offhand and pants. hat if level is high, but probably not
equip($item`wad of used tape`);
equip($item`buddy bjorn`);
equip($item`duct tape shirt`);
// equip($item`garbage sticker`);
equip($item`haiku katana`);
// equip($item`half a purse`);
equip($item`fourth of may cosplay saber`, $slot`offhand`);
equip($item`pantogram pants`);
equip($item`lucky gold ring`, $slot`acc1`);
equip($item`mafia thumb ring`, $slot`acc2`);
// equip($item`cheap sunglasses`, $slot`acc3`);
equip($item`mafia pointer finger ring`, $slot`acc3`);

bjornifyFamiliar($familiar`golden monkey`);

// fax embezzler, profchain, digitize, wink?

equip($item`backup camera`, $slot`acc1`);
cliExecute("backupcamera meat");

while (
  get("_backUpUses") < 10 &&
  getProperty("lastCopyableMonster") === $monster`Knob Goblin Embezzler`.name
) {
  adventureMacroAuto(
    $location`noob cave`,
    Macro.trySkill($skill`back-up to your last enemy`)
      .trySkill($skill`sing along`)
      .skill($skill`summer siesta`)
      .trySkillRepeat($skill`candyblast`)
  );
}

setAutoAttack(0);

if (
  get("_backUpUses") === 10 &&
  getProperty("lastCopyableMonster") === $monster`Knob Goblin Embezzler`.name
) {
  useFamiliar($familiar`reanimated reanimator`);
  adventureMacroAuto(
    $location`noob cave`,
    Macro.trySkill($skill`back-up to your last enemy`)
      .trySkill($skill`digitize`)
      .trySkill($skill`7168`) // wink
      .trySkill($skill`sing along`)
      .skill($skill`summer siesta`)
      .trySkillRepeat($skill`candyblast`)
  );
  setAutoAttack(0);
}

equip($item`lucky gold ring`, $slot`acc1`);
// useFamiliar($familiar`trick-or-treating tot`);
useFamiliar($familiar`robortender`);

// maybe set it to use pantsgiving for first 50 turns, then eat horseradish, then switch to pantogram
/*
while (myAdventures() > 1 && haveEffect($effect`synthesis: greed`) > 1) {
  adventureMacroAuto(
    $location`barf mountain`,
    Macro.externalIf(
      !have($effect`On the Trail`),
      Macro.if_(
        "monstername garbage tourist",
        Macro.skill($skill`curse of weaksauce`)
          .skill($skill`transcendent olfaction`)
          .skill($skill`Gallapagosian Mating Call`)
          .skill($skill`sing along`)
          .skill($skill`candyblast`)
          .repeat()
      )
    )
      .skill($skill`curse of weaksauce`)
      .skill($skill`sing along`)
      .skill($skill`candyblast`)
      .repeat()
  );
}

setAutoAttack(0);
*/

while (myAdventures() > 1 && haveEffect($effect`synthesis: greed`) > 1) {
  adventureMacroAuto(
    $location`barf mountain`,
    Macro.externalIf(
      !have($effect`On the Trail`),
      Macro.if_(
        "monstername garbage tourist",
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
setAutoAttack(0);

// end of day shit

equip($item`none`, $slot`back`);
equip($item`none`, $slot`weapon`);

if (availableAmount($item`haiku katana`) > 0) {
  putStash($item`haiku katana`, 1);
}

if (availableAmount($item`buddy bjorn`) > 0) {
  putStash($item`buddy bjorn`, 1);
}

// make cornucopias, this uses a mafia alias
while (availableAmount($item`Poké-Gro fertilizer`) > 1) {
  cliExecute("grow");
}

if (get("boomBoxSong") !== "Food Vibrations") {
  cliExecute("boombox food");
}

autosell($item`cheap sunglasses`, availableAmount($item`cheap sunglasses`) - 1);
autosell($item`filthy child leash`, availableAmount($item`filthy child leash`));
use(availableAmount($item`bag of park garbage`) - 30, $item`bag of park garbage`);
use(availableAmount($item`Gathered Meat-Clip`), $item`Gathered Meat-Clip`);
autosell($item`expensive camera`, availableAmount($item`expensive camera`));
autosell($item`bag of gross foreign snacks`, availableAmount($item`bag of gross foreign snacks`));
putShop(300, 0, availableAmount($item`gold nuggets`), $item`gold nuggets`);
putShop(0, 0, availableAmount($item`cornucopia`), $item`cornucopia`);
putShop(0, 0, availableAmount($item`elemental sugarcube`), $item`elemental sugarcube`);
autosell($item`meat stack`, itemAmount($item`meat stack`));
