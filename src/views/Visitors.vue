<template>
  <div class="visitors-container">
    <h2>访客管理</h2>
    <el-card>
      <el-input
        v-model="searchQuery"
        placeholder="搜索访客姓名或身份证号"
        prefix-icon="el-icon-search"
        style="width: 400px; margin-bottom: 20px"
      ></el-input>
      <el-table :data="filteredVisitors" style="width: 100%">
        <el-table-column prop="name" label="访客姓名" width="120"></el-table-column>
        <el-table-column prop="idCard" label="身份证号" width="180"></el-table-column>
        <el-table-column prop="phone" label="联系电话" width="150"></el-table-column>
        <el-table-column prop="visitDate" label="访问日期" width="120">
          <template #default="scope">
            {{ formatDate(scope.row.visitDate) }}
          </template>
        </el-table-column>
        <el-table-column prop="visitTime" label="访问时间" width="100">
          <template #default="scope">
            {{ formatTime(scope.row.visitTime) }}
          </template>
        </el-table-column>
        <el-table-column prop="reason" label="访问事由" width="120">
          <template #default="scope">
            {{ reasonMap[scope.row.reason] }}
          </template>
        </el-table-column>
        <el-table-column prop="hostName" label="被访人" width="120"></el-table-column>
        <el-table-column prop="hostDepartment" label="被访部门" width="120"></el-table-column>
        <el-table-column prop="status" label="状态" width="100">
          <template #default="scope">
            <el-tag :type="statusType[scope.row.status]">{{ statusMap[scope.row.status] }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template #default="scope">
            <el-button type="primary" size="small" @click="checkIn(scope.row)">签到</el-button>
            <el-button type="success" size="small" @click="checkOut(scope.row)">签退</el-button>
            <el-button type="danger" size="small" @click="deleteVisitor(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-if="filteredVisitors.length > 0"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="filteredVisitors.length"
        style="margin-top: 20px"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Visitors',
  data() {
    return {
      visitors: [],
      searchQuery: '',
      currentPage: 1,
      pageSize: 10,
      reasonMap: {
        business: '业务洽谈',
        meeting: '会议',
        visit: '参观',
        other: '其他'
      },
      statusMap: {
        pending: '待签到',
        checkedIn: '已签到',
        checkedOut: '已签退'
      },
      statusType: {
        pending: 'warning',
        checkedIn: 'primary',
        checkedOut: 'success'
      }
    }
  },
  computed: {
    filteredVisitors() {
      if (!this.searchQuery) {
        return this.visitors
      }
      return this.visitors.filter(visitor => 
        visitor.name.includes(this.searchQuery) || 
        visitor.idCard.includes(this.searchQuery)
      )
    }
  },
  mounted() {
    this.loadVisitors()
  },
  methods: {
    loadVisitors() {
      this.visitors = JSON.parse(localStorage.getItem('visitors') || '[]')
    },
    formatDate(date) {
      if (!date) return ''
      const d = new Date(date)
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
    },
    formatTime(time) {
      if (!time) return ''
      const t = new Date(time)
      return `${String(t.getHours()).padStart(2, '0')}:${String(t.getMinutes()).padStart(2, '0')}`
    },
    checkIn(visitor) {
      visitor.status = 'checkedIn'
      localStorage.setItem('visitors', JSON.stringify(this.visitors))
      
      // 添加访问记录
      let records = JSON.parse(localStorage.getItem('records') || '[]')
      records.push({
        id: Date.now(),
        visitorId: visitor.id,
        visitorName: visitor.name,
        action: '签到',
        time: new Date().toISOString()
      })
      localStorage.setItem('records', JSON.stringify(records))
      
      this.$message.success('签到成功')
    },
    checkOut(visitor) {
      visitor.status = 'checkedOut'
      localStorage.setItem('visitors', JSON.stringify(this.visitors))
      
      // 添加访问记录
      let records = JSON.parse(localStorage.getItem('records') || '[]')
      records.push({
        id: Date.now(),
        visitorId: visitor.id,
        visitorName: visitor.name,
        action: '签退',
        time: new Date().toISOString()
      })
      localStorage.setItem('records', JSON.stringify(records))
      
      this.$message.success('签退成功')
    },
    deleteVisitor(id) {
      this.$confirm('确定要删除该访客吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.visitors = this.visitors.filter(v => v.id !== id)
        localStorage.setItem('visitors', JSON.stringify(this.visitors))
        this.$message.success('删除成功')
      })
    },
    handleSizeChange(size) {
      this.pageSize = size
      this.currentPage = 1
    },
    handleCurrentChange(current) {
      this.currentPage = current
    }
  }
}
</script>

<style scoped>
.visitors-container {
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

.visitors-container h2 {
  margin-bottom: 20px;
  color: #2d3748;
  font-weight: 600;
  font-size: 18px;
}
</style>