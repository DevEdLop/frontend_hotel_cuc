
import React from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton,
    Box,
} from "@mui/material";
import { Hotel, ExitToApp } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { logout } from "../store/auth";
import { Link } from "react-router-dom";

export const Navbar = () => {

    const dispatch = useDispatch()
    const handleLogout = () => {
        dispatch(logout())
        localStorage.clear('token')
        localStorage.clear('user')
        console.log('logout completed')
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
                <Box>
                    <Button component={Link} to="/habitaciones" color="inherit">
                        habitaciones
                    </Button>
                    <Button component={Link} to="/reservas" color="inherit">
                        reservas
                    </Button>
                </Box>
                <Button color="error" startIcon={<ExitToApp fontSize="large" />} onClick={handleLogout}>
                </Button>
            </Toolbar>
        </AppBar>
    );
};

