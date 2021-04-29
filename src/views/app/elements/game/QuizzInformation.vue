<template>

    <v-card class="mt-12" outlined shaped elevation="4">
      <v-alert
        color="secondary"
        dark
        :icon="mdiHelpCircleOutline"
        border="left"
        prominent
        dense
      >
        <h2 color="secondary" class="mt-2">{{ quizzInformation.title }}</h2>
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
import { mdiHelpCircleOutline } from "@mdi/js";
export default {
  name: "QuestionsCard",

  data: () => ({
    quizzCode: store.state.gameCode,
    quizzInformation: {},
    mdiHelpCircleOutline,
  }),

  methods: {
    getQuizzInformation: async function () {
      this.quizzInformation = (
        await QuizService.getQuizzInformation({
          game_pin: this.quizzCode,
        })
      ).data.res;

      this.$store.dispatch('setQuestionSum', this.quizzInformation.questions_sum)
      this.$store.dispatch('setQuizInfo', this.quizzInformation)
    },
  },

  created() {
    this.getQuizzInformation();
  },
};
</script>