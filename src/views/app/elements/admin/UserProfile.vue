<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-card>
          <v-card-title>
            <span class="text-h5">Izmjena profila</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row justify="center">
                <v-col cols="12" sm="6" md="5">
                  <v-text-field label="Korisničko ime" v-model="username" :rules="usernameRules" autocomplete="off" required></v-text-field>
                </v-col>
              </v-row>
              <v-row justify="center">
                <v-col cols="12" sm="6" md="5">
                  <v-text-field label="Lozinka" autocomplete="off" v-model="password" :rules="passwordRules" type="password" required></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="btnOk">Odustani</v-btn>
            <v-btn color="primary darken-1" text @click="validate">Spremi</v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </v-row>
</template>

<script>
import AdminService from '@/services/AdminService'
import store from '@/store/store'
export default {
  props: {
    dialog: {
      type: Boolean
    }
  },
  data: () => ({
      valid: true,
      username: '',
      password: '',
      usernameRules: [
        v => !!v || 'Korisničko ime je obavezno',
        v => (v && v.length > 5) || 'Korisničko ime mora sadržavati više od 5 znakova',
      ],
      passwordRules: [
        y => !!y || 'Lozinka je obavezna',
        y => (y && y.length > 5) || 'Lozinka mora sadržavati više od 5 znakova',
      ],
  }),
  methods: {
    btnOk: function() {
      this.$emit("dialogEvent");
    },
    editProfile: async function() {
        await AdminService.editProfile({
            email: store.state.userInformation.user.email,
            username: this.username,
            password: this.password
        })
        this.btnOk()
        this.$store.dispatch('newUsername', this.username)
    },
    validate () {
        var form  = this.$refs.form.validate()

        form && this.editProfile()
      },
      reset () {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },
  }
};
</script>