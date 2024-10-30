<script setup>
import {ref} from 'vue'
import {useUserInfoStore} from '@/stores/user.js';
import {userPasswordUpdateService} from '@/api/user.js'
import {ElMessage} from 'element-plus';
import router from "@/router/index.js";

const userInfoStore = useUserInfoStore()
const userInfo = ref({...userInfoStore.info})
//
const updatepasswordData = ref({
  old_pwd: '',
  new_pwd: '',
  re_pwd: ''
})
//自定义确认密码的校验函数
const rePasswordValid = (rule, value, callback) => {
  if (value == null || value === '') {
    return callback(new Error('请再次确认密码'))
  } else if (updatepasswordData.value.old_pwd !== value) {
    return callback(new Error('两次输入新密码不一致'))
  } else {
    callback()
  }
}
const rules = {
  nickname: [
    {required: true, message: '请输入用户昵称', trigger: 'blur'},
    {
      pattern: /^\S{2,10}$/,
      message: '昵称必须是2-10位的非空字符串',
      trigger: 'blur'
    }
  ],
  old_pwd: [
    {required: true, message: '请输入原密码', trigger: 'blur'},
    {min: 5, max: 16, message: '密码长度必须为5~16位', trigger: 'blur'}
  ],
  new_pwd: [
    {required: true, message: '请输入新密码', trigger: 'blur'},
    {min: 5, max: 16, message: '密码长度必须为5~16位', trigger: 'blur'}
  ],
  re_pwd: [
    {validator: rePasswordValid, trigger: 'blur'}
  ]
}
//修改用户密码
const updateUserPassword = async () => {
  let result = await userPasswordUpdateService(updatepasswordData.value)
  ElMessage.success(result.message ? result.message : '修改成功')
  await router.push("/login")
}
</script>
<template>
  <el-card class="page-container">
    <template #header>
      <div class="header">
        <span>重置密码</span>
      </div>
    </template>
    <el-row>
      <el-col :span="12">
        <el-form :model="updatepasswordData" :rules="rules" label-width="100px" size="large">
          <el-form-item label="登录名称">
            <el-input v-model="userInfo.username" disabled></el-input>
          </el-form-item>
          <el-form-item label="原密码" prop="password">
            <el-input type="password" v-model="updatepasswordData.old_pwd"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newpassword">
            <el-input type="password" v-model="updatepasswordData.new_pwd"></el-input>
          </el-form-item>
          <el-form-item label="确认新密码" prop="repassword">
            <el-input type="password" v-model="updatepasswordData.re_pwd"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="updateUserPassword">提交修改</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </el-card>
</template>