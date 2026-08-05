// This will be the Card component that carries every 'table'
// on our Home page.

import { Link } from 'react-router'
import type { Table } from '../types/types'

// (Define a CardProps type here — it should describe an object
// with one field, `post`, of type Table.)
// (This is what lets us destructure `{ post }` in the function signature below.)

// defining the CardProps type to let post (the 'table' concept) be destructured
type CardProps = {
    post: Table
}

const Card = ({ post }: CardProps) => {

    const formattedDate = new Date(post.created_at).toLocaleDateString()

    return (
        <Link to={`/table/${post.id}`} className="block w-full">
            <div className="w-full bg-card hover:bg-mustard/20 transition-colors duration-500 border-2 border-brown rounded-xl px-5 py-4">

                <h3 className="font-heading text-mustard-deep">
                    {post.title}
                </h3>

                <div className="flex flex-row gap-6">
                        <div className="text-brown">
                            {"Posted on: " + formattedDate}
                        </div>
                        <div className="text-mustard">
                            {post.upvotes + " Plates Up 🔺🍽️"}
                        </div>
                </div>
            </div>
        </Link>
    )
}

export default Card