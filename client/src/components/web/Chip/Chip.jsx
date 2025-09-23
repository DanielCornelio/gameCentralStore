import React from 'react'
import './Chip.scss'
import { Badge } from 'react-bootstrap'

export const Chip = ({title}) => {
  return (
    <Badge pill className="chip">
        {title}
    </Badge>
  )
}
