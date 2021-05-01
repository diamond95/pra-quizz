<template>
  <div></div>
</template>
<style>
.vs-notification__content {
  font-family: "Poppins", sans-serif;
}
</style>
<script>
export default {
  props: {
    titleProp: String,
    textProp: String
  },

  destroyed() {
    this.$emit("event-update-dialog", false);
  },
  created() {
    this.openNotification(
      null,
      "#323657",
      "#23db88",
      `<i class='bx bxs-error'></i>`
    );
  },
  beforeUpdate() {
    this.openNotification(null, "danger", `<i class='bx bxs-error'></i>`);
  },
  methods: {
    openNotification(position = null, color, border) {
      this.$vs.notification({
        flat: true,
        color,
        border,
        position,
        progress: "auto",
        title: this.titleProp,
        text: this.textProp,
        onDestroy: () => {
          this.$destroy();
        }
      });
    }
  }
};
</script>