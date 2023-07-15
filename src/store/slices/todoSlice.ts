import type { StateCreator } from "..";

export interface TodoSlice {
  todos: Todo[];
  goal: Goal;
  setGoal: (goal: Goal) => void;
  setTodoDate: (id: number, date: Date) => void;
  addTodo: (todo: Todo) => void;
  removeTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
  toggleImportant: (id: number) => void;
  editTodo: (id: number, text: string) => void;
  clearCompleted: () => void;
  toggleAll: () => void;
  toggleReminded: (id: number) => void;
  snoozeTodo: (id: number) => void;
}

export type TodoOnly = {
  id: number;
  text: string;
  completed: boolean;
  important: boolean;
  reminder: false;
};
export type Reminder = {
  id: number;
  text: string;
  completed: boolean;
  important: boolean;
  reminder: true;
  reminded?: boolean;
  date: Date;
};
export type Todo = TodoOnly | Reminder;
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
  todos: [
    {
      id: 1,
      text: "Add your to-dos here",
      completed: false,
      important: false,
      reminder: false,
    },
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
  setTodoDate: (id, date) => {
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, reminder: true, date } : todo
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
  toggleReminded(id) {
    set((state) => ({
      todos: state.todos.map((todo) => {
        if (todo.reminder) {
          if (todo.id === id) {
            return { ...todo, reminded: !todo.reminded };
          }
        }
        return todo;
      }),
    }));
  },
  snoozeTodo(id) {
    set((state) => ({
      todos: state.todos.map((todo) => {
        if (todo.reminder) {
          if (todo.id === id) {
            const date = new Date(todo.date);
            date.setMinutes(todo.date.getMinutes() + 10);
            return { ...todo, date, reminded: false };
          }
        }
        return todo;
      }),
    }));
  },
});
export default createTodoSlice;
