
// @ts-ignore
import { Provider } from 'react-redux';
import { store } from './src/store';
import { persistor } from './src/store/store';
import MainStack from './src/navigation/MainStack';
import {PersistGate} from 'redux-persist/integration/react';

export default function App() {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <MainStack />
        </PersistGate>
      </Provider>
    </>
  );
}