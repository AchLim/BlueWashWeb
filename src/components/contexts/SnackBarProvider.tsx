import { Alert, Slide, Snackbar } from "@mui/material";
import { createContext, useState } from "react";
import { AlertProps } from "reactstrap";

type SnackBar = Pick<AlertProps, 'children' | 'severity'> | null;

export interface ISnackBarContext {
    snackBar?: SnackBar;
    setSnackBar?: React.Dispatch<React.SetStateAction<SnackBar>>;
}

const SnackBarContext = createContext<ISnackBarContext>({});

export const SnackBarProvider = ({ children }: any) => {
    const [snackBar, setSnackBar] = useState<SnackBar>(null);
    return (
        <SnackBarContext.Provider value={{ snackBar, setSnackBar }}>
            {children}
            
            {
                !!snackBar && (
                    <Snackbar open
                        anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
                        key={'center' + 'bottom'}
                        onClose={() => setSnackBar(null)}
                        autoHideDuration={4000}
                        TransitionComponent={(props) => <Slide {...props} direction="up" />}
                    >
                        <Alert {...snackBar} onClose={() => setSnackBar(null)} sx={{ width: '100%' }} />
                    </Snackbar>
                )
            }
        </SnackBarContext.Provider>
    )
}

export default SnackBarContext;