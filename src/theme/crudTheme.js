import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

export const crudTheme = createTheme({
    palette: {
        primary: {
            main: "#0D47A1", // Azul oscuro
        },
        secondary: {
            main: "#757575", // Gris
        },
        error: {
            main: red.A400, // Rojo brillante
        },
        background: {
            default: "#FFFFFF", // Blanco
        },
        text: {
            primary: "#000000", // Texto negro
            secondary: "#212121", // Texto gris oscuro
        },
    },
});
