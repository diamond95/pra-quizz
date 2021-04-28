<template>
    <v-container class="mt-8">
        <v-row justify="center">
            <v-card width="30%" outlined shaped elevation="4">
                <v-row justify="center">
                    <h2 color="secondary" class="pa-3">{{ quizzInformation.title }} </h2>
                </v-row>

                <v-row justify="center">
                    <p class="ml-4">Izradio: <font color="primary" class="font-weight-black">{{ quizzInformation.username }}</font></p>
                </v-row>

                <v-row justify="center">
                    <p class="ml-4">Ukupno pitanja: <font color="primary" class="font-weight-black">{{ quizzInformation.questions_sum }}</font></p>
                </v-row>

                <v-row justify="center">
                    <p class="ml-4">Ukupno trajanje: <font color="primary" class="font-weight-black">{{ quizzInformation.total_time }}</font></p>
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