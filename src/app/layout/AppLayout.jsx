import { Box, Grid } from "@mui/material";

export const AppLayout = ({ children }) => {
    return (
        <Box
            sx={{
                backgroundColor: 'primary.main',
                minHeight: '92vh',
                padding: 4,
            }}
        >
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
            >
                <Grid
                    item
                    className="box-shadow"
                    sx={{
                        backgroundColor: '#fff',
                        padding: 3,
                        borderRadius: 2,
                        width: '70%',
                        maxHeight: '80vh',
                    }}
                >
                    {children}
                </Grid>
            </Grid>
        </Box>
    );
};
