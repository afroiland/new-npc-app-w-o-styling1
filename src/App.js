import React, { Component } from "react";
import "./App.css";
import "../node_modules/react-tabs/style/react-tabs.css";
import NavTabs from "./components/tabs";

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavTabs />
      </div>
    );
  }
}

export default App;
