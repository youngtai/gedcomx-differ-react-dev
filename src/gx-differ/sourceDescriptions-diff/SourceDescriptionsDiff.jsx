import PropTypes from "prop-types"
import { Box, Grid } from "@mui/joy";
import EditableRecordSourceDescription from "./EditableRecordSourceDescription";
import { RecordsDataContext } from "../RecordsContext";
import { leftRecordsData, rightRecordsData } from '../Utils';

function getSourceDescriptionItem(sourceDescription, idx) {
  if (sourceDescription.resourceType === "http://gedcomx.org/DigitalArtifact") {
    return (
      <Box
        key={`sourceDescription-${idx}`}
        sx={{ marginBottom: 1 }} // Added margin for better spacing
      >
        <strong>{sourceDescription.about}</strong>
        <div>DigitalArtifact</div>
      </Box>
    );
  } else if (sourceDescription.resourceType === "http://gedcomx.org/Record") {
    return (
      <EditableRecordSourceDescription
        key={`sourceDescription-${idx}`}
        recordSourceDescription={sourceDescription}
        sourceDescriptionIndex={idx}
      />
    );
  } else {
    return (
      <Box
        key={`unknown-sd-${idx}`}
        sx={{ marginBottom: 1 }} // Added margin for consistency
      >
        {`Source description of unhandled type: ${sourceDescription.resourceType}`}
      </Box>
    );
  }
}

// Comparing sourceDescriptions of type Record (just comparing the coverage elements)
export default function SourceDescriptionsDiff({
  leftGx,
  setLeftGx,
  rightGx,
  setRightGx,
  finalGx,
  setFinalGx,
}) {
  const left = leftGx.sourceDescriptions;
  const right = rightGx.sourceDescriptions;

  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={6}>
        <RecordsDataContext.Provider
          value={leftRecordsData(
            leftGx,
            setLeftGx,
            rightGx,
            setRightGx,
            finalGx,
            setFinalGx,
          )}
        >
          {left?.map((sourceDescription, idx) =>
            getSourceDescriptionItem(sourceDescription, idx),
          )}
        </RecordsDataContext.Provider>
      </Grid>
      <Grid item xs={6}>
        <RecordsDataContext.Provider
          value={rightRecordsData(
            leftGx,
            setLeftGx,
            rightGx,
            setRightGx,
            finalGx,
            setFinalGx,
          )}
        >
          {right?.map((sourceDescription, idx) =>
            getSourceDescriptionItem(sourceDescription, idx),
          )}
        </RecordsDataContext.Provider>
      </Grid>
    </Grid>
  );
}

SourceDescriptionsDiff.propTypes = {
  leftGx: PropTypes.object.isRequired,
  setLeftGx: PropTypes.func.isRequired,
  rightGx: PropTypes.object.isRequired,
  setRightGx: PropTypes.func.isRequired,
  finalGx: PropTypes.object.isRequired,
  setFinalGx: PropTypes.func.isRequired,
};
