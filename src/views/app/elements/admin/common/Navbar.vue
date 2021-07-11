<template>
  <div>
    <v-app-bar app class="navbar-color" dense :elevation="11" clipped-left :hide-on-scroll="false">
      <v-icon class="white--text">{{ mdiFrequentlyAskedQuestions}}</v-icon>
      <v-toolbar-title class="white--text ml-10">Super Quizz</v-toolbar-title>
      <v-spacer />
      <v-menu transition="slide-y-transition" bottom offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-toolbar-title class="name" color="darken-4" v-bind="attrs" v-on="on">
            {{ nickname }}
            <v-icon medium color="darken-4">{{ mdiChevronDown }}</v-icon>
          </v-toolbar-title>
        </template>
        <v-list>
          <v-list-item link>
            <v-list-item-title>
              Postavke
              <v-icon right color="darken-2">{{ mdiCogOutline }}</v-icon>
            </v-list-item-title>
          </v-list-item>
          <v-list-item link @click="logOut">
            <v-list-item-title>
              Odjava
              <v-icon right color="darken-2">mdi-logout</v-icon>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      
    </v-app-bar>

    <v-navigation-drawer color="grey lighten-3" v-model="drawer" app clipped>
      <v-list dense rounded>
        <v-list-item link @click="$router.push({ name: 'Home'})">
          <v-list-item-action>
            <v-icon>mdi-calendar</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Kviz</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

      
        
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-account-circle</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Profil</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        
      </v-list>
    </v-navigation-drawer> 
  </div>
</template>
<style scoped>
.navbar-color {
  background-image: linear-gradient(
    111.1deg,
    rgba(0, 40, 70, 1) -4.8%,
    rgba(0, 176, 155, 0.9) 47.2%,
    rgba(150, 201, 61, 1) 99.7%
    
  );
}
.languageSelection {
  padding-top: 0px;
  padding-left: 15px;
  padding-bottom: 5px;
  padding-right: 20px;
}
.name {
  padding: 20px 2px 15px 10px;
  font-size: 0, 15px, 10px, 15px;
}
.empty-space {
  height: 80px;
}
</style>

<script>
import { mdiChevronDown, mdiCogOutline, mdiBookOpenPageVariant, mdiFrequentlyAskedQuestions } from "@mdi/js";
import { mdiFileDocumentOutline, mdiChartBubble, mdiFinance } from "@mdi/js";
import store from "@/store/store"
export default {
  components: {
    
  },
  props: {
    catalogSubgroupValue: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    mdiBookOpenPageVariant,
    mdiFinance,
    mdiFileDocumentOutline,
    mdiChartBubble,
    mdiChevronDown,
    mdiCogOutline,
    mdiFrequentlyAskedQuestions,
    dialog: false,
    drawer: null,
    version: "",
    
    okBtnLoading: false,
    items: [{ title: "Odjava" }],
    nickname: store.state.loggedUser,
    gameTitle: store.state.gameTitle
  }),

  methods: {
    logOut: function() {
      this.$store.dispatch('logOut')
      this.$router.push({
        name: "HomePage"
      });
    }
  }
};
</script>
