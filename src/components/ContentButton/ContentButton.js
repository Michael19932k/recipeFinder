import './ContentButton.css';
import React, { Component } from 'react';



class ContentButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isToggleOn: false};
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState(state => ({
          isToggleOn: !state.isToggleOn
        }));
        this.props.changeStyle(this.state.isToggleOn)
      }


    render() {
        return (
            <div className="ContentButton" onClick={this.handleClick}>
               {this.state.isToggleOn ? 'ON' : 'OFF'}
            </div>
        );
    }
}
export default ContentButton;