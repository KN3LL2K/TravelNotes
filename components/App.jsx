import React from 'react';
import ReactDom from 'react-dom';
import Nav from './Nav.jsx';
import Loading from './Loading.jsx';
import TravelList from './TravelList.jsx';
import FriendList from './FriendList.jsx';
import { Redirect } from 'react-router-dom';
import request from 'superagent';

class App extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
      userData: [],
      friendData: [],
      loading: true,
      showFriendsList: false,
      collapse: false
    };
  }

  componentDidMount() {
    this.getTravelers();
  }

  getTravelers() {
    request
      .get('/travelers')
      .set('Authorization', sessionStorage.token)
      .then(function(res) {
      this.filterTravelData(res.body);
    }.bind(this))
  }

  filterTravelData(data) {
    const userID = sessionStorage.id;
    const userTrips = data.filter((dest) => {
      if(dest.id === +userID) return dest;
    });
    const friendsTrips = data.filter((dest) => {
      if(dest.id !== +userID) return dest;
    });
    this.setState({friendData: friendsTrips, userData: userTrips[0], loading: false});
  }

  signOut() {
    sessionStorage.clear();
    this.props.history.push('/login');
  }


  addDest(dest) {
    const item = {name: dest, visited: false};
    let data = this.state.userData.destinations || [];
    data.push(item);
    this.setState({userData: {destinations: data}});
    this.updateData(data);
  }

  handleRemove(name){
    let remainder = this.state.userData.destinations.filter((dest) => {
      if(dest.name !== name) return dest;
    });
    if (!remainder) {
      remainder = [];
    }
    this.setState({userData: {destinations: remainder}});
    this.updateData(remainder);
  }

  changeVisited(name) {
    const updatedData = this.state.userData.destinations.filter((dest, index, array) => {
      if (dest.name === name) {
        dest.visited = !dest.visited;
      } return array;
    })
    this.setState({userData: {destinations: updatedData}});
    this.updateData(updatedData);
  }

  updateData(data) {
    data = data || this.state.userData.destinations;
    const id = sessionStorage.id;
    const token = sessionStorage.token;
    request
      .patch('/travelers')
      .set({id: id, Authorization: token})
      .send({destinations: data})
      .then(function(res) {
        this.setState({userData: {destinations: res.body.destinations}})
      }.bind(this))
  }

  toggleFriendsList() {
    this.setState({showFriendsList: !this.state.showFriendsList})
  }
 
  render() {
    let showFriends = this.state.showFriendsList;
    let data = this.state.userData || {};
    return(
      <div id='home'>
      <Nav toggleFriendsList={this.toggleFriendsList.bind(this)} showFriends={showFriends} signOut={this.signOut.bind(this)}/>
      <TravelList 
        loading={this.state.loading} 
        data={data} 
        addDest={this.addDest.bind(this)}
        remove={this.handleRemove.bind(this)}
        update={this.changeVisited.bind(this)}
      />
      {showFriends ? <FriendList data={this.state.friendData} toggleFriendsList={this.toggleFriendsList.bind(this)} /> : ''}
      </div>
      )
  }
}




export default App;
