import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';
import { Reservas, Habitaciones } from '../pages/';
import { Navbar } from '../../components';

export const AppRoutes = () => {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path='/habitaciones' element={<Habitaciones />} />
                <Route path='/reservas' element={<Reservas />} />

                <Route path='/*' element={<Navigate to="/habitaciones" />} />
            </Routes>
        </>

    )
}
