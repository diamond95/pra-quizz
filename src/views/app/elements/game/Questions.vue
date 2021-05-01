<template>
  <v-container justify="start" class="mt-4">
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-row v-if="quizStarted && questionNotStarted">
      <v-col cols="12" md="11" lg="11" sm="11">
        <v-card outlined class="mt-5" elevation="4">
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
                  v-else-if="
                    question.difficulty > 33 && question.difficulty <= 66
                  "
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
              v-model="questionAnswersIndexes"
              active-class="secondary--text"
              multiple
            >
              <v-divider></v-divider>
              <template v-for="(item, index) in answers">
                <v-list-item :key="item.IDAnswer" :disabled="questionOver">
                  <template v-slot:default="{ active }">
                    <v-list-item-content>
                      <v-list-item-title
                        v-text="item.description"
                        :class="
                          correctAnswers.length > 0 &&
                          correctAnswers[index].is_correct == 1
                            ? 'green--text'
                            : ''
                        "
                      ></v-list-item-title>

                      <v-list-item-subtitle
                        class="text--primary"
                        v-text="item.headline"
                      ></v-list-item-subtitle>
                    </v-list-item-content>

                    <v-list-item-action v-if="!questionOver">
                      <v-icon v-if="!active" color="secondary lighten-2">
                        {{ mdiCheckboxCircleOutline }}
                      </v-icon>

                      <v-icon v-else color="secondary darken-2">
                        {{ mdiCheckboxCircle }}
                      </v-icon>
                    </v-list-item-action>

                    <v-list-item-action
                      v-else-if="
                        questionOver &&
                        correctAnswers.length > 0 &&
                        correctAnswers[index].is_correct == 1
                      "
                    >
                      <v-icon color="green lighten-1">
                        {{ mdiCheckboxCircleOutlineCorrect }}
                      </v-icon>
                    </v-list-item-action>

                    <v-list-item-action v-else>
                      <v-icon color="red lighten-1">
                        {{ mdiWrongAnswer }}
                      </v-icon>
                    </v-list-item-action>
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
      </v-col>
      <v-col cols="12" md="1" lg="1" sm="1"
        ><Timer
          :timeLeft.sync="setTimeLeft"
          @question-finished="questionFinished"
          v-if="setTimeLeft != 0"
      /></v-col>
    </v-row>

    <v-container v-else-if="showNotActive">
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
    <v-container v-else>
      <v-row class="mt-16" justify="center">
        <v-progress-circular
          :size="70"
          :width="7"
          color="red lighten-2"
          indeterminate
        ></v-progress-circular>
      </v-row>
    </v-container>
    <Notification
      v-if="notificationStatus != null"
      :titleProp="notificationTitle"
      :textProp="notificationStatus"
      :dialog.sync="dialog"
      @event-update-dialog="updateNotification"
    ></Notification>
  </v-container>
</template>
<style scoped>
.spacer-100 {
  height: 100px;
}
.theme--light.v-list-item--disabled {
  color: #000000de !important;
}
</style>
<script>
import store from "@/store/store";
import QuizzService from "@/services/QuizzService";
import Timer from "./Timer";
import notificationMixins from "@/mixins/notifications";
import Notification from "../common/Notification";
import {
  mdiSpeedometerSlow,
  mdiSpeedometerMedium,
  mdiSpeedometer,
  mdiCloseThick,
  mdiCheckBold,
} from "@mdi/js";
export default {
  name: "Questions",
  mixins: [notificationMixins],
  components: {
    Timer,
    Notification,
  },
  data: () => ({
    notificationStatus: null,
    notificationTitle: "Greška!",
    dialog: false,
    overlay: false,
    question: {},
    answers: {},
    difficultyHover: false,
    mdiSpeedometerSlow,
    mdiSpeedometerMedium,
    mdiSpeedometer,
    questionAnswersIndexes: [],
    completedPercentage: 0,
    quizStarted: false,
    intervalUpdater: false,
    intervalid7: undefined,
    showNotActive: false,
    setTimeLeft: 0,
    mdiCheckboxCircleOutline: "mdi-checkbox-blank-circle-outline",
    mdiCheckboxCircleOutlineCorrect: mdiCheckBold,
    mdiCheckboxCircle: "mdi-checkbox-blank-circle",
    mdiWrongAnswer: mdiCloseThick,
    questionOver: false,
    correctAnswers: [],
    selectedAnswers: [],
    questionNotStarted: true,
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

        this.setTimeLeft = this.question.time;
      } catch (error) {
        this.notificationStatus = error.response.data.error;
        if (error.response.data.errorCode === 379) {
          setTimeout(() => {
            this.questionNotStarted = false;
            location.href = "#/app/play";
            location.reload();
          }, 1000);
        }
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
        this.notificationStatus = error.response.data.error;
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
      } else {
        this.showNotActive = true;
      }
    },
    stopTimer() {
      /* TODO - test this on production, possibly to fail loc.hash */
      clearInterval(this.intervalid7); // will be a harmless no-op if timer is false
      this.quizStarted = true;
      var startQuizURL = window.location.href;

      if (!window.location.toString().includes("/play/")) {
        // regex stopped working: !/play/.test(window.location.href)
        /* regex for play/$num hash */
        location.href = startQuizURL + "/1";
      }
    },
    questionFinished: function () {
      this.questionOver = true;

      this.questionAnswersIndexes.sort();
      var z = 0;
      this.answers.forEach((element, index) => {
        if (index == this.questionAnswersIndexes[z]) {
          this.selectedAnswers.push(element);
          z++;
        }
      });

      this.getAnswersCorrectInfo();
      this.markQuestionAnswered();
    },

    async getAnswersCorrectInfo() {
      try {
        this.correctAnswers = (
          await QuizzService.getAnswersCorrectInfo({
            gameCode: store.state.gameCode,
            questionNumber: this.$route.params.id,
          })
        ).data.res;
      } catch (error) {
        this.notificationStatus = error.response.data.error;
      }
    },

    markQuestionAnswered: async function () {
      var questionID = this.question.IDQuestion
      
      try {
        var t = (await QuizzService.markQuestionAnswered({
            questionID: questionID
        })).data.res
        console.log(t) // uspjesno je zavrseno pitanje... 
        // todo set timer na 5 sec, load sljedece pitanje 
        // todo ako je pitanje answered, ide na sljedece - provjeriti 
      } catch (error) {
        this.notificationStatus = error.response.data.error;
      }
    }
  },

  created() {
    this.DOMUpdateActiveQuiz();
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