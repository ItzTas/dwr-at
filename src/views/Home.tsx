import { IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import babyImage from '../../assets/img/baby.png';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import SettingsIcon from '@mui/icons-material/Settings';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ACTIONS } from '../constants/actions';
import GridComponent from '../components/grid';
import BoxComponent from '../components/box';
import TextComponent from '../components/typography';
import CardNewItemComponent from '../components/custom/cardNewItem';
import CustomList from '../components/custom/customList';
import AvatarComponent from '../components/avatar';

const styles = {
    centerBox: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconButton: {
        height: '2.5em',
        width: '2.5em',
    },
    icon: {
        fontSize: '1.5em',
    },
    boxText: {
        marginTop: '.5em',
    },
    text1: {
        wordBreak: 'break-all',
        fontSize: '1.2em',
        fontWeight: '500',
        fontFamily: '"Lato", sans-serif',
    },
    text2: {
        wordBreak: 'break-all',
        fontSize: '.8em',
        fontWeight: '600',
        fontFamily: '"Lato", sans-serif',
    },
    text3: {
        wordBreak: 'break-all',
        fontSize: '.8em',
        fontWeight: '400',
    },
};

export default function Home() {
    const navigate = useNavigate();
    const theme = useTheme();

    const [babyData, setBabyData] = useState<any>({});
    const [babyInfos, setBabyInfos] = useState<any>({});

    useEffect(() => {
        const storedBabyData = localStorage.getItem('bebedata') || '[]';
        setBabyData(JSON.parse(storedBabyData));
        const storedBabyInfos = localStorage.getItem('babyinfos') || '{}';
        setBabyInfos(JSON.parse(storedBabyInfos));
    }, []);

    function handleItemdelete(item: any) {
        const id = item.id;
        const bebedataStr = localStorage.getItem('bebedata') || '[]';
        const bebedata = JSON.parse(bebedataStr);
        const newData = bebedata.filter((item: any) => item.id !== id);
        setBabyData(newData);
        localStorage.setItem('bebedata', JSON.stringify(newData));
    }

    return (
        <GridComponent container={true}>
            <GridComponent
                xs={12}
                sx={{
                    height: '25vh',
                }}
            >
                <GridComponent
                    container={true}
                    sx={{
                        alignItems: 'flex-end',
                        marginTop: '1em',
                    }}
                >
                    <GridComponent xs={4}>
                        <BoxComponent
                            sx={{
                                ...styles.centerBox,
                                ...styles.centerBox,
                            }}
                        >
                            <IconButton
                                sx={{
                                    ...styles.iconButton,
                                    border: `2px solid ${theme.palette.primary.main}`,
                                    cursor: 'not-allowed',
                                }}
                            >
                                <SignalCellularAltIcon
                                    sx={{
                                        ...styles.icon,
                                        color: `${theme.palette.primary.main}`,
                                    }}
                                />
                            </IconButton>
                            <BoxComponent
                                sx={{
                                    ...styles.centerBox,
                                    ...styles.boxText,
                                }}
                            >
                                <TextComponent component='p' sx={{ ...styles.text2 }}>
                                    {babyInfos?.height || 'N/A'} cm
                                </TextComponent>
                                <TextComponent component='p' sx={{ ...styles.text3 }}>
                                    Comprimento
                                </TextComponent>
                            </BoxComponent>
                        </BoxComponent>
                    </GridComponent>
                    <GridComponent xs={4}>
                        <BoxComponent
                            sx={{
                                ...styles.centerBox,
                            }}
                        >
                            <AvatarComponent sx={{ width: 90, height: 90 }} src={babyImage} />
                            <BoxComponent
                                sx={{
                                    ...styles.centerBox,
                                    ...styles.boxText,
                                }}
                            >
                                <TextComponent component='p' sx={{ ...styles.text1 }}>
                                    {babyInfos?.name || 'Nome não definido'}
                                </TextComponent>
                                <TextComponent component='p' sx={{ ...styles.text3 }}>
                                    --
                                </TextComponent>
                            </BoxComponent>
                        </BoxComponent>
                    </GridComponent>
                    <GridComponent xs={4}>
                        <BoxComponent
                            sx={{
                                ...styles.centerBox,
                            }}
                        >
                            <IconButton
                                sx={{
                                    ...styles.iconButton,
                                    border: `2px solid ${theme.palette.primary.main}`,
                                }}
                                onClick={() => navigate('/settings')}
                            >
                                <SettingsIcon
                                    sx={{
                                        ...styles.icon,
                                        color: `${theme.palette.primary.main}`,
                                    }}
                                />
                            </IconButton>
                            <BoxComponent
                                sx={{
                                    ...styles.centerBox,
                                    ...styles.boxText,
                                }}
                            >
                                <TextComponent component='p' sx={{ ...styles.text2 }}>
                                    {babyInfos?.weight || 'N/A'} kg
                                </TextComponent>
                                <TextComponent component='p' sx={{ ...styles.text3 }}>
                                    Peso
                                </TextComponent>
                            </BoxComponent>
                        </BoxComponent>
                    </GridComponent>
                </GridComponent>
            </GridComponent>
            <GridComponent
                item={true}
                xs={12}
                sx={{
                    backgroundColor: theme.palette.primary.main,
                    height: '75vh',
                }}
            >
                <GridComponent
                    container={true}
                    sx={{
                        marginTop: '-50px',
                        padding: 2,
                    }}
                >
                    <GridComponent xs={12} item={true}>
                        <GridComponent container={true} spacing={2}>
                            {ACTIONS.map((action, i) => (
                                <GridComponent xs={4} key={`${action.actionType}-${i}`}>
                                    <CardNewItemComponent
                                        title={action.title}
                                        Icon={action.Icon}
                                        color={action.color}
                                        actionType={action.actionType.toString()}
                                    />
                                </GridComponent>
                            ))}
                        </GridComponent>
                        <GridComponent
                            container={true}
                            sx={{
                                marginTop: '1em',
                            }}
                        >
                            <GridComponent xs={12}>
                                {babyData.length > 0 ? (
                                    <CustomList
                                        sx={{
                                            overflow: 'auto',
                                            maxHeight: '56.5vh',
                                        }}
                                        items={babyData}
                                        onItemDelete={handleItemdelete}
                                    />
                                ) : null}
                            </GridComponent>
                        </GridComponent>
                    </GridComponent>
                </GridComponent>
            </GridComponent>
        </GridComponent>
    );
}
