import './index.scss'
import React from 'react'
import { NavBar, Icon } from 'antd-mobile';
import rightIcon from '../../lib/image/webList/rightIcon.png'

class WebList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      webList: [
        { content: '高中选科报告-PC端', url: 'https://dq77.github.io/senior-choose-pc/html/index.html' },
        { content: '高中选科报告-移动端', url: 'https://dq77.github.io/senior-choose-m/html/index.html' },
        { content: '伴考云数据-PC端', url: 'https://dq77.github.io/bankaoyun-pc/teacher/html/index.html' },
        { content: '伴考云数据-移动端', url: 'https://dq77.github.io/bankaoyun-m/teacher/html/index.html' },
        { content: '美仓官网', url: 'http://www.diaoqii.xyz/mc/' },
        { content: '美仓后台管理系统', url: 'https://dq77.github.io/mcadmin/index.html' },
        { content: '教师报告-PC端', url: 'https://dq77.github.io/teacher-report/html/index.html' },
      ],
    }
  }

  goBack = () => {
    this.props.history.goBack();
  }

  render () {
    let { webList } = this.state
    return (
      <div className="webListPage">
        <NavBar mode="light" icon={<Icon type="left" />} onLeftClick={this.goBack}>项目列表</NavBar>
        <div className="webList">
          {
            webList.map((item, index) => {
              return (
                <div className="webItem" key={item.url}>
                  <a className="link" href={item.url}>{item.content}</a>
                  <img className="rightIcon" src={rightIcon} alt="rightIcon" />
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}
export default WebList