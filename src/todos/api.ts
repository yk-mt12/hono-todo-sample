import { Hono } from "hono";

const todoList = [
	{ id: 1, text: "Buy milk", done: false },
	{ id: 2, text: "Do laundry", done: true },
	{ id: 3, text: "Clean room", done: false },
];

const todos = new Hono();
todos.get("/", (c) => c.json(todoList));

export { todos };
