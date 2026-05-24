export interface PostMeta {
  slug: string
  title: string
  date: string
  description: string
  tags: string[]
  readingTime: string
}

export interface Post extends PostMeta {
  content: string
}
