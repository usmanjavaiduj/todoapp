<template>
    <q-form @submit="submit_form">
        <div class="row q-mb-md">
            <q-banner class="bg-grey-3 col">
                <template v-slot:avatar>
                    <q-icon name="account_circle" color="primary" />
                </template>
                {{tab | title_case }} to access your Todos anywhere!
            </q-banner>
        </div>

        <div class="row q-mb-md">
            <q-input class="col" outlined v-model="form_data.email" label="Email" 
            :rules="[ val => is_valid_email(val) || 'Please enter a valid email address']"/>
        </div>

        <div class="row q-mb-md">
            <q-input class="col" outlined v-model="form_data.password" label="Password" type="password" 
            :rules="[ val => val.length >= 6 || 'Please enter atleast 6 characters']"/>
        </div>

        <div class="row">
            <q-space/>
            <q-btn color="primary" type="submit" :label="tab" />
        </div>
    </q-form>
</template>

<script>
import { mapActions } from "vuex"
export default {
    props: ["tab"],
    data(){
        return{
            form_data: {
                email: "",
                password: ""
            }
        }
    },
    methods: {
        ...mapActions("auth", ["register_user", "login_user"]),
        submit_form(){
            if(this.tab == "login"){
                this.login_user(this.form_data)
            }
            else if(this.tab == "register"){
                this.register_user(this.form_data)
            }
        },
        is_valid_email(email){
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        }
    },
    filters: {
        title_case(value){
            return value.charAt(0).toUpperCase() + value.slice(1)
        }
    }
}
</script>

<style>

</style>