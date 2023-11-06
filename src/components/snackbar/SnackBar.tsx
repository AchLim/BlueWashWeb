import { Alert, Slide, Snackbar } from "@mui/material";
import { AlertProps } from "reactstrap";

interface SnackBarProps {
    snackbar: Pick<AlertProps, "children" | "severity"> | null;
    setSnackbar: React.Dispatch<React.SetStateAction<Pick<AlertProps, "children" | "severity"> | null>>;
}

const SnackBar = (props: SnackBarProps) => {
    return <>
        {
            !!props.snackbar && (
                <Snackbar open
                    anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
                    key={'center' + 'bottom'}
                    onClose={() => props.setSnackbar(null)}
                    autoHideDuration={4000}
                    TransitionComponent={(props) => <Slide {...props} direction="up" />}
                >
                    <Alert {...props.snackbar} onClose={() => props.setSnackbar(null)} sx={{ width: '100%' }} />
                </Snackbar>
            )
        }
    </>
}

export default SnackBar;