import React from 'react'
import './SectionTitle.scss'

export const SectionTitle = ({title}) => {
  return (
    <div className="section-title my-5">
        <h2 className='mb-0'>{title}</h2>
    </div>
  )
}
