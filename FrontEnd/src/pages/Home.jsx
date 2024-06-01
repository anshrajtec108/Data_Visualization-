import React from 'react'
import DisplayData from '../components/DisplayData'
import Pagination from 'react-bootstrap/Pagination';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import ChartsList from '../components/ChartsList';
import TopData from '../components/TopData';

function Home() {

    // let active = 2;
    // let items = [];
    // for (let number = 1; number <= 100; number++) {
    //     items.push(
    //         <Pagination.Item key={number} active={number === active}>
    //             {number}
    //         </Pagination.Item>,
    //     );
    // }

  return (
    <div className="tab-container">
      <Tabs defaultActiveKey="Charts" id="justify-tab-example" className="mb-3" fill>
        <Tab eventKey="Charts" title="Charts">
          <ChartsList />
        </Tab>
        <Tab eventKey="Data" title="Data">
          <TopData />
        </Tab>
      </Tabs>
    </div>

  )
}

export default Home
