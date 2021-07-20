import { userPrompt, print, toInt } from "kolmafia";
import {} from "libram";

function hoboPrep() {
  print("I hope you prepped");
}

function scobos() {
  const parts = toInt(userPrompt("How many of each part do you want to me?"));
  print("Ok, we're making " + parts + " parts.");
}

hoboPrep();
scobos();


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
}