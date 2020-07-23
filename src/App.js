import React from 'react';
import 'antd-mobile/dist/antd-mobile.css';
import './App.scss';
import { TabBar } from 'antd-mobile';
import homeIcon from './lib/image/home/home-icon.png';
import homeIconSelected from './lib/image/home/home-icon-selected.png';
import userIcon from './lib/image/home/user-icon.png';
import userIconSelected from './lib/image/home/user-icon-selected.png';
import Home from './page/home/index.js';
import User from './page/user/index.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'home',
    }
  }

  changeTab = (tabName) => {
    this.setState({
      selectedTab: tabName,
    });
  }

  
  render () {
    return (
      <div className="App">
        <TabBar unselectedTintColor="#949494" tintColor="#33A3F4" barTintColor="white" >
          <TabBar.Item title="首页" key="home"
            icon={<img className="home-icon" src={homeIcon} alt="" />}
            selectedIcon={<img className="home-icon" src={homeIconSelected} alt="" />}
            selected={this.state.selectedTab === 'home'}
            onPress={ () => {this.changeTab('home') }}
          >
            <Home />
          </TabBar.Item>
          <TabBar.Item title="我的" key="user"
            icon={<img className="home-icon" src={userIcon} alt="" />}
            selectedIcon={<img className="home-icon" src={userIconSelected} alt="" />}
            selected={this.state.selectedTab === 'user'}
            onPress={ () => {this.changeTab('user') }}
          >
            <User />
          </TabBar.Item>
        </TabBar>
      </div>
    );
  }
}

export default App;
