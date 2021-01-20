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
      <el-table-column align="center" label="月份">
        <template slot-scope="scope">
          {{ getDayFormat(scope.row.stateDate) }}
        </template>
      </el-table-column>

      <el-table-column label="违规次数" align="center">
        <template slot-scope="scope">
          {{ scope.row.breakTimes }}
        </template>
      </el-table-column>

      <el-table-column align="center" prop="created_at" label="信用等级">
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
      list: [],
      listLoading: false,
    };
  },
  methods: {
    getDayFormat(Unformatdate) {
      // const current = new Date()
      const time = new Date(Unformatdate);
      const year = time.getFullYear();
      const month = "0" + (time.getMonth() + 1);
      // const hour = time.getHours();
      // const minute = time.getMinutes();

      return `${year}年${month.substr(-2)}月`;
    },

    getCreditRating() {
      request({
        url: "/api/CreditRating/",
        method: "get",
      })
        .then((res) => {
          this.list = res.data;
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
