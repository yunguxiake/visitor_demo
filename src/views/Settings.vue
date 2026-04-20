<template>
  <div class="settings-container">
    <h2>系统设置</h2>
    <el-card>
      <el-tabs v-model="activeTab">
        <el-tab-pane label="基本设置" name="basic">
          <el-form :model="basicSettings" label-width="120px">
            <el-form-item label="系统名称">
              <el-input v-model="basicSettings.systemName" placeholder="请输入系统名称"></el-input>
            </el-form-item>
            <el-form-item label="管理员名称">
              <el-input v-model="basicSettings.adminName" placeholder="请输入管理员名称"></el-input>
            </el-form-item>
            <el-form-item label="联系电话">
              <el-input v-model="basicSettings.contactPhone" placeholder="请输入联系电话"></el-input>
            </el-form-item>
            <el-form-item label="系统Logo">
              <el-upload
                class="avatar-uploader"
                action="#"
                :show-file-list="false"
                :on-change="handleLogoUpload"
              >
                <img v-if="basicSettings.logo" :src="basicSettings.logo" class="avatar">
                <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
              </el-upload>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="saveBasicSettings">保存设置</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="安全设置" name="security">
          <el-form :model="securitySettings" label-width="120px">
            <el-form-item label="修改密码">
              <el-input v-model="securitySettings.newPassword" type="password" placeholder="请输入新密码"></el-input>
            </el-form-item>
            <el-form-item label="确认密码">
              <el-input v-model="securitySettings.confirmPassword" type="password" placeholder="请确认新密码"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="changePassword">修改密码</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="数据管理" name="data">
          <el-button type="warning" @click="exportData">导出数据</el-button>
          <el-button type="danger" @click="clearData">清空数据</el-button>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import { Plus } from '@element-plus/icons-vue'

export default {
  name: 'Settings',
  components: {
    Plus
  },
  data() {
    return {
      activeTab: 'basic',
      basicSettings: {
        systemName: '门禁访客系统',
        adminName: '管理员',
        contactPhone: '13800138000',
        logo: ''
      },
      securitySettings: {
        newPassword: '',
        confirmPassword: ''
      }
    }
  },
  mounted() {
    this.loadSettings()
  },
  methods: {
    loadSettings() {
      const savedSettings = localStorage.getItem('settings')
      if (savedSettings) {
        this.basicSettings = { ...this.basicSettings, ...JSON.parse(savedSettings) }
      }
    },
    saveBasicSettings() {
      localStorage.setItem('settings', JSON.stringify(this.basicSettings))
      this.$message.success('保存成功')
    },
    handleLogoUpload(file) {
      // 模拟上传，实际项目中需要上传到服务器
      const reader = new FileReader()
      reader.onload = (e) => {
        this.basicSettings.logo = e.target.result
      }
      reader.readAsDataURL(file.raw)
    },
    changePassword() {
      if (this.securitySettings.newPassword !== this.securitySettings.confirmPassword) {
        this.$message.error('两次输入的密码不一致')
        return
      }
      if (this.securitySettings.newPassword.length < 6) {
        this.$message.error('密码长度至少为6位')
        return
      }
      // 模拟修改密码
      this.$message.success('密码修改成功')
      this.securitySettings.newPassword = ''
      this.securitySettings.confirmPassword = ''
    },
    exportData() {
      // 模拟导出数据
      const data = {
        visitors: JSON.parse(localStorage.getItem('visitors') || '[]'),
        records: JSON.parse(localStorage.getItem('records') || '[]'),
        settings: this.basicSettings
      }
      const dataStr = JSON.stringify(data, null, 2)
      const dataBlob = new Blob([dataStr], { type: 'application/json' })
      const url = URL.createObjectURL(dataBlob)
      const link = document.createElement('a')
      link.href = url
      link.download = `访客系统数据_${new Date().toISOString().split('T')[0]}.json`
      link.click()
      URL.revokeObjectURL(url)
      this.$message.success('数据导出成功')
    },
    clearData() {
      this.$confirm('确定要清空所有数据吗？此操作不可恢复！', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'danger'
      }).then(() => {
        localStorage.removeItem('visitors')
        localStorage.removeItem('records')
        this.$message.success('数据清空成功')
      })
    }
  }
}
</script>

<style scoped>
.settings-container {
  background: #ffffff;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  width: 1200px;
  height: 467px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  border: 1px solid #e2e8f0;
}

.settings-container h2 {
  margin-bottom: 20px;
  color: #2d3748;
  font-weight: 600;
  font-size: 18px;
}

.avatar-uploader {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: border-color 0.3s;
  width: 120px;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.avatar-uploader:hover {
  border-color: #1890ff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #999;
}

.avatar {
  width: 120px;
  height: 120px;
  display: block;
}
</style>