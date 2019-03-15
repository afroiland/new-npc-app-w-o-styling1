import React, { Component } from "react";
import { Tabs, Tab, TabList, TabPanel } from "react-tabs";
import ViewContent from "./viewContent";
import Combat from "./combat";

class NavTabs extends Component {
  render() {
    return (
      <div>
        <Tabs defaultIndex={0}>
          <TabList>
            <Tab>NPCs</Tab>
            <Tab>Combat</Tab>
          </TabList>
          <TabPanel>
            <ViewContent />
          </TabPanel>
          <TabPanel>
              <Combat />
          </TabPanel>
        </Tabs>
      </div>
    );
  }
}

export default NavTabs;
