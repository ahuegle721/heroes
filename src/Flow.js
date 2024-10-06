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
  const sy = sourceNode.position.y
  const tx = targetNode.position.x
  const ty = targetNode.position.y
  console.log('111', Math.abs(tx - sx))
  const distance = Math.sqrt(Math.abs(Math.abs(tx - sx) * Math.abs(tx - sx) - Math.abs(ty - sy) * Math.abs(ty - sy)))
  return Math.round(distance)
}

const initialEdges = [
  { id: '1-3', source: '1', target: '3', label: calculateDistance('1', '3').toString(), type: 'straight' },
  { id: '1-4', source: '1', target: '4', label: calculateDistance('1', '4').toString(), type: 'straight' },
  { id: '2-3', source: '2', target: '3', label: calculateDistance('2', '3').toString(), type: 'straight' },
  { id: '2-4', source: '2', target: '4', label: calculateDistance('2', '4').toString(), type: 'straight' },
]

const Flow = () => {

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
  )
}

export default Flow
