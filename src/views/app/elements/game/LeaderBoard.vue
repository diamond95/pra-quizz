<template>
    <v-card outlined shaped elevation="4" class="mt-10">
      <v-alert
        color="secondary"
        dark
        :icon="mdiClipboardListOutline "
        border="right"
        prominent
        dense
      >
        <h2 color="secondary" class="mt-2">Rezultati</h2>
      </v-alert>
      <v-list>
        <v-list-item link v-for="user in list" :key="user.questID">
          <v-list-item-action>
            <v-icon color="primary">mdi-account </v-icon>
            
          </v-list-item-action>
          <v-list-item-subtitle>
            {{ user.nickname }} ( {{ user.correctNumber }} )
          </v-list-item-subtitle>
          
        </v-list-item>

      
      </v-list>
    </v-card>
</template>


<style>
</style>

<script>
import store from "@/store/store";
import { mdiClipboardListOutline  } from "@mdi/js";
export default {
  name: "LeaderBoard",
  props: {
    data: {
      type: Array
    }
  },
  data() {
    return {
    quizzCode: store.state.gameCode,
    quizzInformation: {},
    mdiClipboardListOutline ,
    selectedItem: 1,
    items: [
      { text: "Real-Time", icon: "mdi-clock" },
      { text: "Audience", icon: "mdi-account" },
      { text: "Conversions", icon: "mdi-flag" },
    ],
    list: this.data
  }},

  methods: {
    
  },


 
};
</script>