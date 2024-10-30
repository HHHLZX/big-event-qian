<script setup>
import {
  CaretBottom,
  Crop,
  EditPen,
  HelpFilled,
  Management,
  PictureFilled,
  Promotion,
  SwitchButton,
  TrendCharts,
  User,
  UserFilled
} from '@element-plus/icons-vue'
import avatar from '@/assets/default.png'
//导入接口函数
import {userInfoGetService} from '@/api/user.js'
//导入pinia
import {useUserInfoStore} from '@/stores/user.js'
//dropDown条目被点击后，回调的函数
import {ElMessage, ElMessageBox} from 'element-plus'
import {useTokenStore} from '@/stores/token.js'
import router from "@/router/index.js";

const userInfoStore = useUserInfoStore();

//获取个人信息
const getUserInfo = async () => {
  let result = await userInfoGetService();
  //存储pinia
  userInfoStore.info = result.data;
}
getUserInfo()

const tokenStore = useTokenStore()
const handleCommand = (command) => {
  if (command === 'logout') {
    //退出登录
    ElMessageBox.confirm(
        '你确认退出登录码？',
        '温馨提示',
        {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning',
        }
    )
        .then(async () => {
          //用户点击了确认
          //清空pinia中的token和个人信息
          tokenStore.removeToken()
          userInfoStore.removeInfo()
          // userInfoStore.info={}
          // tokenStore.token=''
          //跳转到登录页
          await router.push('/login')
        })
        .catch(() => {
          //用户点击了取消
          ElMessage({
            type: 'info',
            message: '取消退出',
          })
        })
  } else {
    //路由
    router.push('/user/' + command)
  }
}
</script>

<template>
  <el-container class="layout-container">
    <!-- 左侧菜单 -->
    <el-aside width="200px">
      <div class="el-aside__logo"></div>
      <el-menu active-text-color="#ffd04b" background-color="#232323" text-color="#fff"
               router>
        <el-sub-menu index="1">
          <template #title>
            <el-icon>
              <Management/>
            </el-icon>
            <span>文章分类</span>
          </template>
          <el-menu-item index="/article/category">
            <el-icon>
              <Management/>
            </el-icon>
            <span>详细分类</span>
          </el-menu-item>
          <el-menu-item index="/article/category-chart">
            <el-icon>
              <HelpFilled/>
            </el-icon>
            <span>图表分析</span>
          </el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="2">
          <template #title>
            <el-icon>
              <Promotion/>
            </el-icon>
            <span>文章管理</span>
          </template>
          <el-menu-item index="/article/manage">
            <el-icon>
              <Promotion/>
            </el-icon>
            <span>文章管理</span>
          </el-menu-item>
          <el-menu-item index="/article/manage-chart">
            <el-icon>
              <PictureFilled/>
            </el-icon>
            <span>图表分析</span>
          </el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="3">
          <template #title>
            <el-icon>
              <UserFilled/>
            </el-icon>
            <span>个人中心</span>
          </template>
          <el-menu-item index="/user/info">
            <el-icon>
              <User/>
            </el-icon>
            <span>基本资料</span>
          </el-menu-item>
          <el-menu-item index="/user/avatar">
            <el-icon>
              <Crop/>
            </el-icon>
            <span>更换头像</span>
          </el-menu-item>
          <el-menu-item index="/user/password">
            <el-icon>
              <EditPen/>
            </el-icon>
            <span>重置密码</span>
          </el-menu-item>
        </el-sub-menu>
        <el-menu-item index="/user/char">
          <el-icon>
            <TrendCharts/>
          </el-icon>
          <span>绩效分析</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <!-- 右侧主区域 -->
    <el-container>
      <!-- 头部区域 -->
      <el-header>
        <div>黑马程序员：<strong>{{
            userInfoStore.info.nickname ? userInfoStore.info.nickname : userInfoStore.info.usrename
          }}</strong></div>
        <el-dropdown placement="bottom-end" @command="handleCommand">
                    <span class="el-dropdown__box">
                        <el-avatar :src="userInfoStore.info.userPic ? userInfoStore.info.userPic : avatar"/>
                        <el-icon>
                            <CaretBottom/>
                        </el-icon>
                    </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="info" :icon="User">基本资料</el-dropdown-item>
              <el-dropdown-item command="avatar" :icon="Crop">更换头像</el-dropdown-item>
              <el-dropdown-item command="password" :icon="EditPen">重置密码</el-dropdown-item>
              <el-dropdown-item command="logout" :icon="SwitchButton">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-header>
      <!-- 中间区域 -->
      <el-main>
        <router-view></router-view>
        <!--        <div style="width: 1290px; height: 570px;border: 1px solid red;">-->
        <!--          内容展示区-->
        <!--        </div>-->
      </el-main>
      <!-- 底部区域 -->
      <el-footer>大事件 ©2023 Created by 黑马程序员</el-footer>
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
.layout-container {
  height: 100vh;

  .el-aside {
    background-color: #232323;

    &__logo {
      height: 120px;
      background: url('@/assets/logo.png') no-repeat center / 120px auto;
    }

    .el-menu {
      border-right: none;
    }
  }

  .el-header {
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .el-dropdown__box {
      display: flex;
      align-items: center;

      .el-icon {
        color: #999;
        margin-left: 10px;
      }

      &:active,
      &:focus {
        outline: none;
      }
    }
  }

  .el-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: #666;
  }
}
</style>



