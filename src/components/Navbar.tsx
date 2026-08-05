import { Outlet, NavLink } from 'react-router'

function Navbar() {
    return(
        <div>
            <nav className="bg-brown min-h-16 flex justify-around items-center px-4">
                    <NavLink to="/" end className="font-brand font-bold text-3xl text-mustard flex flex-col">
                        <div>
                            TalkOverTheTable
                        </div>
                        <div className="text-sm">
                            a chit-chat community for foodies
                        </div>
                    </NavLink>

                    <div className="flex items-center gap-8">
                        <NavLink to="about" className="text-mustard hover:text-mustard/60 transition-colors duration-300 cursor-pointer font-bold">
                            About
                        </NavLink>
                        <NavLink to="create" className="bg-mustard hover:bg-mustard-deep transition-colors duration-300 text-ink font-bold px-4 py-2 rounded-lg">
                            Create Table +
                        </NavLink>
                    </div>
            </nav>
            <Outlet/>
        </div>
    )
}

export default Navbar