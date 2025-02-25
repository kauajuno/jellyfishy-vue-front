<script setup>
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'
import axiosClient from '../axios'
import router from '../router'
import useUserStore from '../store/user'
import { computed } from 'vue'

const userStore = useUserStore()

const user = computed(() => userStore.user)

const navigation = [
    { name: 'Upload', to: {name: 'Home'}},
    { name: 'My images', to: {name: 'MyImages'}},
]

function logout() {
    axiosClient.post('/logout').then(response => {
        
        document.cookie = "XSRF-TOKEN=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "laravel_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        
        router.push({ name: 'Login' });
    }).catch(error => {
        console.log(error.response.data);
    });
}
</script>

<template>
    <div class="min-h-full">
        <Disclosure as="nav" class="bg-gray-950" v-slot="{ open }">
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div class="flex h-16 items-center justify-between">
                    <div class="flex items-center">
                        <div class="shrink-0">
                            <img class="h-10 w-auto"
                                src="../../public/jellyfishy.png"
                                alt="Your Company" />
                        </div>
                        <div class="hidden md:block">
                            <div class="ml-10 flex items-baseline space-x-4">
                                <RouterLink v-for="item in navigation" :key="item.name" :to="item.to"
                                    :class="[$route.name === item.to.name ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'rounded-md px-3 py-2 text-sm font-medium']"
                                    :aria-current="$route.name === item.to.name ? 'page' : undefined">{{ item.name }}</RouterLink>
                            </div>
                        </div>
                    </div>
                    <div class="hidden md:block">
                        <div class="ml-4 flex items-center md:ml-6">
                            <Menu as="div" class="relative ml-3">
                                <div>
                                    <MenuButton
                                        class="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-none">
                                        <span class="sr-only">Open user menu</span>
                                        <img class="h-8 w-8 rounded-full" src="https://i.pinimg.com/736x/46/72/f8/4672f876389036583190d93a71aa6cb2.jpg" alt="" />
                                    </MenuButton>
                                </div>
                                <transition enter-active-class="transition ease-out duration-100"
                                    enter-from-class="transform opacity-0 scale-95"
                                    enter-to-class="transform opacity-100 scale-100"
                                    leave-active-class="transition ease-in duration-75"
                                    leave-from-class="transform opacity-100 scale-100"
                                    leave-to-class="transform opacity-0 scale-95">
                                    <MenuItems
                                        class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <MenuItem v-slot="{ active }">
                                            <button @click="logout"
                                                class="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100">
                                                Sign Out
                                            </button>
                                        </MenuItem>
                                    </MenuItems>
                                </transition>
                            </Menu>
                        </div>
                    </div>
                    <div class="-mr-2 flex md:hidden">
                        <DisclosureButton
                            class="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-none">
                            <span class="sr-only">Open main menu</span>
                            <Bars3Icon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
                            <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
                        </DisclosureButton>
                    </div>
                </div>
            </div>

            <DisclosurePanel class="md:hidden">
                <div class="space-y-1 px-2 pt-2 pb-3 sm:px-3">
                    <RouterLink v-for="item in navigation" :key="item.name" :to="item.to"
                        :class="[$route.name === item.to.name ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'block rounded-md px-3 py-2 text-base font-medium']"
                        :aria-current="$route.name === item.to.name ? 'page' : undefined">{{ item.name }}</RouterLink>
                </div>
                <div class="border-t border-gray-700 pt-4 pb-3">
                    <div class="flex items-center px-5">
                        <div class="shrink-0">
                            <img class="h-10 w-10 rounded-full"
                            src="https://i.pinimg.com/736x/46/72/f8/4672f876389036583190d93a71aa6cb2.jpg" alt="" />
                        </div>
                        <div class="ml-3">
                            <div class="text-base font-medium text-white">{{ user.name }}</div>
                            <div class="text-sm font-medium text-gray-400">{{ user.email }}</div>
                        </div>
                    </div>
                    <div class="mt-3 space-y-1 px-2">
                        <DisclosureButton @click="logout"
                            class="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">
                            Sign Out
                        </DisclosureButton>
                    </div>
                </div>
            </DisclosurePanel>
        </Disclosure>

        <RouterView />
       
    </div>
</template>

<style scoped></style>