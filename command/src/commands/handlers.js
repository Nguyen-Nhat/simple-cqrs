import { kurrent } from "../lib/kurrent.js";
import { v4 as uuidv4 } from "uuid";
import { rebuildProduct } from "../aggregates/index.js";
import {
  productCreated,
  productUpdated,
  productDeleted,
} from "../events/index.js";
import { NotFoundError } from "../errors/notFound.js";

// Create
const createProduct = async (name, price) => {
  const id = uuidv4();
  const event = productCreated(id, name, price);
  await kurrent.appendToStream(`product-${id}`, event);
};

// Update
const updateProduct = async (id, name, price) => {
  const product = await rebuildProduct(id);

  if (!product) {
    throw new NotFoundError(
      `Product with ID ${id} does not exist or has been deleted.`
    );
  }

  const event = productUpdated(id, name, price);
  await kurrent.appendToStream(`product-${id}`, event);
};

// Delete
const deleteProduct = async (id) => {
  const product = await rebuildProduct(id);

  if (!product) {
    throw new NotFoundError(
      `Product with ID ${id} does not exist or has already been deleted.`
    );
  }

  const event = productDeleted(id);
  await kurrent.appendToStream(`product-${id}`, event);
};

export const handlers = {
  createProduct,
  updateProduct,
  deleteProduct,
};
