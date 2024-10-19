import { Grid, Paper, Stack, Typography } from '@mui/material'
import DownloadCopyButtons from './DownloadCopyButton'
import GedcomViewer from './GedcomxViewer'
import GraphView from './GraphView'

function DownloadComponents({
    leftGx,
    leftTab,
    leftFilename,
    leftGxOriginal,
    rightGx,
    rightTab,
    rightFilename,
    rightGxOriginal,
    finalGx,
    setLeftTab,
    setRightTab,
  }) {
    function handleDownload(gx, suffix) {
      const downloadLink = document.createElement('a')
      const filename = `${leftFilename.substring(0, leftFilename.indexOf('.'))}.${suffix}.json`
      downloadLink.setAttribute('download', filename)
      const blob = new Blob([JSON.stringify(gx)], { type: 'application/json' })
      downloadLink.href = window.URL.createObjectURL(blob)
      document.body.appendChild(downloadLink)
  
      window.requestAnimationFrame(() => {
        downloadLink.dispatchEvent(new MouseEvent('click'))
        document.body.removeChild(downloadLink)
      })
    }
  
    return (
      <>
        <Stack spacing={2} justifyContent="space-around" direction="row">
          <DownloadCopyButtons
            data={leftGx}
            label={leftTab === 0 ? 'Original' : 'Edited'}
            handleDownload={handleDownload}
          />
          <DownloadCopyButtons
            data={finalGx}
            label="Final"
            handleDownload={handleDownload}
          />
          <DownloadCopyButtons
            data={rightGx}
            label={rightTab === 0 ? 'Original' : 'Edited'}
            handleDownload={handleDownload}
          />
        </Stack>
        <Grid container spacing={1}>
          <Grid item xs={4}>
            <GedcomViewer
              gx={{ original: leftGxOriginal, edited: leftGx }}
              filename={leftFilename}
              tab={leftTab}
              handleTabChange={(_event, newValue) => setLeftTab(newValue)}
            />
          </Grid>
          <Grid item xs={4}>
            <Paper sx={{ paddingTop: 6 }} variant="outlined">
              <Typography variant="h6">Aligned GedcomX</Typography>
              <GraphView gx={finalGx} />
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <GedcomViewer
              gx={{ original: rightGxOriginal, edited: rightGx }}
              filename={rightFilename}
              tab={rightTab}
              handleTabChange={(_event, newValue) => setRightTab(newValue)}
            />
          </Grid>
        </Grid>
      </>
    )
  }


export default DownloadComponents