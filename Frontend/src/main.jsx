import { StrictMode } from 'react'
import { Provider } from 'react-redux'
import {createRoot} from "react-dom/client"
import { RouterProvider, createBrowserRouter,createRoutesFromElements } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import store from './store/store.js'
import Upload from './pages/Upload.jsx'
import Login from './pages/Login.jsx'
import SignUp from './pages/SignUp.jsx'
import GetQr from './pages/GetQr.jsx'
import Protected from './components/AuthLayout.jsx'
import { Route } from 'react-router-dom'
import UserQr from './components/UserQr.jsx'
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path='/' element={<Upload />} />
      <Route path="/login" 
      element={
      <Protected authentication={false}> 
        <Login/>
      </Protected>
      } />
      <Route path="/signup" 
      element={
      <Protected authentication={false}>
        <SignUp />
      </Protected>
      } />
      <Route path="/qr" 
      element={
      <Protected authentication>
        <GetQr/>
      </Protected>
      }/>
      <Route path="/myqr" 
      element={
      <Protected authentication>
        <UserQr/>
      </Protected>
      }/>
      
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
