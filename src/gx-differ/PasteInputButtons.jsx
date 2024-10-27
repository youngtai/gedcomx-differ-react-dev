import PropTypes from "prop-types";
import { Button, Stack, Tooltip } from "@mui/joy"; // Using Joy UI components
import { normalizeGedcomx } from "./Utils";

export default function PasteInputButtons({
  setLeftGx,
  setLeftGxOriginal,
  setRightGx,
  setRightGxOriginal,
  setLeftFilename,
  setRightFilename,
}) {
  function pasteButton(setters, label) {
    return (
      <Tooltip title={"Click to paste GedcomX from your clipboard"}>
        <Button
          color="neutral" // Using Joy UI's "neutral" color instead of "secondary"
          variant="outlined"
          onClick={async () => {
            try {
              const gxText = await navigator.clipboard.readText();
              if (!(gxText.startsWith("{") || gxText.startsWith("["))) {
                return Promise.reject("Clipboard data is not valid JSON");
              }
              let gx = JSON.parse(gxText);
              gx = normalizeGedcomx(gx);
              setters.setGx(gx);
              setters.setGxOriginal(structuredClone(gx));
              setters.setFilename("Pasted GedcomX");
            } catch (error) {
              console.error("Problem reading clipboard data: ", error);
            }
          }}
        >
          {label}
        </Button>
      </Tooltip>
    );
  }

  const leftSetters = {
    setGx: setLeftGx,
    setGxOriginal: setLeftGxOriginal,
    setFilename: setLeftFilename,
  };
  const rightSetters = {
    setGx: setRightGx,
    setGxOriginal: setRightGxOriginal,
    setFilename: setRightFilename,
  };

  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      {pasteButton(leftSetters, "Paste Left GedcomX")}
      {pasteButton(rightSetters, "Paste Right GedcomX")}
    </Stack>
  );
}

PasteInputButtons.propTypes = {
  setLeftGx: PropTypes.func.isRequired,
  setLeftGxOriginal: PropTypes.func.isRequired,
  setRightGx: PropTypes.func.isRequired,
  setRightGxOriginal: PropTypes.func.isRequired,
  setLeftFilename: PropTypes.func.isRequired,
  setRightFilename: PropTypes.func.isRequired,
};
