<template>
    <v-container class="fill-height justify-center align-center">
        <v-card 
        class="pa-5 text-center"
        min-width="300px" 
        width="600px" 
        elevation="3">
            <div v-if="mode == 'view'">
                <v-avatar
                style="cursor: pointer;"
                class="ma-3" size="70" >
                    <v-img
                    @click="imageModal = true"
                    style="width: 100%; height: 100%;"
                    cover
                    :src="url">
                        <template v-slot:error>
                            <div 
                            style="width: 100%; height:100%;"
                            class="d-flex justify-center align-center customBg">
                                <v-icon>mdi-account</v-icon>
                            </div>
                        </template>

                    </v-img>
                </v-avatar>
            
                <v-card-title
                v-if="user.username != undefined">Name: {{  user.username}}</v-card-title>
                
                <v-card-subtitle
                v-if="user.email != undefined"
                class="text-center">Email: {{ user.email }}</v-card-subtitle>
            </div>

            <div v-if="mode == 'edit'">
                <v-form validate-on="input" @submit.prevent="updateUser">
                    <v-avatar
                    style="cursor: pointer;"
                    class="ma-3" size="70" >
                        <v-img
                        @click="triggerDiag = true"
                        style="width: 100%; height: 100%;"
                        cover
                        :src="previewUrl">
                            <template v-slot:error>
                                <div 
                                style="width: 100%; height:100%"
                                class="d-flex justify-center align-center">
                                    <v-icon>mdi-account</v-icon>
                                </div>
                            </template>

                            <div 
                            style="width:100%; height: 100%;"
                            class="d-flex justify-center align-center customBg">
                                <v-icon>mdi-camera</v-icon>
                            </div>
                        </v-img>
                    </v-avatar>

                    <v-text-field
                    :rules="nameRules"
                    :placeholder="user.username"
                    v-model="nFields.nName"
                    label="name"
                    variant="outlined"></v-text-field>

                    <v-text-field
                    :rules="emailRules"
                    :placeholder="user.email"
                    v-model="nFields.nMail"
                    variant="outlined"
                    label="email"></v-text-field>

                    <v-card-actions 
                    v-if="mode == 'edit'"
                    class="d-flex justify-center align-center">

                        <v-btn 
                        @click="deleteUser"
                        color="error">Delete</v-btn>

                        <v-btn
                        :disabled="disableBtn"
                        type="submit">update</v-btn>
                    </v-card-actions>
                </v-form>
            </div>

            <v-divider></v-divider>


            <span>
                <v-row>
                    <v-col v-if="!mobile"></v-col>
                    <v-col>
                        <v-switch
                        v-model="mode"
                        color="primary"
                        true-value = "edit"
                        false-value = "view"
                        :label="`Mode: ${mode}`"
                        ></v-switch>
                    </v-col>
                    <v-col v-if="!mobile"></v-col>
                </v-row>
            </span>            
        </v-card>

        <v-dialog v-model="triggerDiag" class="d-flex">
            <v-container class="justify-center d-flex">
                <v-card 
                class="pa-5"
                min-width="300px"
                width="600px"
                max-width="600">
                    <v-file-input
                    clearable
                    @click:clear="photo = undefined"
                    v-model="photo"
                    label="profile image"
                    prepend-icon="mdi-camera"
                    variant="solo-filled"></v-file-input>

                    <v-divider></v-divider>
                
                    <v-card-actions class="justify-center">
                        <v-btn
                        @click="uploadImage">upload</v-btn>
                    </v-card-actions>
                </v-card>
            </v-container>
        </v-dialog>

        <Modal 
        @submit="mode='view'"
        ref="modal"></Modal>

        <LoadingModal v-model="loading"></LoadingModal>

        <ViewImageModal
        :url="url"
        @hide="imageModal = false"
        v-model="imageModal"></ViewImageModal>
    </v-container>
</template>

<script setup>
    import {ref} from "vue";
    import {useStore} from "vuex"
    import apiConf from "../apiConf.json"
    import {watch} from "vue"
    import axios from "axios"
    import Modal from "@/components/Modal.vue";
    import LoadingModal from "@/components/LoadingModal.vue";
    import ViewImageModal from "@/components/ViewImageModal.vue";
    import { useDisplay } from "vuetify"

    const {mobile} = useDisplay()
    var imageModal = ref();
    var loading = ref();
    var disableBtn = ref(true);
    var user = ref({
        username:undefined,
        email:undefined
    });
    var file;
    var modal = ref();
    var photo = ref(undefined);
    var triggerDiag = ref(false);
    var mode = ref("view")
    const store = useStore();
    var {id} = store.getters.getUser;
    var url = ref()
    url.value = apiConf.host + apiConf.port + apiConf.users.getPhoto + id;
    var previewUrl = ref();
    previewUrl.value = url.value;
    var buttonBooleans = ref({
        name:undefined,
        email:undefined,
    })
    var nFields = ref({
        nName:undefined,
        nMail:undefined
    })

    var nameRules = ref([
        value=>{
            if(value){
                buttonBooleans.value.name = true;
                return true;
            }else{
                buttonBooleans.value.name = false;
                return "name field cannot be empty"
            }
        }
    ])

    var emailRules = ref([
        value =>{
            if(value){
                buttonBooleans.value.email = true;
                return true;
            }else{
                buttonBooleans.value.email = false;
                console.log(buttonBooleans.value)
                console.log(disableBtn.value)
                return "email field cannot be empty";
            }
        }
    ])

    async function getUserData(){
        let {token} = store.getters.getUser;
        let res = await axios.get(apiConf.host + apiConf.port + apiConf.users.getData + id,{
            headers:{
                'Authorization':'Bearer ' + token
            }
        })
        .catch((err)=>{
            if(err.response){
                modal.value.createModal("Error","get user data",err.response.data.msg,true,"/")
            }else{
                modal.value.createModal("Error","get user data","An unknown error ocurred",true,"/")
            }
            store.commit("deleteUser");
            console.log(err);
            return undefined
        });

        if(res){
            user.value = res.data.user;
            //nName.value = user.value.username;
            //nMail.value = user.value.email;
            nFields.value.nName = user.value.username;
            nFields.value.nMail = user.value.email;
        }
    }

    function previewImage(){
        if(photo.value != undefined){
            file = photo.value[0];
            var src = URL.createObjectURL(file)
            previewUrl.value = src;
        }else{
            previewUrl.value = url.value;
        }
    }

    async function updateUser(){
        let {token} = store.getters.getUser;
    
        loading.value = true;
        let res = await axios.put(apiConf.host + apiConf.port + apiConf.users.update + id,{
            username:nFields.value.nName,
            email:nFields.value.email
        },{
            headers:{
                'Authorization':'Bearer ' + token
            }
        })
        .catch((err)=>{
            loading.value = false;
            if(err.response){
                modal.value.createModal("Error","update user",err.response.data.msg,true);
            }else{
                modal.value.createModal("Error","update user","An unknown error ocurred",true);
            }
            return undefined;
        });

        loading.value = false;
        if(res){
            let {user, token} = res.data;
            store.commit("setUser",{
                id:user.user_id,
                name:user.username,
                token:token
            })
            modal.value.createModal("Success","update user","User data updated succesfully",false,undefined,true);
            getUserData();
            return true;
        }

    }

    async function deleteUser(){
        let {id,token} = store.getters.getUser;

        let res = await axios.delete(apiConf.host + apiConf.port + apiConf.users.delete + id,{
            headers:{
                'Authorization':'Bearer ' + token
            }
        })
        .catch((err)=>{
            if(err.response){
                modal.value.createModal("Error","delete user",err.response.data.msg,true);
            }else{
                modal.value.createModal("Error","delete user","An unknown error ocurred",true);
            }
            console.log(err);
            return undefined;
        })

        if(res){
            store.commit("deleteUser");
            modal.value.createModal("Success","delete user","Account was deleted succesfully",false,"/");
        }
    }

    async function uploadImage(){
        let {id, username, token} = store.getters.getUser;

        if(photo.value == undefined){
            return false;
        }

        loading.value = true;
        var formData = new FormData();
        formData.append("name",username);
        formData.append("file",photo.value[0]);

        let res = await axios.post(apiConf.host + apiConf.port + apiConf.users.uploadPhoto + id,formData,{
            headers:{
                "Content-Type":"multipart/form-data",
                'Authorization':'Bearer ' + token,
            }
        })
        .catch(err=>{
            loading.value = false;
            console.log(err);
            if(err.response){
                modal.value.createModal("Error","upload photo",err.response.data.msg,true)
            }else{
                modal.value.createModal("Error","upload photo","An unexpected error ocurred",true)
            }
            return undefined
        })

        console.log(res);

        if(res){
            loading.value = false;
            return true;
        }
    }


    getUserData();

    watch(photo,()=>{
        previewImage();
    })

    watch(nFields.value, ()=>{
        let {nName, nMail} = nFields.value;
        if(nName == user.value.username && nMail == user.value.email){
            disableBtn.value = true;
        }else if(["",undefined].includes(nName) || ["",undefined].includes(nMail)){
            disableBtn.value = true
        }else{
            disableBtn.value = false;
        }
    })
</script>

<style>

    .customBg{
        background-color: rgba(0, 0, 0, 0.056);
    }

</style>