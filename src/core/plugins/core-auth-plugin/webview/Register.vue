<template>
    <div>
        <Input :stack="true" :onInput="(text) => inputChange('username', text)" :value="''" placeholder="Ivy"
            class="fill-full-width" />

        <Input :stack="true" :onInput="(text) => inputChange('email', text)" :value="''" placeholder="Ivy"
            class="fill-full-width" />

        <Input :stack="true" :onInput="(text) => inputChange('password', text)" :value="''" placeholder="Ivy"
            class="fill-full-width" />

        <div class="split split-full space-between center mt-8 pb-4">
            <Button class="mr-2 fill-full-width" color="amber" :raise="true" @click="save">Register</Button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent } from 'vue';
import WebViewEvents from '@ViewUtility/webViewEvents';

export const ComponentName = 'Register';
export default defineComponent({
    name: ComponentName,
    components: {
        Button: defineAsyncComponent(() => import('@components/Button.vue')),
        Icon: defineAsyncComponent(() => import('@components/Icon.vue')),
        Input: defineAsyncComponent(() => import('@ViewComponents/Input.vue')),
        Frame: defineAsyncComponent(() => import('@components/Frame.vue')),
        Toolbar: defineAsyncComponent(() => import('@components/Toolbar.vue')),
    },
    props: {
        data: Object,
        infodata: Object,
        emit: Function,
    },
    data() {
        return {
            username: '',
            email: '',
            password: '',
        };
    },
    methods: {
        inputChange(name: string, text: string): void {
            this[name] = text;
        },
        save() {
            if ('alt' in window) {
                alt.emit(`${ComponentName}:open`);
            }

            WebViewEvents.emitServer('Register:done', this.username, this.email, this.password);
            // alt.emit('Register:done', this.username, this.email, this.password);
        },
    },
    computed: {},
    mounted() {
        if ('alt' in window) {
            alt.emit(`${ComponentName}:open`);
        }
    },
    unmounted() { },
});
</script>

<style scoped>
html,
body {
    padding: 0;
    margin: 0;
    background: url('../img/bg3.jpg');
    background-size: cover;
    overflow: hidden;
    font-family: 'Ubuntu', sans-serif !important;
    max-width: 100%;
}

#login {
    width: 60%;
    height: 70%;
    background-color: #fff;
    position: fixed;
    margin: 0 auto;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    box-shadow: 0 4px 46px 0 rgba(37, 36, 35, 0.3);
    border: 0;
    outline: 0;
}

#login .login-container {
    padding: 1.5vw;
    text-align: center;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

#login .title {
    text-transform: uppercase;
    color: #eb3b5a;
    font-size: 1.7vw;
}

#login .form-item {
    width: 15vw;
    border-radius: 0;
    outline: 0;
    padding: 1vw;
    margin: 0.5vw;
    color: #d3d3d3;
    font-size: 0.8vw;
    border: #d3d3d3 0.13vw solid;
    transition: ease-in 400ms;
    font-family: 'Ubuntu', sans-serif !important;
    font-weight: bold;
}

#login .form-item:focus {
    border: #eb3b5a 0.13vw solid;
    color: #eb3b5a !important;
}

#login .form-btn {
    color: #fff;
    border-radius: 0;
    outline: 0;
    width: 15vw;
    padding: 1vw;
    margin: 0.5vw;
    border: 0;
    background-color: #eb3b5a;
    font-weight: bold;
    font-size: 0.9vw;
    transition: ease-in 400ms;
}

#login .form-btn:hover {
    background-color: #f81d42;
}

.forgot-password {
    font-size: 0.7vw;
    position: absolute;
    right: 1.5vw;
    bottom: 1.5vw;
    color: #eb3b5a !important;
    text-decoration: none;
    font-weight: 600;
    transition: ease-in 400ms;
}

.forgot-password:hover {
    color: #fc0c36;
}

/** CORNERS **/
.right-top-corner {
    width: 0;
    height: 0;
    border-top: 10vw solid #eb3b5a;
    border-left: 19vw solid transparent;
    top: 0;
    right: 0;
    position: absolute;
}

.left-bottom-corner {
    width: 0;
    height: 0;
    border-bottom: 10vw solid #eb3b5a;
    border-right: 19vw solid transparent;
    bottom: 0;
    left: 0;
    position: absolute;
}
</style>
