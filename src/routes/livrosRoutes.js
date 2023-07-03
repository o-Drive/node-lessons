import express from "express";
import LivroController from "../controllers/livrosController.js";

// atribui variavel
const router = express.Router();

// cria rota de requisição
router
  .get("/livros", LivroController.listarLivros)
  .post("/livros", LivroController.cadastrarLivro)

export default router;