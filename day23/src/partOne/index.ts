import { shout } from "../utils";

export const partOneShout = async (input = [] as string[]) => {
  shout("Hello from Part One");

  class Node {
    id: string;
    neighbors: Node[];

    constructor(id: string) {
      this.id = id;
      this.neighbors = [];
    }
  }

  class Graph {
    nodes: Node[];

    constructor() {
      this.nodes = [];
    }

    addNode(id: string) {
      const findNode = this.nodes.find(n => n.id === id);
      if (!findNode) {
        const newNode = new Node(id);
        this.nodes.push(newNode);
        return newNode;
      } else return findNode;
    }

    addNeighbours(id1: string, id2: string) {
      const node1 = this.addNode(id1);
      const node2 = this.addNode(id2);

      if (!node1.neighbors.map(n => n.id).includes(node2.id))
        node1.neighbors.push(node2);

      if (!node2.neighbors.map(n => n.id).includes(node1.id))
        node2.neighbors.push(node1)
    }
  }

  const graph = new Graph();

  input.forEach(line => {
    let [node1, node2] = line.split('-');
    graph.addNeighbours(node1, node2);
  })

  const connSet = new Set<string>();
  graph.nodes.filter(n => n.id.startsWith('t')).forEach(n => {
    const neighbourIds = n.neighbors.map(n => n.id);

    n.neighbors.forEach(ne => {
      const isInterconnected = ne.neighbors.filter(nf => neighbourIds.includes(nf.id))
      isInterconnected.forEach(i => {
        const connList = [n.id, ne.id, i.id].sort();
        connSet.add(connList.join(','));
      })
    })
  })

  shout(`Length: ${Array.from(connSet).length}`);
}; 
