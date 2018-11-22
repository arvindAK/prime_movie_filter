import React, { Component } from 'react';
import Transition from 'react-transition-group/Transition';
import Range from './inputs/Range';
import Number from './inputs/Number';
import Select from './inputs/Select';

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showFilter: false,
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (e) => {
    this.props.updateParams( e.target.name, e.target.value );
  }

  handleSubmit = (e) => {
    console.log('handling')
    e.preventDefault();
    this.props.handleSubmit();
  }

  componentDidMount() {
    this.setState({showFilter: this.props.showFilter});
  }

  render(){
    return(

      <Transition in={this.state.showFilter} timeout={10} >
        {(status) => (
          <form onSubmit = {this.handleSubmit} className={`filter-${status}`}>
            <Range
             label = 'IMDB' name = 'imdb' max = '10'
             value = { this.props.imdb }
             handleChange = { this.handleChange }
            />
            <Range
              label = 'Amazon stars' name = 'star_rating' step = '0.5' max = '5'
              value = { this.props.starRating }
              handleChange = { this.handleChange }
            />
              <Number
               label = 'Minimum Number of Amazon Reviews' name = 'star_count'
               value = { this.props.starCount }
               placeholder = 'Max Number: 3172; Paddington'
               handleChange = { this.handleChange }
              />
              <Select
                handleChange = { this.handleChange }
              />
              <Number
                label = 'Year Released After' name = 'year'
                value = { this.props.year }
                placeholder = 'Earlest Movie: 1916; 20,000 Leagues Under The Sea'
                handleChange = { this.handleChange }
              />
            <button>Search</button>
          </form>
        )}
      </Transition>
    )
  }
}

export default Filter;
