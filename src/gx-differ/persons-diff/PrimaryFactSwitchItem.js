import React from "react";
import { Grid, ListItemText, Switch } from "@mui/material";
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
    <Grid item sx={{ paddingX: 2 }}>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item>
          <ListItemText
            primary={KEY_TO_LABEL_MAP[attributeData.key]}
            sx={{ color: "black" }}
          />
        </Grid>
        <Grid item>
          <Switch checked={checked} onChange={handleChange} />
        </Grid>
      </Grid>
    </Grid>
  );
}
