import { useState } from "react";
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
import { hotelApi } from "../../../api";

const initialRoom = {
    room_number: "",
    room_type: "",
    room_value: ""
};

export const Habitaciones = () => {
    const [rooms, setRooms] = useState([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editing, setEditing] = useState(false);
    const [currentRoom, setCurrentRoom] = useState(initialRoom);

    const openDialog = (editing, room) => {
        setEditing(editing);
        setCurrentRoom(room || initialRoom);
        setDialogOpen(true);
    };

    const closeDialog = () => {
        setDialogOpen(false);
        setCurrentRoom(initialRoom);
    };

    const saveRoom = async () => {
        if (editing) {
            // Actualizar habitación existente
            const updatedRooms = rooms.map((room) =>
                room.id === currentRoom.id ? currentRoom : room
            );
            setRooms(updatedRooms);
        } else {
            const token = "eyJhbGciOiJFUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsImlhdCI6MTY4NTY1MDkzMCwiZXhwIjoxNjg1NjU0NTMwLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0IiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdCIsInN1YiI6ImVsb3BlejQ1QGN1Yy5lZHUuY28ifQ.AfHh4iCvujcFbTw8WdUWW2fZzg0Zq1u-G7kFGoJ475Su9mTHyrqdgPP7trfo761whZAZ88D_USPcd1C4FRZqKmJMAY4_BMoBdQDBOWfwujYWzioDBCH_ItN784vfIrZ_XxpmOxulMQzw4wOqh4wlwb40Mz5yuK10jPEHUCzAS-1jefa4"
            // Agregar nueva habitación
            const newRoom = await hotelApi.post('/rooms', currentRoom, {
               headers: {
                Authorization: `Bearer ${token}`
               }
            });
            console.log(newRoom)
            // if (newRoom.value <= 0) return

            // setRooms([...rooms, newRoom]);
        }
        closeDialog();
    };

    const deleteRoom = (room) => {
        const updatedRooms = rooms.filter((r) => r.id !== room.id);
        setRooms(updatedRooms);
    };

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
                        value={currentRoom.room_number}
                        onChange={(e) =>
                            setCurrentRoom({ ...currentRoom, room_number: e.target.value })
                        }
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Tipo"
                        value={currentRoom.room_type}
                        onChange={(e) =>
                            setCurrentRoom({ ...currentRoom, room_type: e.target.value })
                        }
                        fullWidth
                        margin="normal"
                    />

                    <TextField
                        // error
                        label="Valor"
                        value={currentRoom.room_value}
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
