import { ReactNode } from "react";
import Nav from "../components/Nav";

interface LayoutProps {
    children: ReactNode
}
const Index = ({children}: LayoutProps) => {
    return <>
        <Nav/>
        <main>{children}</main>
        </>
}
export default Index;