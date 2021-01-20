<template>
  <div class="app-container">
    <div>
      <el-table
        v-loading="listLoading"
        :data="list"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row
      >
        <el-table-column align="center" label="序号" width="110">
          <template slot-scope="scope">
            {{ scope.$index }}
          </template>
        </el-table-column>

        <el-table-column label="状态" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.comment }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="created_at" label="更新时间">
          <template slot-scope="scope">
            <i v-if="scope.row.updateTime" class="el-icon-time" />
            <span>{{ getDayFormat(scope.row.updateTime) }}</span>
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
    getDayFormat(Unformatdate) {
      if (Unformatdate == null) return null;
      // const current = new Date()
      const time = new Date(Unformatdate);
      const year = time.getFullYear();
      const month = "0" + (time.getMonth() + 1);
      const day = "0" + (time.getDate() + 1);
      // const hour = time.getHours();
      // const minute = time.getMinutes();

      return `${year}年${month.substr(-2)}月${day.substr(-2)}日`;
    },
    getHistory() {
      request({
        url: "/api/QueryWorkOrder/",
        method: "get",
      })
        .then((res) => {
          return res.data.pop().id;
        })
        .then((id) => {
          return request({
            url: "/api/QueryWorkOrder/" + id + "/",
            method: "get",
          });
        })
        .then((res) => {
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

