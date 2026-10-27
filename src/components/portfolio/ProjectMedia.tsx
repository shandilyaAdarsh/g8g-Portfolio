'use client'

import React from 'react'
import { Project } from '@/data/projects'
import { VideoPlayer } from '../video/VideoPlayer'

interface ProjectMediaProps {
  project: Project
  className?: string
}

export function ProjectMedia({ project, className }: ProjectMediaProps) {
  const videoSrc = project.videoUrl || project.videoLoop || '/videos/showcase/loop-03.mp4'

  return (
    <VideoPlayer
      src={videoSrc}
      playbackId={project.playbackId}
      poster={project.thumbnail}
      title={project.title}
      aspect={project.aspect}
      autoPlay={true}
      loop={true}
      muted={true}
      className={className}
      badgeLabel={project.format || '4K UHD MASTER'}
    />
  )
}
