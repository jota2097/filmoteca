import * as React from 'react';
import { useContext } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { Favorite } from '@material-ui/icons';
import { ICardModel } from '../../interfaces/ICardModel';
import GenericList from '../genericList/genericList';
import CustomGrid from '../grid/grid';
import Box from '@mui/material/Box';
import { ProviderContext } from '../../provider/provider';
import CardItem from '../card/card';


export default function Profile() {
    const [value, setValue] = React.useState(0);
    const { state, dispatch } = useContext(ProviderContext);

    const handleChange = (_: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const sortByName = (): void => {
        dispatch({ type: value === 0 ? "ORDER_BY_NAME_ALREADYSEEN" : "ORDER_BY_NAME_WISHLIST" });
    }

    const sortByVotes = (): void => {
        dispatch({ type: value === 0 ? "ORDER_BY_VOTE_ALREADYSEEN" : "ORDER_BY_VOTE_WISHLIST" });
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Tabs value={value} onChange={handleChange} centered>
                <Tab icon={<VisibilityIcon />} label="Vistos" />
                <Tab icon={<Favorite />} label="Wishlist" />
            </Tabs>
            <CustomGrid
                title={""}
                sortByName={sortByName}
                sortByVotes={sortByVotes}
                showSorts={value === 0 ? state.alreadySeen.length > 0 : state.wishlist.length > 0}
                child={<GenericList
                    keyExtractor={({ id }) => id.toString()}
                    data={value === 0 ? state.alreadySeen : state.wishlist}
                    renderItem={(item) =>
                        <CardItem
                            isCallFromDetail={false}
                            allowViewMore={true}
                            showCardActions={false}
                            item={{
                                id: item.id,
                                title: item.title,
                                imageUrl: item.imageUrl,
                                year: item.year,
                                voteAverage: item.voteAverage
                            } as ICardModel} />}
                />} />
        </Box>
    );
}
