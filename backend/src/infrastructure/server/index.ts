import express from "express";
import cors from "cors";
import { getRoutesHandler, setBaselineHandler } from "../../adapters/inbound/http/routesController";
import { getCB, bank, apply } from "../../adapters/inbound/http/bankingController";
import { getAdjustedCB, createPoolHandler } from "../../adapters/inbound/http/poolingController";
import { getComparison } from "../../adapters/inbound/http/routesController";

const app = express();
app.use(cors());
app.use(express.json());

// Routes API
app.get("/routes/comparison", getComparison);
app.get("/routes", getRoutesHandler);
app.post("/routes/:id/baseline", setBaselineHandler);

app.listen(4000, () => console.log("✅ Server running on http://localhost:4000"));


app.get("/compliance/cb", getCB);
app.post("/banking/bank", bank);
app.post("/banking/apply", apply);
app.get("/compliance/adjusted-cb", getAdjustedCB);
app.post("/pools", createPoolHandler);