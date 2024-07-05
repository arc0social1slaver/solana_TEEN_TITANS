import { ReactNode } from "react";
import NavWelcome from "../components/NavWelcome";

interface LayoutProps {
    children: ReactNode
}
const Index = ({children}: LayoutProps) => {
    return <>
        <NavWelcome/>
        <main>{children}</main>
        </>
}
export default Index;