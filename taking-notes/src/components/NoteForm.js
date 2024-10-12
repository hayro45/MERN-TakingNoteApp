import React, { useState } from "react";
import axios from "axios";
import { Container, TextField, Button, Typography, Box } from '@mui/material';
const NoteForm = () => {
    //aşağıdaki satırlarda title ve content adında iki state tanımlıyoruz ve bu state'lerin başlangıç değerleri boş string'ler olacak
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3000/notes', {title, content})
            .then(response => {
                console.log('Note added:', response.data);
                setTitle('');
                setContent('');
            })
            .catch(error => {
                console.log('There was an error adding the note!', error);
            });
        };
        return (
            /*<form onSubmit={handleSubmit}>
                <div>
                    <label>Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div>
                    <label>Content</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    ></textarea>
                </div>
                <button type="submit">Add Note</button>
            </form>*/
            <Container>
                <Typography variant="h4" gutterBottom>
                    Add a New Note
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField
                        label="Title"
                        variant="outlined"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        fullWidth
                    />
                    <TextField
                        label="Content"
                        variant="outlined"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        multiline
                        rows={4}
                        fullWidth
                    />
                    <Button type="submit" variant="contained" color="primary">
                        Add Note
                    </Button>
                </Box>
            </Container>
        );
    };    

export default NoteForm;