// This TSX files renders a single post that displays the post, post content, upvotes, and comments.

// This TSX page will load when a post is clicked on the Home page.

import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import type { Table } from '../types/types'
import { supabase } from '../client'
import { useNavigate } from 'react-router'

const SelectedTable = () => {

    const { id } = useParams()

    const [table, setTable] = useState<Table | null>(null)
    const [upvotes, setUpvotes] = useState(0)
    const [newComment, setNewComment] = useState("")

    const navigate = useNavigate()

    useEffect(() => {

        const fetchTable = async () => {


            const { data }  = await supabase
            .from('tables')
            .select()
            .eq('id', id).single() // .single() tells Supabase "i only want one row back", which gives an object instead of an array

            const table = data as Table // asserting the data retrieved from the database separately in the table variable

            setTable(table)
            setUpvotes(table.upvotes)
        }

        fetchTable()

    }, [id])

    if (!table) {
        return <p> Loading Table... </p>
    }

    const formattedDate = new Date(table.created_at).toLocaleDateString()

    const handleUpvote = async () => {
        const updatedUpvotes = upvotes + 1

        await supabase
        .from('tables')
        .update({ upvotes: updatedUpvotes })
        .eq('id', id)

        setUpvotes(updatedUpvotes)
    }

    const handleAddComment = async () => {
        if (newComment.trim() === "") return

        const updatedComments = [...table.comments, newComment]

        await supabase
        .from('tables')
        .update({ comments: updatedComments })
        .eq('id', id)

        setTable({ ...table, comments: updatedComments })
        setNewComment("")
    }

    const handleDelete = async () => {
        const confirmed = window.confirm("Are you sure you want to delete this Table? Deleted Tables cannot be recovered!")

        if (!confirmed) return

        await supabase
        .from('tables')
        .delete()
        .eq('id', id)
        
        navigate("/")
    }

    return(
        <div className="flex justify-center pt-8 px-8">
            <div className="w-full max-w-2xl bg-card border-2 border-brown rounded-xl overflow-hidden">

                {/* the optional background and title */}
                {table.image_url ? (
                    <div className="relative">
                        <img src={table.image_url} className="object-cover h-52 w-full" />
                        <div className="flex absolute inset-0 items-end p-5 bg-linear-to-t from-ink/70 to-transparent">
                            <h2 className="font-heading text-2xl font-bold text-card text-balance"> {table.title} </h2>
                        </div>
                    </div>
                ) : (
                    <div className="flex h-52 items-end p-5 bg-linear-to-t from-ink to-brown">
                        <h2 className="font-heading text-2xl font-bold text-card text-balance"> {table.title} </h2>
                    </div>
                )}

                {/* pill meta bar: date, upvotes, and all post actions (Upvote, Edit, Delete) */}
                <div className="flex items-center justify-between flex-wrap gap-2 bg-brown-light px-6 py-3">
                    <div className="flex items-center gap-4 text-sm">
                        <div> {"Posted on: " + formattedDate} </div>
                        <div className="font-bold"> {upvotes + " upvotes 🔺"} </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleUpvote}
                            className="bg-mustard hover:bg-mustard-deep transition-colors duration-300 text-ink font-bold px-4 py-2 rounded-lg"
                        >
                            Upvote
                        </button>

                        {/* we will add an Edit button goes here too, once the edit-toggle form is built */}

                        <button
                            onClick={handleDelete}
                            className="bg-rust hover:bg-rust-deep transition-colors duration-300 text-card font-bold px-4 py-2 rounded-lg cursor-pointer"
                        >
                            Delete Table
                        </button>
                    </div>
                </div>

                {/* the body: contains context + comment section */}
                <div className="px-6 py-6">
                    {table.content && <p>{table.content}</p>}

                    <div className="mt-6">
                        <h2 className="font-heading text-lg text-mustard-deep mb-3">Comments</h2>

                        <div className="flex flex-col gap-2 mb-4">
                            {table.comments && table.comments.length > 0
                                ? table.comments.map((comment, index) => (
                                    <p key={index} className="border border-brown rounded-lg px-3 py-2 bg-body">
                                        {comment}
                                    </p>
                                ))
                                : <p className="text-brown">No comments yet. Be the first to leave one!</p>
                            }
                        </div>

                        <div className="flex flex-col gap-2">
                            <textarea
                                value={newComment}
                                onChange={(event) => setNewComment(event.target.value)}
                                className="min-h-20 border border-brown rounded-lg px-3 py-2 bg-card text-ink focus:outline-none focus:ring-2 focus:ring-mustard"
                                placeholder="Leave a comment..."
                            />
                            <button
                                onClick={handleAddComment}
                                className="self-start bg-mustard hover:bg-mustard-deep transition-colors duration-300 text-ink font-bold px-4 py-2 rounded-lg"
                            >
                                Post Comment
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )

}
export default SelectedTable