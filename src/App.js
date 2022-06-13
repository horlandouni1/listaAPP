import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import AppContext from "./context/AppContext";
import PrivateRoute from "./components/PrivateRoute";
import useInitialState from "./hooks/useInitialState";
import Layout from "./containers/Layout";
import { List } from "./pages/List";
import { Actualizar } from "./pages/Actualizar";
import { ListDetail } from "./pages/ListDetail";
function App() {
  const initialState = useInitialState();

  return (
    <AppContext.Provider value={initialState}>
      <BrowserRouter>
        <Layout>
          <Routes>
            {/* <Route exact path="/" element={<Home />} /> */}
            <Route exact path="/" element={<PrivateRoute />}>
              <Route exact path="/" element={<Home />} />
            </Route>
            <Route exact path="/" element={<PrivateRoute />}>
              <Route exact path="/list" element={<List />} />
            </Route>
            <Route exact path="/" element={<PrivateRoute />}>
              <Route
                exact
                path="/listDetail/:idUser"
                element={<ListDetail />}
              />
            </Route>
            <Route exact path="/" element={<PrivateRoute />}>
              <Route
                exact
                path="/editarUser/:idUser"
                element={<Actualizar />}
              />
            </Route>
            <Route exact path="/login" element={<Login />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
