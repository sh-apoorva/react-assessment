import React, { Component } from 'react';
import {DataList} from './components/data-list/data-list.component';
import {Modal} from "./components/modal/modal.component";
import PropTypes from "prop-types";
import './App.css';

class App extends Component {
  constructor(){
    super();

    this.state = {
      datalist: [],
      header: [{ title: 'Header', url: '', author: 'Apoorva', created_at: 'YYYY-MM-DD 00:00:00' }],
      searchField: '',
      show: false
    }    
  }

  showModal = e => {
    this.setState({
      show: !this.state.show
    });
  };

  onClose = e => {
    this.props.onClose && this.props.onClose(e);
  };

  componentDidMount(){
    this.getData();

    setInterval(this.getData, 10000); // runs every 5 seconds.
  }

  getData = () => {
    fetch('https://hn.algolia.com/api/v1/search_by_date?tags=story&page=0')
    .then(response => response.json())
    .then(data => this.setState({ datalist: data.hits }));
  }

  renderTableHeader() {
    let header = Object.keys(this.state.header[0])
      return header.map((key, index) => {
        return <th key={index}>{key.toUpperCase}</th>
    })
  }

  render(){
    const {datalist, searchField} = this.state;
    const filteredList = datalist.filter(dta => dta.title.toLowerCase().includes(
      searchField.toLowerCase())
    );

    return (
      <div className="App">
        <input type="search" placeholder="Search" onClick={e => this.setState({ searchField: e.target.value })} />
        <hr/>
        <table id='students'>
          <tbody>
            <tr>{this.renderTableHeader()}</tr>
            <DataList datalist={filteredList} />
          </tbody>
        </table>
        <Modal onClose={this.showModal} show={this.state.show}>Message in Modal</Modal>
        <button onClick={e => {this.showModal();}}> Show Modal </button>
        <br/><br/><br/><br/><br/>
      </div>
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired
};

export default App;
