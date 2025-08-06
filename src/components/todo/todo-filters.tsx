"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { Filter, SortAsc, SortDesc } from 'lucide-react';
import type { TodoFilters } from '../types/todo';

interface TodoFiltersProps {
  filters: TodoFilters;
  onFilterChange: (filters: TodoFilters) => void;
}

export function TodoFilters({ filters, onFilterChange }: TodoFiltersProps) {
  const filterOptions = [
    { value: 'all', label: 'All Tasks' },
    { value: 'active', label: 'Active' },
    { value: 'completed', label: 'Completed' },
    { value: 'starred', label: 'Starred' },
  ];

  const sortOptions = [
    { value: 'created', label: 'Created Date' },
    { value: 'dueDate', label: 'Due Date' },
    { value: 'priority', label: 'Priority' },
    { value: 'alphabetical', label: 'Alphabetical' },
  ];

  return (
    <motion.div
      className="flex items-center justify-between mb-6"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center space-x-2">
        <Filter className="w-4 h-4 text-gray-500" />
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
          {filterOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => onFilterChange({ ...filters, status: option.value as any })}
              className={cn(
                "px-3 py-1 text-sm rounded-md transition-all duration-200",
                filters.status === option.value
                  ? "bg-white text-gray-800 shadow-sm"
                  : "text-gray-600 hover:text-gray-800"
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <SortAsc className="w-4 h-4 text-gray-500" />
        <select
          value={filters.sortBy}
          onChange={(e) => onFilterChange({ ...filters, sortBy: e.target.value as any })}
          className="text-sm border border-gray-200 rounded-md px-2 py-1 bg-white"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <button
          onClick={() => onFilterChange({ ...filters, sortOrder: filters.sortOrder === 'asc' ? 'desc' : 'asc' })}
          className="p-1 hover:bg-gray-100 rounded"
        >
          {filters.sortOrder === 'asc' ? (
            <SortAsc className="w-4 h-4 text-gray-500" />
          ) : (
            <SortDesc className="w-4 h-4 text-gray-500" />
          )}
        </button>
      </div>
    </motion.div>
  );
}

function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}