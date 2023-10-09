import React, {useEffect, useState} from 'react';
import IPurchaseOrder from '../models/IPurchaseOrder';
import moment from 'moment/moment';
import { useNavigate, useParams } from 'react-router-dom';

function PurchaseOrderDetail() {
    const params = useParams();
    const [purchaseOrder, setPurchaseOrder] = useState<IPurchaseOrder[] | undefined>(undefined);
    const navigate = useNavigate();

    let purchaseOrderId = params.id;
    if (typeof purchaseOrderId === 'undefined') {
        return <div>Invalid Request.</div>
    }

    const fetchPurchaseOrderData = async () => {
        const response = await fetch(`https://localhost:44327/purchaseorder/${encodeURIComponent(purchaseOrderId!)}`, {
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error("Invalid response!");
        }

        const data = await response.json();
        setPurchaseOrder(data);
    }

    useEffect(() => {
        fetchPurchaseOrderData().catch(console.error);
    }, [])

    
    if (purchaseOrder !== undefined && purchaseOrder != null) {
        return <div>
            <h4>
                Hello!
            </h4>
        </div>
    }

    return <h4>Records not found.</h4>
}

export default PurchaseOrderDetail;