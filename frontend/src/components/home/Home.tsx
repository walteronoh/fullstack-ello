import { AlertProps, Autocomplete, Box, Button, Card, CardActions, CardContent, CardMedia, Chip, CircularProgress, Grid, TextField, Typography } from "@mui/material";
import { useQuery } from "@apollo/client";
import { BooksQuery } from "../../resource/books.resource";
import { BookQueryTypes, BookTypes } from "../../resource/books.types";
import { addBookToLocalStorage } from "../../utils/utils";
import { useState } from "react";
import AppSnackBar from "../shared/app_snackbar/AppSnackBar";

function Home() {
    const { loading, data } = useQuery<BookQueryTypes>(BooksQuery);
    const [sbMessage, setSbMessage] = useState({ open: false, message: '', severity: 'success' });

    const handleAddBookToReadingList = (book: BookTypes) => {
        const resp = addBookToLocalStorage(book);
        setSbMessage({ open: true, ...resp });
    };


    if (loading) return <Box sx={{ display: 'flex' }}>
        <CircularProgress />
    </Box>

    return (<Grid container spacing={1} sx={{ display: 'flex', justifyContent: 'center' }}>
        <AppSnackBar open={sbMessage.open} message={sbMessage.message} severity={sbMessage.severity as AlertProps["severity"]} />
        <Grid item xs={12} sm={12} md={8}>
            <Box>
                <Grid container spacing={1} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Grid item xs={12} sm={12} md={5}>
                        <Autocomplete sx={{ width: '100%' }} options={data?.books ?? []} disableCloseOnSelect getOptionLabel={(book) => book.title} renderOption={(props, option) => (
                            <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                <img
                                    loading="lazy"
                                    width="70"
                                    src={`${option.coverPhotoURL}`}
                                    alt=""
                                />
                                <Box>
                                    <Typography gutterBottom variant="body2" component="div">
                                        {option.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {option.author}
                                    </Typography>
                                    <Box sx={{ padding: '10px' }}>
                                        <Chip label="Add to Reading List" sx={{ backgroundColor: '#5ACCCC', color: 'white' }} onClick={() => handleAddBookToReadingList(option)} />
                                    </Box>
                                </Box>
                            </Box>
                        )} renderInput={(params) => <TextField {...params} label="Books" variant="outlined" />} />
                    </Grid>
                </Grid>
            </Box>

            <Box>
                <Typography variant="h4" sx={{ color: '#335C6E' }}>
                    All Books
                </Typography>
                <Box>
                    <Grid container spacing={2}>
                        {
                            data?.books.map((book, i) => (
                                <Grid key={i} item xs={6} md={2}>
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
                                            <Chip label="Add to Reading List" sx={{ backgroundColor: '#5ACCCC', color: 'white' }} onClick={() => handleAddBookToReadingList(book)} />
                                        </CardActions>
                                    </Card>
                                </Grid>
                            ))
                        }
                    </Grid>
                </Box>
            </Box>
        </Grid>
    </Grid>);
}

export default Home;