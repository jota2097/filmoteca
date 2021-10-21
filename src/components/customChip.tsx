import { Chip } from '@material-ui/core';


export default function CustomChip(props: { label: string, color: string }) {
    return (
        <Chip
            style={{ color: props.color, borderColor: props.color, textTransform: "capitalize" }}
            variant="outlined"
            label={props.label}
        />
    );
}
