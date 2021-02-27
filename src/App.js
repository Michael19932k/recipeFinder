import React, { Component } from 'react';
import Card from './components/Card/Card';
import TagCard from './components/TagCard/TagCard';
import ContentButton from './components/ContentButton/ContentButton';
import './App.css';



class App extends React.Component {
  constructor(props) {
    super(props);


    this.state = {
      value: '',
      recipes: [],
      categories: ["Beef", "Chicken", "Chocolate", "Lamb", "Duck", "Pasta", "Pork", "Seafood", "Avocado", "Potato", "Fish", "Rice", "Pie", "Goat", "Curry","Ham", "Pizza", "Cream"],
      tags: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.arrayOfIngredients = this.arrayOfIngredients.bind(this);
    this.tagClicked = this.tagClicked.bind(this);

  }
  componentDidMount() {
    if (sessionStorage.getItem("tags")) {
      this.setState({tags:JSON.parse(sessionStorage.getItem("tags"))})
    } else {
      fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
      .then(res => res.json())
      .then((data) => {
        this.setState({ tags: [...this.state.tags, ...data.meals]})
        console.log(data)
        return
      })
      .catch(console.log)

    fetch(`https://www.themealdb.com/api/json/v1/1/list.php?c=list`)
      .then(res => res.json())
      .then((data) => {
        this.setState({ tags: [...this.state.tags, ...data.meals]})
        console.log(data)
        return
      })
      .catch(console.log)
    }
    
  }
componentDidUpdate(){
  // console.log(JSON.parse(sessionStorage.getItem("tags")))
  sessionStorage.setItem("tags", JSON.stringify(this.state.tags));
}
  tagClicked(e,tag) {
    console.log(tag)
    this.setState({value:tag})
    this.handleSubmit(e,tag)
  }


  handleChange(e) {
    this.setState({ value: e.target.value });

  }

  handleSubmit(e,tag) {
    e.preventDefault()
    let searchTerm = this.state.value?this.state.value:tag
    console.log(this.state.value)
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`)
      .then(res => res.json())
      .then((data) => {
        this.setState({ recipes: data.meals })
        this.setState({ value: '' })
        console.log(data)
      })
      .catch(console.log)

  }
  arrayOfIngredients(ingredients, filter) {
    // console.log(ingredients)
    let array = []
    Object.keys(ingredients).forEach(element => {
      if (element.replace(/\d+/g, '') === filter) {
        array.push(ingredients[element])
      }
    });
    return array.filter((recipe) => recipe !== "" &&  recipe !==null && recipe !== " ")
  }
  render() {
    const input = this.state.value;
    let title
    if (input) {
      title = <div>Your best {this.state.value} recipes</div>;
    } else {
      title = <div />;
    }
    return (
      <div className="container">
        <div className="tagContainer">
          {this.state.categories.map((category, i) => {
            return <TagCard key={i} 
            tagClicked={(e)=>this.tagClicked(e,category)}
            id={category} />
          })}
        </div>
        <form onSubmit={(e)=>this.handleSubmit(e)}>
          <label>
            Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
        {title}
        <div></div>
        <div className="Cards">
          {this.state.recipes? this.state.recipes.map((recipe, i) => {
            return <Card key={i}
              title={recipe.strMeal}
              foodImage={recipe.strMealThumb}
              arrayOfIngredients={this.arrayOfIngredients(recipe, "strIngredient")}
              arrayOfMeasures={this.arrayOfIngredients(recipe, "strMeasure")}
              recipeInstructions={recipe.strInstructions}
            />

          }):null}
          



        </div>
      </div>
    );
  }
}
export default App;