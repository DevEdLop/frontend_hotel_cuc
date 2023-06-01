import { Grid, Typography } from "@mui/material"

export const AuthLayout = ({ children, title = "" }) => {
    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{
                backgroundColor: 'primary.main',
                minHeight: '100vh',
                padding: 4
            }}
        >

            <Grid
                item
                className="box-shadow"
                sx={{
                    backgroundColor: '#fff',
                    padding: 3,
                    borderRadius: 2,
                    width: { sm: '450px' }
                }}
            >
                <Typography variant="h5" sx={{ marginBottom: 5 }}> {title}</Typography>

                {children}
            </Grid>
        </Grid >

    )
}
