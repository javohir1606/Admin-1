import { Route, Routes } from "react-router-dom";
import { MainLayout } from "./layout/main-layout";
import { SingIn } from "./pages/sing-in/sing-in";
import { mainRoutes } from "./routes/routes";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<SingIn />} />
        <Route path="app" element={<MainLayout />}>
          {mainRoutes?.map(({ component: Element, id, path }) => (
            <Route
              index={path ? false : true}
              key={id}
              path={path}
              element={<Element />}
            />
          ))}
        </Route>
      </Routes>
    </>
  );
};

export default App;
