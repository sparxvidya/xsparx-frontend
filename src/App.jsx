import axios from "axios";
import React, { lazy, Suspense, useEffect } from 'react';
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectRoute from './components/auth/ProtectRoute';
import { LayoutLoader } from './components/layout/Loaders';
import { server } from './constants/config';
import { userExists, userNotExists } from './redux/reducers/auth';
import { SocketProvider } from "./socket";

const Home= lazy( () => import("./pages/Home"));
const Login= lazy(() => import("./pages/Login"));
const Chat= lazy(() => import("./pages/Chat"));
const Groups= lazy(() => import("./pages/Groups"));
const NotFound= lazy(() => import("./pages/NotFound"));

const AdminLogin=lazy(() => import("./pages/admin/AdminLogin"));
const Dashboard=lazy(() => import("./pages/admin/Dashboard"));
const Usermanagement=lazy(() => import("./pages/admin/Usermanagement"));
const MessagesManagement=lazy(() => import("./pages/admin/messageManagement"));
const ChatManagement=lazy(() => import("./pages/admin/ChatManagement"));


// let user = true;
const App = () => {
  const { user, loader } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`${server}/api/v1/user/me`, { withCredentials: true })
      .then(({ data }) => dispatch(userExists(data.user)))
      .catch((err) => dispatch(userNotExists()));
  }, [dispatch]);

  return  loader ? (
    <LayoutLoader />  
  ): (
   <BrowserRouter>
  <Suspense fallback={<LayoutLoader/>}>
  <Routes>
   <Route element={<SocketProvider><ProtectRoute user={user}/></SocketProvider>}>
<Route path="/" element={<Home />}/>
<Route path="/chat/:chatId" element={<Chat/>}/>
<Route path="/groups" element={<Groups/>}/>
</Route>
<Route
            path="/login"
            element={
              <ProtectRoute user={!user} redirect="/">
                <Login />
              </ProtectRoute>
            }
          /> //see screen shot
 

  <Route path="/admin" element={<AdminLogin/ >}/>
  <Route path="/admin/dashboard" element={<Dashboard/ >}/>
  <Route path="/admin/users" element={<Usermanagement />}/>
  <Route path="/admin/chats" element={<ChatManagement />}/>
  <Route path="/admin/messages" element={<MessagesManagement/>}/>

  <Route path="*" element={<NotFound />} />

   </Routes>

  </Suspense>

  <Toaster position="bottom-center"/>
   
   </BrowserRouter>
  );
};

export default App