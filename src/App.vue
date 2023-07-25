<template>
  <ul class="app-menu">
    <li v-for="(route, i) in routes">
      <router-link :to="route.path" v-if="route.name">
        {{ route.path.slice(1) }}. {{ route.name }}
      </router-link>
    </li>
  </ul>
  <router-view></router-view>
</template>

<script setup>
import { useRouter } from "vue-router";
const routes = useRouter().getRoutes();
// console.log(routes);
</script>

<style lang="less">
.app-menu {
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  li {
    margin: 0 10px;
  }
}
</style>
