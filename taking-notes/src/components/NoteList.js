import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Container, Typography, List, ListItem, ListItemText, Paper } from '@mui/material';
const NoteList = () => {
    //aşağıdaki satırda notes adında bir state tanımlıyoruz ve bu state'in başlangıç değeri boş bir dizi olacak
    const [notes, setNotes] = useState([]);

    //useEffect hook'unu kullanarak component yüklendiğinde çalışacak olan kodları yazıyoruz
    useEffect(()=>{
        axios.get('http://localhost:3000/notes')
            .then(response => {
                setNotes(response.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);
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
                            <ListItemText>
                                 <Typography variant="h5">{note.title}</Typography>
                                 <Typography>{note.content}</Typography>
                            </ListItemText>
                          </ListItem>
                     ))}
                </List>
              </Paper>
       </Container>
    );
};

export default NoteList;