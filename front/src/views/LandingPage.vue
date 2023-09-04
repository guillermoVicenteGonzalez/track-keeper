<template>

  <v-container class="fill-height">
    <v-responsive class="align-center text-center fill-height">
      <v-row class="d-block align-center justify-center">
        <v-col>
          <h1>Hola</h1>
        </v-col>
        <v-col class="align-center justify-">
          <v-btn
          @click="router.push('/signup')">Sign up</v-btn>
          <v-btn>Sign in</v-btn>
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>

</template>

<script setup>
import { useRouter } from 'vue-router';

var router = useRouter()

  
</script>

<style>

</style>