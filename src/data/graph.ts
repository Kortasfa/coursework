import type { Quantity } from "./physicalQuantities";

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
}
