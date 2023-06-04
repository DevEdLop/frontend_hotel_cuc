import React, { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Tooltip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

import { format } from "date-fns"

const ReservasTable = ({ reservas, handleEdit, handleDelete }) => {
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedReserva, setSelectedReserva] = useState(null);

    const openDeleteDialog = (reserva) => {
        console.log('detalle',reserva)
        setSelectedReserva(reserva);
        setDeleteDialogOpen(true);
    };

    const closeDeleteDialog = () => {
        setDeleteDialogOpen(false);
        setSelectedReserva(null);
    };

    const handleConfirmDelete = () => {
        if (selectedReserva) {
            handleDelete(selectedReserva.id);
            closeDeleteDialog();
        }
    };

    return (
        <>
            <TableContainer component={Paper} sx={{ maxHeight: '200px', scroll: 'auto'}}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Cliente</TableCell>
                            <TableCell>Teléfono</TableCell>
                            <TableCell>Fecha de reserva</TableCell>
                            <TableCell>Fecha de entrada</TableCell>
                            <TableCell>Fecha de salida</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {reservas.map((reserva) => (
                            <TableRow key={reserva.id}>
                                <TableCell>{reserva.id}</TableCell>
                                <TableCell>{reserva.client_name}</TableCell>
                                <TableCell>{reserva.client_phone}</TableCell>
                                <TableCell>{format(new Date(reserva.booking_date), 'dd/MM/yyyy')}</TableCell>
                                <TableCell>{format(new Date(reserva.entry_date), 'dd/MM/yyyy')}</TableCell>
                                <TableCell>{format(new Date(reserva.end_date), 'dd/MM/yyyy')}</TableCell>
                                <TableCell>
                                    <Tooltip title="Editar">
                                        <IconButton
                                            color="primary"
                                            onClick={() => handleEdit(reserva)}
                                        >
                                            <Edit />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Eliminar">
                                        <IconButton
                                            color="secondary"
                                            onClick={() => openDeleteDialog(reserva)}
                                        >
                                            <Delete />
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        ))}

                    </TableBody>
                </Table>
            </TableContainer>

            {/* Diálogo de confirmación de eliminación */}
            <Dialog open={deleteDialogOpen} onClose={closeDeleteDialog}>
                <DialogTitle>Eliminar reserva</DialogTitle>
                <DialogContent>
                    ¿Estás seguro de que deseas eliminar esta reserva?
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDeleteDialog}>Cancelar</Button>
                    <Button onClick={handleConfirmDelete} color="error">
                        Eliminar
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default ReservasTable;
