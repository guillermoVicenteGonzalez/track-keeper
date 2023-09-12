<template>
    <v-card 
    min-width="400px"
    max-width="650px">
        <v-container 
        fluid
        class="align-center">
           <!-- <div class="gridContainer">
                <div style="background-color: red;">
                    <v-img 
                        src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.l4JhbHxAw0BEWguUUmKTXgHaLH%26pid%3DApi&f=1&ipt=cc2272e3bbca0f9b9ba68e0e1f0d158c51f807eb2edd3a3390bedcdd79d47ea4&ipo=images"></v-img>
                </div>

                <div>
                    <v-card-title>El viaje de chihiro</v-card-title>
                    <v-card-subtitle>Pelicula</v-card-subtitle>
                    <v-card-subtitle>Anime</v-card-subtitle>
                </div>
            </div>

            <v-divider></v-divider>
            <v-card-actions class="justify-center">
                <v-btn 
                icon="mdi-plus"
                variant="outlined"></v-btn>
            </v-card-actions>-->
            <v-row no-gutters class="justify-space-between">
                <v-col 
                cols="2"
                class="d-flex justify-center align-center">
                    <v-img
                    style="width: 100%; height: 100%;"
                    cover
                    :src="url">
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
                icon="mdi-plus"></v-btn>
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
    url.value = apiConf.host + apiConf.port + apiConf.media.getCover + id + "/" + props.media_id;
    console.log(url.value);

</script>

<style>
    .gridContainer{
        width: 100%;
        height: 100%;
        display: inline-grid;
        justify-content: space-between;
        grid-template-columns: 25% 60%;
    }
</style>