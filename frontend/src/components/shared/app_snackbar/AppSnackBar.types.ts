import { AlertProps } from "@mui/material"

interface AppSnackBarTypes {
    message: string,
    severity: AlertProps["severity"],
    open: boolean,
    randomString?: string
}

export type { AppSnackBarTypes }