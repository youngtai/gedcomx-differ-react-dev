import { Grid, Stack, Switch, Typography } from "@mui/joy";
import PropTypes from "prop-types";
import React from "react";
import { KEY_TO_LABEL_MAP } from "../constants";
import { RecordsDataContext } from "../RecordsContext";

export default function PrimaryFactSwitchItem({
  attributeData,
  fact,
  factIndex,
  parentObject,
  parentObjectIndex,
  updateData,
}) {
  const recordsData = React.useContext(RecordsDataContext);

  const [checked, setChecked] = React.useState(attributeData.value);

  const handleChange = (event) => {
    const switchChecked = event.target.checked;
    setChecked(switchChecked);
    fact.primary = switchChecked;
    parentObject.facts.splice(factIndex, 1, fact);
    updateData(parentObject, parentObjectIndex, recordsData);
  };

  return (
    <Grid sx={{ px: 2 }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography level="body1" fontWeight={600}>
          {`Is ${checked ? "a": "not a"} ${KEY_TO_LABEL_MAP[attributeData.key]} Fact`}
        </Typography>
        <Switch checked={checked} onChange={handleChange} />
      </Stack>
    </Grid>
  );
}

PrimaryFactSwitchItem.propTypes = {
  attributeData: PropTypes.object,
  fact: PropTypes.object,
  factIndex: PropTypes.number,
  parentObject: PropTypes.object,
  parentObjectIndex: PropTypes.number,
  updateData: PropTypes.func,
};
