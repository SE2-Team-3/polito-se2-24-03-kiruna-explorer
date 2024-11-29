const NodeForm = ({ newNode, setNewNode, addNode }: any) => {
  return (
    <form onSubmit={addNode} className="node-form">
      <input
        type="text"
        placeholder="ID Nodo"
        value={newNode.id}
        onChange={(e) => setNewNode({ ...newNode, id: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Label Nodo"
        value={newNode.label}
        onChange={(e) => setNewNode({ ...newNode, label: e.target.value })}
        required
      />
      <input
        type="number"
        placeholder="Posizione X"
        value={newNode.x}
        onChange={(e) =>
          setNewNode({ ...newNode, x: parseFloat(e.target.value) })
        }
        required
      />
      <input
        type="number"
        placeholder="Posizione Y"
        value={newNode.y}
        onChange={(e) =>
          setNewNode({ ...newNode, y: parseFloat(e.target.value) })
        }
        required
      />
      <button type="submit">Add node</button>
    </form>
  );
};

export default NodeForm;
