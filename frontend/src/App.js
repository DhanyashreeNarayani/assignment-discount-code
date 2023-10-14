import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Homepage from './pages/Home';
import AdminPage from './pages/Admin';
import RootLayout from './components/Layout/Root';

// const router = createBrowserRouter([
//   {
//     path: '/', element: <RootLayout />,
//     children: [
//       { path: '/', element: <Homepage /> },
//       { path: '/admin', element: <AdminPage /> }
//     ]
//   },

// ])

function App() {

  return (
    <Homepage />
  );
}

export default App;
