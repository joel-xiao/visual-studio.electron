export interface treeitemdata {
  name?: string;
  icon?: string;
  id: string;
  sum?: number;
  children?: treeitemdata[];
  AFold?: boolean;
  handle?: boolean;
}

export interface treeitemmenu {
  name: string;
  icon: string;
  id: string;
  children?: treeitemmenu[];
  disabled?: boolean;
}
