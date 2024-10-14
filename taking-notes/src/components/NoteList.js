import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Container,
    Typography,
    List,
    ListItem,
    ListItemText, 
    Paper, 
    Button, 
    Dialog, 
    DialogTitle, 
    DialogContent } from '@mui/material';
    import NoteForm from './NoteForm'; // NoteForm bileşenini import edin




const NoteList = ({ notes, setNotes }) => {
    //aşağıdaki satırda notes adında bir state tanımlıyoruz ve bu state'in başlangıç değeri boş bir dizi olacak
    const [selectedNote, setSelectedNote] = useState(null);
    const [open, setOpen] = useState(false);

    const handleEdit = (note) => {
        setSelectedNote(note);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedNote(null);
    };

    const handleUpdate = (id, updatedNote) => {
        axios.put(`http://localhost:3000/notes/${id}`, updatedNote)
            .then(response => {
                console.log('Note updated:', response.data);
                setNotes(notes.map(note => note._id === id ? response.data : note));
                handleClose();
            })
            .catch(error => console.error('Error updating note:', error));
    };


    const handleDelete = (id) => {
        axios.delete(`http://localhost:3000/notes/${id}`)
            .then(response => {
                console.log('Note deleted:', response.data);
                setNotes(notes.filter(note => note._id !== id));
            })
            .catch(error => console.error('Error deleting note:', error));
    };

    return (
        /* bu eski kodlar
        <div>
            <h1>Notes</h1>
            <ul>
                {notes.map(note => (
                    <li key={note._id}>
                        <h3>{note.title}</h3>
                        <p>{note.content}</p>
                    </li>
                ))}
            </ul>
        </div>
        */
       //yukarıdaki kodları MUI componentleri ile değiştiriyoruz
       <Container>
              <Typography variant="h4" align="center" gutterBottom>Notes</Typography>
              <Paper>
                <List>
                     {notes.map(note => (
                           <ListItem key={note._id}>
                                <ListItemText
                                    primary={<Typography variant="h5">{note.title}</Typography>}
                                    secondary={<Typography>{note.content}</Typography>}
                                />
                               <Button
                                variant="contained"
                                style={{
                                    color: 'white',
                                    backgroundColor: 'orange',
                                    marginRight: '8px',
                                }}
                                onClick={() => handleEdit(note)}
                            >
                                Edit
                            </Button>
                            <Button
                                variant="contained"
                                style={{
                                    color: 'white',
                                    backgroundColor: 'red',
                                }}
                                onClick={() => handleDelete(note._id)}
                            >
                                Delete
                            </Button>
                            </ListItem>
                     ))}
                </List>
              </Paper>
              <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Note</DialogTitle>
                <DialogContent>
                    {selectedNote && (
                        <NoteForm
                            title={selectedNote.title}
                            content={selectedNote.content}
                            handleSubmit={(updatedNote) => handleUpdate(selectedNote._id, updatedNote)}
                            buttonText="Update Note"
                        />
                    )}
                </DialogContent>
            </Dialog>
       </Container>
    );
};

export default NoteList;