<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <router-link to="/inbox" class="navbar-brand">Reminders</router-link>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/snoozed" class="nav-link">Snoozed</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/inbox" class="nav-link">Inbox</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/done" class="nav-link">Done</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/new" class="nav-link">New reminder</router-link>
        </li>
      </div>
    </nav>

    <div class="container mt-3">
      <router-view />
    </div>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {

  }
}
</script>

<style>

</style>
