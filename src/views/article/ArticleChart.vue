<script setup>
import {ref} from 'vue';
import {articleCategoryListService, articleListsService} from "@/api/article.js";
//文章列表数据模型
const articles = ref([
  {
    "id": 40,
    "title": "东莞一人游玩攻略",
    "content": "东莞一人游玩",
    "coverImg": "https://rockstar-big-event.oss-cn-guangzhou.aliyuncs.com/87b05338-f29d-4cb9-8abc-05c35c1837de.png",
    "state": "已发布",
    "categoryId": 8,
    "articleViews": 18,
    "like": 15,
    "createTime": "2024-06-25T01:53:01",
    "updateTime": "2024-06-25T01:53:01"
  },
  {
    "id": 41,
    "title": "姜萍阿里巴巴12名",
    "content": "姜萍阿里巴巴奥数12名姜萍阿里巴巴奥数12名姜萍",
    "coverImg": "https://rockstar-big-event.oss-cn-guangzhou.aliyuncs.com/45d07a5a-2b47-425d-8159-138721b1ce33.png",
    "state": "已发布",
    "categoryId": 6,
    "articleViews": 12,
    "like": 95,
    "createTime": "2024-06-25T13:57:38",
    "updateTime": "2024-06-25T13:58:22"
  },
  {
    "id": 42,
    "title": "秦始皇的统一大业",
    "content": "秦始皇的统一大业秦始皇的统一大业秦始皇的统一大业",
    "coverImg": "https://rockstar-big-event.oss-cn-guangzhou.aliyuncs.com/e3145462-e184-4cf6-ac85-98394ea286d0.png",
    "state": "已发布",
    "categoryId": 9,
    "articleViews": 67,
    "like": 38,
    "createTime": "2024-06-25T14:09:55",
    "updateTime": "2024-06-25T14:09:55"
  },
  {
    "id": 43,
    "title": "汉服文化的流行",
    "content": "汉服文化的流行汉服文化的流行汉服文化的流行汉服文化的流行",
    "coverImg": "https://rockstar-big-event.oss-cn-guangzhou.aliyuncs.com/f352f99a-6abe-4d40-9693-f7091155baaf.png",
    "state": "已发布",
    "categoryId": 11,
    "articleViews": 70,
    "like": 48,
    "createTime": "2024-06-25T14:12:27",
    "updateTime": "2024-06-25T14:12:27"
  },
  {
    "id": 44,
    "title": "汉武帝的统一大业",
    "content": "汉武帝的统一大业汉武帝的统一大业汉武帝的统一大业汉武帝的统一大业汉武帝的统一大业汉武帝的统一大业",
    "coverImg": "https://rockstar-big-event.oss-cn-guangzhou.aliyuncs.com/816665ff-ce25-4fc4-9266-d5378c3d80ba.png",
    "state": "已发布",
    "categoryId": 9,
    "articleViews": 18,
    "like": 27,
    "createTime": "2024-06-25T14:41:39",
    "updateTime": "2024-06-25T14:41:39"
  }
])
const categorys = ref([
  {
    "id": 3,
    "categoryName": "美食",
    "categoryAlias": "my",
    "createTime": "2023-09-02 12:06:59",
    "updateTime": "2023-09-02 12:06:59"
  },
  {
    "id": 4,
    "categoryName": "娱乐",
    "categoryAlias": "yl",
    "createTime": "2023-09-02 12:08:16",
    "updateTime": "2023-09-02 12:08:16"
  },
  {
    "id": 5,
    "categoryName": "军事",
    "categoryAlias": "js",
    "createTime": "2023-09-02 12:08:33",
    "updateTime": "2023-09-02 12:08:33"
  }
])
// 控制主题
// provide(THEME_KEY, 'dark');
const option = ref({
  aria: {
    show: true
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      crossStyle: {
        color: '#999'
      }
    }
  },
  toolbox: {
    feature: {
      dataView: {show: true, readOnly: false},
      magicType: {show: true, type: ['line', 'bar']},
      restore: {show: true},
      saveAsImage: {show: true}
    }
  },
  legend: {
    data: ['点赞数', '浏览量']
  },
  xAxis: [
    {
      type: 'category',
      data: [],
      axisLabel: {
        rotate: 0, // 旋转标签 90 度使其纵向排列
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
      axisPointer: {
        type: 'shadow'
      }
    }
  ],
  yAxis: [
    {
      type: 'value',
      name: '点赞数',
      min: 0,
      max: 120,
      interval: 20,
      axisLabel: {
        formatter: '{value} 赞'
      }
    },
    {
      type: 'value',
      name: '浏览量',
      min: 0,
      max: 120,
      interval: 20,
      axisLabel: {
        formatter: '{value} 次'
      }
    }
  ],
  series: [
    {
      name: '浏览量',
      type: 'bar',
      tooltip: {
        valueFormatter: function (value) {
          return value + ' 次';
        }
      },
      data: [
        2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 235.6, 162.2, 32.6, 20.0, 6.4, 3.3
      ]
    },
    {
      name: '点赞数',
      type: 'bar',
      tooltip: {
        valueFormatter: function (value) {
          return value + ' 赞';
        }
      },
      data: [
        2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3
      ]
    }
  ]
});
const getArticleCategoryList = async () => {
  //获取所有分类
  let result = await articleCategoryListService();
  categorys.value = result.data
}
getArticleCategoryList();
//文章列表查询
const getArticles = async () => {
  // let params = {
  //   pageNum: pageNum.value,
  //   pageSize: pageSize.value,
  //   categoryId: categoryId.value ? categoryId.value : null,
  //   state: state.value ? state.value : null
  // }
  let result = await articleListsService();
  //渲染列表数据
  articles.value = result.data
  //为列表中添加categoryName属性
  // for (let i = 0; i < articles.value.length; i++) {
  //   let article = articles.value[i];
  //   for (let j = 0; j < categorys.value.length; j++) {
  //     if (article.categoryId === categorys.value[j].id) {
  //       article.categoryName = categorys.value[j].categoryName
  //     }
  //   }
  // }
  //渲染总条数
  // total.value = result.data.total
  updateOptionData()
}
getArticles()
const dataviews = ref([])
const datalike = ref([])
const title = ref([])
const updateOptionData = () => {
  dataviews.value = [];
  // 遍历articles数组
  articles.value.forEach(article => {
    // 将每个article的articleViews值添加到data数组中
    dataviews.value.push(article.articleViews);
  });
  option.value.series[0].data = dataviews;
  datalike.value = [];
  articles.value.forEach(article => {
    datalike.value.push(article.like);
  });
  option.value.series[1].data = datalike;
  title.value = [];
  articles.value.forEach(article => {
    // title.value.push(article.title.length > 3 ? article.title.substring(0, 7) : article.title);
    title.value.push(article.title);
  });
  option.value.xAxis[0].data = title;
};
</script>
<template>
  <e-charts class="chart" :option="option" autoresize/>
</template>
<style scoped>
.chart {
  height: 85vh;
}
</style>
