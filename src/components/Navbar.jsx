
import React from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton,
} from "@mui/material";
import { Hotel, ExitToApp } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { logout } from "../store/auth";

export const Navbar = () => {

    const dispatch = useDispatch()
    const handleLogout = () => {
        dispatch(logout())
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
                <Button color="error" startIcon={<ExitToApp fontSize="large" />} onClick={handleLogout}>
                </Button>
            </Toolbar>
        </AppBar>
    );
};

