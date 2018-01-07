let tasksData = {
  data: [
    // 需求名称：个险渠道新增产品（鹤寿延年养老年金保险）-财务
    {
      id: 15, text: "个险渠道新增产品（鹤寿延年养老年金保险）-财务", name: "张艳丽", start_date: "15-09-2017", duration: 15, order: 10,
      progress: 1, open: true, priority: 0
    },
    {
      id: 16, text: "分析", name: "黄彦娇", start_date: "15-09-2017", duration: 1, order: 10,
      progress: 1, parent: 15, priority: 1
    },
    {
      id: 17, text: "开发", name: "丁健", start_date: "16-09-2017", duration: 4, order: 10,
      progress: 1, parent: 15, priority: 2
    },
    {
      id: 18, text: "开发一", name: "王五", start_date: "16-09-2017", duration: 2, order: 10,
      progress: 1, parent: 17, priority: 3
    },
    {
      id: 19, text: "开发二", name: "赵六", start_date: "20-09-2017", duration: 2, order: 10,
      progress: 1, parent: 17, priority: 3
    },
    {
      id: 20, text: "DAT测试", name: "黄新宇", start_date: "22-09-2017", duration: 2, order: 10,
      progress: 1, parent: 15, priority: 1
    },
    {
      id: 21, text: "UAT测试", name: "黄兆福", start_date: "26-09-2017", duration: 3, order: 10,
      progress: 1, parent: 15, priority: 2
    },
    {
      id: 22, text: "预生产", name: "张三", start_date: "29-09-2017", duration: 2, order: 10,
      progress: 1, parent: 15, priority: 1
    },
    {
      id: 23, text: "生产", name: "李四", start_date: "03-10-2017", duration: 3, order: 10,
      progress: 1, parent: 15, priority: 2
    },
//              需求名称：银保通线上线下上传校验区分改造
    {
      id: 24, text: "个险渠道新增产品（鹤寿延年养老年金保险）-财务", name: "张艳丽", start_date: "22-09-2017", duration: 25, order: 10,
      progress: 1, open: true, priority: 0
    },
    {
      id: 25, text: "分析", name: "黄彦娇", start_date: "22-09-2017", duration: 3, order: 10,
      progress: 1, parent: 24, priority: 1
    },
    {
      id: 26, text: "开发", name: "丁健", start_date: "27-09-2017", duration: 8, order: 10,
      progress: 1, parent: 24, priority: 2
    },
    {
      id: 27, text: "DAT测试", name: "黄新宇", start_date: "07-10-2017", duration: 4, order: 10,
      progress: 1, parent: 24, priority: 1
    },
    {
      id: 28, text: "UAT测试", name: "黄兆福", start_date: "13-10-2017", duration: 5, order: 10,
      progress: 1, parent: 24, priority: 2
    },
    {
      id: 29, text: "预生产", name: "张三", start_date: "20-10-2017", duration: 2, order: 10,
      progress: 1, parent: 24, priority: 1
    },
    {
      id: 30, text: "生产", name: "李四", start_date: "24-10-2017", duration: 3, order: 10,
      progress: 1, parent: 24, priority: 2
    },
//              需求名称：关于开发银联批量代付功能
    {
      id: 1, text: "关于开发银联批量代付功能", name: "张艳丽", start_date: "09-10-2017", duration: 20, order: 10,
      progress: 1, open: true, priority: 0
    },
    {
      id: 2, text: "分析", name: "黄彦娇", start_date: "09-10-2017", duration: 1, order: 10,
      progress: 1, parent: 1, priority: 1
    },
    {
      id: 3, text: "开发", name: "丁健", start_date: "10-10-2017", duration: 5, order: 10,
      progress: 1, parent: 1, priority: 2
    },
    {
      id: 4, text: "DAT测试", name: "黄新宇", start_date: "17-10-2017", duration: 2, order: 10,
      progress: 1, parent: 1, priority: 1
    },
    {
      id: 5, text: "UAT测试", name: "黄兆福", start_date: "19-10-2017", duration: 4, order: 10,
      progress: 1, parent: 1, priority: 2
    },
    {
      id: 6, text: "预生产", name: "张三", start_date: "25-10-2017", duration: 4, order: 10,
      progress: 1, parent: 1, priority: 1
    },
    {
      id: 7, text: "生产", name: "李四", start_date: "31-10-2017", duration: 4, order: 10,
      progress: 1, parent: 1, priority: 2
    },
//            需求名称：团、银手续费佣金功能新建及改造
    {
      id: 8, text: "团、银手续费佣金功能新建及改造", name: "张艳丽", start_date: "15-10-2017", duration: 20, order: 10,
      progress: 1, open: true, priority: 0
    },
    {
      id: 9, text: "分析", name: "黄彦娇", start_date: "15-10-2017", duration: 2, order: 10,
      progress: 1, parent: 8, priority: 1
    },
    {
      id: 10, text: "开发", name: "丁健", start_date: "18-10-2017", duration: 4, order: 10,
      progress: 1, parent: 8, priority: 2
    },
    {
      id: 11, text: "DAT测试", name: "黄新宇", start_date: "24-10-2017", duration: 5, order: 10,
      progress: 1, parent: 8, priority: 1
    },
    {
      id: 12, text: "UAT测试", name: "黄兆福", start_date: "31-10-2017", duration: 3, order: 10,
      progress: 1, parent: 8, priority: 2
    },
    {
      id: 13, text: "预生产", name: "张三", start_date: "03-11-2017", duration: 2, order: 10,
      progress: 1, parent: 8, priority: 1
    },
    {
      id: 14, text: "生产", name: "李四", start_date: "07-11-2017", duration: 4, order: 10,
      progress: 1, parent: 8, priority: 2
    }
  ],
  links: [
//            {id: 2, source: 1, target: 2, type: "1"},
//            {id: 3, source: 1, target: 3, type: "1"},
//            {id: 4, source: 1, target: 4, type: "1"},
//            {id: 5, source: 1, target: 5, type: "1"},
//            {id: 6, source: 1, target: 6, type: "1"},
//            {id: 7, source: 1, target: 7, type: "1"},
//            {id: 9, source: 8, target: 9, type: "1"},
//            {id: 10, source: 8, target: 10, type: "1"},
//            {id: 11, source: 8, target: 11, type: "1"},
//            {id: 12, source: 8, target: 12, type: "1"},
//            {id: 13, source: 8, target: 13, type: "1"},
//            {id: 14, source: 8, target: 14, type: "1"}
  ]
}

export default tasksData;