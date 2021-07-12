<template>
  <div class="mt-5">
    <v-btn
      color="secondary"
      class="ma-2 ml-4 white--text"
      @click="createQuizz"
    >
      Kreiraj kviz
      <v-icon
        right
        dark
      >
        mdi-pencil
      </v-icon>
    </v-btn>

    <v-expansion-panels popout class="mt-8" v-if="quizzList && quizzList.length != 0">
      <v-expansion-panel v-for="(item,i) in quizzList" :key="i">
        <v-expansion-panel-header>
          <h3 class="title font-weight-bold font">{{ item.title }}</h3>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-row no-gutters>
            <div class="d-flex align-start flex-column mb-6">
              <v-row no-gutters>
                <p class="font-weight-bold">
                  <v-icon class="max-height">mdi-chevron-right</v-icon>PIN:
                </p>
              </v-row>

              <v-row no-gutters>
                <p class="font-weight-bold">
                  <v-icon class="max-height">mdi-chevron-right</v-icon>Status:
                </p>
              </v-row>

              <v-row no-gutters>
                <p class="font-weight-bold">
                  <v-icon class="max-height">mdi-chevron-right</v-icon>Datum kreiranja:
                </p>
              </v-row>

              <v-row no-gutters>
                <p class="font-weight-bold">
                  <v-icon class="max-height">mdi-chevron-right</v-icon>Ukupno pitanja:
                </p>
              </v-row>
            </div>
            <!-- divider -->
            <v-divider vertical class="mx-4"></v-divider>

            <div class="d-flex align-start flex-column mb-6">
              <v-row no-gutters>
                <p class="ml-2">{{ item.pin }}</p>
              </v-row>

              <v-row no-gutters>
                <p
                  class="ml-2"
                  :class="getColorByTaskStatus(item.active)"
                >{{ item.active == 0 ? 'Neaktivan' : 'Aktivan' }}</p>
              </v-row>
              <v-row no-gutters>
                <p class="ml-2">{{ item.created_at }}</p>
              </v-row>
              <v-row no-gutters>
                <p class="ml-2">{{ item.total }}</p>
              </v-row>
            </div>

            <v-spacer></v-spacer>

            <v-divider vertical class="mx-4"></v-divider>
            
            <v-col cols="2" lg="2" sm="2" md="2">
              <v-row no-gutters class="pa-2">
                <v-btn
                  width="100"
                  elevation="4"
                  @click="deleteQuizz(item.IDQuiz)"
                  color="red"
                  small
                  class="white--text"
                >OBRIŠI</v-btn>
              </v-row>
              <v-row no-gutters class="pa-2">
                <v-btn width="100" elevation="4" color="secondary" @click="runQuizz(item.IDQuiz, item.total)" small>POKRENI</v-btn>
              </v-row>
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <v-alert
      outlined
      class="mt-4"
      type="warning"
      prominent
      border="left"
      v-else
    >
    Započni s izradom svojeg prvog kviza!
    </v-alert>
  </div>
</template>


<style scoped>
.max-height {
  max-height: 15px;
  margin-bottom: 1px;
}
.skeleton-exp-panel {
  max-width: 66em;
  margin-left: 10px;
}
.v-application .headline,
.v-application .title {
  font-family: "Poppins", sans-serif !important;
}
.v-application p {
  margin-bottom: 4px;
}
</style>


<script>
import AdminService from "@/services/AdminService";
import store from "@/store/store";
import moment from "moment";
export default {
  name: "Quizz",
  data: () => ({
    quizzList: null,
    error: null
  }),
  created() {
    this.getQuizzList();
  },

  methods: {
    async runQuizz(IDQuiz, t) {
      try {
        (await AdminService.runQuizz({
          id: IDQuiz
          
        }))
        this.$router.push({
        name: 'RunQuizz',
        params: {
          id: IDQuiz,
          question: 1,
          total: t
        }
      })
      } catch (error) {
        this.error = error
      }
      
    },
    deleteQuizz: async function(IDQuiz) {
      try {
        await AdminService.deleteQuizz({
          id: IDQuiz
        })
        this.getQuizzList()
      } catch (error) {
        this.error = error;
      }
    },
    getQuizzList: async function() {
      try {
        this.quizzList = (await AdminService.getQuizzList({
          IDUser: store.state.userInformation.user.IDUser
        })).data.res;
        this.convertEachDate();
      } catch (error) {
        this.error = error;
      }
    },
    getColorByTaskStatus: function(active) {
      return active == 1 ? "green--text" : "red--text";
    },
    convertEachDate() {
      this.quizzList.forEach(
        x => (x.created_at = this.convertDate(x.promo_startdate))
      );
    },
    convertDate: function(date) {
      return moment.utc(date).format("DD.MM.YYYY");
    },
    createQuizz: function() {
        this.$router.push({
            name: 'CreateQuizz'
        })
    }
  }
};
</script>