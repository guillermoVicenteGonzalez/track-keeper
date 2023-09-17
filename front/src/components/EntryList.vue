<template>
    <v-card
    v-if="props.list"
    class="overflow-auto"
    min-width="320px"
    width="20000px"
    max-height="700px">
        <v-table>
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
                    class="text-body-2 text-md-body-1" >{{ item.Media.name}}</th>
                    <th
                    class="text-body-2 text-md-body-1" 
                    style="min-width: 110px;">{{ item.finish_date }}</th>
                </tr>
            </tbody>
        </v-table>
    </v-card>
</template>

<script setup>
    import {ref} from "vue"
    import apiConf from "../apiConf.json"
    import {useStore} from "vuex"

    const store = useStore();
    let {id} = store.getters.getUser;
    var url= ref(apiConf.host + apiConf.port + apiConf.media.getCover + id + "/")
    const props = defineProps(['type','list'])
</script>