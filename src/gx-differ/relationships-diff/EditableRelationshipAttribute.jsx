import {
  FormControl,
  Grid,
  IconButton,
  Option,
  Select,
  Stack,
  Tooltip,
  Typography,
} from "@mui/joy";
import React from "react";
import { AssertionsContext } from "../AssertionsContext";
import { RELATIONSHIP } from "../constants";
import { CancelIcon, EditIcon, SaveIcon } from "../Icons";
import { RecordsDataContext } from "../RecordsContext";
import { updateRelationshipsData } from "./RelationshipsDiffUtils";

export default function EditableRelationshipAttribute({ rel, relIndex }) {
  const recordsData = React.useContext(RecordsDataContext);
  const assertions = React.useContext(AssertionsContext).assertions;
  const [editValue, setEditValue] = React.useState(rel?.type ? rel.type : "");
  const [isEditing, setIsEditing] = React.useState(false);

  function handleSave() {
    setIsEditing(false);
    rel.type = editValue;
    recordsData.gx.relationships[relIndex] = rel;
    updateRelationshipsData(recordsData, assertions);
  }

  function handleEdit() {
    setIsEditing(true);
  }

  function editItem() {
    if (isEditing) {
      return (
        <Grid
          container
          direction="row"
          spacing={1}
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid xs>
            <FormControl fullwidth>
              <Select
                value={editValue}
                onChange={(_event, newValue) => setEditValue(newValue)}
                size="sm"
                sx={{ margin: 1 }}
              >
                {Object.keys(RELATIONSHIP).map((key) => (
                  <Option key={`relType=${key}`} value={RELATIONSHIP[key]}>
                    {key}
                  </Option>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid>
            <Stack direction="row">
              <Tooltip title="Save" arrow>
                <IconButton onClick={handleSave}>
                  <SaveIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Cancel" arrow>
                <IconButton onClick={() => setIsEditing(false)}>
                  <CancelIcon />
                </IconButton>
              </Tooltip>
            </Stack>
          </Grid>
        </Grid>
      );
    } else {
      return (
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid>
            <Typography
              level="body1"
              fontWeight="600"
              sx={{ display: "block" }}
            >
              {rel?.type}
            </Typography>
            <Typography level="body2" color="text.secondary">
              Type
            </Typography>
          </Grid>
          <Grid>
            <Tooltip title="Edit" arrow>
              <IconButton onClick={handleEdit}>
                <EditIcon />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      );
    }
  }

  return editItem();
}
