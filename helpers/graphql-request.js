export default async function gql(query) {
  return await fetch(process.env.API_ENDPOINT, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(query)
  }).then(payload => payload.json())
}
