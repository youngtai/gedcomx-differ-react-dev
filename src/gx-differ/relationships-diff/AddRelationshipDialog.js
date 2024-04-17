import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { RecordsDataContext } from "../RecordsContext";
import { fullTextName, updateRelationshipsData } from "./RelationshipsDiff";
import { RELATIONSHIP } from "../constants";
import { generateLocalId, relationshipCompareFunction } from "../Utils";
import { PaperComponent } from "../Styled";
import { AssertionsContext } from "../AssertionsContext";

export default function AddRelationshipDialog({ open, setOpen }) {
  const recordsData = React.useContext(RecordsDataContext);
  const assertions = React.useContext(AssertionsContext).assertions;
  const persons = recordsData.gx.persons;
  const personMenuItems = persons.map((person, idx) => (
    <MenuItem key={`person-item-${idx}`} value={person}>
      {fullTextName(person)}
    </MenuItem>
  ));

  const [person1, setPerson1] = React.useState("");
  const [person2, setPerson2] = React.useState("");
  const [type, setType] = React.useState(RELATIONSHIP.Couple);

  function saveChanges() {
    setOpen(false);
    if (!person1 || !person2 || !type) {
      return;
    }
    const newRelationship = {
      id: `r_${generateLocalId()}`,
      type: type,
      person1: {
        resource: `#${person1.id}`,
        resourceId: `${person1.id}`,
      },
      person2: {
        resource: `#${person2.id}`,
        resourceId: `${person2.id}`,
      },
    };
    recordsData.gx.relationships.push(newRelationship);
    recordsData.gx.relationships.sort((a, b) =>
      relationshipCompareFunction(a, b, recordsData.gx.persons),
    );
    updateRelationshipsData(recordsData, assertions);
    setPerson1("");
    setPerson2("");
  }

  return (
    <Dialog
      open={open}
      onClose={saveChanges}
      PaperComponent={PaperComponent}
      aria-labelledby="draggable-dialog-title"
    >
      <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
        Add Relationship
      </DialogTitle>
      <DialogContent>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Typography>Person 1</Typography>
            <Select
              value={person1}
              onChange={(e) => setPerson1(e.target.value)}
            >
              {personMenuItems}
            </Select>
          </Grid>
          <Grid item>
            <Typography>Relationship Type</Typography>
            <Select value={type} onChange={(e) => setType(e.target.value)}>
              {Object.keys(RELATIONSHIP).map((key) => (
                <MenuItem key={`type-${key}`} value={RELATIONSHIP[key]}>
                  {key}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item>
            <Typography>Person 2</Typography>
            <Select
              value={person2}
              onChange={(e) => setPerson2(e.target.value)}
            >
              {personMenuItems}
            </Select>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Stack direction={"row"} spacing={2}>
          <Button color={"secondary"} onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button color={"primary"} onClick={saveChanges}>
            Save
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
}
