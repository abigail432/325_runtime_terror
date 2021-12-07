import './App.css';
import React, {useEffect, useState, useRef} from 'react';
import Form from 'react-bootstrap/Form';
import { BarChart, Bar, Cell, XAxis, YAxis, Label, LabelList, Tooltip, ResponsiveContainer } from 'recharts';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const initialFloors = [
  //busy:
  //not busy : 0
  //moderate : 1
  //busy: 2

  //type:
  //quiet floor: 0
  //group floor: 1
  //other: 2
  {floor: 0, busy: 2, type:1, title: "Learning Commons"},
  {floor: 1, busy: 2, type:1, title: "Info Desk"},
  {floor: 2, busy: 0, type:0, title: "Quiet Study"},
  {floor: 3, busy: 1, type:1, title: "Staff Offices"},
  {floor: 4, busy: 2, type:2, title: "Library Adminstration Offices"},
  {floor: 5, busy: 0, type:0, title: "Graduate Commons & Quiet Study"},
  {floor: 6, busy: 0, type:2, tilte:"Digital Scholarship Center"},
  {floor: 7, busy: 2, type:2, tilte:"IT Instructional Media Lab"},
  {floor: 8, busy: 2, type:0, tilte:"Quiet Study, Multi Stall Restroom"},
  {floor: 9, busy: 0, type:1, tilte:"Group Study"},
  {floor: 10, busy: 2, type:2, tilte:"Learning Resource Center"},
  {floor: 11, busy: 2, type:0, tilte:"Quiet Study"},
  {floor: 12, busy: 2, type:2, tilte:"Supplemental Instruction"},
  {floor: 13, busy: 2, type:2, tilte:"Writing Program"},
  {floor: 14, busy: 0, type:0, tilte:"Quiet Study"},
  {floor: 15, busy: 1, type:1, tilte:"Group Study"},
  {floor: 16, busy: 1, type:2, tilte:"IT Computer Classrooms"},
  {floor: 17, busy: 1, type:0, tilte:"Quiet Study"},
  {floor: 18, busy: 2, type:1, tilte:"Group Study"},
  {floor: 19, busy: 2, type:2, tilte:"Office of Scholarly Communication"},
  {floor: 20, busy: 2, type:0, tilte:"Quiet Study"},
  {floor: 21, busy: 2, type:1, tilte:"Group Study"},
  {floor: 22, busy: 2, type:2, tilte:"W. E. B. Du Bois Center"},
  {floor: 23, busy: 2, type:1, tilte:"Group Study"},
  {floor: 24, busy: 2, type:2, tilte:"Archives Storage"},
  {floor: 25, busy: 2, type:2, tilte:"Special Collections"},
  {floor: 26, busy: 2, type:2, tilte:"Faculty Commons"}
]


function App() {
  const [sortedFloors, setSorted] = useState(initialFloors);
  const [floors, setFloors] = useState(initialFloors);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [selectedSort, setSelectedSort] = useState("1");
  const [selectedFilter, setSelectedFilter] = useState("0");

  const render = () => {
      let board = document.getElementById('library');
      if(!board) {
        board = window.document.createElement('div');
        board.id = "library";
      }
      for(let i = 0; i < floors.length; i++){

      const gridItem = window.document.createElement('div');
      gridItem.id = i;
      gridItem.classList.add('library-floor');
      gridItem.classList.add('border');
      
      const floor = floors[i].floor;
      const busy = floors[i].busy;
      const type = floors[i].type;
      const title = floors[i].title;

      if(i == 0) gridItem.classList.add('rounded-top');
      if(i == floors.length - 1) gridItem.classList.add('rounded-bottom');

      if(busy == 2) {
          gridItem.classList.add('bg-danger');
          gridItem.classList.add('border-danger');
      }
      else if(busy == 1) {
          gridItem.classList.add('bg-warning');
          gridItem.classList.add('border-warning');
      }
      else if(busy == 0) {
          gridItem.classList.add('bg-success');
          gridItem.classList.add('border-success');
      }

      gridItem.classList.add('bg-opacity-50');
      const text = title? window.document.createTextNode("Floor " + floor + " - " + title) : window.document.createTextNode("Floor " + floor);
      gridItem.appendChild(text);

      board?.appendChild(gridItem);
      }  
  }


  const compareBusinessUp = ( a, b )  => {
    if ( a.busy < b.busy ){
      return -1;
    }
    if ( b.busy > a.busy ){
      return 1;
    }
    return 0;
  }

  const compareBusinessDown = ( a, b )  => {
    if ( a.busy > b.busy ){
      return -1;
    }
    if ( b.busy < a.busy ){
      return 1;
    }
    return 0;
  }


  const handleSort = (type) => {
    if(type === "1") { //floor num  
      setSorted(initialFloors);
      setFloors(initialFloors);
      setSelectedSort("1")
    }

    else if(type === "2") { //not busy to busy
      const newFloors = [...sortedFloors];
      newFloors.sort(compareBusinessUp);
      setSorted(newFloors);
      setFloors(newFloors);
      setSelectedSort("2")
    }
    else if(type === "3") { //busy to not busy
      const newFloors = [...sortedFloors];
      newFloors.sort(compareBusinessDown);
      setSorted(newFloors);
      setFloors(newFloors);
      setSelectedSort("3")
    }
  }

  const handleFilter = (e, type) => {
    e.target.classList.toggle("selected");

    if(type === "0") {
      setFloors(sortedFloors);
      setSelectedFilter("0")
    }
    else if(type === "1") { //quiet
      const newFloors = sortedFloors.filter((floor) => {return floor.type === 0});
      setFloors(newFloors);
      setSelectedFilter("1")
    }
    else if(type === "2") { //group
      const newFloors = sortedFloors.filter((floor) => {return floor.type === 1});
      setFloors(newFloors);
      setSelectedFilter("2")
    }
    else if(type === "3") { //other
      const newFloors = sortedFloors.filter((floor) => {return floor.type === 2});
      setFloors(newFloors);
      setSelectedFilter("3")
    }
  }

  const toggleSelectedFilter = (selectedFilter)  => {
      const selected = selectedFilter;

      if(selected !== "0") {
        document.getElementById("filter-button-0")?.classList.remove("selected");
      }

      if(selected !== "1") {
        document.getElementById("filter-button-1")?.classList.remove("selected");
      }

      if(selected !== "2") {
        document.getElementById("filter-button-2")?.classList.remove("selected");
      }

      if(selected !== "3") {
        document.getElementById("filter-button-3")?.classList.remove("selected");
      }

      //add class
      if(selected === "0") {
        document.getElementById("filter-button-0")?.classList.add("selected");
      }
      else if(selected === "1") {
        document.getElementById("filter-button-1")?.classList.add("selected");
      }
      else if(selected === "2") {
        document.getElementById("filter-button-2")?.classList.add("selected");
      }
      else if(selected === "3") {
        document.getElementById("filter-button-3")?.classList.add("selected");
      }
  }

  const toggleSelectedSort = (selectedSort)  => {
    const selected = selectedSort;

    if(selected !== "1") {
      document.getElementById("sort-button-1")?.classList.remove("selected");
    }

    if(selected !== "2") {
      document.getElementById("sort-button-2")?.classList.remove("selected");
    }

    if(selected !== "3") {
      document.getElementById("sort-button-3")?.classList.remove("selected");
    }

    //add class
    if(selected === "1") {
      document.getElementById("sort-button-1")?.classList.add("selected");
    }
    else if(selected === "2") {
      document.getElementById("sort-button-2")?.classList.add("selected");
    }
    else if(selected === "3") {
      document.getElementById("sort-button-3")?.classList.add("selected");
    }
  }

  useEffect(() => {
    render();
    return () => {
      if(document.getElementById('library')) document.getElementById('library').innerHTML = '';

    }
  },[])

  useEffect(() => {
    if(document.getElementById('library')) document.getElementById('library').innerHTML = '';
    render();
    return () => {

    }
  },[floors, show])

  useEffect(() => {
    toggleSelectedFilter(selectedFilter);
  }, [selectedFilter])

  useEffect(() => {
    toggleSelectedSort(selectedSort);
  }, [selectedSort])

  useEffect(() => {
    setFloors(initialFloors);
    return () => {

    }
  },[show])

  return (
    <div className="App">

      <div className="logobar">
          <div className="logodiv">
              <img src="https://i.ibb.co/7JBFTVg/STUDYflow-logo.png" alt="STUDYflow" className="sflogo"></img>
          </div>
      </div>


    {!show &&
        <div className="row">
            <div className="column px-0">

            <Form className="">
              <Row className="g-2"> 
                <Button variant="secondary" className="popular-times" onClick={handleShow}>
                  Popular Times of W.E.B Du Bois
                </Button>
              </Row>
              <Row className="g-2">
              <Col>
                <DropdownButton variant="secondary" id="sort-button" title="Sort By" style={{"width": "calc(100% - 30px)", "margin-left": "15px"}}>
                  <Dropdown.Item href="#/action-1" id="sort-button-1" className="selected" onClick={(e) => handleSort("1")}>Floor #</Dropdown.Item>
                  <Dropdown.Item href="#/action-2" id="sort-button-2" onClick={(e) => handleSort("2")}>Not Busy to Busy</Dropdown.Item>
                  <Dropdown.Item href="#/action-3" id="sort-button-3" onClick={(e) => handleSort("3")}>Busy to Not Busy</Dropdown.Item>
                </DropdownButton>
              </Col>

              <Col>
                <DropdownButton variant="secondary" id="filter-button" title="Filter By" style={{"width": "calc(100% - 30px)", "margin-left": "5px"}}>
                  <Dropdown.Item href="#/action-1" id="filter-button-0" className="selected" onClick={(e) => handleFilter(e, "0")}>None</Dropdown.Item>
                  <Dropdown.Item href="#/action-2" id="filter-button-1" onClick={(e) => handleFilter(e, "1")}>Quiet Study</Dropdown.Item>
                  <Dropdown.Item href="#/action-3" id="filter-button-2" onClick={(e) => handleFilter(e, "2")}>Group Study</Dropdown.Item>
                  <Dropdown.Item href="#/action-3" id="filter-button-3" onClick={(e) => handleFilter(e, "3")}>Other</Dropdown.Item>
                </DropdownButton>
              </Col>
              </Row>
            </Form>

            <div id="library">
              {/*javascript floor rendering based on json here*/}
            </div>
            </div>
        </div>
    }

    {show && <Stats handleClose={handleClose}></Stats>}

      <div className="footer">
          {/*<p>W.E.B Du Bois</p>*/}
      </div>

    </div>
  );
}

const data = [
  {time : "8am",
    People: 100
  },
  {time : "9am",
    People: 200
  },
  {time : "10am",
    People: 200
  },
  {time : "11am",
    People: 200
  },
  {time : "12pm",
    People: 300
  },
  {time : "1pm",
    People: 400
  },
  {time : "2pm",
    People: 500
  },
  {time : "3pm",
    People: 600
  },
  {time : "4pm",
    People: 600
  },
  {time : "5pm",
    People: 605
  },
  {time : "6pm",
    People: 720
  },
  {time : "7pm",
    People: 600
  },
  {time : "8pm",
    People: 381
  },
  {time : "9pm",
    People: 300
  },
  {time : "10pm",
    People: 250
  },
  {time : "11pm",
    People: 270
  },
  {time : "12am",
    People: 100
  },
]

function Stats({handleClose}) {

  return (
    <div className="graph">
      <Row className="g-2"> 
          <Button variant="secondary" className="popular-times mt-3" onClick={handleClose}>
                  Back
          </Button>
      </Row>
    <p className="graph-title" style={{"font-weight": "bold"}}>Average W.E.B Du Bois Business / Week </p>
    <ResponsiveContainer width="100%" height="85%">
      <BarChart
        width="100%" 
        height="100%" 
        data={data}
        margin={{
          top: 5,
          right: 5,
          left: 5,
          bottom: 25
        }}
      >
        <XAxis dataKey="time" />
        <Tooltip />
        <Bar dataKey="People" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
    </div>
  );
}


export default App;
