import { Stack } from "@mui/joy";
import PropTypes from "prop-types";
import EditableCoverageData from "./EditableCoverageData";

export default function EditableRecordSourceDescription({
  recordSourceDescription,
  sourceDescriptionIndex,
}) {
  const coverages = recordSourceDescription?.coverage
    ? recordSourceDescription.coverage
    : [];

  return (
    <Stack>
      {coverages.map((coverage, idx) => (
        <EditableCoverageData
          key={`coverage-data-${idx}`}
          coverage={coverage}
          coverageIndex={idx}
          sourceDescriptionIndex={sourceDescriptionIndex}
        />
      ))}
    </Stack>
  );
}

EditableRecordSourceDescription.propTypes = {
  recordSourceDescription: PropTypes.object,
  sourceDescriptionIndex: PropTypes.number,
};
