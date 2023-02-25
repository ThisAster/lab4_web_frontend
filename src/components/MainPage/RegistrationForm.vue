<template>
  <div class="container">
    <form id="form" @submit.prevent>
        <div class="control">
          <label class="regLogin">Логин: </label> 
          <InputText v-model="username" placeholder="Введите логин" style="margin-right: 9px;"></InputText>
        </div>

        <div class="control">
          <label class="regPassword">Пароль: </label> 
          <InputText v-model="password" type="password" placeholder="Введите пароль" style="margin-right: 9px;"></InputText>
        </div>

        <div class="control">
          <label сlass="regConfirmPassword" style="margin-right: 69px;">Повторите пароль: </label>
          <InputText class="regInputPassword" v-model="passwordAgain" type="password" placeholder="Введите пароль" style="margin-right: 9px;"></InputText>
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
      const validOnSpaces = /\s/;
      if(this.username == '' || this.username.trim() == '' || this.username === null || validOnSpaces.test(this.username)){
        alert('Введите логин!')
        return;
      }
      if(this.password == '' || this.password.trim() == '' || validOnSpaces.test(this.password) || this.password === null){
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
    max-width: 250px;
  }
  .submit {
    min-width: 100px;
  }

  .regPassword {
    margin-right: 149px;
    margin-bottom: 46px;
  }

  input[data-v-ce029768] {
    margin-right: 40px;
  }

  .regLogin {
    margin-right: 160px;
  }

</style>