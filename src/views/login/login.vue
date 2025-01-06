<template>
    <div class="login-container">
        <div class="login-box">
            <div class="login-header">
                <h2 class="title">系统登录</h2>
                <p class="subtitle">欢迎回来，请登录您的账号</p>
            </div>

            <Form ref="formRef" :model="form" :rules="rules" class="login-form">
                <FormItem prop="phone">
                    <Input v-model="form.phone" placeholder="请输入手机号">
                        <template #prefix>
                            <Icon type="md-phone-portrait" />
                        </template>
                    </Input>
                </FormItem>

                <FormItem prop="passwordHash">
                    <Input v-model="form.passwordHash" type="password" placeholder="请输入密码" password>
                        <template #prefix>
                            <Icon type="md-lock" />
                        </template>
                    </Input>
                </FormItem>

                <FormItem class="button-item">
                    <Button type="primary" class="submit-btn" @click="handleLogin" :loading="loading" long>
                        {{ loading ? '登录中...' : '登录' }}
                    </Button>
                </FormItem>

                <div class="form-footer">
                    <a @click="goToRegister">注册账号</a>
                    <a>忘记密码？</a>
                </div>
            </Form>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/User'
import { Message } from 'view-ui-plus'

const router = useRouter()
const loading = ref(false)
const userStore = useUserStore()
const formRef = ref(null)

const form = ref({
    phone: '',
    passwordHash: '',
})

const rules = {
    phone: [
        { required: true, message: '请输入手机号', trigger: 'blur' },
        { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号格式', trigger: 'blur' },
    ],
    passwordHash: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, message: '密码长度不能小于6位', trigger: 'blur' },
    ],
}

const handleLogin = () => {
    formRef.value.validate(async (valid) => {
        if (!valid) return
        await userStore.login(form.value)
        const result = await userStore.getUserInfo()
        if (result.roleId === 1) {
            router.replace('/dashboard/home')
        }
        if (result.roleId === 3 || result.roleId === 10) {
            router.replace('/dashboard/user')
        }
    })
}

const goToRegister = () => {
    router.push('/register')
}

onMounted(() => {
    // 如果已登录，直接跳转到首页
    if (userStore.isLoggedIn) {
        router.replace('/')
    }
})
</script>

<style scoped>
.login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f5f7f9;
}

.login-box {
    width: 400px;
    padding: 40px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.login-header {
    text-align: center;
    margin-bottom: 40px;
}

.title {
    font-size: 24px;
    color: #17233d;
    margin: 0 0 8px 0;
    font-weight: 500;
}

.subtitle {
    font-size: 14px;
    color: #808695;
    margin: 0;
}

.login-form {
    :deep(.ivu-input) {
        height: 40px;
    }

    :deep(.ivu-form-item) {
        margin-bottom: 24px;
    }

    :deep(.ivu-input-prefix i) {
        font-size: 16px;
    }
}

.button-item {
    margin-top: 36px;
}

.submit-btn {
    height: 40px;
    font-size: 16px;
}

.form-footer {
    display: flex;
    justify-content: space-between;
    margin-top: 16px;
    padding: 0 4px;

    a {
        color: #2d8cf0;
        cursor: pointer;
        font-size: 14px;

        &:hover {
            color: #57a3f3;
        }
    }
}
</style>
