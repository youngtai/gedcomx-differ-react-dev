import {
  Box,
  Button,
  Grid,
  Input,
  MenuItem,
  Select,
  Sheet,
  Stack,
} from "@mui/joy";
import PropTypes from "prop-types";
import React from "react";
import { COVERAGE_ATTRIBUTES } from "../constants";
import { AddIcon } from "../Icons";
import { RecordsDataContext } from "../RecordsContext";
import EditableCoverageDataItem from "./EditableCoverageDataItem";
import { updateSourceDescriptionsData } from "./SourceDescriptionsDiffUtils";

function getMissingCoverageItem(presentItems) {
  return Object.keys(COVERAGE_ATTRIBUTES).filter(
    (attribute) => !presentItems.includes(attribute)
  );
}

export default function EditableCoverageData({
  coverage,
  coverageIndex,
  sourceDescriptionIndex,
}) {
  const recordsData = React.useContext(RecordsDataContext);
  const [isAddingCoverageItem, setIsAddingCoverageItem] = React.useState(false);
  const [newCoverageItemValue, setNewCoverageItemValue] = React.useState("");
  const [newCoverageItemKey, setNewCoverageItemKey] = React.useState("");
  const coverageItems = [];
  const presentItems = [];

  // Collect coverage items based on their existence
  if (coverage.spatial) {
    coverageItems.push({ label: "Spatial", data: coverage.spatial });
    presentItems.push("spatial");
  }
  if (coverage.temporal) {
    coverageItems.push({ label: "Temporal", data: coverage.temporal });
    presentItems.push("temporal");
  }
  if (coverage.recordType) {
    coverageItems.push({ label: "Record Type", data: coverage.recordType });
    presentItems.push("recordType");
  }

  function handleAddCoverageItem() {
    setIsAddingCoverageItem(true);
  }

  function handleSaveNewCoverageItem() {
    setIsAddingCoverageItem(false);
    if (newCoverageItemValue === "") {
      return;
    }
    if (
      newCoverageItemKey === COVERAGE_ATTRIBUTES.spatial ||
      newCoverageItemKey === COVERAGE_ATTRIBUTES.temporal
    ) {
      coverage[newCoverageItemKey] = { original: newCoverageItemValue };
    } else if (newCoverageItemKey === COVERAGE_ATTRIBUTES.recordType) {
      coverage[newCoverageItemKey] = newCoverageItemValue;
    }
    recordsData.gx.sourceDescriptions[sourceDescriptionIndex].coverage.splice(
      coverageIndex,
      1,
      coverage
    );
    updateSourceDescriptionsData(recordsData);
    setNewCoverageItemKey("");
  }

  const addCoverageItem = isAddingCoverageItem ? (
    <Grid container direction={"row"} alignItems={"center"} spacing={1}>
      <Grid item xs={10}>
        <Grid container direction={"row"} alignItems={"center"} spacing={1}>
          <Grid item xs={3}>
            <Select
              value={newCoverageItemKey}
              onChange={(e) => setNewCoverageItemKey(e.target.value)}
              variant="outlined" // Variant for Joy UI Select
              fullwidth
            >
              {getMissingCoverageItem(presentItems).map((a, idx) => (
                <MenuItem key={`coverage-option-${idx}`} value={a}>
                  {a}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={9}>
            <Input
              value={newCoverageItemValue}
              onChange={(e) => setNewCoverageItemValue(e.target.value)}
              fullwidth
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={2}>
        <Button onClick={handleSaveNewCoverageItem}>Save</Button>
      </Grid>
    </Grid>
  ) : (
    <Box hidden={coverageItems.length === 3}>
      <Button onClick={handleAddCoverageItem} endDecorator={<AddIcon />}>
        Add Coverage Element
      </Button>
    </Box>
  );

  return (
    <Sheet sx={{ padding: 2, borderRadius: "sm" }} variant="outlined">
      <Stack>
        {coverageItems.map((item) => (
          <EditableCoverageDataItem
            key={`coverage-${coverageIndex}-${item.label}`}
            coverageItem={item.data}
            coverageIndex={coverageIndex}
            label={item.label}
            sourceDescriptionIndex={sourceDescriptionIndex}
          />
        ))}
        {addCoverageItem}
      </Stack>
    </Sheet>
  );
}

EditableCoverageData.propTypes = {
  coverage: PropTypes.object.isRequired,
  coverageIndex: PropTypes.number.isRequired,
  sourceDescriptionIndex: PropTypes.number.isRequired,
};
