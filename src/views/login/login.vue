<template>
    <el-container class="login-container">
        <el-header>
            <h1>Login</h1>
        </el-header>
        <el-main>
            <el-form
                @submit.prevent="handleLogin"
                label-position="top"
                :model="form"
                class="login-form"
            >
                <el-form-item>
                    <el-input
                        v-model="form.phone"
                        prefix-icon="el-icon-user"
                        placeholder="Enter your phone"
                    >
                        <template #prefix>
                            <i class="fa fa-user"></i>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-input
                        v-model="form.passwordHash"
                        prefix-icon="el-icon-lock"
                        type="password"
                        placeholder="Enter your password"
                    >
                        <template #prefix>
                            <i class="fa fa-lock"></i>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleLogin" block
                        >Login</el-button
                    >
                </el-form-item>
            </el-form>
        </el-main>
    </el-container>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/store'

const form = ref({
    phone: '18915974631',
    passwordHash: '120130',
})

const userStore = useUserStore()

const handleLogin = () => {
    userStore.login(form.value).then((userInfo) => {
        console.log('Logged in as', userInfo)
        // Redirect or perform other actions after login
    })
}
</script>

<style scoped>
.login-container {
    max-width: 400px;
    margin: 100px auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    background-image: url('https://example.com/path/to/your/image.jpg'); /* Replace with your image URL */
    background-size: cover; /* Ensure the image covers the entire container */
    background-position: center; /* Center the image */
}

.login-form {
    width: 100%;
}

h1 {
    text-align: center;
    margin-bottom: 20px;
}
</style>
