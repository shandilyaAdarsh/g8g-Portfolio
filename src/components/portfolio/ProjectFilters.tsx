'use client'

import React from 'react'
import { filterCategories, ProjectCategory, projects } from '../../data/projects'
import clsx from 'clsx'

interface ProjectFiltersProps {
  activeCategory: 'all' | ProjectCategory
  onSelectCategory: (category: 'all' | ProjectCategory) => void
  className?: string
}

export function ProjectFilters({
  activeCategory,
  onSelectCategory,
  className,
}: ProjectFiltersProps) {
  return (
    <div
      role="tablist"
      aria-label="Filter portfolio projects by category"
      className={clsx(
        'flex items-center gap-2 overflow-x-auto pb-2 pt-1 scrollbar-none no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0',
        className,
      )}
    >
      {filterCategories.map((cat) => {
        const isSelected = activeCategory === cat.id
        const count =
          cat.id === 'all'
            ? projects.length
            : projects.filter((p) => p.category === cat.id).length

        return (
          <button
            key={cat.id}
            role="tab"
            id={`tab-${cat.id}`}
            aria-selected={isSelected}
            aria-controls="portfolio-grid"
            tabIndex={isSelected ? 0 : -1}
            onClick={() => onSelectCategory(cat.id)}
            className={clsx(
              'relative flex items-center gap-2 px-4 py-2 rounded-full text-xs font-display font-medium tracking-tight whitespace-nowrap transition-all duration-200 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
              isSelected
                ? 'bg-[#111215] text-white font-semibold shadow-pill'
                : 'bg-white text-text-muted hover:text-[#111215] hover:border-black/30 border border-border-subtle shadow-sm',
            )}
          >
            <span>{cat.label}</span>
            <span
              className={clsx(
                'text-[10px] font-mono px-1.5 py-0.5 rounded-full',
                isSelected ? 'bg-white/20 text-white' : 'bg-[#FAFAF8] text-text-muted border border-border-subtle',
              )}
            >
              {count}
            </span>
          </button>
        )
      })}
    </div>
  )
}
