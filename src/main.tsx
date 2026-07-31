import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, useParams } from 'react-router'
import './index.css'

import App from './App.tsx'
import Navbar from './components/Navbar.tsx'
import SelectedTable from './pages/SelectedTable.tsx'


createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
        <Route path ="/" element={<Navbar/>}>
          <Route index={true} element={<App/>} />
           <Route path="/table/:id" element={<SelectedTable/>} /> 
        </Route>
    </Routes>
  </BrowserRouter>
)
