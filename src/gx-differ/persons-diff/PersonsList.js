import React from 'react';
import {Button, List} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import EditablePerson from "./EditablePerson";
import AddPersonDialog from "./AddPersonDialog";

export default function PersonsList({persons}) {
  const [open, setOpen] = React.useState(false);

  function handleAddPerson() {
    setOpen(true);
  }

  return (
    <>
      <Button variant={'outlined'} sx={{marginX: 2}} onClick={handleAddPerson} startIcon={<AddIcon/>}>
        Add Person
      </Button>
      <AddPersonDialog
        open={open}
        setOpen={setOpen}
      />
      <List dense component="div" role="list">
        {persons.map((person, index) => <EditablePerson
          key={`person-${index}`}
          person={person}
          personIndex={index}/>)}
      </List>
      <Button variant={'outlined'} sx={{marginX: 2}} onClick={handleAddPerson} startIcon={<AddIcon/>}>
        Add Person
      </Button>
    </>
  );
}
