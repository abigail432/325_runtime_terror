import './App.css';
import React, {useEffect, useState, useRef} from 'react';
import Form from 'react-bootstrap/Form';
import { BarChart, ScatterChart, Bar, Scatter, Cell, XAxis, YAxis, Label, LabelList, Tooltip, ResponsiveContainer } from 'recharts';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

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
  {floor: 6, busy: 0, type:2},
  {floor: 7, busy: 2, type:2},
  {floor: 8, busy: 2, type:0},
  {floor: 9, busy: 0, type:1},
  {floor: 10, busy: 2, type:2},
  {floor: 11, busy: 2, type:0},
  {floor: 12, busy: 2, type:2},
  {floor: 13, busy: 2, type:2},
  {floor: 14, busy: 0, type:0},
  {floor: 15, busy: 1, type:1},
  {floor: 16, busy: 1, type:2},
  {floor: 17, busy: 1, type:0},
  {floor: 18, busy: 2, type:1},
  {floor: 19, busy: 2, type:2},
  {floor: 20, busy: 2, type:0},
  {floor: 21, busy: 2, type:1},
  {floor: 22, busy: 2, type:2},
  {floor: 23, busy: 2, type:1},
  {floor: 24, busy: 2, type:2},
  {floor: 25, busy: 2, type:2},
  {floor: 26, busy: 2, type:2}
]


function App() {
  const [sortedFloors, setSorted] = useState(initialFloors);
  const [floors, setFloors] = useState(initialFloors);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
    }

    else if(type === "2") { //not busy to busy
      const newFloors = [...sortedFloors];
      newFloors.sort(compareBusinessUp);
      setSorted(newFloors);
      setFloors(newFloors);
    }
    else if(type === "3") { //busy to not busy
      const newFloors = [...sortedFloors];
      newFloors.sort(compareBusinessDown);
      setSorted(newFloors);
      setFloors(newFloors);
    }
  }

  const handleFilter = (type) => {
    if(type === "0") {
      setFloors(sortedFloors);
    }
    else if(type === "1") { //quiet
      const newFloors = sortedFloors.filter((floor) => {return floor.type === 0});
      setFloors(newFloors);
    }
    else if(type === "2") { //group
      const newFloors = sortedFloors.filter((floor) => {return floor.type === 1});
      setFloors(newFloors);
    }
    else if(type === "3") { //other
      const newFloors = sortedFloors.filter((floor) => {return floor.type === 2});
      setFloors(newFloors);
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
                  Popular Times
                </Button>
              </Row>
              <Row className="g-2">
              <Col>
                <Form.Group className="mb-3 w-100" controlId="sort">
                  <Form.Label className="mb-1">Sort By</Form.Label>
                  <Form.Select className="text-center" aria-label="Default select example"
                    style={{"width": "calc(100% - 60px)", "margin-left": "30px"}}
                    onChange={(e) => handleSort(e.target.value)}
                  >
                    <option value="1" className="text-center">Floor Number</option>
                    <option value="2" className="text-center">Not Busy to Busy</option>
                    <option value="3" className="text-center">Busy to Not Busy</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col>
                <Form.Group className="mb-3 w-100" controlId="filter">
                  <Form.Label className="mb-1">Filter By</Form.Label>
                  <Form.Select className="text-center" aria-label="Default select example"
                    style={{"width": "calc(100% - 60px)", "margin-left": "20px"}}
                    onChange={(e) => handleFilter(e.target.value)}
                  >
                    <option value="0" className="text-center">None</option>
                    <option value="1" className="text-center">Quiet Floor</option>
                    <option value="2" className="text-center">Group Study</option>
                    <option value="3" className="text-center">Other</option>
                  </Form.Select>
                </Form.Group>
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
          <p>W.E.B Du Bois</p>
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
    <p className="graph-title">Average Business - This Week </p>
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
