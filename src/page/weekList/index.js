/*
 * @Author: 刁琪
 * @Date: 2020-07-23 20:00:20
 * @LastEditors: わからないよう
 * @LastEditTime: 2020-09-01 14:01:33
 */
import React from 'react'
import { Toast, DatePicker, List } from 'antd-mobile';
import ReactEcharts from 'echarts-for-react';
import { getWeekList } from '../../api/qiandao';
import './index.scss'

class WeekList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groupId: this.props.match.params.id,
      groupName: '',
      date: new Date(),
      weekGroupDatas: [],
      activeItem: {},
      loading: true
    }
  }


  componentDidMount() {
    document.title = '周统计列表'
    this.getList()
  }

  getList = () => {
    const params = {
      groupId: this.state.groupId,
      week: this.getWeekOfYear(),
      year: this.state.date.getFullYear()
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
    let className = 'w46'
    if (lastWeight && item.dayWeight > 0) {
      if (item.dayWeight < lastWeight) {
        className += ' green'
      } else if (item.dayWeight > lastWeight) {
        className += ' yellow'
      }
    }
    return className
  }
  getWeekOfYear = () => {
    const today = this.state.date
    let firstDay = new Date(today.getFullYear(),0, 1);
    const dayOfWeek = firstDay.getDay(); 
    let spendDay= 1;
    if (dayOfWeek !== 0) {
      spendDay=7-dayOfWeek+1;
    }
    firstDay = new Date(today.getFullYear(),0, 1+spendDay);
    const d =Math.ceil((today.valueOf()- firstDay.valueOf())/ 86400000);
    const result =Math.ceil(d/7);
    return result+1;
  }

  changeWeek = (date) => {
    this.setState({ date }, () => { this.getList() })
  }

  editSign = () => {
    localStorage.removeItem('signFlag');
    this.props.history.replace({ pathname: `/qiandao` });
  }

  toMonth = () => {
    this.props.history.replace({ pathname: `/monthList/${this.state.groupId}` });
  }

  getEchartOption = () => {
    const item = this.state.activeItem
    return {
      title: {
        text: item.nickname,
        subtext: `身高：${item.height} 　 周目标：${item.weekTargetWeight<0?'-':item.weekTargetWeight} 　 总目标：${item.targetWeight} `,
        left: 'center',
        top: 4
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
      grid: {
        bottom: 40,
        height: 180,
        top: 50
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
    const { weekGroupDatas, activeItem, groupName, groupId, loading, date } = this.state
    return (
      <div className='weeklist-page'>
        <List className='top-list'>
          <List.Item arrow='horizontal' onClick={this.toMonth} extra={'前往月统计'}>
            {groupName} ({groupId})
          </List.Item>
          <DatePicker mode='date' value={date} onChange={date => this.changeWeek(date)} maxDate={new Date()}>
            <List.Item arrow='horizontal'>选择日期</List.Item>
          </DatePicker>
        </List>
        <div className='table-area'>
          <div className='thead-area'>
            <table className='list-table' border='1' cellSpacing='0'>
              <thead>
                <tr>
                  <td className='w70'>昵称</td>
                  <td className='w46 brline'>身高</td>
                  <td className='w46'>一</td>
                  <td className='w46'>二</td>
                  <td className='w46'>三</td>
                  <td className='w46'>四</td>
                  <td className='w46'>五</td>
                  <td className='w46'>六</td>
                  <td className='w46 brline'>日</td>
                  <td className='w46'>周减</td>
                  <td className='w46'>月减</td>
                  <td className='w46'>周目标</td>
                  <td className='w46'>月目标</td>
                  <td className='w46'>总目标</td>
                  <td className='w46'>入表</td></tr>
              </thead>
            </table>
          </div>
          <div className={`tbody-area ${!!activeItem.weights}`}>
            <table className='list-table' border='1' cellSpacing='0'>
              <tbody>
                {weekGroupDatas.map(item => (
                  <tr key={item.mobile} onClick={() => { this.clickLine(item) }} className={item.mobile === activeItem.mobile ? 'active' : ''}>
                    <td className='w70 nickname'>{item.nickname}</td>
                    <td className='w46 brline'>{item.height}</td>
                    {item.weights.map((one, index) => (
                      <td key={index} className={`${this.getColorByData(one, item.weights, index)} ${index===6 && 'brline'}`}>
                        {one.dayWeight < 0 ? '-' : one.dayWeight}
                      </td>
                    ))}
                    <td className={`w46 ${item.weekReduce > 0 ? 'green' : ''} ${item.weekReduce < 0 ? 'yellow' : ''}`}>{item.weekReduce}</td>
                    <td className={`w46 ${item.monthReduces[0].monthReduce > 0 ? 'green' : ''} ${item.monthReduces[0].monthReduce < 0 ? 'yellow' : ''}`}>{item.monthReduces[0].monthReduce}</td>
                    <td className='w46'>{item.weekTargetWeight < 0 ? '-' : item.weekTargetWeight}</td>
                    <td className='w46'>{item.monthTargetWeights[0].monthTargetWeight || '-'}</td>
                    <td className='w46'>{item.targetWeight}</td>
                    <td className='w46'>{item.initWeight}</td>
                  </tr>
                ))}
                {loading && (<tr><td>加载中</td></tr>)}
              </tbody>
            </table>
          </div>
        </div>
        {!activeItem.weights && (
          <div className='btm-area'>
            <div className='edit' onClick={this.editSign}>修改打卡</div>
            <div>(点击昵称可查看详细数据)</div>
          </div>
        )}
        {activeItem.weights && (
          <div className='echart-area'>
            <ReactEcharts option={this.getEchartOption()} />
          </div>
        )}
      </div>
    )
  }
}
export default WeekList;