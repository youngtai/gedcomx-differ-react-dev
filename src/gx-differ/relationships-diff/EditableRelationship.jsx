import {
  Button,
  Grid,
  IconButton,
  Sheet,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/joy";
import PropTypes from "prop-types";
import React from "react";
import { AssertionsContext } from "../AssertionsContext";
import { RELATIONSHIP_FACT_TYPE } from "../constants";
import { AddIcon, DeleteIcon, SwapIcon } from "../Icons";
import AddFactOrFieldDialog from "../persons-diff/AddFactOrFieldDialog";
import EditableFact from "../persons-diff/EditableFact";
import { updateRecordsData } from "../persons-diff/PersonDiffUtils";
import { RecordsDataContext } from "../RecordsContext";
import EditableRelationshipAttribute from "./EditableRelationshipAttribute";
import {
  fullTextName,
  getPersonById,
  hasMatchingRelationship,
  updateRelationshipsData,
} from "./RelationshipsDiffUtils";

export function EditableRelationship({ rel, relIndex, persons }) {
  const theme = useTheme();
  const recordsData = React.useContext(RecordsDataContext);
  const assertions = React.useContext(AssertionsContext).assertions;
  const rels = recordsData.gx.relationships;
  const comparingToRels = recordsData.comparingToGx.relationships;
  const comparingToPersons = recordsData.comparingToGx.persons;

  const [addFactOrField, setAddFactOrField] = React.useState(false);
  const [hasMatch, setHasMatch] = React.useState(
    hasMatchingRelationship(
      comparingToRels,
      rel,
      comparingToPersons,
      persons,
      assertions
    )
  );

  const backgroundColor = hasMatch ? null : theme.palette.diff.background;
  const textColor = hasMatch ? null : theme.palette.diff.color;

  React.useEffect(() => {
    setHasMatch(
      hasMatchingRelationship(
        comparingToRels,
        rel,
        comparingToPersons,
        persons,
        assertions
      )
    );
  }, [comparingToRels, rel, comparingToPersons, persons, assertions]);

  function handleSwitchPerson() {
    const person1Clone = structuredClone(rel.person1);
    rel.person1 = structuredClone(rel.person2);
    rel.person2 = person1Clone;
    rels.splice(relIndex, 1, rel);
    updateRelationshipsData(recordsData, assertions);
  }

  function handleDelete() {
    rels.splice(relIndex, 1);
    updateRelationshipsData(recordsData, assertions);
  }

  function handleAddFactOrField() {
    setAddFactOrField(true);
  }

  function factUpdateHandler(rel, relIndex, recordsData) {
    recordsData.gx.relationships.splice(relIndex, 1, rel);
    updateRecordsData(recordsData);
    updateRelationshipsData(recordsData, assertions);
  }

  return (
    <Sheet variant="outlined" sx={{ borderRadius: "sm" }}>
      <Grid
        container
        spacing={1}
        direction="row"
        alignItems="center"
        sx={{
          background: backgroundColor,
          color: textColor,
          padding: 1,
          borderRadius: "sm",
        }}
      >
        <Grid xs>
          <Stack spacing={1}>
            <div>
              <Typography fontWeight="600">
                {fullTextName(getPersonById(rel?.person1?.resourceId, persons))}
              </Typography>
              <Typography level="body-sm" color="text.secondary">
                Person 1
              </Typography>
            </div>

            <EditableRelationshipAttribute rel={rel} relIndex={relIndex} />

            <div>
              <Typography fontWeight="600">
                {fullTextName(getPersonById(rel?.person2?.resourceId, persons))}
              </Typography>
              <Typography level="body-sm" color="text.secondary">
                Person 2
              </Typography>
            </div>
          </Stack>
        </Grid>

        <Grid>
          <Stack>
            <Tooltip title="Switch Persons" arrow placement="left">
              <IconButton onClick={handleSwitchPerson}>
                <SwapIcon/>
              </IconButton>
            </Tooltip>

            <Tooltip title="Delete Relationship" arrow placement="left">
              <IconButton onClick={handleDelete}>
                <DeleteIcon/>
              </IconButton>
            </Tooltip>
          </Stack>
        </Grid>
      </Grid>

      <Stack>
        {rel?.facts?.map((fact, idx) => (
          <EditableFact
            key={`fact-${idx}`}
            fact={fact}
            factIndex={idx}
            parentObject={rel}
            parentObjectIndex={relIndex}
            comparingTo={recordsData.comparingToGx.relationships}
            updateData={factUpdateHandler}
            factTypes={RELATIONSHIP_FACT_TYPE}
          />
        ))}
        <Button
          variant="plain"
          sx={{ margin: 1 }}
          onClick={handleAddFactOrField}
          startDecorator={<AddIcon />}
        >
          Add Fact or Role
        </Button>
      </Stack>

      <AddFactOrFieldDialog
        open={addFactOrField}
        setOpen={setAddFactOrField}
        parentObject={rel}
        parentObjectIndex={relIndex}
        factTypes={RELATIONSHIP_FACT_TYPE}
        updateData={factUpdateHandler}
      />
    </Sheet>
  );
}

EditableRelationship.propTypes = {
  rel: PropTypes.object,
  relIndex: PropTypes.number,
  persons: PropTypes.array,
};
