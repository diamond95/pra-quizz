<template>
  <v-main class="grey lighten-5">
    <Navbar :catalogSubgroupValue="false" />
    <Progress :emptySpace="false" />
    <Questions />

  </v-main>
</template>

<style>
</style>

<script>

import Navbar from "./elements/common/Navbar";
import Questions from './elements/game/Questions'
import Progress from "./elements/common/Progress";
export default {
  components: {
    Navbar,
    Progress,
    Questions
  }
};
</script>