import { Box, Stack, Typography } from "@mui/joy";
import PropTypes from "prop-types";
import React from "react";
import { AssertionsContext } from "./AssertionsContext";
import { EMPTY_GEDCOMX } from "./constants";
import DiffAccordion from "./DiffAccordion";
import DocumentsDiff from "./documents-diff/DocumentsDiff";
import Graphs from "./DownloadComponents";
import FieldsDiff from "./fields-diff/FieldsDiff";
import InputOptions from "./InputOptions";
import "./MainPage.css";
import PersonsDiff from "./persons-diff/PersonsDiff";
import RelationshipsDiff from "./relationships-diff/RelationshipsDiff";
import SourceDescriptionsDiff from "./sourceDescriptions-diff/SourceDescriptionsDiff";
import { getGxIntersection, gxIsEmpty, normalizeGedcomx } from "./Utils";

const CACHE_KEY = "gedcomx-differ-data";

export default function VisualGedcomxDiffer({
  leftData = null,
  rightData = null,
  hideInputs = false,
  cacheData = true,
  assertionDefaults = null,
}) {
  const assertionsContext = React.useContext(AssertionsContext);
  const [assertions, setAssertions] = React.useState(
    assertionDefaults ? assertionDefaults : assertionsContext.assertions
  );
  const cachedData = localStorage.getItem(CACHE_KEY)
    ? JSON.parse(localStorage.getItem(CACHE_KEY))
    : null;

  const [leftGxOriginal, setLeftGxOriginal] = React.useState(
    leftData && leftData.gx
      ? leftData.gx
      : cachedData
      ? cachedData.leftGxOriginal
      : EMPTY_GEDCOMX
  );
  const [rightGxOriginal, setRightGxOriginal] = React.useState(
    rightData && rightData.gx
      ? rightData.gx
      : cachedData
      ? cachedData.rightGxOriginal
      : EMPTY_GEDCOMX
  );
  const [leftGx, setLeftGx] = React.useState(
    leftData && leftData.gx
      ? leftData.gx
      : cachedData
      ? cachedData.leftGx
      : EMPTY_GEDCOMX
  );
  const [rightGx, setRightGx] = React.useState(
    rightData && rightData.gx
      ? rightData.gx
      : cachedData
      ? cachedData.rightGx
      : EMPTY_GEDCOMX
  );
  const [finalGx, setFinalGx] = React.useState(
    getGxIntersection(leftGx, rightGx, assertions)
  );
  const [leftFilename, setLeftFilename] = React.useState(
    leftData && leftData.filename
      ? leftData.filename
      : cachedData
      ? cachedData.leftFilename
      : ""
  );
  const [rightFilename, setRightFilename] = React.useState(
    rightData && rightData.filename
      ? rightData.filename
      : cachedData
      ? cachedData.rightFilename
      : ""
  );

  const [leftTab, setLeftTab] = React.useState(0);
  const [rightTab, setRightTab] = React.useState(0);

  React.useEffect(() => {
    if (!cacheData) {
      return;
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
      );
    } catch (error) {
      console.error(`Error caching data: ${error}`);
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
  ]);

  React.useEffect(() => {
    setFinalGx(getGxIntersection(leftGx, rightGx, assertions));
  }, [assertions, leftGx, rightGx]);

  async function onFileUpload(files) {
    if (!files || files.length > 2) {
      console.log("Problem with file(s), or too many files (2 max)");
    } else {
      if (files.length === 2) {
        let leftGxObject = JSON.parse(await files[0].fileObj.text());
        leftGxObject = leftGxObject.records
          ? leftGxObject.records[0]
          : leftGxObject;
        leftGxObject = normalizeGedcomx(leftGxObject);
        let rightGxObject = JSON.parse(await files[1].fileObj.text());
        rightGxObject = rightGxObject.records
          ? rightGxObject.records[0]
          : rightGxObject;
        rightGxObject = normalizeGedcomx(rightGxObject);
        setLeftFilename(files[0].name);
        setRightFilename(files[1].name);

        setLeftGx(leftGxObject);
        setRightGx(rightGxObject);
        setLeftGxOriginal(structuredClone(leftGxObject));
        setRightGxOriginal(structuredClone(rightGxObject));
      } else if (files.length === 1) {
        if (leftGx === EMPTY_GEDCOMX) {
          let leftGxObject = JSON.parse(await files[0].fileObj.text());
          leftGxObject = leftGxObject.records
            ? leftGxObject.records[0]
            : leftGxObject;
          setLeftGx(leftGxObject);
          setLeftGxOriginal(structuredClone(leftGxObject));
          setLeftFilename(files[0].name);
        } else {
          let rightGxObject = JSON.parse(await files[0].fileObj.text());
          rightGxObject = rightGxObject.records
            ? rightGxObject.records[0]
            : rightGxObject;
          setRightFilename(files[0].name);
          setRightGx(rightGxObject);
          setRightGxOriginal(structuredClone(rightGxObject));
        }
      }
    }
  }

  function handleClearData() {
    setLeftGx(EMPTY_GEDCOMX);
    setRightGx(EMPTY_GEDCOMX);
    setLeftGxOriginal(EMPTY_GEDCOMX);
    setRightGxOriginal(EMPTY_GEDCOMX);
    setLeftFilename("");
    setRightFilename("");
  }

  return (
    <Box sx={{ padding: 2 }}>
      <InputOptions
        assertions={assertions}
        setAssertions={setAssertions}
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
      <Box height={12} />
      <Box hidden={gxIsEmpty(leftGxOriginal) && gxIsEmpty(rightGxOriginal)}>
        <Stack spacing={1}>
          <Filenames
            leftFilename={leftFilename}
            rightFilename={rightFilename}
          />
          <AssertionsContext.Provider
            value={{ assertions: assertions, setAssertions: setAssertions }}
          >
            <DiffAccordion
              title={"Record Data"}
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

            <DiffAccordion
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

            <DiffAccordion
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

            <DiffAccordion
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

            <DiffAccordion
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
          </AssertionsContext.Provider>
          <DiffAccordion
            defaultExpanded={true}
            title={"Relationship Graphs"}
            component={
              <Graphs
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
            }
          />
        </Stack>
      </Box>
    </Box>
  );
}

VisualGedcomxDiffer.propTypes = {
  leftData: PropTypes.object,
  rightData: PropTypes.object,
  hideInputs: PropTypes.bool,
  cacheData: PropTypes.bool,
  assertionDefaults: PropTypes.object,
};

function Filenames({ leftFilename, rightFilename }) {
  return (
    <Stack
      direction="row"
      justifyContent="space-around"
      alignItems="center"
      sx={{ padding: 1 }}
    >
      <Typography fontWeight={600} level="title-lg">
        {leftFilename}
      </Typography>
      <Typography fontWeight={600} level="title-lg">
        {rightFilename}
      </Typography>
    </Stack>
  );
}

Filenames.propTypes = {
  leftFilename: PropTypes.string,
  rightFilename: PropTypes.string,
};
