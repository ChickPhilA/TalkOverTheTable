import { Link } from 'react-router'

const NotFound = () => {
    return (
    <>
       <div className="mx-auto mt-40 text-center brown font-heading">
            <h1 className="text-4xl">
            Whoops! Looks like no tables were not found over here...
                <br></br><br></br>
            Click <Link className="text-mustard hover:text-mustard/60 transition-colors duration-200 cursor-pointer" to="/"> here </Link> to return back to the Home page. Let's search for a table that exists!
            </h1>
        </div>
    </>
    )
}

export default NotFound