import { useNavigate, useParams } from 'react-router-dom';
import { useAppContext } from '../Context';
import { Button, Diaper, Eat, Sleep, Grid, AppBar } from '../components';
import { useEffect, useState } from 'react';
import { drop, get, save, update } from '../services/database';
import { getTitle, validateFields } from '../utils/action';
import { IDataSleep } from '../components/custom/sleep';
import { IDataEat } from '../components/custom/eat';
import { IDataDiaper } from '../components/custom/diaper';

export default function Form(): React.JSX.Element {
    const { translate, showAlertMessage } = useAppContext();
    const navigate = useNavigate();
    const params = useParams();
    const actionType = params.type;
    const id = params.id;

    const [data, setData] = useState<FormData>();

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
                return <Eat data={data} setData={setData} translate={translate} />;
        }
    }

    const loadData = async (id: string | undefined) => {
        if (!id) return;
        setData(get(id));
    };

    useEffect(() => {
        if (params && params.id) {
            loadData(params.id);
        }
    }, [params]);

    const handleDelete = () => {
        const confirmed = confirm('Deseja mesmo deletar este item?');
        if (!confirmed) {
            showAlertMessage('Ação cancelada', 'error');
            return;
        }
        drop(id);
        showAlertMessage('Item deletado com sucesso!!!', 'success');
        setTimeout(() => {
            navigate('/');
        }, 3000);
    };

    const handleSubmit = () => {
        try {
            const fields = validateFields(data, actionType);
            if (fields.length > 0) {
                showAlertMessage(
                    `Os campos ${fields.join(', ')} são obrigatórios`,
                    'warning',
                );
                return;
            }

            if (id) {
                update(data, id);
            } else {
                save(data);
            }

            showAlertMessage(
                `Item ${id ? 'editado' : 'criado'} com sucesso!!!`,
                'success',
            );
            setTimeout(() => {
                navigate('/');
            }, 3000);
        } catch (err) {
            showAlertMessage(
                `Erro ao ${id ? 'editar' : 'criar'} item: ` + err,
                'error',
            );
        }
    };

    return (
        <>
            <AppBar
                title={translate(getTitle(actionType))}
                id={id}
                onDelete={handleDelete}
            />
            <Grid
                container={true}
                spacing={2}
                sx={{
                    marginTop: '1em',
                    padding: '1em',
                    height: 'calc(100vh - 72px)',
                }}
            >
                <Grid item={true} xs={12}>
                    {getForm(actionType as string)}
                    <Button
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
                        {translate('save')}
                    </Button>
                </Grid>
            </Grid>
        </>
    );
}
