import { Hono } from "hono";
import { validator } from "hono/validator";

import {
    createTodo,
    deleteTodo,
    getTodo,
    getTodos,
    updateTodo,
} from "./model"
import type { Bindings } from "../bindings";

const todos = new Hono();

todos.get("/", async (c) => {
    const todos = await getTodos(c.env.HONO_TODO);
    return c.json(todos);
});

todos.post(
	"/",
	validator("json", (value, c) => {
        const title = value.title.trim();

		if (!title || title === "") {
			return c.json({ message: "Title is required" }, 400);
		}
	}),
	async (c) => {
		const param = await c.req.json<{ title: string }>();
		const newTodo = {
			id: String(todoList.length + 1),
			completed: false,
			title: param.title,
		};
		todoList = [...todoList, newTodo];

		return c.json(newTodo, 201);
	}
);

todos.put("/:id", async (c) => {
	const id = c.req.param("id");
	const todo = todoList.find((todo) => todo.id === id);

	if (!todo) {
		return c.json({ message: "Todo not found" }, 404);
	}

	const param = await c.req.json<{ title: string; completed: boolean }>();

	todoList = todoList.map((todo) => {
		if (todo.id === id) {
			return {
				...todo,
				...param,
			};
		}
		return todo;
	});

	return new Response(null, { status: 204 });
});

todos.delete("/:id", (c) => {
	const id = c.req.param("id");
	const todo = todoList.find((todo) => todo.id === id);

	if (!todo) {
		return c.json({ message: "Todo not found" }, 404);
	}

	todoList = todoList.filter((todo) => todo.id !== id);
	return new Response(null, { status: 204 });
});
export { todos };
