import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../pages/Home';
import ProductDetails from '../pages/ProductDetails';
import App from '../App';
export const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: '/products/:_id',
        element: <ProductDetails />,
      },
    ],
  },
]);
export default routes;
