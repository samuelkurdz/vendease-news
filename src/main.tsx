import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import './index.css'
import { Home } from './views/home/home-layout.tsx'
import { ErrorPage } from "./views/error-page.tsx";
import {BookmarkedNews} from "./views/bookmarks/bookmarks.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/bookmarks",
        element: <BookmarkedNews />,
        errorElement: <ErrorPage />,
    }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
   <RouterProvider router={router} />
  </React.StrictMode>,
)
