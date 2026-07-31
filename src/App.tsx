// This TSX file will also act as the "Home" page.

import { useState, useEffect } from 'react'
import { supabase } from './client'

import './App.css'
import Card from './components/Card'

import type { Table } from './types/types'

const App = () => {

  const [tables, setTables] = useState<Table[]>([]) // our tables will be stored here
  

  // We will need an API call to see if posts exist from the database.
  useEffect( () => {
    const fetchTables = async () => {
      const { data } = await supabase
      .from('tables')
      .select()
      .order('created_at', {ascending: true})

      const posts = data as Table[] // infers that destructuring the posts variable will be a Table[] type.

      setTables(posts)
    }

    fetchTables() // makes the API call!!
  }, [])

  return (
    <>
      <div className="flex flex-row max-w-full">
        {/* The left item is the list of posts. But for now, we'll keep it full. */}
        <div>
          {tables && tables.length > 0
            ?
            tables.map(table => 
              <Card key={table.id} post={table} />
            ) 
            :
            <h2 className="brown mx-auto">
              There are no tables to discuss over! Would you like to start a new one?
            </h2>
          }
        </div>
      </div>
    </>
  )
}

export default App
