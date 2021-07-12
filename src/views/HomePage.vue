<template>
  <div>
    <div id="preloader" v-show="elementVisible">
      <div id="status">
        <img src="../assets/img/loading.gif" alt="Molimo pričekajte..." />
      </div>
    </div>

    <!--=========== Main Header area ===============-->
    <header id="home">
      <div class="main-navigation">
        <div class="container">
          <div class="row">
            <!-- logo-area-->
            <div class="col-xl-2 col-lg-3 col-md-3">
              <div class="logo-area">
                <a href="#"
                  ><img src="../assets/img/logo.png" alt="Quizz.hr"
                /></a>
              </div>
            </div>
            <v-spacer></v-spacer>
            <!-- mainmenu-area-->
            <div class="col-xl-7 col-lg-7 col-md-7">
              <div class="main-menu f-right">
                <nav id="mobile-menu">
                  <ul>
                    <li>
                      <div class="login">
                        <a href="#register" class="skill-btn">{{
                          $t("homePage.register_btn")
                        }}</a>
                      </div>
                    </li>
                    <li>
                      <div class="login">
                        <a href="#login" class="skill-btn">{{
                          $t("homePage.login_btn")
                        }}</a>
                      </div>
                    </li>
                  </ul>
                </nav>
              </div>
              <!-- mobile menu-->
              <div class="mobile-menu"></div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!--Login-->
    <form action="" method="POST" name="login" @keydown.enter="userLogin">
      <div class="login-box-area">
        <div id="login" class="fade">
          <a href="#" class="close-btn">
            <b>X</b>
          </a>
          <ul>
            <li>
              <input
                v-bind:placeholder="$t('homePage.fade_screen.username')"
                class="input-username"
                spellcheck="false"
                type="text"
                v-model="login.username"
                autocomplete="off"
              />
            </li>
            <br />
            <li>
              <input
                v-bind:placeholder="$t('homePage.fade_screen.password')"
                class="input-pw"
                type="password"
                autocomplete="off"
                v-model="login.password"
              />
            </li>

            <br />
            <li>
              <div class="login">
                <button
                  type="button"
                  @click="userLogin"
                  name="login"
                  class="loginform-btn"
                >
                  <i class="fa fa-user"></i> {{ $t("homePage.login_btn") }}
                </button>
              </div>
            </li>
            <br />
            <li>
              <a href="#reset"
                ><font color="white">{{
                  $t("homePage.fade_screen.reset_password")
                }}</font></a
              >
            </li>
            <br />
            <li>
              <p class="white--text">{{ errorLogin }}</p>
            </li>
          </ul>
        </div>
      </div>
    </form>
    <!-- end login -->

    <!--reset pass-->
    <form action="" method="POST" name="login" @keydown.enter="userLogin">
      <div class="login-box-area">
        <div id="reset" class="fade">
          <a href="#" class="close-btn">
            <b>X</b>
          </a>
          <ul>
            <li>
              <input
                v-bind:placeholder="$t('homePage.fade_screen.email')"
                class="input-username"
                spellcheck="false"
                type="text"
                v-model="resetAccount.email"
                autocomplete="off"
              />
            </li>
            <br />
            
            <li>
              <div class="login">
                <button
                  type="button"
                  @click="resetAccountFn"
                  name="login"
                  class="loginform-btn"
                >
                  <i class="fa fa-user"></i> {{ $t("homePage.password_reset_btn") }}
                </button>
              </div>
            </li>
            
            <br />
            <li>
              <p class="white--text">{{ errorResetAccount }}</p>
            </li>
          </ul>
        </div>
      </div>
    </form>
    <!-- end reset passw -->

    <!--create new pass-->
    <form action="" method="POST" name="login" @keydown.enter="userLogin">
      <div class="login-box-area">
        <div id="createPassword" class="fade">
          <a href="#" class="close-btn">
            <b>X</b>
          </a>
          <ul>
            <li>
              <input
                v-bind:placeholder="$t('homePage.fade_screen.email')"
                class="input-username"
                spellcheck="false"
                type="text"
                v-model="resetAccount.newPassword"
                autocomplete="off"
              />
            </li>
            <br />
          
            <li>
              <div class="login">
                <button
                  type="button"
                  @click="resetAccountFn"
                  name="login"
                  class="loginform-btn"
                >
                  <i class="fa fa-user"></i> {{ $t("homePage.password_reset_btn") }}
                </button>
              </div>
            </li>
            
            <br />
            <li>
              <p class="white--text">{{ errorResetAccount }}</p>
            </li>
          </ul>
        </div>
      </div>
    </form>
    <!-- create new passw -->

    <!--Register-->
    <form
      action=""
      method="POST"
      name="register"
      autocomplete="off"
      @keydown.enter="userRegistration"
    >
      <div class="register-box-area">
        <div id="register" class="fade">
          <a href="#" class="close-btn-white">
            <b>X</b>
          </a>
          <ul>
            <li>
              <input
                v-model="registration.email"
                placeholder="Email"
                class="input-email"
                name="email"
                spellcheck="false"
                type="email"
              />
            </li>
            <br />
            <li>
              <input
                v-model="registration.username"
                v-bind:placeholder="$t('homePage.fade_screen.username')"
                class="input-username"
                name="korisnicko_ime"
                type="text"
                spellcheck="false"
              />
            </li>
            <br />
            <li>
              <input
                v-model="registration.password"
                v-bind:placeholder="$t('homePage.fade_screen.password')"
                class="input-pw"
                name="lozinka"
                type="password"
                autocomplete="off"
              />
            </li>
            <br />
            <li>
              <div class="login">
                <button
                  type="button"
                  @click="userRegistration"
                  class="registerform-btn"
                >
                  <i class="fa fa-user"></i> {{ $t("homePage.register_btn") }}
                </button>
              </div>
            </li>
            <br />
            <li>
              <p class="white--text">{{ error }}</p>
            </li>
          </ul>
        </div>
      </div>
    </form>
    <!-- end register -->

    <!-- =========Header Content Area=========== -->
    <section>
      <div class="header-content-area">
        <div class="container">
          <!--header pattern-->
          <div class="header-pattern-1">
            <img src="../assets/img/header-pattern-1.png" alt="" />
          </div>
          <div class="header-pattern-2">
            <img src="../assets/img/header-pattern2.png" alt="" />
          </div>
          <div class="header-animation-area">
            <div class="row">
              <div class="col-xl-6 col-lg-6 col-md-6">
                <!--header text-->
                <div class="intro-text">
                  <h1
                    data-aos="slide-right"
                    data-aos-anchor-placement="top-bottom"
                    data-aos-delay="700"
                    data-aos-duration="1200"
                  >
                    {{ $t("homePage.title") }}
                    <br />
                    {{ $t("homePage.titleEnd") }}
                  </h1>
                  <p
                    data-aos="fade-in"
                    data-aos-anchor-placement="top-bottom"
                    data-aos-delay="1500"
                    data-aos-duration="1200"
                  >
                    {{ $t("homePage.description_1") }}
                    <br />{{ $t("homePage.description_2") }} <br />
                    {{ $t("homePage.description_3") }}
                  </p>
                  <div
                    class="learnmore"
                    data-aos="fade-in"
                    data-aos-anchor-placement="top-bottom"
                    data-aos-delay="1500"
                    data-aos-duration="1200"
                  >
                    <a href="#join-game" id="registerbtn" class="skill-btn">{{
                      $t("homePage.join_game_btn")
                    }}</a>
                  </div>
                </div>
              </div>
              <div class="col-xl-6 col-lg-6 col-md-6">
                <div class="home-about-image">
                  <img src="../assets/img/home-about.jpg" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!--Join game-->
    <form action="" method="POST" name="join-game">
      <div class="register-box-area">
        <div id="join-game" class="fade">
          <a href="#" class="close-btn-white">
            <b>X</b>
          </a>
          <ul>
            <li>
              <h2
                class="white--text"
                v-if="gameFoundTitle != null"
                data-aos="fade-in"
                data-aos-anchor-placement="top-bottom"
                data-aos-delay="600"
                data-aos-duration="1200"
              >
                {{ gameFoundTitle }}
              </h2>
            </li>
            <br />
            <br />
            <li v-if="showPinBox">
              <input
                v-model="gamePin"
                @keypress="clearErrorLogs"
                ref="gamePinRef"
                type="text"
                class="input-username"
                v-bind:placeholder="$t('homePage.fade_screen.game_pin')"
              />
            </li>
            <br />
            <li v-if="showPinBox">
              <div class="login">
                <button
                  type="button"
                  class="registerform-btn"
                  @click="joinGame"
                >
                  <i class="fa fa-user"></i>
                  {{ $t("homePage.fade_screen.game_enter") }}
                </button>
              </div>
            </li>
            <li
              v-if="showNicknameBox"
              data-aos="fade-in"
              data-aos-anchor-placement="top-bottom"
              data-aos-delay="1200"
              data-aos-duration="1200"
            >
              <input
                v-model="gameNickname"
                type="text"
                
                class="input-username"
                v-bind:placeholder="$t('homePage.fade_screen.game_nickname')"
              />
            </li>

            <br />
            <li
              v-if="showNicknameBox"
              data-aos="fade-in"
              data-aos-anchor-placement="left-right"
              data-aos-delay="1200"
              data-aos-duration="1200"
            >
              <div class="login">
                <button
                  type="button"
                  class="registerform-btn"
                  @click="playGame"
                >
                  <i class="fa fa-user"></i>
                  {{ $t("homePage.fade_screen.game_join") }}
                </button>
              </div>
            </li>
            <br />
            <li>
              <p class="white--text">{{ joinGameError }}</p>
            </li>
          </ul>
        </div>
      </div>
    </form>
    <!-- end register -->

    <!-- ========= footer =========== -->
    <section id="footer-fixed">
      <!--copyright-->
      <footer>
        <div class="row">
          <div class="col-xl-1 col-lg-1 col-md-1">
            <p class="text-left ml-8 mt-2">
              {{ $t("homePage.footer_language") }}
            </p>
          </div>
          <div class="col-xl-1 col-lg-1 col-md-1">
            <v-select
              v-model="$i18n.locale"
              class="d-inline"
              item-value="key"
              item-text="val"
              :items="langs"
              @change="toggleLanguage"
              solo
              dense
            ></v-select>
          </div>
          <div class="col-xl-1 col-lg-1 col-md-1"></div>
          <div class="col-xl-6 col-lg-6 col-md-6">
            <p>
              {{ $t("homePage.footer_description") }}
            </p>
          </div>
          <div class="col-xl-3 col-lg-3 col-md-3"></div>
        </div>
      </footer>
    </section>
  </div>
</template>

<style scoped>
@import "../assets/css/responsive.css";
@import "../assets/css/homePage.css";
@import "../assets/css/aos.min.css";
@import "../assets/css/slick.css";
@import "../assets/css/meanmenu.css";
</style>

<script>
import { mdiChevronDown, mdiCogOutline, mdiTranslate } from "@mdi/js";
import AuthService from "@/services/AuthService";
export default {
  name: "HomePage",
  data() {
    return {
      elementVisible: true,
      mdiCogOutline,
      mdiChevronDown,
      mdiTranslate,
      registration: {
        email: "",
        username: "",
        password: "",
      },
      login: {
        username: "",
        password: "",
      },
      langs: this.$i18n.messages[this.$i18n.locale].homePage.languages,
      error: null,
      errorLogin: null,
      resetAccount: {
        email: '',
        newPassword: '',
      },
      errorResetAccount: null,
      gamePin: "",
      joinGameError: null,
      gameFoundTitle: null,
      showPinBox: true,
      showNicknameBox: false,
      gameNickname: "",
      quizID: null,
      newGame: null,
      guestToken: null
    };
  },

  mounted() {
    localStorage.setItem('language', 'en')
  },
  created() {
    
    setTimeout(() => (this.elementVisible = false), 1000);
    
  },

  methods: {
    
    toggleLanguage: function () {
      localStorage.setItem('language', this.$i18n.locale)
      this.langs = this.$i18n.messages[this.$i18n.locale].homePage.languages;
    },
    userRegistration: async function () {
      if (
        this.registration.email.length < 1 ||
        this.registration.username < 1 ||
        this.registration.password < 1
      ) {
        this.error = `Sva polja su obavezna!`;
        return;
      }

      try {
        const registration = await AuthService.register(this.registration);
        if (registration.status == 200) {
          this.error = `Uspješno ste kreirali račun! Sada se možete prijaviti.`;
        }
      } catch (error) {
        this.error = error.response.data.error;
      }
    },
    userLogin: async function () {
      if (this.login.username < 1 || this.login.password < 1) {
        this.errorLogin = `Sva polja su obavezna!`;
        return;
      }

      try {
        const login = await AuthService.login(this.login);
        if (login.status == 200) {
          this.errorLogin = ``;
          await this.setAuthStore(login);

          this.$router.push({
            name: "Home",
          });
        }
      } catch (error) {
        this.errorLogin = error.response.data.error;
      }
    },

    setAuthStore: async function (res) {
      this.$store.dispatch("setToken", res.data.token);
      this.$store.dispatch("setUser", res.data.user);
      this.$store.dispatch("loggedUser", this.login.username);
      this.$store.dispatch("setUserInformation", res.data);
    },

    joinGame: async function () {
      if (this.gamePin.length < 5) {
        this.joinGameError = `PIN mora biti minimalno 5 znakova.`;
        return;
      }

      try {
        this.newGame = (
          await AuthService.joinGame({
            game_pin: this.gamePin,
          })
        ).data;
        this.quizID = this.newGame.res.IDQuiz
        this.guestToken = this.newGame.token
        this.gameFoundTitle = this.newGame.res.title;
        this.showPinBox = false;
        this.showNicknameBox = true;
      } catch (error) {
        this.joinGameError = `Taj kviz ne postoji!`
      }
    },

    clearErrorLogs() {
      this.gameFoundTitle = null;
      this.joinGameError = null;
      this.errorLogin = null;
      this.error = null;
    },

    async playGame() {
      if(!this.gameNickname.length > 0 || this.newGame == null) {
        this.joinGameError = `Unesite nadimak.`
        return;
      }

      try {
        await AuthService.guestJoined({
          nickname: this.gameNickname,
          quizID: this.quizID
        });
        
      } catch (error) {
        this.error = error.response.data.error;
      }
      
      this.$store.dispatch("setToken", this.guestToken);
      this.$store.dispatch("loggedUser", this.gameNickname);
      this.$store.dispatch("setGameTitle", this.gameFoundTitle);
      this.$store.dispatch("setGameCode", this.gamePin)
      
      this.$router.push({
        name: 'PlayGame'
      })

    },
    resetAccountFn: async function() {
      try {
            const response = await AuthService.passwordReset({
                email: this.resetAccount.email
            })
            let email = response.data.user
            if(email == this.resetAccount.email) {
                this.errorResetAccount = "Poslali smo vam pozivnicu na email za promjenu lozinke."
            }
    
        } catch (error) {
            this.errorResetAccount = error.response.data.error
        }
    }
  },
  
};
</script>