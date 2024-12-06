import React from 'react';
import List, { ListProps } from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { useNavigate } from 'react-router-dom';
import CribIcon from '@mui/icons-material/Crib';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import SpaIcon from '@mui/icons-material/Spa';
import { generateSubtitle } from '../../utils/action';
import { useAppContext } from '../../useAppContext';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButtonComponent from '../iconbutton';
import { useTheme } from '@mui/material';

interface IItem {
    id: string;
    action_type: number;
}

interface ICustomListProps extends ListProps {
    items: IItem[];
    onItemDelete?: (item: any) => void;
}

const actionTypeListToInt: Record<number, string> = {
    1: 'sleep',
    2: 'eat',
    3: 'diaper',
};

const typeColor: Record<number, string> = {
    1: '#4b10a9',
    2: '#47c869',
    3: '#f4cc1d',
};

const actionIcons: Record<number, React.ReactNode> = {
    1: <CribIcon />,
    2: <RestaurantMenuIcon />,
    3: <SpaIcon />,
};

export default function CustomList({
    items,
    onItemDelete,
    ...props
}: ICustomListProps): React.JSX.Element {
    const navigate = useNavigate();
    const { translate } = useAppContext();

    const theme = useTheme();

    function handleItemClick(item: any) {
        navigate(`/${item.action_type}/${item.id}`);
    }

    function handleDelete(event: React.MouseEvent, item: any) {
        event.preventDefault();
        event.stopPropagation();
        if (onItemDelete) {
            onItemDelete(item);
        }
    }

    return (
        <List {...props}>
            {items.map((item, index) => {
                const typeStr = actionTypeListToInt[item.action_type];
                return (
                    <ListItem
                        id={`new-item-list-${index}`}
                        onClick={() => handleItemClick(item)}
                        key={item.id}
                        sx={{ cursor: 'pointer' }}
                    >
                        <ListItemAvatar>
                            <Avatar sx={{ bgcolor: typeColor[item.action_type] }}>
                                {actionIcons[item.action_type] || <RestaurantMenuIcon />}
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={translate(typeStr)}
                            secondary={generateSubtitle(item, translate)}
                        />
                        <IconButtonComponent onClick={(e) => handleDelete(e, item)}>
                            <DeleteIcon sx={{ color: theme.palette.error.main }} />
                        </IconButtonComponent>
                    </ListItem>
                );
            })}
        </List>
    );
}
