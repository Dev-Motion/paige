import type { StateCreator } from "..";

export interface TodoSlice {
  todos: Todo[];
  addTodo: (todo: Todo) => void;
  removeTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
  editTodo: (id: number, text: string) => void;
  clearCompleted: () => void;
  toggleAll: () => void;
}
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}
const createTodoSlice: StateCreator<TodoSlice> = (set) => ({
  todos: [
    { id: 1, text: "Learn React", completed: false },
    { id: 2, text: "Learn TypeScript", completed: false },
    { id: 3, text: "Learn Tailwind", completed: false },
  ],
  addTodo: (todo) => {
    set((state) => ({ todos: [...state.todos, todo] }));
  },
  removeTodo: (id) => {
    set((state) => ({ todos: state.todos.filter((todo) => todo.id !== id) }));
  },
  toggleTodo: (id) => {
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ),
    }));
  },
  editTodo: (id, text) => {
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, text } : todo
      ),
    }));
  },
  clearCompleted: () => {
    set((state) => ({ todos: state.todos.filter((todo) => !todo.completed) }));
  },
  toggleAll: () => {
    set((state) => ({
      todos: state.todos.map((todo) => ({ ...todo, completed: true })),
    }));
  },
});
export default createTodoSlice;