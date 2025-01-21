import { Sheet, Stack, Typography } from "@mui/joy";
import Grid from "@mui/joy/Grid";
import PropTypes from "prop-types";
import DownloadCopyButtons from "./DownloadCopyButton";
import GedcomViewer from "./GedcomxViewer";
import GraphView from "./GraphView";

export default function Graphs({
  leftGx,
  leftTab,
  leftFilename,
  leftGxOriginal,
  rightGx,
  rightTab,
  rightFilename,
  rightGxOriginal,
  finalGx,
  setLeftTab,
  setRightTab,
}) {
  function handleDownload(gx, suffix) {
    const downloadLink = document.createElement("a");
    const filename = `${leftFilename.substring(
      0,
      leftFilename.indexOf(".")
    )}.${suffix}.json`;
    downloadLink.setAttribute("download", filename);
    const blob = new Blob([JSON.stringify(gx)], { type: "application/json" });
    downloadLink.href = window.URL.createObjectURL(blob);
    document.body.appendChild(downloadLink);

    window.requestAnimationFrame(() => {
      downloadLink.dispatchEvent(new MouseEvent("click"));
      document.body.removeChild(downloadLink);
    });
  }

  return (
    <Grid container spacing={1}>
      <Grid xs={4}>
        <Stack spacing={2}>
          <DownloadCopyButtons
            data={leftGx}
            label={leftTab === 0 ? "Original" : "Edited"}
            side="left"
            handleDownload={handleDownload}
          />
          <GedcomViewer
            gx={{ original: leftGxOriginal, edited: leftGx }}
            filename={leftFilename}
            tab={leftTab}
            handleTabChange={(_event, newValue) => setLeftTab(newValue)}
          />
        </Stack>
      </Grid>
      <Grid xs={4}>
        <Stack spacing={2}>
          <DownloadCopyButtons
            data={finalGx}
            label="Aligned"
            handleDownload={handleDownload}
          />
          <Sheet sx={{ padding: 2, borderRadius: "sm" }}>
            <Typography level="h6">Aligned GedcomX</Typography>
            <GraphView gx={finalGx} />
          </Sheet>
        </Stack>
      </Grid>
      <Grid xs={4}>
        <Stack spacing={2}>
          <DownloadCopyButtons
            data={rightGx}
            label={rightTab === 0 ? "Original" : "Edited"}
            side="right"
            handleDownload={handleDownload}
          />
          <GedcomViewer
            gx={{ original: rightGxOriginal, edited: rightGx }}
            filename={rightFilename}
            tab={rightTab}
            handleTabChange={(_event, newValue) => setRightTab(newValue)}
          />
        </Stack>
      </Grid>
    </Grid>
  );
}

Graphs.propTypes = {
  leftGx: PropTypes.object.isRequired,
  leftTab: PropTypes.number.isRequired,
  leftFilename: PropTypes.string.isRequired,
  leftGxOriginal: PropTypes.object.isRequired,
  rightGx: PropTypes.object.isRequired,
  rightTab: PropTypes.number.isRequired,
  rightFilename: PropTypes.string.isRequired,
  rightGxOriginal: PropTypes.object.isRequired,
  finalGx: PropTypes.object.isRequired,
  setLeftTab: PropTypes.func.isRequired,
  setRightTab: PropTypes.func.isRequired,
};
