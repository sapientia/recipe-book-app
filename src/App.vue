<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-light bg-light">
      <router-link to="/" class="navbar-brand">Home</router-link>
      <div class="navbar-nav mr-auto">
      </div>
    </nav>

    <div class="container">
      <h1>Cook Book</h1>
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>
