import { Box, Card, Typography } from "@mui/joy";
import PropTypes from "prop-types";
import { fullTextName, getPersonById } from "./RelationshipsDiffUtils";

export function Relationship({ rel, persons }) {
  return (
    <Card variant="outlined" sx={{ margin: 2 }}>
      <Box sx={{ padding: 2 }}>
        <Box sx={{ marginBottom: 1 }}>
          <Typography level="body1">
            {fullTextName(getPersonById(rel?.person1?.resourceId, persons))}
          </Typography>
          <Typography level="body2" sx={{ color: "text.secondary" }}>
            Person 1
          </Typography>
        </Box>
        <Box sx={{ marginBottom: 1 }}>
          <Typography level="body1">{rel?.type}</Typography>
          <Typography level="body2" sx={{ color: "text.secondary" }}>
            Type
          </Typography>
        </Box>
        <Box>
          <Typography level="body1">
            {fullTextName(getPersonById(rel?.person2?.resourceId, persons))}
          </Typography>
          <Typography level="body2" sx={{ color: "text.secondary" }}>
            Person 2
          </Typography>
        </Box>
      </Box>
    </Card>
  );
}

Relationship.propTypes = {
  rel: PropTypes.object,
  persons: PropTypes.array,
};
