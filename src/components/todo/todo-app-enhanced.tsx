"use client";

import React, { useState, useRef, useMemo } from 'react';
import { Plus, Check, Trash2, Edit2, Star, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { format, isToday, isTomorrow, isPast } from 'date-fns';
import { toast } from 'sonner';
import { useTodoStorage } from '@/hooks/use-todo-storage';
import type { Todo, TodoFilters } from '../types/todo';
import { TaskStats } from './task-stats';
import { TodoFilters as TodoFiltersComponent } from './todo-filters';

/**
 * The main component for the enhanced todo application.
 * It manages the state of the todo list, including adding, updating, deleting,
 * and filtering todos. It also handles the UI for displaying the todo list,
 * statistics, and filtering controls.
 * @returns {JSX.Element} The rendered enhanced todo application.
 */
export function TodoAppEnhanced() {
  const { todos, isLoading, addTodo, updateTodo, deleteTodo, clearCompleted } = useTodoStorage();
  const [newTodo, setNewTodo] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState('');
  const [showAddTask, setShowAddTask] = useState(false);
  const [filters, setFilters] = useState<TodoFilters>({
    status: 'all',
    sortBy: 'created',
    sortOrder: 'desc'
  });
  
  const inputRef = useRef<HTMLInputElement>(null);

  const sortedAndFilteredTodos = useMemo(() => {
    let filtered = todos;
    if (filters.status === 'active') filtered = filtered.filter(t => !t.completed);
    else if (filters.status === 'completed') filtered = filtered.filter(t => t.completed);
    else if (filters.status === 'starred') filtered = filtered.filter(t => t.starred && !t.completed);

    filtered = [...filtered].sort((a, b) => {
      let comparison = 0;
      switch (filters.sortBy) {
        case 'created':
          comparison = a.createdAt.getTime() - b.createdAt.getTime();
          break;
        case 'dueDate':
          if (!a.dueDate && !b.dueDate) comparison = 0;
          else if (!a.dueDate) comparison = 1;
          else if (!b.dueDate) comparison = -1;
          else comparison = a.dueDate.getTime() - b.dueDate.getTime();
          break;
        case 'alphabetical':
          comparison = a.text.localeCompare(b.text);
          break;
        case 'priority':
          const priorityOrder = { high: 3, medium: 2, low: 1 } as const;
          comparison = (priorityOrder[a.priority || 'low'] ?? 0) - (priorityOrder[b.priority || 'low'] ?? 0);
          break;
      }
      return filters.sortOrder === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [todos, filters]);

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      const todo = addTodo(newTodo.trim());
      setNewTodo('');
      setShowAddTask(false);
      toast.success('Task added', { description: `"${todo.text}" created.` });
    }
  };

  const handleToggleTodo = (id: string) => {
    const todo = todos.find(t => t.id === id);
    if (!todo) return;
    updateTodo(id, { completed: !todo.completed });
    if (!todo.completed) {
      toast.success('Task completed! 🎉', { description: `"${todo.text}" marked complete.` });
    }
  };

  const handleDeleteTodo = (id: string) => {
    const todo = todos.find(t => t.id === id);
    if (!todo) return;
    deleteTodo(id);
    toast.success('Task deleted', { description: `"${todo.text}" removed.` });
  };

  const handleToggleStar = (id: string) => {
    const todo = todos.find(t => t.id === id);
    if (!todo) return;
    updateTodo(id, { starred: !todo.starred });
    toast.success(!todo.starred ? 'Added to starred' : 'Removed from starred');
  };

  const handleStartEdit = (id: string, text: string) => {
    setEditingId(id);
    setEditingText(text);
  };

  const handleSaveEdit = () => {
    if (editingId && editingText.trim()) {
      updateTodo(editingId, { text: editingText.trim() });
      setEditingId(null);
      setEditingText('');
      toast.success('Task updated');
    } else {
      setEditingId(null);
      setEditingText('');
    }
  };

  const getDueDateLabel = (date?: Date) => {
    if (!date) return null;
    if (isToday(date)) return 'Today';
    if (isTomorrow(date)) return 'Tomorrow';
    if (isPast(date)) return 'Overdue';
    return format(date, 'MMM d');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1, rotate: 360 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
        >
          <Sparkles className="w-8 h-8 text-blue-600" />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <LayoutGroup>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          >
            <motion.div 
              className="text-center mb-8"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              layout="position"
            >
              <h1 className="text-4xl font-light text-gray-800 mb-2">My Tasks</h1>
              <p className="text-gray-600">Stay organized and productive</p>
            </motion.div>

            <TaskStats todos={todos} />

            <TodoFiltersComponent filters={filters} onFilterChange={setFilters} />

            <motion.div 
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
              layout
            >
              <AnimatePresence initial={false} mode="popLayout">
                {!showAddTask && (
                  <motion.button
                    key="add-button"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setShowAddTask(true)}
                    className="w-full px-4 py-3 text-left text-gray-500 hover:bg-gray-50 transition-colors flex items-center"
                    whileTap={{ scale: 0.99 }}
                  >
                    <Plus className="w-5 h-5 mr-3" />
                    Add a task...
                  </motion.button>
                )}
              </AnimatePresence>

              <AnimatePresence initial={false} mode="wait">
                {showAddTask && (
                  <motion.form
                    key="add-form"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    onSubmit={handleAddTodo}
                    className="border-b border-gray-200"
                    layout
                    transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                  >
                    <div className="flex items-center px-4 py-3">
                      <Plus className="w-5 h-5 text-gray-400 mr-3" />
                      <input
                        ref={inputRef}
                        type="text"
                        value={newTodo}
                        onChange={(e) => setNewTodo(e.target.value)}
                        placeholder="What needs to be done?"
                        className="flex-1 outline-none text-gray-800 placeholder-gray-500 bg-transparent"
                        autoFocus
                        onBlur={() => !newTodo && setShowAddTask(false)}
                        onKeyDown={(e) => {
                          if (e.key === 'Escape') {
                            setShowAddTask(false);
                            setNewTodo('');
                          }
                        }}
                      />
                      <motion.button
                        type="submit"
                        className="ml-2 px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                        whileTap={{ scale: 0.98 }}
                        whileHover={{ y: -1 }}
                        transition={{ duration: 0.2 }}
                      >
                        Add
                      </motion.button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>

              <div className="divide-y divide-gray-100" aria-live="polite">
                <AnimatePresence mode="popLayout">
                  {sortedAndFilteredTodos.map((todo) => (
                    <TodoRow
                      key={todo.id}
                      todo={todo}
                      editingId={editingId}
                      editingText={editingText}
                      setEditingId={setEditingId}
                      setEditingText={setEditingText}
                      onToggle={handleToggleTodo}
                      onDelete={handleDeleteTodo}
                      onToggleStar={handleToggleStar}
                      onStartEdit={handleStartEdit}
                      onSaveEdit={handleSaveEdit}
                      dueDateLabel={getDueDateLabel(todo.dueDate)}
                    />
                  ))}
                </AnimatePresence>
              </div>

              {todos.length > 0 && (
                <motion.div 
                  className="px-4 py-3 bg-gray-50 border-t border-gray-200"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.25 }}
                  layout="position"
                >
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>
                      {sortedAndFilteredTodos.length} of {todos.length} tasks
                    </span>
                    {todos.some(t => t.completed) && (
                      <motion.button
                        onClick={clearCompleted}
                        className="hover:text-gray-800 transition-colors px-2 py-1 rounded"
                        whileHover={{ backgroundColor: 'rgba(0,0,0,0.04)' }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Clear completed
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              )}
            </motion.div>

            {todos.length === 0 && !showAddTask && (
              <motion.div
                className="text-center py-12"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Sparkles className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No tasks yet. Add one to get started!</p>
              </motion.div>
            )}
          </motion.div>
        </LayoutGroup>
      </div>
    </div>
  );
}

type RowProps = {
  todo: Todo;
  editingId: string | null;
  editingText: string;
  setEditingId: (id: string | null) => void;
  setEditingText: (text: string) => void;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onToggleStar: (id: string) => void;
  onStartEdit: (id: string, text: string) => void;
  onSaveEdit: () => void;
  dueDateLabel?: string | null;
};

/**
 * A component that displays a single todo item in the list.
 * It handles the display of the todo text, due date, and provides controls
 * for toggling completion, starring, editing, and deleting the todo.
 * @param {RowProps} props - The props for the component.
 * @param {Todo} props.todo - The todo item to display.
 * @param {string | null} props.editingId - The ID of the todo currently being edited.
 * @param {string} props.editingText - The text of the todo currently being edited.
 * @param {(id: string | null) => void} props.setEditingId - A function to set the ID of the todo being edited.
 * @param {(text: string) => void} props.setEditingText - A function to set the text of the todo being edited.
 * @param {(id: string) => void} props.onToggle - A function to toggle the completion status of a todo.
 * @param {(id: string) => void} props.onDelete - A function to delete a todo.
 * @param {(id: string) => void} props.onToggleStar - A function to toggle the starred status of a todo.
 * @param {(id: string, text: string) => void} props.onStartEdit - A function to start editing a todo.
 * @param {() => void} props.onSaveEdit - A function to save the edited todo.
 * @param {string | null | undefined} props.dueDateLabel - The label for the due date of the todo.
 * @returns {JSX.Element} The rendered todo row component.
 */
function TodoRow({
  todo,
  editingId,
  editingText,
  setEditingId,
  setEditingText,
  onToggle,
  onDelete,
  onToggleStar,
  onStartEdit,
  onSaveEdit,
  dueDateLabel
}: RowProps) {
  const isEditing = editingId === todo.id;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -8, scale: 0.995 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: -20, scale: 0.98 }}
      transition={{ duration: 0.22 }}
      className="group relative"
    >
      <div className="flex items-center px-4 py-3">
        <motion.button
          onClick={() => onToggle(todo.id)}
          className="mr-3 flex-shrink-0"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          transition={{ duration: 0.18 }}
          aria-label={todo.completed ? "Mark as incomplete" : "Mark as complete"}
        >
          <motion.div
            className={cn(
              "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors",
              todo.completed
                ? "bg-blue-600 border-blue-600"
                : "border-gray-300 group-hover:border-gray-400"
            )}
            animate={todo.completed ? { scale: [1, 1.18, 1] } : {}}
            transition={{ duration: 0.22 }}
          >
            <AnimatePresence initial={false}>
              {todo.completed && (
                <motion.div
                  key="check"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 180 }}
                  transition={{ duration: 0.18 }}
                >
                  <Check className="w-3 h-3 text-white" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.button>

        <div className="flex-1 min-w-0">
          {isEditing ? (
            <motion.input
              key="editor"
              layout
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              value={editingText}
              onChange={(e) => setEditingText(e.target.value)}
              onBlur={onSaveEdit}
              onKeyDown={(e) => {
                if (e.key === 'Enter') onSaveEdit();
                if (e.key === 'Escape') {
                  setEditingId(null);
                  setEditingText('');
                }
              }}
              className="w-full outline-none text-gray-800 bg-transparent"
              autoFocus
            />
          ) : (
            <motion.p 
              key="label"
              className={cn(
                "text-gray-800 transition-all truncate",
                todo.completed && "text-gray-500 line-through opacity-60"
              )}
              layout
            >
              {todo.text}
            </motion.p>
          )}
          {dueDateLabel && !isEditing && (
            <motion.p 
              className={cn(
                "text-xs mt-1",
                dueDateLabel === 'Overdue' ? 'text-red-600 font-medium' : 'text-gray-500'
              )}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              {dueDateLabel}
            </motion.p>
          )}
        </div>

        <AnimatePresence initial={false}>
          {(!isEditing) && (
            <motion.div
              className="flex items-center space-x-1"
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.18 }}
            >
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleStar(todo.id);
                }}
                className="p-1 text-gray-400 hover:text-yellow-500 transition-colors rounded"
                whileHover={{ scale: 1.08, y: -1 }}
                whileTap={{ scale: 0.92 }}
              >
                <Star className={cn(
                  "w-4 h-4 transition-colors",
                  todo.starred && "fill-yellow-500 text-yellow-500"
                )} />
              </motion.button>
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  onStartEdit(todo.id, todo.text);
                }}
                className="p-1 text-gray-400 hover:text-gray-600 transition-colors rounded"
                whileHover={{ scale: 1.08, y: -1 }}
                whileTap={{ scale: 0.92 }}
              >
                <Edit2 className="w-4 h-4" />
              </motion.button>
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(todo.id);
                }}
                className="p-1 text-gray-400 hover:text-red-600 transition-colors rounded"
                whileHover={{ scale: 1.08, y: -1 }}
                whileTap={{ scale: 0.92 }}
              >
                <Trash2 className="w-4 h-4" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}