// src/app.ts
import express from "express";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import routes from "./routes";

const app = express();
app.use(express.json());

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Todo List API",
      version: "1.0.0",
      description: "A simple Todo List API with TypeScript",
    },
    servers: [
      {
        url: "http://localhost:3001/api", // Updated with port 3001 and /api prefix
      },
    ],
    tags: [
      {
        name: "Lists",
        description: "Todo list management",
      },
      {
        name: "Items",
        description: "Todo items management",
      },
    ],
  },
  apis: ["./src/routes/*.ts"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Mount routes under /api prefix
app.use("/api", routes);

export default app;
