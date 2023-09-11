<template>
    <v-app-bar color="primary">
        <v-app-bar-nav-icon
        color="white"
        @click="drawer = !drawer"></v-app-bar-nav-icon>
        <v-app-bar-title>{{ name}}</v-app-bar-title>

        <v-menu>
            <template v-slot:activator="{props}">
                <v-avatar
                style="cursor: pointer;"
                class="mr-5" size="50" v-bind="props">
                    <v-img
                    v-bind="props" cover
                    src="https://lindamood.net/wp-content/uploads/2019/10/Blank-profile-image-731x1024.jpg">
                        <template v-slot:error>
                            <div
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
        <v-list nav>
            <v-list-item prepend-icon="mdi-home" title="Home" value="inbox" @click="router.push('/home/') + props.id"></v-list-item>
            <v-divider></v-divider>
            <v-list-item title="All media" value="inbox"></v-list-item>
            <v-list-item title="Games"></v-list-item>
            <v-list-item title="Movies"></v-list-item>
            <v-list-item title="TV shows"></v-list-item>
            <v-list-item title="Books"></v-list-item>
            <v-list-item title="Comics"></v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script setup>
    import {useStore} from "vuex"
    import {ref} from "vue"

    const props = defineProps(['name','id','token'])
    const store = useStore();
    var drawer = ref();
    var profileMenuItems = ref(['Profile','stats','settings','SignOut']);


</script>