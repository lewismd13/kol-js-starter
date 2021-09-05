/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  cliExecute,
  containsText,
  equip,
  haveEffect,
  maximize,
  print,
  retrieveItem,
  setAutoAttack,
  use,
  useFamiliar,
  userConfirm,
  useSkill,
} from "kolmafia";
import { $effect, $familiar, $item, $skill, $slot, get } from "libram";
import { sewerPrep } from "./hoboDay";

// mannyRollover();
// mannyQuestVolcoino();
// gingerBread();
/*
prepareAscension(
  {
    workshed: $item`little geneticist DNA-splicing lab`,
    garden: $item`Peppermint pip packet`,
    eudora: $item`Our Daily Candles™ order form`,
  },
  {
    desk: $item`Swiss piggy bank`,
    nightstand: $item`foreign language tapes`,
    ceiling: $item`ceiling fan`,
  }
);

ascend(
  Paths.CommunityService,
  $class`sauceror`,
  Lifestyle.hardcore,
  "wallaby",
  $item`astral six-pack`,
  $item`astral statuette`
);
*/

sewerPrep();
/*
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

if (haveEffect($effect`silent running`) < 20) {
  cliExecute("swim noncombat");
}

useSkill($skill`ode to booze`, 3);
useFamiliar($familiar`frumious bandersnatch`);
equip($item`none`, $slot`weapon`);
equip($item`hobo code binder`);
maximize("familiar weight -offhand", false);
equip($item`camouflage t-shirt`);
equip($item`protonic accelerator pack`);

setAutoAttack("sewers-banderrun");
cliExecute("ccs default");

print(get("csServicesPerformed"));
*/
