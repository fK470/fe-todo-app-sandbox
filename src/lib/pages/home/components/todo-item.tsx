import type { Todo } from "@/lib/types/todo";
import { useState } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/lib/components/ui/button";
import { Checkbox } from "@/lib/components/ui/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/lib/components/ui/dialog";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/lib/components/ui/hover-card";
import { Input } from "@/lib/components/ui/input";
import { Textarea } from "@/lib/components/ui/textarea";

interface TodoItemProps {
  todo: Todo;
  index: number;
  id: number | null;
  onDeleteTodo: (id: number) => void;
  onToggleComplete: (index: number) => void;
  onSaveTodo: (
    index: number,
    newTitle: string,
    newDescription: string | null
  ) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  index,
  id,
  onDeleteTodo,
  onToggleComplete,
  onSaveTodo,
}) => {
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(
    todo.description
  );

  const handleSave = () => {
    if (!editTitle.trim()) {
      alert("Todo title cannot be empty.");
      return;
    }
    onSaveTodo(index, editTitle, editDescription || null);
  };

  return (
    <li className="flex items-center justify-between gap-4 p-2 border-b border-gray-200">
      <Checkbox
        className="hover:cursor-pointer"
        checked={todo.done}
        onCheckedChange={() => onToggleComplete(index)}
      />
      {todo.done ? (
        <HoverCard>
          <HoverCardTrigger className="w-full text-left text-gray-400 line-through">
            {todo.title}
          </HoverCardTrigger>
          <HoverCardContent>
            <p className="text-gray-400">
              To edit content, turn off the checkbox.
            </p>
            {todo.description && <p>{todo.description}</p>}
          </HoverCardContent>
        </HoverCard>
      ) : (
        <Dialog>
          <DialogTrigger className="w-full text-left hover:cursor-pointer">
            {todo.title}
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit ToDo</DialogTitle>
            </DialogHeader>
            <>
              <Input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="pl-8 w-full focus:outline-none"
                autoFocus
              />
              <Textarea
                value={editDescription || ""}
                onChange={(e) => setEditDescription(e.target.value)}
                className="pl-8 w-full focus:outline-none"
                autoFocus
              />
              <DialogFooter className="flex items-center gap-2">
                <DialogClose asChild>
                  <Button
                    variant="outline"
                    className="text-gray-500 hover:text-gray-700 hover:cursor-pointer"
                  >
                    Cancel
                  </Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button
                    className="bg-green-400 hover:bg-green-500 hover:cursor-pointer disabled:text-gray-300"
                    onClick={handleSave}
                    disabled={!editTitle.trim()}
                  >
                    Save
                  </Button>
                </DialogClose>
              </DialogFooter>
            </>
          </DialogContent>
        </Dialog>
      )}
      <Button
        variant="outline"
        size="icon"
        className="text-red-500 hover:text-red-700 hover:cursor-pointer"
        onClick={() => id !== null && onDeleteTodo(id)}
      >
        <Trash2 />
      </Button>
    </li>
  );
};

export { TodoItem };
