<template>
    <v-dialog>
        <v-container 
        transition="fade-transition"
        class="d-flex justify-center align center text-center">
            <v-card 
            width="800px"
            max-width="1000px"
            class="pa-5 overflow-auto">
                <v-card-title>Create media</v-card-title>
                <v-form 
                validate-on="input"
                @submit.prevent="createFullMedia">
                    <v-text-field
                    clearable
                    :rules="rules"
                    variant="outlined"
                    label="name"
                    v-model="name"></v-text-field>

                    <v-select
                    :rules="rules"
                    label="type"
                    variant="outlined"
                    item-title="value"
                    item-value="value"
                    clearable
                    v-model="type"
                    :items="props.types"></v-select>

                    <v-text-field
                    clearable=""
                    :rules="rules"
                    label="genre"
                    v-model="genre"
                    variant="outlined"></v-text-field>

                    <v-text-field
                    clearable
                    label="duration"
                    variant="outlined"></v-text-field>

                    <v-textarea
                    density="compact"
                    clearable
                    auto-grow=""
                    max-height="100px"
                    v-model="description"
                    label="description"
                    variant="outlined"></v-textarea>

                    <v-file-input
                    label="cover"
                    clearable
                    v-model="photo"
                    prepend-icon="mdi-camera"
                    variant="solo-filled"></v-file-input>

                    <v-divider></v-divider>
                    <v-card-actions class="justify-center">
                        <v-btn @click="emit('hide')" color="error" variant="outlined">Cancel</v-btn>
                        <v-btn 
                        :disabled="triggerBtn"
                        type="submit" color="success" variant="outlined">Accept</v-btn>
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
    import {watch} from "vue"

    var modal = ref();
    var name = ref();
    var type = ref();
    var genre = ref();
    var duration = ref();
    var description = ref();
    var photo = ref();
    var loading = ref();
    const store = useStore();
    const props =defineProps(['types'])
    const emit = defineEmits(['hide','created'])
    const rules = ref([
        value=>{
            if(!value){
                triggerBtn.value = true;
                return "This field cannot be empty"
            }else if(type.value && name.value && genre.value){
                triggerBtn.value = false;
                return true;
            }else{
                triggerBtn.value = true;
                return "you must fill all fields"
            }
        }
    ])

    var triggerBtn = ref(true);
    
    async function createFullMedia(){
        loading.value = true;
        let media = await createMedia();
        console.log(media);
        if(media && photo.value != undefined){
            let coverRes = await uploadFile(media.media_id)
            if(coverRes){
                modal.value.createModal("Success","create media","the new " + type.value + " was registered succesfully",false,undefined,true);
            }else{
                modal.value.createModal("error","create media","the new " + type.value + " was registered succesfully but the cover image could not be uploaded",true,undefined,true);
            }
        }
        loading.value = false;
        modal.value.createModal("Success","media created","media created succesfully",false,undefined,true)
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