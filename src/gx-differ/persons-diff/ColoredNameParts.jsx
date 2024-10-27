import { Grid, Typography, useTheme } from "@mui/joy";
import PropTypes from "prop-types";

function makeQuestionableWhitespaceVisible(input) {
  return input?.replace(/^\s+|\s{2,}|\s+$/g, "_");
}

export default function ColoredNameParts({ nameParts, hasMatch }) {
  const theme = useTheme();
  const prefixColor = hasMatch
    ? "#8a5300"
    : theme.palette.diff.color;
  const givenColor = hasMatch ? null : theme.palette.diff.color;
  const surnameColor = hasMatch
    ? "#7518d2"
    : theme.palette.diff.color;
  const suffixColor = hasMatch
    ? "#9c9c9c"
    : theme.palette.diff.color;

  return (
    <Grid container spacing={2}>
      <NamePart part={nameParts.prefix} label="Prefix" color={prefixColor} />
      <NamePart part={nameParts.given} label="Given" color={givenColor} />
      <NamePart part={nameParts.surname} label="Surname" color={surnameColor} />
      <NamePart part={nameParts.suffix} label="Suffix" color={suffixColor} />
    </Grid>
  );
}

const NamePart = ({ part, label, color }) =>
  part && (
    <Grid xs="auto">
      <Typography level="h4" fontSize="xl" fontWeight="lg" sx={{ color }}>
        {makeQuestionableWhitespaceVisible(part.value)}
      </Typography>
      <Typography level="body-sm">{label}</Typography>
    </Grid>
  );

NamePart.propTypes = {
  part: PropTypes.object,
  label: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

ColoredNameParts.propTypes = {
  nameParts: PropTypes.object.isRequired,
  hasMatch: PropTypes.bool.isRequired,
};
