<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="开始时间" width="100">
        <template slot-scope="scope">
          {{ scope.row.stateDate }}
        </template>
      </el-table-column>

      <el-table-column label="结束时间" width="120" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.endDate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="违规次数" width="120" align="center">
        <template slot-scope="scope">
          {{ scope.row.breakTimes }}
        </template>
      </el-table-column>
        <el-table-column align="center" label="创建时间" width="100">
        <template slot-scope="scope">
          {{ scope.row.createTime }}
        </template>
      </el-table-column>

      <el-table-column label="更新时间" width="120" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.updateTime }}</span>
        </template>
      </el-table-column>
     
      <el-table-column
        align="center"
        prop="created_at"
        label="信用等级"
        width="200"
      >
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.score }}</span>
        </template>
      </el-table-column>
    </el-table>
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
      list: [
        
      ],
      listLoading: false,
    };
  },
  methods: {
    getCreditRating() {
      request({
        url: "/api/CreditRating/",
        method: "get",
      })
        .then((res) => {
          this.list = res.data
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {
    this.getCreditRating();
  },
};
</script>
