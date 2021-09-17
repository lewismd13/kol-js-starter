// herein begins gausie stuff from assbot

import { numberologyPrize, putShop, shopAmount, shopLimit, shopPrice, toInt } from "kolmafia";
import { get, Kmail, set } from "libram";

import APPROVED_USERS from "./approvedUsers.json";

const APPROVED_USER_IDS = APPROVED_USERS.map(({ id }) => id);

const instruction = /^\s*((\d+)@)?(\d+)\s*$/;

const mapAdd = <T>(map: Map<T, number>, key: T, addition: number) =>
  map.set(key, (map.get(key) || 0) + addition);

Kmail.inbox().forEach((kmail) => {
  if (!APPROVED_USER_IDS.includes(kmail.senderId)) {
    return;
  }

  const items = kmail.items();
  const match = kmail.message.match(instruction);

  const priceAndLimit = new Map<Item, [price: number, limit: number]>();

  if (match && items.size === 1) {
    const item = [...items.keys()][0];

    const [, rawLimit, rawPrice] = match;
    const price = Number(rawPrice);
    const limit = rawLimit ? Number(rawLimit) : 0;

    priceAndLimit.set(item, [price, limit]);
  }

  const returns = new Map<Item, number>();

  items.forEach((quantity, item) => {
    if (!priceAndLimit.has(item) && shopAmount(item) === 0) {
      mapAdd(returns, item, quantity);
      return;
    }

    const price = priceAndLimit.get(item)?.[0] ?? shopPrice(item);
    const limit = priceAndLimit.get(item)?.[1] ?? shopLimit(item);

    if (putShop(price, limit, quantity, item)) {
      const prop = `assistantMallLog${toInt(item)}`;
      const log = get<string>(prop).split(",");
      log.push(`${kmail.senderId}:${quantity}`);
      set(prop, log.join(","));
    } else {
      mapAdd(returns, item, quantity);
    }
  });

  if (returns.size > 0) {
    Kmail.send(kmail.senderId, returnMessage, returns);
  }
});
