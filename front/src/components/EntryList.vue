<template>
    <v-card
    color="success"
    elevation="3"
    v-if="props.list"
    class="overflow-auto border-b mt-2"
    min-width="320px"
    :max-height="mobile ? '500px':'660px'">
        <v-table
        transition="fade-transition">
            <thead>
                <tr>
                    <th class="text-left">cover</th>
                    <th class="text-left">Name</th>
                    <th class="text-left">finish date</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in list" :key="item.entry_id">
                    <th
                    style="width: 50px; height:50px; max-height: 60px;">
                        <v-img
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
                    class="text-body-2 text-md-body-1" >{{ item.Media.name}}</th>
                    <th
                    class="text-body-2 text-md-body-1" 
                    style="min-width: 110px;">{{ item.finish_date }}</th>
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


</template>

<script setup>
    import {ref} from "vue"
    import apiConf from "../apiConf.json"
    import {useStore} from "vuex"
    import {useDisplay} from "vuetify"
    import UpdateMediaCard from "./updateMediaCard.vue";

    var element = ref();
    var triggerDialog = ref();
    const {mobile} = useDisplay();
    const store = useStore();
    let {id} = store.getters.getUser;
    var url= ref(apiConf.host + apiConf.port + apiConf.media.getCover + id + "/")
    const props = defineProps(['type','list'])
    const emit = defineEmits(['updated'])

    function clickOnCard(item){
        element.value = item;
        console.log(item);
        triggerDialog.value = true
    }
</script>