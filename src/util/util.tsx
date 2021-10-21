export const getColorOfPokemon = (type: string) => {
    switch (type) {
        case "grass":
            return "#00B3A4";
        case "fire":
            return "#F58271";
        case "water":
            return "#5581e0";
        case "bug":
            return "#B3F594";
        case "normal":
            return "#BE9661";
        case "poison":
            return "#966DA3";
        case "electric":
            return "#F7D02C";
        case "ground":
            return "#E2BF65";

        case "fairy":
            return "#D685AD";

        case "figthing":
            return "#C25956";

        case "psychic":
            return "#F95587";

        case "rock":
            return "#B6A136";

        case "ghost":
            return "#735797";

        case "dragon":
            return "#6F35FC";

        case "ice":
            return "#96D9D6";
        default:
            return "rgba(0, 0, 0, 0.8)";

    }
}