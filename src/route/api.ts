import express from "express";
import { authMiddleware } from "../middleware/auth-middleware";
import { UserController } from "../controller/user-controller";
import { BalitaController } from "../controller/balita-controller";
export const apiRouter = express.Router();

apiRouter.use(authMiddleware);

// User API
apiRouter.get("/api/users/current", UserController.get);
apiRouter.patch("/api/users/current", UserController.update);
apiRouter.delete("/api/users/current", UserController.logout);
apiRouter.delete("/api/users/:id(\\d+)", UserController.remove);

// Balita Api
apiRouter.post("/api/balita", BalitaController.register);
apiRouter.get("/api/balita", BalitaController.getAll);
apiRouter.get("/api/balita/:id(\\d+)", BalitaController.get);
apiRouter.patch("/api/balita/:id(\\d+)", BalitaController.update);
apiRouter.delete("/api/balita/:id(\\d+)", BalitaController.remove);
