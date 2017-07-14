import React, { Component } from 'react';
import './style.scss';

class OptionItem extends Component {
    static defaultProps = {
        active: false
    }

    handleClick = () => {
        this.props.onChange(this.refs.checkbox.checked);
    }

    render() {
        const { active } = this.props;
        return (
            <div className="option-item">
                <div className="desc">{this.props.children}</div>
                <input type="checkbox" checked={active} ref="checkbox" className="ios-switch" onChange={this.handleClick} />
            </div>
        );
    }
}

export default OptionItem;
