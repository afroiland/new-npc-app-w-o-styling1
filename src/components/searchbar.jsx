import React, { Component } from "react";
import { Button, Navbar } from "react-bootstrap";

class SearchBar extends Component {
  render() {
    const { doAFight, handleClick } = this.props;
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Navbar.Form pullLeft>
            <Button onClick={() => handleClick("A")}>Add to Group A</Button>
            <Button onClick={() => handleClick("B")}>Add to Group B</Button>
            <Button onClick={() => handleClick("remove")}>Remove Selected</Button>
            <Button onClick={() => handleClick("clear")}>Clear All</Button>
            <Button onClick={() => doAFight()}>Fight</Button>
          </Navbar.Form>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default SearchBar;
