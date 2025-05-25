import { jsonEvent } from "@kurrent/kurrentdb-client";
import { EVENT_TYPES } from "./types.js";

// Create
export const productCreated = (id, name, price) => {
  return jsonEvent({
    type: EVENT_TYPES.PRODUCT_CREATED,
    data: { id, name, price },
  });
};

// Update
export const productUpdated = (id, name, price) => {
  const data = { id };

  if (name !== undefined) {
    data.name = name;
  }

  if (price !== undefined) {
    data.price = price;
  }

  return jsonEvent({
    type: EVENT_TYPES.PRODUCT_UPDATED,
    data,
  });
};

// Delete
export const productDeleted = (id) => {
  return jsonEvent({
    type: EVENT_TYPES.PRODUCT_DELETED,
    data: { id },
  });
};
