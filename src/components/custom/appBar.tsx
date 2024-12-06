import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import IconButtonComponent from '../iconbutton';
import BoxComponent from '../box';

interface AppBarComponentProps {
    title: string;
    id?: string;
    onDelete?: () => void;
}

export default function AppBarComponent({
    title,
    id,
    onDelete,
}: AppBarComponentProps): React.JSX.Element {
    const navigate = useNavigate();

    function handleBack() {
        navigate('/');
        window.location.reload();
    }

    return (
        <AppBar position='static'>
            <Toolbar>
                <IconButtonComponent
                    size='large'
                    edge='start'
                    color='inherit'
                    aria-label='menu'
                    sx={{
                        position: 'relative',
                        zIndex: '2',
                    }}
                    onClick={handleBack}
                >
                    <ArrowBackIcon />
                </IconButtonComponent>
                <Typography
                    variant='h6'
                    component='div'
                    sx={{
                        flexGrow: 1,
                        textAlign: 'center',
                        position: 'absolute',
                        left: '0',
                        width: '100%',
                        zIndex: '1',
                    }}
                >
                    {title}
                </Typography>
                {id ? (
                    <BoxComponent
                        sx={{
                            display: { xs: 'flex', md: 'none' },
                            position: 'absolute',
                            right: '1.5em',
                        }}
                    >
                        <IconButtonComponent
                            size='large'
                            edge='end'
                            color='inherit'
                            aria-label='menu'
                            sx={{
                                position: 'relative',
                                zIndex: '2',
                            }}
                            onClick={onDelete}
                        >
                            <DeleteIcon />
                        </IconButtonComponent>
                    </BoxComponent>
                ) : null}
            </Toolbar>
        </AppBar>
    );
}
