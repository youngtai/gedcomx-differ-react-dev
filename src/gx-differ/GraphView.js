import React from "react";
import {findDOMNode} from "react-dom";
import {Alert, Box} from "@mui/material";

export default function GraphView({gx}) {
  const gxRef = React.useRef();
  const [alert, setAlert] = React.useState("");

  React.useEffect(() => {
    if (gx) {
      try {
        const graph = new window.RelationshipGraph(gx);
        new window.RelChartBuilder(graph, window.$(findDOMNode(gxRef.current)), new window.ChartOptions({ shouldShowConfidence: false, shouldDisplayIds: false })).buildChart();
      } catch (e) {
        console.error("Error creating GedcomX graph:", e);
        setAlert("Error creating GedcomX graph. See console for details");
      }
    }
  }, [gx]);

  return (
    <Box sx={{position: 'relative', height: 'auto', overflowX: 'auto', margin: 2}}>
      <div ref={gxRef}/>
      {alert !== "" && <Alert severity={"error"} onClose={() => setAlert("")}>{alert}</Alert>}
    </Box>
  );
}
