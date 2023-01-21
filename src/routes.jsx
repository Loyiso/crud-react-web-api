import { Navigate, useRoutes } from "react-router-dom";

import DashboardLayout from './Layouts/Layout'
import Dashboard from './pages/Dashboard' 
import VehicleListing from "./pages/vehicles";
import AddVehicle from "./pages/vehicles/create";
import EditVehicle from "./pages/vehicles/edit";
import Page404 from "./pages/404";

export default function Router() {
    return useRoutes([
        {
            path: "/",
            element: <DashboardLayout />,
            children: [
                { path: "dashboard", element: <Dashboard /> },
                { path: "vehicles", element: <VehicleListing /> },
                { path: "vehicles/add", element: <AddVehicle /> },
                { path: "vehicles/edit/:id", element: <EditVehicle /> },
                { path: "*", element: <Page404 /> }
            ],
        },
        { path: "*", element: <Navigate to="/page404" replace={true} /> },
    ]);
}
