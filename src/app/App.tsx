import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router';
import ForecastPage from '../pages/ForecastPage/ForecastPage';
import AdminPage from '../pages/AdminPage/AdminPage';

function App() {
  return (
    <div className="App">
      <main>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={<ForecastPage />}
            />
            <Route
              path="/admin"
              element={<AdminPage />}
            />
          </Routes>
        </BrowserRouter>
      </main>
    </div>
  );
}

export default App;
