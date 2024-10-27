import { Box, Tab, TabList, TabPanel, Tabs, Typography } from "@mui/joy";
import PropTypes from "prop-types";
import GraphView from "./GraphView";

export default function GedcomViewer({ gx, filename, tab, handleTabChange }) {
  return (
    <Tabs
      value={tab}
      onChange={handleTabChange}
    >
      <TabList disableUnderline>
        <Tab disableIndicator>Original</Tab>
        <Tab disableIndicator>Edited</Tab>
      </TabList>
      <TabPanel value={0}>
        <Box sx={{ padding: 2 }}>
          <Typography level="h6">{filename}</Typography>
          <GraphView gx={gx.original} />
        </Box>
      </TabPanel>
      <TabPanel value={1}>
        <Box sx={{ padding: 2 }}>
          <Typography level="h6">{filename}</Typography>
          <GraphView gx={gx.edited} />
        </Box>
      </TabPanel>
    </Tabs>
  );
}

GedcomViewer.propTypes = {
  gx: PropTypes.object.isRequired,
  filename: PropTypes.string.isRequired,
  tab: PropTypes.number.isRequired,
  handleTabChange: PropTypes.func.isRequired,
};
