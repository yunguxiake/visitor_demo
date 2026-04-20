<template>
  <div class="dashboard-container">
    <el-container>
      <el-aside width="240px" class="sidebar">
        <div class="logo">
          <h3>访客系统</h3>
        </div>
        <el-menu
          :default-active="activeMenu"
          class="el-menu-vertical-demo"
          router
        >
          <el-menu-item index="/dashboard/register">
            <el-icon><Plus /></el-icon>
            <span>访客登记</span>
          </el-menu-item>
          <el-menu-item index="/dashboard/visitors">
            <el-icon><User /></el-icon>
            <span>访客管理</span>
          </el-menu-item>
          <el-menu-item index="/dashboard/records">
            <el-icon><Document /></el-icon>
            <span>访问记录</span>
          </el-menu-item>
          <el-menu-item index="/dashboard/settings">
            <el-icon><Setting /></el-icon>
            <span>系统设置</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header class="header">
          <div class="header-right">
            <el-dropdown>
              <span class="user">
                <el-icon><UserFilled /></el-icon>
                管理员
                <el-icon class="el-icon--right"><ArrowDown /></el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </el-header>
        <el-main class="main">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { Plus, User, Document, Setting, UserFilled, ArrowDown } from '@element-plus/icons-vue'

export default {
  name: 'Dashboard',
  components: {
    Plus,
    User,
    Document,
    Setting,
    UserFilled,
    ArrowDown
  },
  data() {
    return {
      activeMenu: '/dashboard/register'
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('token')
      this.$router.push('/')
    }
  },
  watch: {
    $route(to) {
      this.activeMenu = to.path
    }
  }
}
</script>

<style scoped>
.dashboard-container {
  height: 100vh;
  overflow: hidden;
}

.sidebar {
  background: #1a202c;
  color: #f7fafc;
}

.logo {
  padding: 20px;
  text-align: center;
  border-bottom: 1px solid #2d3748;
  background: #2d3748;
}

.logo h3 {
  margin: 0;
  color: #f7fafc;
  font-weight: 600;
}

.el-menu-vertical-demo {
  border-right: none;
}

.el-menu {
  background: #1a202c;
  color: #f7fafc;
}

.el-menu-item {
  color: #e2e8f0;
  font-size: 14px;
  height: 56px;
  line-height: 56px;
}

.el-menu-item:hover {
  background: #2d3748;
  color: #f7fafc;
}

.el-menu-item.is-active {
  background: #3182ce;
  color: #ffffff;
  font-weight: 500;
}

.header {
  background: #ffffff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 24px;
  height: 64px;
}

.header-right {
  display: flex;
  align-items: center;
}

.user {
  cursor: pointer;
  display: flex;
  align-items: center;
  color: #4a5568;
  font-weight: 500;
  padding: 8px 12px;
  border-radius: 6px;
  transition: background-color 0.2s;
}

.user:hover {
  background: #f7fafc;
}

.main {
  padding: 24px;
  background: #f7fafc;
  overflow-y: auto;
  overflow-x: auto;
  flex: 1;
  width: 100%;
}
</style>