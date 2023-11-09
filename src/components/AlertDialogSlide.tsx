import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { forwardRef, ReactElement, Ref } from 'react';

interface IAlertDialogSlide {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    description: string;
}

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: ReactElement<any, any>;
    },
    ref: Ref<unknown>,
) {
    return <Slide direction='up' ref={ref} {...props} />
});

const AlertDialogSlide = (props: IAlertDialogSlide) => {
    return (
        <Dialog
            open={props.open}
            TransitionComponent={Transition}
            keepMounted
            onClose={props.onClose}
            aria-describedby='delete-dialog-slide-description'
        >
            <DialogTitle>{props.title}</DialogTitle>
            <DialogContent>
                <DialogContentText id='delete-dialog-slide-description'>
                    {props.description}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant='contained' color='warning' onClick={props.onConfirm}>Hapus</Button>
                <Button variant='outlined' onClick={props.onClose}>Batal</Button>
            </DialogActions>
        </Dialog>
    )
}

export default AlertDialogSlide