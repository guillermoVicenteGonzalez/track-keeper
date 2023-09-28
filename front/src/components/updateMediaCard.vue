<template>
    <v-dialog 
    scrollable
    transition="dialog-bottom-transition"
    persistent>
        <v-container
        class="d-flex justify-center align-center">
            <v-card
            elevation="3"
            class="pa-3 d-block border-b border b--hot-pink overflow-auto"
            min-width="300px"
            width="700px"
            
            max-height="650px">
    
            <v-container>
                <v-row
                class="d-flex ">
                    <v-col 
                    style="height: 130px;"
                    xl="2"
                    lg="2"
                    md="2"
                    cols="12"
                    xs="12"
                    class="justify-center align-center text-center">
                        <v-img
                        class="bg-grey-darken-2 rounded"
                        style="width: 100%; height: 100%;"
                        cover
                        :src="previewUrl">
                            <template v-slot:error>
                                <v-icon 
                                style="
                                width: 100%;
                                height:100%;">mdi-image</v-icon>
                            </template>

                            <div
                            @click="photoDiag = true"
                            class="d-flex justify-center align-center customBg"
                            style="width: 100%; height:100%;" 
                            v-if="!isEntry">
                                <v-icon>mdi-camera</v-icon>
                            </div>
                        </v-img>
                    </v-col>


                    <v-col 
                    v-if="isEntry"
                    md="10 text-start"
                    cols="12 text-cente">
                        <v-card-title 
                        class="text-lg-h4  text-sm-subtitle-1 text-center text-md-start">
                            {{ name }}
                        </v-card-title>
                        
                        <v-card-subtitle
                        class="text-subtitle-2 text-center text-md-start">
                            type: {{ type }}
                        </v-card-subtitle>
                            
                        <v-card-subtitle class="text-subtitle-2 text-center text-md-start">
                            genre: {{ genre }}
                        </v-card-subtitle>

                    </v-col>

                    <v-col 
                    v-else
                    style="height: 50px;"
                    md="10 text-start"
                    cols="12 text-center">
                        <v-card-title 
                        class="text-overline text-center text-md-start text-lg-h4  text-sm-subtitle-1 ">{{ name }}</v-card-title>
                    </v-col>

                </v-row>
            </v-container>
                <v-form validate-on="input">
                    <v-divider></v-divider>
                    <div v-if="isEntry">
                        <v-card-text
                        :density="mobile ? 'compact':'default'"
                        style="max-height: 100px;"
                        class="border rounded ma-3 overflow-auto"> description: {{ description }}</v-card-text>
                
                        <v-divider class="mb-3"></v-divider>
                        <v-select
                        :density="mobile ? 'compact':'default'"
                        clearable
                        :rules="rules"
                        class="mx-3"
                        v-model="nState"
                        :items="states"
                        variant="solo-filled"></v-select>

                        <v-text-field
                        :density="mobile ? 'compact':'default'"
                        clearable
                        :disabled="disableSDate"
                        class="mx-3"
                        label="start date"
                        :placeholder="start_date"
                        v-model="nStartD"
                        variant="solo-filled"
                        type="date"></v-text-field>

                        <v-text-field
                        :density="mobile ? 'compact':'default'"
                        clearable
                        :rules="dateRules"
                        :disabled="disableFDate"
                        class="mx-3"
                        label="finish date"
                        :placeholder="finish_date"
                        v-model="nFinishD"
                        variant="solo-filled"
                        type="date"></v-text-field>

                        <v-divider></v-divider>
                        <v-card-actions class="justify-center">
                            <v-btn
                            @click="cancelBtn">Cancel</v-btn>

                            <v-btn
                            :disabled="btnTrigger"
                            @click="updateEntry">Update</v-btn>
                        </v-card-actions>
                    </div>

                    <div v-else>
                        <v-text-field
                        :density="mobile ? 'compact':'default'"
                        variant="outlined"
                        label="name"
                        :placeholder="name"
                        v-model="nName"></v-text-field>

                        <v-select
                        :density="mobile ? 'compact':'default'"
                        label="type"
                        variant="outlined"
                        :items="types"
                        :placeholder="type"
                        v-model="nType"></v-select>

                        <v-text-field
                        :density="mobile ? 'compact':'default'"
                        variant="outlined"
                        label="genre"
                        :placeholder="genre"
                        v-model="nGenre"></v-text-field>

                        <v-textarea
                        :density="mobile ? 'compact':'default'"
                        variant="outlined"
                        label="description"
                        :placeholder="description"
                        v-model="nDescription"></v-textarea>

                        <v-divider></v-divider>
                        <v-card-actions class="justify-center">
                            <v-btn
                            @click="cancelBtn">Cancel</v-btn>
                            <v-btn
                            @click="updateMedia">Update</v-btn>
                        </v-card-actions>
                    </div>
                </v-form>
            </v-card>


            
            <Modal 
            @submit="cancelBtn"
            ref="modal"></Modal>

            <loading-modal v-model="loading"></loading-modal>

            <v-dialog v-model="photoDiag">
                <v-container class="d-flex justify-center align-center">
                    <v-card 
                    class="pa-5"
                    min-width="300px"
                    max-width="600px"
                    width="600px">
                        <v-card-title class="text-center">Update image</v-card-title>
                        <v-file-input
                        @click:clear="nPhoto = undefined"
                        clearable
                        v-model="nPhoto"
                        :density="mobile ? 'compact':'default'"
                        prepend-icon="mdi-camera"
                        variant="solo-filled"></v-file-input>
                        <v-divider></v-divider>
                        <v-card-actions>
                            <v-btn
                            @click="photoDiag = false">Cancel</v-btn>
                            
                            <v-btn
                            @click="uploadImage">Accept</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-container>
            </v-dialog>
        </v-container>
    </v-dialog>
</template>

<script setup>
    import {onMounted, ref} from "vue"
    import LoadingModal from "./LoadingModal.vue";
    import Modal from "./Modal.vue";
    import {watch} from "vue"
    import {useStore} from "vuex"
    import axios from "axios"
    import apiConf from "../apiConf.json"
    import {useDisplay} from "vuetify"

    var nPhoto = ref();
    var photoDiag = ref();
    const {mobile} = useDisplay();
    var states = ref(['finished','on hold','to date','bookmarked','repeating','repeated']);
    const store = useStore();
    var loading = ref()
    var modal = ref();
    const props = defineProps(['name','media_id','type','genre','description','cover',
    'entry_id','review','state','start_date','finish_date','isEntry']);
    const emit = defineEmits(['hide','updated'])
    var url = ref();
    let {id} = store.getters.getUser; 
    url.value = apiConf.host + apiConf.port + apiConf.media.getCover + id + "/" + props.media_id;
    var previewUrl = ref();
    previewUrl.value = url.value;
    var types = ref([
        'book',
        'Videogame',
        'Film',
        'TVShow',
        'Comic',
        'Anime',
        'Other'
    ]);

    /**
     * Upadate stuff
     */
    var nName = ref();
    var nType = ref();
    var nGenre = ref();
    var nState = ref();
    var nStartD = ref();
    var nFinishD = ref();
    var nDescription = ref();

     /**
     * Entry form rules (primarily dates and stuff)
     */
    var btnTrigger = ref();
    var disableFDate = ref();
    var disableSDate = ref();
    watch(nState,()=>{
        if( !(['finished','repeated'].includes(nState.value))){
            disableFDate.value = true;
            disableSDate.value = false;
            nFinishD.value = undefined;
            nStartD.value = props.start_date
        }else if(nState.value == 'bookmarked'){
            disableFDate.value = true;
            disableSDate.value = true;
            nStartD.value = undefined
            nFinishD.value = undefined
        }
        else{
            disableSDate.value = false;
            disableFDate.value = false;
            nStartD.value = props.start_date;
            nFinishD.value = props.finish_date;
        }
    })

    var rules = ref([
        value =>{
            if(value){
                btnTrigger.value = false
                return true
            } 
            btnTrigger.value = true
            return "A state is required"
        }
    ])

    var dateRules = ref([
        value=>{
            if(value < nStartD.value){
                btnTrigger.value = true
                return "Start date cannot be after finish date"
            } 
            btnTrigger.value = false
            return true;
        }
    ]);
    




    async function updateMedia(){
        let fields ={};
        let {id, token} = store.getters.getUser;

        loading.value = true
        if(! ([" ",undefined].includes(nName.value)) || nName.value != props.name){
            fields.name = nName.value;
        }

        if(! ([" ",undefined].includes(nType.value)) || nType.value != props.type){
            fields.type = nType.value;
        }

        if(! ([" ",undefined].includes(nGenre.value)) || nGenre.value != props.genre){
            fields.genre = nGenre.value;
        }

        if(! ([" ",undefined].includes(nDescription.value)) || nDescription.value != props.description){
            fields.description = nDescription.value;
        }

        if(Object.keys(fields).length == 0){
            modal.value.createModal("Error","update media","changes where either empty or equal to the previous values",true);
            loading.value = false;
            return undefined;
        }

        let res = await axios.put(apiConf.host + apiConf.port + apiConf.media.update + id +"/" + props.media_id,fields,{
            headers:{
                'Authorization':'Bearer ' + token
            }
        })
        .catch((err)=>{
            if(err.response){
                modal.value.createModal("Error","update media",err.response.data.msg,true)
            }else{
                modal.value.createModal("Error","update media","an unknown error ocurred",true)
            }
            console.log(err);
            return undefined
        });


        loading.value = false;
        
        if(res){
            emit("updated")
            modal.value.createModal("Success","update media","update was successfull",false,undefined,true)
            return true
        }
    }


    async function updateEntry(){
        let fields = {}
        let {id, token} = store.getters.getUser;

        loading.value = true

        if(! ([" ",undefined].includes(nState.value)) || nState.value != props.state){
            fields.state = nState.value;
        }

        if(! ([" ",undefined].includes(nStartD.value)) || nStartD.value != props.start_date){
            fields.start_date = nStartD.value;
        }

        if(! ([" ",undefined].includes(nFinishD.value)) || nFinishD.value != props.finish_date){
            fields.finish_date = nFinishD.value;
        }

        if(Object.keys(fields).length == 0){
            modal.value.createModal("Error","update media","changes where either empty or equal to the previous values",true);
            loading.value = false;
            return undefined;
        }

        let res = await axios.put(apiConf.host + apiConf.port + apiConf.entry.update + id + "/" + props.entry_id, fields,{
            headers:{
                'Authorization':'Bearer ' + token
            }
        })
        .catch((err)=>{
            if(err.response){
                modal.value.createModal("Error","update entry",err.response.data.msg,true)
            }else{
                modal.value.createModal("Error","update entry","an unknown error ocurred",true)
            }
            console.log(err);
            return undefined
        });

        loading.value = false

        if(res){
            emit("updated")
            modal.value.createModal("Success","update entry","update was successfull",false,undefined,true)
            return true
        }

    }


    function previewImage(){
        if(nPhoto.value != undefined){
            var file = nPhoto.value[0];
            var src = URL.createObjectURL(file);
            previewUrl.value = src
        }else{
            previewUrl.value = url.value 
        }
    }

    async function uploadImage(){
        let {id,username, token} = store.getters.getUser;

        var formData = new FormData();
        formData.append("name",username);
        formData.append("file",nPhoto.value[0]);

        let res = await axios.post(apiConf.host + apiConf.port + apiConf.media.uploadCover + id + "/" + props.media_id, formData,{
            headers:{
                "Content-Type":"multipart/form-data",
                'Authorization':'Bearer ' + token,   
            }
        }).catch((err)=>{
            console.log(err);
            if(err.response){
                modal.value.createModal("Error","update cover",err.response.data.msg,true)
            }else{
                modal.value.createModal("Error","update cover","An unexpected error ocurred",true)
            }
            return undefined
        })

        if(res){
            modal.value.createModal("Success","update cover","cover was updated succesfully",false);
            photoDiag.value = undefined;
            emit("updated")
        }
    }

    function setValues(){
        nName.value = props.name;
        nType.value = props.type;
        nGenre.value = props.genre;
        nState.value = props.state;
        nDescription.value = props.description;
        nFinishD.value = props.finish_date;
        nStartD.value = props.start_date;
    }

    function cancelBtn(){
        setValues();
        emit('hide');
    }

    watch(nPhoto,()=>{
        previewImage()
    })

    onMounted(()=>{
        setValues();
    })

</script>

<style>

    .customBg{
        background-color: rgba(0, 0, 0, 0.263);
    }

    .customBg:hover{
        background-color: rgba(0, 0, 0, 0.537);
        cursor: pointer;
    }
</style>