import { useContext, useEffect, useState } from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
} from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";
import { AppLayout } from "../../layout/AppLayout";
import { createRoomsHotel, deleteRoomHotel, editRoomHotel, getRoomsHotel } from "../../../providers/rooms";
import { HotelContext } from "../../../context/HotelContex";

export const Habitaciones = () => {
    const {
        // State
        rooms,
        dialogOpen,
        editing,
        currentRoom,
        //Set
        setDialogOpen,
        setEditing,
        setCurrentRoom,
        getRooms } = useContext(HotelContext);

    const openDialog = (editing, room) => {
        setEditing(editing);
        setCurrentRoom(room);
        setDialogOpen(true);
    };

    const closeDialog = () => {
        setDialogOpen(false);
    };


    const saveRoom = async () => {

        if (editing) {
            // Actualizar habitación existente
            const updatedRooms = rooms.find((room) => room.id === currentRoom.id);
            const roomId = updatedRooms.id
            const newRoom = {
                ...updatedRooms,
                room_number: currentRoom.room_number,
                room_type: currentRoom.room_type,
                room_value: currentRoom.room_value
            }
            const resp = await editRoomHotel(roomId, newRoom)
            closeDialog()
            if (resp.ok) return getRooms()
        } else {
            // Agregar nueva habitación
            const newRoom = await createRoomsHotel(currentRoom)
            closeDialog()
            if (newRoom.ok) return getRooms()
        }
        closeDialog();
    };

    const deleteRoom = async (room) => {
        const { id } = rooms.find((r) => r.id === room.id);
        const resp = await deleteRoomHotel(id)
        closeDialog()
        if (resp.ok) return getRooms()
    };

    useEffect(() => {
        getRooms()
    }, [])

    return (
        <AppLayout>
            <Button
                variant="contained"
                startIcon={<Add />}
                onClick={() => openDialog(false)}
            >
                Agregar habitación
            </Button>
            <TableContainer component={Paper} sx={{ marginTop: 2 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>Número</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>Tipo</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>Valor</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rooms.map((room) => {
                            const { id, room_number, room_type, room_value } = room;

                            return (
                                <TableRow key={id}>
                                    <TableCell align="center">{room_number}</TableCell>
                                    <TableCell align="center">{room_type}</TableCell>
                                    <TableCell align="center">{room_value}</TableCell>
                                    <TableCell align="center">
                                        <IconButton onClick={() => openDialog(true, room)}>
                                            <Edit />
                                        </IconButton>
                                        <IconButton onClick={() => deleteRoom(room)}>
                                            <Delete />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>



            <Dialog open={dialogOpen} onClose={closeDialog}>
                <DialogTitle>{editing ? "Editar habitación" : "Agregar habitación"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>Ingrese los detalles de la habitación:</DialogContentText>
                    <TextField
                        label="Número"
                        value={currentRoom?.room_number}
                        onChange={(e) =>
                            setCurrentRoom({ ...currentRoom, room_number: e.target.value })
                        }
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Tipo"
                        value={currentRoom?.room_type}
                        onChange={(e) =>
                            setCurrentRoom({ ...currentRoom, room_type: e.target.value })
                        }
                        fullWidth
                        margin="normal"
                    />

                    <TextField
                        // error
                        label="Valor"
                        value={currentRoom?.room_value}
                        type="number"
                        onChange={(e) =>
                            setCurrentRoom({ ...currentRoom, room_value: e.target.value })
                        }
                        fullWidth
                        margin="normal"
                    // helperText="Incorrect entry."
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDialog}>Cancelar</Button>
                    <Button onClick={saveRoom} variant="contained" autoFocus>
                        {editing ? "Guardar cambios" : "Agregar"}
                    </Button>
                </DialogActions>
            </Dialog>
        </AppLayout>
    );
};
