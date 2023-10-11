import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";

const ReceiptInsert = () => {
    const navigate = useNavigate();

    const HandleInsertData = () => {

    }

    return <div>
        <Button color="primary" size="sm" style={{marginRight: '.5rem'}} onClick={HandleInsertData}>Simpan</Button>
        <Button color="danger" size="sm" onClick={HandleInsertData}>Batal</Button>
    </div>
}

export default ReceiptInsert;