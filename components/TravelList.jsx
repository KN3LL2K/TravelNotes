import React from 'react';
import ReactDom from 'react-dom';
import Loading from './Loading.jsx';

const TravelForm = ({addDest}) => {
  let input;

  return (
    <div id='travelForm'>
    <img src='assets/earth.svg' />
      <input placeholder='Where do you want to go?' ref={node => {
        input = node;
      }} />
      <img id='plusBtn' src='assets/plus.svg' onClick={() => {
        addDest(input.value);
        input.value = '';
      }} />
    </div>
    );
};

const Circle = () => {
  return (<img className='checkBox' src='assets/checkBox.svg' />)
}

const Check = () => {
  return (<img className='checkBox' src='assets/checkMark.svg' />)
}

const TravelItem = ({dest, remove, update}) => {
  let visited = dest.visited;
  return (<li className='mainEntry'><span onClick={() => update(dest.name)}>{visited ? <Check /> : <Circle />}</span>{dest.name}<img className='delete' src='assets/delete.svg' onClick={() => remove(dest.name)}/></li>);
}

const List = ({items, remove, update}) => {
    const travelNode = items.map((dest, index) => {
      return (<TravelItem dest={dest} key={index} remove={remove} update={update} />)
    });
    return (<ul>{travelNode}</ul>);
}

class TravelList extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
    };

  }

  render() {
    let isLoading = this.props.loading;
    let isEmpty = () => {
      if (this.props.data.destinations && this.props.data.destinations.length) {
        return false
      } else {
        return true
      }
    }
    return(
      <div id='travelList'>
        <TravelForm addDest={this.props.addDest.bind(this)} />
        <div>
          { isLoading ? <div className='loading'><Loading /></div> : (isEmpty() ? (<div className='quote'><span >'Somewhere, something incredible is waiting to be discovered.' Carl Sagan.</span></div>)  : <List 
            items={this.props.data.destinations}
            remove={this.props.remove}
            update={this.props.update}
            />)}
        </div>
      </div>
      )
  }
}



export default TravelList;
