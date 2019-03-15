import React, { Component } from "react";
import NPCList from "./NPCList";
import NPCDetails from "./NPCDetails";
import { generate } from "./../functions/generate"
import { Button, Col, FormControl, FormGroup, Grid, Row } from "react-bootstrap";
import axios from "axios";

const levelRange = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const classes = ["Fighter", "Magic-User", "Cleric", "Thief", "Monk", "Assassin"]

class ViewContent extends Component {
  _isMounted = false;
  state = {
    levelSelect: 1,
    classSelect: "Fighter",
    NPCList: [],
    name: "",
    title: "",
    level: 0,
    npcClass: "",
    race: "",
    currentHP: 0,
    maxHP: 0,
    ac: 0,
    thac0: 0,
    str: 0,
    ex_str: 0,
    int: 0,
    dex: 0,
    con: 0,
    wis: 0,
    cha: 0,
    spellbookLvl_1: "",
    spellbookLvl_2: "",
    spellbookLvl_3: "",
    spellbookLvl_4: "",
    spellbookLvl_5: "",
    memorized: "",
    gold: 0,
    weapon: "",
    items: "",
    probity: 0,
    affiliation: "",
    notes: "",
    selectedNPC: "",
    searchString: ""
  };

  render() {
    const { levelSelect, classSelect, name, title, level, npcClass, race, currentHP, maxHP, ac, thac0, str, ex_str, int, dex, con, wis, cha,
      spellbookLvl_1, spellbookLvl_2, spellbookLvl_3, spellbookLvl_4, spellbookLvl_5, memorized, gold, weapon, items,
      probity, affiliation, notes, selectedNPC, searchString } = this.state;
    return (
      <div>
        <Grid>
          <Row>
            <Col sm={2}>
              <FormGroup>
                <FormControl type="text" placeholder="Search" onChange={e => this.handleSearchChange(e.target.value)} />
              </FormGroup>
              <NPCList list={this.state.NPCList} handleNameClick={this.handleNameClick} selectedNPC={selectedNPC}
                searchString={searchString} />
            </Col>
            <Col sm={8}>
              <Row style={{marginLeft: 5}}>
              <Col md={3}></Col>
                <Col md={3}>
                  <FormControl componentClass="select" placeholder="select" onChange={e => this.setState({ classSelect: e.target.value })}>
                    {classes.map(pcClass => <option key={pcClass} value={pcClass}>{pcClass}</option>)}
                  </FormControl>
                </Col>
                <Col md={2}>
                  <FormControl componentClass="select" placeholder="select" onChange={e => this.setState({ levelSelect: parseInt(e.target.value) })}>
                    {levelRange.map(level => <option key={level} value={level}>{level}</option>)}
                  </FormControl>
                </Col>
              <Button onClick={() => this.handleGenerate(levelSelect, classSelect)}>Generate</Button>
              <Button onClick={() => this.handleSave(this.state)}>Save</Button>
              <Button onClick={() => this.handleClear()}>Clear</Button>
              </Row>
              <br />
              <NPCDetails handleChange={this.handleChange}
                name={name}
                title={title}
                level={level}
                npcClass={npcClass}
                race={race}
                currentHP={currentHP}
                maxHP={maxHP}
                ac={ac}
                thac0={thac0}
                gold={gold}
                str={str}
                ex_str={ex_str}
                int={int}
                dex={dex}
                con={con}
                wis={wis}
                cha={cha}
                spellbookLvl_1={spellbookLvl_1}
                spellbookLvl_2={spellbookLvl_2}
                spellbookLvl_3={spellbookLvl_3}
                spellbookLvl_4={spellbookLvl_4}
                spellbookLvl_5={spellbookLvl_5}
                memorized={memorized}
                weapon={weapon}
                items={items}
                probity={probity}
                affiliation={affiliation}
                notes={notes}
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }

  componentDidMount() {
    this._isMounted = true;
    axios.get('http://localhost:3001/getNPCs').then(res => {
      if (this._isMounted) {
        this.setState({ NPCList: res.data });
      }
    });
  }

  componentDidUpdate() {
    axios.get('http://localhost:3001/getNPCs').then(res => {
      let resDatastring = JSON.stringify(res.data);
      let NPCListString = JSON.stringify(this.state.NPCList);
      let NPCListHasChanged = resDatastring !== NPCListString;
      if (this._isMounted && NPCListHasChanged) {
        this.setState({ NPCList: res.data });
      }
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleSearchChange = (newSearchString) => {
    this.setState({ searchString: newSearchString });
  }

  handleNameClick = (name) => {
    let selectedNPC = this.state.NPCList.filter(obj => {
      return obj.name === name
    });
    this.setState({
      name: selectedNPC[0].name,
      level: selectedNPC[0].level,
      title: selectedNPC[0].title,
      npcClass: selectedNPC[0].class,
      race: selectedNPC[0].race,
      currentHP: selectedNPC[0].currentHP,
      maxHP: selectedNPC[0].maxHP,
      ac: selectedNPC[0].ac,
      thac0: selectedNPC[0].thac0,
      str: selectedNPC[0].str,
      ex_str: selectedNPC[0].ex_str,
      int: selectedNPC[0].intel,
      dex: selectedNPC[0].dex,
      con: selectedNPC[0].con,
      wis: selectedNPC[0].wis,
      cha: selectedNPC[0].cha,
      spellbookLvl_1: selectedNPC[0].SBLvl_1,
      spellbookLvl_2: selectedNPC[0].SBLvl_2,
      spellbookLvl_3: selectedNPC[0].SBLvl_3,
      spellbookLvl_4: selectedNPC[0].SBLvl_4,
      spellbookLvl_5: selectedNPC[0].SBLvl_5,
      memorized: selectedNPC[0].memorized,
      gold: selectedNPC[0].gold,
      weapon: selectedNPC[0].weapon,
      items: selectedNPC[0].items,
      probity: selectedNPC[0].probity,
      affiliation: selectedNPC[0].affiliation,
      notes: selectedNPC[0].notes,
      selectedNPC: selectedNPC[0].name
    });
  }

  handleGenerate = (level, pcClass) => {
    let newNPC = generate(level, pcClass);
    this.setState({
      name: newNPC.name,
      level: newNPC.level,
      title: newNPC.title,
      npcClass: newNPC.npcClass,
      race: newNPC.race,
      currentHP: newNPC.currentHP,
      maxHP: newNPC.maxHP,
      ac: newNPC.ac,
      thac0: newNPC.thac0,
      str: newNPC.str,
      ex_str: newNPC.ex_str,
      int: newNPC.int,
      dex: newNPC.dex,
      con: newNPC.con,
      wis: newNPC.wis,
      cha: newNPC.cha,
      spellbookLvl_1: newNPC.spellbookLvl_1,
      spellbookLvl_2: newNPC.spellbookLvl_2,
      spellbookLvl_3: newNPC.spellbookLvl_3,
      spellbookLvl_4: newNPC.spellbookLvl_4,
      spellbookLvl_5: newNPC.spellbookLvl_5,
      memorized: newNPC.memorized,
      gold: newNPC.gold,
      weapon: newNPC.weapon,
      items: newNPC.items,
      probity: newNPC.probity,
      affiliation: newNPC.affiliation,
      notes: newNPC.notes
    });
  }

  handleSave = (state) => {
    let nameExists = false;
    for (let i = 0; i < state.NPCList.length; i++) {
      if (state.NPCList[i].name === state.name) {
        nameExists = true;
      }
    }
    if (nameExists) {
      axios.put("http://localhost:3001/update", state)
        .then(res => {
          console.log("update res: ", res);
        });
    } else {
      axios.post("http://localhost:3001/add", state)
        .then(res => {
          console.log("add res: ", res);
        });
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleClear = () => {
    this.setState({
      name: "",
      title: "",
      level: 0,
      npcClass: "",
      race: "",
      currentHP: 0,
      maxHP: 0,
      ac: 0,
      thac0: 0,
      str: 0,
      ex_str: 0,
      int: 0,
      dex: 0,
      con: 0,
      wis: 0,
      cha: 0,
      spellbookLvl_1: [""],
      spellbookLvl_2: [""],
      spellbookLvl_3: [""],
      spellbookLvl_4: [""],
      spellbookLvl_5: [""],
      memorized: [""],
      gold: 0,
      weapon: "",
      items: "",
      probity: 0,
      affiliation: "",
      notes: ""
    });
  }
}

export default ViewContent;
