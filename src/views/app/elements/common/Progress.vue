<template>

    <v-progress-linear v-model="value" :active="show" class="pull-down"></v-progress-linear>

</template>

<style scoped>
.empty-size {
  height: 48px !important;
}
.empty_space[data-v-62e6b27a] {
  height: 15px;
}
</style>


<script>
export default {
  name: "Progress-linear",
  props: {
    emptySpace: Boolean
  },

  data() {
    return {
      value: 0,
      show: true,
      interval: 0
    };
  },
  mounted() {
    this.queryAndIndeterminate();
  },

  beforeDestroy() {
    clearInterval(this.interval);
  },

  methods: {
    queryAndIndeterminate() {
      this.show = true;
      this.value = 0;

      this.interval = setInterval(() => {
        if (this.value === 100) {
          clearInterval(this.interval);
          this.show = false;
        }
        this.value += 2.5;
      }, 40);
    }
    /*showOverlay() {
      setTimeout(() => {
        this.overlay = false;
      }, 700);
    }*/
  }
};
</script>