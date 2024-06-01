import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchFiter from './components/SearchFiter';
import Home from './pages/Home';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import QuickSerach from './components/QuickSerach';


// import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {

    const router = createBrowserRouter([
        {
            path: '/',
            element: <Layout />,
            children: [
                {
                    path: '',
                    element: <Home />
                },
                {
                    path: '/searchFilter',
                    element: <SearchFiter />
                },
                {
                    path: '/quickSerach',
                    element: <QuickSerach />
                },
            ]
        }
    ])
    return (
        <>
            <RouterProvider router={router}>  </RouterProvider>

        </>
    );
}

export default App;
