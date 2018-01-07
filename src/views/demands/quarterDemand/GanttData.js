let data = {
  data: [
    {
      id: 1, text: "个险渠道新增产品（鹤寿延年养老年金保险）-财务", name: "张艳丽", start_date: "15-09-2016", duration: 15, order: 10,
      progress1: 0.2, blank1: 0.1,progress2: 0.2, blank2: 0.1,progress3:0.4, open: true, priority: 0, status: 0
    },
    {
      id: 2, text: "掌上国联业务人员销售资质校验", name: "张艳丽", start_date: "19-09-2016", duration: 20, order: 10,
      progress1: 0.1, blank1: 0.1,progress2: 0.2, blank2: 0.1,progress3:0.5, open: true, priority: 0, status: 1
    },
    {
      id: 3, text: "借意险契约团险网点信息优化需求", name: "张艳丽", start_date: "21-09-2016", duration: 17, order: 10,
      progress1: 0.1, blank1: 0.1,progress2: 0.3, blank2: 0.1,progress3:0.4, open: true, priority: 0, status: 0
    },
    {
      id: 4, text: "国联金融APP(A端)代理人注册线上化及APP（C端）可以下销售国联人寿产品", name: "张艳丽", start_date: "23-09-2016", duration: 25, order: 10,
      progress1: 0.1, blank1: 0.1,progress2: 0.4, blank2: 0.1,progress3:0.3, open: true, priority: 0, status: 1
    },
    {
      id: 5, text: "共保系统开发（契约、保全和理赔部分）", name: "张艳丽", start_date: "26-09-2016", duration: 35, order: 10,
      progress1: 0.1, blank1: 0.1,progress2: 0.3, blank2: 0.1,progress3:0.4, open: true, priority: 0, status: 2
    },
    {
      id: 6, text: "个险渠道新增产品（鹤寿延年养老年金保险）-财务", name: "张艳丽", start_date: "29-09-2016", duration: 21, order: 10,
      progress1: 0.2, blank1: 0.1,progress2: 0.3, blank2: 0.1,progress3:0.3, open: true, priority: 0, status: 0
    },
    {
      id: 7, text: "个险渠道新增产品（鹤寿延年养老年金保险）-理赔", name: "张艳丽", start_date: "09-10-2016", duration: 19, order: 10,
      progress1: 0.3, blank1: 0.1,progress2: 0.2, blank2: 0.1,progress3:0.3, open: true, priority: 0, status: 2
    },
    {
      id: 8, text: "个险渠道新增产品（鹤寿延年养老年金保险）-保全", name: "张艳丽", start_date: "13-10-2016", duration: 15, order: 10,
      progress1: 0.1, blank1: 0.1,progress2: 0.4, blank2: 0.1,progress3:0.3, open: true, priority: 0, status: 1
    },
    {
      id: 9, text: "个险渠道新增产品（鹤寿延年养老年金保险）-契约", name: "张艳丽", start_date: "15-10-2016", duration: 17, order: 10,
      progress1: 0.1, blank1: 0.1,progress2: 0.3, blank2: 0.1,progress3:0.4, open: true, priority: 0, status: 0
    },
    {
      id: 10, text: "个险渠道新增产品（鹤寿延年养老年金保险）-渠道", name: "张艳丽", start_date: "18-10-2016", duration: 31, order: 10,
      progress1: 0.1, blank1: 0.1,progress2: 0.3, blank2: 0.1,progress3:0.4, open: true, priority: 0, status: 0
    },
    {
      id: 11, text: "银保渠道新增产品（盛世传承终身寿险）-信托部分", name: "张艳丽", start_date: "21-10-2016", duration: 23, order: 10,
      progress1: 0.15, blank1: 0.1,progress2: 0.2, blank2: 0.1,progress3:0.45, open: true, priority: 0, status: 0
    },
    {
      id: 12, text: "个险渠道新增产品（鹤寿延年养老年金保险）-理赔", name: "张艳丽", start_date: "26-10-2016", duration: 19, order: 10,
      progress1: 0.3, blank1: 0.1,progress2: 0.2, blank2: 0.1,progress3:0.3, open: true, priority: 0, status: 1
    },
    {
      id: 13, text: "个险渠道新增产品（鹤寿延年养老年金保险）-保全", name: "张艳丽", start_date: "29-10-2016", duration: 15, order: 10,
      progress1: 0.1, blank1: 0.1,progress2: 0.4, blank2: 0.1,progress3:0.3, open: true, priority: 0, status: 0
    },
    {
      id: 14, text: "个险渠道新增产品（鹤寿延年养老年金保险）-契约", name: "张艳丽", start_date: "02-11-2016", duration: 17, order: 10,
      progress1: 0.1, blank1: 0.1,progress2: 0.3, blank2: 0.1,progress3:0.4, open: true, priority: 0, status: 1
    },
    {
      id: 15, text: "个险渠道新增产品（鹤寿延年养老年金保险）-渠道", name: "张艳丽", start_date: "09-11-2016", duration: 31, order: 10,
      progress1: 0.1, blank1: 0.1,progress2: 0.25, blank2: 0.2,progress3:0.35, open: true, priority: 0, status: 0
    },
    {
      id: 16, text: "银保渠道新增产品（盛世传承终身寿险）-信托部分", name: "张艳丽", start_date: "18-10-2017", duration: 23, order: 10,
      progress1: 0.15, blank1: 0.1,progress2: 0.2, blank2: 0.1,progress3:0.45, open: true, priority: 0, status: 2
    }
  ]
}
export default data;