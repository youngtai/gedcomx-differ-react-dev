import { Button, Stack } from '@mui/material'
import Clipboard from 'react-clipboard.js'

const DownloadCopyButtons = ({ data, label, handleDownload }) => {
  return (
    <Stack direction="row" spacing={2}>
      <Button
        variant="contained"
        size="large"
        color="secondary"
        onClick={() => handleDownload(data, label)}
      >
        {`Download ${label}`}
      </Button>
      <Button variant="outlined">
        <Clipboard data-clipboard-text={JSON.stringify(data)} component="div">
          {`Copy ${label}`}
        </Clipboard>
      </Button>
    </Stack>
  )
}

export default DownloadCopyButtons
