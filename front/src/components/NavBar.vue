<template>
    <v-app-bar 
    elevation="3"
    color="primary">
        <v-app-bar-nav-icon
        color="white"
        @click="drawer = !drawer"></v-app-bar-nav-icon>
        <v-app-bar-title>{{ username}}</v-app-bar-title>

        <v-app-bar-title 
        v-if="!mobile"
        class="text-center">{{selection}}</v-app-bar-title>
        
        <v-switch
        style="max-width: 100px;"
          v-model="switchBtn"
          @click="toggleTheme"
          color="secondary"
          append-icon="mdi-theme-light-dark"
          class="d-flex align-center ml-2"
          ></v-switch>

        <v-menu>
            <template v-slot:activator="{props}">
                <v-avatar
                style="cursor: pointer;"
                class="mr-5" size="50" v-bind="props">
                    <v-img
                    class="bg-secondary"
                    v-bind="props" cover
                    :src="url">
                        <template v-slot:error>
                            <div
                            style="width: 100%; height:100%;"
                            class="d-flex align-center justify-center">
                                <v-icon>mdi-account</v-icon>
                            </div>
                        </template>
                    </v-img>
                </v-avatar>
            </template>

            <v-list>
                <v-list-item
                v-for="(item, i) in profileMenuItems"
                :key="i"
                :value="i"
                @click="profileMenuAction(i)">
                <v-list-item-title>{{item}}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>

    </v-app-bar>

    <v-navigation-drawer
    v-model="drawer"
    location="left"
    temporary>
        <v-list nav v-model="selection">
            <v-list-item 
            color="secondary-darken"
            prepend-icon="mdi-home" title="Home" value="home" @click="navigate('Home','homepage')"></v-list-item>
            
            <v-divider></v-divider>
            
            <v-list-item 
            color="secondary-darken"
            prepend-icon="mdi-book-open-page-variant" title="Catalogue" value="catalogue" @click="navigate('catalogue','catalogue')"></v-list-item>
            <v-divider></v-divider>
            
            <v-list-item 
            color="secondary-darken"
            prepend-icon="mdi-cards" title="All media" value="User entries" @click="navigate('user entries','userEntries')"></v-list-item>
            
            <v-list-item 
            color="secondary-darken"
            title="Games" value="Games" prepend-icon="mdi-nintendo-game-boy" @click="navigate('collection', 'collection',{'type':'Videogame'})"></v-list-item>
            
            <v-list-item 
            color="secondary-darken"
            title="Movies" value="Movies" prepend-icon="mdi-film" @click="navigate('collection','collection',{'type':'Film'})"></v-list-item>
            
            <v-list-item 
            color="secondary-darken"
            title="TV shows" value="TVShows" prepend-icon="mdi-television" @click="navigate('collection','collection',{'type':'TVShow'})"></v-list-item>
            
            <v-list-item 
            color="secondary-darken"
            title="Books" value="Books" prepend-icon="mdi-book-open" @click="navigate('collection','collection',{'type':'Book'})"></v-list-item>
            
            <v-list-item 
            color="secondary-darken"
            title="Comics" value="Comics" prepend-icon="mdi-arm-flex" @click="navigate('collection','collection',{'type':'Comic'})"></v-list-item>
            
            <v-list-item 
            color="secondary-darken"
            title="Anime" value="Anime" prepend-icon="mdi-syllabary-hiragana" @click="navigate('collection','collection',{'type':'Anime'})"></v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script setup>
    import {useStore} from "vuex"
    import {ref} from "vue"
    import {useRouter} from "vue-router"
    import apiConf from "../apiConf.json"
    import {useDisplay} from "vuetify";
    import { useTheme } from "vuetify";

    const theme = useTheme();
    var switchBtn = ref();
    const {mobile} = useDisplay()
    const store = useStore();
    var {id} = store.getters.getUser;
    var selection = ref();
    const router = useRouter();
    const props = defineProps(['username','user_id','email','admin','image','verified'])
    var drawer = ref();
    var profileMenuItems = ref(['Profile','stats','settings','SignOut']);
    var url = ref();
    url.value = apiConf.host + apiConf.port + apiConf.users.getPhoto + id;


    function navigate(value,route,params){
        selection.value = value;
        router.push({
            name:route,
            params:params
        });
    }

    function profileMenuAction(index){
        switch(index){
            case 0:
                router.push({
                    name:'profile',
                });
                break;

            case 1:
                router.push({
                    name:'stats'
                });
                break;

            case 3:
                store.commit("deleteUser")
                router.push("/")
        }
    }

    function toggleTheme (){
        if(switchBtn.value == false){
            theme.global.name.value = 'darkTheme'
        }else{
            theme.global.name.value = 'lightTheme2'
        }
    //theme.global.name.value = switchBtn.value ? 'darkTheme':'lightTheme2'  
  }


    switchBtn.value = theme.global.name.value == 'darkTheme' ? true:false
  

</script>