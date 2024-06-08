import { Autocomplete, Box, Button, Card, CardActions, CardContent, CardMedia, CircularProgress, Grid, TextField, Typography } from "@mui/material";
import { useQuery } from "@apollo/client";
import { BooksQuery } from "../../resource/books.resource";
import { BookQueryTypes } from "../../resource/books.types";

function Home() {
    const { loading, data } = useQuery<BookQueryTypes>(BooksQuery);

    if (loading) return <Box sx={{ display: 'flex' }}>
        <CircularProgress />
    </Box>

    return (<>
        <Box>
            <Grid container spacing={1} sx={{ display: 'flex', justifyContent: 'center', padding: '30px' }}>
                <Grid item xs={10} md={7}>
                    <Autocomplete sx={{ width: '100%' }} options={data?.books ?? []} getOptionLabel={(book) => book.title} renderOption={(props, option) => (
                        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                            <img
                                loading="lazy"
                                width="100"
                                src={`${option.coverPhotoURL}`}
                                alt=""
                            />
                            <Box>
                                <Typography gutterBottom variant="h6" component="div">
                                    {option.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    by {option.author}
                                </Typography>
                            </Box>
                        </Box>
                    )} renderInput={(params) => <TextField {...params} label="Books" variant="outlined" />} />
                </Grid>
            </Grid>
        </Box>
        <Box>
            <Typography variant="h4">
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