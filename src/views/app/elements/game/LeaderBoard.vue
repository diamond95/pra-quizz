<template>
    <v-card outlined shaped elevation="4" class="mt-10">
      <v-alert
        color="secondary"
        dark
        :icon="mdiClipboardListOutline "
        border="left"
        prominent
        dense
      >
        <h2 color="secondary" class="mt-2">Leaderboard</h2>
      </v-alert>
      <v-list>
        <v-list-item link>
          <v-list-item-action>
            <v-icon color="primary">mdi-account</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title
              >Izradio:
              <span class="font-weight-black ml-5 float-right">{{
                quizzInformation.username
              }}</span></v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>

        <v-list-item link>
          <v-list-item-action>
            <v-icon color="primary">mdi-help</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title
              >Ukupno pitanja:
              <span class="font-weight-black ml-5 float-right">{{
                quizzInformation.questions_sum
              }}</span></v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>

        <v-list-item link>
          <v-list-item-action>
            <v-icon color="primary">mdi-clock</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title
              >Ukupno trajanje:
              <span class="font-weight-black ml-5 float-right">{{
                quizzInformation.total_time
              }}</span></v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
</template>


<style>
</style>

<script>
import store from "@/store/store";
import QuizService from "@/services/QuizzService";
import { mdiClipboardListOutline  } from "@mdi/js";
export default {
  name: "LeaderBoard",

  data: () => ({
    quizzCode: store.state.gameCode,
    quizzInformation: {},
    mdiClipboardListOutline ,
    selectedItem: 1,
    items: [
      { text: "Real-Time", icon: "mdi-clock" },
      { text: "Audience", icon: "mdi-account" },
      { text: "Conversions", icon: "mdi-flag" },
    ],
  }),

  methods: {
    getQuizzInformation: async function () {
      this.quizzInformation = (
        await QuizService.getQuizzInformation({
          game_pin: this.quizzCode,
        })
      ).data.res;

    },
  },

  created() {
    this.getQuizzInformation();
  },
};
</script>