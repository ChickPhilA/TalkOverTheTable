import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, useParams } from 'react-router'
import './index.css'

import App from './App.tsx'
import Navbar from './components/Navbar.tsx'
import CreateTable from './pages/CreateTable.tsx'
import SelectedTable from './pages/SelectedTable.tsx'
import About from './pages/About.tsx'
import NotFound from './pages/NotFound.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
        <Route path ="/" element={<Navbar/>}>
          <Route index={true} element={<App/>} />
          <Route path="create" element={<CreateTable/>} />
          <Route path="/table/:id" element={<SelectedTable/>} /> 
          <Route path="about" element={<About/>} />
          <Route path="*" element={<NotFound/>} />
        </Route>
    </Routes>
  </BrowserRouter>
)
