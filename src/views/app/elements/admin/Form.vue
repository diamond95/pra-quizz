<template>
  <v-container class="mt-5" fluid>
    <v-form ref="form" v-model="valid">
    <v-row justify="center">
      <v-card width="60%">
        
          <v-row justify="center">
            <v-col cols="12" md="6" lg="6">
              <v-text-field
                v-model="quizz.title"
                :rules="nameRules"
                label="Naziv"
                required
                autocomplete="false"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="12" md="6" lg="6">
              <v-text-field
                v-model="quizz.pin"
                label="PIN"
                :rules="pinRules"
                required
                autocomplete="false"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row justify="center" class="mb-10">
            <v-btn color="secondary" @click="createQuestion()">
              <v-icon>mdi-plus</v-icon>Dodaj pitanje
            </v-btn>
          </v-row>
      </v-card>
    </v-row>
    <div class="white-space"></div>

    <v-row v-for="(item,i) in questionList" :key="i">
      <v-card class="mb-10" width="100%">
          <v-row class="pa-3">
            <v-col cols="12" md="1" lg="1" sm="1">
              <h3 class="pa-5">{{ i + 1}}.</h3>
            </v-col>
            <v-col cols="12" md="9" lg="9" sm="9">
              <v-text-field
                v-model="item.question.description"
                label="Unesi pitanje"
                :rules="[v => !!v || 'Unesi pitanje']"
                required
                outlined
                autocomplete="false"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="1" lg="1" sm="1">
              <v-text-field
                v-model="item.question.time"
                label="Vrijeme"
                required
                :rules="[v => !!v || 'Unesi vrijeme']"
                width="20px"
                type="number"
                autocomplete="false"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="1" lg="1" sm="1">
              <v-btn color="red darken-3" fab small dark class="mt-3" @click="deleteQuestion(i)">
                <v-icon>mdi-delete-forever</v-icon>
              </v-btn>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" md="1" lg="1" sm="1">
              <v-btn color="primary" fab small dark class="ml-3" @click="addAnswer(i)">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </v-col>
            <v-row class="d-flex flex-column mb-6">
              <v-col cols="12" md="11" lg="11" sm="11">
                <v-layout v-for="(answer, index) in item.question.answers" :key="index">
                  <v-btn icon color="red" class="mt-4" @click="removeAnswer(i, index)">
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                  <v-text-field
                    v-model="answer.description"
                    :label="`Odgovor ` + (index + 1) + `:`"
                    required
                    :rules="[v => !!v || 'Unesi odgovor']"
                    autocomplete="false"
                  ></v-text-field>
                  <v-switch
                    class="ml-4"
                    v-model="answer.isCorrect"
                    label="Točno"
                    inset
                    color="primary"
                  ></v-switch>
                </v-layout>
              </v-col>
            </v-row>
          </v-row>
          <v-tooltip left>
            <template v-slot:activator="{ on, attrs }">
              <v-btn fab dark large v-bind="attrs" v-on="on" @click="validate" color="green darken-2" fixed right bottom>
                <v-icon dark>mdi-content-save</v-icon>
              </v-btn>
            </template>
            <span>Kreiraj kviz</span>
          </v-tooltip>
        
      </v-card>
    </v-row>
    </v-form>
    <Notification
      v-if="notificationStatus != null"
      :titleProp="notificationTitle"
      :textProp="notificationStatus"
      :dialog.sync="dialog"
      @event-update-dialog="updateNotification"
    ></Notification>
  </v-container>
  
</template>


<style >
.white-space {
  height: 80px;
}
</style>

<script>
import notificationMixins from "@/mixins/notifications";
import Notification from "../common/Notification";
import store from '@/store/store'
import QuizzService from '@/services/QuizzService'
export default {
  name: "Form",
  mixins: [notificationMixins],
  components: { Notification },
  data: () => ({
    valid: false,
    nameRules: [
      v => !!v || "Naziv je obavezan",
      v => v.length >= 4 || "Naziv mora biti veći od 4 znaka"
    ],
    pinRules: [
      v => !!v || "PIN je obavezan",
      v => v.length >= 6 || "PIN mora biti veći od 6 znakova"
    ],
    dialog: false,
    error: null,
    notificationStatus: null,
    notificationTitle: "Greška!",
    quizz: {
      title: "",
      pin: ""
    },
    questionList: [
      {
        question: {
          description: "",
          time: 20,
          answers: [
            {
              description: "",
              isCorrect: false
            },
            {
              description: "",
              isCorrect: false
            }
          ]
        }
      },
      {
        question: {
          description: "",
          time: 20,
          answers: [
            {
              description: "",
              isCorrect: false
            },
            {
              description: "",
              isCorrect: false
            }
          ]
        }
      }
    ]
  }),
  created() {},

  computed: {},

  methods: {
    createQuestion: function() {
      this.questionList.push({
        question: {
          description: "",
          time: 20,
          answers: [
            {
              description: "",
              isCorrect: false
            },
            {
              description: "",
              isCorrect: false
            }
          ]
        }
      });
    },
    validate() {
      var validation = this.$refs.form.validate();
      if(validation) this.createQuizz();
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    deleteQuestion: function(i) {
      this.questionList.splice(i, 1);
    },
    addAnswer: function(i) {
      if (this.questionList[i].question.answers.length === 10) return;
      this.questionList[i].question.answers.push({
        description: "",
        isCorrect: false
      });
    },
    removeAnswer: function(itemIndex, answerIndex) {
      this.questionList[itemIndex].question.answers.splice(answerIndex, 1);
    },
    createQuizz: async function() {
      try {
        var create = (await QuizzService.createQuizz({
        quizz: this.quizz,
        questions: this.questionList,
        userID: store.state.userInformation.user.IDUser
      })).data.res

      if(create) {
        this.notificationTitle = `Uspješno!`
        this.notificationStatus = `Kviz je uspješno kreiran!`

        setTimeout( () => (
          this.$router.push({
            name: 'Home'
          })
        ), 2500)
      }
      } catch (error) {
        this.error = error
        this.notificationTitle = `Greška!`
        this.notificationStatus = `Dogodila se pogreška prilikom kreiranja kviza!`
      }
      
     
    }
  }
};
</script>