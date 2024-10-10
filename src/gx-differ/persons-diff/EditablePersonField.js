import React from 'react'
import {
  Button,
  Grid,
  IconButton,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
  TextField,
  useTheme,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { updatePersonsData } from './EditablePerson'
import { PERSON_FIELD_TYPE } from '../constants'
import { RecordsDataContext } from '../RecordsContext'
import { haveSamePersonFields, isMatchingPerson } from './PersonDiffUtils'

function hasMatchingField(person, comparingToPersons) {
  const matchingPerson = comparingToPersons.find((comparingToPerson) =>
    isMatchingPerson(person, comparingToPerson)
  )
  if (matchingPerson) {
    return haveSamePersonFields(person?.fields, matchingPerson?.fields)
  }
}

export default function EditablePersonField({
  field,
  fieldIndex,
  person,
  personIndex,
}) {
  const theme = useTheme()
  const recordsData = React.useContext(RecordsDataContext)
  const persons = recordsData.gx.persons
  const comparingTo = recordsData.comparingToGx.persons

  const [isEditing, setIsEditing] = React.useState(false)
  const [editFieldType, setEditFieldType] = React.useState(
    field && field.type ? field.type : ''
  )
  const [editFieldValue, setEditFieldValue] = React.useState(
    field ? field.values[0].text : ''
  )
  const [hasMatch, setHasMatch] = React.useState(
    hasMatchingField(person, comparingTo)
  )

  const backgroundColor = hasMatch
    ? theme.palette.fact.background
    : theme.palette.diff.background
  const textColor = hasMatch ? null : theme.palette.diff.color

  React.useEffect(() => {
    setHasMatch(hasMatchingField(person, comparingTo))
  }, [persons, comparingTo])

  function handleEdit() {
    setIsEditing(true)
  }

  function handleDelete() {
    const fields = person?.fields?.filter(Boolean)
    fields?.splice(fieldIndex, 1)
    person.fields = fields
    if (!fields || fields.length === 0) {
      delete person.fields
    }
    updatePersonsData(person, personIndex, recordsData)
  }

  function handleSave() {
    setIsEditing(false)
    field.values[0].text = editFieldValue
    field.type = editFieldType
    person.fields[fieldIndex] = field
    person.fields.sort((a, b) => a.type.localeCompare(b.type))
    updatePersonsData(person, personIndex, recordsData)
  }

  function editItem() {
    if (isEditing) {
      return (
        <Grid container alignItems="center">
          <Grid item xs={4}>
            <Select
              value={editFieldType}
              onChange={(e) => setEditFieldType(e.target.value)}
              size="small"
              sx={{ margin: 1 }}
            >
              {Object.keys(PERSON_FIELD_TYPE).map((key) => (
                <MenuItem key={`type-${key}`} value={PERSON_FIELD_TYPE[key]}>
                  {key}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={8}>
            <Grid
              container
              direction="row"
              spacing={2}
              alignItems="center"
              justifyContent="space-between"
            >
              <Grid item>
                <TextField
                  value={editFieldValue}
                  size="small"
                  onChange={(e) => setEditFieldValue(e.target.value)}
                />
              </Grid>
              <Grid item>
                <Button onClick={handleSave}>Save</Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )
    } else {
      return (
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <ListItemText
              primary={editFieldValue}
              secondary={field?.type}
              sx={{ color: textColor }}
              primaryTypographyProps={{ fontWeight: 600 }}
            />
          </Grid>
          <Grid item>
            <Grid container direction="row" spacing={2} alignItems="center">
              <Grid item>
                <Button onClick={handleEdit}>Edit</Button>
                <IconButton onClick={handleDelete}>
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )
    }
  }

  return (
    <ListItem sx={{ paddingX: 2, marginTop: 1, background: backgroundColor }}>
      {editItem()}
    </ListItem>
  )
}
