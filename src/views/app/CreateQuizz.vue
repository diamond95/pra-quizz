<template>
  <v-main class="grey lighten-5">
    <Navbar :catalogSubgroupValue="false" />
    <Progress :emptySpace="false" />
    
    <Form />
    
  </v-main>
</template>

<style>
</style>

<script>

import Navbar from "./elements/admin/common/Navbar";
import Form from "./elements/admin/Form"
import Progress from "./elements/common/Progress";
export default {
  components: {
    Navbar,
    Progress,
    Form
  }
};
</script>