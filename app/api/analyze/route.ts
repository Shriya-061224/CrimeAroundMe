export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { incident_description } = body

    // In a real app, this would call Google Gemini API
    // For now, return mock analysis
    const analysis = {
      incident_type: "theft",
      severity: "medium",
      location_confidence: 0.85,
      duplicate_match: null,
      summary: `A ${body.incident_description || "theft"} incident has been reported and categorized.`,
      confidence_score: 0.78,
    }

    return Response.json(analysis)
  } catch (error) {
    return Response.json({ error: "Failed to analyze incident" }, { status: 500 })
  }
}
