export type QuizLeadPayload = {
  lead: {
    name: string
    email: string
    phone?: string
    nationality: string
  }
  answers: Record<string, string | string[]>
  source: 'homepage' | 'quiz-page'
}

/** Fire-and-forget to Airtable via /api/leads; does not block the UI. */
export function submitQuizLead(payload: QuizLeadPayload): void {
  void fetch('/api/leads', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  }).then(async (res) => {
    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      console.error('Lead submit failed', res.status, err)
    }
  })
}
