import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Paper,
  Stack,
  Typography,
} from '@mui/material'
import React from 'react'
import { FileDrop } from 'react-file-drop'
import FileUpload from './FileUpload'
import PasteInputButtons from './PasteInputButtons'
import { normalizeGedcomx } from './Utils'

const InputOptions = ({
  onFileUpload,
  handleClearData,
  setLeftGx,
  setRightGx,
  setLeftGxOriginal,
  setRightGxOriginal,
  setLeftFilename,
  setRightFilename,
  assertions,
  setAssertions,
}) => {
  async function handleRightFileDrop(files, setRightGx) {
    let droppedGxObject = null
    if (!files || files.length > 1) {
      console.log('Problem reading file, or too many files (max 1)')
    } else {
      droppedGxObject = JSON.parse(await files[0].text())
      droppedGxObject = droppedGxObject.records
        ? droppedGxObject.records[0]
        : droppedGxObject
      droppedGxObject = normalizeGedcomx(droppedGxObject)
      setRightGx(droppedGxObject)
      setRightGxOriginal(droppedGxObject)
      setRightFilename(files[0].name)
    }
  }

  async function handleLeftFileDrop(files, setLeftGx) {
    let droppedGxObject = null
    if (!files || files.length > 1) {
      console.log('Problem reading file, or too many files (max 1)')
    } else {
      droppedGxObject = JSON.parse(await files[0].text())
      droppedGxObject = droppedGxObject.records
        ? droppedGxObject.records[0]
        : droppedGxObject
      droppedGxObject = normalizeGedcomx(droppedGxObject)
      setLeftGx(droppedGxObject)
      setLeftGxOriginal(droppedGxObject)
      setLeftFilename(files[0].name)
    }
  }

  return (
    <>
      <FileDrop
        className="left-file-drop"
        onDrop={(files) => handleLeftFileDrop(files, setLeftGx)}
      >
        Drop File Here
      </FileDrop>
      <FileDrop
        className="right-file-drop"
        onDrop={(files) => handleRightFileDrop(files, setRightGx)}
      >
        Drop File Here
      </FileDrop>
      <Paper variant="outlined" sx={{ marginBottom: 2 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ padding: 2 }}
        >
          <Stack spacing={2}>
            <Typography variant="h6">Input Options</Typography>
            <Stack direction="row" spacing={4} alignItems="center">
              <FileUpload
                onChange={onFileUpload}
                allowedExtensions={['.json']}
              />
              <Button
                onClick={handleClearData}
                variant="contained"
                color="secondary"
              >
                Clear Data
              </Button>
            </Stack>
            <PasteInputButtons
              setLeftGx={setLeftGx}
              setRightGx={setRightGx}
              setLeftGxOriginal={setLeftGxOriginal}
              setRightGxOriginal={setRightGxOriginal}
              setLeftFilename={setLeftFilename}
              setRightFilename={setRightFilename}
            />
          </Stack>
          <FormGroup>
            <Typography variant="h6">Diff Options</Typography>
            <FormControlLabel
              control={
                <Checkbox
                  checked={assertions.nameType}
                  onChange={(event) =>
                    setAssertions({
                      ...assertions,
                      nameType: event.target.checked,
                    })
                  }
                />
              }
              label="Assert Name type (off for ACE/SLS GedcomX comparison)"
            />
          </FormGroup>
        </Stack>
      </Paper>
    </>
  )
}

export default InputOptions
