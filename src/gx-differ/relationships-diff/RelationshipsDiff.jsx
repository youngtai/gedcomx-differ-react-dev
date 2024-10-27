import { Grid } from "@mui/joy";
import PropTypes from "prop-types";
import { RecordsDataContext } from "../RecordsContext";
import { leftRecordsData, rightRecordsData } from "../Utils";
import RelationshipsList from "./RelationshipsList";

export default function RelationshipsDiff({
  leftGx,
  setLeftGx,
  rightGx,
  setRightGx,
  finalGx,
  setFinalGx,
}) {
  return (
    <Grid container spacing={2} justifyContent="center">
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
          <RelationshipsList
            rels={leftGx.relationships}
            persons={leftGx.persons}
          />
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
          <RelationshipsList
            rels={rightGx.relationships}
            persons={rightGx.persons}
          />
        </RecordsDataContext.Provider>
      </Grid>
    </Grid>
  );
}

RelationshipsDiff.propTypes = {
  leftGx: PropTypes.object,
  setLeftGx: PropTypes.func,
  rightGx: PropTypes.object,
  setRightGx: PropTypes.func,
  finalGx: PropTypes.object,
  setFinalGx: PropTypes.func,
};
