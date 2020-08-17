import { Carousel, WingBlank } from 'antd-mobile';
import React from 'react';
import ReactDOM from 'react-dom';

class Banner extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      imgHeight: 176,
    }
  }

  componentDidMount() {
    
  }

  render() {
    const { list,imgHeight } = this.props;

    return (
      <WingBlank>
        <Carousel
          autoplay={false}
          infinite
          beforeChange={(from, to) => {}}
          afterChange={index => {}}
        >
          {list.map(banner => (
            <a
              key={banner.id+banner.createtime}
              href="#"
              style={{ display: 'inline-block', width: '100%', height: imgHeight }}
            >
              <img
                // src={`https://zos.alipayobjects.com/rmsportal/${val}.png`}
                src={banner.image}
                style={{ width: '100%', verticalAlign: 'top' }}
                onLoad={() => {
                  // fire window resize event to change height
                  window.dispatchEvent(new Event('resize'));
                  this.setState({ imgHeight: 'auto' });
                }}
              />
            </a>
          ))}
        </Carousel>
      </WingBlank>
    );
  }
}

export default Banner;
