<template>
  <div id="interactive">
    <form @submit.prevent>
      <div id="form">
        <div id="parameters">
          <div class="x-coordinate">
            <br>
              <label>X</label>
            <br/>
            <check-box label="-2" value="-2" v-model="checkBoxCheckedX"></check-box>
            <check-box value="-1.5" v-model="checkBoxCheckedX"></check-box>
            <check-box value="-1" v-model="checkBoxCheckedX"></check-box>
            <check-box value="-0.5" v-model="checkBoxCheckedX"></check-box>
            <check-box value="0" v-model="checkBoxCheckedX"></check-box>
            <check-box value="0.5" v-model="checkBoxCheckedX"></check-box>
            <check-box value="1" v-model="checkBoxCheckedX"></check-box>
            <check-box value="1.5" v-model="checkBoxCheckedX"></check-box>
            <check-box value="2" v-model="checkBoxCheckedX"></check-box>
          </div>
          <div class="y-coordinate">
            <br>
            <label>Y</label>
            <br/>
            <input-text v-model="inputY" placeholder="Enter value y"></input-text>
          </div>
          <div class="r-coordinate">
            <br>
            <label>R</label>
            <br/>
            <check-box label="-2" value="-2" v-model="checkBoxCheckedR">-2</check-box>
            <check-box value="-1.5" v-model="checkBoxCheckedR">-1.5</check-box>
            <check-box value="-1" v-model="checkBoxCheckedR">-1</check-box>
            <check-box value="-0.5" v-model="checkBoxCheckedR">-0.5</check-box>
            <check-box value="0" v-model="checkBoxCheckedR">0</check-box>
            <check-box value="0.5" v-model="checkBoxCheckedR">0.5</check-box>
            <check-box value="1" v-model="checkBoxCheckedR">1</check-box>
            <check-box value="1.5" v-model="checkBoxCheckedR">1.5</check-box>
            <check-box value="2" v-model="checkBoxCheckedR">2</check-box>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import CheckBox from "@/components/UI/CheckBox.vue";
import InputText from "@/components/UI/InputText.vue";

export default {
  name: "DotForm",
  components: {InputText, CheckBox},
  data() {
    return {

    }
  }
}
</script>

<style scoped>

</style>