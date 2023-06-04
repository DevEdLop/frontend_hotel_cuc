import { HotelProvider } from "./context"
import MainRouter from "./router/MainRouter"
import { AppTheme } from "./theme"

export const HotelApp = () => {
    return (
        <AppTheme>
            <HotelProvider>
                <MainRouter />
            </HotelProvider>
        </AppTheme>
    )
}
