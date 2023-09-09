import { AuthProvider } from "./auth"
import { AppRouter } from "./router/AppRouter"

export const Vithani = () => {
    return (
        <AuthProvider>
            <AppRouter/>      
        </AuthProvider>
    )
}
