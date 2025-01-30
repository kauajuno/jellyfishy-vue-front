<script setup>
import GuestLayout from '../components/GuestLayout.vue';
import axiosClient from '../axios';
import { ref } from 'vue';
import router from '../router';

const errors = ref({
    name: [],
    email: [],
    password: [],
});

const data = ref({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
});

function submit(){
    console.log("entered submit");
    axiosClient.get('/sanctum/csrf-cookie').then(response => {
        console.log("csrf cookie set");
        axiosClient.post('/register', data.value).then(response => {
            console.log("SUCCESS");
            router.push({name: 'Home'});
        }).catch(error => {
            console.error("ERROR");
            errors.value = error.response.data.errors;
        });
    });
}

</script>

<template>
    <GuestLayout>
        <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Create a new account</h2>
        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form @submit.prevent="submit" novalidate class="space-y-6" action="#" method="POST">
                <div>
                    <label for="name" class="block text-sm/4 font-medium text-gray-900">Full name</label>
                    <div class="mt-2">
                        <input name="name" id="name" required="" v-model="data.name"
                            class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/4" />
                        <div class="text-red-500">{{ errors.name ? errors.name[0]  : '' }}</div>
                        </div>
                </div>

                <div>
                    <label for="email" class="block text-sm/4 font-medium text-gray-900">Email address</label>
                    <div class="mt-2">
                        <input type="email" name="email" id="email" v-model="data.email" autocomplete="email" required=""
                            class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/4" />
                            <div class="text-red-500">{{ errors.email ? errors.email[0] : '' }}</div>
                        </div>
                </div>

                <div>
                    <div class="flex items-center justify-between">
                        <label for="password" class="block text-sm/4 font-medium text-gray-900">Password</label>
                        
                    </div>
                    <div class="mt-2">
                        <input type="password" name="password" id="password" v-model="data.password" autocomplete="current-password" required=""
                            class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/4" />
                            <div class="text-red-500">{{ errors.password ? errors.password[0] : '' }}</div>
                        </div>
                </div>

                <div>
                    <div class="flex items-center justify-between">
                        <label for="password_confirmation" class="block text-sm/4 font-medium text-gray-900">Confirm your password</label>
                        
                    </div>
                    <div class="mt-2">
                        <input type="password" name="password" id="password_confirmation" v-model="data.password_confirmation" required=""
                            class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/4" />
                    </div>
                </div>


                <div>
                    <button type="submit"
                        class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Create your account</button>
                </div>
            </form>

            <p class="mt-10 text-center text-sm/6 text-gray-500">
                Already have an account?
                {{ ' ' }}
                <RouterLink :to="{name: 'Login'}" class="font-semibold text-indigo-600 hover:text-indigo-500">Log in from here</RouterLink>
            </p>
        </div>
    </GuestLayout>
</template>

<style scoped></style>
