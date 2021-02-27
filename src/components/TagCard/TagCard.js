import './TagCard.css';
import React, { Component } from 'react';


class TagCard extends React.Component {
    constructor(props) {
        super(props)
        // console.log(props)
    };

    render() {
        return (
            <div className="TagCard">
                <div onClick={(e)=>this.props.tagClicked(e)}>{this.props.id}</div>
            </div>
        );
    }
}
export default TagCard;