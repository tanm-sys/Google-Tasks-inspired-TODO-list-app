"use client";

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Plus, MoreVertical, Check, Trash2, Edit2, Calendar, Flag, Star, Clock, Archive, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { format, isToday, isTomorrow, isPast, addDays } from 'date-fns';
import { toast } from 'sonner';
import { useTodoStorage } from '@/hooks/use-todo-storage';
import { Todo, TodoFilters } from '../types/todo';
import { TaskStats } from './task-stats';
import { TodoFilters as TodoFiltersComponent } from './todo-filters';

export function TodoAppEnhanced() {
  const { todos, isLoading, addTodo, updateTodo, deleteLet me continue with the enhanced TODO app:

<dyad-write path="src/components/todo/todo-app-enhanced.tsx" description="Enhanced Todo App with all advanced features">
"use client";

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Plus, MoreVertical, Check, Trash2, Edit2, Calendar, Flag, Star, Clock, Archive, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { format, isToday, isTomorrow, isPast, addDays } from 'date-fns';
import { toast } from 'sonner';
import { useTodoStorage } from '@/hooks/use-todo-storage';
import { Todo, TodoFilters } from '../types/todo';
import { TaskStats } from './task-stats';
import { TodoFilters as TodoFiltersComponent } from './todo-filters';

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
  const controls = useAnimation();

  const sortedAndFilteredTodos = useMemo(() => {
    let filtered = todos;
    
    // Apply status filter
    if (filters.status === 'active') {
      filtered = filtered.filter(t => !t.completed);
    } else if (filters.status === 'completed') {
      filtered = filtered.filter(t => t.completed);
    } else if (filters.status === 'starred') {
      filtered = filtered.filter(t => t.starred && !t.completed);
    }

    // Apply sorting
    filtered.sort((a, b) => {
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
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          comparison = (priorityOrder[a.priority || 'low'] || 0) - (priorityOrder[b.priority || 'low'] || 0);
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
      toast.success('Task added successfully', {
        description: `"${todo.text}" has been added to your tasks.`,
      });
    }
  };

  const handleToggleTodo = (id: string) => {
    const todo = todos.find(t => t.id === id);
    if (todo) {
      updateTodo(id, { completed: !todo.completed });
      if (!todo.completed) {
        toast.success('Task completed! 🎉', {
          description: `"${todo.text}" is now marked as complete.`,
        });
      }
    }
  };

  const handleDeleteTodo = (id: string) => {
    const todo = todos.find(t => t.id === id);
    if (todo) {
      deleteTodo(id);
      toast.success('Task deleted', {
        description: `"${todo.text}" has been removed.`,
      });
    }
  };

  const handleToggleStar = (id: string) => {
    const todo = todos.find(t => t.id === id);
    if (todo) {
      updateTodo(id, { starred: !todo.starred });
      toast.success(todo.starred ? 'Removed from starred' : 'Added to starred');
    }
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
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
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
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <Sparkles className="w-8 h-8 text-blue-600" />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        >
          <motion.div 
            className="text-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
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
            transition={{ duration: 0.4 }}
          >
            <AnimatePresence>
              {!showAddTask && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setShowAddTask(true)}
                  className="w-full px-4 py-3 text-left text-gray-500 hover:bg-gray-50 transition-colors flex items-center"
                >
                  <Plus className="w-5 h-5 mr-3" />
                  Add a task...
                </motion.button>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {showAddTask && (
                <motion.form
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  onSubmit={handleAddTodo}
                  className="border-b border-gray-200"
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
                      onKeyDown={handleKeyPress}
                    />
                    <button
                      type="submit"
                      className="ml-2 px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Add
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>

            <div className="divide-y divide-gray-100">
              <AnimatePresence mode="popLayout">
                {sortedAndFilteredTodos.map((todo, index) => (
                  <motion.div
                    key={todo.id}
                    layout
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -100, scale: 0.9 }}
                    transition={{ 
                      duration: 0.3, 
                      delay: index * 0.05,
                      ease: [0.4, 0, 0.2, 1]
                    }}
                  >
                    {editingId === todo.id ? (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center px-4 py-3"
                      >
                        <input
                          type="text"
                          value={editingText}
                          onChange={(e) => setEditingText(e.target.value)}
                          onBlur={handleSaveEdit}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleSaveEdit();
                            if (e.key === 'Escape') {
                              setEditingId(null);
                              setEditingText('');
                            }
                          }}
                          className="flex-1 outline-none text-gray-800 bg-transparent"
                          autoFocus
                        />
                      </motion.div>
                    ) : (
                      <TodoItem
                        todo={todo}
                        onToggle={handleToggleTodo}
                        onDelete={handleDeleteTodo}
                        onToggleStar={handleToggleStar}
                        onStartEdit={handleStartEdit}
                        dueDateLabel={getDueDateLabel(todo.dueDate)}
                      />
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {todos.length > 0 && (
              <motion.div 
                className="px-4 py-3 bg-gray-50 border-t border-gray-200"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>
                    {sortedAndFilteredTodos.length} of {todos.length} tasks
                  </span>
                  {todos.some(t => t.completed) && (
                    <button
                      onClick={clearCompleted}
                      className="hover:text-gray-800 transition-colors"
                    >
                      Clear completed
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>

          {todos.length === 0 && !showAddTask && (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Sparkles className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No tasks yet. Add one to get started!</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

function TodoItem({ todo, onToggle, onDelete, onToggleStar, onStartEdit, dueDateLabel }: {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onToggleStar: (id: string) => void;
  onStartEdit: (id: string, text: string) => void;
  dueDateLabel?: string | null;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [showActions, setShowActions] = useState(false);

  return (
    <motion.div
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.01)' }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center px-4 py-3">
        <motion.button
          onClick={() => onToggle(todo.id)}
          className="mr-3 flex-shrink-0"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <motion.div
            className={cn(
              "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200",
              todo.completed
                ? "bg-blue-600 border-blue-600"
                : "border-gray-300 hover:border-gray-400"
            )}
            animate={todo.completed ? { scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 0.2 }}
          >
            <AnimatePresence>
              {todo.completed && (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 180 }}
                  transition={{ duration: 0.2 }}
                >
                  <Check className="w-3 h-3 text-white" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.button>

        <div className="flex-1 min-w-0">
          <motion.p 
            className={cn(
              "text-gray-800 transition-all duration-200 truncate",
              todo.completed && "text-gray-500 line-through opacity-60"
            )}
            layout
          >
            {todo.text}
          </motion.p>
          {dueDateLabel && (
            <motion.p 
              className={cn(
                "text-xs mt-1 transition-colors",
                dueDateLabel === 'Overdue' ? 'text-red-600 font-medium' : 'text-gray-500'
              )}
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              {dueDateLabel}
            </motion.p>
          )}
        </div>

        <AnimatePresence>
          {(isHovered || todo.starred) && (
            <motion.div
              className="flex items-center space-x-1"
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.2 }}
            >
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleStar(todo.id);
                }}
                className="p-1 text-gray-400 hover:text-yellow-500 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
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
                className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Edit2 className="w-4 h-4" />
              </motion.button>
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(todo.id);
                }}
                className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
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