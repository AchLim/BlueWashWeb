import React, {useEffect, useState} from 'react';
import moment from 'moment/moment';
import { useNavigate, useParams } from 'react-router-dom';
import IBank from '../models/IBank';

function BankDetail() {
    const params = useParams();
    const [bank, setBank] = useState<IBank | undefined>(undefined);

    let BankId = params.id;
    if (typeof BankId === 'undefined') {
        return <div>Invalid Request.</div>
    }

    const fetchBankData = async () => {
        const response = await fetch(`https://localhost:44327/bank/${encodeURIComponent(BankId!)}`, {
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error("Invalid response!");
        }

        const data = await response.json();
        setBank(data);
    }

    useEffect(() => {
        fetchBankData().catch(console.error);
    }, [])

    
    if (bank !== undefined && bank != null) {
        return <div>
            <h4>
                {bank.name}
            </h4>
        </div>
    }

    return <h4>Records not found.</h4>
}

export default BankDetail;