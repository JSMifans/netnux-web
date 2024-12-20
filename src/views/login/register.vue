<template>
    <div class="page-container register-container">
        <!-- 右侧注册表单区 -->
        <div class="register-content">
            <div class="register-box">
                <h2 class="register-title">账号注册</h2>
                <p class="register-subtitle">欢迎加入我们的管理系统</p>
                <el-form
                    ref="formRef"
                    :model="registerForm"
                    :rules="rules"
                    label-width="0"
                    class="register-form"
                    status-icon
                >
                    <el-form-item prop="phone">
                        <el-input
                            v-model="registerForm.phone"
                            placeholder="请输入手机号"
                            :prefix-icon="Phone"
                            autocomplete="off"
                        />
                    </el-form-item>

                    <el-form-item prop="password">
                        <el-input
                            v-model="registerForm.password"
                            type="password"
                            placeholder="请输入密码"
                            show-password
                            :prefix-icon="Lock"
                            autocomplete="off"
                            :input-style="{ 'background-color': 'transparent' }"
                        />
                    </el-form-item>

                    <el-form-item prop="confirmPassword">
                        <el-input
                            v-model="registerForm.confirmPassword"
                            type="password"
                            placeholder="请再次输入密码"
                            show-password
                            :prefix-icon="Lock"
                            autocomplete="off"
                            :input-style="{ 'background-color': 'transparent' }"
                        />
                    </el-form-item>

                    <el-form-item prop="nickname">
                        <el-input
                            v-model="registerForm.nickname"
                            placeholder="请输入昵称"
                            :prefix-icon="User"
                            autocomplete="off"
                        />
                    </el-form-item>

                    <el-form-item class="button-group">
                        <el-button
                            type="primary"
                            @click="handleSubmit"
                            class="submit-btn"
                            :loading="loading"
                            >立即注册</el-button
                        >
                    </el-form-item>

                    <div class="login-link">
                        已有账号？<el-link type="primary" @click="goToLogin"
                            >立即登录</el-link
                        >
                    </div>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { register } from '@/api/user'
import { User, Lock, Phone } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const formRef = ref(null)
const loading = ref(false)

const registerForm = reactive({
    phone: '',
    password: '',
    confirmPassword: '',
    nickname: '',
    roleId: 1, // 默认角色ID
    status: 1, // 默认激活状态
})

const validatePass2 = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('请再次输入密码'))
    } else if (value !== registerForm.password) {
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
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, message: '密码长度不能小于6位', trigger: 'blur' },
    ],
    confirmPassword: [
        { required: true, validator: validatePass2, trigger: 'blur' },
    ],
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
        await formRef.value.validate(async (valid, fields) => {
            if (valid) {
                // 构造注册数据，移除确认密码字段
                const registerData = {
                    phone: registerForm.phone,
                    password: registerForm.password,
                    nickname: registerForm.nickname,
                    roleId: registerForm.roleId,
                    status: registerForm.status,
                }

                await register(registerData)
                ElMessage.success('注册成功！')
                // 注册成功后可以跳转到登录页
                // router.push('/login')
            } else {
                console.log('error submit!', fields)
            }
        })
    } catch (error) {
        console.error('注册失败：', error)
    }
}

const handleReset = () => {
    if (!formRef.value) return
    formRef.value.resetFields()
}

const goToLogin = () => {
    router.push('/login')
}
</script>

<style scoped>
/* 全屏容器 */
.register-container {
}

/* 注册表单卡片 */
.register-form {
    width: 400px; /* 固定宽度 */
    padding: 30px;
    background: #fff;
    border-radius: 8px; /* 圆角 */
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* 阴影效果 */
}

/* 方法2：使用 CSS 完全禁用自动填充样式 */
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus {
    /* 使用 transition 延迟背景色，使其看起来像被禁用了 */
    transition: background-color 5000s ease-in-out 0s;
    -webkit-text-fill-color: #000;
    background-color: transparent !important;
}

/* 方法4：如果还有黄色背景，可以强制覆盖 */
:deep(.el-input__inner) {
    -webkit-box-shadow: 0 0 0 1000px transparent inset !important;
}
</style>
