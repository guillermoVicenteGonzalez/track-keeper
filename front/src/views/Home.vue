<template>
    <NavBar
    v-bind="user"></NavBar>
    <v-container>
        <h1>Home</h1>
        <RouterView></RouterView>
        <MediaCard></MediaCard>
    </v-container>
</template>

<script setup>
    import MediaCard from "@/components/MediaCard.vue";
import NavBar from "@/components/NavBar.vue";
    import {onMounted, ref} from "vue"
    import {useStore} from "vuex"

    const store = useStore();
    var user = ref();
    user.value = store.getters.getUser

    
    onMounted(()=>{

    })

</script>