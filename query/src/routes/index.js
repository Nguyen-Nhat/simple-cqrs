import express from "express";
import { handlers } from "../query/handlers.js";
const router = express.Router();

router.get('/', async (req, res) => {
  const result = await handlers.getAllProducts();
  res.json(result).status(200);
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  console.log(id)
  const result = await handlers.getProductsById(id);
  res.json(result).status(200);
});


export default router;
