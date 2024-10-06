import { players } from './players'
import { useState, useRef, useCallback } from 'react'
import {
  ReactFlow,
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { v1 as uuidv1 } from 'uuid'
import Navigation from './Navigation'
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas'
import Form from 'react-bootstrap/Form'

const MAX_WIDTH = 500
const MAX_HEIGHT = 500

const nodeDefaults = {
  //sourcePosition: Position.Right,
  //targetPosition: Position.Left,
  style: {
    borderRadius: '100%',
    backgroundColor: '#fff',
    width: 15,
    height: 15,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}

const initialNodes = players.map((player) => {
  return (
    {
      id: player.id,
      data: {
        label: player.label,
        color: player.color,
        guild: player.guild,
      },
      position: {
        x: player.position.x,
        y: MAX_HEIGHT - player.position.y
      },
      type: 'default',
      ...nodeDefaults
    })
})


const calculateDistance = (source, target) => {
  const sourceNode = initialNodes.find(node => node.id === source)
  const targetNode = initialNodes.find(node => node.id === target)
  const sx = sourceNode.position.x
  console.log('sx', sx)
  const sy = sourceNode.position.y
  console.log('sy', sy)
  const tx = targetNode.position.x
  console.log('tx', tx)
  const ty = targetNode.position.y
  console.log('ty', ty)
  console.log('111', Math.abs(tx - sx))
  const distance = Math.sqrt(Math.abs(Math.abs(tx - sx) * Math.abs(tx - sx) - Math.abs(ty - sy) * Math.abs(ty - sy)))
  console.log('d', distance)
  return Math.round(distance)
}


console.log('label', calculateDistance('1', '3').toString())


const initialEdges = [
  { id: '1-3', source: '1', target: '3', label: calculateDistance('1', '3').toString(), type: 'straight' },
  { id: '1-4', source: '1', target: '4', label: calculateDistance('1', '4').toString(), type: 'straight' },
  { id: '2-3', source: '2', target: '3', label: calculateDistance('2', '3').toString(), type: 'straight' },
  { id: '2-4', source: '2', target: '4', label: calculateDistance('2', '4').toString(), type: 'straight' },
]


const App = () => {

  const containerRef = useRef(null)
  const [nodes, setNodes] = useState(initialNodes)
  const [edges, setEdges] = useState(initialEdges)
  const [selectedNode, setSelectedNode] = useState(null)

  const [show, setShow] = useState(false)

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [],
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [],
  )

  const onNodeClick = (event, node) => {
    setShow(true)
    setSelectedNode(node)
  }

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
      <div ref={containerRef} className="container my-5">
        <div style={{ width: '100vw', height: '100vh' }}>
          <ReactFlow
            nodes={nodes}
            onNodesChange={onNodesChange}
            edges={edges}
            onEdgesChange={onEdgesChange}
            onNodeClick={onNodeClick}
            fitView
          >
            <Background />
            <Controls />
          </ReactFlow>
        </div>
      </div>
    </>
  )
}

export default App
