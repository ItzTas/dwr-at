import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getTitle } from '../utils/action';
import Sleep, { IDataSleep } from '../components/custom/sleep';
import Eat, { IDataEat } from '../components/custom/eat';
import Diaper, { IDataDiaper } from '../components/custom/diaper';
import { useAppContext } from '../useAppContext';
import AppBarComponent from '../components/custom/appBar';
import GridComponent from '../components/grid';
import ButtonComponent from '../components/button';

export default function Form(): React.JSX.Element {
    const { translate, showAlertMessage } = useAppContext();
    const navigate = useNavigate();
    const params = useParams();
    const actionType = params.type || '';
    const id = params.id;
    const [data, setData] = useState<any>([]);

    useEffect(() => {
        if (id) {
            const bebedataStr = localStorage.getItem('bebedata') || '[]';
            const bebedata = JSON.parse(bebedataStr);
            const existingItem = bebedata.find((item: any) => item.id == id);
            if (existingItem) {
                setData(existingItem);
            }
        }
    }, [id]);

    function getForm(actionType: string): React.JSX.Element {
        switch (actionType) {
            case '1':
                return (
                    <Sleep
                        data={data as IDataSleep}
                        setData={
                            setData as unknown as React.Dispatch<
                                React.SetStateAction<IDataSleep>
                            >
                        }
                        translate={translate}
                    />
                );
            case '2':
                return (
                    <Eat
                        data={data as unknown as IDataEat}
                        setData={
                            setData as unknown as React.Dispatch<
                                React.SetStateAction<IDataEat>
                            >
                        }
                        translate={translate}
                    />
                );
            case '3':
                return (
                    <Diaper
                        data={data as unknown as IDataDiaper}
                        setData={
                            setData as unknown as React.Dispatch<
                                React.SetStateAction<IDataDiaper>
                            >
                        }
                        translate={translate}
                    />
                );
            default:
                return (
                    <Eat
                        data={data as unknown as IDataEat}
                        setData={
                            setData as unknown as React.Dispatch<
                                React.SetStateAction<IDataEat>
                            >
                        }
                        translate={translate}
                    />
                );
        }
    }

    function handleAdd() {
        const bebedataStr = localStorage.getItem('bebedata') || '[]';
        const bebedata = JSON.parse(bebedataStr);
        const newData = { ...data, id: bebedata.length };
        bebedata.push(newData);
        localStorage.setItem('bebedata', JSON.stringify(bebedata));
        showAlertMessage('Item criado com sucesso!!!', 'success');
        navigate('/');
        window.location.reload();
    }

    function handleEdit() {
        const oldItemsStr = localStorage.getItem('bebedata') || '[]';
        const newItems = JSON.parse(oldItemsStr);
        for (let i = 0; i < newItems.length; i++) {
            const oldItem = newItems[i];
            if (oldItem.id == id) {
                newItems[i] = { ...oldItem, ...data }; // Atualiza o item com os novos dados
                localStorage.setItem('bebedata', JSON.stringify(newItems));
                navigate('/');
                window.location.reload();
                return;
            }
        }
    }

    function handleSubmit() {
        if (!id) {
            handleAdd();
            return;
        }
        handleEdit();
    }

    return (
        <>
            <AppBarComponent
                title={translate(getTitle(actionType as string))}
                id={id}
            />
            <GridComponent
                container={true}
                spacing={2}
                sx={{
                    marginTop: '1em',
                    padding: '1em',
                    height: 'calc(100vh - 72px)',
                }}
            >
                <GridComponent item={true} xs={12}>
                    {getForm(actionType as string)}
                    <ButtonComponent
                        type='submit'
                        fullWidth
                        variant='contained'
                        onClick={handleSubmit}
                        sx={{
                            mt: 3,
                            mb: 2,
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            borderRadius: '0 !important',
                            margin: 0,
                        }}
                    >
                        {id ? translate('edit') : translate('save')}
                    </ButtonComponent>
                </GridComponent>
            </GridComponent>
        </>
    );
}
