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
              {{ routeChanged.id }}.
            </h3>
            <v-spacer></v-spacer>
            <!-- <v-badge
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
            </v-badge> -->
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
          v-if="setTimeLeft != 0" />

       </v-col>
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
      <div class="spacer-200"></div>
      <v-row justify="center">
        <div v-for="guest in guestList" :key="guest.IDGuest">
          <v-chip class="ma-2" color="secondary" outlined>
            <v-icon left> mdi-account-outline </v-icon>
            {{ guest.nickname }}
          </v-chip>
        </div>
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
.spacer-200 {
  height: 200px;
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
    prepareTimer: null,
    nextQuestionNumber: undefined,
    guestList: [],
    interval19: false,
    nextparam: null
  }),

  methods: {
    getNextParam() {
      this.nextparam = parseInt(this.$route.params.id) + 1
    },
    showLoader() {
      this.overlay = true;
      setTimeout(() => (this.overlay = false), 200);
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
          this.questionNotStarted = false;
          setTimeout(() => {
            
            location.href = "#/app/play";
            location.reload(); // todo - sto napraviti ako su neka pitanja vec zavrsila, potreban je redirect na late join
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
        console.log(store.state.gameCode)
        console.log(this.$route.params.id)
      } catch (error) {
        this.notificationStatus = error.response.data.error;
      }
    },
    calculatePercentage(partialValue, totalValue) {
      return (100 * partialValue) / totalValue;
    },
    getCurrentGuests: async function () {
      try {
        this.guestList = (
          await QuizzService.getCurrentGuests({
            quizID: store.state.quizInfo.IDQuiz,
          })
        ).data.res;
      } catch (error) {
        this.notificationStatus = error.response.data.error;
      }
    },
    DOMUpdateActiveQuiz: function () {
      //const self = this;
      this.intervalid7 = setInterval(this.timer, 2000);
    },
    async timer() {
      var quiz = (
        await QuizzService.isActiveQuizz({
          gameCode: store.state.gameCode,
        })
      ).data.res;

      this.getCurrentGuests();

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
        // save selected to db
      });

      this.getAnswersCorrectInfo();

      this.markQuestionAnswered()
      //this.intervalid19 = setInterval(this.prepareForNextQuestion, 3000);
      //this.prepareForNextQuestion()
    },
    // async prepareForNextQuestion() {
    //   var next = this.markQuestionAnswered();
    //   console.log(next)
    //   if(next) {
    //     //clearInterval(this.intervalid19);
    //     //this.loadNext();
    //   }
    // },
    loadNext: async function () {
      this.prepareTimer = null;
      var totalQuestions = store.state.questionSum;
      if (this.$route.params.id <= totalQuestions) {
        var currentQuestion = parseInt(this.$route.params.id);
        this.nextQuestionNumber = currentQuestion + 1;
        /* reset questions, answers, correct answ */
        this.resetLastState();

        this.$router.push({
          name: "LiveQuizz",
          params: {
            id: this.nextQuestionNumber,
          },
        });
      }
    },

    resetLastState() {
      this.question = {};
      this.answers = {};
      this.correctAnswers = [];
      this.selectedAnswers = [];
      this.questionOver = false;
      this.questionAnswersIndexes = [];
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
      //var questionID = this.question.IDQuestion;
      var questionID = this.nextparam
      try {
        var marked = (
          await QuizzService.markQuestionAnswered({
            questionID: questionID,
            gameCode: store.state.gameCode,
          })
        ).data;

        if (marked.next === false) {
          if(this.interval19 == false) {
            this.intervalid19 = setInterval(this.markQuestionAnswered, 1000);
            this.interval19 = true;
          }
        } else if(marked.next === true) {
          this.setTimeLeft = 0;
          clearInterval(this.intervalid19);
          this.interval19 = false;
          this.loadNext()
          // this.notificationStatus = `Error`;
        } else if(marked.next === null) {
          // console.log("quiz over?");
          clearInterval(this.intervalid19);
          this.notificationTitle = `Kviz je završio!`
          this.notificationStatus = `Odjava...`
          setTimeout( () => (
            this.$store.dispatch('logOut'),
            this.$router.push({
              name: 'HomePage'
            })
          ), 2500)
        }
      } catch (error) {
        this.notificationStatus = error.response.data.error;
      }
    },
  },

  created() {
    this.DOMUpdateActiveQuiz();
    this.getNextParam()
  },

  computed: {
    routeChanged: function () {
      //this.showLoader();
      if (this.$route.params.id) {
        this.getQuestion();
        this.getAnswers();
      }

      return this.$route.params;
    },
  },
};
</script>