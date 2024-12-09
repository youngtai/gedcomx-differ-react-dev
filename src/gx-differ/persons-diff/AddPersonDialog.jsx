import {
  Button,
  Checkbox,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalClose,
  ModalDialog,
  Option,
  Select,
  Stack,
} from "@mui/joy";
import PropTypes from "prop-types";
import React from "react";
import { GENDER, NAME_PART_TYPE, PERSON_NAME_TYPE } from "../constants";
import { RecordsDataContext } from "../RecordsContext";
import { createPerson, updateRecordsData } from "./PersonDiffUtils";

export default function AddPersonDialog({ open, setOpen }) {
  const recordsData = React.useContext(RecordsDataContext);

  const [prefix, setPrefix] = React.useState("");
  const [given, setGiven] = React.useState("");
  const [surname, setSurname] = React.useState("");
  const [suffix, setSuffix] = React.useState("");
  const [principal, setPrincipal] = React.useState(false);
  const [gender, setGender] = React.useState(GENDER.Unknown);
  const [type, setType] = React.useState("");

  const parts = [];
  if (prefix !== "") {
    parts.push({ type: NAME_PART_TYPE.prefix, value: prefix });
  }
  if (given !== "") {
    parts.push({ type: NAME_PART_TYPE.given, value: given });
  }
  if (surname !== "") {
    parts.push({ type: NAME_PART_TYPE.surname, value: surname });
  }
  if (suffix !== "") {
    parts.push({ type: NAME_PART_TYPE.suffix, value: suffix });
  }

  function saveChanges() {
    setOpen(false);
    recordsData.gx.persons.push(createPerson(parts, principal, gender, type));
    updateRecordsData(recordsData);
  }

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <ModalDialog
        aria-labelledby="add-person-dialog-title"
        layout="center"
        sx={{ minWidth: 500 }}
      >
        <ModalClose />
        <DialogTitle>Add Person</DialogTitle>
        <DialogContent>
          <Stack spacing={2} padding={2}>
            <FormControl>
              <FormLabel>Prefix</FormLabel>
              <Input
                value={prefix}
                onChange={(e) => setPrefix(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Given Name</FormLabel>
              <Input value={given} onChange={(e) => setGiven(e.target.value)} />
            </FormControl>
            <FormControl>
              <FormLabel>Surname</FormLabel>
              <Input
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Suffix</FormLabel>
              <Input
                value={suffix}
                onChange={(e) => setSuffix(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <Checkbox
                label="Principal"
                checked={principal}
                onChange={(event) => setPrincipal(event.target.checked)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Gender</FormLabel>
              <Select value={gender} onChange={(_, value) => setGender(value)}>
                {Object.keys(GENDER).map((genderElement) => (
                  <Option
                    key={`gender-item-${genderElement}`}
                    value={GENDER[genderElement]}
                  >
                    {genderElement}
                  </Option>
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Type</FormLabel>
              <Select value={type} onChange={(_, value) => setType(value)}>
                {Object.keys(PERSON_NAME_TYPE).map((t) => (
                  <Option key={`type-item-${t}`} value={PERSON_NAME_TYPE[t]}>
                    {t}
                  </Option>
                ))}
              </Select>
            </FormControl>
            <DialogActions>
              <Button color="neutral" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" color="primary" onClick={saveChanges}>
                Save
              </Button>
            </DialogActions>
          </Stack>
        </DialogContent>
      </ModalDialog>
    </Modal>
  );
}

AddPersonDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};
