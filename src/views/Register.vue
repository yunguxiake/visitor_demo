<template>
  <div class="register-container">
    <h2>访客登记</h2>
    <el-form :model="form" :rules="rules" ref="formRef" label-width="120px">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="访客姓名" prop="name">
            <el-input v-model="form.name" placeholder="请输入访客姓名" style="width: 100%"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="身份证号">
            <el-input v-model="form.idCard" placeholder="请输入身份证号" style="width: 100%"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="联系电话">
            <el-input v-model="form.phone" placeholder="请输入联系电话" style="width: 100%"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="访问日期">
            <el-date-picker
              v-model="form.visitDate"
              type="date"
              placeholder="选择访问日期"
              style="width: 100%"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="访问时间">
            <el-time-picker
              v-model="form.visitTime"
              placeholder="选择访问时间"
              style="width: 100%"
            ></el-time-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="访问事由">
            <el-select v-model="form.reason" placeholder="请选择访问事由" style="width: 100%">
              <el-option label="业务洽谈" value="business"></el-option>
              <el-option label="会议" value="meeting"></el-option>
              <el-option label="参观" value="visit"></el-option>
              <el-option label="其他" value="other"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="被访人">
            <el-input v-model="form.hostName" placeholder="请输入被访人姓名" style="width: 100%"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="被访部门">
            <el-input v-model="form.hostDepartment" placeholder="请输入被访部门" style="width: 100%"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="备注">
        <el-input
          v-model="form.remark"
          type="textarea"
          placeholder="请输入备注信息"
          :rows="3"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">提交登记</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data() {
    return {
      form: {
        name: '',
        idCard: '',
        phone: '',
        visitDate: new Date(),
        visitTime: new Date(),
        reason: '',
        hostName: '',
        hostDepartment: '',
        remark: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入访客姓名', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm() {
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          // 模拟提交
          const visitor = {
            id: Date.now(),
            ...this.form,
            status: 'pending',
            createTime: new Date().toISOString()
          }
          let visitors = JSON.parse(localStorage.getItem('visitors') || '[]')
          visitors.push(visitor)
          localStorage.setItem('visitors', JSON.stringify(visitors))
          
          // 添加访问记录
          let records = JSON.parse(localStorage.getItem('records') || '[]')
          records.push({
            id: Date.now(),
            visitorId: visitor.id,
            visitorName: visitor.name,
            action: '登记',
            time: new Date().toISOString()
          })
          localStorage.setItem('records', JSON.stringify(records))
          
          this.$message.success('登记成功')
          this.resetForm()
        }
      })
    },
    resetForm() {
      this.$refs.formRef.resetFields()
      this.form.visitDate = new Date()
      this.form.visitTime = new Date()
    }
  }
}
</script>

<style scoped>
.register-container {
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

.register-container h2 {
  margin-bottom: 20px;
  color: #2d3748;
  font-weight: 600;
  font-size: 18px;
}
</style>