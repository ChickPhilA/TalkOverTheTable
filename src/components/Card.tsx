// This will be the Card component that carries every 'table'
// on our Home page.

import { Link } from 'react-router'
import type { Table } from '../types/types'

// TODO: define a CardProps type here — it should describe an object
// with one field, `post`, of type Table.
// (This is what lets us destructure `{ post }` in the function signature below.)

// defining the CardProps type to let post (the 'table' concept) be destructured
type CardProps = {
    post: Table
}

const Card = ({ post }: CardProps) => {

    // TODO: format post.created_at (a raw ISO string) into a readable date.
    // Hint: new Date(...) + one of its .toLocaleDateString(...) options.
    const formattedDate = new Date(post.created_at).toLocaleDateString()

    return (
        <Link to={`/post/${post.id}`} className="block w-full">
            <div className="w-full bg-card border-2 border-brown rounded-xl px-5">
                {/* TODO: style this wrapper div with the "Version C" card look
                    from DESIGN.md — bg-card, border-brown, rounded corners, padding */}

                <h3 className="font-heading text-mustard-deep">
                    {/* TODO: render post.title here, styled with font-heading + text-mustard-deep */}
                    {post.title}
                </h3>

                <div className="flex flex-row gap-6">
                    {/* TODO: render formattedDate and post.upvotes side by side,
                        styled with text-brown for the date and text-mustard for the upvote count */}
                        <div className="text-brown">
                            {formattedDate}
                        </div>
                        <div className="text-mustard">
                            {post.upvotes}
                        </div>
                </div>
            </div>
        </Link>
    )
}

export default Card