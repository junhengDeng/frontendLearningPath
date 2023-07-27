<template>
  <div class="loginBox">
    <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="80px" class="demo-ruleForm">
      <h2>后台管理系统</h2>
      <el-form-item label="账号" prop="userName">
        <el-input v-model="ruleForm.userName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item>
        <el-button class="loginBtn" type="primary" @click="submitForm(ruleFormRef)">登录</el-button>
        <el-button class="loginBtn" @click="resetForm(ruleFormRef)">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref } from 'vue'
import { LoginData } from "@/type/login"
import { FormInstance } from 'element-plus'
import { login } from '@/request/api'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const rules = {
      userName: [
        { required: true, message: '请输入账号', trigger: 'blur' },
        { min: 3, max: 10, message: '账号长度在3-10之间', trigger: 'blur' },
      ],
      password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 3, max: 10, message: '密码长度在3-10之间', trigger: 'blur' },
      ],
    }
    const data = reactive(new LoginData())
    const router = useRouter() // -> $router


    const ruleFormRef = ref<FormInstance>()
    const submitForm = async (formEl: FormInstance | undefined) => {
      if (!formEl) return;
      await formEl.validate((valid, fields) => {
        if (valid) {
          console.log('submit')
          login(data.ruleForm).then(res => {
            console.log(res);
            // 将tooken 进行保存
            localStorage.setItem('token', res.data);
            router.push('/')

          })
        } else {
          console.log('error submit!', fields)
        }
      })
    }

    const resetForm = (formEl: FormInstance | undefined) => {
      if (!formEl) return;
      formEl.resetFields();
    }


    return {
      ...toRefs(data),
      rules,
      ruleFormRef,
      submitForm,
      resetForm,
    }
  }
})
</script>

<style lang="less" scoped>
.loginBox {
  width: 100%;
  height: 100%;
  background: #ddd;
  padding: 1px;
  text-align: center;

  .demo-ruleForm {
    width: 500px;
    margin: 200px auto;
    background-color: #fff;
    padding: 30px;
    border-radius: 40px;

    .loginBtn {
      width: 40%;
    }

    h2 {
      margin-bottom: 10px;
    }
  }
}
</style>