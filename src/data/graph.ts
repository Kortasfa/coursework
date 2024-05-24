import { phenomena, type Phenomenon } from "./effectsChain";
import { quantities, type Quantity } from "./physicalQuantities";

export type Edge = { from: Quantity, to: Quantity, phenomenonName: string }

export class Graph {
    nodes: Quantity[];
    edges: Edge[];

    constructor() {
        this.nodes = [];
        this.edges = [];
    }

    addNode(node: Quantity) {
        this.nodes.push(node);
    }

    addEdge(fromId: number, toId: number, phenomenonName: string) {
        const fromNode = this.nodes.find(node => node.id === fromId);
        const toNode = this.nodes.find(node => node.id === toId);
        if (fromNode && toNode) {
            this.edges.push({ from: fromNode, to: toNode, phenomenonName });
        }
    }

    findShortestPath(startId: number, endId: number): Edge[] {
        const startNode = this.nodes.find(node => node.id === startId);
        const endNode = this.nodes.find(node => node.id === endId);

        if (!startNode || !endNode) return [];

        const visited: { [key: number]: boolean } = {};
        const queue: { node: Quantity, path: Edge[] }[] = [];
        queue.push({ node: startNode, path: [] });

        while (queue.length > 0) {
            const { node, path } = queue.shift()!;
            visited[node.id] = true;

            if (node === endNode) {
                return path;
            }

            for (const edge of this.edges) {
                if (edge.from === node && !visited[edge.to.id]) {
                    queue.push({ node: edge.to, path: [...path, edge] });
                }
            }
        }

        return [];
    }

    findAllPaths(startId: number, endId: number, depthLimit: number): Edge[][] {
        const startNode = this.nodes.find(node => node.id === startId);
        const endNode = this.nodes.find(node => node.id === endId);

        if (!startNode || !endNode) return [];

        const allPaths: Edge[][] = [];
        const queue: { path: Edge[], depth: number }[] = [{ path: [], depth: 0 }];

        while (queue.length > 0) {
            const current = queue.shift();
            if (!current) continue;

            const { path, depth } = current;

            const currentNode = path.length > 0 ? path[path.length - 1].to : startNode;

            if (currentNode === endNode) {
                allPaths.push(path);
                continue;
            }

            if (depth < depthLimit) {
                for (const edge of this.edges) {
                    if (edge.from === currentNode && !path.some(e => e.to.id === edge.to.id)) {
                        queue.push({ path: [...path, edge], depth: depth + 1 });
                    }
                }
            }
        }

        return allPaths;
    }

    initializeGraph(quantities: Quantity[], phenomena: Phenomenon[]) {
        this.nodes = [];
        this.edges = [];

        for (const quantity of quantities) {
            this.addNode(quantity);
        }

        for (const connection of phenomena) {
            for (const i of connection.inputQuantities) {
                this.addEdge(i, connection.outputQuantities, connection.name);
            }
        }
    }

    updateGraph(quantities: Quantity[], phenomena: Phenomenon[]) {
        this.initializeGraph(quantities, phenomena);
    }
}

const graph = new Graph();
graph.initializeGraph(quantities, phenomena);

export { graph };

