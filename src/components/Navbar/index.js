import { NavBar, Icon } from 'antd-mobile';
import React from 'react';
import { withRouter } from "react-router-dom";

class MyNavbar extends React.Component {
    
    render() {
        const {title = 'Title',showIcon = false} = this.props;

        return (
            <NavBar
                mode="light"
                icon={showIcon && <Icon type="left" />}
                onLeftClick={() => this.props.history.goBack()}
            >{title}</NavBar>
        )
    }
}

export default withRouter(MyNavbar);