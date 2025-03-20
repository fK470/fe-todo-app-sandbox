import { TodoForm } from "./components/todo-form";
import { TodoList } from "./components/todo-list";
import { useTodos } from "@/lib/hooks/useTodos";

const Home = () => {
  const {
    todos,
    addTodo,
    deleteTodo,
    toggleComplete,
    saveTodo,
    loading,
    error,
  } = useTodos();

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-8 text-center">
      <TodoForm onAddTodo={addTodo} />
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <TodoList
        todos={todos}
        onDeleteTodo={deleteTodo}
        onToggleComplete={toggleComplete}
        onSaveTodo={saveTodo}
        loading={loading}
        error={error}
      />
    </div>
  );
};

export default Home;
