export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
  dueDate?: Date;
  priority?: 'low' | 'medium' | 'high';
  starred?: boolean;
  notes?: string;
}

export interface TodoFilters {
  status: 'all' | 'active' | 'completed' | 'starred';
  sortBy: 'created' | 'dueDate' | 'priority' | 'alphabetical';
  sortOrder: 'asc' | 'desc';
}