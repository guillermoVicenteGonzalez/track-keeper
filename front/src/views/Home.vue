<template>
    <v-container>
        <h1>Home</h1>
        <p v-for="item in user">{{ item }}</p>
        <RouterView></RouterView>
    </v-container>
</template>

<script setup>
    import {ref} from "vue"
    import {useStore} from "vuex"

    const store = useStore();
    var user = ref();

    user.value = store.getters.getUser;
</script>