<script setup>
import {ref} from 'vue';
import {articleCategoryListService} from "@/api/article.js";
import {PerformanceListService} from "@/api/user.js";

// 控制主题
// provide(THEME_KEY, 'dark');
const performances = ref([
  {
    "id": 1,
    "date": "2024-06-03",
    "userId": 30,
    "viewsPf": 18,
    "likePf": 6,
    "articlePf": 30
  },
  {
    "id": 2,
    "date": "2024-06-24",
    "userId": 30,
    "viewsPf": 100,
    "likePf": 68,
    "articlePf": 60
  }
])
const option = ref({
  title: {
    text: '员工业绩'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#6a7985'
      }
    }
  },
  legend: {
    data: ['浏览量', '点赞数', '文章数', '总业绩']
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      boundaryGap: false,
      data: ['2024-06-03', '2024-06-24', '2024-06-20', '2024-06-21', '2024-06-22', '2024-06-23', '2024-06-19'],
      axisLabel: {
        rotate: 90, // 旋转标签 90 度使其纵向排列
        // margin_top: 0,
        // 如果需要，还可以设置其他属性来调整标签的显示，比如 margin、textStyle 等
        textStyle: {
          // 设置文本样式，比如字体大小、颜色等
          fontSize: 13, // 根据需要调整字体大小
          color: '#333' // 设置文本颜色
        },
        interval: 0, // 设置标签的间隔为 0，以确保所有标签都显示（注意这可能会导致标签重叠）
        // 如果标签重叠，你可以考虑使用 interval 属性来控制显示的间隔
        // 或者使用 axisTick 的属性来隐藏刻度线以减少视觉干扰
      },
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ],
  series: [
    {
      name: '浏览量',
      type: 'line',
      stack: 'Total',
      areaStyle: {},
      emphasis: {
        focus: 'series'
      },
      data: [100, 132, 101, 134, 90, 230, 210]
    },
    {
      name: '点赞数',
      type: 'line',
      stack: 'Total',
      areaStyle: {},
      emphasis: {
        focus: 'series'
      },
      data: [100, 182, 191, 234, 290, 330, 310]
    },
    {
      name: '文章数',
      type: 'line',
      stack: 'Total',
      areaStyle: {},
      emphasis: {
        focus: 'series'
      },
      data: [100, 232, 201, 154, 190, 330, 410]
    }, {
      name: '总业绩',
      type: 'line',
      silent: true, // 设置该系列为不可交互
      // stack: 'Total',
      label: {
        show: true,
        position: 'top'
      },
      areaStyle: {
        color: 'rgba(255,255,255,0)' // 设置区域颜色为红色
      },
      emphasis: {
        focus: 'series'
      },
      data: [100, 232, 201, 154, 190, 330, 410]
    },
  ]
});
const getPerformanceList = async () => {
  //获取所有分类
  let result = await PerformanceListService();
  performances.value = result.data
  updatePerformance()
  console.log(option)
}
getPerformanceList();

const article_pf = ref([])
const views_pf = ref([])
const like_pf = ref([])
const date_pf = ref([])
const pf = ref([])
const updatePerformance = () => {
  date_pf.value = [];
  // 遍历articles数组
  performances.value.forEach(performance => {
    // 将每个article的articleViews值添加到data数组中
    date_pf.value.push(performance.date);
  });
  option.value.xAxis[0].data = date_pf;

  views_pf.value = [];
  let views_pf_i = 0;
  // 遍历articles数组
  performances.value.forEach(performance => {
    views_pf_i = views_pf_i + performance.viewsPf
    // 将每个article的articleViews值添加到data数组中
    views_pf.value.push(views_pf_i);
  });
  option.value.series[0].data = views_pf;

  like_pf.value = [];
  let like_pf_i = 0;
  performances.value.forEach(performance => {
    like_pf_i = like_pf_i + performance.likePf
    like_pf.value.push(like_pf_i);
  });
  option.value.series[1].data = like_pf;

  article_pf.value = [];
  let article_pf_i = 0;
  performances.value.forEach(performance => {
    article_pf_i = article_pf_i + performance.articlePf
    article_pf.value.push(article_pf_i);
  });
  option.value.series[2].data = article_pf;

  pf.value = [];
  let pf_i = 0;
  performances.value.forEach(performance => {
    pf_i = pf_i + 10 + performance.articlePf + performance.likePf + performance.viewsPf
    pf.value.push(pf_i);
  });
  option.value.series[3].data = pf;
};
</script>
<template>
  <e-charts class="chart" :option="option" autoresize/>
</template>
<style scoped>
.chart {
  height: 80vh;
}
</style>
