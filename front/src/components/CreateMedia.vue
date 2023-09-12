<template>
    <v-dialog>
        <v-container class="d-flex justify-center align center text-center">
            <v-card 
            min-width="800px"
            max-width="1000px"
            class="pa-5">
                <v-card-title>Create media</v-card-title>
                <v-form @submit.prevent="createFullMedia">
                    <v-text-field
                    variant="outlined"
                    label="name"
                    v-model="name"></v-text-field>

                    <v-text-field
                    label="type"
                    v-model="type"
                    variant="outlined"></v-text-field>

                    <v-text-field
                    label="genre"
                    v-model="genre"
                    variant="outlined"></v-text-field>

                    <v-text-field
                    v-model="duration"
                    label="duration"
                    variant="outlined"></v-text-field>

                    <v-textarea
                    v-model="description"
                    label="description"
                    variant="outlined"></v-textarea>

                    <v-file-input
                    label="cover"
                    clearable
                    v-model="photo"
                    prepend-icon="mdi-camera"
                    variant="outlined"></v-file-input>

                    <v-divider></v-divider>
                    <v-card-actions class="justify-center">
                        <v-btn color="error" variant="outlined">Cancel</v-btn>
                        <v-btn @click="emit('hide')" type="submit" color="success" variant="outlined">Accept</v-btn>
                    </v-card-actions>
                </v-form>
            </v-card>
        </v-container>

        <LoadingModal v-model="loading"></LoadingModal>

        <Modal
        @submit="emit('hide')" 
        ref="modal" ></Modal>
    </v-dialog>
</template>

<script setup>
    import {ref} from "vue"
    import axios from "axios"
    import apiConf from "../apiConf.json"
    import {useStore} from "vuex"
    import Modal from "./Modal.vue";
    import LoadingModal from "./LoadingModal.vue";

    var modal = ref();
    var name = ref();
    var type = ref();
    var genre = ref();
    var duration = ref();
    var description = ref();
    var photo = ref();
    var loading = ref();
    const store = useStore();
    const emit = defineEmits(['hide','created'])

    
    async function createFullMedia(){
        loading.value = true;
        let media = await createMedia();
        console.log(media);
        if(media){
            let coverRes = await uploadFile(media.media_id)
            if(coverRes){
                modal.value.createModal("Success","create media","the new " + type.value + " was registered succesfully",false,undefined,true);
            }else{
                modal.value.createModal("error","create media","the new " + type.value + " was registered succesfully but the cover image could not be uploaded",true,undefined,true);
            }
        }
        loading.value = false;
        emit('created')
    }

    async function createMedia(){
        let {id, token} = store.getters.getUser;

        
        let res = await axios.post(apiConf.host + apiConf.port + apiConf.media.create + id,
        {
            name:name.value,
            type:type.value,
            genre:genre.value,
            duration:duration.value,
            description:description.value
        },{
            headers:{
                'Authorization':'Bearer ' + token,
            }
        })
        .catch((err)=>{
            console.log(err);
            if(err.response){
                modal.value.createModal("Error","create media",err.response.data.msg,true);
            }else{
                modal.value.createModal("Error","create media","An unexpected error ocurred",true);
            }
            return undefined
        });

        if(res){
            //modal.value.createModal("Success","create media","The new " + type.value + " was registered succesfully");
            return res.data.value;
        }
    }

    async function uploadFile(mediaId){
        let {username, id, token} = store.getters.getUser
        var formData = new FormData();
        formData.append("name",username);
        formData.append("file",photo.value[0]);

        let result = await axios.post(apiConf.host + apiConf.port + apiConf.media.uploadCover + id +"/" + mediaId, formData,{
            headers:{
                "Content-Type":"multipart/form-data",
                'Authorization':'Bearer ' + token,
            }
        })
        .catch((err)=>{
            console.log(err);
            if(err.response){
                modal.value.createModal("Error","upload cover",err.response.data.msg,true)
            }else{
                modal.value.createModal("Error","upload cover","An unexpected error ocurred",true)
            }
            return undefined
        })

        if(result){
            return true;
        }
    }


</script>