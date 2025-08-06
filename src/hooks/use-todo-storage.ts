"use client";

import { useState, useEffect } from 'react';
import { Todo } from '@/components/types/todo';

export function useTodoStorage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTodos = () => {
      try {
        const savedTodos = localStorage.getItem('todos');
        if (savedTodos) {
          const parsed = JSON.parse(savedTodos).map((todo: any) => ({
            ...todo,
            createdAt: new Date(todo.createdAt),
            dueDate: todo.dueDate ? new Date(todo.dueDate) : undefined
          }));
          setTodos(parsed);
        }
      } catch (error) {
        console.error('Error loading todos:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTodos();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem('todos', JSON.stringify(todos));
      } catch (error) {
        console.error('Error saving todos:', error);
      }
    }
  }, [todos, isLoading]);

  const addTodo = (text: string) => {
    const todo: Todo = {
      id: Date.now().toString(),
      text: text.trim(),
      completed: false,
      createdAt: new Date(),
      starred: false
    };
    setTodos(prev => [todo, ...prev]);
    return todo;
  };

  const updateTodo = (id: string, updates: Partial<Todo>) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, ...updates } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos(prev => prev.filter(todo => !todo.completed));
  };

  return {
    todos,
    isLoading,
    addTodo,
    updateTodo,
    deleteTodo,
    clearCompleted,
    setTodos
  };
}