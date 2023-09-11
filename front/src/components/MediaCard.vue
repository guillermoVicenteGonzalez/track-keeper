<template>
    <v-card 
    max-width="450px">
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
                class="justify-start" cols="2">
                    <v-img 
                    cover
                    src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.l4JhbHxAw0BEWguUUmKTXgHaLH%26pid%3DApi&f=1&ipt=cc2272e3bbca0f9b9ba68e0e1f0d158c51f807eb2edd3a3390bedcdd79d47ea4&ipo=images"></v-img>
                </v-col>
                <v-col cols="9">
                    <v-card-title class="text-h5">El viaje de chihiro</v-card-title>
                    <v-card-subtitle class="text-subtitle-1">Pelicula</v-card-subtitle>
                    <v-card-subtitle class="text-subtitle-1">Anime</v-card-subtitle>
                </v-col>
            </v-row>
            <v-divider class="mt-2"></v-divider>
            <v-card-actions density="compact">
                <v-btn
                class="align-center"
                size="medium"
                icon="mdi-plus"></v-btn>
            </v-card-actions>



        </v-container>
    </v-card>
</template>

<script setup>
    import {ref} from "vue"

    const props = defineProps(['name','media_id','type','genre','description','cover'])
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