<template>
  <div class="graph">
    <canvas id="canvas" style="margin-left: 4.4%;" id="graph" width="350" height="350">
            <span>
              <img ref="curImg" :src="selectedUrl" alt="Task grpah" width="400" height="400"/>
            </span>
    </canvas>
  </div>
</template>

<script>
export default {
  name: "Graph",
  props: {
    radius: {
      type: Number,
    },
    dots: {
      type: Array,
      required: true,
    }
  },
  mounted() {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height= canvas.height;
    const img = this.$refs.curImg;
    const self = this;

    img.onload = function () {
      ctx.clearRect(0, 0, 400, 400);
      ctx.drawImage(img, 0, 0);
      Array.from(self.dots).forEach( dot => {
        if (parseFloat(dot.r + "") === parseFloat(self.radius + "")) {
          if (maxR > -1) {
            self.dots.forEach((dot) => {
              const k = dot.r / maxR;
              const x = dot.x / maxR * k * width / 3 + width / 2;
              const y = -dot.y / maxR * k * height / 3 + height / 2;

              ctx.fillStyle = (dot.result ? '#11ff11' : '#ff3333');
              if (dot.r != maxR) {
                ctx.fillStyle = '#777';
              }
              ctx.beginPath();
              ctx.arc(x, y, 5, 0, Math.PI * 2);
              ctx.closePath();
              ctx.fill();
            })
          }
        }
      })
    }
  },
  methods: {
    submitGraph(event) {
      if (this.radius ===)
    }
  }
}
</script>

<style scoped>

</style>