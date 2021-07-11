<template>
  <div>
    <section class="bg-account-pages height-100vh">
      <div class="display-table">
        <div class="display-table-cell">
          <div class="container">
            <v-row>
              <v-card width="50%">
                <div class="text-center mt-3">
                  <h3 class="font-weight-bold">
                    <a href="/" class="text-dark text-uppercase account-pages-logo">Super Quizz</a>
                  </h3>
                  <p class="text-muted">Resetiranje računa</p>
                </div>
                <v-row justify="center">
                  <div class="ml-5">Molimo unesite novu lozinku ( min. 8 znakova)</div>
                  <br />
                </v-row>
                <v-row justify="center">
                  <v-col cols="12" lg="10" sm="10" md="10">
                    <v-text-field label="Nova lozinka" v-model="newpw" outlined></v-text-field>
                  </v-col>
                </v-row>
                <v-row justify="center">
                  <v-btn color="secondary" @click="saveNewPassword">Spremi</v-btn>
                </v-row>
                <br />
                <v-row justify="center">
                  <p> {{ status }}</p>
                </v-row>
                <br /><br />
                <v-row justify="center" >
                    <v-btn color="primary" v-if="showLoginButton" @click="loginPage">Prijava</v-btn>
                </v-row>
                <br />
                <br />
              </v-card>
            </v-row>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<style scoped>
.bg-account-pages {
  background: linear-gradient(to right, #512da8, #711e72);
  opacity: 0.9;
}
.display-table-cell {
  display: table-cell;
  vertical-align: middle;
}

.display-table {
  display: table;
  width: 100%;
  height: 100%;
}
.account-card form .form-control {
  height: 45px;
}

.account-card form label {
  font-size: 15px;
}
.height-100vh {
  height: 100vh;
}
.account-card .custom-control-input:checked ~ .custom-control-label::before {
  background: #fb3e3e;
  border-color: #fb3e3e;
}

.account-card .alert {
  font-size: 14px;
}
.container {
  width: 90%;
}
.account-home-btn {
  position: absolute;
  top: 18px;
  right: 28px;
  z-index: 1;
}

.account-pages-logo {
  letter-spacing: 2px;
}

.account-card form .form-control {
  height: 45px;
}

.account-card form label {
  font-size: 15px;
}

.account-card .custom-control-input:checked ~ .custom-control-label::before {
  background: #fb3e3e;
  border-color: #fb3e3e;
}

.account-card .alert {
  font-size: 14px;
}
</style>
<script>
"use strict";
import AuthService from "@/services/AuthService";
export default {
  name: "NewPassword",
  components: {},
  methods: {
    /**
     * @description Function for set new password after clicking on email verification link
     * @method POST
     */
    saveNewPassword: async function() {
        if(!this.$route.params.email) return;

        var emailDecoded = Buffer.from(this.$route.params.email, 'base64').toString()

        try {
            var change = (await AuthService.changePassword({
                email: emailDecoded,
                password: this.newpw
            })).data.res
            change ? this.status = `Uspješno promjenjena lozinka!` : this.status = `Dogodila se greška prilikom izmjene lozinke!`
            change ? this.showLoginButton = true : ''
        } catch (error) {
            this.error = error
        }

    },
    loginPage: function() {
        this.$router.push({
            name: 'HomePage'
        })
    }
  },
  data() {
    return {
      password: "",
      confirm_password: "",
      error: null,
      success: null,
      loginButton: false,
      newpw: '',
      status: '',
      showLoginButton: false,
    };
  }
};
</script>
