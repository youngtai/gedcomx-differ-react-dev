import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Input,
  Modal,
  ModalDialog,
  Option,
  Select,
  Stack,
  Typography,
} from "@mui/joy";
import PropTypes from "prop-types";
import React from "react";
import { NAME_PART_TYPE, PERSON_NAME_TYPE } from "../constants";
import { PaperComponent } from "../Styled";

export default function PersonNameEditDialog({
  open,
  setOpen,
  onClose,
  nameParts,
  person,
}) {
  const [prefix, setPrefix] = React.useState(
    nameParts?.prefix ? nameParts.prefix.value : ""
  );
  const [given, setGiven] = React.useState(
    nameParts?.given ? nameParts.given.value : ""
  );
  const [surname, setSurname] = React.useState(
    nameParts?.surname ? nameParts.surname.value : ""
  );
  const [suffix, setSuffix] = React.useState(
    nameParts?.suffix ? nameParts.suffix.value : ""
  );
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

  React.useEffect(() => {
    setPrefix(nameParts?.prefix ? nameParts.prefix.value : "");
    setGiven(nameParts?.given ? nameParts.given.value : "");
    setSurname(nameParts?.surname ? nameParts.surname.value : "");
    setSuffix(nameParts?.suffix ? nameParts.suffix.value : "");
  }, [
    nameParts?.given,
    nameParts?.prefix,
    nameParts?.suffix,
    nameParts?.surname,
  ]);

  return (
    <Modal
      open={open}
      onClose={() => onClose(parts, type, person)}
      component={PaperComponent}
      hideBackdrop
      aria-labelledby="draggable-dialog-title"
    >
      <ModalDialog>
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          Edit Name
        </DialogTitle>
        <DialogContent>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <Typography>Prefix</Typography>
              <Input
                value={prefix}
                onChange={(e) => setPrefix(e.target.value)}
                variant="outlined"
              />
            </Grid>
            <Grid item>
              <Typography>Given Name</Typography>
              <Input
                value={given}
                onChange={(e) => setGiven(e.target.value)}
                variant="outlined"
              />
            </Grid>
            <Grid item>
              <Typography>Surname</Typography>
              <Input
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                variant="outlined"
              />
            </Grid>
            <Grid item>
              <Typography>Suffix</Typography>
              <Input
                value={suffix}
                onChange={(e) => setSuffix(e.target.value)}
                variant="outlined"
              />
            </Grid>
            <Grid item>
              <Typography>Type</Typography>
              <Select
              value={type}
              onChange={(event) => setType(event?.target?.value)}
              placeholder="Name Type..."
            >
              {Object.keys(PERSON_NAME_TYPE).map((t) => (
                <Option key={`type-item-${t}`} value={PERSON_NAME_TYPE[t]}>
                  {t}
                </Option>
              ))}
            </Select>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              color="neutral"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => onClose(parts, type, person)}
            >
              Save
            </Button>
          </Stack>
        </DialogActions>
      </ModalDialog>
    </Modal>
  );
}

PersonNameEditDialog.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  onClose: PropTypes.func,
  nameParts: PropTypes.object,
  person: PropTypes.object,
};
