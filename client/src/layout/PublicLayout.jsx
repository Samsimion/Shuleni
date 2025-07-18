import { Outlet } from "react-router-dom"

const PublicLayout = () => {
    // const { pathname } = useLocation();

    // const showHeader = pathname === '/'

    return (
        <div className="flex flex-col min-h-screen">
            
            <main>
                <Outlet />
            </main>
            
        </div>
    );
}; 

export default PublicLayout;