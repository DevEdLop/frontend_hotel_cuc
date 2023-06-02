import { useSelector } from "react-redux"

export const checkAuth = () => {
    const { status } = useSelector(state => state.auth)
}