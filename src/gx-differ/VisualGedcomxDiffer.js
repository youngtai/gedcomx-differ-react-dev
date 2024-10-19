import { Box, Divider, Grid, Paper, Stack, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import React from 'react'
import { AssertionsContext } from './AssertionsContext'
import { EMPTY_GEDCOMX } from './constants'
import DiffAccordion from './DiffAccordion'
import DocumentsDiff from './documents-diff/DocumentsDiff'
import DownloadCopyButtons from './DownloadCopyButton'
import FieldsDiff from './fields-diff/FieldsDiff'
import GedcomViewer from './GedcomxViewer'
import GraphView from './GraphView'
import InputOptions from './InputOptions'
import './MainPage.css'
import PersonsDiff from './persons-diff/PersonsDiff'
import RelationshipsDiff from './relationships-diff/RelationshipsDiff'
import SourceDescriptionsDiff from './sourceDescriptions-diff/SourceDescriptionsDiff'
import { getGxIntersection, gxIsEmpty, normalizeGedcomx } from './Utils'

const RootContainer = styled('div')(({ theme }) => ({
  margin: theme.spacing(1),
  paddingTop: theme.spacing(2),
}))
const ItemContainer = styled('div')(({ theme }) => ({
  margin: theme.spacing(1),
}))

const CACHE_KEY = 'gedcomx-differ-data'

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
      <InputOptions
        assertions={assertions}
        leftGx={leftGx}
        rightGx={rightGx}
        setLeftGx={setLeftGx}
        setRightGx={setRightGx}
        leftFilename={leftFilename}
        rightFilename={rightFilename}
        setLeftFilename={setLeftFilename}
        setRightFilename={setRightFilename}
        hideInputs={hideInputs}
        onFileUpload={onFileUpload}
        handleClearData={handleClearData}
      />
      <Box hidden={gxIsEmpty(leftGxOriginal) && gxIsEmpty(rightGxOriginal)}>
        <Divider />
        <Stack spacing={1} sx={{ marginY: 1 }}>
          <Filenames
            leftFilename={leftFilename}
            rightFilename={rightFilename}
          />
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
          <DownloadComponents
            leftGx={leftGx}
            leftTab={leftTab}
            leftFilename={leftFilename}
            leftGxOriginal={leftGxOriginal}
            rightGx={rightGx}
            rightTab={rightTab}
            rightFilename={rightFilename}
            rightGxOriginal={rightGxOriginal}
            finalGx={finalGx}
            setLeftTab={setLeftTab}
            setRightTab={setRightTab}
          />
        </Stack>
      </Box>
    </RootContainer>
  )
}

function Filenames({ leftFilename, rightFilename }) {
  return (
    <ItemContainer>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h6">{leftFilename}</Typography>
        <Typography variant="h6">{rightFilename}</Typography>
      </Stack>
    </ItemContainer>
  )
}

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
