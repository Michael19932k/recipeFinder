import './Card.css';
import React, { Component } from 'react';
import ContentButton from '../ContentButton/ContentButton';



class Card extends React.Component {
    constructor(props) {
        super(props)
        // console.log(props)
        this.state = {
            style : true
        }
        this.changeStyle = this.changeStyle.bind(this);
    };

    changeStyle(arg) {
        console.log(arg)
      this.setState({style:arg})
    }

    render() {
        return (
            <div className="Card">
                <div className="mealPicContainer">
                    <div className="mealTitle">{this.props.title}</div>
                    <img className="mealPic" src={this.props.foodImage} />
                </div>
                {this.state.style ? <div className="arrayIngredientsMeasures">
                    {this.props.arrayOfIngredients.map((elem, i) => {
                        // console.log(elem)
                        return <div key={i}>
                            <div className="arrayOfIngredients">{elem}</div>
                            {this.props.arrayOfMeasures.length > i ? <div className="arrayOfMeasures">{this.props.arrayOfMeasures[i]}</div> : null}
                        </div>
                    })}
                </div> : <div className="recipeInstructions">{this.props.recipeInstructions}</div>}
                <ContentButton changeStyle={(arg) => this.changeStyle(arg)} />

            </div>
        );
    }
}
export default Card;