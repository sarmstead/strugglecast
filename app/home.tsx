import gql from '@helpers/graphql-request'

interface Podcast {
  postId: string,
  podcastFields: {
    podcastFile: { mediaItemUrl: string },
    podcastSummary: string
  },
  title: string
}

export default async function Page() {
  const query = {
    query: `query getAllPosts {
      posts {
        nodes {
          postId
          podcastFields {
            podcastSummary
            podcastFile {
              mediaItemUrl
            }
          }
          date
          title
        }
      }
    }`
  }
  const payload = await gql(query)
  const podcasts = payload.data.posts.nodes

  const podcastList = podcasts.map((podcast: Podcast) => {
    const href = podcast.podcastFields.podcastFile.mediaItemUrl
    const summary = podcast.podcastFields.podcastSummary

    return (
      <article key={podcast.postId}>
        <h2>{podcast.title}</h2>
        <p>{summary}</p>
        <button>
          <a href={href} target="_blank">Listen Now</a>
        </button>
      </article>
    )
  })

  return (
    <main>
      <h1>More great episodes</h1>
      {podcastList}
    </main>
  )
}
