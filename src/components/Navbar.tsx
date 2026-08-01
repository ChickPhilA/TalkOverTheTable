import { Outlet, NavLink } from 'react-router'

function Navbar() {
    return(
        <div>
            <nav className="bg-brown min-h-16 flex justify-around  items-center">
                <NavLink to="/" end className="font-brand font-bold text-3xl text-mustard">
                    TalkOverTheTable
                </NavLink>

                <NavLink to="create" className="bg-mustard hover:bg-mustard-deep transition-colors duration-300 text-ink font-bold px-4 py-2 rounded-lg">
                    Create Table +
                </NavLink>
            </nav>
            <Outlet/>
        </div>
    )
}

export default Navbar