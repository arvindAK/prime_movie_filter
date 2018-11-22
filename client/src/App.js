import React, { Component } from 'react';
import './App.css';
import Filter from './components/Filter';
import Count from './components/Count';
import Movies from './components/Movies';
import Limit from './components/Limit';

class App extends Component {
  constructor(){
  super();
  this.state = {
    movies:       [],
    showFilter:   false,
    offset:       40,
    imdb:         7,
    year:         '',
    star_rating:  4,
    star_count:   50,
    genre:        undefined
  };

  this.handleChange = this.handleChange.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
}

  componentDidMount() {
    this.handleSubmit();
  };

  handleChange = (key, value) => {
    this.setState({ [key] : value });
  }

  toggleFilter = () => {
    this.setState({ showFilter: !this.state.showFilter });
  }

  showMore = () => {
    let query = this.buildQuery();
    query += `&offset=${this.state.offset}`
    this.setState({ offset: this.state.offset + 40 })
    fetch(query)
      .then(res => res.json())
      .then(result => this.setState({ movies: this.state.movies.concat(result.rows) }));
  }

  buildQuery = () => {
    const params = {
      imdb:         this.state.imdb,
      year:         this.state.year,
      star_rating:  this.state.star_rating,
      star_count:   this.state.star_count,
      genre:        this.state.genre,
    };
    let query = `/api/movies?`;
    query += Object.keys(params)
      .filter(a => typeof params[a] !== 'undefined')
      .map(k => `${k}=${params[k]}`)
      .join('&');

      return query;
  }

  handleSubmit = () => {
    const query = this.buildQuery();
    fetch(query)
      .then(res => res.json())
      .then(result => this.setState({ movies: result.rows }));
  };

  render() {
    return (
      <div className="App">
        <h1>Amazon Prime Movie Filter</h1>
        <button className='toggle_filter' onClick={this.toggleFilter}>Filter</button>
        {this.state.showFilter && <Filter
          filterMovies = { this.filterMovies }
          updateParams = { this.handleChange }
          handleSubmit = { this.handleSubmit }
          showFilter = { this.state.showFilter }
          starRating = { this.state.star_rating }
          starCount = { this.state.star_count }
          year = { this.state.year }
          imdb = { this.state.imdb }
        />}
        <Count moviesLength = { this.state.movies.length } />
        <Movies movies = { this.state.movies } />
        {this.state.movies.length>=40 && <Count moviesLength = { this.state.movies.length } />}
        {this.state.movies.length>=this.state.offset && <Limit showMore = { this.showMore } />}
      </div>
    );
  };
};

export default App;
