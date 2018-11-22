import React, { Component } from 'react';

const date = new Date();
const year = date.getFullYear();

class Number extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: undefined
    }
    this.handleChange = this.handleChange.bind(this);
  }

  isNumeric = (val) => {
    const re = /^\d+$/;
    return re.test(val);
  }

  handleChange = (e) => {
    if (this.isNumeric(e.target.value) || e.target.value === '') {
      console.log('either number or blank')
      this.setState({ error: undefined });
      this.props.handleChange(e);
    }
  }

  render() {
    return(
      <div className="number">
        <input
          type="number"
          placeholder = {this.props.placeholder}
          value = { this.props.value }
          onChange={this.handleChange}
          name={this.props.name}
        />
      <label htmlFor={this.props.name}>{this.props.label}</label>
      {this.state.error &&
      <span className='error'>{this.state.error}</span>}
      </div>
    )
  }
}

export default Number;
