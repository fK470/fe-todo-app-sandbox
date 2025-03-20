import { useState, useEffect } from "react";
import type { Todo } from "@/lib/types/todo";
import { BASE_URL } from "@/lib/api/config";
import axios from "axios";

export const useTodos = () => {
  const [todos, setTodos] = useState<Array<Todo>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTodos = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get<Todo[]>(`${BASE_URL}/todos`);
        setTodos(response.data);
      } catch (error: any) {
        setError("Failed to fetch todos.");
        console.error("Fetch todos error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTodos();
  }, []);

  const addTodo = async (todo: Todo) => {
    if (!todo.title.trim()) {
      setError("Todo title cannot be empty.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post<Todo>(`${BASE_URL}/todos`, {
        title: todo.title,
        done: false,
      });
      setTodos([...todos, response.data]);
    } catch (error: any) {
      setError("Failed to add todo.");
      console.error("Add todo error:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteTodo = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await axios.delete(`${BASE_URL}/todos/${id}`);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error: any) {
      setError("Failed to delete todo.");
      console.error("Delete todo error:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateTodo = async (id: number, data: Partial<Todo>) => {
    setError(null);
    setLoading(true);
    try {
      const response = await axios.patch<Todo>(
        `${BASE_URL}/todos/${id}`,
        data
      );
      return response.data;
    } catch (error: any) {
      setError("Failed to update todo.");
      console.error("Update todo error:", error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const toggleComplete = async (index: number) => {
    if (index < 0 || index >= todos.length) return;
    const todo = todos[index];
    setError(null);
    try {
      const response = await axios.patch<Todo>(
        `${BASE_URL}/todos/${todo.id}`,
        {
          done: !todo.done,
        }
      );
      setTodos(
        todos.map((t) =>
          t.id === response.data.id ? response.data : t
        )
      );
    } catch (error: any) {
      setError("Failed to toggle todo completion.");
      console.error("Toggle complete error:", error);
    }
  };

  const saveTodo = async (
    index: number,
    newTitle: string,
    newDescription: string | null
  ) => {
    const todoToUpdate = todos[index];
    if (!todoToUpdate || todoToUpdate.id === null) return;
    if (!newTitle.trim()) {
      setError("Todo title cannot be empty.");
      return;
    }
    const updatedTodo = await updateTodo(todoToUpdate.id, {
      title: newTitle,
      description: newDescription,
    });
    if (updatedTodo) {
      setTodos(
        todos.map((todo) =>
          todo.id === updatedTodo.id ? updatedTodo : todo
        )
      );
    }
  };

  return {
    todos,
    addTodo,
    deleteTodo,
    toggleComplete,
    saveTodo,
    loading,
    error,
  };
};
