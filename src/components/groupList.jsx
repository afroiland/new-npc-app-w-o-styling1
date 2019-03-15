import React, { Component } from 'react';

class GroupList extends Component {
  render() {
    return (
      <div className="textList">
        <ul>{this.props.list.map(npc => <li key={npc.name} className="notHidden">{npc.name}</li>)}</ul>
      </div>
    );
  }
}
 
export default GroupList;
