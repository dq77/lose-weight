/*
 * @Author: 刁琪
 * @Date: 2020-07-23 20:00:20
 * @LastEditors: わからないよう
 * @LastEditTime: 2020-08-24 16:29:50
 */
import './index.scss'
import React from 'react'
import { List, InputItem, Button, Modal, Toast } from 'antd-mobile';
import { getCurrentTime, getWeekList } from '../../api/qiandao';
import ReactEcharts from 'echarts-for-react';

class WeekList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groupId: '',
      groupName: '',
      week: '', // 当前周数
      weekGroupDatas: [],
      activeItem: {},
      loading: true
    }
  }


  componentDidMount() {
    document.title = '统计列表'
    this.getWeek()
  }
  getWeek = () => {
    getCurrentTime().then(res => {
      if (res.code === '200') {
        this.setState({
          groupId: this.props.match.params.id,
          week: res.data.week
        }, () => {
          this.getList()
        })
      } else {
        Toast.fail(res.msg, 2);
      }
    })
  }

  getList = () => {
    const params = {
      groupId: this.state.groupId,
      week: this.state.week,
      year: new Date().getFullYear()
    }
    getWeekList(params).then(res => {
      if (res.code === '200') {
        this.setState({
          weekGroupDatas: res.data.groupMembers,
          groupName: res.data.groupName,
          loading: false
        })
      } else {
        Toast.fail(res.msg, 2);
      }
    })
  }
  topClick = () => {
    this.setState({
      activeItem: {}
    })
  }
  clickLine = (item) => {
    if (this.state.activeItem.mobile === item.mobile) {
      this.setState({
        activeItem: {}
      })
    } else {
      this.setState({
        activeItem: item
      })
    }
  }
  getColorByData = (item, row, index) => {
    const rowList = row.map(one => { return one.dayWeight > 0 ? one.dayWeight : null })
    let lastWeight = null
    for (let i = index-1;i>=0;i--) {
      if (!lastWeight) {
        lastWeight = rowList[i]
      }
    }
    let className = 'w35'
    if (lastWeight && item.dayWeight > 0) {
      if (item.dayWeight < lastWeight) {
        className += ' green'
      } else {
        className += ' yellow'
      }
    }
    return className
  }
  getEchartOption = () => {
    const item = this.state.activeItem
    return {
      title: {
        text: item.nickname,
        subtext: `身高：${item.height} 　 周目标：${item.weekTargetWeight<0?'-':item.weekTargetWeight} 　 总目标：${item.targetWeight} `,
        left: 'center'
      },
      xAxis: {
        type: 'category',
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      yAxis: {
        type: 'value',
        min: function (value) {
          return value.min - 6;
        },
        max: function (value) {
          return value.max + 6;
        }
      },
      tooltip: {
        trigger: 'axis'
      },
      series: [{
        data: item.weights.map(item => {
          return item.dayWeight > 0 ? item.dayWeight : null
        }),
        type: 'line',
        connectNulls: true,
        itemStyle: {
          color: '#E6A23C',
        },
        lineStyle: {
          color: '#E6A23C'
        }
      }]
    }
  }

  render() {
    const { weekGroupDatas, activeItem, groupName, groupId, loading } = this.state
    return (
      <div className="weeklist-page">
        <div className="top-info" onClick={this.topClick}>
          群名： {groupName} （群id：{groupId}）
        </div>
        <div className="table-area">
          <div className="thead-area">
            <table className="list-table" border="1" cellSpacing="0">
              <thead>
                <tr>
                  <td className="w70">昵称</td>
                  <td className="w35">身高</td>
                  <td className="w35">一</td>
                  <td className="w35">二</td>
                  <td className="w35">三</td>
                  <td className="w35">四</td>
                  <td className="w35">五</td>
                  <td className="w35">六</td>
                  <td className="w35">日</td>
                  <td className="w35">周减</td>
                  <td className="w35">月减</td>
                  <td className="w35">周目标</td>
                  <td className="w35">总目标</td>
                  <td className="w35">入表</td></tr>
              </thead>
            </table>
          </div>
          <div className={`tbody-area ${!!activeItem.weights}`}>
            <table className="list-table" border="1" cellSpacing="0">
              <tbody>
                {weekGroupDatas.map(item => (
                  <tr key={item.mobile} onClick={() => { this.clickLine(item) }} className={item.mobile === activeItem.mobile ? 'active' : ''}>
                    <td className="w70 nickname">{item.nickname}</td>
                    <td className="w35">{item.height}</td>
                    {item.weights.map((one, index) => (
                      <td key={index} className={this.getColorByData(one, item.weights, index)}>
                        {one.dayWeight < 0 ? '-' : one.dayWeight}
                      </td>
                    ))}
                    <td className={item.weekReduce > 0 ? 'green w35' : 'yellow w35'}>{item.weekReduce}</td>
                    <td className={item.monthReduces[0].monthReduces > 0 ? 'green w35' : 'yellow w35'}>{item.monthReduces[0].monthReduce}</td>
                    <td className="w35">{item.weekTargetWeight < 0 ? '-' : item.weekTargetWeight}</td>
                    <td className="w35">{item.targetWeight}</td>
                    <td className="w35">{item.initWeight}</td>
                  </tr>
                ))}
                {loading && (<tr><td>加载中</td></tr>)}
              </tbody>
            </table>
          </div>
        </div>
        {!activeItem.weights && (
          <div className="info-tip">(点击昵称可查看详细数据)</div>
        )}
        {activeItem.weights && (
          <div>
            <ReactEcharts option={this.getEchartOption()} />
          </div>
        )}
      </div>
    )
  }
}
export default WeekList;