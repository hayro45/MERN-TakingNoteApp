import React from 'react';
import { Container, Typography } from '@mui/material';
// useState import et
import { useState, useEffect } from 'react';
import NoteList from './components/NoteList';
import NoteForm from './components/NoteForm';
import axios from 'axios';

function App() {
    const [notes, setNotes] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:3000/notes')
            .then(response => {
                setNotes(response.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);
    const handleCreateNote = (newNote) => {
        axios.post('http://localhost:3000/notes', newNote)
            .then(response => {
                console.log('Note added:', response.data);
                setNotes([...notes, response.data]);
            })
            .catch(error => {
                console.error('Error adding note:', error);
            });
    };

    return (
        <Container>
            <Typography variant="h2" gutterBottom>
                Note Taking App
            </Typography>
            <NoteForm 
                handleSubmit={handleCreateNote} 
                buttonText="Add Note" />
            <NoteList notes={notes} setNotes={setNotes} />
        </Container>
    );
}

export default App;