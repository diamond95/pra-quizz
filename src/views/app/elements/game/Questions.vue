<template>
  <v-container justify="start" class="mt-4">
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-card outlined class="mt-5" elevation="4" v-if="quizStarted">
      <v-alert color="secondary" dark border="bottom">
        <h3 color="secondary" class="mt-2">
          {{ routeChanged.id }}. {{ question.description }}
        </h3>
        <v-spacer></v-spacer>
        <v-badge
          :value="true"
          :color="calculateDifficulty()"
          :content="question.difficulty + '%'"
          class="mb-2"
          right
          bottom
          transition="slide-x-transition"
        >
          <v-hover v-model="difficultyHover">
            <v-icon
              color="primary lighten-1"
              large
              v-if="question.difficulty <= 33"
            >
              {{ mdiSpeedometerSlow }}
            </v-icon>
            <v-icon
              color="orange lighten-1"
              large
              v-else-if="question.difficulty > 33 && question.difficulty <= 66"
            >
              {{ mdiSpeedometerMedium }}
            </v-icon>
            <v-icon color="red lighten-1" large v-else>
              {{ mdiSpeedometer }}
            </v-icon>
          </v-hover>
        </v-badge>
      </v-alert>
      <div class="spacer-100"></div>
      <v-list two-line>
        <v-list-item-group
          v-model="questionAnswered"
          active-class="secondary--text"
          multiple
        >
          <v-divider></v-divider>
          <template v-for="(item, index) in answers">
            <v-list-item :key="item.IDAnswer">
              <template v-slot:default="{}">
                <!-- active u slot -->
                <v-list-item-content>
                  <v-list-item-title
                    v-text="item.description"
                  ></v-list-item-title>

                  <v-list-item-subtitle
                    class="text--primary"
                    v-text="item.headline"
                  ></v-list-item-subtitle>
                </v-list-item-content>

                <!-- <v-list-item-action>
                  <v-icon v-if="!active" color="grey lighten-1">
                    mdi-check-circle-outline
                  </v-icon>

                  <v-icon v-else color="green darken-3"> mdi-check-circle </v-icon>
                </v-list-item-action> -->
              </template>
            </v-list-item>
            <v-divider :key="index + 'DIVIDER'"></v-divider>
          </template>
        </v-list-item-group>
      </v-list>
      <v-progress-linear
        color="secondary"
        :value="completedPercentage"
        height="25"
        aria-disabled="true"
      >
        <strong class="white--text"
          >{{ Math.ceil(completedPercentage) }}%</strong
        >
      </v-progress-linear>
    </v-card>
    <v-container v-else>
      <v-row justify="center">
        <v-card outlined class="mt-5" elevation="4">
          <v-alert
            class="mb-0"
            text
            prominent
            type="error"
            icon="mdi-alert-circle-outline"
          >
            Kviz trenutno nije aktivan. Pričekajte dok host pokrene kviz...
          </v-alert>
        </v-card>
      </v-row>
      <v-row class="mt-16" justify="center">
        <v-progress-circular
          :size="70"
          :width="7"
          color="red lighten-2"
          indeterminate
        ></v-progress-circular>
      </v-row>
    </v-container>
  </v-container>
</template>
<style>
.spacer-100 {
  height: 100px;
}
</style>
<script>
import store from "@/store/store";
import QuizzService from "@/services/QuizzService";
import {
  mdiSpeedometerSlow,
  mdiSpeedometerMedium,
  mdiSpeedometer,
} from "@mdi/js";
export default {
  name: "Questions",

  data: () => ({
    overlay: false,
    question: {},
    answers: {},
    difficultyHover: false,
    mdiSpeedometerSlow,
    mdiSpeedometerMedium,
    mdiSpeedometer,
    questionError: null,
    answersError: null,
    questionAnswered: [],
    completedPercentage: 0,
    quizStarted: false,
    intervalUpdater: false,
    intervalid7: undefined,
  }),

  methods: {
    showLoader() {
      this.overlay = true;
      setTimeout(() => (this.overlay = false), 800);
    },
    calculateDifficulty: function () {
      if (this.question.difficulty <= 33) {
        return "primary accent-4";
      } else if (
        this.question.difficulty > 33 &&
        this.question.difficulty <= 66
      ) {
        return "orange accent-4";
      } else {
        return "red accent-4";
      }
    },
    getQuestion: async function () {
      var gameCode = store.state.gameCode;
      try {
        this.question = (
          await QuizzService.getQuestion({
            gameCode: gameCode,
            questionNumber: this.$route.params.id,
          })
        ).data.res;
        this.completedPercentage = this.calculatePercentage(
          this.routeChanged.id,
          store.state.questionSum
        );
      } catch (error) {
        this.questionError = error.response.data.error;
      }
    },
    getAnswers: async function () {
      try {
        this.answers = (
          await QuizzService.getAnswers({
            gameCode: store.state.gameCode,
            questionNumber: this.$route.params.id,
          })
        ).data.res;
      } catch (error) {
        this.answersError = error.response.data.error;
      }
    },
    calculatePercentage(partialValue, totalValue) {
      return (100 * partialValue) / totalValue;
    },
    DOMUpdateActiveQuiz: function () {
      //const self = this;
      this.intervalid7 = setInterval(this.timer, 3000);
    },
    async timer() {
      var quiz = (
        await QuizzService.isActiveQuizz({
          gameCode: store.state.gameCode,
        })
      ).data.res;

      if (quiz.active == 1) {
        this.stopTimer();
      }
    },
    stopTimer() {
      clearInterval(this.intervalid7); // will be a harmless no-op if myDisco is false
      this.quizStarted = true;
    },
  },

  created() {
    this.DOMUpdateActiveQuiz();
  },

  beforeUpdate() {
    this.$nextTick(() => {
      console.log("beforeUpdate");
    });
  },

  computed: {
    routeChanged: function () {
      this.showLoader();
      if (this.$route.params.id) {
        this.getQuestion();
        this.getAnswers();
      }

      return this.$route.params;
    },
  },
};
</script>