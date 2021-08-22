import {
  cliExecute,
  equip,
  restoreMp,
  retrieveItem,
  runCombat,
  useFamiliar,
  visitUrl,
} from "kolmafia";
import { $familiar, $item, $skill, get, Macro } from "libram";

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

if (get("_chateauMonsterFought") === false) {
  useFamiliar($familiar`robortender`);
  retrieveItem($item`toggle switch (bartend)`);
  equip($item`toggle switch (bartend)`);
  restoreMp(150);
  // setAutoAttack("gnat extract mortar weak");
  cliExecute("ccs twiddle");
  visitUrl("place.php?whichplace=chateau&action=chateau_painting", false);
  runCombat(
    Macro.skill($skill`curse of weaksauce`)
      .trySkillRepeat("saucestorm")
      .toString()
  );
  cliExecute("ccs default");
  // setAutoAttack(0);
  // putShop(0, 0, 1, $item`peppermint sprig`);
}
