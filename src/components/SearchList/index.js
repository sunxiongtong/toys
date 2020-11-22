import { ListView } from 'antd-mobile';
import React from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from "react-router-dom";
import http from '@/http.js';
import { shop, banner } from '@/urls.js';
import { connect } from 'react-redux';
class SearchList extends React.Component {
  constructor(props) {
    super(props);

    this.listRef = React.createRef();
  }

  handleClick = (e) => {
    const { token } = this.props;

    if (!token) {
      this.props.history.push('./login')
      return;
    }
    const { productid, salerid } = e.currentTarget.dataset;

    this.props.history.push(`/detail?productid=${productid}&salerid=${salerid}&scrollTop=${this.listRef.current.scrollTop}&key=${this.props.keys}`);

  }

  componentDidMount() {
    
  }

  componentDidUpdate(preProps){
    
    if(this.props.records && preProps.records.length !=this.props.records && window.sessionStorage.getItem('scrollTop')){
      console.log(this.props.records,preProps)
      setTimeout(() => {
        let scrollTop = window.sessionStorage.getItem('scrollTop');
        let scrollBol = window.sessionStorage.getItem('scrollBol');
  
        if (scrollBol) {
          console.log(scrollTop)
  
          this.listRef.current.scrollTop = +scrollTop;
          console.log(this.listRef.current)
  
          window.sessionStorage.removeItem('scrollTop');
          window.sessionStorage.setItem('scrollBol', false);
        }
      }, 200)
    }
  }

  render() {
    const { records = [], scrollEvent, type } = this.props;

    return (
      <ul className="list" data-type={type} onScroll={scrollEvent} ref={this.listRef}>
        {
          records.map((item, index) => {
            return (
              <li
                key={item.productid + item.code + item.name + item.hot + index}
                data-productid={item.productid}
                data-salerid={item.salerid}
                onClick={this.handleClick.bind(this)}>
                <div className="shop-img-wrap">
                  <img src={item.image} className="shop-img"></img>
                </div>
                <div className="shop-content-wrap">
                  <div className="shop-name">{item.name}</div>
                  <div className="shop-content">
                    {
                      item.tags.split(',').map((tag) => {
                        let className = '';
                        if (tag.indexOf('推荐') > -1) {
                          className = 'tag recommend';
                        } else if (tag.indexOf('上新') > -1) {
                          className = 'tag shangxin';
                        } else if (tag.indexOf('版权') > -1) {
                          className = 'tag copyright';
                        } else {
                          className = 'tag all';
                        }
                        return <span key={item.productid + tag + item.name} className={className}>{tag.substr(0, 2)}</span>
                      })
                    }
                  </div>
                  <div className="hot-wrap">
                    <span>热度:</span>
                    <span>{item.hot}</span>
                  </div>
                </div>
              </li>
            )
          })
        }
      </ul>
    )
  }
}
export default withRouter(connect(
  state => ({
    token: state.userinfo.token,
  }),
  {
    // userInfoActions: userInfoActionsFromOtherFile.updateToken
  }
)(SearchList));