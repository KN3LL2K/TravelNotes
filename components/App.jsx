import React from 'react';
import ReactDom from 'react-dom';
import Nav from './Nav.jsx';
import Loading from './Loading.jsx';
import TravelList from './TravelList.jsx';
import { Redirect } from 'react-router-dom';
import request from 'superagent';

class App extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
      userData: [],
      friendData: [],
      loading: true,
      showFriends: false,
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
      console.log(res.body)
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

  collapseSidebar() {
    
  }

  signOut() {
    sessionStorage.clear();
    this.props.history.push('/login');
  }


  addDest(dest) {
    const item = {name: dest, visited: false};
    this.state.userData.destinations.push(item);
    this.setState({data: this.state.userData.destinations});
    this.updateData(this.state.userData.destinations);
  }

  handleRemove(name){
    const remainder = this.state.userData.destinations.filter((dest) => {
      if(dest.name !== name) return dest;
    });
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
        console.log(res.body);
      }.bind(this))
  }
 
  render() {
    let showFriends = this.state.showFriends;
    // {showFriends ? : <FriendsList />}
    return(
      <div id='home'>
      <Nav signOut={this.signOut.bind(this)}/>
      <TravelList 
        loading={this.state.loading} 
        data={this.state.userData} 
        addDest={this.addDest.bind(this)}
        remove={this.handleRemove.bind(this)}
        update={this.changeVisited.bind(this)}
      />

      </div>
      )
  }
}




export default App;
