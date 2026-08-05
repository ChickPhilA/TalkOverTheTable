import { useState } from 'react'
import { supabase } from '../client'
import { useNavigate } from 'react-router'
import type { NewTable } from '../types/types'

const CreateTable = () => {

    // a dumb, exhaustive, yet a list of possible keywords to at least keep the post a 'food' context
    const keywords = ["food", "recipe", "recipes", "eat", "eats", "cook", "meal", "dish", "ingredient",
        "cuisine", "snack", "drink", "coffee", "dessert", "meat", "chicken", "pork",
        "beef", "steak", "protein", "yogurt", "dairy", "burger", "fries", "shake", "fast food",
        "gourmet", "foodies", "hungry", "vegan", "vegetarian", "cafe", "diner", "breakfast",
        "lunch", "dinner", "egg", "eggs", "bacon", "pancakes", "fruit", "vegetables", "snack", "nuts",
        "berries", "pizza", "apple", "tomato", "chips", "pasta", "tacos", "burritos", "salsa", "potato",
        "cheese", "cheddar", "spinach", "turkey", "swiss", "ham", "sandwich", "roast beef", "noodles", "ramen"]

    // STATES
    const [newTable, setNewTable] = useState<NewTable>({
        title: "",
        content: "",
        image_url: "",
        category: ""
    })

    const [contextError, setContextError] = useState("")

    // this redirects the page back to the Home page after the form is submitted
    const navigate = useNavigate()

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setNewTable(prev => ({ ...prev, [event.target.id] : event.target.value}))
    }

    const foodContextCheck = (newTableTitle: string, newTableContent: string) => {
        // here, we check both the title and the content to see if they're food related
        let titleAndContent = `${newTableTitle} ${newTableContent}`

        titleAndContent = titleAndContent.toLowerCase() // converts every word into lowercase letters

        return keywords.some(keyword => titleAndContent.includes(keyword))
    }

    // The CREATE operation that gets uploaded to Supabase.
    const submitTable = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if(!foodContextCheck(newTable.title, newTable.content)) {
            setContextError("Your post's Table title nor content is not food-related; try mentioning a dish, restaruant, or a recipe!")
            return   
        }
        else {
            setContextError("")
            // Sends our table inputs to our database! Also logs if an error occurs upon submit.
            const { error } = await supabase
            .from('tables')
            .insert(newTable)
            .select()

            if (error) console.log(error)

            navigate("/")
        }
    }

    return (
        <>
            <div className="flex justify-center pt-8 px-8">
              <div className="w-full max-w-2xl bg-card border-2 border-brown rounded-xl px-6 py-8 font-body text-ink">
                {contextError && (
                    <div className="w-full bg-rust text-card font-bold text-center px-4 py-3 rounded-lg mb-4">
                        {contextError}
                    </div>
                )}
                <p className="mb-6">Create a new Table below for fellow foodies to discuss! Fill out the following categories below.</p>
                <form onSubmit={submitTable} className="flex flex-col gap-6">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="title" className="block font-bold text-mustard-deep"> Title of your post: </label>
                        <input
                            type="text"
                            id="title"
                            value={newTable.title}
                            onChange={handleChange}
                            required
                            className="border border-brown rounded-lg px-3 py-2 bg-card text-ink focus:outline-none focus:ring-2 focus:ring-mustard"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="content" className="block font-bold text-mustard-deep"> Type your question, content, or food thoughts below: </label>
                        <textarea
                            id="content"
                            value={newTable.content}
                            onChange={handleChange}
                            required
                            className="min-h-32 border border-brown rounded-lg px-3 py-2 bg-card text-ink focus:outline-none focus:ring-2 focus:ring-mustard"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="image_url" className="block font-bold text-mustard-deep"> Got a photo? Paste an image URL (optional): </label>
                        <input
                            type="url"
                            id="image_url"
                            value={newTable.image_url}
                            onChange={handleChange}
                            className="border border-brown rounded-lg px-3 py-2 bg-card text-ink focus:outline-none focus:ring-2 focus:ring-mustard"
                        />
                    </div>

                    <button
                        type="submit"
                        className="self-start bg-mustard hover:bg-mustard-deep transition-colors duration-300 text-ink font-bold px-4 py-2 rounded-lg"
                    >
                        Create Your Table!
                    </button>
                </form>
              </div>
            </div>
        </>
    )
}

export default CreateTable