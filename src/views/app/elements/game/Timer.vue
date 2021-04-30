<template>
  <v-sheet
    class="mt-5"
    color="grey lighten-4"
    elevation="16"
    height="120"
    rounded="xl"
    shaped
    width="142"
  >
    <v-container fill-height fluid>
      <v-row justify="center" align="center">
        <h1  :class="colorTimeChanger">{{ timerVal }}</h1>
      </v-row>
    </v-container>
  </v-sheet>
</template>


<script>
export default {
  name: "Timer",
  props: {
    timeLeft: {
      type: Number,
      default: 0,
    },
  },
  data: () => ({
    intervalReference: undefined,
    timerVal: 0,
    colorTimeChanger: 'green--text'
  }),

  created() {
    this.timerVal = this.timeLeft;
    this.intervalReference = setInterval(this.callback, 1000);
  },

  methods: {
    callback: function () {
      this.timerVal -= 1;
      this.timerColor()
      if (this.timerVal === 0) {
        clearInterval(this.intervalReference); // Stopping the counter when reaching 0.
      }
    },
    timerColor() {
      if (this.timerVal < 10 && this.timerVal > 5) {
        this.colorTimeChanger = 'orange--text';
      } else if (this.timerVal <= 5) {
        this.colorTimeChanger = 'red--text';
      } else {
        this.colorTimeChanger = 'green--text';
      }
    },
  },
};
</script>