<template>
  <v-main class="grey lighten-5">
    <Navbar :catalogSubgroupValue="false" />
    <Progress :emptySpace="false" />
    <v-row>
      <v-col cols="12" md="2" lg="2" sm="2"></v-col>
        <v-col cols="12" lg="8" sm="8" md="8">
          <Quizz />
        </v-col>
      <v-col cols="12" md="2" lg="2" sm="2"></v-col>
    </v-row>
    
  </v-main>
</template>

<style>
</style>

<script>

import Navbar from "./elements/admin/common/Navbar";
import Quizz from "./elements/admin/Quizz"
import Progress from "./elements/common/Progress";
export default {
  components: {
    Navbar,
    Progress,
    Quizz
  }
};
</script>