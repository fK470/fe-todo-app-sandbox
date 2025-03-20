import { TodoItem } from "./todo-item";
import type { Todo } from "@/lib/types/todo";

interface TodoListProps {
  todos: Array<Todo>;
  onDeleteTodo: (id: number) => void;
  onToggleComplete: (index: number) => void;
  onSaveTodo: (
    index: number,
    newTitle: string,
    newDescription: string | null
  ) => void;
  loading: boolean;
  error: string | null;
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  onDeleteTodo,
  onToggleComplete,
  onSaveTodo,
  loading,
  error,
}) => {
  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && todos.length === 0 ? (
        <p>No todos yet!</p>
      ) : (
        <ul className="w-lg">
          {todos.map((todo, index) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              index={index}
              id={todo.id}
              onDeleteTodo={onDeleteTodo}
              onToggleComplete={onToggleComplete}
              onSaveTodo={onSaveTodo}
            />
          ))}
        </ul>
      )}
    </>
  );
};

export { TodoList };
