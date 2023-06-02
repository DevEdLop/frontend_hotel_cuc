import { Link as Register } from 'react-router-dom'
import { LoginOutlined } from "@mui/icons-material"
import { Button, Grid, Link, TextField } from "@mui/material"
import { AuthLayout } from '../layout/AuthLayout'
import { useForm } from '../../hooks/useForm'
import { useDispatch, useSelector } from 'react-redux'
import { startLoginWithEmailPassword } from '../../store/auth'
import { useMemo, useState } from 'react'

const initialForm = {
    email: '',
    password: '',
}

const formValid = {
    email: [(value) => value.includes('@'), 'El correo debe tener un @'],
    password: [(value) => value.length >= 5, 'La contraseña debe tener mas de 6 caracteres']
}
export const LoginPage = () => {

    const dispatch = useDispatch()

    const { status } = useSelector(state => state.auth)
    const [formSubmitted, setFormSubmitted] = useState(false)


    const { email, password, onInputChange, formState,
        isFormValid, emailValid, passwordValid } = useForm(initialForm, formValid)
    const isAuthenticated = useMemo(() => status === 'checking', [status])

    const onSubmit = (e) => {
        e.preventDefault()
        // console.log(formState)
        setFormSubmitted(true)
        if (!isFormValid) return
        dispatch(startLoginWithEmailPassword(formState))
    }

    return (
        <AuthLayout title='Login hotel cuc'>

            <form onSubmit={onSubmit}>
                <Grid container>
                    <Grid item xs={12}>
                        <TextField
                            label="correo"
                            type="email"
                            placeholder="correo@ejemplo.com"
                            value={email}
                            name='email'
                            onChange={onInputChange}
                            error={!!emailValid && formSubmitted}
                            helperText={emailValid}
                            fullWidth
                        >
                        </TextField>
                    </Grid>

                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label="contraseña"
                            type="password"
                            placeholder="Ingrese contraseña"
                            value={password}
                            name='password'
                            onChange={onInputChange}
                            error={!!passwordValid && formSubmitted}
                            helperText={passwordValid}
                            fullWidth

                        >
                        </TextField>
                    </Grid>

                    <Grid
                        container
                        spacing={2}
                        justifyContent="space-between"
                        sx={{ mb: 2, mt: 1 }}
                    >
                        <Grid item xs={12} >
                            <Button
                                disabled={isAuthenticated}
                                variant="contained"
                                type='submit'
                                startIcon={
                                    <LoginOutlined
                                        fontSize="small"
                                    />
                                }
                                fullWidth>
                                Login
                            </Button>
                        </Grid>

                        <Grid item xs={12} sx={{ alignSelf: 'end' }}>
                            <Link
                                component={Register}
                                to="/auth/register">
                                Crear cuenta
                            </Link>
                        </Grid>

                    </Grid>

                </Grid>
            </form>
        </AuthLayout>
    )
}
