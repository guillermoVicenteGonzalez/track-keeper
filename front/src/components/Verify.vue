<template>
    <v-container class="justify-center align-center fill-height">
        <v-card class="text-center">
            <v-card-title>Verification email</v-card-title>
            <v-card-text>A verification email has been sennt to your email,
                Follow it in order to verify your account. 
                <br>
                <a
                @click="resendEmail"
                >Click here to resend the mail</a>
            </v-card-text>

            <v-card-text>Once your account is verified you can click the button below afterwards to log in</v-card-text>
            <v-divider></v-divider>
            <v-card-actions class="justify-center">
                <v-btn
                @click="resendEmail">
                    Resend Mail
                </v-btn>
                <v-btn
                @click="login">Login</v-btn>
            </v-card-actions>
        </v-card>

        <Modal ref="modal"></Modal>

        <LoadingModal v-model="loadingDialog"></LoadingModal>
    </v-container>
</template>

<script setup>
    import {ref} from "vue";
    import { useRouter } from "vue-router";
    import apiConf from "../apiConf.json"
    import axios from "axios"
    import { useStore } from "vuex";
    import LoadingModal from "../components/LoadingModal.vue";
    import Modal from "@/components/Modal.vue"

    var loadingDialog = ref(false);
    const router = useRouter();
    const store = useStore();
    var modal = ref();

    async function resendEmail(){
        loadingDialog.value = true;
        let {id, username} = store.getters.getUnverifiedUser;
        console.log(id);
        if(!id){
            modal.value.createModal("Error","mail error","Couldn't find user credentials, redirecting to landing page",true,"/");
            loadingDialog.value = false;
            return undefined;
        }

        let mailRes = await axios.get(apiConf.host + apiConf.port + apiConf.send + id)
        .catch((err)=>{
            if(err.response){
                modal.value.createModal("Error","mail error",err.response.data.message, true);
            }else{
                modal.value.createModal("Error","mail error","An unknown error ocurred", true);
            }
            loadingDialog.value = false
            return undefined
        });

        if(mailRes){
            modal.value.createModal("Success","mail success","Verification email was re-sent successfully",false);
        }

        loadingDialog.value = false;

    }

    async function login(){
        loadingDialog.value = true;
        let {id, login, token} = store.getters.getUnverifiedUser;
        if(!id || !token || !login){
            modal.value.createModal("Error","login error","Couldn't find user credentials, redirecting to landing page",true,"/");
            return undefined;
        }        

        let user = axios.get(apiConf.host + apiConf.port + apiConf.getUserData + id,{
            headers:{
                'Authorization':'Bearer ' + token
            }
        })
        .catch((err)=>{
            modal.value.createModal("Error","login error",err.response.data.message,true);
            return undefined;
        });

        if(user){
            store.commit("setUser",{
                id:id,
                token:token,
                login:login,
            });

            store.commit("deleteUnverifiedUser");
            router.push("/home");
        }
        loadingDialog.value;
    }
</script>