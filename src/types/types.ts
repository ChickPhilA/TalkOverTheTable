export interface Table {
    id: number
    title: string
    upvotes: number
    context: string
    image_url?: string
    comments: string[]
    category: string
}