import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './main/Login'
import CrearCuenta from './main/CrearCuenta'
import PLato from './pages/MantPlato/Plato'
import PaginaProtegida from './common/PaginaProtegida'
import TopNav from './common/TopNav'
import SideNav from './common/SideNav'
import EditarPlato from './pages/MantPlato/EditarPlato'
import CrearPlato from './pages/MantPlato/CrearPlato'
import Cliente from './pages/MantCliente/Cliente'
import Orden from './pages/MantOrden/Orden'
import Categoria from './pages/MantCategoria/Categoria'
import Mesero from './pages/MantMesero/Mesero'
import CrearCategoria from './pages/MantCategoria/CrearCategoria'
import EditarCategoria from './pages/MantCategoria/EditarCategoria'
import CrearCliente from './pages/MantCliente/CrearCliente'
import EditarCliente from './pages/MantCliente/EditarCliente'
import CrearMesero from './pages/MantMesero/CrearMesero'
import EditarMesero from './pages/MantMesero/EditarMesero'
import CrearOrden from './pages/MantOrden/CrearOrden'
import EditarOrden from './pages/MantOrden/EditarOrden'
import Chat from './pages/chat'

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/crearCuenta' element={<CrearCuenta />}></Route>
        <Route path='/chat' element={
          <PaginaProtegida>
            <TopNav></TopNav>
            <SideNav></SideNav>
            <Chat/>
          </PaginaProtegida>
        }></Route>
        <Route path='/plato' element={
          <PaginaProtegida>
            <TopNav></TopNav>
            <SideNav></SideNav>
            <PLato />

          </PaginaProtegida>
        }></Route>
        <Route path='/crearPlato' element={
          <PaginaProtegida>
            <TopNav></TopNav>
            <SideNav></SideNav>
            <CrearPlato />
          </PaginaProtegida>
        }></Route>
        <Route path='/editarPlato/:id' element={
          <PaginaProtegida>
            <TopNav></TopNav>
            <SideNav></SideNav>
            <EditarPlato />
          </PaginaProtegida>
        }></Route>

        {/* clientes */}
        <Route path='/cliente' element={
          <PaginaProtegida>
            <TopNav></TopNav>
            <SideNav></SideNav>
            <Cliente />

          </PaginaProtegida>
        }></Route>
        <Route path='/crearCliente' element={
          <PaginaProtegida>
            <TopNav></TopNav>
            <SideNav></SideNav>
            <CrearCliente />
          </PaginaProtegida>
        }></Route>
        <Route path='/editarCliente/:id' element={
          <PaginaProtegida>
            <TopNav></TopNav>
            <SideNav></SideNav>
            <EditarCliente />
          </PaginaProtegida>
        }></Route>
        <Route path='/orden' element={
          <PaginaProtegida>
            <TopNav></TopNav>
            <SideNav></SideNav>
            <Orden />

          </PaginaProtegida>
        }></Route>
        <Route path='/crearOrden' element={
          <PaginaProtegida>
            <TopNav></TopNav>
            <SideNav></SideNav>
            <CrearOrden />
          </PaginaProtegida>
        }></Route>
        <Route path='/editarOrden/:id' element={
          <PaginaProtegida>
            <TopNav></TopNav>
            <SideNav></SideNav>
            <EditarOrden />
          </PaginaProtegida>
        }></Route>
        
        <Route path='/categoria' element={
          <PaginaProtegida>
            <TopNav></TopNav>
            <SideNav></SideNav>
            <Categoria />

          </PaginaProtegida>
        }></Route>
        <Route path='/crearCategoria' element={
          <PaginaProtegida>
            <TopNav></TopNav>
            <SideNav></SideNav>
            <CrearCategoria />
          </PaginaProtegida>
        }></Route>
        <Route path='/editarCategoria/:id' element={
          <PaginaProtegida>
            <TopNav></TopNav>
            <SideNav></SideNav>
            <EditarCategoria />
          </PaginaProtegida>
        }></Route>

        {/* meseros */}
        <Route path='/mesero' element={
          <PaginaProtegida>
            <TopNav></TopNav>
            <SideNav></SideNav>
            <Mesero />

          </PaginaProtegida>
        }></Route>
        <Route path='/crearMesero' element={
          <PaginaProtegida>
            <TopNav></TopNav>
            <SideNav></SideNav>
            <CrearMesero/>
          </PaginaProtegida>
        }></Route>
        <Route path='/editarMesero/:id' element={
          <PaginaProtegida>
            <TopNav></TopNav>
            <SideNav></SideNav>
            <EditarMesero/>
          </PaginaProtegida>
        }></Route>
      </Routes>
    </Router>
  )
}

export default App
