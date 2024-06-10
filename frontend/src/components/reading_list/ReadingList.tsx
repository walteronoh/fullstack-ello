import { AlertProps, Box, Button, Card, CardActions, CardContent, CardMedia, Chip, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { BookTypes } from "../../resource/books.types";
import { fetchBooksFromLocaStorage, removeBookFromLocalStorage } from "../../utils/utils";
import AppSnackBar from "../shared/app_snackbar/AppSnackBar";
import { useNavigate } from "react-router-dom";

function ReadingList() {
    const navigate = useNavigate();
    const [readingList, setReadingList] = useState<Array<BookTypes>>([]);
    const [sbMessage, setSbMessage] = useState({ open: false, message: '', severity: 'success' });

    useEffect(() => {
        handleFetchReadingList();
    }, []);

    const handleFetchReadingList = () => {
        let storedBooks = fetchBooksFromLocaStorage();
        setReadingList(storedBooks);
    }

    const handleRemove = (book: BookTypes) => {
        let resp = removeBookFromLocalStorage(book);
        setSbMessage({ open: true, ...resp });
        handleFetchReadingList();
    }

    const handleRedirect = (path: string) => {
        navigate(path);
      }

    return (<Grid container spacing={1} sx={{ display: 'flex', justifyContent: 'center' }}>
        <AppSnackBar open={sbMessage.open} message={sbMessage.message} severity={sbMessage.severity as AlertProps["severity"]} />
        <Grid item xs={12} sm={12} md={8}>
            <Box>
                <Typography variant="h4" sx={{ color: '#335C6E' }}>
                    Reading List
                </Typography>
                <Box>
                    {
                        readingList.length > 0 ?
                            <Grid container spacing={2}>
                                {
                                    readingList?.map((book, i) => (
                                        <Grid key={i} item xs={6} sm={4} md={3}>
                                            <Card>
                                                <CardMedia
                                                    sx={{ height: 240 }}
                                                    image={`${book.coverPhotoURL}`}
                                                    title='Book Image'
                                                />
                                                <CardContent>
                                                    <Typography gutterBottom variant="body1" component="div">
                                                        {book.title}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        {book.author}
                                                    </Typography>
                                                </CardContent>
                                                <CardActions>
                                                    <Chip label="Remove" sx={{ backgroundColor: '#F76434', color: 'white' }} onClick={() => handleRemove(book)} />
                                                </CardActions>
                                            </Card>
                                        </Grid>
                                    ))
                                }
                            </Grid>
                            : <Box sx={{ position: 'relative', width: '100%', textAlign: 'center', padding: '30px' }}>
                                <Typography variant="h5" color="text.secondary">
                                    It seems like you do not have any book(s) in your reading list.
                                </Typography>
                                <Chip label="Search from Books" sx={{ backgroundColor: '#5ACCCC', color: 'white' }} onClick={() => handleRedirect('/')}/>
                            </Box>
                    }
                </Box>
            </Box>
        </Grid>
    </Grid>);
}

export default ReadingList;