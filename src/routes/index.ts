// src/routes/index.ts
import { Router } from "express";
import { ListController } from "../controllers/listController";
import { ItemController } from "../controllers/itemController";

const router = Router();

/**
 * @openapi
 * components:
 *   schemas:
 *     List:
 *       type: object
 *       required:
 *         - id
 *         - name
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the list
 *         name:
 *           type: string
 *           description: Name of the list
 *         description:
 *           type: string
 *           description: Optional description of the list
 *     Item:
 *       type: object
 *       required:
 *         - id
 *         - description
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the item
 *         description:
 *           type: string
 *           description: Description of the todo item
 *         status:
 *           type: string
 *           enum: [PENDING, IN-PROGRESS, DONE]
 *           default: PENDING
 *           description: Current status of the item
 */

/**
 * @openapi
 * /lists:
 *   get:
 *     summary: Get all todo lists
 *     tags: [Lists]
 *     responses:
 *       200:
 *         description: List of all todo lists
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/List'
 *   post:
 *     summary: Create a new todo list
 *     tags: [Lists]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/List'
 *     responses:
 *       201:
 *         description: The created todo list
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/List'
 */
router.get("/lists", ListController.getLists);
router.post("/lists", ListController.createList);

/**
 * @openapi
 * /lists/{id}:
 *   put:
 *     summary: Update a todo list
 *     tags: [Lists]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: The updated todo list
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/List'
 */
router.put("/lists/:id", ListController.updateList);

/**
 * @openapi
 * /lists/{id}/items:
 *   get:
 *     summary: Get all items in a list
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of all items in the todo list
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Item'
 *   post:
 *     summary: Add a new item to a list
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Item'
 *     responses:
 *       201:
 *         description: The created todo item
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item'
 */
router.get("/lists/:id/items", ItemController.getItems);
router.post("/lists/:id/items", ItemController.addItem);

/**
 * @openapi
 * /lists/{listId}/items/{itemId}:
 *   put:
 *     summary: Update an item in a list
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: listId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [PENDING, IN-PROGRESS, DONE]
 *     responses:
 *       200:
 *         description: The updated todo item
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item'
 *   delete:
 *     summary: Delete an item from a list
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: listId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Item deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.put("/lists/:listId/items/:itemId", ItemController.updateItem);
router.delete("/lists/:listId/items/:itemId", ItemController.deleteItem);

export default router;
