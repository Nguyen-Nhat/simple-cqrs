import { StreamNotFoundError } from "@kurrent/kurrentdb-client";
import { EVENT_TYPES } from "../events/types.js";
import { kurrent } from "../lib/kurrent.js";

export const rebuildProduct = async (id) => {
  const events = kurrent.readStream(`product-${id}`);
  if (!events || events.length === 0) return null;

  let product = null;

  try {
    for await (const resolvedEvent of events) {
      const type = resolvedEvent.event?.type;
      const data = resolvedEvent.event?.data;

      switch (type) {
        case EVENT_TYPES.PRODUCT_CREATED:
          product = { ...data };
          break;

        case EVENT_TYPES.PRODUCT_UPDATED:
          if (product) {
            product = {
              ...product,
              ...(data.name !== undefined && { name: data.name }),
              ...(data.price !== undefined && { price: data.price }),
            };
          }
          break;

        case EVENT_TYPES.PRODUCT_DELETED:
          product = null;
          break;
      }
    }
  } catch (error) {
    if (error instanceof StreamNotFoundError) {
      product = null;
    } else {
      throw error;
    }
  }

  return product;
};
