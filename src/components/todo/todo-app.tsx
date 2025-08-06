"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Plus, MoreVertical, Check, Trash2, Edit2, Calendar, Flag, Star, Clock, Archive } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { format, isToday, isTomorrow, isPast } from 'date-fns';
import { toast } from 'sonner';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
  dueDate?: Date;
  priority?: 'low' | 'medium' | 'high';
  starred?: boolean;
  notes?: string;
}

export function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed' | 'starred'>('all');
  const [showCompleted, setShowCompleted] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos).map((todo: any) => ({
        ...todo,
        createdAt: new Date(todo.createdAt),
        dueDate: todo.dueDate ? new Date(todo.dueDate) : undefined
      })));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      const todo: Todo = {
        id: Date.now().toString(),
        text: newTodo.trim(),
        completed: false,
        createdAt: new Date(),
        starred: false
      };
      setTodos([todo, ...todos]);
      setNewTodo('');
      toast.success('Task added successfully');
    }
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo => {
      if (todo.id === id) {
        const updated = { ...todo, completed: !todo.completed };
        if (updated.completed) {
          toast.success('Task completed! 🎉');
        }
        return updated;
      }
      return todo;
    }));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
    toast.success('Task deleted');
  };

  const toggleStar = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, starred: !todo.starred } : todo
    ));
  };

  const startEditing = (id: string, text: string) => {
    setEditingId(id);
    setEditingText(text);
  };

  const saveEdit = () => {
    if (editingId && editingText.trim()) {
      setTodos(todos.map(todo =>
        todo.id === editingId ? { ...todo, text: editingText.trim() } : todo
      ));
      setEditingId(null);
      setEditingText('');
      toast.success('Task updated');
    }
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    if (filter === 'starred') return todo.starred && !todo.completed;
    return true;
  });

  const activeTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);
  const starredTodos = todos.filter(todo => todo.starred && !todo.completed);

  const getDueDateLabel = (date?: Date) => {
    if (!date) return null;
    if (isToday(date)) return 'Today';
    if (isTomorrow(date)) return 'Tomorrow';
    if (isPast(date)) return 'Overdue';
    return format(date, 'MMM d');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        >
          <motion.h1 
            className="text-3xl font-normal text-gray-800 mb-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            My Tasks
          </motion.h1>
          
          <motion.div 
            className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <form onSubmit={addTodo} className="border-b border-gray-200">
              <motion.div 
                className="flex items-center px-4 py-3"
                whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.01)' }}
                transition={{ duration: 0.2 }}
              >
                <Plus className="w-5 h-5 text-gray-400 mr-3" />
                <input
                  ref={inputRef}
                  type="text"
                  value={newTodo}
                  onChange={(e) => setNewTodo(e.target.value)}
                  placeholder="Add a task"
                  className="flex-1 outline-none text-gray-800 placeholder-gray-500 bg-transparent"
                />
              </motion.div>
            </form>

            <div className="divide-y divide-gray-100">
              <AnimatePresence mode="popLayout">
                {filteredTodos.map((todo, index) => (
                  <motion.div
                    key={todo.id}
                    layout
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -100, transition: { duration: 0.2 } }}
                    transition={{ 
                      duration: 0.3, 
                      delay: index * 0.05,
                      ease: [0.4, 0, 0.2, 1]
                    }}
                    className="group"
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
                          onBlur={saveEdit}
                          onKeyDown={(e) => e.key === 'Enter' && saveEdit()}
                          className="flex-1 outline-none text-gray-800 bg-transparent"
                          autoFocus
                        />
                      </motion.div>
                    ) : (
                      <TodoItem
                        todo={todo}
                        onToggle={toggleTodo}
                        onDelete={deleteTodo}
                        onToggleStar={toggleStar}
                        onStartEdit={startEditing}
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
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center space-x-4">
                    <span>{activeTodos.length} active</span>
                    {starredTodos.length > 0 && (
                      <span>{starredTodos.length} starred</span>
                    )}
                  </div>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => setFilter('all')}
                      className={cn(
                        "hover:text-gray-800 transition-colors",
                        filter === 'all' && "text-blue-600 font-medium"
                      )}
                    >
                      All
                    </button>
                    <button
                      onClick={() => setFilter('active')}
                      className={cn(
                        "hover:text-gray-800 transition-colors",
                        filter === 'active' && "text-blue-600 font-medium"
                      )}
                    >
                      Active
                    </button>
                    <button
                      onClick={() => setFilter('starred')}
                      className={cn(
                        "hover:text-gray-800 transition-colors",
                        filter === 'starred' && "text-blue-600 font-medium"
                      )}
                    >
                      Starred
                    </button>
                    <button
                      onClick={() => setShowCompleted(!showCompleted)}
                      className="hover:text-gray-800 transition-colors"
                    >
                      {showCompleted ? 'Hide' : 'Show'} completed
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
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
  const controls = useAnimation();

  return (
    <motion.div
      className="flex items-center px-4 py-3 hover:bg-gray-50 transition-all duration-200 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ x: 2 }}
      transition={{ duration: 0.2 }}
    >
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
            todo.completed && "text-gray-500 line-through"
          )}
          animate={todo.completed ? { opacity: 0.6 } : { opacity: 1 }}
        >
          {todo.text}
        </motion.p>
        {dueDateLabel && (
          <motion.p 
            className={cn(
              "text-xs mt-1 transition-colors",
              dueDateLabel === 'Overdue' ? 'text-red-600' : 'text-gray-500'
            )}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {dueDateLabel}
          </motion.p>
        )}
      </div>

      <motion.div
        className="flex items-center space-x-1 opacity-0 group-hover:opacity-100"
        animate={{ opacity: isHovered ? 1 : 0 }}
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
    </motion.div>
  );
}