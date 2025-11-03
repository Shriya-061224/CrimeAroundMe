export async function GET(request: Request) {
  try {
    // In a real app, this would fetch from news API using the key:
    // pub_d9320fec0e9b4058922962ee89a19c84
    const mockNews = [
      {
        id: "1",
        title: "Police Arrest Gang Behind Series of Thefts",
        description: "Local police have arrested 5 members of a theft gang operating in the city.",
        date: new Date().toISOString(),
        source: "Local News",
      },
      {
        id: "2",
        title: "Traffic Police Launch Safety Campaign",
        description: "New initiative to improve road safety in city areas.",
        date: new Date().toISOString(),
        source: "Police Department",
      },
    ]

    return Response.json(mockNews)
  } catch (error) {
    return Response.json({ error: "Failed to fetch news" }, { status: 500 })
  }
}
