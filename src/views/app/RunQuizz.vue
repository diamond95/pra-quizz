<template>
  <v-main class="grey lighten-5">
    <Navbar :catalogSubgroupValue="false" />
    <Progress :emptySpace="false" />
   
    <v-row>
      
      <v-col cols="12" md="10" lg="10" sm="10"><RunQuestions @scoreboard="setList" /></v-col>
      <v-col cols="12" md="2" lg="2" sm="2">
        <LeaderBoard :data="scoreboardProp" v-if="scoreboardProp.length > 0" />
      </v-col>
    </v-row>
    
  </v-main>
</template>

<style>
</style>

<script>

import Navbar from "./elements/admin/common/Navbar";
import Progress from "./elements/common/Progress";
import LeaderBoard from './elements/game/LeaderBoard';
import RunQuestions from './elements/admin/RunQuestions'
export default {
  components: {
    Navbar,
    Progress,
    LeaderBoard,
    RunQuestions
  },
  data: () => ({
    scoreboardProp: []
  }),
  methods: {
    setList(data) {
      console.log(data)
      this.scoreboardProp = data
    }
  }
};
</script>