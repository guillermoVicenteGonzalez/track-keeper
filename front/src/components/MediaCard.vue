<template>
    <v-card 
    elevation="3"
    :height="isEntry ? '180px':'170px' "
    class="colorBorder border-b border b--hot-pink"
    width="400px">
        <v-container 
        fluid
        class="align-center">
            <v-row 
            cursor

            no-gutters class="justify-space-between">
                <v-col 
                style="height: 90px;"
                cols="2"
                class="d-flex justify-center align-center">
                    <v-img
                    @click="triggerImage = true"
                    class="bg-grey-darken-2 rounded"
                    style="width: 100%; height: 100%;"
                    cover
                    :src="url + media_id">
                        <template v-slot:error>
                            <v-icon 
                            style="
                            width: 100%;
                            height:100%;">mdi-image</v-icon>
                        </template>
                    </v-img>
                </v-col>
                <v-col 
                @click="triggerUpdate = true"
                cols="9">
                    <v-card-title class="text-h5">{{ name }}</v-card-title>
                    <v-card-subtitle class="text-subtitle-1">{{ type}} ({{ genre }})</v-card-subtitle>
                    <div v-if="isEntry">
                        <v-card-subtitle>{{ state }}</v-card-subtitle>

                    </div>
                </v-col>
            </v-row>

            <v-divider class="mt-2"></v-divider>
            <div
            v-if="!isEntry"
            class="justify-center text-center align-center mt-2 mb-0">
                <v-btn
                class="mx-1"
                size="small"
                icon="mdi-delete"
                @click="deleteMedia()"></v-btn>
                
                <v-btn
                size="small"
                class="mx-1 pa-0"
                icon="mdi-plus"
                @click="mediaCardBtn"></v-btn>

            </div>

            <v-card-actions v-else class="justify-center">
                <v-btn
                @click="deleteEntry()"
                variant="flat"
                icon="mdi-delete"></v-btn>
            </v-card-actions>

            <add-entry 
            @hide="addEntryTrigger = false"
            v-bind="props"
            v-model="addEntryTrigger"></add-entry>
        </v-container>

<!---------------------------------------------DIALOG-->
        <update-media-card
        v-bind="props"
        v-model="triggerUpdate"
        @hide="triggerUpdate = false"
        @updated="emit('updated')"
        :isEntry="isEntry"
        ></update-media-card>

        <Modal ref="modal"></Modal>

        <loading-modal v-model="loadingTrigger"></loading-modal>

        <ViewImageModal
        @hide="triggerImage = false"
        v-model="triggerImage"
        :url="url + media_id"></ViewImageModal>
    </v-card>
</template>

<script setup>
    import {ref} from "vue"
    import apiConf from "../apiConf.json"
    import {useStore} from "vuex"
    import AddEntry from "./AddEntry.vue";
    import axios from "axios"
    import Modal from "./Modal.vue";
    import UpdateMediaCard from "./updateMediaCard.vue";
    import LoadingModal from "./LoadingModal.vue";
    import ViewImageModal from "./ViewImageModal.vue";

    var triggerImage = ref();
    var loadingTrigger = ref();
    var modal = ref();
    var triggerUpdate = ref();
    const emit = defineEmits(['updated'])
    const props = defineProps(['name','media_id','type','genre','description','cover',
    'entry_id','review','state','start_date','finish_date','isEntry']);
    var url = ref();
    const store = useStore();
    let {id} = store.getters.getUser; 
    url.value = apiConf.host + apiConf.port + apiConf.media.getCover + id + "/";
    var addEntryTrigger = ref();


    function mediaCardBtn(){
        addEntryTrigger.value = true
    }

    async function deleteMedia(){
        loadingTrigger.value = true;
        let {id,token} = store.getters.getUser;
        let res = await axios.delete(apiConf.host + apiConf.port +apiConf.media.delete + id +"/" + props.media_id ,{
            headers:{
                'Authorization':'Bearer ' + token
            }
        })
        .catch((err)=>{
            loadingTrigger.value = false;

            if(err.response){
                modal.value.createModal("Error","delete media",err.response.data.msg,true);
            }else{
                modal.value.createModal("Error","delete media",err.response.data.msg,true);
            }
            console.log(err);
            return undefined;
        });

        if(res){
            modal.value.createModal("Success","delete media","Succesfully deleted media");
        }


        loadingTrigger.value = false;

        emit("updated");
    }

    async function deleteEntry(){
        loadingTrigger.value = true
        let {id,token} = store.getters.getUser;

        let res = await axios.delete(apiConf.host +apiConf.port + apiConf.entry.delete + id + "/" + props.entry_id,{
            headers:{
                'Authorization':'Bearer ' + token
            }
        })
        .catch((err)=>{
            loadingTrigger.value = false;

            if(err.response){
                modal.value.createModal("Error","delete entry",err.response.data.msg,true);
            }else{
                modal.value.createModal("Error","delete entry",err.response.data.msg,true);
            }
            console.log(err);
            return undefined;
        })

        if(res){
            modal.value.createModal("Success","delete media","Succesfully deleted media");
        }


        loadingTrigger.value = false;

        emit("updated");
    }

</script>


