import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AddPlayer from './routes/addPlayer.jsx';
import ScorePlayers from './routes/scorePlayers.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: '/addPlayers',
    element: <AddPlayer />,
  },
  {
    path: '/scorePlayers',
    element: <ScorePlayers />,
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
