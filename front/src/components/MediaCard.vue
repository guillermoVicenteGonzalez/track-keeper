<template>
    <v-card 
    width="400px">
        <v-container 
        fluid
        class="align-center">
            <v-row no-gutters class="justify-space-between">
                <v-col 
                cols="2"
                class="d-flex justify-center align-center">
                    <v-img
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
                <v-col cols="9">
                    <v-card-title class="text-h5">{{ name }}</v-card-title>
                    <v-card-subtitle class="text-subtitle-1">{{ type }}</v-card-subtitle>
                    <v-card-subtitle class="text-subtitle-1">{{ genre }}</v-card-subtitle>
                </v-col>
            </v-row>

            <v-divider class="mt-2"></v-divider>
            <div
            class="justify-center text-center align-center mt-2 mb-0">

                <v-btn
                size="small"
                class="ma-0 pa-0"
                icon="mdi-plus"
                @click="mediaCardBtn"></v-btn>
            </div>
        </v-container>
    </v-card>
</template>

<script setup>
    import {ref} from "vue"
    import apiConf from "../apiConf.json"
    import {useStore} from "vuex"

    const props = defineProps(['name','media_id','type','genre','description','cover']);
    var url = ref();
    const store = useStore();
    let {id} = store.getters.getUser; 
    url.value = apiConf.host + apiConf.port + apiConf.media.getCover + id + "/";

    function mediaCardBtn(){
        console.log(url.value);
        console.log(props)
    }

</script>

