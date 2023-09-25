<template>
  <v-container class="d-flex fill-height justify-center text-center align-center">
    <v-card class="text-center pa-5" min-width="300px" width="500px">
      <v-card-title>Sign up</v-card-title>

      <v-form validate-on="input" @submit.prevent="signup">
        <v-text-field 
        variant="outlined"
        class="ma-2"
        label="username"
        v-model="username"
        :rules="formRules"></v-text-field>

        <v-text-field 
        variant="outlined"
        class="ma-2"
        label="password"
        :type="showPasswd ? 'text':'password'"
        :rules="passwordRules"
        v-model="passwd"
        :append-inner-icon="showPasswd ? 'mdi-eye-off':'mdi-eye'"
        @click:append-inner="showPasswd = !showPasswd"></v-text-field>

        <v-text-field 
        variant="outlined"
        :type="showConfirmPasswd ? 'text':'password'"
        class="ma-2"
        label="confirm password"
        :rules="confirmPassRules"
        :append-inner-icon="showConfirmPasswd ? 'mdi-eye-off':'mdi-eye'"
        v-model="confirmPasswd"
        @click:append-inner="showConfirmPasswd = !showConfirmPasswd"></v-text-field>

        <v-text-field 
        variant="outlined"
        type="email"
        class="ma-2"
        label="email"
        :rules="emailRules"
        v-model="email"></v-text-field>

        <v-card-text class="text-error">{{ errorMessage }}</v-card-text>

        <v-divider></v-divider>
        <v-card-actions class="text-center justify-center">
          <v-btn color="error"
            variant="outlined"
            @click="router.push('/')"
            text="Cancel">
          </v-btn>   

          <v-btn color="success"
            :disabled="buttonFlag"
            type="submit"
            variant="outlined"
            text="Accept">
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-container>
  
  <Modal ref = "modal"></Modal>
  <LoadingModal v-model="loadingTrigger"></LoadingModal>
</template>

<script setup>
  //
  import { useRouter } from "vue-router"
  import {ref} from "vue"
  import axios from "axios"
  import Modal from "@/components/Modal.vue"
  import apiConf from "../apiConf.json"
  import {watch} from "vue"
  import LoadingModal from "./LoadingModal.vue"
  import {useStore} from "vuex"

  const store = useStore();
  var loadingTrigger = ref();
  var showPasswd = ref();
  var showConfirmPasswd = ref();
  var username = ref();
  var passwd = ref();
  var confirmPasswd = ref();
  var email = ref();
  var modal = ref();
  const router = useRouter();
  var buttonFlag = ref(true);
  var errorMessage = ref();

  var buttonBooleans = ref({
    name:false,
    password:false,
    confirm:false,
    email:false
  })


  watch(buttonBooleans.value, ()=>{
    for(let i in buttonBooleans.value){
      if(buttonBooleans.value[i] == false){
        buttonFlag.value = true;
        return false;
      }

      buttonFlag.value = false
    }
  })
  
  const formRules = ref(
    [
      value=>{
        if(value){
          buttonBooleans.value.name = true
          return true
        }

        buttonBooleans.value.name = false
        return "field cannot be empty"
      }
    ]
  )


  const passwordRules = ref([
    value=>{
      if(value == undefined){
        buttonBooleans.value.password = false;
        return "password is empty"
      }
      
      if(Object.keys(value).length < 4){
        buttonBooleans.value.password = false;
        return "password must be longer"
      }else{
        buttonBooleans.value.password = true;
        return true;
      }
    }
  ])

  const confirmPassRules = ref([
    value =>{
      if(value != passwd.value){
        buttonBooleans.value.confirm = false;
        return "both passwords must be the same";
      }else{
        buttonBooleans.value.confirm = true;
        return true
      }
    }
  ])

  var emailRules = ref([
        value => {
            if (value){ 
                buttonBooleans.value.email = true;
                return true
            }

            buttonBooleans.value.email = false;
            return 'E-mail is requred.'
            },
            value => {
            if (/.+@.+\..+/.test(value)){
                buttonBooleans.value.email = true;
                return true
            } 

            buttonBooleans.value.email = false;
            return 'E-mail must be valid.'
        }
    ])

  async function signup(){
    loadingTrigger.value = true;
    let res = await axios.post(apiConf.host +apiConf.port + apiConf.users.signup,{
      username:username.value,
      password:passwd.value,
      email:email.value
    })
    .catch((err)=>{
      console.log(err)
      loadingTrigger.value = false;
      if(err.response){
        modal.value.createModal("Error","signup error",err.response.data.msg,true)
      }else{
        modal.value.createModal("Error","signup error","An unknown error ocurred",true)
      }
      return undefined;
    });

    loadingTrigger.value = false;
    if(res){
      let user = res.data.user;
      store.commit("setUnverifiedUser",{
        id:user.user_id,
        name:user.username,
        token:res.data.token
      });
      modal.value.createModal("Success","Account created",
      "a verification link has been sent to the provided email. Check it in order to proceed",false,"verify")
    }
  }
</script>
