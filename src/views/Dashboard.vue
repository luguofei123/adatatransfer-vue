<template>
    <div>
        <el-row :gutter="10">
            <el-col :span="8">
                <el-card shadow="hover" class="mgb20" style="height:252px;">
                    <div class="user-info">
                        <img src="../assets/img/img.jpg" class="user-avator" alt="">
                        <div class="user-info-cont">
                            <div class="user-info-name">{{name}}</div>
                            <div>{{role}}</div>
                        </div>
                    </div>
                    <div class="user-info-list">上次登录时间：<span>2018-01-01</span></div>
                    <div class="user-info-list">上次登录地点：<span>东莞</span></div>
                </el-card>
                <el-card shadow="hover" style="height:252px;">
                    <div slot="header" class="clearfix">
                        <span>语言详情</span>
                    </div>
                    Vue
                    <el-progress :percentage="71.3" color="#42b983"></el-progress>
                    JavaScript
                    <el-progress :percentage="24.1" color="#f1e05a"></el-progress>
                    CSS
                    <el-progress :percentage="3.7"></el-progress>
                    HTML
                    <el-progress :percentage="0.9" color="#f56c6c"></el-progress>
                </el-card>
            </el-col>
            <el-col :span="16">
                <el-row :gutter="10" class="mgb20">
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-1">
                                <i class="el-icon-lx-people grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">1234</div>
                                    <div>用户访问量</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-2">
                                <i class="el-icon-lx-notice grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">321</div>
                                    <div>系统消息</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-3">
                                <i class="el-icon-lx-goods grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">5000</div>
                                    <div>数量</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
                <el-card shadow="hover" style="height:403px;">
                    <div slot="header" class="clearfix">
                        <span>待办事项</span>
                        <el-button style="float: right; padding: 3px 0" type="text">添加</el-button>
                    </div>
                    <el-table :data="todoList" :show-header="false" height="304" style="width: 100%;font-size:14px;">
                        <el-table-column width="40">
                            <template slot-scope="scope">
                                <el-checkbox v-model="scope.row.status"></el-checkbox>
                            </template>
                        </el-table-column>
                        <el-table-column>
                            <template slot-scope="scope">
                                <div class="todo-item" :class="{'todo-item-del': scope.row.status}">{{scope.row.title}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column width="60">
                            <template >
                                <i class="el-icon-edit"></i>
                                <i class="el-icon-delete"></i>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="10">
            <el-col :span="12">
                <el-card shadow="hover">
                    <ve-line :data="chartLineData" class="schart"></ve-line>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card shadow="hover">
                    <ve-histogram :data="chartColumnData" class="schart"></ve-histogram>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
  name: 'dashboard',
  data () {
    return {
      name: 'luguofei',
      todoList: [
        {
          title: '今天要修复100个bug',
          status: false
        },
        {
          title: '今天要修复100个bug',
          status: false
        },
        {
          title: '今天要写100行代码加几个bug吧',
          status: false
        },
        {
          title: '今天要修复100个bug',
          status: false
        },
        {
          title: '今天要修复100个bug',
          status: true
        },
        {
          title: '今天要写100行代码加几个bug吧',
          status: true
        }
      ],
      chartLineData: {
        columns: ['日期', '访问用户', '下单用户', '下单率'],
        rows: [
          { '日期': '1/1', '访问用户': 1393, '下单用户': 1093, '下单率': 0.32 },
          { '日期': '1/2', '访问用户': 3530, '下单用户': 3230, '下单率': 0.26 },
          { '日期': '1/3', '访问用户': 2923, '下单用户': 2623, '下单率': 0.76 },
          { '日期': '1/4', '访问用户': 1723, '下单用户': 1423, '下单率': 0.49 },
          { '日期': '1/5', '访问用户': 3792, '下单用户': 3492, '下单率': 0.323 },
          { '日期': '1/6', '访问用户': 4593, '下单用户': 4293, '下单率': 0.78 }
        ]
      },
      chartColumnData: {
        columns: ['日期', '访问用户', '下单用户', '下单率'],
        rows: [
          { '日期': '1/1', '访问用户': 1393, '下单用户': 1093, '下单率': 0.32 },
          { '日期': '1/2', '访问用户': 3530, '下单用户': 3230, '下单率': 0.26 },
          { '日期': '1/3', '访问用户': 2923, '下单用户': 2623, '下单率': 0.76 },
          { '日期': '1/4', '访问用户': 1723, '下单用户': 1423, '下单率': 0.49 },
          { '日期': '1/5', '访问用户': 3792, '下单用户': 3492, '下单率': 0.323 },
          { '日期': '1/6', '访问用户': 4593, '下单用户': 4293, '下单率': 0.78 }
        ]
      }
    }
  },
  computed: {
    role () {
      return this.name === 'admin' ? '超级管理员' : '普通用户'
    }
  }
}

</script>
<style scoped>
    .el-row {
        margin-bottom: 20px;
    }
    .grid-content {
        display: flex;
        align-items: center;
        height: 100px;
    }
    .grid-cont-right {
        flex: 1;
        text-align: center;
        font-size: 14px;
        color: #999;
    }
    .grid-num {
        font-size: 30px;
        font-weight: bold;
    }
    .grid-con-icon {
        font-size: 50px;
        width: 100px;
        height: 100px;
        text-align: center;
        line-height: 100px;
        color: #fff;
    }
    .grid-con-1 .grid-con-icon {
        background: rgb(45, 140, 240);
    }
    .grid-con-1 .grid-num {
        color: rgb(45, 140, 240);
    }
    .grid-con-2 .grid-con-icon {
        background: rgb(100, 213, 114);
    }
    .grid-con-2 .grid-num {
        color: rgb(45, 140, 240);
    }
    .grid-con-3 .grid-con-icon {
        background: rgb(242, 94, 67);
    }
    .grid-con-3 .grid-num {
        color: rgb(242, 94, 67);
    }
    .user-info {
        display: flex;
        align-items: center;
        padding-bottom: 20px;
        border-bottom: 2px solid #ccc;
        margin-bottom: 20px;
    }
    .user-avator {
        width: 120px;
        height: 120px;
        border-radius: 50%;
    }
    .user-info-cont {
        padding-left: 50px;
        flex: 1;
        font-size: 14px;
        color: #999;
    }
    .user-info-cont div:first-child {
        font-size: 30px;
        color: #222;
    }
    .user-info-list {
        font-size: 14px;
        color: #999;
        line-height: 25px;
    }
    .user-info-list span {
        margin-left: 70px;
    }
    .mgb20 {
        margin-bottom: 20px;
    }
    .todo-item {
        font-size: 14px;
    }
    .todo-item-del {
        text-decoration: line-through;
        color: #999;
    }
    .schart {
        width: 100%;
        height: 300px;
    }
</style>
