import './index.scss'
import React from 'react'
import Banner from '../../components/banner/index'

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bannerList: [
        {url: '/qiandao', img: 'https://zos.alipayobjects.com/rmsportal/IJOtIlfsYdTyaDTRVrLI.png'},
        // {url: '/webList', img: 'https://zos.alipayobjects.com/rmsportal/AiyWuByWklrrUDlFignR.png'},
        {url: '/qiandao', img: 'https://zos.alipayobjects.com/rmsportal/AiyWuByWklrrUDlFignR.png'},
      ]
    }
  }

  componentDidMount() {
    // this.setState({
    //   bannerList: [
    //     {url: '/webList', img: 'AiyWuByWklrrUDlFignR'},
    //     {url: '/goods', img: 'TekJlZRVCjLFexlOCuWn'},
    //     {url: '/goods', img: 'IJOtIlfsYdTyaDTRVrLI'},
    //   ]
    // })
  }


  render () {
    let { bannerList } = this.state
    return (
      <div>
        {bannerList.length !== 0 ? <Banner list={bannerList} />: ''}
      </div>
    )
  }
}
export default Home