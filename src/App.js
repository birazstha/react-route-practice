import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Root from './pages/Root';
import Home from './pages/Home';
import Event, {
  loader as eventLoader,
  action as deleteEventAction,
} from './pages/Event';
import CreateEvent from './pages/CreateEvent';
import EventDetail, {
  loader as eventDetailLoader,
  action as eventDeleteLoader,
} from './pages/EventDetail';
import ErrorPage from './pages/ErrorPage';
import EditEvent, {updateAction} from './pages/EditEvent';
import {storeUpdateAction} from './pages/EventForm';

const router = createBrowserRouter ([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {index: true, element: <Home />},

      {
        path: 'events',
        children: [
          {
            index: true,
            element: <Event />,
            loader: eventLoader,
            action: deleteEventAction,
          },
          {
            path: 'create',
            element: <CreateEvent />,
            action: storeUpdateAction,
          },
          {
            path: ':id',
            loader: eventDetailLoader,
            id: 'event-details',
            children: [
              {
                index: true,
                element: <EventDetail />,
                action: eventDeleteLoader,
              },
              {
                path: 'edit',
                element: <EditEvent />,
                action: storeUpdateAction,
              },
            ],
          },
        ],
      },
    ],
  },
]);

function App () {
  return <RouterProvider router={router} />;
}

export default App;
