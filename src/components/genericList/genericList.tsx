import { Grid } from "@material-ui/core";
import React from "react";

interface Props<T> {
    renderItem: (item: T) => React.ReactNode;
    keyExtractor: (item: T) => string;
    data: T[];
}

const GenericList = <T extends unknown>({
    data,
    renderItem,
    keyExtractor
}: Props<T>) => {
    return (
        <Grid container
            alignItems="center"
            direction="row"
            justify="center" spacing={2}>
            {data.map((item) =>
                <Grid item xs={12} sm={4} md={3} key={keyExtractor(item)}>
                    {renderItem(item)}
                </Grid>
            )}
        </Grid>

    );
};

export default GenericList;
