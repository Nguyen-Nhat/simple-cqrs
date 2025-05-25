import express from "express";
import { handlers } from "../commands/handlers.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { name, price } = req.body;
  await handlers.createProduct(name, price);
  res.status(201).end();
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const { name, price } = req.body;

  await handlers.updateProduct(id, name, price);
  res.status(200).end();
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  await handlers.deleteProduct(id);
  res.status(200).end();
});

export default router;
