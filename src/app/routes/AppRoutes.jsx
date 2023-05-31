import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Reservas } from '../reservas'
import { Habitaciones } from '../habitaciones'

export const AppRoutes = () => {
    return (
        <Routes>
            <Route index path='/' element={<Habitaciones />} />
            <Route path='/' element={<Reservas />} />

            <Route path='/*' element={<Navigate to="/" />} />


        </Routes>
    )
}
