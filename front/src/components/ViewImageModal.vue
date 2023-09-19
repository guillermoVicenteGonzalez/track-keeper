<template v-if="props.url">
    <v-dialog>
        <div class="justify-end d-flex">
            <v-btn
            @click="emit('hide')"
            color="error"
            size="large"
            variant="icon"
            icon="mdi-close"></v-btn>
        </div>
        <v-container 
        class="fill-height justify-center overflow-auto">
            <v-row>
                <v-col 
                style="max-height: 800px;">
                    <v-img
                    :src="url"></v-img>
                </v-col>
            </v-row>
        </v-container>
    </v-dialog>
</template>

<script setup>

    const props = defineProps(['url'])
    const emit = defineEmits(['hide'])

    console.log(props.url)
</script>