import { Button } from "@/lib/components/ui/button";
import { Input } from "@/lib/components/ui/input";
import type { Todo } from "@/lib/types/todo";
import { useState } from "react";

interface TodoFormProps {
  onAddTodo: (todo: Todo) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ onAddTodo }) => {
  const [newTodo, setNewTodo] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) {
      alert("Todo title cannot be empty.");
      return;
    }
    onAddTodo({
      id: null,
      title: newTodo,
      description: null,
      done: false,
    });
    setNewTodo("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-md items-center space-x-2"
    >
      <Input
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="New ToDo"
        className=""
      />
      <Button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 font-bold hover:cursor-pointer"
      >
        Add
      </Button>
    </form>
  );
};

export { TodoForm };
