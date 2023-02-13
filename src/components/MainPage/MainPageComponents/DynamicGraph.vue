<template>
    <div class="svg-wrapper">
        <canvas id="graph" width="415" height="415">
            <img ref="curImg" :src="selectedUrl" alt="Task grpah" width="400" height="400"/>
        </canvas>
    </div>
</template>

<script>
import $ from "jquery";


const width = 415;
const height = 415;

function drawGraph(attempts, ctx, maxR) {
    console.log(attempts)

   
    const FIGURE_COLOR = "#567efb99";

    ctx.clearRect(0,0,width,height);
    ctx.font = "13px sans-serif";
    ctx.fillStyle = "#FFF";
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = FIGURE_COLOR;
    // 1st quadrant rectangle
    ctx.fillRect(width / 2, height / 3, width / 3, height / 6);

    // 2nd quadrant sector
    ctx.beginPath();
    ctx.arc(width / 2, height / 2, width / 6, Math.PI, Math.PI*3/2, false);
    ctx.lineTo(width / 2, height / 2);
    ctx.fill();

    // 4th quadrant rectangle
    ctx.beginPath();
    ctx.moveTo(width/2, 5*height/7.5);
    ctx.lineTo(2*4*width/9.6, height/2);
    ctx.lineTo(width/2, height/2);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(0, height/2);
    ctx.lineTo(width, height/2);
    ctx.lineTo(width-10, height/2-10);
    ctx.moveTo(width, height/2);
    ctx.lineTo(width-10,height/2+10);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(width/2, height);
    ctx.lineTo(width/2, 0);
    ctx.lineTo(width/2-10, 10);
    ctx.moveTo(width/2, 0);
    ctx.lineTo(width/2+10, 10);
    ctx.stroke();


    ctx.fillStyle = "#000";
    const labels = ["-R", "-R/2", "0", "R/2", "R"];

    for (let i = 1; i < 6; i++) {
        ctx.beginPath();
        ctx.moveTo((i * width) / 6, height / 2 - 5);
        ctx.lineTo((i * width) / 6, height / 2 + 5);
        ctx.moveTo(width / 2 - 5, (i * height) / 6);
        ctx.lineTo(width / 2 + 5, (i * height) / 6);
        ctx.stroke();

        ctx.textAlign = "center";
        ctx.textBaseline = "bottom";
        ctx.fillText(labels[i - 1], (i * width) / 6, height / 2 - 7);

        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.fillText(labels[i - 1], width / 2 + 7, height - (i * height) / 6);
    }

    const chartLabel = document.getElementsByClassName('chart-label')[0];
    if(chartLabel){
        const rText = maxR == -1 ? 'not set' : maxR;
        chartLabel.innerText = 'R = ' + rText;
    }
    

    if(maxR > -1){

        attempts.forEach((attempt) => {

            const k = attempt.R / maxR;
            const x = attempt.X / maxR * k * width / 3 + width / 2;
            const y = -attempt.Y / maxR * k * height / 3 + height / 2;


            ctx.fillStyle = (attempt.result ? '#11ff11' : '#ff3333');
            if(attempt.R != maxR){
                ctx.fillStyle = '#777';
            }
            ctx.beginPath();
            ctx.arc(x, y, 5, 0, Math.PI * 2);
            ctx.fill();
        });
    }
}



export default {
    props: ["allTableRows", "curR"],
    methods: {
        hitCheckByClick: function (event) {
            let target = $("#svg-graph");
            let x = Math.round(event.clientX - target.position().left);
            let y = event.clientY - target.position().top - 60;
            let xForServer = ((x - 150) / (100 / this.curR)).toFixed(3);
            let yForServer = ((y - 150 + $(window).scrollTop()) / (-100 / this.curR)).toFixed(3);
            this.$parent.sendCheckRequest(xForServer, yForServer);
        },
        draw(){
            drawGraph(this.$props.allTableRows, this.vueCanvas, this.$parent.$refs.CheckForm.maxR)
        }
    },
    mounted() {
        var c = document.getElementById("graph");
        var ctx = c.getContext("2d");    
        this.vueCanvas = ctx;
        drawGraph(this.$props.allTableRows, this.vueCanvas)

    },
}
</script>

<style scoped>
.svg-wrapper {
    text-align: center;
}

#graph{
    border-radius: 12px;
}

</style>