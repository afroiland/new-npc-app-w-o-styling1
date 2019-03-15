import React, { Component } from "react";
import { Col, Form, FormControl, FormGroup, Grid, Row } from "react-bootstrap";

class NPCDetails extends Component {
  render() {
    const { ac, affiliation, cha, con, currentHP, dex, ex_str, gold, handleChange, int, items, level, maxHP, memorized, name,
      notes, npcClass, probity, spellbookLvl_1, spellbookLvl_2, spellbookLvl_3, spellbookLvl_4, spellbookLvl_5, str,
      thac0, title, weapon, wis } = this.props;
    return (
      <div>
        <Grid>
          <Row>
            <Col md={12}>
              <Form horizontal>
                <FormGroup>
                  <Col sm={1} className="fieldTitle">Name: </Col>
                  <Col sm={4}><FormControl name="name" value={name} onChange={(e) => handleChange(e)} /></Col>
                  <Col sm={1} className="fieldTitle">Level: </Col>
                  <Col sm={3}><FormControl name="level" value={level} onChange={(e) => handleChange(e)} /></Col>
                </FormGroup>
                <FormGroup>
                  <Col sm={1} className="fieldTitle">Class: </Col>
                  <Col sm={4}><FormControl name="npcClass" value={npcClass} onChange={(e) => handleChange(e)} /></Col>
                  <Col sm={1} className="fieldTitle">Title: </Col>
                  <Col sm={3}><FormControl name="title" value={title} onChange={(e) => handleChange(e)} /></Col>
                </FormGroup>
                <FormGroup>
                  <Col sm={1} className="fieldTitle">Str: </Col>
                  <Col sm={1}><FormControl name="str" value={str} onChange={(e) => handleChange(e)} /></Col>
                  <Col sm={1}><FormControl style={{ display: this.showEx_str() ? 'block' : 'none' }}
                    name="ex_str" value={ex_str} onChange={(e) => handleChange(e)} /></Col>
                  <Col sm={1} className="fieldTitle">Int: </Col>
                  <Col sm={1}><FormControl name="int" value={int} onChange={(e) => handleChange(e)} /></Col>
                  <Col sm={1} className="fieldTitle">Dex: </Col>
                  <Col sm={1}><FormControl name="dex" value={dex} onChange={(e) => handleChange(e)} /></Col>
                  <Col sm={1}></Col>
                  </FormGroup>
                <FormGroup>
                  <Col sm={1} className="fieldTitle">Con: </Col>
                  <Col sm={1}><FormControl name="con" value={con} onChange={(e) => handleChange(e)} /></Col>
                  <Col sm={2} className="fieldTitle">Wis: </Col>
                  <Col sm={1}><FormControl name="wis" value={wis} onChange={(e) => handleChange(e)} /></Col>
                  <Col sm={1} className="fieldTitle">Cha: </Col>
                  <Col sm={1}><FormControl name="cha" value={cha} onChange={(e) => handleChange(e)} /></Col>
                  <Col sm={1} className="fieldTitle">Gold: </Col>
                  <Col sm={1}><FormControl name="gold" value={gold} onChange={(e) => handleChange(e)} /></Col>
                </FormGroup>
                <FormGroup>
                  <Col sm={1} className="fieldTitle">HP: </Col>
                  <Col sm={1}><FormControl name="currentHP" value={currentHP} onChange={(e) => handleChange(e)} /></Col>
                  <Col sm={1}><FormControl name="maxHP" value={maxHP} onChange={(e) => handleChange(e)} /></Col>
                  <Col sm={1} className="fieldTitle">AC: </Col>
                  <Col sm={1}><FormControl name="ac" value={ac} onChange={(e) => handleChange(e)} /></Col>
                  <Col sm={1} className="fieldTitle">Thac0: </Col>
                  <Col sm={1}><FormControl name="thac0" value={thac0} onChange={(e) => handleChange(e)} /></Col>
                  <Col sm={1} className="fieldTitle">Probity: </Col>
                  <Col sm={1}><FormControl name="probity" value={probity} onChange={(e) => handleChange(e)} /></Col>
                </FormGroup>
                <FormGroup>
                  <Col sm={1} className="fieldTitle">Weapon: </Col>
                  <Col sm={3}><FormControl name="weapon" value={weapon} onChange={(e) => handleChange(e)} /></Col>
                  <Col sm={1} className="fieldTitle">Affiliation: </Col>
                  <Col sm={4}><FormControl name="affiliation" value={affiliation} onChange={(e) => handleChange(e)} /></Col>
                </FormGroup>
                <FormGroup>
                  <Col sm={1} className="fieldTitle">Items: </Col>
                  <Col sm={8}><FormControl name="items" value={items} onChange={(e) => handleChange(e)} /></Col>
                </FormGroup>
                <FormGroup>
                  <Col sm={1} className="fieldTitle">Notes: </Col>
                  <Col sm={8}><FormControl name="notes" value={notes} onChange={(e) => handleChange(e)} /></Col>
                </FormGroup>
                <FormGroup style={{ display: memorized ? 'block' : 'none' }}>
                  <Col sm={1} className="fieldTitle">Memorized: </Col>
                  <Col sm={8}><FormControl name="memorized"
                    value={memorized ? memorized : ""} onChange={(e) => handleChange(e)} /></Col>
                </FormGroup>
                <div style={{ display: this.spellbookExists() ? 'block' : 'none' }}>
                  <p style={{ marginRight: 200 }}>Spellbook</p>
                  <FormGroup style={{ display: spellbookLvl_1 ? 'block' : 'none' }}>
                    <Col sm={1} className="fieldTitle">Lv 1: </Col>
                    <Col sm={8}><FormControl value={spellbookLvl_1} onChange={(e) => handleChange(e)} /></Col>
                  </FormGroup>
                  <FormGroup style={{ display: spellbookLvl_2 ? 'block' : 'none' }}>
                    <Col sm={1} className="fieldTitle">Lv 2: </Col>
                    <Col sm={8}><FormControl value={spellbookLvl_2} onChange={(e) => handleChange(e)} /></Col>
                  </FormGroup>
                  <FormGroup style={{ display: spellbookLvl_3 ? 'block' : 'none' }}>
                    <Col sm={1} className="fieldTitle">Lv 3: </Col>
                    <Col sm={8}><FormControl value={spellbookLvl_3} onChange={(e) => handleChange(e)} /></Col>
                  </FormGroup>
                  <FormGroup style={{ display: spellbookLvl_4 ? 'block' : 'none' }}>
                    <Col sm={1} className="fieldTitle">Lv 4: </Col>
                    <Col sm={8}><FormControl value={spellbookLvl_4} onChange={(e) => handleChange(e)} /></Col>
                  </FormGroup>
                  <FormGroup style={{ display: spellbookLvl_5 ? 'block' : 'none' }}>
                    <Col sm={1} className="fieldTitle">Lv 5: </Col>
                    <Col sm={8}><FormControl value={spellbookLvl_5} onChange={(e) => handleChange(e)} /></Col>
                  </FormGroup>
                </div>
              </Form>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }

  showEx_str() {
    const { npcClass, str } = this.props;
    if (npcClass === "Fighter" && str > 17) {
      return true;
    }
  }

  spellbookExists() {
    if (this.props.spellbookLvl_1) {
      return true;
    }
  }
}

export default NPCDetails;
