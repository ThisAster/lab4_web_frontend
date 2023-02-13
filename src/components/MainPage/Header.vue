<template>
  <div id="header">
    <div id="author">
      <h1>
        <span>Abulfatov</span>
        Ruslan
      </h1>
    </div>
    <div id="info">
      <h2>P32312, var: 66647</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header"
}
</script>

<style scoped>
  #header {
    font-family:sans-serif;
    color:#393949;
    overflow:hidden
  }

  #header h2::after {
    color: transparent;
    transition-property:color;
    transition-duration:.5s;
  }

  #header:hover h1, #header:hover h2 {
    transform:translateX(50px);
  }

  #header h1 {
    font-size:40px;
    transition-property:transform;
    transition-duration:.5s;
  }

  #header h2 {
    font-size: 35px;
    transition-duration:.3s;
  }
</style>