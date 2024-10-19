// PasteInputButtons.js
import { Button, Stack, Tooltip } from '@mui/material'
import { normalizeGedcomx } from './Utils'

export default function PasteInputButtons({
  setLeftGx,
  setLeftGxOriginal,
  setRightGx,
  setRightGxOriginal,
  setLeftFilename,
  setRightFilename,
}) {
  function pasteButton(setters, label) {
    return (
      <Tooltip title={'Click to paste GedcomX from your clipboard'}>
        <Button
          color="secondary"
          variant="outlined"
          onClick={async () => {
            try {
              const gxText = await navigator.clipboard.readText()
              if (!(gxText.startsWith('{') || gxText.startsWith('['))) {
                return Promise.reject('Clipboard data is not valid JSON')
              }
              let gx = JSON.parse(gxText)
              gx = normalizeGedcomx(gx)
              setters.setGx(gx)
              setters.setGxOriginal(structuredClone(gx))
              setters.setFilename('Pasted GedcomX')
            } catch (error) {
              console.error('Problem reading clipboard data: ', error)
            }
          }}
        >
          {label}
        </Button>
      </Tooltip>
    )
  }

  const leftSetters = {
    setGx: setLeftGx,
    setGxOriginal: setLeftGxOriginal,
    setFilename: setLeftFilename,
  }
  const rightSetters = {
    setGx: setRightGx,
    setGxOriginal: setRightGxOriginal,
    setFilename: setRightFilename,
  }

  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      {pasteButton(leftSetters, 'Paste Left GedcomX')}
      {pasteButton(rightSetters, 'Paste Right GedcomX')}
    </Stack>
  )
}
