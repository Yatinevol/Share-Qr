import { StrictMode } from 'react'
import { Provider } from 'react-redux'
import {createRoot} from "react-dom/client"
import { RouterProvider, createBrowserRouter,createRoutesFromElements } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import store from './store/store.js'
import Login from './components/Login.jsx'
import SignUp from './components/SignUp.jsx'
import Home from './components/Home.jsx'
import GetQr from './components/GetQr.jsx'
import { Route } from 'react-router-dom'
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path='/upload' element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/qr" element={<GetQr />} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
