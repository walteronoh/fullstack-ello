import { Box, Button, Card, CardActions, CardContent, CardMedia, Chip, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { BookTypes } from "../../resource/books.types";
import { fetchBooksFromLocaStorage, removeBookFromLocalStorage } from "../../utils/utils";

function ReadingList() {
    const [readingList, setReadingList] = useState<Array<BookTypes>>([]);

    useEffect(() => {
        handleFetchReadingList();
    }, []);

    const handleFetchReadingList = () => {
        let storedBooks = fetchBooksFromLocaStorage();
        if (storedBooks.length > 0) {
            setReadingList(storedBooks);
        }
    }

    const handleRemove = (book: BookTypes) => {
        let resp = removeBookFromLocalStorage(book);
        handleFetchReadingList();
    }

    return (<>
        <Box>
            <Typography variant="h4">
                Reading List
            </Typography>
            <Box>
                {
                    readingList.length > 0 ?
                        <Grid container spacing={2}>
                            {
                                readingList?.map((book, i) => (
                                    <Grid key={i} item xs={6} md={2}>
                                        <Card>
                                            <CardMedia
                                                sx={{ height: 240 }}
                                                image={`${book.coverPhotoURL}`}
                                                title='Book Image'
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="div">
                                                    {book.title}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    {book.author}
                                                </Typography>
                                            </CardContent>
                                            <CardActions>
                                                <Button size="small">Share</Button>
                                                <Button size="small" onClick={() => handleRemove(book)}>Remove</Button>
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
                            <Chip label="Search from Books" sx={{ backgroundColor: '#5ACCCC', color: 'white' }} />
                        </Box>
                }
            </Box>
        </Box>
    </>);
}

export default ReadingList;