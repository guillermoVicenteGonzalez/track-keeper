<template v-if="props.url">
    <v-dialog>
        <div class="justify-end d-flex">
            <v-btn
            variant="text"
            @click="emit('hide')"
            color="error"
            size="large"
            icon="mdi-close"></v-btn>
        </div>
        <v-container 
        class="fill-height justify-center overflow-auto">
            <v-row>
                <v-col 
                style="max-height: 800px; min-height: 50px;">
                    <v-img
                    style="height: 100%; width:100%;"
                    :src="url">
                        <template v-slot:error>
                            <v-icon
                            style="
                            width:100%;
                            height:100%
                            "
                            >mdi-image</v-icon>
                        </template>
                    </v-img>
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