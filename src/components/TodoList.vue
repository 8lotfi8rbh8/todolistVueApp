<template>
  <div>
    <h2>Todo List</h2>
    <table>
      <thead>
        <tr>
          <th>Completed</th>
          <th>Todo</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="todo in todos" :key="todo.id">
          <td>
            <input type="checkbox" v-model="todo.completed" />
          </td>
          <td>
            <span v-if="!todo.editing" :class="{ completed: todo.completed }">{{ todo.text }}</span>
            <input v-else v-model="editedTodo.text" @blur="saveEditedTodo()" @keyup.enter="saveEditedTodo()" required/>
          </td>
          <td>
            <button @click="toggleTodoStatus(todo)">Toggle Status</button>
            <button @click="removeTodo(todo.id)">Remove</button>
            <button @click="toggleEdit(todo)">Edit</button>
          </td>
        </tr>
      </tbody>
    </table>

    <router-link to="/add">Add Todo</router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useTodoStore } from '../store';
import { BiCheckSquareFill } from "oh-vue-icons/icons";
interface Todo {
  id: number;
  text: string;
  completed: boolean;
  editing?: boolean;
}

export default defineComponent({
  
  setup() {
    const todoStore = useTodoStore();

    // Access the todos from the store
    const todos = todoStore.todos;

    // Editing state and edited todo
    const editedTodo = ref<Todo | null>(null);

    // Toggle the status of a todo
    const toggleTodoStatus = (todo: Todo): void => {
      // Call the action to toggle the status
      todoStore.toggleTodoStatus(todo.id);
    };

    // Remove a todo
    const removeTodo = (todoId: number): void => {
      // Call the action to remove the todo
      todoStore.removeTodo(todoId);
    };

    // Toggle edit mode
    const toggleEdit = (todo: Todo): void => {
      // Reset editedTodo
      editedTodo.value = { ...todo };
      
      // Toggle editing mode
      todo.editing = !todo.editing;
    };

    // Save edited todo
    const saveEditedTodo = (): void => {
      if (editedTodo.value) {
        // Call the action to edit the todo
        todoStore.editTodo({ ...editedTodo.value });
        
        // Reset editedTodo and toggle editing mode
        editedTodo.value = null;
      }
    };

    return {
      todos,
      toggleTodoStatus,
      removeTodo,
      toggleEdit,
      editedTodo,
      saveEditedTodo,
    };
  },
});
</script>

<style scoped>
.completed {
  text-decoration: line-through;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th, td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.filters {
  margin-bottom: 20px;
}

.filters button {
  margin-right: 10px;
}

.todo-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  padding: 10px;
  }
</style>