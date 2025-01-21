import PropTypes from "prop-types";
import { Button, Stack } from "@mui/joy";
import Clipboard from "react-clipboard.js";

export default function DownloadCopyButtons({
  data,
  label,
  side,
  handleDownload,
}) {
  const suffixLabel = label === "Aligned" ? "final" : label.toLowerCase();
  const filenameSuffix = side ? `${side}.${suffixLabel}` : suffixLabel;

  return (
    <Stack direction="row" spacing={2}>
      <Button
        variant="outlined"
        onClick={() => handleDownload(data, filenameSuffix)}
      >
        {`Download ${label}`}
      </Button>
      <Button variant="outlined">
        <Clipboard data-clipboard-text={JSON.stringify(data)} component="div">
          {`Copy ${label}`}
        </Clipboard>
      </Button>
    </Stack>
  );
}

DownloadCopyButtons.propTypes = {
  data: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  side: PropTypes.string,
  handleDownload: PropTypes.func.isRequired,
};
