import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Tooltip,
  Typography,
} from "@mui/joy";
import PropTypes from "prop-types";
import React from "react";

export default function DiffAccordion({
  defaultExpanded = false,
  title,
  component,
}) {
  const [expanded, setExpanded] = React.useState(defaultExpanded);

  const tooltipValue = expanded ? "Hide" : "Show";

  return (
    <Accordion
      expanded={expanded}
      onChange={() => setExpanded(!expanded)}
    >
      <Tooltip title={`Click to ${tooltipValue}`} placement="top" arrow>
        <AccordionSummary>
          <Typography level="h3" sx={{padding: 1}}>{title}</Typography>
        </AccordionSummary>
      </Tooltip>
      <AccordionDetails sx={{paddingTop: 2}}>{component}</AccordionDetails>
    </Accordion>
  );
}

DiffAccordion.propTypes = {
  defaultExpanded: PropTypes.bool,
  title: PropTypes.string.isRequired,
  component: PropTypes.element.isRequired,
};
