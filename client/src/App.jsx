import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Website from "./pages/Website";
import { Suspense, useState } from "react";
import Layout from "./components/Layout/Layout";
import { Properties } from "./pages/Properties/Properties";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import {ReactQueryDevtools} from "react-query/devtools"
import "react-toastify/dist/ReactToastify.css"
import { Property } from "./pages/Property/Property";
import UserDetailContext from "./Context/UserDetailContext";
import Bookings from "./pages/Bookings/Bookings";
import Favourites from "./pages/Favourites/Favourites";
function App() {
  const queryClient = new QueryClient();
  const [userDetails, setUserDetails] = useState({
    favourites : [],
    bookings : [],
    token : null
  })
  return (
    <UserDetailContext.Provider value={{userDetails, setUserDetails}}>
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
    <Suspense fallback={<h2>...Loading</h2>}>
     <Routes>
      <Route element={<Layout/>}>
      <Route path="/" element={<Website></Website>}></Route>
      <Route path="/properties">
        <Route index element={<Properties></Properties>}></Route>
        <Route path=":propertyId" element={<Property></Property>}></Route>
      </Route>
       <Route path="/bookings" element={<Bookings />} />
       <Route path="/favourites" element={<Favourites />} />
      </Route>
     </Routes>
     </Suspense>
    </BrowserRouter>
    <ToastContainer/>
    <ReactQueryDevtools initialIsOpen={false}></ReactQueryDevtools>
    </QueryClientProvider>
    </UserDetailContext.Provider>
  );
}

export default App;
