<template>
  <div class="container">
    <form id="form" @submit.prevent>
        <div class="control">
          <label>Логин: </label> 
          <InputText v-model="username" placeholder="Введите логин"></InputText>
        </div>

        <div class="control">
          <label>Пароль: </label> 
          <InputText v-model="password" type="password" placeholder="Введите пароль"></InputText>
        </div>

        <div class="buttons">
          <button @click="userFormSubmit" class="submit">Войти</button>
        </div>
        <div class="reg_link_holder">
          <a href="#" @click="goToRegisterPage">Нет аккаунта?</a>
        </div>
    </form>
  </div>
</template>

<script>
import InputText from "@/components/UI/InputText.vue";
import * as request from 'superagent';
import {api} from "@/api";

export default {
  name: "UserForm",
  components: {InputText},
  data() {
    return {
      username: '',
      password: '',
    }
  },
  methods: {
    async userFormSubmit() {

      const formData = new FormData();
      formData.set('username', this.username)
      formData.set('password', this.password)

      const onLoginFailed = () => {
        alert('Неверный логин/пароль!')
      }

      try{
        const authorizeResponse = await request.post(`${api}/authorize`)
            .send(formData);

        if(authorizeResponse.statusCode == "200"){

          localStorage.setItem('username', this.username);
          localStorage.setItem('password', this.password);

          this.$router.push('/check-point')
        }else{
          onLoginFailed();
        }
      }
      catch(e){
        onLoginFailed();
      }

    },
    goToRegisterPage(){
      this.$router.push('/create-account')
    }
  }
}
</script>

<style scoped>
  .container{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  #form{
    display: flex;
    flex-direction: column;
    gap: 50px;
    border: 1px solid gray;
    border-radius: 12px;
    padding: 50px;
    background-color: #f5f5f599;
    align-items: center;
    max-width: 480px;
  }
  .control{
    width: 300px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .submit{
    min-width: 100px;
  }
</style>