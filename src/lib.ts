import {
  getProperty,
  toInt,
  setProperty,
  familiarWeight,
  myFamiliar,
  weightAdjustment,
  availableAmount,
  buy,
  use,
  retrieveItem,
  haveEffect,
  cliExecute,
  print,
  myMp,
  myMaxmp,
  eat,
  totalTurnsPlayed,
  getClanName,
  visitUrl,
  getFuel,
  create,
  haveSkill,
  useSkill,
  toUrl,
  buyUsingStorage,
  equip,
  pullsRemaining,
  shopAmount,
  storageAmount,
  takeShop,
  toString as toStringAsh,
  toEffect,
  toString,
  myLocation,
  runChoice,
  useFamiliar,
  maximize,
  getClanId,
  setAutoAttack,
  myInebriety,
  inebrietyLimit,
  drinksilent,
  takeStash,
  outfit,
  myGardenType,
  adv1,
  myAdventures,
  putStash,
} from "kolmafia";
import {
  $effect,
  $effects,
  $familiar,
  $familiars,
  $item,
  $location,
  $monster,
  $skill,
  adventureMacro,
  adventureMacroAuto,
  Clan,
  get,
  Macro,
  Witchess,
} from "libram";

export function getPropertyInt(name: string) {
  const str = getProperty(name);
  if (str === "") {
    throw `Unknown property ${name}.`;
  }
  return toInt(str);
}

export function setPropertyInt(name: string, value: number) {
  setProperty(name, `${value}`);
}

export function incrementProperty(name: string) {
  setPropertyInt(name, getPropertyInt(name) + 1);
}

export function getPropertyBoolean(name: string) {
  const str = getProperty(name);
  if (str === "") {
    throw `Unknown property ${name}.`;
  }
  return str === "true";
}

export function setChoice(adv: number, choice: number) {
  setProperty(`choiceAdventure${adv}`, `${choice}`);
}

export function myFamiliarWeight() {
  return familiarWeight(myFamiliar()) + weightAdjustment();
}

export function ensureItem(quantity: number, it: Item) {
  if (availableAmount(it) < quantity) {
    buy(quantity - availableAmount(it), it);
  }
  if (availableAmount(it) < quantity) {
    throw `Could not buy ${quantity} of item ${it.name}: only ${availableAmount(it)}.`;
  }
}

export function ensureCreateItem(quantity: number, it: Item) {
  if (availableAmount(it) < quantity) {
    create(quantity - availableAmount(it), it);
  }
  if (availableAmount(it) < quantity) {
    throw "Could not create item.";
  }
}

export function ensureSewerItem(quantity: number, it: Item) {
  while (availableAmount(it) < quantity) {
    ensureItem(1, $item`chewing gum on a string`);
    use(1, $item`chewing gum on a string`);
  }
}

export function ensureHermitItem(quantity: number, it: Item) {
  if (availableAmount(it) >= quantity) {
    return;
  }
  const count = quantity - availableAmount(it);
  while (
    availableAmount($item`worthless trinket`) +
      availableAmount($item`worthless gewgaw`) +
      availableAmount($item`worthless knick-knack`) <
    count
  ) {
    ensureItem(1, $item`chewing gum on a string`);
    use(1, $item`chewing gum on a string`);
  }
  ensureItem(1, $item`hermit permit`);
  retrieveItem(count, it);
}

export function ensureNpcEffect(ef: Effect, quantity: number, potion: Item) {
  if (haveEffect(ef) === 0) {
    ensureItem(quantity, potion);
    if (!cliExecute(ef.default) || haveEffect(ef) === 0) {
      throw `Failed to get effect ${ef.name}`;
    }
  } else {
    print(`Already have effect ${ef.name}.`);
  }
}

export function ensurePotionEffect(ef: Effect, potion: Item) {
  if (haveEffect(ef) === 0) {
    if (availableAmount(potion) === 0) {
      create(1, potion);
    }
    if (!cliExecute(ef.default) || haveEffect(ef) === 0) {
      throw 'Failed to get effect " + ef.name + ".';
    }
  } else {
    print(`Already have effect ${ef.name}.`);
  }
}

export function ensureEffect(ef: Effect, turns = 1) {
  if (haveEffect(ef) < turns) {
    if (!cliExecute(ef.default) || haveEffect(ef) === 0) {
      throw 'Failed to get effect " + ef.name + ".';
    }
  } else {
    print(`Already have effect ${ef.name}.`);
  }
}

export function ensureMpTonic(mp: number) {
  while (myMp() < mp) {
    ensureItem(1, $item`Doc Galaktik's Invigorating Tonic`);
    use(1, $item`Doc Galaktik's Invigorating Tonic`);
  }
}

export function ensureMpSausage(mp: number) {
  while (myMp() < Math.min(mp, myMaxmp())) {
    ensureCreateItem(1, $item`magical sausage`);
    eat(1, $item`magical sausage`);
  }
}

export function sausageFightGuaranteed() {
  const goblinsFought = getPropertyInt("_sausageFights");
  const nextGuaranteed =
    getPropertyInt("_lastSausageMonsterTurn") +
    4 +
    goblinsFought * 3 +
    Math.max(0, goblinsFought - 5) ** 3;
  return goblinsFought === 0 || totalTurnsPlayed() >= nextGuaranteed;
}

export function itemPriority(...items: Item[]) {
  return items.find((item: Item) => availableAmount(item) > 0) ?? items[items.length - 1];
}

export function setClan(target: string) {
  if (getClanName() !== target) {
    const clanCache = JSON.parse(getProperty("hccs_clanCache") || "{}");
    if (clanCache.target === undefined) {
      const recruiter = visitUrl("clan_signup.php");
      const clanRe = /<option value=([0-9]+)>([^<]+)<\/option>/g;
      let match;
      while ((match = clanRe.exec(recruiter)) !== null) {
        clanCache[match[2]] = match[1];
      }
    }
    setProperty("hccs_clanCache", JSON.stringify(clanCache));

    visitUrl(`showclan.php?whichclan=${clanCache[target]}&action=joinclan&confirm=on&pwd`);
    if (getClanName() !== target) {
      throw `failed to switch clans to ${target}. Did you spell it correctly? Are you whitelisted?`;
    }
  }
  return true;
}

export function ensureDough(goal: number) {
  while (availableAmount($item`wad of dough`) < goal) {
    buy(1, $item`all-purpose flower`);
    use(1, $item`all-purpose flower`);
  }
}

export function fuelAsdon(goal: number) {
  const startingFuel = getFuel();
  if (startingFuel > goal) return startingFuel;

  print(`Fueling asdon. Currently ${startingFuel} litres.`);
  const estimated = Math.floor((goal - startingFuel) / 5);
  const bread = availableAmount($item`loaf of soda bread`);
  ensureDough(estimated - bread);
  ensureItem(estimated - bread, $item`soda water`);
  ensureCreateItem(estimated, $item`loaf of soda bread`);
  cliExecute(`asdonmartin fuel ${estimated} loaf of soda bread`);
  while (getFuel() < goal) {
    ensureDough(1);
    ensureItem(1, $item`soda water`);
    ensureCreateItem(1, $item`loaf of soda bread`);
    cliExecute("asdonmartin fuel 1 loaf of soda bread");
  }
  const endingFuel = getFuel();
  print(`Done fueling. Now ${endingFuel} litres.`);
  return endingFuel;
}

export function ensureAsdonEffect(ef: Effect) {
  if (haveEffect(ef) === 0) {
    fuelAsdon(37);
  }
  ensureEffect(ef);
}

export function mapMonster(location: Location, monster: Monster) {
  if (
    haveSkill($skill`Map the Monsters`) &&
    !getPropertyBoolean("mappingMonsters") &&
    getPropertyInt("_monstersMapped") < 3
  ) {
    useSkill($skill`Map the Monsters`);
  }

  if (!getPropertyBoolean("mappingMonsters")) throw "Failed to setup Map the Monsters.";

  const mapPage = visitUrl(toUrl(location), false, true);
  if (!mapPage.includes("Leading Yourself Right to Them")) throw "Something went wrong mapping.";

  const fightPage = visitUrl(
    `choice.php?pwd&whichchoice=1435&option=1&heyscriptswhatsupwinkwink=${monster.id}`
  );
  if (!fightPage.includes("You're fighting") && myLocation() !== $location`the haiku dungeon`)
    throw "Something went wrong starting the fight.";
}

export function tryUse(quantity: number, it: Item) {
  if (availableAmount(it) > 0) {
    return use(quantity, it);
  } else {
    return false;
  }
}

export function tryEquip(it: Item) {
  if (availableAmount(it) > 0) {
    return equip(it);
  } else {
    return false;
  }
}

export function wishEffect(ef: Effect) {
  if (haveEffect(ef) === 0) {
    cliExecute(`genie effect ${ef.name}`);
  } else {
    print(`Already have effect ${ef.name}.`);
  }
}

export function pullIfPossible(quantity: number, it: Item, maxPrice: number) {
  if (pullsRemaining() > 0) {
    const quantityPull = Math.max(0, quantity - availableAmount(it));
    if (shopAmount(it) > 0) {
      takeShop(Math.min(shopAmount(it), quantityPull), it);
    }
    if (storageAmount(it) < quantityPull) {
      buyUsingStorage(quantityPull - storageAmount(it), it, maxPrice);
    }
    cliExecute(`pull ${quantityPull} ${it.name}`);
    return true;
  } else return false;
}

export function ensurePullEffect(ef: Effect, it: Item) {
  if (haveEffect(ef) === 0) {
    if (availableAmount(it) > 0 || pullIfPossible(1, it, 50000)) ensureEffect(ef);
  }
}

export function shrug(ef: Effect) {
  if (haveEffect(ef) > 0) {
    cliExecute(`shrug ${ef.name}`);
  }
}

// We have Stevedave's, Ur-Kel's on at all times during leveling (managed via mood); third and fourth slots are variable.
const songSlots = [
  $effects`Stevedave's Shanty of Superiority`,
  $effects`Ur-Kel's Aria of Annoyance`,
  $effects`Power Ballad of the Arrowsmith, The Magical Mojomuscular Melody, The Moxious Madrigal, Ode to Booze, Jackasses' Symphony of Destruction`,
  $effects`Carlweather's Cantata of Confrontation, The Sonata of Sneakiness, Fat Leon's Phat Loot Lyric, Polka of Plenty`,
];
const allKnownSongs = ([] as Effect[]).concat(...songSlots);
const allSongs = Skill.all()
  .filter(
    (skill) => toStringAsh(skill.class as unknown as string) === "Accordion Thief" && skill.buff
  )
  .map((skill) => toEffect(skill));
export function openSongSlot(song: Effect) {
  for (const songSlot of songSlots) {
    if (songSlot.includes(song)) {
      for (const shruggable of songSlot) {
        shrug(shruggable);
      }
    }
  }
  for (const badSong of allSongs) {
    if (!allKnownSongs.includes(badSong)) {
      shrug(badSong);
    }
  }
}

export function ensureSong(ef: Effect) {
  if (haveEffect(ef) === 0) {
    openSongSlot(ef);
    if (!cliExecute(ef.default) || haveEffect(ef) === 0) {
      throw `Failed to get effect ${ef.name}`;
    }
  } else {
    print(`Already have effect ${ef.name}.`);
  }
}

export function ensureOde(turns: number) {
  while (haveEffect($effect`Ode to Booze`) < turns) {
    ensureMpTonic(50);
    openSongSlot($effect`Ode to Booze`);
    useSkill(1, $skill`The Ode to Booze`);
  }
}

export function kill() {
  return Macro.trySkill($skill`Curse of Weaksauce`)
    .trySkill($skill`Micrometeorite`)
    .trySkill($skill`Sing Along`)
    .trySkill($skill`Stuffed Mortar Shell`)
    .trySkill($skill`Saucestorm`)
    .trySkillRepeat($skill`Saucegeyser`)
    .attack();
}

export function gingerBread() {
  // this is going to be all the gingerbread stuff, it is a work in progress
  cliExecute("ccs libramMacro");
  if (get("_gingerbreadCityTurns") === 0) {
    if (!get("_gingerbreadClockAdvanced")) {
      visitUrl("adventure.php?snarfblat=477");
      runChoice(1);
    }
    if (get("_banderRunaways") < 5) {
      useFamiliar($familiar`frumious bandersnatch`);
      maximize("familiar weight", false);
      ensureEffect($effect`blood bond`);
      ensureEffect($effect`leash of linguini`);
      ensureEffect($effect`empathy`);
      ensureOde(2);
      setChoice(1204, 1); // noon at the train station, get candies
      setChoice(1203, 4); // midnight at the civic center, buy cigarettes
      while (get("_gingerbreadCityTurns") < 5) {
        adventureMacro($location`Gingerbread Train Station`, Macro.step("runaway"));
      }
      while (get("_gingerbreadCityTurns") < 15) {
        adventureMacro($location`Gingerbread civic center`, Macro.step("runaway"));
      }
    }
  }
  cliExecute("ccs default");
}

export function randomPrank() {
  function getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  const playerIDs: number[] = [
    1515124, 2548033, 2393910, 2705901, 892618, 1046951, 887028, 786069, 1197090, 437479, 2156370,
    1901297, 644996, 1956005, 2264486, 1937905, 2766368, 2203016, 1972588,
  ];

  for (let i = 0; i < 15; i++) {
    if (get("_timeSpinnerMinutesUsed") === 10) {
      break;
    }
    // print("gonna prank " + playerIDs[getRandomInt(0, 18)]);
    cliExecute("timespinner prank " + playerIDs[getRandomInt(0, 18)]);
  }
}

export function mannyRollover() {
  Clan.join("Alliance from Hell");
  // TODO: Make this work, errored as invalid piece or something?
  while (get("_witchessFights") < 5) {
    Macro.trySkillRepeat($skill`saucestorm`).setAutoAttack();
    Witchess.fightPiece($monster`witchess knight`);
  }
  setAutoAttack(0);

  if (get("_glitchMonsterFights") === 0) {
    Macro.trySkillRepeat($skill`saucegeyser`).setAutoAttack();
    cliExecute("/glitch");
  }

  while (get("_sourceTerminalEnhanceUses") < 3) {
    cliExecute("terminal enhance meat.enh");
  }

  if (get("_claraBellUsed") === false && myAdventures() > 0) {
    use($item`clara's bell`);
    setChoice(919, 1);
    do {
      adv1($location`sloppy seconds diner`, -1, "");
    } while (get("lastEncounter") === "Nothing Could Be Finer");
  }

  if (myInebriety() === inebrietyLimit()) {
    useFamiliar($familiar`stooper`);
    useSkill($skill`the ode to booze`, 1);
    drinksilent($item`elemental caipiroska`);
    takeStash($item`tiny plastic sword`, 1);
    create($item`grogtini`);
    drinksilent($item`grogtini`);
    putStash($item`tiny plastic sword`, 1);
  }

  outfit("PVP RO fites");
  useFamiliar($familiar`trick-or-treating tot`);
  equip($item`lil unicorn costume`);

  if (myGardenType() != "grass") {
    use(1, $item`packet of tall grass seeds`);
  }

  if (myGardenType() === "grass") {
    use($item`9761`); // fertilizer
    use($item`packet of thanksgarden seeds`);
  }

  // check for a dggt if we haven't
  if (get("_defectiveTokenChecked") === false) {
    visitUrl("place.php?whichplace=arcade&action=arcade_plumber");
  }

  randomPrank();
  // finish free fights
}
