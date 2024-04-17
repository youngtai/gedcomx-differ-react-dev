import React from 'react'
import { styled } from '@mui/material/styles'
import FileUpload from './FileUpload'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  Grid,
  Paper,
  Stack,
  Tab,
  Tabs,
  Tooltip,
  Typography,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import './MainPage.css'
import PersonsDiff, { getPersonsIntersection } from './persons-diff/PersonsDiff'
import SourceDescriptionsDiff, {
  getRecordDataIntersection,
} from './sourceDescriptions-diff/SourceDescriptionsDiff'
import RelationshipsDiff, {
  getRelationshipsIntersection,
} from './relationships-diff/RelationshipsDiff'
import FieldsDiff, { getFieldsIntersection } from './fields-diff/FieldsDiff'
import { EMPTY_GEDCOMX } from './constants'
import DocumentsDiff, {
  getDocumentsIntersection,
} from './documents-diff/DocumentsDiff'
import GraphView from './GraphView'
import { FileDrop } from 'react-file-drop'
import { factIsEmpty } from './persons-diff/EditableFactAttribute'
import { AssertionsContext } from './AssertionsContext'
import Clipboard from 'react-clipboard.js'
import { relationshipCompareFunction } from './Utils'

const RootContainer = styled('div')(({ theme }) => ({
  margin: theme.spacing(1),
  paddingTop: theme.spacing(2),
}))
const ItemContainer = styled('div')(({ theme }) => ({
  margin: theme.spacing(1),
}))

const CACHE_KEY = 'gedcomx-differ-data'

export function getGxIntersection(leftGx, rightGx, assertions) {
  const personsIntersection = getPersonsIntersection(
    leftGx.persons,
    rightGx.persons
  )
  const relationshipsIntersection = getRelationshipsIntersection(
    leftGx.relationships,
    rightGx.relationships,
    leftGx.persons,
    rightGx.persons,
    assertions
  )
  const recordDataIntersection = getRecordDataIntersection(
    leftGx.sourceDescriptions,
    rightGx.sourceDescriptions
  )
  const fieldsIntersection = getFieldsIntersection(
    leftGx.fields,
    rightGx.fields
  )
  const documentsIntersection = getDocumentsIntersection(
    leftGx.documents,
    rightGx.documents
  )
  return {
    id: leftGx.id,
    attribution: {
      contributor: { resource: 'fs:AutomatedContentExtraction' },
      created: new Date().toDateString(),
    },
    description: leftGx.description,
    persons: personsIntersection,
    relationships: relationshipsIntersection,
    sourceDescriptions: recordDataIntersection,
    fields: fieldsIntersection,
    documents: documentsIntersection,
  }
}

export const leftRecordsData = (
  leftGx,
  setLeftGx,
  rightGx,
  setRightGx,
  finalGx,
  setFinalGx
) => {
  return {
    gx: leftGx,
    setGx: setLeftGx,
    comparingToGx: rightGx,
    setComparingToGx: setRightGx,
    finalGx: finalGx,
    setFinalGx: setFinalGx,
  }
}
export const rightRecordsData = (
  leftGx,
  setLeftGx,
  rightGx,
  setRightGx,
  finalGx,
  setFinalGx
) => {
  return {
    gx: rightGx,
    setGx: setRightGx,
    comparingToGx: leftGx,
    setComparingToGx: setLeftGx,
    finalGx: finalGx,
    setFinalGx: setFinalGx,
  }
}

function normalizeGedcomx(gx) {
  function removeEmptyFactKeysOrFacts(fact) {
    Object.keys(fact).forEach((key) => {
      if (
        fact[key] === null ||
        fact[key] === undefined ||
        fact[key].length === 0
      ) {
        delete fact[key]
      }
    })
  }

  try {
    if (gx?.records && gx.records instanceof Array) {
      gx = gx.records[0]
    }

    gx?.persons?.forEach((person, personIndex) => {
      person.facts?.forEach((fact, factIndex) => {
        removeEmptyFactKeysOrFacts(fact)
        if (factIsEmpty(fact)) {
          gx.persons[personIndex].facts.splice(factIndex, 1)
        } else {
          if (!fact.primary) {
            fact.primary = false
          }
        }
      })
      if (person.facts?.length === 0) {
        delete person.facts
      }
      if (person.fields?.length === 0) {
        delete person.fields
      }
    })
    gx?.relationships?.forEach((relationship, relationshipIndex) => {
      relationship.facts?.forEach((fact, factIndex) => {
        removeEmptyFactKeysOrFacts(fact, factIndex, relationshipIndex)
        if (factIsEmpty(fact)) {
          gx.relationships[relationshipIndex].facts.splice(factIndex, 1)
        } else {
          if (!fact.primary) {
            fact.primary = false
          }
        }
      })
      if (relationship.facts?.length === 0) {
        delete relationship.facts
      }
      if (relationship.fields?.length === 0) {
        delete relationship.fields
      }
    })
    gx?.relationships?.sort((a, b) =>
      relationshipCompareFunction(a, b, gx?.persons)
    )
  } catch (error) {
    console.error(
      'There was a problem normalizing the GedcomX during load.',
      error
    )
  }
  return gx
}

function gxIsEmpty(gx) {
  if (gx === null || gx === undefined) {
    return true
  }
  return Object.keys(gx)
    .filter((key) => key !== 'id')
    .every(
      (key) => JSON.stringify(gx[key]) === JSON.stringify(EMPTY_GEDCOMX[key])
    )
}

export default function VisualGedcomxDiffer({
  leftData = null,
  rightData = null,
  hideInputs = false,
  cacheData = true,
  assertionDefaults = null,
}) {
  const assertionsContext = React.useContext(AssertionsContext)
  const [assertions, setAssertions] = React.useState(
    assertionDefaults ? assertionDefaults : assertionsContext.assertions
  )
  const cachedData = localStorage.getItem(CACHE_KEY)
    ? JSON.parse(localStorage.getItem(CACHE_KEY))
    : null

  const [leftGxOriginal, setLeftGxOriginal] = React.useState(
    leftData && leftData.gx
      ? leftData.gx
      : cachedData
        ? cachedData.leftGxOriginal
        : EMPTY_GEDCOMX
  )
  const [rightGxOriginal, setRightGxOriginal] = React.useState(
    rightData && rightData.gx
      ? rightData.gx
      : cachedData
        ? cachedData.rightGxOriginal
        : EMPTY_GEDCOMX
  )
  const [leftGx, setLeftGx] = React.useState(
    leftData && leftData.gx
      ? leftData.gx
      : cachedData
        ? cachedData.leftGx
        : EMPTY_GEDCOMX
  )
  const [rightGx, setRightGx] = React.useState(
    rightData && rightData.gx
      ? rightData.gx
      : cachedData
        ? cachedData.rightGx
        : EMPTY_GEDCOMX
  )
  const [finalGx, setFinalGx] = React.useState(
    getGxIntersection(leftGx, rightGx, assertions)
  )
  const [leftFilename, setLeftFilename] = React.useState(
    leftData && leftData.filename
      ? leftData.filename
      : cachedData
        ? cachedData.leftFilename
        : ''
  )
  const [rightFilename, setRightFilename] = React.useState(
    rightData && rightData.filename
      ? rightData.filename
      : cachedData
        ? cachedData.rightFilename
        : ''
  )

  const [leftTab, setLeftTab] = React.useState(0)
  const [rightTab, setRightTab] = React.useState(0)

  React.useEffect(() => {
    if (!cacheData) {
      return
    }
    try {
      localStorage.setItem(
        CACHE_KEY,
        JSON.stringify({
          leftGxOriginal: leftGxOriginal,
          rightGxOriginal: rightGxOriginal,
          leftGx: leftGx,
          rightGx: rightGx,
          finalGx: finalGx,
          leftFilename: leftFilename,
          rightFilename: rightFilename,
        })
      )
    } catch (error) {
      console.error(`Error caching data: ${error}`)
    }
  }, [
    leftGx,
    rightGx,
    finalGx,
    leftFilename,
    rightFilename,
    leftGxOriginal,
    rightGxOriginal,
    cacheData,
  ])

  React.useEffect(() => {
    setFinalGx(getGxIntersection(leftGx, rightGx, assertions))
  }, [assertions, leftGx, rightGx])

  async function onFileUpload(files) {
    if (!files || files.length > 2) {
      console.log('Problem with file(s), or too many files (2 max)')
    } else {
      if (files.length === 2) {
        let leftGxObject = JSON.parse(await files[0].fileObj.text())
        leftGxObject = leftGxObject.records
          ? leftGxObject.records[0]
          : leftGxObject
        leftGxObject = normalizeGedcomx(leftGxObject)
        let rightGxObject = JSON.parse(await files[1].fileObj.text())
        rightGxObject = rightGxObject.records
          ? rightGxObject.records[0]
          : rightGxObject
        rightGxObject = normalizeGedcomx(rightGxObject)
        setLeftFilename(files[0].name)
        setRightFilename(files[1].name)

        setLeftGx(leftGxObject)
        setRightGx(rightGxObject)
        setLeftGxOriginal(structuredClone(leftGxObject))
        setRightGxOriginal(structuredClone(rightGxObject))
      } else if (files.length === 1) {
        if (leftGx === EMPTY_GEDCOMX) {
          let leftGxObject = JSON.parse(await files[0].fileObj.text())
          leftGxObject = leftGxObject.records
            ? leftGxObject.records[0]
            : leftGxObject
          setLeftGx(leftGxObject)
          setLeftGxOriginal(structuredClone(leftGxObject))
          setLeftFilename(files[0].name)
        } else {
          let rightGxObject = JSON.parse(await files[0].fileObj.text())
          rightGxObject = rightGxObject.records
            ? rightGxObject.records[0]
            : rightGxObject
          setRightFilename(files[0].name)
          setRightGx(rightGxObject)
          setRightGxOriginal(structuredClone(rightGxObject))
        }
      }
    }
  }

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

  function handleClearData() {
    setLeftGx(EMPTY_GEDCOMX)
    setRightGx(EMPTY_GEDCOMX)
    setLeftGxOriginal(EMPTY_GEDCOMX)
    setRightGxOriginal(EMPTY_GEDCOMX)
    setLeftFilename('')
    setRightFilename('')
  }

  return (
    <RootContainer sx={{ marginX: 2, overflowX: 'hidden' }}>
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
      <Box hidden={gxIsEmpty(leftGxOriginal) && gxIsEmpty(rightGxOriginal)}>
        <Divider />
        <Stack spacing={1} sx={{ marginY: 1 }}>
          <ItemContainer>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h6">{leftFilename}</Typography>
              <Typography variant="h6">{rightFilename}</Typography>
            </Stack>
          </ItemContainer>
          <AssertionsContext.Provider
            value={{ assertions: assertions, setAssertions: setAssertions }}
          >
            <ItemContainer>
              <DiffAccordion
                defaultExpanded={true}
                title={'Record Data'}
                component={
                  <SourceDescriptionsDiff
                    leftGx={leftGx}
                    rightGx={rightGx}
                    setLeftGx={setLeftGx}
                    setRightGx={setRightGx}
                    finalGx={finalGx}
                    setFinalGx={setFinalGx}
                  />
                }
              />
            </ItemContainer>
            <ItemContainer>
              <DiffAccordion
                defaultExpanded={true}
                title="Record Fields"
                component={
                  <FieldsDiff
                    leftGx={leftGx}
                    rightGx={rightGx}
                    setLeftGx={setLeftGx}
                    setRightGx={setRightGx}
                    finalGx={finalGx}
                    setFinalGx={setFinalGx}
                  />
                }
              />
            </ItemContainer>
            <ItemContainer>
              <DiffAccordion
                defaultExpanded={true}
                title="Persons"
                component={
                  <PersonsDiff
                    leftGx={leftGx}
                    rightGx={rightGx}
                    setLeftGx={setLeftGx}
                    setRightGx={setRightGx}
                    finalGx={finalGx}
                    setFinalGx={setFinalGx}
                  />
                }
              />
            </ItemContainer>
            <ItemContainer>
              <DiffAccordion
                defaultExpanded={true}
                title="Relationships"
                component={
                  <RelationshipsDiff
                    leftGx={leftGx}
                    rightGx={rightGx}
                    setLeftGx={setLeftGx}
                    setRightGx={setRightGx}
                    finalGx={finalGx}
                    setFinalGx={setFinalGx}
                  />
                }
              />
            </ItemContainer>
            <ItemContainer>
              <DiffAccordion
                defaultExpanded={true}
                title="Documents"
                component={
                  <DocumentsDiff
                    leftGx={leftGx}
                    rightGx={rightGx}
                    setLeftGx={setLeftGx}
                    setRightGx={setRightGx}
                    finalGx={finalGx}
                    setFinalGx={setFinalGx}
                  />
                }
              />
            </ItemContainer>
          </AssertionsContext.Provider>
          <Divider />
          <Stack spacing={2} justifyContent="space-around" direction="row">
            <Stack direction="row" spacing={2}>
              <Button
                variant="contained"
                size="large"
                color="secondary"
                onClick={() =>
                  handleDownload(
                    leftGx,
                    `left.${leftTab === 0 ? 'original' : 'edit'}`
                  )
                }
              >{`Download ${leftTab === 0 ? 'Original' : 'Edited'}`}</Button>
              <Button variant="outlined">
                <Clipboard
                  data-clipboard-text={JSON.stringify(leftGx)}
                  component="div"
                >{`Copy ${leftTab === 0 ? 'Original' : 'Edited'}`}</Clipboard>
              </Button>
            </Stack>
            <Stack direction="row" spacing={2}>
              <Button
                variant="contained"
                size="large"
                onClick={() => handleDownload(finalGx, 'final')}
              >
                Download
              </Button>
              <Button variant="outlined">
                <Clipboard
                  data-clipboard-text={JSON.stringify(finalGx)}
                  component="div"
                >
                  Copy
                </Clipboard>
              </Button>
            </Stack>
            <Stack direction="row" spacing={2}>
              <Button
                variant="contained"
                size="large"
                color="secondary"
                onClick={() =>
                  handleDownload(
                    rightGx,
                    `right.${rightTab === 0 ? 'original' : 'edit'}`
                  )
                }
              >{`Download ${rightTab === 0 ? 'Original' : 'Edited'}`}</Button>
              <Button variant="outlined">
                <Clipboard
                  data-clipboard-text={JSON.stringify(rightGx)}
                  component="div"
                >{`Copy ${rightTab === 0 ? 'Original' : 'Edited'}`}</Clipboard>
              </Button>
            </Stack>
          </Stack>
          <Grid container spacing={1}>
            <Grid item xs={4}>
              <Paper variant="outlined">
                <Tabs
                  value={leftTab}
                  onChange={(event, newValue) => setLeftTab(newValue)}
                  variant="fullWidth"
                >
                  <Tab label="Original" />
                  <Tab label="Edited" />
                </Tabs>
                <Box hidden={leftTab !== 0}>
                  <Typography variant="h6">{leftFilename}</Typography>
                  <GraphView gx={leftGxOriginal} />
                </Box>
                <Box hidden={leftTab !== 1}>
                  <Typography variant="h6">{leftFilename}</Typography>
                  <GraphView gx={leftGx} />
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper sx={{ paddingTop: 6 }} variant="outlined">
                <Typography variant="h6">Aligned GedcomX</Typography>
                <GraphView gx={finalGx} />
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper variant="outlined">
                <Tabs
                  value={rightTab}
                  onChange={(event, newValue) => setRightTab(newValue)}
                  variant="fullWidth"
                >
                  <Tab label="Original" />
                  <Tab label="Edited" />
                </Tabs>
                <Box hidden={rightTab !== 0}>
                  <Typography variant="h6">{rightFilename}</Typography>
                  <GraphView gx={rightGxOriginal} />
                </Box>
                <Box hidden={rightTab !== 1}>
                  <Typography variant="h6">{rightFilename}</Typography>
                  <GraphView gx={rightGx} />
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Stack>
      </Box>
    </RootContainer>
  )
}

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
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant={'h5'}>{title}</Typography>
        </AccordionSummary>
      </Tooltip>
      <AccordionDetails>{component}</AccordionDetails>
    </Accordion>
  )
}

function PasteInputButtons({
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
