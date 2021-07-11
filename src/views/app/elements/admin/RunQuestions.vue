<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="12" lg="12" sm="12">
        <v-card outlined class="mt-5" elevation="4">
          <v-alert color="secondary" dark border="bottom">
            <v-row>
              <v-col cols="12" md="11" lg="11" sm="11">
                <h3 color="secondary" class="mt-2">{{ $route.params.question }}.</h3>
              </v-col>
              <v-col cols="3" lg="1" md="1" sm="1">
                <v-tooltip bottom color="black">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn color="primary" rounded @click="nextQuestion" v-bind="attrs" v-on="on">
                      <v-icon>mdi-arrow-right-bold</v-icon>
                    </v-btn>
                  </template>
                  <span>Pokreni sljedeće pitanje</span>
                </v-tooltip>
              </v-col>
            </v-row>
          </v-alert>
          <v-card-text>{{ question}}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
</style>


<script>
export default {
  name: "RunQuestions",
  data: () => ({
    question: "Testiranje........."
  }),
  created() {
    this.getCurrentQuestion();
    this.startQuestion();
  },
  methods: {
    nextQuestion() {
      this.$router.push({
        name: "RunQuizz",
        params: {
          id: this.$route.params.id,
          question: (this.$route.params.question + 1)
        }
      });
    },
    getCurrentQuestion: async function() {},
    startQuestion: async function() {}
  }
};
</script>