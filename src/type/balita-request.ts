import { Balita } from "@prisma/client";
import { Request } from "express";

export interface BalitaRequest extends Request {
	balita?: Balita;
}
