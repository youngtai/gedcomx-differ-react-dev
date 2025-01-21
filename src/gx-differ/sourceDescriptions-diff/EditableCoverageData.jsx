import {
  Button,
  FormControl,
  Grid,
  IconButton,
  Input,
  Option,
  Select,
  Sheet,
  Stack,
  Tooltip,
} from "@mui/joy";
import PropTypes from "prop-types";
import React from "react";
import { COVERAGE_ATTRIBUTES } from "../constants";
import { AddIcon, CancelIcon, SaveIcon } from "../Icons";
import { RecordsDataContext } from "../RecordsContext";
import EditableCoverageDataItem from "./EditableCoverageDataItem";
import { updateSourceDescriptionsData } from "./SourceDescriptionsDiffUtils";

function getMissingCoverageItem(presentItems) {
  return Object.entries(COVERAGE_ATTRIBUTES)
    .filter((attribute) => !presentItems.includes(attribute[0]))
    .map((attribute) => attribute[1]);
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

  function handleSaveNewCoverageItem() {
    setIsAddingCoverageItem(false);
    if (
      newCoverageItemValue === "" ||
      newCoverageItemValue === undefined ||
      newCoverageItemValue === null
    ) {
      return;
    }

    const coverageCopy = structuredClone(coverage);
    if (
      newCoverageItemKey === COVERAGE_ATTRIBUTES.spatial ||
      newCoverageItemKey === COVERAGE_ATTRIBUTES.temporal
    ) {
      coverageCopy[newCoverageItemKey] = { original: newCoverageItemValue };
    } else if (newCoverageItemKey === COVERAGE_ATTRIBUTES.recordType) {
      coverageCopy[newCoverageItemKey] = newCoverageItemValue;
    }
    recordsData.gx.sourceDescriptions[sourceDescriptionIndex].coverage.splice(
      coverageIndex,
      1,
      coverageCopy
    );
    updateSourceDescriptionsData(recordsData);
    setNewCoverageItemKey("");
  }

  const addCoverageItem = isAddingCoverageItem ? (
    <Grid container direction="row" spacing={1} alignItems="center">
      <Grid xs>
        <Stack direction="row" spacing={2}>
          <FormControl fullwidth>
            <Select
              value={newCoverageItemKey}
              onChange={(_, value) => setNewCoverageItemKey(value)}
              placeholder="Coverage Type"
            >
              {getMissingCoverageItem(presentItems).map((item, idx) => (
                <Option key={`coverage-option-${idx}`} value={item}>
                  {item}
                </Option>
              ))}
            </Select>
          </FormControl>
          <Input
            value={newCoverageItemValue}
            onChange={(event) => setNewCoverageItemValue(event.target.value)}
            fullwidth
          />
        </Stack>
      </Grid>
      <Grid>
        <Tooltip title="Cancel" arrow>
          <IconButton onClick={() => setIsAddingCoverageItem(false)}>
            <CancelIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Save" arrow>
          <IconButton onClick={handleSaveNewCoverageItem}>
            <SaveIcon />
          </IconButton>
        </Tooltip>
      </Grid>
    </Grid>
  ) : (
    coverageItems.length < 3 && (
      <Button
        onClick={() => setIsAddingCoverageItem(true)}
        endDecorator={<AddIcon />}
      >
        Add Coverage Element
      </Button>
    )
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
