<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="2" lg="2" sm="2"
        ><Timer
          :timeLeft.sync="setTimeLeft"
          
          v-if="setTimeLeft != 0" />

       </v-col>
      <v-col cols="12" md="10" lg="10" sm="10">
        <v-card outlined class="mt-5" elevation="4">
          <v-alert color="secondary" dark border="bottom">
            <v-row>
              <v-col cols="12" md="11" lg="11" sm="11">
                <h3 color="secondary" class="mt-2">{{ $route.params.question }}.</h3>
              </v-col>
              <v-col cols="3" lg="1" md="1" sm="1">
                <v-tooltip bottom color="black" v-if="showHideNext">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn color="primary" rounded @click="nextQuestion" v-bind="attrs" v-on="on">
                      <v-icon>mdi-arrow-right-bold</v-icon>
                    </v-btn>
                  </template>
                  <span>Pokreni sljedeće pitanje </span>
                </v-tooltip>
              </v-col>
            </v-row>
          </v-alert>
          <v-card-text><h2>{{ question.description }}</h2></v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <br /><br />
    <v-row justify="center" class="ml-1" v-if="!showHideNext">
      <v-btn color="secondary" rounded @click="quizzFinished">Završi kviz</v-btn>
    </v-row>
  </v-container>
</template>

<style scoped>
</style>


<script>
import Timer from '../game/Timer'
import AdminService from '@/services/AdminService'
export default {
  name: "RunQuestions",
  components: {
    Timer
  },
  data: () => ({
    question: [],
    error: null,
    setTimeLeft: 0,
    total: 0,
    showHideNext: true
  }),
  created() {
    this.getCurrentQuestion();
    this.hasNextQuestion();
    this.startQuestion();
  },
  methods: {
    nextQuestion() {
      //var q = (this.$route.params.question + 1)
      this.$router.push({
        name: "RunQuizz",
        params: {
          id: this.$route.params.id,
          question: (this.$route.params.question + 1)
        }
      });
    },
    getCurrentQuestion: async function() {
      console.log("pozvan...")
      try {
        this.question = (await AdminService.getCurrentQuestion({
          quizID: this.$route.params.id,
          question: this.$route.params.question
        })).data.res
        this.setTimeLeft = this.question.time;
        console.log(this.question)
      } catch (error) {
        this.error = null
      }
    },
    startQuestion: async function() {},
    hasNextQuestion: function() {
      if(this.$route.params.total) {
        localStorage.setItem('total', this.$route.params.total)
      }
      var t = localStorage.getItem('total')
      
      if(t == this.$route.params.question) {
        this.showHideNext = false
        
      }
    },

    quizzFinished: async function() {
      try {
        await AdminService.quizzFinished({
          quizID: this.$route.params.id
        })
        this.$router.push({
          name: 'Home'
        })
      } catch (error) {
        this.error = null
      }
    }
    // questionFinished: async function() {
    //   try {
    //     await AdminService.questionFinished({
    //       IDQuestion: this.$route.params.question
    //     })
    //   } catch (error) {
    //     this.error = error
    //   }
    // }
  }
};
</script>