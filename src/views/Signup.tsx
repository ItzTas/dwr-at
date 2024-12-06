import logo from '../../assets/img/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { handleChange } from '../utils/core';
import { validateEmail, validPassword } from '../utils/validators';
import BoxComponent from '../components/box';
import GridComponent from '../components/grid';
import ButtonComponent from '../components/button';
import TextComponent from '../components/typography';
import AvatarComponent from '../components/avatar';
import TextFieldComponent from '../components/textfield';

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

interface FormData {
    email: {
        value: string;
        error: boolean | null;
        helperText: string | null;
    };
    password: {
        value: string;
        error: boolean | null;
        helperText: string | null;
    };
    confirm_password: {
        value: string;
        error: boolean | null;
        helperText: string | null;
    };
}

export default function SignUp() {
    const navigate = useNavigate();

    const [data, setData] = useState<FormData>({
        email: { value: '', error: null, helperText: null },
        password: { value: '', error: null, helperText: null },
        confirm_password: { value: '', error: null, helperText: null },
    });

    function validateForm() {
        const emailValidation = validateEmail(data.email.value.trim());
        const passwordValidation = validPassword(data.password.value.trim());
        const passwordMatch = data.password.value === data.confirm_password.value;

        setData((prevState) => ({
            ...prevState,
            email: {
                ...prevState.email,
                error: emailValidation.error,
                helperText: emailValidation.helperText,
            },
            password: {
                ...prevState.password,
                error: passwordValidation.error,
                helperText: passwordValidation.helperText,
            },
            confirm_password: {
                ...prevState.confirm_password,
                error: !passwordMatch,
                helperText: passwordMatch ? null : 'As senhas não coincidem',
            },
        }));

        return !emailValidation.error && !passwordValidation.error && passwordMatch;
    }

    function handleRegister() {
        if (!validateForm()) {
            return;
        }

        localStorage.setItem(
            'session',
            JSON.stringify({
                email: data.email.value,
                password: data.password.value,
            }),
        );

        navigate('/signin');
    }

    function handleFocus(field: 'email' | 'password' | 'confirm_password') {
        setData((prevState) => ({
            ...prevState,
            [field]: {
                ...prevState[field],
                error: null,
                helperText: null,
            },
        }));
    }

    return (
        <BoxComponent sx={{ height: '100vh', paddingTop: 8 }}>
            <GridComponent sx={styles.boxAdjustment} container>
                <GridComponent sx={styles.centerBox} item xs={12}>
                    <AvatarComponent sx={{ width: 180, height: 180 }} src={logo} />
                </GridComponent>
                <GridComponent sx={styles.centerBox} item xs={12}>
                    <TextComponent variant='h3'>Crie sua Conta</TextComponent>
                </GridComponent>
                <GridComponent sx={styles.centerBox} item xs={12}>
                    <TextComponent variant='h5'>Seja Bem-vindo!</TextComponent>
                </GridComponent>

                <GridComponent sx={styles.marginTop} item xs={12}>
                    <TextFieldComponent
                        label='E-mail'
                        fullWidth
                        onChange={(event) =>
                            handleChange(data, setData, event.target.value, 'email')
                        }
                        onFocus={() => handleFocus('email')}
                        value={data.email.value}
                        error={data.email.error as boolean}
                        helperText={data.email.helperText}
                    />
                </GridComponent>

                <GridComponent sx={styles.marginTop} item xs={12}>
                    <TextFieldComponent
                        label='Senha'
                        fullWidth
                        onChange={(event) =>
                            handleChange(data, setData, event.target.value, 'password')
                        }
                        onFocus={() => handleFocus('password')}
                        type='password'
                        error={data.password.error as boolean}
                        helperText={data.password.helperText}
                        value={data.password.value}
                    />
                </GridComponent>

                <GridComponent sx={styles.marginTop} item xs={12}>
                    <TextFieldComponent
                        label='Confirmar Senha'
                        fullWidth
                        onChange={(event) =>
                            handleChange(
                                data,
                                setData,
                                event.target.value,
                                'confirm_password',
                            )
                        }
                        onFocus={() => handleFocus('confirm_password')}
                        type='password'
                        error={data.confirm_password.error as boolean}
                        helperText={data.confirm_password.helperText}
                        value={data.confirm_password.value}
                    />
                </GridComponent>

                <GridComponent sx={styles.centerBox} item xs={12}>
                    <Link to='/signin'>Já tem uma conta? Entrar</Link>
                </GridComponent>

                <GridComponent sx={styles.marginTop} item xs={12}>
                    <ButtonComponent fullWidth onClick={handleRegister}>
                        Registrar
                    </ButtonComponent>
                </GridComponent>
            </GridComponent>
        </BoxComponent>
    );
}
