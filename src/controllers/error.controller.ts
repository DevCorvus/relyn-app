import type { Request, Response } from "express";

const envRequired = (req: Request, res: Response) => {
  res.status(500).send("Environment variables are missing");
};

export default {
  envRequired
};