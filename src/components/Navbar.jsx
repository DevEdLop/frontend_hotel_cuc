
import React from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton,
} from "@mui/material";
import { Hotel, ExitToApp } from "@mui/icons-material";

export const Navbar = () => {
    const handleLogout = () => {
        // Lógica para cerrar sesión
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: "secondary.main", color: "#fff" }}>
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="hotel">
                    <Hotel />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Sistema de Hotel
                </Typography>
                <Button color="inherit" startIcon={<ExitToApp />} onClick={handleLogout}>
                </Button>
            </Toolbar>
        </AppBar>
    );
};

