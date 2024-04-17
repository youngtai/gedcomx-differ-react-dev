import React from "react";
import { RecordsDataContext } from "../RecordsContext";
import { updateRelationshipsData } from "./RelationshipsDiff";
import {
  Button,
  FormControl,
  Grid,
  IconButton,
  ListItemText,
  MenuItem,
  Select,
} from "@mui/material";
import { AssertionsContext } from "../AssertionsContext";
import { RELATIONSHIP } from "../constants";
import { Cancel } from "@mui/icons-material";

export default function EditableRelationshipAttribute({
  rel,
  relIndex,
  isEditing,
  setIsEditing,
}) {
  const recordsData = React.useContext(RecordsDataContext);
  const assertions = React.useContext(AssertionsContext).assertions;
  const [editValue, setEditValue] = React.useState(rel?.type ? rel.type : "");

  function handleSave() {
    setIsEditing(false);
    rel.type = editValue;
    recordsData.gx.relationships[relIndex] = rel;
    updateRelationshipsData(recordsData, assertions);
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
          <Grid item xs={10}>
            <FormControl fullWidth>
              <Select
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                size="small"
                sx={{ margin: 1 }}
              >
                {Object.keys(RELATIONSHIP).map((key) => (
                  <MenuItem key={`relType=${key}`} value={RELATIONSHIP[key]}>
                    {key}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={1.2}>
            <Button onClick={handleSave}>Save</Button>
          </Grid>
          <Grid item xs={0.8}>
            <IconButton onClick={() => setIsEditing(false)}>
              <Cancel />
            </IconButton>
          </Grid>
        </Grid>
      );
    } else {
      return (
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <ListItemText primary={rel?.type} secondary={"Type"} />
          </Grid>
        </Grid>
      );
    }
  }

  return editItem();
}
