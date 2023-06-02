export interface DocumentCard {
  name: string,
  description: string,
  owner: string,
  id: string,
  comments: [
    {
      author: string,
      content: string
    }
  ],
  evaluation: number
}
