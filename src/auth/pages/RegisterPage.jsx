import { Link as Login } from 'react-router-dom'
import { Button, Grid, Link, TextField } from "@mui/material"
import { AuthLayout } from "../layout/AuthLayout"
import { AppRegistration } from "@mui/icons-material"


//variant para cambiar el componente y component para cambiar la referencia en html
export const RegisterPage = () => {
    return (
        <AuthLayout title='Registrar hotel cuc'>

            <form>
                <Grid container gap={2}>
                    <Grid item xs={12}>
                        <TextField
                            label="nombres"
                            type="text"
                            placeholder="mohamed andres"
                            fullWidth
                        >
                        </TextField>
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            label="apellidos"
                            type="text"
                            placeholder="smith cebolla"
                            fullWidth
                        >
                        </TextField>
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            label="correo"
                            type="email"
                            placeholder="correo@ejemplo.com"
                            fullWidth
                        >
                        </TextField>
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            label="contraseña"
                            type="password"
                            placeholder="Ingrese contraseña"
                            fullWidth

                        >
                        </TextField>
                    </Grid>

                    <Grid
                        container
                        spacing={2}
                        justifyContent="center"
                        sx={{ mb: 2, mt: 1 }}
                    >

                        <Grid item xs={12}>
                            <Button variant="contained" fullWidth>
                                <AppRegistration />
                                &nbsp;
                                Registrar
                            </Button>
                        </Grid>
                        <Grid item xs={12} sx={{ alignSelf: 'end' }}>
                            <Link
                                component={Login}
                                to="/auth/login">
                                ya tienes cuenta?
                            </Link>
                        </Grid>

                    </Grid>

                </Grid>
            </form>
        </AuthLayout>
    )
}
