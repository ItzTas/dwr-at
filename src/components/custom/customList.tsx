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
import { useAppContext } from '../../Context';

interface IItem {
    id: string;
    action_type: number;
}

interface ICustomListProps extends ListProps {
    items: IItem[];
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
    ...props
}: ICustomListProps): React.JSX.Element {
    const navigate = useNavigate();
    const { translate } = useAppContext();

    return (
        <List {...props}>
            {items.map((item, index) => {
                const typeStr = actionTypeListToInt[item.action_type];
                return (
                    <ListItem
                        id={`new-item-list-${index}`}
                        onClick={() => navigate(`/${item.action_type}/${item.id}`)}
                        key={item.id}
                    >
                        <ListItemAvatar>
                            <Avatar sx={{ bgcolor: typeColor[item.action_type] }}>
                                {actionIcons[item.action_type] || <RestaurantMenuIcon />}
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={translate(typeStr)}
                            secondary={generateSubtitle(
                                item,
                                translate as unknown as boolean,
                            )}
                        />
                    </ListItem>
                );
            })}
        </List>
    );
}
