import React from 'react';
import { motion } from 'framer-motion';

interface ProductSkeletonProps {
  index?: number;
}

export default function ProductSkeleton({ index = 0 }: ProductSkeletonProps) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="relative bg-white rounded-[20px] p-4 shadow-[0_4px_12px_rgba(0,0,0,0.05)] border border-stone-100 flex flex-col h-full w-full"
    >
      {/* Skeleton Image Area */}
      <div className="block relative rounded-2xl overflow-hidden aspect-[4/5] mb-5 bg-gray-100 animate-pulse p-2"></div>

      {/* Skeleton Text Area */}
      <div className="flex flex-col flex-1 px-1 mt-auto">
        <div className="h-5 bg-gray-200 rounded animate-pulse mb-3 w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded animate-pulse mb-4 w-1/3"></div>
        
        {/* Pricing Area */}
        <div className="mt-auto flex items-end justify-between pt-3 border-t border-gray-100">
          <div className="h-6 bg-gray-200 rounded animate-pulse w-16"></div>
        </div>
      </div>
    </motion.div>
  );
}
