export interface Table {
    id: number
    created_at: string
    title: string
    upvotes: number
    content: string
    image_url?: string
    comments: string[]
    category?: string
}

/* Below is the type for our CreateTable.tsx form. We import NewTable for creating a new table (post).
 If we use the Table type instead of NewTable type to create a new table form, then
 TypeScript will give errors for not having values that are created upon creating to Supabase
provided already (e.g. 'id', 'created_at', etc.)
 */

export type NewTable = Omit<Table, 'id' | 'created_at' | 'upvotes' | 'comments'>

