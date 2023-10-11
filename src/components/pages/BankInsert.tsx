import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import TwinConfirmationButton from "../TwinConfirmationButton";
import { useForm } from "react-hook-form";
import IBank from "../models/IBank";

const BankInsert = () => {
    const navigate = useNavigate();
    const {register, handleSubmit, formState: {errors}} = useForm({
        defaultValues: {
            'id': 0,
            'name': '',
        }
    });

    const PostData = async (data: IBank) => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'name': data.name
            })
        };

        const response = await fetch('https://localhost:44327/bank/insert', requestOptions)
        if (!response.ok)
            throw new Error("Invalid response!");

        const result: IBank = await response.json();
        const location = `/bank/detail/${result.id}`
        navigate(location);
    }

    const OnSave = (data: IBank) => {
        PostData(data).catch(console.error);
    }

    const OnCancel = () => {
        const location = '/bank'
        navigate(location)
    }

    return <div>
        <form onSubmit={handleSubmit((data) => {
            OnSave(data);
        })}>
            <label>Name</label>
            <input {...register('name', {required: true, maxLength: 60})} />
            {errors.name && <p>This field is required.</p>}
            <TwinConfirmationButton onCancel={OnCancel} />
        </form>
    </div>
}

export default BankInsert;