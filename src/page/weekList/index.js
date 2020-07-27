/*
 * @Author: 刁琪
 * @Date: 2020-07-23 20:00:20
 * @LastEditors: 刁琪
 * @LastEditTime: 2020-07-27 17:20:30
 */ 
import './index.scss'
import React from 'react'
import { List, InputItem, Button, Modal, Toast } from 'antd-mobile';
import { getCurrentTime } from '../../api/qiandao';
import ReactEcharts from 'echarts-for-react';

class WeekList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      yemianId: '',
      week: '', // 当前周数
      qunList: [],
      activeItem: {}
    }
  }


  componentDidMount() {
    document.title='统计列表'
    this.getWeek()
  }
  getWeek = () => {
    getCurrentTime().then(res => {
      if (res.code === '200') {
        this.setState({
          yemianId: this.props.match.params.id,
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
    this.setState({
      qunList: [
        { id: 1, nickname: 'diaoqi', height: '174', week: ['80', '79', '80', '79', '80', '79', '78'], zhoujian: '2', yuejian: '15', zhoubiao: '70', zongbiao: '60', rubiao: '80' },
        { id: 2, nickname: '可爱的咖啡屋', height: '160', week: ['66', '66', '65', '65', '66', '63', '65'], zhoujian: '1', yuejian: '-14', zhoubiao: '55', zongbiao: '60', rubiao: '64' },
        { id: 3, nickname: '哈哈', height: '165', week: ['98', '99', '100', '100', '95', '97', '94'], zhoujian: '4', yuejian: '28', zhoubiao: '90', zongbiao: '70', rubiao: '120' },
        { id: 4, nickname: '哈哈哈', height: '166', week: ['93', '93', '94.54', '100', '94', '96', '91'], zhoujian: '-3', yuejian: '28', zhoubiao: '90', zongbiao: '70', rubiao: '120' },
        { id: 5, nickname: '哈哈哈哈', height: '167', week: ['95', '95', '92', '102', '93', '97', '98'], zhoujian: '0', yuejian: '28', zhoubiao: '90', zongbiao: '70', rubiao: '120' },
        { id: 12, nickname: '可爱的咖啡屋', height: '160', week: ['66', '66', '65', '65', '66', '63', '65'], zhoujian: '1', yuejian: '-14', zhoubiao: '55', zongbiao: '60', rubiao: '64' },
        { id: 13, nickname: '哈哈', height: '165', week: ['98', '99', '100', '100', '95', '97', '94'], zhoujian: '4', yuejian: '28', zhoubiao: '90', zongbiao: '70', rubiao: '120' },
        { id: 14, nickname: '哈哈哈', height: '166', week: ['93', '93', '94.54', '100', '94', '96', '91'], zhoujian: '-3', yuejian: '28', zhoubiao: '90', zongbiao: '70', rubiao: '120' },
        { id: 15, nickname: '哈哈哈哈', height: '167', week: ['95', '95', '92', '102', '93', '97', '98'], zhoujian: '0', yuejian: '28', zhoubiao: '90', zongbiao: '70', rubiao: '120' },
        { id: 22, nickname: '可爱的咖啡屋', height: '160', week: ['66', '66', '65', '65', '66', '63', '65'], zhoujian: '1', yuejian: '-14', zhoubiao: '55', zongbiao: '60', rubiao: '64' },
        { id: 23, nickname: '哈哈', height: '165', week: ['98', '99', '100', '100', '95', '97', '94'], zhoujian: '4', yuejian: '28', zhoubiao: '90', zongbiao: '70', rubiao: '120' },
        { id: 24, nickname: '哈哈哈', height: '166', week: ['93', '93', '94.54', '100', '94', '96', '91'], zhoujian: '-3', yuejian: '28', zhoubiao: '90', zongbiao: '70', rubiao: '120' },
        { id: 25, nickname: '哈哈哈哈', height: '167', week: ['95', '95', '92', '102', '93', '97', '98'], zhoujian: '0', yuejian: '28', zhoubiao: '90', zongbiao: '70', rubiao: '120' },
        { id: 32, nickname: '可爱的咖啡屋', height: '160', week: ['66', '66', '65', '65', '66', '63', '65'], zhoujian: '1', yuejian: '-14', zhoubiao: '55', zongbiao: '60', rubiao: '64' },
        { id: 33, nickname: '哈哈', height: '165', week: ['98', '99', '100', '100', '95', '97', '94'], zhoujian: '4', yuejian: '28', zhoubiao: '90', zongbiao: '70', rubiao: '120' },
        { id: 34, nickname: '哈哈哈', height: '166', week: ['93', '93', '94.54', '100', '94', '96', '91'], zhoujian: '-3', yuejian: '28', zhoubiao: '90', zongbiao: '70', rubiao: '120' },
        { id: 35, nickname: '哈哈哈哈', height: '167', week: ['95', '95', '92', '102', '93', '97', '98'], zhoujian: '0', yuejian: '28', zhoubiao: '90', zongbiao: '70', rubiao: '120' },
      ]
    })
  }
  topClick = () => {
    this.setState({
      activeItem: {}
    })
  }
  clickLine = (item) => {
    this.setState({
      activeItem: item
    })
  }
  getColorByData = (item, index) => {
    const nowData = item.week[index]-0
    const lastData = item.week[index-1]-0
    let className = 'w35'
    if (lastData > nowData) {
      className += ' green'
    } else if (lastData < nowData) {
      className += ' yellow'
    }
    return className
  }
  getEchartOption = () => {
    const item = this.state.activeItem
    return {
      title: {
          text: item.nickname,
          subtext: `身高：${item.height} 　 周目标：${item.zhoubiao} 　 总目标：${item.zongbiao} `,
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
        data: item.week,
        type: 'line',
        itemStyle: {
          color:'#E6A23C',
        },
        lineStyle : {
          color:'#E6A23C'
        }
      }]
    }
  }

  render () {
    const { qunList, activeItem } = this.state
    return (
      <div className="weeklist-page">
        <div className="top-info" onClick={this.topClick}>
          群名： 要么瘦要么死 （群id：123456）
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
          <div className={`tbody-area ${!!activeItem.week}`}>
            <table className="list-table" border="1" cellSpacing="0">
              <tbody>
                { qunList.map( item => (
                  <tr key={item.id} onClick={() => {this.clickLine(item)}} className={item.id === activeItem.id ? 'active' : ''}>
                    <td className="w70">{item.nickname}</td>
                    <td className="w35">{item.height}</td>
                    { item.week.map((one, index) => (
                      <td key={index} className={this.getColorByData(item, index)}>
                        {one}
                      </td>
                    ))}
                    <td className={item.zhoujian>0 ? 'green w35' : 'yellow w35'}>{item.zhoujian}</td>
                    <td className={item.yuejian>0 ? 'green w35' : 'yellow w35'}>{item.yuejian}</td>
                    <td className="w35">{item.zhoubiao}</td>
                    <td className="w35">{item.zongbiao}</td>
                    <td className="w35">{item.rubiao}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div />
        { activeItem.week && (
          <div>
            <ReactEcharts option={this.getEchartOption()} />
          </div>
        )}
      </div>
    )
  }
}
export default WeekList;