import logo from '../../assets/img/logo.png';
import React, { useState } from 'react';
import { handleChange } from '../utils/core';
import BoxComponent from '../components/box';
import GridComponent from '../components/grid';
import AvatarComponent from '../components/avatar';
import ButtonComponent from '../components/button';
import TextFieldComponent from '../components/textfield';
import TextComponent from '../components/typography';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../useAppContext';

const styles = {
    centerBox: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    boxAdjustment: {
        padding: 2,
    },
    marginTop: {
        marginTop: 4,
    },
};
export default function SignIn(): React.JSX.Element {
    const navigate = useNavigate();
    const { translate } = useAppContext();
    const [data, setData] = useState({
        email: {
            value: '',
            error: null,
            helperText: null,
        },
        password: {
            value: '',
            error: null,
            helperText: null,
        },
    });

    const { showAlertMessage } = useAppContext();

    function verifyLogin() {
        const session = localStorage.getItem('session');
        if (!session) {
            navigate('/signup');
            return;
        }

        const sessionData = JSON.parse(session) as {
            email: string;
            password: string;
        };

        const emailMatch = sessionData.email === data.email.value;
        const passwordMatch = sessionData.password === data.password.value;

        if (!emailMatch || !passwordMatch) {
            showAlertMessage('Usuário ou senha inválidos', 'error');
            return;
        }

        navigate('/');
    }

    return (
        <BoxComponent
            sx={{
                height: '100vh',
                paddingTop: 8,
            }}
        >
            <GridComponent sx={styles.boxAdjustment} container>
                <GridComponent
                    sx={{ ...styles.centerBox, ...styles.marginTop }}
                    item
                    xs={12}
                >
                    <AvatarComponent sx={{ width: 180, height: 180 }} src={logo} />
                </GridComponent>
                <GridComponent
                    sx={{ ...styles.centerBox, ...styles.marginTop }}
                    item
                    xs={12}
                >
                    <TextComponent variant='h3'>Login</TextComponent>
                </GridComponent>
                <GridComponent sx={styles.centerBox} item xs={12}>
                    <TextComponent variant='h5'>{translate('welcome')}</TextComponent>
                </GridComponent>
                <GridComponent sx={styles.marginTop} item xs={12}>
                    <TextFieldComponent
                        label='E-mail'
                        fullWidth
                        onChange={(event) =>
                            handleChange(data, setData, event.target.value, 'email')
                        }
                        value={data.email.value}
                    />
                </GridComponent>
                <GridComponent sx={styles.marginTop} item xs={12}>
                    <TextFieldComponent
                        label='Senha'
                        fullWidth
                        onChange={(event) =>
                            handleChange(data, setData, event.target.value, 'password')
                        }
                        type='password'
                        value={data.password.value}
                    />
                </GridComponent>
                <GridComponent
                    sx={{ ...styles.centerBox, ...styles.marginTop }}
                    item
                    xs={12}
                >
                    <Link to='/signup'>Cadastrar</Link>
                </GridComponent>
                <GridComponent sx={styles.marginTop} item xs={12}>
                    <ButtonComponent fullWidth onClick={verifyLogin}>
                        Entrar
                    </ButtonComponent>
                </GridComponent>
            </GridComponent>
        </BoxComponent>
    );
}
