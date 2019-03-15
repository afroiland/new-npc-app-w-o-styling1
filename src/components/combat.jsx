import React, { Component } from 'react';
import SearchBar from "./searchbar";
import NPCList from "./NPCList";
import GroupList from "./groupList";
import { Col, FormControl, FormGroup, Grid, Row } from "react-bootstrap";
import axios from "axios";
import { fight } from "./../functions/combat";

class Combat extends Component {
  state = {
    NPCList: [],
    groupA: [],
    groupB: [],
    selectedNPC: "",
    combatLog: [],
    searchString: ""
  }

  render() {
    return (
      <div>
        <SearchBar selectedNPC={this.state.selectedNPC} handleClick={this.handleButtonClick} doAFight={this.doAFight} />
        <Grid>
          <Row>
            <Col sm={2}>
              <FormGroup>
                <FormControl type="text" placeholder="Search" onChange={e => this.handleSearchChange(e.target.value)} />
              </FormGroup>
              <NPCList list={this.state.NPCList} handleNameClick={this.handleNameClick} selectedNPC={this.state.selectedNPC}
                searchString={this.state.searchString} />
            </Col>
            <Col sm={3}>
              <p>Group A</p>
              <GroupList list={this.state.groupA} />
            </Col>
            <Col sm={3}>
              <p>Group B</p>
              <GroupList list={this.state.groupB} />
            </Col>
            <Col sm={4}>
              <p>Log / Results</p>
              <ul className="combatLog">{this.state.combatLog.map((string, index) => <li key={index} className="notHidden">{string}</li>)}</ul>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }

  componentDidMount() {
    axios.get('http://localhost:3001/getNPCs').then(res => {
      this.setState({ NPCList: res.data });
    });
  }

  handleSearchChange = (newSearchString) => {
    this.setState({ searchString: newSearchString });
  }

  handleNameClick = (name) => {
    this.setState({ selectedNPC: name });
  }

  handleButtonClick = (buttonId) => {
    if (buttonId === "clear") {
      this.setState({ groupA: [], groupB: [], combatLog: [] });
      return;
    }

    if (!this.state.selectedNPC) {
      return;
    }

    if (buttonId === "remove") {
      let newGroupA = this.state.groupA.filter(obj => {
        return obj.name !== this.state.selectedNPC
      });
      let newGroupB = this.state.groupB.filter(obj => {
        return obj.name !== this.state.selectedNPC
      });
      this.setState({ groupA: newGroupA, groupB: newGroupB });
      return;
    }

    let selectedNPCObject = this.state.NPCList.filter(obj => {
      return obj.name === this.state.selectedNPC;
    });
    let newGroupA = this.state.groupA;
    let newGroupB = this.state.groupB;
    
    if (buttonId === "A") {
      if (this.state.groupA.some(obj => obj.name === this.state.selectedNPC)) {
        return;
      };
      newGroupA.push(selectedNPCObject[0]);
      newGroupB = newGroupB.filter(obj => {
        return obj.name !== this.state.selectedNPC;
      });
    } else if (buttonId === "B") {
      if (this.state.groupB.some(obj => obj.name === this.state.selectedNPC)) {
        return;
      };
      newGroupB.push(selectedNPCObject[0]);
      newGroupA = newGroupA.filter(obj => {
        return obj.name !== this.state.selectedNPC;
      });
    }
    this.setState({ groupA: newGroupA, groupB: newGroupB});
  }

  doAFight = () => {
    let log = fight(this.state.groupA, this.state.groupB);
    this.setState({ combatLog: log });
  }
}

export default Combat;