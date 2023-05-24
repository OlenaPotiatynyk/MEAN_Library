export interface DocumentCard {
  name: string,
  description: string,
  owner: string,
  id: string,
  comments: [
    {
      name: string,
      text: string
    }
  ]
}
