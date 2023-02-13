<template>
  <div id="resultTable">
    <table id="result_table">
      <tr>
        <th>X</th>
        <th>Y</th>
        <th>R</th>
        <th>Current time</th>
        <th>Execution time</th>
        <th>Was hit?</th>
      </tr>
      <tr v-for="dot in dots" :key="dot.ctime"></tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "ResultTable",
  data() {
    return {

    }
  },
  props: {
    dots: {
      type: Array,
      required: true,
    }
  }
}
</script>

<style scoped>
  #result_table {
    padding: 1%;
    margin-left: 100px;
    border-collapse: collapse;
    background-color: #ffffffcc;
  }

  #result_table th {
    border: solid 1px black;
    width: 82px;
    height: 50px;
  }

  #result_table td {
    border: solid 1px black;
    text-align: center;
  }
</style>