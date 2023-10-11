import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";

const InsertDataButton = () => {
    const navigate = useNavigate();

    const handleOnClick = () => {
        let path: string = 'insert';
        navigate(path);
    }
    return <Button color="primary" size="sm" onClick={handleOnClick}>Tambah Data</Button>
}   

export default InsertDataButton;