import { TodoItem } from "./todo-item";
import type { Todo } from "@/lib/types/todo";

interface TodoListProps {
  todos: Array<Todo>;
  onDeleteTodo: (id: string) => void;
  onToggleComplete: (index: number) => void;
  onEditTodo: (index: number) => void;
  onSaveTodo: (index: number, newText: string) => void;
  onCancelEdit: () => void;
  loading: boolean;
  error: string | null;
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  onDeleteTodo,
  onToggleComplete,
  onEditTodo,
  onSaveTodo,
  onCancelEdit,
  loading,
  error,
}) => {
  return (
    <>
      {todos.length === 0 && !loading && !error ? (
        <p>No todos yet!</p>
      ) : (
        <ul className="w-full max-w-md">
          {todos.map((todo, index) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              index={index}
              id={todo.id}
              onDeleteTodo={onDeleteTodo}
              onToggleComplete={onToggleComplete}
              onEditTodo={onEditTodo}
              onSaveTodo={onSaveTodo}
              onCancelEdit={onCancelEdit}
            />
          ))}
        </ul>
      )}
    </>
  );
};

export { TodoList };
