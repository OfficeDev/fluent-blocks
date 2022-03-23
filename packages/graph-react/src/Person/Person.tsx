export type PersonProps = {
  query: string
}

export const Person = ({ query }: PersonProps) => <div>{query}</div>
