<template>
    <header>
        <p>Абульфатов Руслан P32312, Вариант: 336783</p>
        <div class="logout_button_container">
            <button class="logout_button" @click="goToLogin">Log out</button>
        </div>
    </header>
    <div class="main">
        <CheckForm class="form" ref="CheckForm"/>
        <DynamicGraph class="graph" :allTableRows="allTableRows" :curR="curR" ref="DynamicGraph"/>
        <ResultTable class="table" :allTableRows="allTableRows" :allAttemptsLoaded="allAttemptsLoaded"/>
    </div>
</template>

<script>

import CheckForm from "@/components/MainPage/MainPageComponents/CheckForm.vue"
import ResultTable from "@/components/MainPage/MainPageComponents/ResultTable.vue";
import DynamicGraph from "@/components/MainPage/MainPageComponents/DynamicGraph.vue";
import * as request from "superagent";
import {api} from "@/api";

export default {
    mounted() {
        this.validateAuth();
        this.getResultsFromServer();
    },
    components: {
        CheckForm, ResultTable, DynamicGraph
    },
    data() {
        return {
            curR: null,
            allTableRows: [],
            allAttemptsLoaded: false
        }
    },
    methods: {
        goToLogin: function () {
            this.$router.push({name: 'login'});
            localStorage.removeItem("token");
            localStorage.clear();
        },
        validateAuth: function () {
            if (!localStorage.getItem('username') || !localStorage.getItem('password')) {
                this.$router.push({name: 'login'});
            }
        },
        changeCurR: function (r) {
            this.curR = Number(r);
            this.$refs.DynamicGraph.draw();
        },
        sendCheckRequest: async function (xs, y, rs) {
            let error_message = '';
            let isValid = true;

            const someRIsNotValid = rs.some(r => {
                return r <= 0;
            });
           
            if (someRIsNotValid) {
                    if (error_message !== "") error_message += ", ";
                    error_message += "R ∈ [0.5, 5]";
                    isValid = false;
            }

            if (!xs.length) {
                if (error_message !== "") error_message += ", "
                error_message += "Choose X";
                isValid = false;
            }
            if (y === '') {
                if (error_message !== "") error_message += ", ";
                error_message += "Input Y";
                isValid = false;
            }

            if (!rs.length) {
                if (error_message != "") error_message += ", "
                error_message += "Choose R"
                isValid = false;
            }

            xs.forEach(x => {
                if (Number(x) < -3 || Number(x) > 5) {
                    if (error_message !== "") error_message += ", ";
                    error_message += "X ∈ [-3; 5]";
                    isValid = false;
                }
            })
           
            if (Number(y) <= -3 || Number(y) >= 5) {
                if (error_message !== "") error_message += ", ";
                error_message += "Y ∈ (-3, 5)";
                isValid = false;
            }
            if (!isValid) {
                this.$refs.CheckForm.showErrorMessage(error_message);
                return;
            }
            this.$refs.CheckForm.hideErrorMessage();

            try{

                this.is_error_visible = false;

                let lastAddPointPromise = null;

                xs.forEach(x =>{
                    rs.forEach(async (r) => {

                      const formData = new FormData();
                      formData.set('X', x)
                      formData.set('Y', y)
                      formData.set('R', r)
                      formData.set('username', localStorage.getItem('username'))
                      formData.set('password', localStorage.getItem('password'))

                      try {
                        lastAddPointPromise = request.post(`${api}/points/add`)
                            .send(formData);
                        const addPointResponse = await lastAddPointPromise;

                        if (addPointResponse.statusCode == "200") {
                          const [hitCheckEntry] = addPointResponse.body;
                          hitCheckEntry.result = hitCheckEntry.result == "true";
                          this.allTableRows.push(hitCheckEntry);
                        } else {
                            alert('error')
                        }
                      }
                      catch(e){
                        alert('error')
                      }
                    });
                });

                await lastAddPointPromise;
                this.$refs.DynamicGraph.draw();
            }
            catch(e) {
                console.log(e)
            }
        },
        getResultsFromServer: async function () {

            const formData = new FormData();
            formData.set('username', localStorage.getItem('username'))
            formData.set('password', localStorage.getItem('password'))
            formData.set('skip', this.allTableRows.length)

            try{
                const getPointsResponse = await request.post(`${api}/points/get`)
                .send(formData);

                const points = getPointsResponse.body;

                if(points.length < 1){
                    this.allAttemptsLoaded = true;
                }

                points.forEach(attempt => {
                    attempt.result = attempt.result == "true";
                    this.allTableRows.push(attempt);
                })
                this.changeCurR(this.curR);
                this.$refs.DynamicGraph.draw();
            }
            catch(e){
                console.log(e)
            }
         
        },
        reset: async function () {
            if(confirm("Delete all attempts?")){
                const formData = new FormData();
                formData.set('username', localStorage.getItem('username'))
                formData.set('password', localStorage.getItem('password'))
                try{
                    await request.post(`${api}/points/clear`)
                    .send(formData);

                    this.allTableRows.length = 0;
                                
                    this.$refs.DynamicGraph.draw();
                }
                catch(e){
                    console.log(e)
                }
            }
            
        }
    }
}
</script>

<style>
    .main{
        display: flex;
        gap: 50px;
        flex-wrap: wrap;
        padding: 50px;
    }


    @media screen and (max-width: 980px) {
        .main{
            flex-direction: column;
        }
    }
</style>