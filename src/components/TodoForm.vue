<template>
  <div>
    <h2>Add Todo</h2>
    <form @submit.prevent="addTodo">
      <label for="todoText">Todo Text:</label>
      <input id="todoText" v-model="newTodoText" required />
      <button type="submit">Add Todo</button>
    </form>
    <router-link to="/">Todo List</router-link>

  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useTodoStore } from '../store/index';

export default defineComponent({
  setup() {
    const todoStore = useTodoStore();
    const newTodoText = ref('');

    // Add a new todo
    const addTodo = () => {
      const trimmedText = newTodoText.value.trim();

      if (trimmedText !== '') {
        // Call the action to add a new todo
        todoStore.addTodo(trimmedText);
        newTodoText.value = ''; // Clear the input field
      } else {
        // Show an error message or perform other validation logic
        alert('Todo text cannot be empty!');
      }
    };

    return {
      newTodoText,
      addTodo,
    };
  },
});
</script>
