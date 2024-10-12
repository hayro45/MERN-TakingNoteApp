import React from 'react';
import { Container, Typography } from '@mui/material';

import NoteList from './components/NoteList';
import NoteForm from './components/NoteForm';

function App() {
    return (
        <Container>
            <Typography variant="h2" gutterBottom>
                Note Taking App
            </Typography>
            <NoteForm />
            <NoteList />
        </Container>
    );
}

export default App;