import { useState, useEffect } from "react";
import type { Todo } from "@/lib/types/todo";
import { BASE_URL } from "@/lib/api/config";

const handleApiError = (res: Response) => {
  if (res.status === 404) {
    return;
  }
  throw new Error(`API request failed with status: ${res.status}`);
};

export const useTodos = () => {
  const [todos, setTodos] = useState<Array<Todo>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTodos = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(BASE_URL);
        if (!res.ok) {
          handleApiError(res);
        }
        const fetchedTodos = await res.json();
        setTodos(fetchedTodos);
      } catch (err) {
        setError("Failed to fetch todos.");
        console.error("Failed to fetch todos:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTodos();
  }, []);

  const addTodo = async (todo: Todo) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: todo.text, completed: false }),
      });
      if (!res.ok) {
        handleApiError(res);
      }
      const newTodo = await res.json();
      setTodos([...todos, newTodo]);
    } catch (err) {
      setError("Failed to add todo.");
      console.error("Failed to add todo:", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteTodo = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        handleApiError(res);
      }
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (err) {
      setError("Failed to delete todo.");
      console.error("Failed to delete todo:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateTodo = async (id: string, data: Partial<Todo>) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${BASE_URL}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        handleApiError(res);
      }
      return await res.json();
    } catch (err) {
      setError("Failed to update todo.");
      console.error("Failed to update todo:", err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const toggleComplete = async (index: number) => {
    const todoToUpdate = todos[index];
    if (!todoToUpdate) return;
    const updatedTodo = await updateTodo(todoToUpdate.id, {
      completed: !todoToUpdate.completed,
    });
    if (updatedTodo) {
      setTodos(
        todos.map((todo, i) => (i === index ? updatedTodo : todo))
      );
    }
  };

  const saveTodo = async (index: number, newText: string) => {
    const todoToUpdate = todos[index];
    if (!todoToUpdate) return;
    const updatedTodo = await updateTodo(todoToUpdate.id, {
      text: newText,
    });
    if (updatedTodo) {
      setTodos(
        todos.map((todo, i) => (i === index ? updatedTodo : todo))
      );
    }
  };

  const editTodo = (index: number) => {
    // No need to implement anything here, as the edit state is managed in TodoItem
  };

  const cancelEdit = () => {
    // No need to implement anything here, as the edit state is managed in TodoItem
  };

  return {
    todos,
    addTodo,
    deleteTodo,
    toggleComplete,
    saveTodo,
    editTodo,
    cancelEdit,
    loading,
    error,
  };
};
