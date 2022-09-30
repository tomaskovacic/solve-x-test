<script>
    import axios from 'axios';

    export default {
        data() {
            return {
                register_form: {
                    name: '',
                    lastname: '', 
                    email: '',
                    password: '',
                },
                error: '',
            }
        },
        methods: {
            async register() {
                axios.post("/api/users", this.register_form).then(
                    (response) => {
                        console.log("User created!");
                        this.$router.push("/login");
                    },
                    (err) => {
                        this.error = err.response.data.message;
                    }
                );
            },
        }

    }
</script>

<template>
    <div class="parent clearfix">
        <div class="login">
            <div class="container">
                <h1 class="loginh1">Create account</h1>
                <div class="login-form">
                    <form @submit.prevent="register">
                        <input type="text" v-model="register_form.name" placeholder="First name" required />
                        <input type="text" v-model="register_form.lastname" placeholder="Last name" required />
                        <input type="email" v-model="register_form.email" placeholder="E-mail" required />
                        <input type="password" minlength="8" v-model="register_form.password" placeholder="Password"
                            required />
                        <p class="error"> {{ error }} </p>
                        <button type="submit">Sign up</button> <br />
                        <br /><br />
                        <p class="pThin">Have already an account?</p>
                        <RouterLink class="noBorderButton" to="/login">Login</RouterLink>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .login .container .login-form {
        text-align: center;
        margin-top: 5px;
    }

    .login .container .login-form form input {
        font-size: 16px;
        font-weight: normal;
        background: rgba(57, 57, 57, 0.07);
        margin: 12.5px 0;
        height: 45px;
        width: 85%;
        border: none;
        padding: 0 30px;
        border-radius: 10px;
    }

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
        margin-top: 9vh;
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

    .noBorderButton:hover {
        color: #d95469;
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

    .pThin {
        font-weight: lighter;
        margin-top: 60px;
    }

    button {
        cursor: pointer;
        text-transform: uppercase;
    }
</style>