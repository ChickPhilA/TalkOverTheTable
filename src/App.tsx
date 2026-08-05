// This TSX file will also act as the "Home" page.

import { useState, useEffect } from 'react'
import { supabase } from './client'

import './App.css'
import Card from './components/Card'

import type { Table } from './types/types'

const App = () => {

  const [tables, setTables] = useState<Table[]>([]) // our tables will be stored here
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState<"time" | "upvotes">("time")

  // We will need an API call to see if posts exist from the database.
  useEffect( () => {
    const fetchTables = async () => {
      const { data } = await supabase
      .from('tables')
      .select()
      .order('created_at', {ascending: false})

      const posts = data as Table[] // infers that destructuring the posts variable will be a Table[] type.

      setTables(posts)
    }

    fetchTables() // makes the API call!!
  }, [])

  // Derived list: filtered by search term, then sorted by whichever option is active.
  // Not its own state — recalculated on every render from `tables`, `searchTerm`, and `sortBy`.
  const visibleTables = tables
    .filter(table => table.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "upvotes") {
        return b.upvotes - a.upvotes
      }
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    })

  return (
    <>
      <div className="flex flex-row max-w-full">
        {/* The left item is the list of posts. But for now, we'll keep it full. */}
        <div className="flex flex-col gap-8 flex-1 pt-8 mx-8">
          <h2 className="text-mustard-deep text-center"> Check out what tables your communities are eating up below! </h2>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <input
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search by title..."
              className="flex-1 border border-brown rounded-lg px-3 py-2 bg-card text-ink focus:outline-none focus:ring-2 focus:ring-mustard"
            />

            <div className="flex items-center gap-2">
              <button
                onClick={() => setSortBy("time")}
                className={`px-4 py-2 rounded-lg font-bold transition-colors duration-300 ${sortBy === "time" ? "bg-mustard-deep text-card" : "bg-mustard text-ink hover:bg-mustard-deep hover:text-card"}`}
              >
                Sort by Time
              </button>
              <button
                onClick={() => setSortBy("upvotes")}
                className={`px-4 py-2 rounded-lg font-bold transition-colors duration-300 ${sortBy === "upvotes" ? "bg-mustard-deep text-card" : "bg-mustard text-ink hover:bg-mustard-deep hover:text-card"}`}
              >
                Sort by Upvotes
              </button>
            </div>
          </div>

          {visibleTables && visibleTables.length > 0
            ?
              visibleTables.map(table =>
                <Card key={table.id} post={table} />
            )
            :
            <h2 className="text-brown mx-auto">
              There are no tables to discuss over! Would you like to start a new one?
            </h2>
          }
        </div>
      </div>
    </>
  )
}

export default App
