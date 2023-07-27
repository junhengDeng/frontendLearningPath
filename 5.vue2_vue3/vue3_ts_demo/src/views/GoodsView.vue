<template>
  <div>
    <div class="search-box">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="标题">
          <el-input v-model="formInline.user" placeholder="请输入关键字" clearable />
        </el-form-item>
        <el-form-item label="详情">
          <el-input v-model="formInline.user" placeholder="请输入关键字" clearable />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { getGoodsList } from '@/request/api'

export default defineComponent({
  setup() {
    const data = reactive({
    })
    getGoodsList().then(res => {
      console.log(res, 'res')
    })

    return {}
  }
})
</script>

<style scoped></style>