import PropTypes from "prop-types"
import React from "react";
import { Alert, Box } from "@mui/joy";

export default function GraphView({ gx }) {
  const gxRef = React.useRef();
  const [alert, setAlert] = React.useState("");

  React.useEffect(() => {
    if (gx) {
      try {
        const graph = new window.RelationshipGraph(gx);
        new window.RelChartBuilder(
          graph,
          window.$(gxRef.current),
          new window.ChartOptions({
            shouldShowConfidence: false,
            shouldDisplayIds: false,
          }),
        ).buildChart();
      } catch (e) {
        console.error("Error creating GedcomX graph:", e);
        setAlert("Error creating GedcomX graph. See console for details");
      }
    }
  }, [gx]);

  return (
    <Box
      sx={{
        position: "relative",
        height: "auto",
        overflowX: "auto",
        padding: 2,
      }}
    >
      <div ref={gxRef} />
      {alert !== "" && (
        <Alert
          color="danger"
          onClose={() => setAlert("")}
        >
          {alert}
        </Alert>
      )}
    </Box>
  );
}

GraphView.propTypes = {
  gx: PropTypes.object.isRequired,
};
