import { Router } from "express";
import { createTodo, deleteTodo, getTodo, updateTodo } from "../controllers/todoController.js";

const router = Router();

router.route("/").get(getTodo).post(createTodo);
router.route("/:id").put(updateTodo).delete(deleteTodo);

export default router;