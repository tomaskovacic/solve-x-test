<script>
import { mapActions } from 'vuex'

  export default {
    data() {
      return {
        login_form: {
          email: '',
          password: '',
        },
        error: '',
      }
    },
    methods: {
      ...mapActions({
        signIn: 'auth/signIn'
      }),

      login () {
        this.signIn(this.login_form).then(() => {
          this.$router.replace({
            name: 'home'
          })
        }).catch((err) => {
          this.error = err.response.data.message
        })
      },
    }

  }
</script>

<template>
  <main>
    <div class="wrapper">
      <div class="triangle"></div>
      <div class="triangle2"></div>
      <div class="triangle3"></div>
      <div class="parent clearfix">
        <div class="login">
          <div class="container">
            <h1 class="loginh1">Login</h1>
            <div class="login-form">
              <form @submit.prevent="login">
                <input type="email" v-model="login_form.email" placeholder="E-mail" required />
                <input type="password" v-model="login_form.password" placeholder="Password" required />
                <p class="error">{{error}}</p>
                <button value="Register" type="submit">Login</button> <br />
                <p class="pThin">Or sign up using</p>
                <RouterLink class="noBorderButton" to="/register">Sign up</RouterLink>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
  .wrapper {
    height: 100%;
    overflow: hidden;
  }

  .loginh1 {
    text-align: center;
    font-weight: 900;
  }

  *:focus {
    outline: none;
  }

  .login {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 15vh;
  }

  .login .container {
    width: 400px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    background-color: white;
  }

  .login .container h1 {
    margin-top: 50px;
    font-size: 38px;
  }

  .login .container .login-form {
    text-align: center;
    margin-top: 60px;
  }

  .login .container .login-form form input {
    font-size: 16px;
    font-weight: normal;
    background: rgba(57, 57, 57, 0.07);
    margin: 12.5px 0;
    height: 60px;
    width: 85%;
    border: none;
    padding: 0 30px;
    border-radius: 10px;
  }

  .login .container .login-form form button[type="submit"] {
    background-color: #EA738DFF;
    border: none;
    margin-top: 10px;
    margin-bottom: 5px;
    width: 85%;
    height: 50px;
    text-transform: uppercase;
    color: white;
    border-radius: 50px;
    font-weight: bold;
    font-size: 20px;
  }

  .login .container .login-form form button:hover[type="submit"] {
    background-color: #89ABE3FF;
    cursor: pointer;
  }

  .error {
    color: #f794a4;
    font-weight: 550;
  }

  .noBorderButton {
    padding: 0;
    border: none;
    background: none;
    margin-top: 15px;
    text-decoration: none;
    font-weight: 700;
    color: #f794a4;
  }

  .noBorderButton:hover {
    color: #d95469;
  }

  .pThin {
    font-weight: lighter;
    margin-top: 60px;
  }

  button {
    cursor: pointer;
    text-transform: uppercase;
  }
</style>