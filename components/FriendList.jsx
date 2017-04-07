import React from 'react';
import ReactDom from 'react-dom';


const TravelItem = ({dest, name}) => {
  let visited = dest.visited;
  name = name[0].toUpperCase() + name.slice(1);
  return (<li className='mainEntry'><span className='namebadge'>{name}</span>{dest.name}<span className='visitedbadge'>{visited ? <Check /> : ''}</span></li>);
}

const IterateFriends = ({items}) => {
  for (let name of items) {
    return (<List items={name} />);
  }
}

const List = ({items}) => {
  const travelNode = items[0].destinations.map((dest, index) => {
    return (<TravelItem name={items[0].name} dest={dest} key={index} />)
  });
  travelNode.push(items[1].destinations.map((dest, index) => {
    return(<TravelItem name={items[1].name} dest={dest} key={index} />)
  }))
  return (<ul>{travelNode}</ul>);
}

const Check = () => {
  return (<img className='' src='assets/checkMark.svg' />)
}

class FriendList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return(
      <div id='friendList'>
        <div id='friendListHeader'>
          <img src='assets/friends2.svg' /> 
          Friends 
          <img className='close' onClick={() => this.props.toggleFriendsList()} src='assets/close.svg' />
        </div>
        <div id='friendListBody'>
          <List
            items={this.props.data}
          />
        </div>
      </div>
      )
  }
}

export default FriendList;
