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
    <form action="" method="POST" name="login">
      <div class="login-box-area">
        <div id="login" class="fade">
          <a href="#" class="close-btn">
            <b>X</b>
          </a>
          <ul>
            <li>
              <input
                v-bind:placeholder="$t('homePage.fade_screen.username')"
                name="korisnicko_ime"
                class="input-username"
                spellcheck="false"
                type="text"
                autocomplete="off"
              />
            </li>
            <br />
            <li>
              <input
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
                  id="loginbtnform"
                  type="submit"
                  name="login"
                  class="loginform-btn"
                  disabled
                >
                  <i class="fa fa-user"></i> {{ $t("homePage.login_btn") }}
                </button>
              </div>
            </li>
            <br />
            <li>
              <a href=""
                ><font color="white">{{
                  $t("homePage.fade_screen.reset_password")
                }}</font></a
              >
            </li>
          </ul>
        </div>
      </div>
    </form>
    <!-- end login -->

    <!--Register-->
    <form action="" method="POST" name="register">
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
                autocomplete="off"
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
                autocomplete="off"
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
                <button type="submit" class="registerform-btn" disabled>
                  <i class="fa fa-user"></i> {{ $t("homePage.register_btn") }}
                </button>
              </div>
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
              <input
                type="text"
                class="input-username"
                v-bind:placeholder="$t('homePage.fade_screen.game_pin')"
              />
            </li>

            <br />
            <li>
              <div class="login">
                <button type="submit" class="registerform-btn" disabled>
                  <i class="fa fa-user"></i>
                  {{ $t("homePage.fade_screen.game_enter") }}
                </button>
              </div>
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
      langs: this.$i18n.messages[this.$i18n.locale].homePage.languages,
    };
  },

  methods: {
    toggleLanguage: function () {
      this.langs = this.$i18n.messages[this.$i18n.locale].homePage.languages;
    },
  },

  created() {
    setTimeout(() => (this.elementVisible = false), 1000);
  },
};
</script>