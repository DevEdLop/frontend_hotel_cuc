import { Link as Login, useNavigate } from 'react-router-dom'
import { Button, Grid, Link, TextField } from "@mui/material"
import { AuthLayout } from "../layout/AuthLayout"
import { AppRegistration } from "@mui/icons-material"
import { useForm } from '../../hooks/useForm'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { registerWithEmailPassword } from '../../providers/auth'


//variant para cambiar el componente y component para cambiar la referencia en html

const initialForm = {
    nombres: '',
    apellidos: '',
    email: '',
    password: '',
}
const formValidations = {
    nombres: [(value) => value.length >= 1, 'Los Nombres son obligatorios'],
    apellidos: [(value) => value.length >= 1, 'Los apellidos son obligatorios'],
    email: [(value) => value.includes('@'), 'El correo debe tener un @'],
    password: [(value) => value.length >= 1, 'La contraseña debe tener mas de 6 caracteres'],
}


export const RegisterPage = () => {


    const navigate = useNavigate()
    const [formSubmitted, setFormSubmitted] = useState(false)

    const {
        nombres,
        apellidos,
        email,
        password,
        onInputChange,
        formState,
        nombresValid,
        apellidosValid,
        emailValid,
        passwordValid,
        isFormValid
    } = useForm(initialForm, formValidations)


    const onSubmit = async (e) => {
        e.preventDefault()
        setFormSubmitted(true)
        if (!isFormValid) return
        const resp = await registerWithEmailPassword({...formState, first_name: nombres, last_name: apellidos})
        if (resp.ok) {
            navigate('/login')
        }
    }



    return (
        <AuthLayout title='Registrar hotel cuc'>

            <form onSubmit={onSubmit}>
                <Grid container gap={2}>
                    <Grid item xs={12}>
                        <TextField
                            label="nombres"
                            type="text"
                            placeholder="mohamed andres"
                            name='nombres'
                            value={nombres}
                            onChange={onInputChange}
                            fullWidth
                            error={!!nombresValid && formSubmitted}
                            helperText={nombresValid}
                        >
                        </TextField>
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            label="apellidos"
                            type="text"
                            placeholder="smith cebolla"
                            name='apellidos'
                            value={apellidos}
                            onChange={onInputChange}
                            fullWidth
                            error={!!apellidosValid && formSubmitted}
                            helperText={apellidosValid}
                        >
                        </TextField>
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            label="correo"
                            type="email"
                            placeholder="correo@ejemplo.com"
                            name='email'
                            value={email}
                            onChange={onInputChange}
                            fullWidth
                            error={!!emailValid && formSubmitted}
                            helperText={emailValid}
                        >
                        </TextField>
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            label="contraseña"
                            type="password"
                            placeholder="Ingrese contraseña"
                            name='password'
                            value={password}
                            onChange={onInputChange}
                            fullWidth
                            error={!!passwordValid && formSubmitted}
                            helperText={passwordValid}
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
                            <Button
                                type='submit'
                                variant="contained"
                                fullWidth
                                startIcon={<AppRegistration />}
                            >
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
