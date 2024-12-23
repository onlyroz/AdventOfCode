import { shout } from "../utils";

export const partTwoShout = async (input = [] as string[]) => {
  shout("Hello from Part Two!");

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
  });

  // Find all maximal cliques using Bron-Kerbosch algorithm
  const findMaximalCliques = (nodes: Node[]): Set<string>[] => {
    const cliques: Set<string>[] = [];
    
    const bronKerbosch = (r: Set<string>, p: Set<string>, x: Set<string>) => {
      if (p.size === 0 && x.size === 0) {
        if (r.size >= 3) cliques.push(new Set(r));
        return;
      }

      const pArray = Array.from(p);
      for (const v of pArray) {
        const node = graph.nodes.find(n => n.id === v)!;
        const neighborIds = new Set(node.neighbors.map(n => n.id));
        
        bronKerbosch(
          new Set([...r, v]),
          new Set([...p].filter(n => neighborIds.has(n))),
          new Set([...x].filter(n => neighborIds.has(n)))
        );
        
        p.delete(v);
        x.add(v);
      }
    };

    const allNodeIds = new Set(nodes.map(n => n.id));
    bronKerbosch(new Set(), allNodeIds, new Set());
    
    return cliques;
  };

  const maximalCliques = findMaximalCliques(graph.nodes);
  const largestClique = Array.from(maximalCliques).reduce((max, current) => 
    current.size > max.size ? current : max
  , new Set<string>());

  shout(`Largest interconnected group: ${Array.from(largestClique).sort().join(',')}`);
  shout(`Size: ${largestClique.size}`);
};
