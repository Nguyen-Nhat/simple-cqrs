import { END } from "@kurrent/kurrentdb-client";
import { kurrent } from "../lib/kurrent.js";
import { publishEvent } from "../lib/rabbitmq.js";
import { EVENT_TYPES } from "../events/types.js";
import {
  RABBIT_EXCHANGES,
  RABBIT_ROUTING_KEYS,
} from "../constants/rabbitmq.js";

export async function startProductEventRelay() {
  const subscription = kurrent.subscribeToAll({
    fromPosition: END,
  });

  for await (const resolvedEvent of subscription) {
    const type = resolvedEvent.event?.type;
    const data = resolvedEvent.event?.data;

    let routingKey = null;
    switch (type) {
      case EVENT_TYPES.PRODUCT_CREATED:
        routingKey = RABBIT_ROUTING_KEYS.PRODUCT_CREATED;
        break;
      case EVENT_TYPES.PRODUCT_UPDATED:
        routingKey = RABBIT_ROUTING_KEYS.PRODUCT_UPDATED;
        break;
      case EVENT_TYPES.PRODUCT_DELETED:
        routingKey = RABBIT_ROUTING_KEYS.PRODUCT_DELETED;
        break;
      default:
        continue;
    }

    await publishEvent(RABBIT_EXCHANGES.PRODUCT, routingKey, data);
  }
}
