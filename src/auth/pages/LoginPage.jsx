import { Link as Register } from 'react-router-dom'
import { LoginOutlined } from "@mui/icons-material"
import { Button, Grid, Link, TextField } from "@mui/material"
import { AuthLayout } from '../layout/AuthLayout'
import { useForm } from '../../hooks/useForm'
import { useDispatch } from 'react-redux'
import { checkingAuthentication } from '../../store/auth'

export const LoginPage = () => {


    const dispatch = useDispatch()
    const { email, password, onInputChange, formState } = useForm({
        email: '',
        password: '',
    })


    const onSubmit = (e) => {
        e.preventDefault()
        console.log(formState)
        dispatch(checkingAuthentication())
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
                            <Button variant="contained"
                                type='submit'
                                fullWidth>
                                <LoginOutlined fontSize="small" />
                                &nbsp;
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
