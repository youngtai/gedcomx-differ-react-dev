import {
  Box,
  Button,
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
import {
  GEDCOMX_INTERPRETED,
  GEDCOMX_ORIGINAL,
  RECORD_FIELD_TYPE,
} from "../constants";
import { AddIcon, CancelIcon, SaveIcon } from "../Icons";
import { RecordsDataContext } from "../RecordsContext";
import EditableRecordField from "./EditableRecordField";
import { updateFieldsData } from "./FieldsDiffUtils";

export default function FieldsList({ fields }) {
  const recordsData = React.useContext(RecordsDataContext);
  const [adding, setAdding] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [type, setType] = React.useState("");

  const valueType =
    type === RECORD_FIELD_TYPE.CertificateNumber
      ? GEDCOMX_ORIGINAL
      : GEDCOMX_INTERPRETED;

  function handleSave() {
    setAdding(false);
    if (!value || !type) {
      return;
    }
    const newField = {
      type: type,
      values: [
        {
          type: valueType,
          text: value,
        },
      ],
    };
    if (recordsData.gx.fields) {
      recordsData.gx.fields.push(newField);
    } else {
      recordsData.gx.fields = [];
      recordsData.gx.fields.push(newField);
    }

    updateFieldsData(recordsData);

    setValue("");
    setType("");
  }

  return (
    <>
      {adding ? (
        <Sheet
          sx={{
            margin: 2,
            padding: 2,
          }}
        >
          <Grid
            container
            spacing={1}
            alignItems="center"
          >
            <Grid xs>
              <Input
                value={value}
                fullwidth
                onChange={(event) => setValue(event.target.value)}
                placeholder="Enter record field value..."
              />
              <Box height={6} />
              <Select
                value={type}
                onChange={(newValue) => setType(newValue)}
                fullwidth
                placeholder="Select record field type..."
              >
                {Object.keys(RECORD_FIELD_TYPE).map((key) => (
                  <Option key={`type-${key}`} value={RECORD_FIELD_TYPE[key]}>
                    {key}
                  </Option>
                ))}
              </Select>
            </Grid>
            <Grid>
              <Tooltip title="Cancel" arrow>
                <IconButton onClick={() => setAdding(false)}>
                  <CancelIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Save" arrow>
                <IconButton onClick={handleSave}>
                  <SaveIcon />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Sheet>
      ) : (
        <Button onClick={() => setAdding(true)} startDecorator={<AddIcon />}>
          Add Field
        </Button>
      )}
      <Box height={12} />
      <Stack spacing={2}>
        {fields.map((field, index) => (
          <EditableRecordField
            key={`field-${index}`}
            field={field}
            fieldIndex={index}
          />
        ))}
      </Stack>
    </>
  );
}

FieldsList.propTypes = {
  fields: PropTypes.array,
};
