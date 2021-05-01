import { Router } from "https://deno.land/x/oak/mod.ts";

const router = new Router();
import todoController from "../controllers/todo.ts";
import cardController from "../controllers/cardController.ts";
import speciesController from "../controllers/alienGame/alienGameController.ts";

router
  .get("/todos", todoController.getAllTodos)
  .post("/todos", todoController.createTodo)
  .get("/todos/:id", todoController.getTodoById)
  .put("/todos/:id", todoController.updateTodoById)
  .delete("/todos/:id", todoController.deleteTodoById)
  .get("/allCards", cardController.getAllCards)
  .get("/allItems", cardController.getAllItems)
  .get("/randomCard", cardController.randomCard)
  .get("/games", speciesController.getAllGames)
  .post("/newGame", speciesController.createAGame)
  .post("/joinGame", speciesController.joinAGame)


export default router;
