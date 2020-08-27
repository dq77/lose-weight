/*
 * @Author: 刁琪
 * @Date: 2019-09-10 16:31:17
 * @LastEditors: わからないよう
 * @LastEditTime: 2020-08-27 17:24:25
 */ 
import React from 'react'
import { withRouter } from "react-router-dom";
import './index.scss'
import userPic from '../../lib/image/user/user.png'
import rightPic from '../../lib/image/user/right.png'
import menuPic from '../../lib/image/user/menu-right.png'

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'redTab',
      hidden: false,
      fullScreen: false,
    }
  }
  componentDidMount() {
    document.title='我的'
  }


  toSign = () => {
    this.props.history.push({ pathname: `/qiandao` });
  }

  render () {
    return (
      <div className='user-page'>
        <div className='top'>
          <div className='user-info'>
            <div className='left-area'>
              <div className='user-pic'>
                <img className='img' src={userPic} alt='头像' />
              </div>
              <div className='user-info'>
                <div className='name'>登录</div>
                <div className='mobile'>登录后查看更多信息</div>
              </div>
            </div>
            <div className='right-area'>
              <img className='right-img' src={rightPic} alt='right' />
            </div>
          </div>
        </div>
        <div className='mid-area'>
          <div className='window'>
            <div className='item'>
              <div className='num'>--</div>
              <div className='info'>今日体重</div>
            </div>
            <div className='item'>
              <div className='num'>--</div>
              <div className='info'>本周目标</div>
            </div>
            <div className='item'>
              <div className='num'>--</div>
              <div className='info'>本月目标</div>
            </div>
            <div className='item'>
              <div className='num'>--</div>
              <div className='info'>累计已减</div>
            </div>
          </div>
        </div>
        <div className='menu-list'>
          <div className='item' onClick={this.toSign}>
            <div className='text'>每日打卡</div>
            <img className='menu-img' src={menuPic} alt='right' />
          </div>
          <div className='item'>
            <div className='text'>统计列表</div>
            <img className='menu-img' src={menuPic} alt='right' />
          </div>
          <div className='item'>
            <div className='text'>联系客服</div>
            <img className='menu-img' src={menuPic} alt='right' />
          </div>
        </div>
      </div>
    )
  }
}
export default withRouter(User)