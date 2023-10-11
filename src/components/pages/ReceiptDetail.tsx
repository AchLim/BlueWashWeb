import React, {useEffect, useState} from 'react';
import IReceipt from '../models/IReceipt';
import moment from 'moment/moment';
import { useNavigate, useParams } from 'react-router-dom';

function ReceiptDetail() {
    const params = useParams();
    const [receipt, setReceipt] = useState<IReceipt | undefined>(undefined);
    const navigate = useNavigate();

    let ReceiptId = params.id;
    if (typeof ReceiptId === 'undefined') {
        return <div>Invalid Request.</div>
    }

    const fetchReceiptData = async () => {
        const response = await fetch(`https://localhost:44327/receipt/${encodeURIComponent(ReceiptId!)}`, {
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error("Invalid response!");
        }

        const data = await response.json();
        setReceipt(data);
    }

    useEffect(() => {
        fetchReceiptData().catch(console.error);
    }, [])

    
    if (receipt !== undefined && receipt != null) {
        return <div>
            <h4>
                Hello!
            </h4>
        </div>
    }

    return <h4>Records not found.</h4>
}

export default ReceiptDetail;