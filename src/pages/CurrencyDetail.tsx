import React, {useEffect, useState} from 'react';
import moment from 'moment/moment';
import { useNavigate, useParams } from 'react-router-dom';
import ICurrency from '../components/models/ICurrency';

import { GetCurrencyById } from '../components/../axios';

function CurrencyDetail() {
    const params = useParams();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [currency, setCurrency] = useState<ICurrency | undefined>(undefined);

    let CurrencyId = params.id;
    if (typeof CurrencyId === 'undefined') {
        return <div>Invalid Request.</div>
    }

    useEffect(() => {
        const fetchCurrency = async () => {
            var response = await GetCurrencyById(CurrencyId!);
            
            var data = response.data;
            setCurrency(data);
        };

        fetchCurrency().catch(console.error);
        setIsLoading(false);
    }, [])

    if (isLoading) {
        return <h4>Is Loading . . .</h4>
    }
    
    if (currency !== undefined && currency != null) {
        return <div>
            <h4>
                {currency.name}
            </h4>
        </div>
    }
    return "";
}

export default CurrencyDetail;