import type { StateCreator } from "..";

export interface TodoSlice {
  todos: Todo[];
  goal: Goal;
  setGoal: (goal: Goal) => void;
  addTodo: (todo: Todo) => void;
  removeTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
  toggleImportant: (id: number) => void;
  editTodo: (id: number, text: string) => void;
  clearCompleted: () => void;
  toggleAll: () => void;
}
export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  important?: boolean;
}
interface Goal {
  text: string;
  for: Date;
}
const createTodoSlice: StateCreator<TodoSlice> = (set) => ({
  goal: {
    text: "",
    for: new Date(),
  },
  setGoal: (goal) => {
    set(() => ({ goal }));
  },
  todos: [{ id: 1, text: "Add your to-dos here", completed: false }],
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
  toggleImportant(id) {
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, important: !todo.important } : todo
      ),
    }));
  },
});
export default createTodoSlice;
