import { Grid } from "@mui/joy";
import PropTypes from "prop-types";
import { RecordsDataContext } from "../RecordsContext";
import { leftRecordsData, rightRecordsData } from "../Utils";
import DocumentsList from "./DocumentsList";

export default function DocumentsDiff({
  leftGx,
  setLeftGx,
  rightGx,
  setRightGx,
  finalGx,
  setFinalGx,
}) {
  return (
    <Grid container alignItems="flex-start" justifyContent="center" spacing={2}>
      <Grid xs={6}>
        <RecordsDataContext.Provider
          value={leftRecordsData(
            leftGx,
            setLeftGx,
            rightGx,
            setRightGx,
            finalGx,
            setFinalGx
          )}
        >
          <DocumentsList documents={leftGx.documents} />
        </RecordsDataContext.Provider>
      </Grid>
      <Grid xs={6}>
        <RecordsDataContext.Provider
          value={rightRecordsData(
            leftGx,
            setLeftGx,
            rightGx,
            setRightGx,
            finalGx,
            setFinalGx
          )}
        >
          <DocumentsList documents={rightGx.documents} />
        </RecordsDataContext.Provider>
      </Grid>
    </Grid>
  );
}

DocumentsDiff.propTypes = {
  leftGx: PropTypes.object.isRequired,
  setLeftGx: PropTypes.func.isRequired,
  rightGx: PropTypes.object.isRequired,
  setRightGx: PropTypes.func.isRequired,
  finalGx: PropTypes.object.isRequired,
  setFinalGx: PropTypes.func.isRequired,
};
