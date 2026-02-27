import express from "express";
import { BalitaController } from "../controller/balita-controller";
import { IbuHamilController } from "../controller/ibu-hamil-contoller";
import { PemeriksaanBalitaController } from "../controller/pemeriksaan-balita-contoller";
import { UserController } from "../controller/user-controller";
import { authMiddleware } from "../middleware/auth-middleware";
export const apiRouter = express.Router();

apiRouter.use(authMiddleware);

// User API
apiRouter.get("/api/users", UserController.getAll);
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

// Ibuhamil API
apiRouter.post("/api/ibuhamil", IbuHamilController.register);
apiRouter.get("/api/ibuhamil", IbuHamilController.getAll);
apiRouter.get("/api/ibuhamil/:id(\\d+)", IbuHamilController.get);
apiRouter.patch("/api/ibuhamil/:id(\\d+)", IbuHamilController.update);
apiRouter.delete("/api/ibuhamil/:id(\\d+)", IbuHamilController.remove);

// Pemeriksaan Balita API
apiRouter.post(
	"/api/balita/:id(\\d+)/pemeriksaan",
	PemeriksaanBalitaController.create,
);
apiRouter.get(
	"/api/balita/:id(\\d+)/pemeriksaan",
	PemeriksaanBalitaController.getAll,
);
apiRouter.get(
	"/api/balita/:balitaId(\\d+)/pemeriksaan/:pemeriksaanId(\\d+)",
	PemeriksaanBalitaController.get,
);
