import type { Todo } from "@/lib/types/todo";
import { useState } from "react";

interface TodoItemProps {
  todo: Todo;
  index: number;
  id: string;
  onDeleteTodo: (id: string) => void;
  onToggleComplete: (index: number) => void;
  onEditTodo: (index: number) => void;
  onSaveTodo: (index: number, newText: string) => void;
  onCancelEdit: () => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  index,
  id,
  onDeleteTodo,
  onToggleComplete,
  onEditTodo,
  onSaveTodo,
  onCancelEdit,
}) => {
  const [editText, setEditText] = useState(todo.text);
  const [editing, setEditing] = useState(false);

  const handleEdit = () => {
    setEditing(true);
    onEditTodo(index);
  };

  const handleCancel = () => {
    setEditing(false);
    onCancelEdit();
  };

  const handleSave = () => {
    onSaveTodo(index, editText);
    setEditing(false);
  };

  return (
    <li className="flex items-center justify-between py-2 border-b border-gray-200">
      {editing ? (
        <div className="ml-auto flex gap-2">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2"
          />
          <button
            className="text-green-500 hover:text-green-700 hover:cursor-pointer"
            onClick={handleSave}
            type="button"
          >
            Save
          </button>
          <button
            className="text-gray-500 hover:text-gray-700 hover:cursor-pointer"
            onClick={handleCancel}
            type="button"
          >
            Cancel
          </button>
        </div>
      ) : (
        <>
          <div className="flex items-center">
            <input
              type="checkbox"
              className="mr-2"
              checked={todo.completed}
              onChange={() => onToggleComplete(index)}
            />
            <span className={todo.completed ? "line-through" : ""}>
              {todo.text}
            </span>
          </div>
          <div className="ml-auto flex gap-2">
            <button
              className="text-blue-500 hover:text-blue-700 hover:cursor-pointer"
              onClick={handleEdit}
              type="button"
            >
              Edit
            </button>
            <button
              className="text-red-500 hover:text-red-700 hover:cursor-pointer"
              onClick={() => onDeleteTodo(id)}
              type="button"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </li>
  );
};

export { TodoItem };
