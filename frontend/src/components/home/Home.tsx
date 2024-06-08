import { Box, Button, Card, CardActions, CardContent, CardMedia, CircularProgress, Grid, TextField, Typography } from "@mui/material";
import { useQuery } from "@apollo/client";
import { BooksQuery } from "../../resource/books.resource";
import { useEffect } from "react";
import { BookQueryTypes } from "../../resource/books.types";

function Home() {
    const { loading, data } = useQuery<BookQueryTypes>(BooksQuery);

    if (loading) return <Box sx={{ display: 'flex' }}>
        <CircularProgress />
    </Box>

    return (<>
        <Box>
            <TextField id="outlined-basic" label="Search for Books" variant="outlined" />
        </Box>
        <Box>
            <Typography variant="h4">
                All Books
            </Typography>
            <Box>
                <Grid container spacing={5}>
                    {
                        data?.books.map((book, i) => (
                            <Grid key={i} item xs={6} md={3}>
                                <Card>
                                    <CardMedia
                                        sx={{ height: 140 }}
                                        image={`${book.coverPhotoURL}`}
                                        title='Book Image'
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {book.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            by {book.author}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small">Share</Button>
                                        <Button size="small">Learn More</Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))
                    }
                </Grid>
            </Box>
        </Box>
    </>);
}

export default Home;