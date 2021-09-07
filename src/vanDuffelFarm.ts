import {
  availableAmount,
  cliExecute,
  containsText,
  equip,
  haveEffect,
  myAdventures,
  mySpleenUse,
  putStash,
  retrieveItem,
  spleenLimit,
  sweetSynthesis,
  takeStash,
  useFamiliar,
  useSkill,
} from "kolmafia";
import {
  $effect,
  $familiar,
  $item,
  $location,
  $skill,
  $slot,
  adventureMacroAuto,
  get,
  Macro,
} from "libram";

import { setChoice } from "./lib";

if (availableAmount($item`navel ring of navel gazing`) === 0) {
  takeStash($item`navel ring of navel gazing`, 1);
}

equip($item`bounty-hunting helmet`);
equip($item`balsam barrel`);
equip($item`sea salt scrubs`);
equip($item`runed taper candle`);
equip($item`tiny black hole`);
equip($item`bounty-hunting pants`);
equip($item`navel ring of navel gazing`, $slot`acc1`);
equip($item`mafia thumb ring`, $slot`acc2`);
equip($item`lucky gold ring`, $slot`acc3`);
useFamiliar($familiar`Cat Burglar`);
equip($item`burglar/sleep mask`);

while (haveEffect($effect`Fat Leon's Phat Loot Lyric`) < myAdventures()) {
  useSkill($skill`Fat Leon's Phat Loot Lyric`, 5);
}

while (haveEffect($effect`Singer's Faithful Ocelot`) < myAdventures()) {
  useSkill($skill`Singer's Faithful Ocelot`, 5);
}

while (
  haveEffect($effect`Synthesis: Collection`) < myAdventures() &&
  mySpleenUse() < spleenLimit()
) {
  sweetSynthesis($item`Milk Studs`, $item`Milk Studs`);
}

while (haveEffect($effect`Driving Observantly`) < myAdventures()) {
  cliExecute("asdonmartin drive observantly");
}

while (haveEffect($effect`The Spirit of Taking`) < myAdventures()) {
  useSkill($skill`The Spirit of Taking`, 5);
}

while (get("_sourceTerminalEnhanceUses") < 3) {
  cliExecute("terminal enhance item.enh");
}

if (get("_tryptophanDartUsed") === false) {
  retrieveItem($item`tryptophan dart`);
}

if (get("_humanMuskUses") === 0) {
  retrieveItem($item`human musk`);
}

// pick a fight
setChoice(1324, 5);
// need to account for stupid choice adv
while (
  !containsText(get("banishedMonsters"), "party girl") ||
  !containsText(get("banishedMonsters"), '"plain" girl')
) {
  adventureMacroAuto(
    $location`The Neverending Party`,
    Macro.step("pickpocket")
      .if_('monstername "party girl"', Macro.item($item`tryptophan dart`))
      .if_("monsterid 2090", Macro.item($item`human musk`))
      .if_("match 'van key'", Macro.step("runaway"))
      .if_(
        "monstername jock",
        Macro.externalIf(
          haveEffect($effect`On the Trail`) === 0,
          Macro.trySkill($skill`Transcendent Olfaction`).trySkill($skill`Gallapagosian Mating Call`)
        )
      )
      .skill($skill`Curse of Weaksauce`)
      .skill($skill`Saucegeyser`)
      .repeat()
  );
}
/* cat burglar support, stolen from tourguide
int CatBurglarChargesLeftToday()
{
    //FIXME this is totally wrong I think, fix this mafia
    int charge = get_property_int("_catBurglarCharge");

    int heists_gained_today = 0;
    int limit = 10;
    int c = charge;
    while (c >= limit)
    {
        heists_gained_today += 1;
        c -= limit;
        limit *= 2;
    }
    int heists_complete = get_property_int("_catBurglarHeistsComplete");
    //print_html("heists_gained_today = " + heists_gained_today + ", heists_complete = " + heists_complete);
    return get_property_int("catBurglarBankHeists") + heists_gained_today - heists_complete;
}
*/
while (myAdventures() > 10) {
  if (
    !containsText(get("banishedMonsters"), "party girl") ||
    !containsText(get("banishedMonsters"), '"plain" girl')
  ) {
    throw "You don't have the right mobs banished, you shouldn't be here.";
  }
  adventureMacroAuto(
    $location`The Neverending Party`,
    Macro.step("pickpocket")
      .if_('match "van key"', Macro.step("runaway"))
      .if_(
        'match "unremarkable duffel bag"',
        Macro.externalIf(
          haveEffect($effect`On the Trail`) === 0,
          Macro.trySkill($skill`Transcendent Olfaction`).trySkill($skill`Gallapagosian Mating Call`)
        ).step("runaway")
      )
      .if_(
        "monstername jock",
        Macro.externalIf(
          haveEffect($effect`On the Trail`) === 0,
          Macro.trySkill($skill`Transcendent Olfaction`).trySkill($skill`Gallapagosian Mating Call`)
        )
      )
      .skill($skill`Stuffed Mortar Shell`)
      .skill($skill`Curse of Weaksauce`)
      .skill($skill`Saucegeyser`)
      .repeat()
  );
}

if (availableAmount($item`navel ring of navel gazing`) > 0) {
  putStash($item`navel ring of navel gazing`, 1);
}
