import {
  buy,
  chatPrivate,
  chew,
  cliExecute,
  containsText,
  drinksilent,
  eatsilent,
  equip,
  getClanId,
  getProperty,
  haveEffect,
  itemAmount,
  maximize,
  myFullness,
  myInebriety,
  retrieveItem,
  setAutoAttack,
  takeCloset,
  use,
  useFamiliar,
  useSkill,
  wait,
} from "kolmafia";
import {
  $effect,
  $familiar,
  $item,
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

function hoboPrep() {
  if (getClanId() !== 40382) {
    cliExecute("/whitelist alliance from hell");
  }

  if (get("boomBoxSong") !== "Food Vibrations") {
    cliExecute("boombox food");
  }

  if (itemAmount($item`hobo nickel`) < 40) {
    takeCloset(itemAmount($item`hobo nickel`), $item`hobo nickel`);
    retrieveItem(40, $item`hobo nickel`);
  }

  if (!get("_borrowedTimeUsed")) {
    use($item`Borrowed Time`);
  }

  if (get("_sausagesEaten") === 0) {
    eatsilent(20, $item`magical sausage`);
  }

  if (myFullness() === 0 && myInebriety() === 0) {
    chew(5, $item`voodoo snuff`);
    useSkill($skill`cheat code: triple size`, 1);
    use($item`milk of magnesium`);
    eatsilent(2, $item`ol' scratch's salad fork`);
    eatsilent(2, $item`extra-greasy slider`);
    useSkill($skill`ode to booze`, 1);
    drinksilent(1, $item`frosty\'s frosty mug`);
    drinksilent(1, $item`jar of fermented pickle juice`);
    chew(5, $item`voodoo snuff`);
    // chew(1, $item`antimatter wad`);
    // chew(1, $item`beggin\' cologne`);
    if (myFullness() === 10 && myInebriety() === 5) {
      useSkill($skill`ode to booze`, 1);
      drinksilent(1, $item`frosty\'s frosty mug`);
      drinksilent(1, $item`jar of fermented pickle juice`);
      chew(1, $item`voodoo snuff`);
      chew(1, $item`antimatter wad`);
    }
  }

  // buy and use essential tofu (with price limit)
  if (get("_essentialTofuUsed") === false) {
    buy(1, $item`essential tofu`, 5000);
    use($item`essential tofu`);
  }

  //should probably put all this under individual if statements
  if (!get("_mimeArmyShotglassUsed") && !get("_syntheticDogHairPillUsed")) {
    useSkill($skill`ode to booze`, 1);
    use(1, $item`synthetic doghair pill`);
    equip($item`mafia pinky ring`);
    drinksilent(2, $item`sacramento wine`);
  }

  if (
    !get("_photocopyUsed") &&
    !have($item`photocopied monster`) &&
    getProperty("lastCopyableMonster") !== $monster`black crayon crimbo elf`.name
  ) {
    chatPrivate("cheesefax", "Black Crayon Crimbo Elf");
    for (let i = 0; i < 3; i++) {
      wait(10);
      cliExecute("fax receive");
      if (get("photocopyMonster") !== $monster`black crayon crimbo elf`) {
        throw "Failed to acquire photocopied black crayon crimbo elf.";
      }
    }
  }

  if (
    have($item`photocopied monster`, 1) &&
    get("photocopyMonster") === $monster`black crayon crimbo elf`
  ) {
    useFamiliar($familiar`robortender`);
    equip($item`staff of simmering hatred`);
    Macro.skill($skill`curse of weaksauce`)
      .trySkillRepeat($skill`saucestorm`)
      .setAutoAttack();
    use($item`photocopied monster`);
    setAutoAttack(0);
  }

  useFamiliar($familiar`robortender`);
  retrieveItem($item`toggle switch (bartend)`);
  equip($item`toggle switch (bartend)`);
  equip($slot`acc1`, $item`backup camera`);

  // TODO: add in 5 copies using the spooky putty from hell stash
  while (
    get("_backUpUses") < 11 &&
    getProperty("lastCopyableMonster") === $monster`black crayon crimbo elf`.name
  ) {
    adventureMacroAuto(
      $location`noob cave`,
      Macro.trySkill($skill`back-up to your last enemy`).trySkillRepeat($skill`saucestorm`)
    );
  }

  setAutoAttack(0);
  /*
  if (
    get("_backUpUses") === 10 &&
    getProperty("lastCopyableMonster") === $monster`black crayon crimbo elf`.name
  ) {
    useFamiliar($familiar`reanimated reanimator`);
    adventureMacroAuto(
      $location`noob cave`,
      Macro.trySkill($skill`back-up to your last enemy`)
        .trySkill($skill`digitize`)
        .trySkill($skill`7168`) // wink
        .trySkillRepeat($skill`saucestorm`)
    );
    setAutoAttack(0);
  }
*/
  if (!get("_sourceTerminalDigitizeMonster")) {
    useFamiliar($familiar`reanimated reanimator`);
    Macro.trySkill($skill`back-up to your last enemy`)
      .trySkill($skill`digitize`)
      .trySkill($skill`7168`) // wink
      .trySkillRepeat($skill`saucestorm`)
      .setAutoAttack();
    Witchess.fightPiece($monster`witchess knight`);
    setAutoAttack(0);
  }

  // TODO: Profchain witchess mobs

  while (haveEffect($effect`leash of linguini`) < 30) {
    useSkill($skill`leash of linguini`, 3);
  }

  while (haveEffect($effect`empathy`) < 30) {
    useSkill($skill`empathy of the newt`, 3);
  }

  while (haveEffect($effect`blood bond`) < 30) {
    useSkill($skill`cannelloni cocoon`);
    useSkill($skill`blood bond`, 10);
  }

  while (haveEffect($effect`smooth movements`) < 30) {
    useSkill($skill`smooth movement`, 3);
  }

  while (haveEffect($effect`the sonata of sneakiness`) < 30) {
    useSkill($skill`the sonata of sneakiness`, 3);
  }

  equip($item`powerful glove`, $slot`acc1`);
  while (haveEffect($effect`Invisible avatar`) < 30) {
    useSkill($skill`CHEAT CODE: Invisible avatar`, 3);
  }

  while (get("_poolGames") < 3) {
    cliExecute("pool aggressive");
  }

  if (!haveEffect($effect`a girl named sue`) && !get("_clanFortuneBuffUsed")) {
    cliExecute("fortune buff familiar");
  }

  if (!get("_witchessBuff")) {
    cliExecute("witchess");
  }

  if (!containsText(get("_beachHeadsUsed"), "10")) {
    cliExecute("beach head 10");
  }

  if (haveEffect($effect`driving stealthily`) < 30) {
    cliExecute("asdonmartin fuel 1 pie man was not meant to eat");
    cliExecute("asdonmartin drive stealthily");
  }

  if (haveEffect($effect`gummed shoe`) === 0) {
    use($item`shoe gum`);
  }

  if (haveEffect($effect`feeling lonely`) === 0 && get("_feelLonelyUsed") < 3) {
    useSkill($skill`feel lonely`);
  }

  if (haveEffect($effect`blessing of your favorite bird`) === 0) {
    useSkill($skill`visit your favorite bird`);
  }

  if (haveEffect($effect`become superficially interested`) === 0) {
    retrieveItem($item`Daily Affirmation: Be Superficially interested`);
    use($item`Daily Affirmation: Be Superficially interested`);
  }

  useSkill($skill`ode to booze`, 3);
  useFamiliar($familiar`frumious bandersnatch`);
  equip($item`none`, $slot`weapon`);
  equip($item`hobo code binder`);
  maximize("familiar weight -offhand", false);
  equip($item`camouflage t-shirt`);
  equip($item`protonic accelerator pack`);

  setAutoAttack("sewers-banderrun");
}

hoboPrep();

/*
function scobos() {
  const parts = toInt(userPrompt("How many of each part do you want to me?"));
  print("Ok, we're making " + parts + " parts.");
}

hoboPrep();
// scobos();


function scoboParts(partElement: string) {
  const page = visitUrl("clan_hobopolis.php?place=3&action=talkrichard&whichtalk=3");
  const skinsNum = 0;
  const bootsNum = 0;
  const eyesNum = 0;
  const gutsNum = 0;
  const skullsNum = 0;
  const crotchesNum = 0;
  const result = 0;

  switch (partElement) {
    case "physical":
      const matchSkins = createMatcher("Richard has <b>(\\d+\\,?\\d+)</b> hobo skin", page);
      if (find(matchSkins)) {
        skinsNum = toInt(group(matchSkins, 1));
      }
      result = skinsNum;
      break;
    case "hot":
      const matchBoots = createMatcher("Richard has <b>(\\d+\\,?\\d+)</b> pairs? of charred hobo", page);
      if (find(matchBoots)) {
        bootsNum = toInt(group(matchBoots, 1));
      }
      result = bootsNum;
      break;
    case "cold":
      const matchEyes = createMatcher("Richard has <b>(\\d+\\,?\\d+)</b> pairs? of frozen hobo", page);
      if (find(matchEyes)) {
        eyesNum = toInt(group(matchEyes, 1));
      }
      result = eyesNum;
      break;
    case "stinky":
      const matchGuts = createMatcher("Richard has <b>(\\d+\\,?\\d+)</b> pile", page);
      if (find(matchGuts)) {
        gutsNum = toInt(group(matchGuts, 1));
      }
      result = gutsNum;
      break;
    case "spooky":
      const matchSkulls = createMatcher("Richard has <b>(\\d+\\,?\\d+)</b> creepy hobo skull", page);
      if (find(matchSkulls)) {
        skullsNum = toInt(group(matchSkulls, 1));
      }
      result = skullsNum;
      break;
    case "sleazy":
      const matchCrotches = createMatcher("Richard has <b>(\\d+\\,?\\d+)</b> hobo crotch", page);
      if (find(matchCrotches)) {
        crotchesNum = toInt(group(matchCrotches, 1));
      }
      result = crotchesNum;
      break;
  }

  return result;
}

function main(scobos: number, skins: boolean) {
  print(scobos + " scobos coming right up!", "green");
  if (myFamiliar() !== $familiar`stooper`) {
    useFamiliar($familiar`red-nosed snapper`);
    if ((getProperty("redSnapperPhylum") !== "hobo")) {
      print("your snapper is sniffing the wrong thing", "red");
      abort();
    }
  }
  useSkill(((scobos / 2) + 1), $skill`carol of the hells`);
  setAutoAttack("gnat extract mortar weak");
  equip($slot`weapon`, $item`staff of simmering hatred`);
  useSkill(1, $skill`spirit of cayenne`);
  chatClan("Making up to " + scobos + " boots.", "hobopolis");
  while (scoboParts("hot") < scobos) {
    adventure(1, $location`hobopolis town square`);
  }
  // adventure(scobos, $location[hobopolis town square]);
  useSkill(1, $skill`spirit of peppermint`);
  chatClan("Making up to " + scobos + " eyes.", "hobopolis");
  while (scoboParts("cold") < scobos) {
    adventure(1, $location`hobopolis town square`);
  }
  // adventure(scobos, $location[hobopolis town square]);
  useSkill(1, $skill`spirit of garlic`);
  chatClan("Making up to " + scobos + " guts.", "hobopolis");
  while (scoboParts("stinky") < scobos) {
    adventure(1, $location`hobopolis town square`);
  }
  // adventure(scobos, $location[hobopolis town square]);
  useSkill(1, $skill`spirit of wormwood`);
  chatClan("Making up to " + scobos + " skulls.", "hobopolis");
  while (scoboParts("spooky") < scobos) {
    adventure(1, $location`hobopolis town square`);
  }
  // adventure(scobos, $location[hobopolis town square]);
  useSkill(1, $skill`spirit of bacon grease`);
  chatClan("Making up to " + scobos + " crotches.", "hobopolis");
  while (scoboParts("sleazy") < scobos) {
    adventure(1, $location`hobopolis town square`);
  }
  // adventure(scobos, $location[hobopolis town square]);
  setAutoAttack(0);
  useSkill(1, $skill`spirit of nothing`);
  if (skins === true) {
    setAutoAttack("hoboskins");
    useSkill(((scobos / 10) + 1), $skill`carol of the bulls`);
    useSkill(((scobos / 10) + 1), $skill`song of the north`);
    equip($slot`weapon`, $item`fourth of may cosplay saber`);
    equip($slot`acc2`, $item`wormwood wedding ring`);
    chatClan("Making up to " + scobos + " skins.", "hobopolis");
    while (scoboParts("physical") < scobos) {
      adventure(1, $location`hobopolis town square`);
    }
    // adventure(scobos, $location[hobopolis town square]);
    setAutoAttack(0);
  }
} */
