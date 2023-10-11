import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";

interface TwinButtonProps {
    // onSave: () => void;
    onCancel: () => void;
}

const TwinConfirmationButton = (props: TwinButtonProps) => {

    return <div>
        <Button color="primary" size="sm" style={{marginRight: '.5rem'}} type='submit'>Simpan</Button>
        <Button color="danger" size="sm" onClick={props.onCancel}>Batal</Button>
    </div>
}   

export default TwinConfirmationButton;