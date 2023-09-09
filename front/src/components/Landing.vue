<template>
    <v-responsive class="align-center text-center fill-height">
      <v-row class="d-block align-center justify-center">
        <v-col>
          <h1>Hola</h1>
        </v-col>
        <v-col class="align-center justify-">
          <v-btn
          @click="router.push('/signup')">Sign up</v-btn>
          <v-btn
          @click="toLoginScreen">Sign in</v-btn>
        </v-col>
      </v-row>
    </v-responsive>
</template>

<script setup>
  import { useRouter } from 'vue-router';
  import {useStore} from "vuex"

  var router = useRouter()
  const store = useStore();

  function toLoginScreen(){
    let user = store.getters.getUser;
    if(user.id != undefined){
      router.push("/home/"+user.id);
    }
    else{
      router.push("/login")
    } 
  }
</script>