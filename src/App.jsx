import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Layout from './Components/Layout/Layout.jsx';
import Home from './Components/Home/Home.jsx';
import Register from './Components/Register/Register.jsx';
import Login from './Components/Login/Login.jsx';
import AuthRoute from './Components/AuthRoute/AuthRoute.jsx';
import GuardRoute from './Components/GuardRoute/GuardRoute.jsx';
import PostDetails from './Components/PostDetails/PostDetails.jsx';
import Profile from './Components/Profile/Profile.jsx';
import './App.css';

function App() {
  const queryClient = new QueryClient()
  const routes = createBrowserRouter([{
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <GuardRoute><Home /></GuardRoute> },
      { path: 'profile', element: <GuardRoute><Profile /></GuardRoute> },
      { path: 'details/:id', element: <GuardRoute><PostDetails /></GuardRoute> },
      { path: 'register', element: <AuthRoute><Register /></AuthRoute> },
      { path: 'login', element: <AuthRoute><Login /></AuthRoute> },
    ]
  }]);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={routes}>
      </RouterProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
