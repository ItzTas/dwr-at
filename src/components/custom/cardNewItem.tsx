import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { SvgIconProps } from '@mui/material';
import CardComponent from '../card';
import GridComponent from '../grid';
import TextComponent from '../typography';
import FabComponent from '../fab';

interface Props {
    Icon: React.ComponentType<SvgIconProps>;
    color: string;
    title: string;
    actionType: string;
}

export default function CardNewItemComponent({
    Icon,
    color,
    title,
    actionType,
}: Props) {
    const navigate = useNavigate();

    function handleClick() {
        navigate(`/new/${actionType}`);
    }

    return (
        <CardComponent
            sx={{
                overflow: 'visible',
                borderRadius: '10%',
            }}
        >
            <GridComponent
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Icon
                    sx={{
                        marginTop: '.2em',
                        fontSize: '3em',
                        color: color,
                    }}
                />
                <TextComponent
                    sx={{
                        fontSize: '.85em',
                        marginTop: '0.5em',
                        fontWeight: '700',
                        textAlign: 'center',
                        wordWrap: 'break-word',
                        width: '90%',
                    }}
                >
                    {title}
                </TextComponent>
            </GridComponent>
            <GridComponent
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <TextComponent
                    sx={{
                        marginTop: '0.5em',
                        fontSize: '0.8em',
                        fontWeight: '400',
                        color: '#8f8f8f',
                    }}
                >
                    Adicione algo
                </TextComponent>
            </GridComponent>
            <GridComponent
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <FabComponent
                    size='small'
                    sx={{
                        color: color,
                        backgroundColor: '#fff',
                        position: 'relative',
                        bottom: '-20px',
                    }}
                    onClick={handleClick}
                >
                    <AddIcon />
                </FabComponent>
            </GridComponent>
        </CardComponent>
    );
}
