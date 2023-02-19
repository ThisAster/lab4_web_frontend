<template>
    <div class="table-wrapper">
        <table class="result_table">
            <tr>
                <th>X</th>
                <th>Y</th>
                <th>R</th>
                <th>Attempt time</th>
                <th>Process time</th>
                <th>Result</th>
            </tr>
            <tr v-for="row in allTableRows" :key="row.X">
                <td>{{ row.X }}</td>
                <td>{{ row.Y }}</td>
                <td>{{ row.R }}</td>
                <td>{{ new Date(parseInt(row.attemptTime)).toLocaleString() }}</td>
                <td>{{ (parseInt(row.processTime)/1000/1000).toFixed(2)  }} ms</td>
                <td>{{ row.result }}</td>
            </tr>
        </table>
    </div>
</template>

<script>
export default {
    props: ["allTableRows"],
    methods: {
        cleanTable: function () {
            this.$parent.cleanTable();
        },
    }
}
</script>

<style scoped>

.result_table {
    text-align: center;
    justify-content: center;
    border-radius: 20px 20px 20px 20px;
    background-color: #ffffff;
    border: 3px solid #ffd4d5;
    width: 100%;
}

.result_table .success{
    color: green
}

.result_table .failed{
    color: red
}

.table-wrapper {
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    margin-top: 0;
}

td, th{
    padding: 10px;
}
</style>