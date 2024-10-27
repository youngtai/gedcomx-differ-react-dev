import PropTypes from "prop-types";
import {
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Stack,
  Sheet,
  Typography,
} from "@mui/joy";
import { FileDrop } from "react-file-drop";
import FileUpload from "./FileUpload";
import PasteInputButtons from "./PasteInputButtons";
import { normalizeGedcomx } from "./Utils";

export default function InputOptions({
  onFileUpload,
  handleClearData,
  setLeftGx,
  setRightGx,
  setLeftGxOriginal,
  setRightGxOriginal,
  setLeftFilename,
  setRightFilename,
  assertions,
  setAssertions,
}) {
  async function handleRightFileDrop(files, setRightGx) {
    let droppedGxObject = null;
    if (!files || files.length > 1) {
      console.log("Problem reading file, or too many files (max 1)");
    } else {
      droppedGxObject = JSON.parse(await files[0].text());
      droppedGxObject = droppedGxObject.records
        ? droppedGxObject.records[0]
        : droppedGxObject;
      droppedGxObject = normalizeGedcomx(droppedGxObject);
      setRightGx(droppedGxObject);
      setRightGxOriginal(droppedGxObject);
      setRightFilename(files[0].name);
    }
  }

  async function handleLeftFileDrop(files, setLeftGx) {
    let droppedGxObject = null;
    if (!files || files.length > 1) {
      console.log("Problem reading file, or too many files (max 1)");
    } else {
      droppedGxObject = JSON.parse(await files[0].text());
      droppedGxObject = droppedGxObject.records
        ? droppedGxObject.records[0]
        : droppedGxObject;
      droppedGxObject = normalizeGedcomx(droppedGxObject);
      setLeftGx(droppedGxObject);
      setLeftGxOriginal(droppedGxObject);
      setLeftFilename(files[0].name);
    }
  }

  return (
    <>
      <FileDrop
        className="left-file-drop"
        onDrop={(files) => handleLeftFileDrop(files, setLeftGx)}
      >
        Drop File Here
      </FileDrop>
      <FileDrop
        className="right-file-drop"
        onDrop={(files) => handleRightFileDrop(files, setRightGx)}
      >
        Drop File Here
      </FileDrop>
      <Sheet variant="soft" sx={{ padding: 2, borderRadius: "sm" }}>
        {" "}
        {/* Replaced Paper with Sheet */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack spacing={2}>
            <Typography level="h4">Input Options</Typography>{" "}
            {/* Typography using Joy UI */}
            <Stack direction="row" spacing={4} alignItems="center">
              <FileUpload
                onChange={onFileUpload}
                allowedExtensions={[".json"]}
              />
              <Button onClick={handleClearData} variant="solid" color="danger">
                Clear Data
              </Button>
            </Stack>
            <PasteInputButtons
              setLeftGx={setLeftGx}
              setRightGx={setRightGx}
              setLeftGxOriginal={setLeftGxOriginal}
              setRightGxOriginal={setRightGxOriginal}
              setLeftFilename={setLeftFilename}
              setRightFilename={setRightFilename}
            />
          </Stack>
          <FormControl>
            <FormLabel>Diff Options</FormLabel>
            <Stack direction="row" alignItems="center">
              <Checkbox
                label="Diff name type (off for ACE/SLS GedcomX comparison)"
                checked={assertions.nameType}
                onChange={(event) =>
                  setAssertions({
                    ...assertions,
                    nameType: event.target.checked,
                  })
                }
              />
            </Stack>
          </FormControl>
        </Stack>
      </Sheet>
    </>
  );
}

InputOptions.propTypes = {
  onFileUpload: PropTypes.func.isRequired,
  handleClearData: PropTypes.func.isRequired,
  setLeftGx: PropTypes.func.isRequired,
  setRightGx: PropTypes.func.isRequired,
  setLeftGxOriginal: PropTypes.func.isRequired,
  setRightGxOriginal: PropTypes.func.isRequired,
  setLeftFilename: PropTypes.func.isRequired,
  setRightFilename: PropTypes.func.isRequired,
  assertions: PropTypes.object.isRequired,
  setAssertions: PropTypes.func.isRequired,
};
