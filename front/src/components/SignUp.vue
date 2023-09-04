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

      <v-text-field 
      variant="outlined"
      type="email"
      class="ma-2"
      label="email"
      v-model="email"></v-text-field>

      <v-divider></v-divider>
      <v-card-actions class="text-center justify-center">
        <v-btn color="error">Cancel</v-btn>        
        <v-btn color="success"
        @click="signup">Accept</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
  
  <Modal ref = modal></Modal>
</template>

<script setup>
  //
  import { useRouter } from "vue-router"
  import {ref} from "vue"
  import axios from "axios"
  import Modal from "@/components/Modal.vue"
  import apiConf from "../apiConf.json"

  var username = ref();
  var passwd = ref();
  var confirmPasswd = ref();
  var email = ref();
  var modal = ref();
  const router = useRouter();

  async function signup(){
    console.log(apiConf.users.signup)
    let result = await axios.post(apiConf.host +apiConf.port + apiConf.users.signup,{
      username:username.value,
      password:passwd.value,
      email:email.value
    })
    .catch((err)=>{
      console.log(err);
      if(err.response)
        modal.value.createModal("Error","signup error",err.response.data.message,true)
    });

    if(result){
      router.push("/")
    }
  }
</script>
