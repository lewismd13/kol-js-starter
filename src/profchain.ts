import {
  get,
  $familiar,
  $item,
  $skill,
  Macro,
  $monster,
  getRemainingSpleen,
  $familiars,
  adventureMacroAuto,
} from "libram";

import {
  useFamiliar,
  equip,
  useSkill,
  chatMacro,
  faxbot,
  cliExecute,
  maximize,
  setAutoAttack,
  visitUrl,
  runChoice,
  runCombat,
  myHash,
  setProperty,
  toString,
  inMultiFight,
  sweetSynthesisPair,
  sweetSynthesis,
  availableAmount,
  print,
  use,
  wait,
  chatPrivate,
} from "kolmafia";

/*
if (get("_pocketProfessorLectures") === 0 && get("_photocopyUsed") === false) {
  useFamiliar($familiar`pocket professor`);
  equip($item`pocket professor memory chip`);
  maximize("familiar weight +equip pocket professor memory chip, duct tape shirt", false);
  useSkill(2, $skill`blood bond`);
  useSkill(2, $skill`leash of linguini`);
  useSkill(2, $skill`empathy of the newt`);
  cliExecute("witchess");
  faxbot($monster`knob goblin embezzler`);
  wait(10);
  const embezzlermacro = Macro.externalIf(
    (get('_sourceTerminalDigitizeUses') === 0),
    Macro.trySkill($skill`digitize`)
    .trySkill($skill`sing along`)
    .trySkill($skill`lecture on relativity`)
    .trySkill($skill`candyblast`)
    .repeat()
    ) Macro.externalIf(
      (get('_sourceTerminalDigitizeMonster') === $monster`knob goblin embezzler`),
      Macro.trySkill($skill`lecture on relativity`)
      .trySkill($skill`sing along`)
      .trySkill($skill`candyblast`)
      .repeat()
    )
}
*/

function checkFax(): boolean {
  cliExecute("fax receive");
  if (get("photocopyMonster") === $monster`Knob Goblin Embezzler`) return true;
  cliExecute("fax send");
  return false;
}

export function faxEmbezzler(): void {
  if (!get("_photocopyUsed")) {
    if (checkFax()) return;
    chatPrivate("cheesefax", "Knob Goblin Embezzler");
    for (let i = 0; i < 3; i++) {
      wait(10);
      if (checkFax()) return;
    }
    throw "Failed to acquire photocopied Knob Goblin Embezzler.";
  }
}

export function bishopChain() {
  if (get("_pocketProfessorLectures") < 13 && get("_witchessFights") < 5) {
    useFamiliar($familiar`pocket professor`);
    equip($item`pocket professor memory chip`);
    maximize("familiar weight +equip pocket professor memory chip", false);
    useSkill(1, $skill`blood bond`);
    useSkill(1, $skill`leash of linguini`);
    useSkill(1, $skill`empathy of the newt`);
    cliExecute("witchess");
    cliExecute("beach head 10");
    Macro.trySkill($skill`lecture on relativity`)
      .skill($skill`candyblast`)
      .repeat()
      .setAutoAttack();
    visitUrl("campground.php?action=witchess");
    runChoice(1);
    visitUrl("choice.php?option=1&pwd=" + myHash() + "&whichchoice=1182&piece=1942", false);
    while (inMultiFight()) {
      runCombat();
    }
    setAutoAttack(0);
  }
}

export function embezzlerChain() {
  if (get("_pocketProfessorLectures") === 0 && get("_photocopyUsed") === false) {
    useFamiliar($familiar`pocket professor`);
    equip($item`pocket professor memory chip`);
    maximize("familiar weight +equip pocket professor memory chip", false);
    equip($item`duct tape shirt`);
    useSkill(2, $skill`blood bond`);
    useSkill(2, $skill`leash of linguini`);
    useSkill(2, $skill`empathy of the newt`);
    // useSkill(2, $skill`polka of plenty`);
    // useSkill(2, $skill`disco leer`);
    // sweetSynthesis($item`milk stud`, $item`swizzler`);
    cliExecute("witchess");
    cliExecute("beach head 10");
    if (get("boomBoxSong") !== "Total Eclipse of Your Meat") {
      cliExecute("boombox meat");
    }
    Macro.trySkill($skill`lecture on relativity`)
      .skill($skill`sing along`)
      .skill($skill`candyblast`)
      .repeat()
      .setAutoAttack();
    faxEmbezzler();
    // visitUrl("campground.php?action=witchess");
    // runChoice(1);
    // visitUrl("choice.php?option=1&pwd=" + myHash() + "&whichchoice=1182&piece=1942", false);
    use(1, $item`photocopied monster`);
    while (inMultiFight()) {
      runCombat();
    }
    setAutoAttack(0);
  } else {
    print("I think you already copied embezzlers, bud", "red");
  }
}

// bishopChain();

/*
export function main(chainMob: string) {
  if (chainMob === "bishop") {
    bishopChain();
  } else if (chainMob === "embezzler") {
    embezzlerChain();
  }
}
*/
