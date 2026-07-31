import { Link } from 'react-router'

const NotFound = () => {
    return (
    <>
       <div className="mx-auto text-center brown">
            <h1>
            Whoops! Looks like no tables to yap over were not found here...
                <br></br>
            Click <Link className="text-white" to="/"> to </Link> return back to the Home page. Let's search for a table that exists!
            </h1>
        </div>
    </>
    )
}

export default NotFound