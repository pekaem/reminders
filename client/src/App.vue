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
          <router-link to="/shopping" class="nav-link">Shopping</router-link>
        </li>
      </div>
      <div class="navbar-nav ml-auto">
        <li class="nav-item" v-if="isShopping">
          <button @click="emitNewList()" class="plus-button"></button>
        </li>
      </div>
    </nav>
    <div class="container mt-3">
      <router-view />
    </div>
  </div>
</template>

<script>
import { EventBus } from '@/event-bus';

export default {
  name: "App",
  components: {},
  computed: {
    isShopping() {
      return this.$route.path === "/shopping";
    },
  },
  methods: {
    emitNewList() {
      EventBus.$emit('new-shopping-list');
    }
  }
};
</script>

<style>
.plus-button {
  --t:5px;   /* Thickness */
  --l:40px;  /* size of the symbol */
  --s:8px;  /* space around the symbol */
  --c1:#fff; /* Plus color*/
  --c2:green; /* background color*/

  display:inline-block;
  width:var(--l);
  height:var(--l);
  padding:var(--s);
  box-sizing:border-box;
  
  background:
    linear-gradient(var(--c1) 0 0) content-box,
    linear-gradient(var(--c1) 0 0) content-box,
    var(--c2);
  background-position:center;
  background-size: 100% var(--t),var(--t) 100%;
  background-repeat:no-repeat;
  border-radius: 50%;
}
</style>
