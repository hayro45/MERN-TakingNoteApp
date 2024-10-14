import React, { useState } from "react";
import { Container, TextField, Button, Box } from '@mui/material';


const NoteForm = ({ title: initialTitle, content: initialContent, handleSubmit, buttonText}) => {
    //aşağıdaki satırlarda title ve content adında iki state tanımlıyoruz ve bu state'lerin başlangıç değerleri boş string'ler olacak
    const [title, setTitle] = useState(initialTitle || '');
    const [content, setContent] = useState(initialContent || '');

    
    const handleFormSubmit = (e) => {
        e.preventDefault();
        handleSubmit({ title, content });
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
            <Box component="form" onSubmit={handleFormSubmit} noValidate autoComplete="off">                <TextField
                label="Title"
                variant="outlined"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Content"
                variant="outlined"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                multiline
                rows={4}
                fullWidth
                margin="normal"
            />
            <Button type="submit" variant="contained" color="primary">
                {buttonText}
            </Button>
        </Box>
    </Container>
    );
};    

export default NoteForm;