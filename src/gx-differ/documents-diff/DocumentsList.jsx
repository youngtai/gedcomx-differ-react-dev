import { Stack } from "@mui/joy";
import PropTypes from "prop-types";
import EditableDocument from "./EditableDocument";

export default function DocumentsList({ documents }) {
  return (
    <Stack>
      {documents?.map((document, index) => (
        <EditableDocument
          key={`document-${index}`}
          document={document}
          documentIndex={index}
        />
      ))}
    </Stack>
  );
}

DocumentsList.propTypes = {
  documents: PropTypes.arrayOf(PropTypes.object).isRequired,
};
