import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';  // For Font Awesome icons
import { BrowserRouter } from 'react-router-dom'
import { StoreContext, store } from './Store/store.ts';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  
    <StoreContext.Provider value={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StoreContext.Provider>
)
