import { quizQuestions } from '@/data/quiz-questions'

function labelFor(questionId: string, value: string): string {
  const q = quizQuestions.find((x) => x.id === questionId)
  const opt = q?.options.find((o) => o.value === value)
  return opt?.label ?? value
}

/**
 * Maps quiz `answers` + lead info to your Leads table.
 * Overlapping columns: purpose, availability, groupSize (labels match current quiz).
 * Other steps (social-life, age, ideal-night) live only in `quizAnswersJSON` unless you add columns.
 */
export function buildAirtableLeadFields(
  lead: { name: string; email: string; phone?: string; nationality: string },
  answers: Record<string, string | string[]>,
  source: string
): Record<string, string | string[]> {
  const purpose = answers.purpose
  const availability = answers.availability
  const groupSizeKey = answers['group-size']

  const fields: Record<string, string | string[]> = {
    name: lead.name.trim(),
    email: lead.email.trim(),
    nationality: lead.nationality.trim(),
    source,
    status: 'New',
    quizAnswersJSON: JSON.stringify(answers),
  }

  if (lead.phone?.trim()) {
    fields.phone = lead.phone.trim()
  }

  if (typeof purpose === 'string') {
    fields.purpose = labelFor('purpose', purpose)
  }
  if (typeof availability === 'string') {
    fields.availability = labelFor('availability', availability)
  }
  if (typeof groupSizeKey === 'string') {
    fields.groupSize = labelFor('group-size', groupSizeKey)
  }

  fields.submittedAt = new Date().toISOString()

  return fields
}
