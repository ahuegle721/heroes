import { players } from './players'
import { useState } from 'react'
import '@xyflow/react/dist/style.css'
import Navigation from './Navigation'
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas'
import Form from 'react-bootstrap/Form'
import Flow from './Flow'

const App = () => {

  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <>
      <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasExampleLabel">Offcanvas</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
          <div>
            Some text as placeholder. In real life you can have the elements you have chosen. Like, text, images, lists, etc.
          </div>
          <div className="dropdown mt-3">
            <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
              Dropdown button
            </button>
            <ul className="dropdown-menu">
              <li><a className="dropdown-item" href="#">Action</a></li>
              <li><a className="dropdown-item" href="#">Another action</a></li>
              <li><a className="dropdown-item" href="#">Something else here</a></li>
            </ul>
          </div>
        </div>
      </div>
      <Button variant="primary" onClick={handleShow}>
        Launch
      </Button>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Player</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Name</label>
            <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="player's name" />
          </div>
          <div className="row">
            <div className="col">
              <label htmlFor="exampleFormControlInput1" className="form-label">Position x</label>
              <input type="text" className="form-control" placeholder="enter x" />
            </div>
            <div className="col">
              <label htmlFor="exampleFormControlInput1" className="form-label">Position y</label>
              <input type="text" className="form-control" placeholder="enter y" />
            </div>
          </div>
          <div className="mt-3">
            <Form.Label>Guild</Form.Label>
            <Form.Select aria-label="Default select example" value='SCW'>
              <option selected>Open this select menu</option>
              <option value="SCW">SCW</option>
              <option value="RIP">RIP</option>
              <option value="XXL">XXL</option>
            </Form.Select>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
      <Navigation players={players} />
      <Flow />
    </>
  )
}

export default App
