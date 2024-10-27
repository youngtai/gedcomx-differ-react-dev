import {
  Box,
  Button,
  Grid,
  IconButton,
  Input,
  Option,
  Select,
  Typography,
} from "@mui/joy";
import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import { FACT_KEYS, FACT_QUALIFIER } from "../constants";
import { AddIcon, DeleteIcon } from "../Icons";
import { RecordsDataContext } from "../RecordsContext";
import { hasMatchingQualifier } from "./PersonDiffUtils";

export default function EditableFactQualifier({
  attributeData,
  qualifierIndex,
  fact,
  factIndex,
  parentObject,
  parentObjectIndex,
  comparingTo,
  updateData,
}) {
  const recordsData = useContext(RecordsDataContext);

  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [value, setValue] = useState(
    attributeData ? attributeData.qualifier.value : ""
  );
  const [newValue, setNewValue] = useState("");
  const [newName, setNewName] = useState("");
  const [hasMatch, setHasMatch] = useState(
    hasMatchingQualifier(attributeData, parentObject, comparingTo)
  );

  const backgroundColor = hasMatch ? "neutral.softBg" : "warning.softBg";
  const textColor = hasMatch ? "text.primary" : "warning.plainColor";

  useEffect(() => {
    setHasMatch(hasMatchingQualifier(attributeData, parentObject, comparingTo));
    setValue(attributeData.qualifier.value);
  }, [attributeData, parentObject, comparingTo]);

  function handleSave() {
    setIsEditing(false);
    fact[FACT_KEYS.qualifiers][qualifierIndex].value = value.toString();
    parentObject.facts.splice(factIndex, 1, fact);
    updateData(parentObject, parentObjectIndex, recordsData);
  }

  function handleAdd() {
    setIsAdding(true);
  }

  function handleSaveAdd() {
    setIsAdding(false);
    if (!newValue || !newName) {
      return;
    }
    fact.qualifiers.push({ name: newName, value: newValue.toString() });
    updateData(parentObject, parentObjectIndex, recordsData);
  }

  function handleEdit() {
    setIsEditing(true);
  }

  function handleDelete() {
    delete fact[FACT_KEYS.qualifiers][qualifierIndex];
    fact[FACT_KEYS.qualifiers] = fact[FACT_KEYS.qualifiers].filter((e) => e);
    if (fact[FACT_KEYS.qualifiers].length === 0) {
      fact[FACT_KEYS.qualifiers] = null;
    }
    parentObject.facts.splice(factIndex, 1, fact);
    updateData(parentObject, parentObjectIndex, recordsData);
  }

  const editableQualifier = (
    <Grid container spacing={1} sx={{ backgroundColor, p: 1 }}>
      <Grid xs={12}>
        <Typography
          level="body-sm"
          sx={{ backgroundColor: "neutral.softBg", p: 1 }}
          hidden={qualifierIndex !== 0}
        >
          Qualifiers
        </Typography>
      </Grid>
      <Grid xs={4}>
        <Typography level="body-sm" color={textColor}>
          {attributeData.qualifier.name}
        </Typography>
        <Typography level="body-xs" color={textColor}>
          Name
        </Typography>
      </Grid>
      <Grid xs={6}>
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          size="sm"
        />
      </Grid>
      <Grid xs={2}>
        <Button onClick={handleSave} size="sm">
          Save
        </Button>
      </Grid>
    </Grid>
  );

  const addQualifier = (
    <Box sx={{ p: 1 }} hidden={!isAdding}>
      <Grid container spacing={1}>
        <Grid xs={3}>
          <Select
            value={newName}
            onChange={(e, newValue) => setNewName(newValue)}
            size="sm"
          >
            {Object.keys(FACT_QUALIFIER).map((key) => (
              <Option
                key={`qualifier-choice-${key}`}
                value={FACT_QUALIFIER[key]}
              >
                {key}
              </Option>
            ))}
          </Select>
        </Grid>
        <Grid xs={7}>
          <Input
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            size="sm"
          />
        </Grid>
        <Grid xs={2}>
          <Button onClick={handleSaveAdd} size="sm">
            Save
          </Button>
        </Grid>
      </Grid>
    </Box>
  );

  const qualifierItem = (
    <Grid container spacing={1} sx={{ backgroundColor, p: 1 }}>
      <Grid xs={4}>
        <Typography level="body-sm" color={textColor}>
          {attributeData.qualifier.name}
        </Typography>
        <Typography level="body-xs" color={textColor}>
          Name
        </Typography>
      </Grid>
      <Grid xs={6}>
        <Typography level="body-sm" color={textColor}>
          {value}
        </Typography>
        <Typography level="body-xs" color={textColor}>
          Value
        </Typography>
      </Grid>
      <Grid xs={2}>
        <Button onClick={handleEdit} size="sm">
          Edit
        </Button>
        <IconButton onClick={handleDelete} size="sm">
          <DeleteIcon />
        </IconButton>
      </Grid>
    </Grid>
  );

  return (
    <Box>
      <Box
        sx={{ backgroundColor: "neutral.softBg", p: 1 }}
        hidden={qualifierIndex !== 0}
      >
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid>
            <Typography level="title-sm">Qualifiers</Typography>
          </Grid>
          <Grid>
            <IconButton onClick={handleAdd} size="sm">
              <AddIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Box>
      {addQualifier}
      {isEditing ? editableQualifier : qualifierItem}
    </Box>
  );
}

EditableFactQualifier.propTypes = {
  attributeData: PropTypes.object,
  qualifierIndex: PropTypes.number,
  fact: PropTypes.object,
  factIndex: PropTypes.number,
  parentObject: PropTypes.object,
  parentObjectIndex: PropTypes.number,
  comparingTo: PropTypes.object,
  updateData: PropTypes.func,
};
