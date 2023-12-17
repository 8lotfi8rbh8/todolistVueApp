import { defineStore } from 'pinia';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  editing?: boolean;
}

export const useTodoStore = defineStore('todo', {
  state: () => ({
    todos: [] as Todo[],
    nextTodoId: 1,
  }),

  getters: {
    getTodos(): Todo[] {
      return this.todos;
    },
  },

  actions: {
    addTodo(text: string): void {
      this.todos.push({ id: this.nextTodoId++, text, completed: false });
    },
    

    toggleTodoStatus(todoId: number): void {
      const todo = this.todos.find((t) => t.id === todoId);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },

    removeTodo(todoId: number): void {
      const index = this.todos.findIndex((todo) => todo.id === todoId);

      if (index !== -1) {
        this.todos.splice(index, 1);
      }
    },

    editTodo(updatedTodo: Todo): void {
      const index = this.todos.findIndex((todo) => todo.id === updatedTodo.id);

      if (index !== -1) {
        this.todos[index] = { ...updatedTodo };
      }
    },

    saveEditedTodo(updatedTodo: Todo): void {
      const index = this.todos.findIndex((todo) => todo.id === updatedTodo.id);

      if (index !== -1 && updatedTodo.text !== null) {
        // Only save if the text is not null
        this.todos[index] = { ...updatedTodo };
      }
    },
  },
});

export const useStore = () => {
  return {
    todo: useTodoStore(),
  };
};
