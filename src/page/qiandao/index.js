import './index.scss'
import React from 'react'
import { List, InputItem, Button, Modal, Toast } from 'antd-mobile';
import { createForm } from 'rc-form';
import { writeInfo } from '../../api/qiandao';
import {dateFormat} from '../../utils/date'

class Qiandao extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      today: '',
      week: '',
      mobile: '',
      groupCode: '',
      nickname: '',
      height: '',
      targetWeight: '',
      monthTargetWeight: '',
      weekTargetWeight: '',
      todayWeight: '',
    }
  }


  componentDidMount() {
    document.title='每日打卡'
    const qiandaoInfo = localStorage.getItem('qiandaoInfo');
    if (qiandaoInfo) {
      this.setState({
        mobile: qiandaoInfo.mobile,
        groupCode: qiandaoInfo.groupCode,
        nickname: qiandaoInfo.nickname,
        height: qiandaoInfo.height,
        targetWeight: qiandaoInfo.targetWeight,
        monthTargetWeight: qiandaoInfo.monthTargetWeight,
        weekTargetWeight: qiandaoInfo.weekTargetWeight,
      })
    }
    this.getDay()
  }

  getDay = () => {
    const today = dateFormat(new Date(), 'yyyy年MM月dd日')
    const week = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'][new Date().getDay()]
    this.setState({ today: today, week: week })
  }

  changemobile = (mobile) => { this.setState({ mobile: mobile }) }
  changegroupCode = (groupCode) => { this.setState({ groupCode: groupCode }) }
  changenickname = (nickname) => { this.setState({ nickname: nickname }) }
  changeheight = (height) => { this.setState({ height: height }) }
  changetargetWeight = (targetWeight) => { this.setState({ targetWeight: targetWeight }) }
  changemonthTargetWeight = (monthTargetWeight) => { this.setState({ monthTargetWeight: monthTargetWeight }) }
  changeweekTargetWeight = (weekTargetWeight) => { this.setState({ weekTargetWeight: weekTargetWeight }) }
  changetodayWeight = (todayWeight) => { this.setState({ todayWeight: todayWeight }) }
  validate = () => {
    if (!this.state.mobile) { return '请输入手机号' }
    if (!this.state.groupCode) { return '请输入群号' }
    if (!this.state.nickname) { return '请输入昵称' }
    if (!this.state.height) { return '请输入身高' }
    if (!this.state.targetWeight) { return '请输入目标体重' }
    if (!this.state.monthTargetWeight) { return '请输入月目标体重' }
    if (!this.state.weekTargetWeight) { return '请输入周目标体重' }
    if (!this.state.todayWeight) { return '请输入今日体重' }
    return 200
  }
  signIn = () => {
    const valid = this.validate()
    if (valid !== 200) {
      Toast.fail(valid, 2);
      return
    }
    const param = {
      groupCode: this.state.groupCode,
      nickname: this.state.nickname,
      mobile: this.state.mobile,
      height: this.state.height,
      targetWeight: this.state.targetWeight,
      weekTargetWeight: this.state.weekTargetWeight,
      monthTargetWeight: this.state.monthTargetWeight,
      todayWeight: this.state.todayWeight
    }
    writeInfo(param).then(res => {
      if (res.code === '200') {
        Modal.alert('打卡成功', '恭喜您，打卡成功！', [
          { text: '返回', onPress: () => {}},
          { text: '查看周报', onPress: () => this.toPaper() },
        ])
      } else {
        Toast.fail(res.msg, 2);
      }
    })
  }
  toPaper = () => {
    this.props.history.push({ pathname: '/webList', state: {} });
  }
  render () {
    const { today, week, mobile, groupCode, nickname, height, targetWeight, monthTargetWeight, weekTargetWeight, todayWeight } = this.state
    return (
      <div className="qiandao-page">
        <div className="top-info">
          <span onClick={this.show}>{today}</span> <span className="week">{week}</span>
        </div>
        <div className="form-area">
          <List>
            <InputItem labelNumber={6} onChange={this.changemobile} type="phone" value={mobile} placeholder="请输入手机号">手机号码</InputItem>
            <InputItem labelNumber={6} onChange={this.changegroupCode} type="digit" value={groupCode} placeholder="请输入群号">群号</InputItem>
            <InputItem labelNumber={6} onChange={this.changenickname} value={nickname} placeholder="请输入昵称">昵称</InputItem>
            <InputItem labelNumber={6} onChange={this.changeheight} type="digit" value={height} placeholder="请输入身高" extra="cm">身高</InputItem>
            <InputItem labelNumber={6} onChange={this.changetargetWeight} type="digit" value={targetWeight} placeholder="请输入目标体重" extra="kg">目标体重</InputItem>
            <InputItem labelNumber={6} onChange={this.changemonthTargetWeight} type="digit" value={monthTargetWeight} placeholder="请输入月目标体重" extra="kg">月目标体重</InputItem>
            <InputItem labelNumber={6} onChange={this.changeweekTargetWeight} type="digit" value={weekTargetWeight} placeholder="请输入周目标体重" extra="kg">周目标体重</InputItem>
            <InputItem labelNumber={6} onChange={this.changetodayWeight} type="digit" value={todayWeight} placeholder="请输入今日体重" extra="kg">今日体重</InputItem>
          </List>
        </div>
        <div className="sign-area">
          <Button type="primary" onClick={this.signIn}>打卡</Button>
        </div>
      </div>
    )
  }
}
export default createForm()(Qiandao);