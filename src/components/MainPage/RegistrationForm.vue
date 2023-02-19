<template>
  <div class="container">
    <form id="form" @submit.prevent>
        <div class="control">
          <label>Логин </label> 
          <InputText v-model="username" placeholder="Введите логин"></InputText>
        </div>

        <div class="control">
          <label>Пароль </label> 
          <InputText v-model="password" type="password" placeholder="Введите пароль"></InputText>
        </div>

        <div class="control">
          <label>Подтвердите пароль </label> 
          <InputText v-model="passwordAgain" type="password" placeholder="Введите пароль"></InputText>
        </div>

        <div class="buttons">
          <button @click="userFormSubmit" class="submit">Создать аккаунт</button>
        </div>
        <div class="login_link_holder">
          <a href="#" @click="goToLoginPage">Уже есть аккаунт?</a>
        </div>
    </form>
  </div>
</template>

<script>
import InputText from "@/components/UI/InputText.vue";
import * as request from "superagent";
import {api} from "@/api";

export default {
  name: "RegistrationForm",
  components: {InputText},
  data() {
    return {
      username: '',
      password: '',
      passwordAgain: ''
    }
  },
  methods: {
    async userFormSubmit() {
      if(!this.username){
        alert('Введите логин!')
        return;
      }
      if(!this.password){
        alert('Введите пароль!')
        return
      }
      if(this.password != this.passwordAgain){
        alert('Введен неверный пароль!')
        return
      }

      const formData = new FormData();
      formData.set('username', this.username)
      formData.set('password', this.password)

      const onRegistrationFailed = () => {
        alert('Пользователь существует')
      }

      try{
        const authorizeResponse = await request.post(`${api}/registration`)
            .send(formData);

        if(authorizeResponse.statusCode == "200"){
          this.$router.push('/')
        }else{
          onRegistrationFailed();
        }
      }
      catch(e){
        onRegistrationFailed();
      }


     
    },
    goToLoginPage(){
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #form {
    display: flex;
    flex-direction: column;
    gap: 50px;
    border: 1px solid gray;
    border-radius: 12px;
    padding: 50px;
    background-color: #f5f5f599;
    align-items: center;
    max-width: 580px;
  }


  .control {
    min-width: 380px;
    display: flex;
    gap: 10px;
    justify-content: space-between;
    align-items: center;
  }

  .submit {
    min-width: 100px;
  }
</style>