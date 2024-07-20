import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Root from './pages/Root';
import Home from './pages/Home';
import Event, {eventLoader, deleteEventAction} from './pages/Event';
import CreateEvent from './pages/CreateEvent';
import EventDetail, {
  eventDetailLoader,
  eventDeleteLoader,
} from './pages/EventDetail';
import ErrorPage from './pages/ErrorPage';
import EditEvent, {eventEditLoader} from './pages/EditEvent';
import {storeUpdateAction} from './pages/EventForm';
import Newsletter, {signupAction} from './pages/Newsletter/Newsletter';

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

            children: [
              {
                index: true,
                loader: eventDetailLoader,
                id: 'event-details',
                element: <EventDetail />,
                action: eventDeleteLoader,
              },
              {
                path: 'edit',
                loader: eventEditLoader,
                id: 'event-edit',
                element: <EditEvent />,
                action: storeUpdateAction,
              },
            ],
          },
        ],
      },

      {path: '/newsletter', element: <Newsletter />, action: signupAction},
    ],
  },
]);

function App () {
  return <RouterProvider router={router} />;
}

export default App;
