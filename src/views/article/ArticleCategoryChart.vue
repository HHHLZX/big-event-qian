<script setup>
// import {use} from 'echarts/core';
// import {CanvasRenderer} from 'echarts/renderers';
// import {PieChart} from 'echarts/charts';
// import {
//   TitleComponent,
//   TooltipComponent,
//   LegendComponent,
// } from 'echarts/components';
// import VChart, {THEME_KEY} from 'vue-echarts';
import {ref} from 'vue';
import {articleCategoryListService} from "@/api/article.js";

// use([
//   CanvasRenderer,
//   PieChart,
//   TitleComponent,
//   TooltipComponent,
//   LegendComponent,
// ]);

// 控制主题
// provide(THEME_KEY, 'dark');
// 获取所有分类信息
const categorys = ref([
  {
    "id": 4,
    "categoryName": "人文",
    "categoryAlias": "rw",
    "createUser": 30,
    "articleQuantity": 4,
    "createTime": "2024-06-18 21:19:50",
    "updateTime": "2024-06-18 21:19:50"
  },
  {
    "id": 5,
    "categoryName": "军事",
    "categoryAlias": "js",
    "createUser": 30,
    "articleQuantity": 1,
    "createTime": "2024-06-18 21:20:08",
    "updateTime": "2024-06-18 21:20:08"
  },
  {
    "id": 6,
    "categoryName": "时事",
    "categoryAlias": "ss",
    "createUser": 30,
    "articleQuantity": 0,
    "createTime": "2024-06-18 21:20:57",
    "updateTime": "2024-06-18 21:20:57"
  },
  {
    "id": 7,
    "categoryName": "美食",
    "categoryAlias": "ms",
    "createUser": 30,
    "articleQuantity": 1,
    "createTime": "2024-06-18 21:21:12",
    "updateTime": "2024-06-18 21:21:12"
  },
  {
    "id": 8,
    "categoryName": "旅游",
    "categoryAlias": "ly",
    "createUser": 30,
    "articleQuantity": 4,
    "createTime": "2024-06-18 21:21:29",
    "updateTime": "2024-06-18 21:21:29"
  },
  {
    "id": 9,
    "categoryName": "历史",
    "categoryAlias": "ls",
    "createUser": 30,
    "articleQuantity": 0,
    "createTime": "2024-06-18 22:22:44",
    "updateTime": "2024-06-18 22:22:44"
  },
  {
    "id": 11,
    "categoryName": "文化",
    "categoryAlias": "wenhua",
    "createUser": 30,
    "articleQuantity": 0,
    "createTime": "2024-06-18 23:03:43",
    "updateTime": "2024-06-19 12:47:31"
  }
])
const option = ref({
  tooltip: {
    trigger: 'item'
  },
  legend: {
    top: '5%',
    left: 'center'
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2
      },
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 40,
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: false
      },
      // 数据
      data: []
    }
  ]
});
const getAllCategory = async () => {
  let result = await articleCategoryListService();
  categorys.value = result.data;
  updateOptionData();
}
getAllCategory();
const data = ref([
  {value: 1048, name: '人文'},
  {value: 735, name: '军事'},
  {value: 580, name: '时事'},
  {value: 484, name: '美食'},
  {value: 300, name: '旅游'},
  {value: 300, name: '历史'},
  {value: 300, name: '文化'},
])
const updateOptionData = () => {
  data.value = categorys.value.map(category => ({
    value: category.articleQuantity,
    name: category.categoryName
  }));
  // 将新数据赋值给 option.value.series[0].data
  option.value.series[0].data = data;
};
// 现在调用 updateOptionData 来更新 option


</script>
<template>
  <e-charts class="chart" :option="option" autoresize/>
</template>
<style scoped>
.chart {
  height: 70vh;
}
</style>