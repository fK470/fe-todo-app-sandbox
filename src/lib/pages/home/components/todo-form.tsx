import type { Todo } from "@/lib/types/todo";
import { useState } from "react";

interface TodoFormProps {
  onAddTodo: (todo: Todo) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ onAddTodo }) => {
  const [newTodo, setNewTodo] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim() !== "") {
      onAddTodo({ id: "", text: newTodo, completed: false });
      setNewTodo("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="New ToDo"
        className="border border-gray-300 rounded px-4 py-2"
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded hover:cursor-pointer"
      >
        Add
      </button>
    </form>
  );
};

export { TodoForm };
