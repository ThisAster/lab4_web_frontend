<template>
    <div class="table-wrapper">
        <table class="result_table">
            <tr>
                <th>X</th>
                <th>Y</th>
                <th>R</th>
                <th style="width: 173px;">Attempt time</th>
                <th>Process time</th>
                <th>Result</th>
            </tr>
            <tr v-for="row in allTableRows" :key="row">
                <td>{{ row.X }}</td>
                <td>{{ row.Y }}</td>
                <td>{{ row.R }}</td>
                <td>{{ new Date(parseInt(row.attemptTime)).toLocaleString() }}</td>
                <td>{{ (parseInt(row.processTime)/1000/1000).toFixed(2)  }} ms</td>
                <td>{{ row.result }}</td>
            </tr>
        </table>
        <div>
            <button @click="reset">Reset</button>
            <button @click="loadMore" :disabled="allAttemptsLoaded">Load More</button>
        </div>
    </div>
</template>

<script>
export default {
  props: ["allTableRows", "allAttemptsLoaded"],
  methods: {
    loadMore(){
        this.$parent.getResultsFromServer()
    },
    reset(){
        this.$parent.reset()
    }
  }
}
</script>

<style scoped >
.result_table {
    text-align: center;
    justify-content: center;
    border-radius: 20px 20px 20px 20px;
    background-color: #ffffff;
    border: 3px solid #ffd4d5;
    width: 92%;
    min-width: 240px;
    flex-direction: column;
    margin-left: 70px;
}

.table-wrapper {
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    margin-top: 0;
}

.table-wrapper button{
    margin: 10px;
}

tr th {
    min-width: 39px;
}

td, th{
    padding: 17px;
}

@media screen and (max-width: 980px) {
    td, th {
        min-width: 10px;
        min-height: 100px;
        padding: 1px;
    }
    .result_table {
        text-align: center;
        justify-content: center;
        border-radius: 20px 20px 20px 20px;
        background-color: #ffffff;
        border: 3px solid #ffd4d5;
        min-width: 340px;
        margin: auto;
    }
}
</style>

<!-- <style lang="scss">
    
</style> -->