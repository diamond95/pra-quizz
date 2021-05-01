<template>
  <v-main class="grey lighten-5">
    <Navbar :catalogSubgroupValue="false" />
    <Progress :emptySpace="false" />
    <v-row>
      <v-col cols="12" md="2" lg="2" sm="2">
        <QuizzInformation />

        <LeaderBoard />
      </v-col>
      <v-col cols="12" md="10" lg="10" sm="10"><Questions /></v-col>
    </v-row>
  </v-main>
</template>

<style>
</style>

<script>
import Navbar from "./elements/common/Navbar";
import Questions from "./elements/game/Questions";

import QuizzInformation from "./elements/game/QuizzInformation";
import LeaderBoard from "./elements/game/LeaderBoard";
import Progress from "./elements/common/Progress";
export default {
  components: {
    Navbar,
    Progress,
    QuizzInformation,
    LeaderBoard,
    Questions,
  },
};
</script>