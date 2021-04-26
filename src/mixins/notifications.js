export default {
    methods: {
      /**
   * @description Function for updating notification ( hide after 2000ms )
   */
      updateNotification(variable) {
        this.dialog = variable;
        this.notificationStatus = null;
      }
    }
  }