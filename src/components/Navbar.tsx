import { Outlet, NavLink } from 'react-router'

function Navbar() {
    return(
        <div>
            <nav className="bg-brown min-h-16 flex items-center">
                <NavLink to="/" end className="font-brand font-bold text-3xl text-mustard">
                    TalkOverTheTable
                </NavLink>
            </nav>
            <Outlet/>
        </div>
    )
}

export default Navbar