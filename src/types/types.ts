export interface Table {
    id: number
    created_at: string
    title: string
    upvotes: number
    context: string
    image_url?: string
    comments: string[]
    category: string
}