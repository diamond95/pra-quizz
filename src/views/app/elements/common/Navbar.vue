<template>
  <div>
    <v-app-bar app class="navbar-color" dense :elevation="11" clipped-left :hide-on-scroll="false">
      <v-app-bar-nav-icon class="white--text"></v-app-bar-nav-icon>
      <v-toolbar-title class="white--text">Super QUIZZ</v-toolbar-title>
      <v-spacer />
      <v-menu transition="slide-y-transition" bottom offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-toolbar-title class="name" color="darken-4" v-bind="attrs" v-on="on">
            ivan miljanic
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
      <!-- <v-toolbar-title class="name" color="darken-2">ivan miljanic</v-toolbar-title> -->
    </v-app-bar>

    <v-navigation-drawer color="grey lighten-3" v-model="drawer" app clipped>
      <v-list dense rounded>
        <v-list-item link @click="$router.push({ name: 'Calendar'})">
          <v-list-item-action>
            <v-icon>mdi-calendar</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>test123</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

      
        <v-list-group :value="catalogSubgroupValue" :prepend-icon="mdiBookOpenPageVariant">
          <template v-slot:activator>
            <v-list-item-title>test123</v-list-item-title>
          </template>
        
          <v-list-item link @click="$router.push({ name: 'Catalog'})">
            <v-list-item-action>
              <v-icon></v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Prikaz promocija</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
         
        </v-list-group>

        <v-list-item link>
          <v-list-item-action>
            <v-icon>{{mdiFileDocumentOutline }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Korisni dokumenti</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        
  

        <!-- <v-list-item link>
          <v-list-item-action>
            <v-icon color="grey darken-1">mdi-cog</v-icon>
          </v-list-item-action>
          <v-list-item-title class="grey--text text--darken-1">Opcije</v-list-item-title>
        </v-list-item>-->
      </v-list>
    </v-navigation-drawer>
  </div>
</template>
<style scoped>
.navbar-color {
  background-image: linear-gradient(
    111.1deg,
    rgba(0, 40, 70, 1) -4.8%,
    rgba(255, 115, 115, 1) 82.7%,
    rgba(255, 175, 123, 1) 97.2%
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
import { mdiChevronDown, mdiCogOutline, mdiBookOpenPageVariant } from "@mdi/js";
import { mdiFileDocumentOutline, mdiChartBubble, mdiFinance } from "@mdi/js";

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
    dialog: false,
    drawer: null,
    version: "",
    loggedUser: "" + " ",
    labelKeys: [
      "NAVBAR_INFORMATION_LABEL",
      "NAVBAR_INFORMATION_BODY",
      "NAVBAR_INFORMATION_LANGUAGE_LABEL"
    ],
    labelData: {},
    o: {},
    okBtnLoading: false,
    items: [{ title: "Odjava" }],

    itemz: [
      { icon: "mdi-trending-up", text: "Most Popular" },
      { icon: "mdi-youtube-subscription", text: "Subscriptions" },
      { icon: "mdi-history", text: "History" },
      { icon: "mdi-playlist-play", text: "Playlists" },
      { icon: "mdi-clock", text: "Watch Later" }
    ],
    
  }),

  methods: {
    logOut: function() {
      this.$router.push({
        name: "Login"
      });
    }
  }
};
</script>
