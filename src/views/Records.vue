<template>
  <div class="records-container">
    <h2>访问记录</h2>
    <el-card>
      <el-date-picker
        v-model="dateRange"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        style="margin-bottom: 20px"
        @change="filterRecords"
      ></el-date-picker>
      <el-table :data="filteredRecords" style="width: 100%">
        <el-table-column prop="id" label="记录ID" width="120"></el-table-column>
        <el-table-column prop="visitorName" label="访客姓名" width="120"></el-table-column>
        <el-table-column prop="action" label="操作" width="100">
          <template #default="scope">
            <el-tag :type="actionType[scope.row.action]">{{ scope.row.action }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="time" label="时间" width="200">
          <template #default="scope">
            {{ formatDateTime(scope.row.time) }}
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-if="filteredRecords.length > 0"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="filteredRecords.length"
        style="margin-top: 20px"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Records',
  data() {
    return {
      records: [],
      dateRange: null,
      currentPage: 1,
      pageSize: 10,
      actionType: {
        登记: 'info',
        签到: 'primary',
        签退: 'success'
      }
    }
  },
  computed: {
    filteredRecords() {
      if (!this.dateRange) {
        return this.records
      }
      const start = this.dateRange[0]
      const end = this.dateRange[1]
      return this.records.filter(record => {
        const recordDate = new Date(record.time)
        return recordDate >= start && recordDate <= end
      })
    }
  },
  mounted() {
    this.loadRecords()
  },
  methods: {
    loadRecords() {
      this.records = JSON.parse(localStorage.getItem('records') || '[]')
    },
    formatDateTime(time) {
      if (!time) return ''
      const t = new Date(time)
      return `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, '0')}-${String(t.getDate()).padStart(2, '0')} ${String(t.getHours()).padStart(2, '0')}:${String(t.getMinutes()).padStart(2, '0')}:${String(t.getSeconds()).padStart(2, '0')}`
    },
    filterRecords() {
      this.currentPage = 1
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
.records-container {
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

.records-container h2 {
  margin-bottom: 20px;
  color: #2d3748;
  font-weight: 600;
  font-size: 18px;
}
</style>