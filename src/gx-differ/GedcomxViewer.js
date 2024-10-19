import { Box, Paper, Tab, Tabs, Typography } from '@mui/material'
import GraphView from './GraphView'

const GedcomViewer = ({
  gx,
  filename,
  tab,
  handleTabChange,
}) => (
  <Paper variant="outlined">
    <Tabs value={tab} onChange={handleTabChange} variant="fullWidth">
      <Tab label="Original" />
      <Tab label="Edited" />
    </Tabs>
    <Box hidden={tab !== 0}>
      <Typography variant="h6">{filename}</Typography>
      <GraphView gx={gx.original} />
    </Box>
    <Box hidden={tab !== 1}>
      <Typography variant="h6">{filename}</Typography>
      <GraphView gx={gx.edited} />
    </Box>
  </Paper>
)

export default GedcomViewer
