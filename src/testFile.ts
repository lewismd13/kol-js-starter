import { containsText, print } from "kolmafia";
import { get } from "libram";

if (containsText(get("banishedMonsters"), "party girl")) {
  print("Party girl is banished!");
}

if (containsText(get("banishedMonsters"), "biker")) {
  print("biker is banished!");
}
