export interface Node {
  name: string;
  id: string;
  width: number;
  height: number;
  x: number;
  y: number;
  select?: boolean;
  lock?: boolean;
}
export interface NodeDelta {
  name?: string;
  id?: string;
  width?: number;
  height?: number;
  x?: number;
  y?: number;
}

export interface EditorData {
  folder?: string;
  name: string;
  id: string;
  type: string;
  nodes: Node[];
}
