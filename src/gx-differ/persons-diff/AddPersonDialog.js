import React from "react";
import {Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, Grid, MenuItem, Select, Stack, TextField, Typography} from "@mui/material";
import {GENDER, NAME_PART_TYPE, PERSON_NAME_TYPE} from "../constants";
import {PaperComponent} from "../Styled";
import {updateRecordsData} from "./EditablePerson";
import {RecordsDataContext} from "../RecordsContext";
import {generateLocalId} from "../Utils";

export default function AddPersonDialog({open, setOpen}) {
  const recordsData = React.useContext(RecordsDataContext);

  const [prefix, setPrefix] = React.useState('');
  const [given, setGiven] = React.useState('');
  const [surname, setSurname] = React.useState('');
  const [suffix, setSuffix] = React.useState('');
  const [principal, setPrincipal] = React.useState(false);
  const [gender, setGender] = React.useState(GENDER.Unknown);
  const [type, setType] = React.useState('');

  const parts = [];
  if (prefix !== '') {
    parts.push({type: NAME_PART_TYPE.prefix, value: prefix});
  }
  if (given !== '') {
    parts.push({type: NAME_PART_TYPE.given, value: given});
  }
  if (surname !== '') {
    parts.push({type: NAME_PART_TYPE.surname, value: surname});
  }
  if (suffix !== '') {
    parts.push({type: NAME_PART_TYPE.suffix, value: suffix});
  }

  function handleDialogClose(parts, principal, gender, type) {
    setOpen(false);
    recordsData.gx.persons.push(createPerson(parts, principal, gender, type));
    updateRecordsData(recordsData);
  }

  return (
    <Dialog open={open} onClose={() => handleDialogClose(parts, principal, gender, type)} PaperComponent={PaperComponent} aria-labelledby="draggable-dialog-title">
      <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">Add Person</DialogTitle>
      <DialogContent>
        <Grid container direction='column' spacing={2}>
          <Grid item>
            <Typography>Prefix</Typography>
            <TextField key='prefix-input' value={prefix} onChange={e => setPrefix(e.target.value)}/>
          </Grid>
          <Grid item>
            <Typography>Given Name</Typography>
            <TextField key='given-input' value={given} onChange={e => setGiven(e.target.value)}/>
          </Grid>
          <Grid item>
            <Typography>Surname</Typography>
            <TextField key='surname-input' value={surname} onChange={e => setSurname(e.target.value)}/>
          </Grid>
          <Grid item>
            <Typography>Suffix</Typography>
            <TextField key='suffix-input' value={suffix} onChange={e => setSuffix(e.target.value)}/>
          </Grid>
          <Grid item>
            <FormControlLabel control={<Checkbox checked={principal} onChange={event => setPrincipal(event.target.checked)}/>} label={'Principal'}/>
          </Grid>
          <Grid item>
            <Typography>Gender</Typography>
            <Select value={gender} onChange={event => setGender(event.target.value)}>
              {Object.keys(GENDER).map(genderElement => <MenuItem key={`gender-item-${genderElement}`} value={GENDER[genderElement]}>{genderElement}</MenuItem>)}
            </Select>
          </Grid>
          <Grid item>
            <Typography>Type</Typography>
            <Select value={type} onChange={event => setType(event.target.value)}>
              {Object.keys(PERSON_NAME_TYPE).map(t => <MenuItem key={`type-item-${t}`} value={PERSON_NAME_TYPE[t]}>{t}</MenuItem>)}
            </Select>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Stack direction={"row"} spacing={2}>
          <Button color={"secondary"} onClick={() => setOpen(false)}>Cancel</Button>
          <Button color={"primary"} onClick={() => handleDialogClose(parts, principal, gender, type)}>Save</Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
}

function createPerson(nameParts, isPrincipal, gender, type) {
  return {
    id: `p_${generateLocalId()}`,
    extracted: true,
    principal: isPrincipal,
    gender: {type: gender},
    names: [
      {
        id: generateLocalId(),
        type: !type ? null : type,
        nameForms: [{
          fullText: nameParts.map(part => part.value).join(' ').trim(),
          parts: nameParts
        }]
      }
    ],
  };
}
