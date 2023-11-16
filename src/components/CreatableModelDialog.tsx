import { Dialog, DialogContent, DialogTitle } from "@mui/material";

interface ICreatableModelDialogProps {
    open: boolean;

    fullWidth?: boolean;
    maxWidth?: "lg" | "md" | "sm" | "xl" | "xs";

    title: string;
    content: React.JSX.Element;
}

const CreatableModelDialog = ({open, fullWidth, maxWidth, title, content}: ICreatableModelDialogProps) => {
    return (
        <Dialog open={open} fullWidth={fullWidth} maxWidth={maxWidth}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                {content}
            </DialogContent>
        </Dialog>
    )
}

export default CreatableModelDialog;