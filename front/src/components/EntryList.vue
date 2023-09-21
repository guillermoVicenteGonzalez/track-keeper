<template>
    <v-card
    elevation="3"
    v-if="props.list"
    class="overflow-auto border-b mt-2"
    min-width="320px"
    :max-height="mobile ? '500px':'660px'">
        <v-table
        transition="fade-transition">
            <thead>
                <tr 
                class="text-subtitle-2 text-xl-h1">
                    <th class>cover</th>
                    <th class="">Name</th>
                    <th v-if="!mobile" class="text-center">start_date</th>
                    <th>finish date</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in list" :key="item.entry_id">
                    <th
                    style="width: 50px; height:50px; max-height: 60px;">
                        <v-img
                        @click="showImage(url + item.Media.media_id)"
                        style="width: 100%; height:100%;"
                        :src="url + item.Media.media_id"
                        cover>
                            <template v-slot:error>
                                <v-icon
                                style="
                                width:100%;
                                height:100%
                                "
                                >mdi-image</v-icon>
                            </template>
                        </v-img>
                    </th>
                    <th
                    @click="clickOnCard(item)"
                    class="text-body-2 text-md-body-1">{{ item.Media.name}}</th>

                    <th
                    v-if="!mobile">{{ item.start_date }}</th>

                    <th
                    class="text-body-2 text-md-body-1" 
                    style="min-width: 110px;">{{ item.finish_date }}</th>

                    <th
                    class=""
                    style="max-width: 40px;">
                        <v-btn
                        @click="deleteEntry(item.entry_id)"
                        color="error"
                        size="small"
                        variant="text"
                        icon="mdi-delete"></v-btn>
                    </th>
                </tr>
            </tbody>
        </v-table>


        <update-media-card 
        v-if="element"
        @updated="emit('updated')"
        v-bind="element.Media"
        :entry_id="element.entry_id"
        :review="element.review"
        :state="element.state"
        :start_date="element.start_date"
        :finish_date="element.finish_date"
        isEntry="true"
        @hide="triggerDialog = false"
        v-model="triggerDialog"></update-media-card>

    </v-card>

    <loading-modal
    v-model="loading"></loading-modal>

    <modal
    ref="modal"></modal>

    <view-image-modal
    v-model="triggerImage"
    @hide="triggerImage = false"
    :url="modalUrl"></view-image-modal>


</template>

<script setup>
    import {ref} from "vue"
    import {useStore} from "vuex"
    import {useDisplay} from "vuetify"
    import UpdateMediaCard from "./updateMediaCard.vue";
    import ViewImageModal from "./ViewImageModal.vue";
    import apiConf from "@/apiConf.json"    
    import axios from "axios";
    import LoadingModal from "./LoadingModal.vue";
    import Modal from "./Modal.vue";

    var modal = ref();
    var loading = ref();
    var triggerImage = ref();
    var element = ref();
    var triggerDialog = ref();
    const {mobile} = useDisplay();
    const store = useStore();
    let {id} = store.getters.getUser;
    var url= ref(apiConf.host + apiConf.port + apiConf.media.getCover + id + "/")
    const props = defineProps(['type','list'])
    const emit = defineEmits(['updated'])
    var modalUrl = ref();

    function clickOnCard(item){
        element.value = item;
        console.log(item);
        triggerDialog.value = true
    }

    function showImage(url){
        modalUrl.value = url;
        triggerImage.value = true
    }

    async function deleteEntry(entryId){
        let {token} = store.getters.getUser;

        let res = await axios.delete(apiConf.host + apiConf.port + apiConf.entry.delete + id + "/" + entryId,{
            headers:{
                'Authorization':'Bearer ' + token
            }
        })
        .catch((err)=>{
            if(err.response){
                modal.value.createModal("Error","delete entry",err.response.data.msg,true);
            }else{
                modal.value.createModal("Error","delete entry","An unknown error ocurred",true);
            }
            console.log(err);
            return undefined;
        })

        if(res){
            modal.value.createModal("Success","delete entry","Succesfully deleted entry",false);
            emit("updated");
        }
    }
</script>