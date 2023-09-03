<template>
  <v-container class="d-flex justify-center text-center align-center">
    <v-card class="text-center pa-5" min-width="500px">
      <v-card-title>Sign up</v-card-title>
      <v-text-field 
      variant="outlined"
      class="ma-2"
      label="username"
      v-model="username"></v-text-field>

      <v-text-field 
      variant="outlined"
      class="ma-2"
      label="password"
      type="password"
      v-model="passwd"></v-text-field>

      <v-text-field 
      variant="outlined"
      type="password"
      class="ma-2"
      label="confirm password"
      v-model="confirmPasswd"></v-text-field>

      <v-divider></v-divider>
      <v-card-actions class="text-center justify-center">
        <v-btn>Cancel</v-btn>        
        <v-btn>Accept</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup>
  //
  import {ref} from "vue"

  var username = ref();
</script>
