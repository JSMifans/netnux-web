<template>
    <div class="page-container register-container">
        <!-- 右侧注册表单区 -->
        <div class="register-content">
            <div class="register-box">
                <h2 class="register-title">账号注册</h2>
                <p class="register-subtitle">欢迎加入我们的管理系统</p>
                <Form ref="formRef" :model="registerForm" :rules="rules" class="register-form">
                    <FormItem prop="phone">
                        <Input v-model="registerForm.phone" placeholder="请输入手机号" />
                    </FormItem>
                    <FormItem prop="passwordHash">
                        <Input v-model="registerForm.passwordHash" type="password" placeholder="请输入密码" password />
                    </FormItem>

                    <FormItem prop="confirmPassword">
                        <Input v-model="registerForm.confirmPassword" type="password" placeholder="请再次输入密码" password />
                    </FormItem>

                    <FormItem prop="nickname">
                        <Input v-model="registerForm.nickname" placeholder="请输入昵称" />
                    </FormItem>

                    <FormItem class="button-group">
                        <Button type="primary" @click="handleSubmit" class="submit-btn" :loading="loading" long>立即注册</Button>
                    </FormItem>

                    <div class="login-link">
                        已有账号？
                        <a @click="goToLogin">立即登录</a>
                    </div>
                </Form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { register } from '@/api/user'

const router = useRouter()
const formRef = ref(null)
const loading = ref(false)

const registerForm = reactive({
    phone: '18112923932',
    passwordHash: '120130',
    confirmPassword: '120130',
    nickname: '胡胡',
    roleId: 1,
    status: 1,
})

const validatePass2 = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('请再次输入密码'))
    } else if (value !== registerForm.passwordHash) {
        callback(new Error('两次输入密码不一致!'))
    } else {
        callback()
    }
}

const rules = {
    phone: [
        { required: true, message: '请输入手机号', trigger: 'blur' },
        {
            pattern: /^1[3-9]\d{9}$/,
            message: '请输入正确的手机号格式',
            trigger: 'blur',
        },
    ],
    passwordHash: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, message: '密码长度不能小于6位', trigger: 'blur' },
    ],
    confirmPassword: [{ required: true, validator: validatePass2, trigger: 'blur' }],
    nickname: [
        { required: true, message: '请输入昵称', trigger: 'blur' },
        {
            min: 2,
            max: 20,
            message: '昵称长度在2到20个字符之间',
            trigger: 'blur',
        },
    ],
}

const handleSubmit = async () => {
    if (!formRef.value) return

    try {
        formRef.value.validate(async (valid) => {
            if (valid) {
                loading.value = true
                const registerData = {
                    phone: registerForm.phone,
                    passwordHash: registerForm.passwordHash,
                    nickname: registerForm.nickname,
                    roleId: registerForm.roleId,
                    status: registerForm.status,
                }

                await register(registerData)
                loading.value = false
                // 使用 iView 的提示
                this.$Message.success('注册成功！')
                router.push('/login')
            }
        })
    } catch (error) {
        loading.value = false
        this.$Message.error('注册失败：' + error.message)
    }
}

const goToLogin = () => {
    router.push('/login')
}
</script>

<style scoped>
.register-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #f5f7f9;
}

.register-box {
    width: 400px;
    padding: 30px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.register-title {
    text-align: center;
    margin-bottom: 10px;
    color: #17233d;
}

.register-subtitle {
    text-align: center;
    margin-bottom: 30px;
    color: #808695;
}

.register-form {
    :deep(.ivu-input) {
        height: 40px;
    }

    :deep(.ivu-btn) {
        height: 40px;
        font-size: 16px;
    }
}

.login-link {
    text-align: center;
    margin-top: 16px;

    a {
        color: #2d8cf0;
        cursor: pointer;

        &:hover {
            color: #5cadff;
        }
    }
}

.button-group {
    margin-top: 24px;
}
</style>
