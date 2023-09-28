import { Route, Routes } from 'react-router-dom';
import { routes, routesWithoutLayout } from '../routes';
import PrivateRoute from './PrivateRoute';
import MainLayout from './MainLayout';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        {routes.map(({ isPublic, path, element }) =>
          isPublic ? (
            <Route key={path as string} path={path} element={element} />
          ) : (
            <Route
              key={path as string}
              path={path}
              element={<PrivateRoute>{element}</PrivateRoute>}
            />
          )
        )}
      </Route>
      {routesWithoutLayout.map(({ isPublic, path, element }) =>
        isPublic ? (
          <Route key={path as string} path={path} element={element} />
        ) : (
          <Route
            key={path as string}
            path={path}
            element={<PrivateRoute>{element}</PrivateRoute>}
          />
        )
      )}
    </Routes>
  );
}

export default App;
