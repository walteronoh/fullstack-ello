import { Alert, Snackbar } from "@mui/material";
import { AppSnackBarTypes } from "./AppSnackBar.types";
import { useEffect, useState } from "react";

export default function AppSnackBar(props: AppSnackBarTypes) {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setOpen(props.open);
    }, [props])

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
    }}>
        <Alert
            onClose={handleClose}
            severity={props.severity}
            variant="filled"
            sx={{ width: '100%' }}
        >
            {props.message}
        </Alert>
    </Snackbar>
}