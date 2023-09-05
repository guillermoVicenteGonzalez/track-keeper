<template>
    <v-container class="d-flex justify-center text-center align-center">
        <v-card class="text-center pa-5" min-width="500">
            <v-card-title>Log in</v-card-title>
            <v-form validate-on="input" @submit.prevent="login">
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
                v-model="password"
                :rules="passwordRules"
                :append-inner-icon="showPasswd ? 'mdi-eye-off':'mdi-eye'"
                @click:append-inner="showPasswd = !showPasswd"
                ></v-text-field>

                <v-divider></v-divider>

                <v-card-actions class="justify-center">
                    <v-btn
                    variant="outlined"
                    color="error"
                    @click="router.push('/')">Cancel</v-btn>

                    <v-btn
                    :disabled="buttonFlag"
                    variant="outlined"
                    type="submit"
                    color="success"
                    text="Log in"></v-btn>
                </v-card-actions>
            </v-form>
        </v-card>
    </v-container>

    <LoadingModal v-model="triggerLoading"></LoadingModal>
    <Modal ref="modal"></Modal>
</template>

<script setup>
    import {ref} from "vue"
    import { useRouter } from "vue-router";
    import axios from "axios";
    import {watch} from "vue"
    import apiConf from "../apiConf.json"
    import Modal from "./Modal.vue";
    import LoadingModal from "./LoadingModal.vue";

    const router = useRouter()
    var modal = ref();
    var triggerLoading = ref();
    var showPasswd = ref()
    var username = ref();
    var password = ref();
    var buttonBooleans = ref({
        password:false,
        name:false,
    })
    var buttonFlag = ref(true)

    watch(buttonBooleans.value,()=>{
        for(let i in buttonBooleans.value){
            if(buttonBooleans.value[i] == false){
                buttonFlag.value = true
                return false
            }
        }

        buttonFlag.value = false;
        return true
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
  );

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

  async function login(){
    triggerLoading.value = true;
    let user = await axios.post(apiConf.host + apiConf.port + apiConf.users.login,{
        username:username.value,
        password:password.value
    })
    .catch((err)=>{
      triggerLoading.value = false;
        console.log(err);
        if(err.response)
            modal.value.createModal("Error","login error",err.response.data.msg,true)
    })

    triggerLoading.value = false;

  }


  function test(){
    console.clear();
  }
</script>