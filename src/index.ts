import dotenv from "dotenv";
dotenv.config();

import server from "./config/server";
import "./database/connection";

(() => {
  server.listen(server.get("port"), (): void => {
    console.log(`Server on port ${server.get("port")}`);
  });
})();