<template>
    <div class="form_holder">
        <form class="check_form" @submit.prevent="submit">
            <div>
                <label>
                X values:
                </label>
                <div class="multi-checkbox">
                    <label v-bind:key="x.id" v-for="x in x_values">
                        <input type="checkbox" v-model="x.selected"> {{x.name}}
                    </label>
                </div>
            </div>
           <div>
                <label>
                    Y value:
                </label>
                <input v-model="y_value" placeholder="Input y value" @input="inputYChanged">
           </div>
           <div>
                <label>
                    R values:
                </label>
                <div class="multi-checkbox">
                    <label v-bind:key="r.id" v-for="r in r_values">
                        <input type="checkbox" v-model="r.selected" @change="inputRChanged" on> {{r.name}}
                    </label>
                </div>
           </div>
            <button class="submit_button" type="submit">Submit</button>
        </form>
        <div class="error_message" :class="is_error_visible ? 'error_visible' : 'error_invisible'">
            <p/>
            {{ error_message }}
            <p/>
        </div>
    </div>

   
  
</template>

<script>



export default {
    components: {
        
    },
    data() {
        return {
            x_values: [ // -2','-1.5','-1','-0.5','0','0.5','1','1.5','2'
                { id: -2, name: "-2", selected: false },
                { id: -1.5, name: "-1.5", selected: false },
                { id: -1, name: "-1", selected: false },
                { id: -0.5, name: "-0.5", selected: false },
                { id: 0, name: "0", selected: false },
                { id: 0.5, name: "0.5", selected: false },
                { id: 1, name: "1", selected: false },
                { id: 1.5, name: "1.5", selected: false },
                { id: 2, name: "2", selected: false }
            ],
            r_values: [ // -2','-1.5','-1','-0.5','0','0.5','1','1.5','2'
                { id: -2, name: "-2", selected: false },
                { id: -1.5, name: "-1.5", selected: false },
                { id: -1, name: "-1", selected: false },
                { id: -0.5, name: "-0.5", selected: false },
                { id: 0, name: "0", selected: false },
                { id: 0.5, name: "0.5", selected: false },
                { id: 1, name: "1", selected: false },
                { id: 1.5, name: "1.5", selected: false },
                { id: 2, name: "2", selected: false }
            ],
            y_value: '',
            error_message: '',
            is_error_visible: false,
        }
    },
    computed: {
        selectedXs() {
            return this.x_values
                .filter(x => x.selected)
                .map(x => x.name);
        },
        selectedRs() {
            return this.r_values
                .filter(x => x.selected)
                .map(x => x.name);
        },
        maxR() {
            return Math.max(...this.r_values
                .filter(r => r.selected)
                .map(r => r.id));
        }
    },
    methods: {
        submit: function () {
            console.log(`submit x=${this.selectedXs} y=${this.y_value}` )
            this.$parent.sendCheckRequest(this.selectedXs, this.y_value, this.selectedRs);
        },
        validateY: function () {
            if (this.y_value < -5 || this.y_value > 3) {
                this.is_error_visible = true;
                this.error_message = "Y ∈ (-5, 3)";
            } else {
                this.error_message = "";
                this.is_error_visible = false;
            }
        },
        inputYChanged: function (event) {
            this.validateY();
            if (event.target.value.indexOf('.') === -1) {
                return;
            }
            if ((event.target.value.length - event.target.value.indexOf('.')) > 10) {
                event.target.value = event.target.value.slice(0, event.target.value.indexOf('.') + 10 + 1);
            }
            this.y_value = event.target.value;
        },
        inputRChanged: function () {
            this.$parent.changeCurR(this.maxR)
            this.$parent.$refs.DynamicGraph.draw()
            this.hideErrorMessage();
        },
        showErrorMessage: function (errorMessage) {
            this.error_message = errorMessage;
            this.is_error_visible = true;

        },
        hideErrorMessage: function () {
            this.error_message = "";
            this.is_error_visible = false;
        },
    }
}
</script>

<style scoped>
@media only screen and (max-width: 845px) {
  .form_holder {
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    border-radius: 20px 20px 20px 20px;
    border: 2px solid #ffb6b9;
    background: #ffffff;
    width: 310px;
  }
  .check_form {
    text-align: center;
    display: flex;
    flex-direction: column;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 10%;
  }
}
@media only screen and (min-width: 845px) and (max-width: 1055px) {
  .form_holder {
    width: 500px;
  }
}
@media only screen and (min-width: 1055px) {
  .form_holder {
    width: 700px;
  }
  .check_form {
    display: flex;
  }
}
.form_holder {
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    border-radius: 20px 20px 20px 20px;
    border: 2px solid #ffb6b9;
    background: #ffffff;
    position: relative;
    height: fit-content;
}

.check_form {
    text-align: center;
    display: flex;
    flex-direction: column;
    width: 60%;
    margin-left: auto;
    margin-right: auto;
    gap: 20px;
    padding: 20px;
}

.check_form > div{
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.submit_button {
    margin-left: auto;
    margin-right: auto;
    margin-top: 100px;
    width: 60%;
}

.reset_button {
    margin-left: auto;
    margin-right: auto;
    margin-top: 5%;
    width: 60%;
}

.error_message {
    text-align: center;
    border-radius: 20px 20px 20px 20px;
    border: 2px solid #ffb6b9;
    background: #ffffff;

    position: absolute;
    bottom: 75px;
    left: 50%;
    transform: scale(0.9) translate(-50%);
    padding: 0 6px;
}

.error_visible {
    visibility: visible;
}

.error_invisible {
    visibility: hidden;
}

.multi-checkbox{
    display: flex;
}

</style>