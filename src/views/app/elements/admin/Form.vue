<template>
  <v-container class="mt-5" fluid>
    <v-row justify="center">
      <v-card width="60%">
        <v-form ref="form" v-model="valid">
          <v-row justify="center">
            <v-col cols="12" md="6" lg="6">
              <v-text-field v-model="quizz.title" label="Naziv" required autocomplete="false"></v-text-field>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="12" md="6" lg="6">
              <v-text-field v-model="quizz.pin" label="PIN" required autocomplete="false"></v-text-field>
            </v-col>
          </v-row>
          <v-row justify="center" class="mb-10">
            <v-btn color="secondary" @click="createQuestion()">
              <v-icon>mdi-plus</v-icon>Dodaj pitanje
            </v-btn>
          </v-row>
        </v-form>
      </v-card>
    </v-row>
    <div class="white-space"></div>

    <v-row v-for="(item,i) in questionList" :key="i">
      <v-card class="mb-10" width="100%">
        <v-form ref="form" v-model="valid">
          <v-row class="pa-3">
            <v-col cols="12" md="1" lg="1" sm="1">
              <h3 class="pa-5">{{ i + 1}}.</h3>
            </v-col>
            <v-col cols="12" md="9" lg="9" sm="9">
              <v-text-field
                v-model="item.question.description"
                label="Unesi pitanje"
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
        </v-form>
      </v-card>
    </v-row>
  </v-container>
</template>


<style >
.white-space {
  height: 80px;
}
body {
  overflow: auto !important;
}
</style>

<script>
export default {
  name: "Form",
  components: {},
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
        this.questionList[itemIndex].question.answers.splice(answerIndex, 1)
    }
  }
};
</script>