<template>
    <v-container class="mt-3" fill-height>
        <v-row justify="center" align="center">
            <v-card width="100%">
                <v-row>
                    <v-col cols="12" md="4" lg="4" sm="4"></v-col>
                    <v-col cols="12" md="4" lg="4" sm="4">
                        <h2>{{ quizzInformation.title }} - {{ quizzInformation.total_time}}</h2>
                        <br />
                        <p>{{ quizzInformation}}</p>
                    </v-col>
                    <v-col cols="12" md="4" lg="4" sm="4"></v-col>
                </v-row>
                
            </v-card>
        </v-row>
    </v-container>
</template>


<style>
</style>

<script>
import store from '@/store/store'
import QuizService from '@/services/QuizzService'
export default {
    name: 'QuestionsCard',

    data: () => ({
        quizzCode: store.state.gameCode,
        quizzInformation: {}
    }),

    methods: {
        getQuizzInformation: async function() {
            this.quizzInformation = (await QuizService.getQuizzInformation({
                game_pin: this.quizzCode
            })).data.res

            console.log(this.quizzInformation)
        }
    },

    created() {
        this.getQuizzInformation()
    }
    
}
</script>