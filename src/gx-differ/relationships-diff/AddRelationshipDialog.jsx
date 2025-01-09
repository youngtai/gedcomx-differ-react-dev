import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormLabel,
  Option,
  Select,
  Stack,
} from "@mui/joy";
import PropTypes from "prop-types";
import React from "react";
import { AssertionsContext } from "../AssertionsContext";
import { RELATIONSHIP } from "../constants";
import Dialog from "../Dialog";
import { RecordsDataContext } from "../RecordsContext";
import { generateLocalId, relationshipCompareFunction } from "../Utils";
import {
  fullTextName,
  updateRelationshipsData,
} from "./RelationshipsDiffUtils";

export default function AddRelationshipDialog({ open, setOpen }) {
  const recordsData = React.useContext(RecordsDataContext);
  const assertions = React.useContext(AssertionsContext).assertions;
  const persons = recordsData.gx.persons;
  const personMenuItems = persons.map((person, idx) => (
    <Option key={`person-item-${idx}`} value={person}>
      {fullTextName(person)}
    </Option>
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

    if (recordsData.gx.relationships) {
      recordsData.gx.relationships.push(newRelationship);
    } else {
      recordsData.gx.relationships = [];
      recordsData.gx.relationships.push(newRelationship);
    }
    recordsData.gx.relationships.sort((a, b) =>
      relationshipCompareFunction(a, b, recordsData.gx.persons)
    );
    updateRelationshipsData(recordsData, assertions);
    setPerson1("");
    setPerson2("");
  }

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Add Relationship</DialogTitle>
      <DialogContent>
        <Stack spacing={2} padding={2}>
          <FormControl>
            <FormLabel>Person 1</FormLabel>
            <Select value={person1} onChange={(_, value) => setPerson1(value)}>
              {personMenuItems}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Relationship Type</FormLabel>
            <Select value={type} onChange={(_, value) => setType(value)}>
              {Object.entries(RELATIONSHIP).map((entry) => (
                <Option key={`type-${entry[0]}`} value={entry[1]}>
                  {entry[0]}
                </Option>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Person 2</FormLabel>
            <Select value={person2} onChange={(_, value) => setPerson2(value)}>
              {personMenuItems}
            </Select>
          </FormControl>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button color="neutral" onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button color="primary" onClick={saveChanges} sx={{ marginRight: 2 }}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

AddRelationshipDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};
