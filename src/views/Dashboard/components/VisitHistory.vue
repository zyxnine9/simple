<template>
  <div class="app-container">
    <div class="btn-group">
      <el-button type="primary">创建</el-button>
      <el-button type="warning">删除</el-button>
    </div>

    <div>
      <el-table
        v-loading="listLoading"
        :data="list"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row
      >
        <el-table-column align="center" label="index" width="95">
          <template slot-scope="scope">
            {{ scope.$index }}
          </template>
        </el-table-column>
        <el-table-column label="manager">
          <template slot-scope="scope">
            {{ scope.row.manager }}
          </template>
        </el-table-column>
        <el-table-column label="status" width="110" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.status }}</span>
          </template>
        </el-table-column>

        <el-table-column
          class-name="status-col"
          label="comment"
          width="110"
          align="center"
        >
          <template slot-scope="scope">
            <el-tag :type="scope.row.comment | statusFilter">{{
              scope.row.comment
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="created_at"
          label="createTime"
          width="200"
        >
          <template slot-scope="scope">
            <i class="el-icon-time" />
            <span>{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="created_at"
          label="updateTime"
          width="200"
        >
          <template slot-scope="scope">
            <i class="el-icon-time" />
            <span>{{ scope.row.updateTime }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import request from "@/utils/request";
export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "gray",
        deleted: "danger",
      };
      return statusMap[status];
    },
  },
  data() {
    return {
      list: [],
      listLoading: false,
    };
  },
  methods: {
    getHistory() {
      request({
        url: "/api/QueryWorkOrder/1/",
        method: "get",
      })
        .then((res) => {
          console.log(res.data);
          this.list = res.data.workOrderFlow;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {
    this.getHistory();
  },
};
</script>


<style scoped>
.line {
  text-align: center;
}
.btn-group {
  margin: 16px;
  display: flex;
  justify-content: space-between;
}
</style>

