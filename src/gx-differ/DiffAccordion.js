// DiffAccordion.js
import React from 'react'
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Tooltip,
} from '@mui/material'
import { ExpandMore } from '@mui/icons-material'

function DiffAccordion({ defaultExpanded = false, title, component }) {
  const [expanded, setExpanded] = React.useState(defaultExpanded)

  const tooltipValue = expanded ? 'Hide' : 'Show'

  return (
    <Accordion
      variant="outlined"
      defaultExpanded={defaultExpanded}
      onChange={() => setExpanded(!expanded)}
    >
      <Tooltip
        title={`Click to ${tooltipValue}`}
        placement={'top'}
        followCursor={true}
      >
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant={'h5'}>{title}</Typography>
        </AccordionSummary>
      </Tooltip>
      <AccordionDetails>{component}</AccordionDetails>
    </Accordion>
  )
}

export default DiffAccordion
