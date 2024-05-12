import { createBrowserRouter } from "react-router-dom";
import Landing from "../Pages/Landing/Landing";
import Details from "../Pages/Details/Details";
import Results from "../Pages/Results/Results";
import Home from "../page";

export const router = createBrowserRouter ([
    {
        path:"/",
        element:<Home />,
        children: [
            {path: "", element:<Landing /> },
            {path: "Results", element:<Results /> },
            {path: "Details", element:<Details /> }
        ]
    }
])