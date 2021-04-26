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
                        <a href="#register" class="skill-btn">Register</a>
                      </div>
                    </li>
                    <li>
                      <div class="login">
                        <a href="#login" class="skill-btn">Login</a>
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
                placeholder="Korisničko ime"
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
                placeholder="Lozinka"
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
                  <i class="fa fa-user"></i> Prijava
                </button>
              </div>
            </li>
            <br />
            <li>
              <a href=""><font color="white">Zaboravio si lozinku?</font></a>
            </li>
          </ul>
        </div>
      </div>
    </form>
    <!-- end login -->

    <!--Register-->
    <form action="" method="POST" name="register" id="formaRegistracija">
      <div class="register-box-area">
        <div id="register" class="fade">
          <a href="#" class="close-btn-white">
            <b>X</b>
          </a>
          <ul>
            <li>
              <input
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
                placeholder="Korisničko ime"
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
                placeholder="Lozinka"
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
                  <i class="fa fa-user"></i> Registracija
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
                    Play Quizz <br />
                    and have fun!
                  </h1>
                  <p
                    data-aos="fade-in"
                    data-aos-anchor-placement="top-bottom"
                    data-aos-delay="1500"
                    data-aos-duration="1200"
                  >
                    Quizz.hr is a game-based learning platform that brings
                    <br />engagement and fun to players every year at school, at
                    work, <br />
                    and at home.
                  </p>
                  <div
                    class="learnmore"
                    data-aos="fade-in"
                    data-aos-anchor-placement="top-bottom"
                    data-aos-delay="1500"
                    data-aos-duration="1200"
                  >
                    <a href="#register" id="registerbtn" class="skill-btn"
                      >Join game</a
                    >
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

    <!-- ========= footer =========== -->
    <section id="footer-fixed">
      <!--copyright-->
      <footer>
        <div class="row">
          <div class="col-xl-3 col-lg-3 col-md-3">
            <p class="text-left ml-5">Switch to: Croatian</p>
          </div>
          <div class="col-xl-6 col-lg-6 col-md-6">
            <p>
              © Quizz.hr. Create your own quizz for FREE after registration!
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
import { mdiChevronDown, mdiCogOutline } from "@mdi/js";
export default {
  name: "HomePage",
  data() {
    return {
      elementVisible: true,
      mdiCogOutline,
      mdiChevronDown,
      defaultLanguage: 'en'
    };
  },

  methods: {},

  created() {
    setTimeout(() => (this.elementVisible = false), 1000);
  },
};
</script>