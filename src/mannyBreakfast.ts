import {
  adv1,
  availableAmount,
  buy,
  canInteract,
  cliExecute,
  containsText,
  equip,
  getProperty,
  itemAmount,
  myGardenType,
  myName,
  myPath,
  outfit,
  print,
  putShop,
  putStash,
  random,
  restoreMp,
  retrieveItem,
  reverseNumberology,
  runChoice,
  runCombat,
  setAutoAttack,
  takeStash,
  takeStorage,
  toInt,
  use,
  useFamiliar,
  useSkill,
  visitUrl,
} from "kolmafia";
import { $familiar, $item, $location, $skill, $slot, Clan, get, Macro } from "libram";
import { mannyQuestVolcoino, setChoice } from "./lib";

function buyRaffle(ticketQty: number) {
  if (
    availableAmount($item`raffle ticket`) < ticketQty &&
    myName() === "manendra" &&
    containsText(visitUrl("main.php"), "map7beach.gif") &&
    myPath() !== "Zombie Slayer"
  )
    cliExecute(`raffle ${ticketQty}${canInteract() ? " inventory" : " storage"}`);
  return availableAmount($item`raffle ticket`) >= ticketQty;
}

function getVolcoino() {
  if (get("_infernoDiscoVisited") === true) return;
  print("Attempting to rock Disco Style...");
  if (outfit("Velvet")) {
    visitUrl("place.php?whichplace=airport_hot&action=airport4_zone1");
    runChoice(7);
  } else print("Failed to claim Volcoino.", "red");
}

function getFunFunds() {
  if (get("_dinseyGarbageDisposed") === true) return;
  print("Attempting to turn in garbage...");
  if (itemAmount($item`bag of park garbage`) < 1) {
    if (canInteract()) {
      buy(1, $item`bag of park garbage`);
    } else {
      takeStorage(1, $item`bag of park garbage`);
    }
  }
  if (itemAmount($item`bag of park garbage`) >= 1) {
    visitUrl("place.php?whichplace=airport_stench&action=airport3_tunnels");
    runChoice(6);
  } else print("Failed to claim FunFunds.", "red");
}

// TODO: set snojo, learn terminal skills, make re-entrant

Clan.join(40382);

cliExecute("ccs libramMacro");

if (get("_clipartSummons") === 0) {
  cliExecute("create 1 borrowed time");
  cliExecute("create 2 box of familiar jacks");
}

if (toInt(getProperty("_daycareGymScavenges")) === 0) {
  visitUrl("place.php?whichplace=town_wrong&action=townwrong_boxingdaycare");
  runChoice(3);
  runChoice(2);
  runChoice(1);
  runChoice(4);
  runChoice(5);
  runChoice(4);
}

const raffleTix = 5 + random(5);

buyRaffle(raffleTix);
if (get("_sausagesMade") === 0) {
  cliExecute("make 23 magical sausage");
}

while (
  Object.keys(reverseNumberology()).includes("69") &&
  get("_universeCalculated") < get("skillLevel144")
) {
  cliExecute("numberology 69");
}

if (get("_etchedHourglassUsed") === false) {
  use($item`etched hourglass`);
}

while (
  Object.keys(reverseNumberology()).includes("69") &&
  get("_universeCalculated") < get("skillLevel144")
) {
  cliExecute("numberology 69");
}

// TODO: Use robort and fight an elf instead of the mickey card
if (get("_deckCardsDrawn") === 0) {
  cliExecute("cheat ancestral recall");
  // cliExecute("cheat 1952");
  cliExecute("cheat island");
}

if (get("_deckCardsDrawn") < 11) {
  useFamiliar($familiar`Robortender`);
  retrieveItem($item`toggle switch (Bartend)`);
  equip($item`toggle switch (Bartend)`);
  restoreMp(150);
  Macro.skill($skill`Curse of Weaksauce`)
    .trySkillRepeat($skill`Saucestorm`)
    .setAutoAttack();
  cliExecute("cheat phylum elf");
  runCombat();
  // putShop(0, 0, $item`peppermint sprig`);
}

cliExecute("shower cold");
cliExecute("bastille mainstat brutalist gesture");
cliExecute("briefcase collect");

if (!get("_timeSpinnerReplicatorUsed")) {
  cliExecute("farfuture gin");
}

cliExecute("detective solver");

while (toInt(getProperty("_sourceTerminalExtrudes")) < 3) {
  cliExecute("terminal extrude booze");
  // SourceTerminal.extrude($item`hacked gibson`);
}

// Chateau desk, assuming meat
visitUrl("place.php?whichplace=chateau&action=chateau_desk1");

// Upgrade saber for fam wt
if (get("_saberMod") === 0) {
  visitUrl("main.php?action=may4");
  runChoice(4);
}
retrieveItem(5, $item`abstraction: thought`);

// TODO: Make this not break when you run out of macros
while (toInt(getProperty("_machineTunnelsAdv")) < 5) {
  useFamiliar($familiar`Machine Elf`);
  // setAutoAttack("melfgetcertainty");
  Macro.if_("monsterid 1965", Macro.trySkillRepeat($skill`Saucestorm`))
    .while_(
      "!monstername perceiver of sensations && hasskill macrometeorite",
      Macro.trySkill($skill`Macrometeorite`).skill($skill`Summon Love Mosquito`)
    )
    .if_(
      "monstername perceiver of sensations",
      Macro.tryItem($item`abstraction: thought`).trySkillRepeat($skill`Saucestorm`)
    )
    .trySkillRepeat($skill`Saucestorm`)
    .setAutoAttack();
  adv1($location`The Deep Machine Tunnels`, -1, "");
}

setAutoAttack(0);

useFamiliar($familiar`Rogue Program`);

if (availableAmount($item`Pantsgiving`) === 0) {
  takeStash(1, $item`Pantsgiving`);
}
equip($item`Pantsgiving`);

while (toInt(getProperty("_snojoFreeFights")) < 10) {
  setAutoAttack("gnat extract mortar weak");
  adv1($location`The X-32-F Combat Training Snowman`, -1, "");
}

setAutoAttack(0);
equip($slot`pants`, $item`none`);
if (availableAmount($item`Pantsgiving`) > 0) {
  putStash(1, $item`Pantsgiving`);
}

use(1, $item`Bird-a-Day calendar`);

// cheesefax fortune

//BafH

//Get Free Volcoino

getVolcoino();
getFunFunds();
mannyQuestVolcoino();

if (!get("_loveTunnelUsed")) {
  useFamiliar($familiar`Golden Monkey`);
  equip($item`Fourth of May Cosplay Saber`);
  useSkill($skill`Carol of the Bulls`);
  useSkill($skill`Carol of the Hells`);
  setChoice(1222, 1); // Entrance
  setChoice(1223, 1); // Fight LOV Enforcer
  setChoice(1224, 2); // LOV Epaulettes
  setChoice(1225, 1); // Fight LOV Engineer
  setChoice(1226, 2); // Open Heart Surgery
  setChoice(1227, 1); // Fight LOV Equivocator
  setChoice(1228, 2); // Take emotionalizer
  setAutoAttack("HCCS_LOV_tunnel");
  adv1($location`The Tunnel of L.O.V.E.`, -1, "");
  setAutoAttack(0);
}

if (myGardenType() === "thanksgarden" && !get("_mushroomGardenVisited")) {
  cliExecute("garden pick");
  use(1, $item`packet of tall grass seeds`);
}

putShop(6845, 0, availableAmount($item`battery (AAA)`), $item`battery (AAA)`);
putShop(0, 0, availableAmount($item`cornucopia`), $item`cornucopia`);
putShop(49995, 0, 3, $item`pocket wish`);

if (get("_cargoPocketEmptied") === false && !containsText(get("cargoPocketsEmptied"), "533")) {
  cliExecute("cargo 533");
  putShop(50000, 0, availableAmount($item`greasy desk bell`), $item`greasy desk bell`);
}

if (get("_chateauMonsterFought") === false) {
  useFamiliar($familiar`Robortender`);
  retrieveItem($item`toggle switch (Bartend)`);
  equip($item`toggle switch (Bartend)`);
  equip($item`lucky gold ring`, $slot`acc1`);
  restoreMp(150);
  setAutoAttack("gnat extract mortar weak");
  visitUrl("place.php?whichplace=chateau&action=chateau_painting", false);
  runCombat();
  setAutoAttack(0);
  // putShop(0, 0, 1, $item`peppermint sprig`);
}

if (get("_unaccompaniedMinerUsed") === 0) {
  cliExecute("minevolcano 5");
}

cliExecute("ccs default");

if (get("_questPartyFairQuest") === "") {
  setChoice(1322, 6); // Leave
  adv1($location`The Neverending Party`, -1, "");
}

if (get("_questPartyFairQuest") === "food") {
  print("Hey, go talk to Geraldine, time for another sliderpocalypse!", "blue");
} else if (get("_questPartyFairQuest") === "booze") {
  print("Hey, go talk to Gerald, get that jarmageddon!", "blue");
}
