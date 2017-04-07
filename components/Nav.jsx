import React from 'react';
import ReactDom from 'react-dom';


class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse:false
    };
  }

  collapseSidebar() {
    this.setState({collapse: !this.state.collapse})
  }

  render() {
    let collapsed = this.state.collapse;
    let isActive = this.props.showFriends;
    return(
      <div id='sidebar' className={collapsed ? '-collapse' : '-show'} >
      <div id='title' onClick={() => this.collapseSidebar()}><span className={collapsed ? 'hidden' : 'show'} >Travel Notes</span><img src='assets/plane.svg'/></div>
      <div id='showFriends' className={isActive ? '-active' : ''} onClick={() => this.props.toggleFriendsList()}><span className={collapsed ? 'hidden' : 'show'}>Show Friends</span><img src='assets/friends.svg'/></div>
      <div id='logOut' onClick={() => this.props.signOut()}><span className={collapsed ? 'hidden' : 'show'}>LOG OUT</span><img src='assets/power.svg' /></div>
      </div>
      )
  }
}

export default Nav;
