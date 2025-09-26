/**
 * Represents a single todo item.
 */
export interface Todo {
  /** The unique identifier for the todo item. */
  id: string;
  /** The main text content of the todo item. */
  text: string;
  /** Whether the todo item is completed or not. */
  completed: boolean;
  /** The date and time when the todo item was created. */
  createdAt: Date;
  /** The optional due date for the todo item. */
  dueDate?: Date;
  /** The optional priority level of the todo item. */
  priority?: 'low' | 'medium' | 'high';
  /** Whether the todo item is starred or not. */
  starred?: boolean;
  /** Optional additional notes for the todo item. */
  notes?: string;
}

/**
 * Represents the filtering and sorting options for the todo list.
 */
export interface TodoFilters {
  /** The current status filter for the todo list. */
  status: 'all' | 'active' | 'completed' | 'starred';
  /** The field to sort the todo list by. */
  sortBy: 'created' | 'dueDate' | 'priority' | 'alphabetical';
  /** The order to sort the todo list in. */
  sortOrder: 'asc' | 'desc';
}