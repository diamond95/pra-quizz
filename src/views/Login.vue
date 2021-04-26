<template>
  <v-app id="inspire" class="myFont">
    <v-container class="fill-height color" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card class="elevation-12 login-container">
            <v-toolbar class="background-login" dark flat>
              <v-toolbar-title>Quizz</v-toolbar-title>
              
            </v-toolbar>
            <v-card-text>
              <v-form @keydown.native.enter="attemptLogin">
                <v-text-field
                  :loading="loading"
                  v-on:keyup="error = null, success = null"
                  autocomplete="on"
                  name="email"
                  v-model="email"
                  id="email"
                  prepend-icon="person"
                  type="email"
                  color="#205a8a"
                  label="Email"
                />

                <v-text-field
                  
                  :loading="loading"
                  v-on:keyup="error = null, success = null"
                  name="password"
                  autocomplete="new-password"
                  v-model="password"
                  id="password"
                  label="Lozinka"
                  prepend-icon="lock"
                  type="password"
                  color="#205a8a"
                />
              </v-form>
            </v-card-text>
            <v-card-text>
              <div v-if="error === null"></div>
              <div class="alert alert-danger text-center" role="alert" v-html="error" />
            </v-card-text>

            <v-card-actions>
              <v-spacer />
              <v-btn
                @click="attemptLogin()"
                color="primary"
                class="white--text"
                raised
                :loading="loading2"
                :disabled="loading2"
              >Prijava</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

  </v-app>
</template>
<style scoped>
.logo {
  width: 30px;
  transform: scale(0.6, 0.5);
  left: 30px;
}
.background-login {
  background-image: linear-gradient( 111.1deg,  rgba(0,40,70,1) -4.8%, rgba(255,115,115,1) 82.7%, rgba(255,175,123,1) 97.2% );
}
.color {
  background-color: #f5f5f5;
}
.myFont {
  font-family: "Poppins", sans-serif;
}
.login-container {
  filter: drop-shadow(0px 2px 2px grey);
  animation: animate 1.6s ease;
}
@keyframes animate {
  0% {
    opacity: 0;
    transform: translateY(-80px);
  }
  100% {
    opacity: 1;
    transform: translateY(0px);
  }
}
</style>

<script>
"use strict";
export default {
  name: "Login",
  components: {},
  data() {
    return {
      email: "",
      password: "",
      error: null,
      loading: false,
      loader: null,
      loading2: false,
      data: null,
      labelKeys: [
        "LOGIN_EMAIL",
        "LOGIN_PASSWORD",
        "LOGIN_EMAIL_PLACEHOLDER",
        "LOGIN_PASSWORD_PLACEHOLDER",
        "LOGIN_BUTTON"
      ],
      labelData: {},
      o: {},
      iHaveData: false,
      overlay: true
    };
  },
  async created() {},
  async mounted() {},

  methods: {
    attemptLogin: function() {
      this.$router.push({
        name: 'Home'
      })
    },
    welcome: function() {
      /* eslint-disable */
      return console.log(
        "%cm>PRA",
        "color:#389fff; background:white; font-size:24px;"
      );
    }
  }
};
</script>
