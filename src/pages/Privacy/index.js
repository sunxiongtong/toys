import React from 'react';
import NavBar from '@/components/NavBar';
import './index.scss';
import { connect } from 'react-redux';

class Privacy extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return <div className="user-wrap">
            <div className="navwrap">
                <NavBar title='隐私政策' showIcon={true}></NavBar>
            </div>
            <div className="content">
                <p>
                    1、为了便于您了解您在使用我们的服务时，我们需要收集的信息类型与用途，我们将结合具体服务向您逐一说明。
                </p>
                <p>
                    2、为了向您提供服务所需，我们会按照合法、正当、必要的原则收集您的信息。
                </p>
                <p>
                    3、如果为了向您提供服务而需要将您的信息共享至第三方，我们将评估该第三方收集信息的合法性、正当性、必要性。我们将要求第三方对您的信息采取保护措施并且严格遵守相关法律法规与监管要求。另外，我们会按照法律法规及国家标准的要求以确认协议、具体场景下的文案确认、弹窗提示等形式征得您的同意或确认第三方已经征得您的同意。
                </p>
                <p>
                    4、如果为了向您提供服务而需要从第三方获取您的信息，我们将要求第三方说明信息来源，并要求第三方保障其提供信息的合法性；如果我们开展业务需进行的个人信息处理活动超出您原本向第三方提供个人信息时的授权范围，我们将征得您的明确同意。
                </p>
                <p>
                    5、您可以通过本政策介绍的方式访问和管理您的信息、设置隐私功能、注销您的账户或进行投诉举报。
                </p>
            </div>
        </div>
    }


}

export default connect(
    state => ({

    }),
    {

    }
)(Privacy)