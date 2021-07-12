<template>
  <v-app class="font" id="app">
    <router-view :key="$route.path" />
  </v-app>
</template>

<script>
import "vuetify/dist/vuetify.min.css";
export default {
  name: "App",
  components: {}
};
</script>

<style>
.font {
  font-family: "Poppins", sans-serif;
}

.v-application {
  font-family: "Poppins", sans-serif !important;
}

#app {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>