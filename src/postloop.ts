import { get, $item, $effect, $skill } from "libram";

import {
  print,
  myGardenType,
  use,
  availableAmount,
  putStash,
  putDisplay,
  haveEffect,
  cliExecute,
  putShop,
  useSkill,
  hippyStoneBroken,
  visitUrl,
} from "kolmafia";

print("I really hope this works!", "blue");

if (get("csServicesPerformed") !== "") {
  use(1, $item`asdon martin keyfob`);
  use(1, $item`packet of tall grass seeds`);
  putStash(1, $item`little geneticist DNA-splicing Lab`);

  if (haveEffect($effect`feeling lost`)) {
    cliExecute("uneffect feeling lost");
  }

  putDisplay(1, $item`thwaitgold termite statuette`);

  if (availableAmount($item`blood-drive sticker`) > 10) {
    putShop(0, 0, 1, $item`blood-drive sticker`);
  }
  putShop(0, 0, 1, $item`vintage smart drink`);
  putShop(0, 0, 1, $item`emergency margarita`);
  putShop(0, 0, 1, $item`bag of grain`);
}

if (get("_timeSpinnerReplicatorUsed") === false) {
  cliExecute("farfuture gin");
}

if (get("lockPicked") === false) {
  useSkill(1, $skill`lock picking`);
  cliExecute("create 1 jarlsberg's key lime");
}

if (hippyStoneBroken() === false) {
  visitUrl("peevpee.php?action=smashstone&confirm=on");
}
