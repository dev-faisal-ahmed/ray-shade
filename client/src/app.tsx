import { Provider } from 'react-redux';
import { Router } from './routes/router';
import { store } from './redux/store';
import { Toaster } from 'react-hot-toast';

export function App() {
  return (
    <main className='text-primary-800'>
      <Provider store={store}>
        <Toaster />
        <Router />
      </Provider>
    </main>
  );
}
