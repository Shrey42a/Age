import React from 'react'
import Input from './Input';

function generateArray(start, end) {
  let arr = [];
  for (start; start <= end; start++) {
    arr.push(start);
  }
  return arr;
}

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
//1-31
const days = generateArray(1, 31);
//1900-today
const years = generateArray(1900, (new Date).getFullYear());

//calculate age
function calculateAge(birthday) {
  //milliseconds in a year 1000*24*60*60*365.24 = 31556736000; 
  let today = new Date(),
    //birthay has 'Dec 25 1998'
    dob = new Date(birthday),
    //difference in milliseconds
    diff = today.getTime() - dob.getTime(),
    //convert milliseconds into years
    years = Math.floor(diff / 31556736000),
    //1 day has 86400000 milliseconds
    days_diff = Math.floor((diff % 31556736000) / 86400000),
    //1 month has 30.4167 days
    months = Math.floor(days_diff / 30.4167),
    days = Math.floor(days_diff % 30.4167);

  console.log(`${years} years ${months} months ${days} days`);
  return `${years} years ${months} months ${days} days`;
}


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      day: 25,
      month: 'Dec',
      year: 1998,
      age: '20 years 11 months 28 days'
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDayChange = this.handleDayChange.bind(this);
    this.handleMonthChange = this.handleMonthChange.bind(this);
    this.handleYearChange = this.handleYearChange.bind(this);
  }

  handleDayChange(e) {
    this.setState({
      day: e.target.value
    });
  }

  handleMonthChange(e) {
    this.setState({
      month: e.target.value
    });
  }

  handleYearChange(e) {
    this.setState({
      year: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    const day = this.state.day,
      month = this.state.month,
      year = this.state.year;

    let age = calculateAge(`${month} ${day} ${year}`);
    this.setState({
      age: age
    });
  }
  render() {
    return <div className='flex h-screen py-8 space-y-8 bg-gradient-to-bl from-cyan-200 via-rose-100 to-teal-200 w-full pt-20 flex-col items-center'>
      <h1 className='text-4xl text-gray-500 font-bold uppercase'>Age Calculator</h1>
      <form className='flex flex-col justify-center items-center space-y-4' onSubmit={this.handleSubmit}>
        <div className="flex px-2 py-2 space-x-4">
          <Input arr={days} handleChange={this.handleDayChange} val={this.state.day} />
          <Input arr={months} handleChange={this.handleMonthChange} val={this.state.month} />
          <Input arr={years} handleChange={this.handleYearChange} val={this.state.year} />
        </div>
        <button type='submit' class="custom-btn btn-13">Calculate</button>
      </form>
      <article className='flex space-x-4'>
        <h2 className='text-2xl font-semibold text-gray-800'>Your age is</h2>
        <span className='text-2xl font-semibold text-blue-400'>{this.state.age}</span>
      </article>
    </div>;
  }
}
export default App
