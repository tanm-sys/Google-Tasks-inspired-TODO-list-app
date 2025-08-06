"use client";

import { motion } from 'framer-motion';
import { CheckCircle2, Clock, Star, Archive } from 'lucide-react';
import { Todo } from '../types/todo';

interface TaskStatsProps {
  todos: Todo[];
}

export function TaskStats({ todos }: TaskStatsProps) {
  const active = todos.filter(t => !t.completed).length;
  const completed = todos.filter(t => t.completed).length;
  const starred = todos.filter(t => t.starred && !t.completed).length;
  const total = todos.length;

  const stats = [
    { label: 'Active', value: active, icon: Clock, color: 'text-blue-600' },
    { label: 'Completed', value: completed, icon: CheckCircle2, color: 'text-green-600' },
    { label: 'Starred', value: starred, icon: Star, color: 'text-yellow-600' },
    { label: 'Total', value: total, icon: Archive, color: 'text-gray-600' },
  ];

  return (
    <motion.div
      className="grid grid-cols-4 gap-4 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          className="bg-white rounded-lg p-4 shadow-sm border border-gray-200"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          whileHover={{ scale: 1.02, y: -2 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">{stat.label}</p>
              <p className="text-2xl font-semibold text-gray-800">{stat.value}</p>
            </div>
            <stat.icon className={`w-6 h-6 ${stat.color}`} />
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}