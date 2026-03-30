export const quizQuestions = [
  {
    id: 'purpose',
    step: 1,
    question: 'What brings you to Madrid?',
    options: [
      { value: 'study', label: 'Study', icon: '📚' },
      { value: 'work', label: 'Work', icon: '💼' },
      { value: 'travel', label: 'Travel', icon: '✈️' },
      { value: 'living', label: 'Living here', icon: '🏡' },
    ],
    type: 'single',
  },
  {
    id: 'duration',
    step: 2,
    question: 'How long have you been here?',
    options: [
      { value: 'just-arrived', label: 'Just arrived', icon: '🆕' },
      { value: '1-6-months', label: '1-6 months', icon: '🌱' },
      { value: '6-12-months', label: '6-12 months', icon: '🌿' },
      { value: '1-plus-years', label: '1+ years', icon: '🌳' },
    ],
    type: 'single',
  },
  {
    id: 'interests',
    step: 3,
    question: 'What kind of events sound most like you?',
    subtitle: 'Select all that apply',
    options: [
      { value: 'wellness', label: 'Wellness', icon: '🧘‍♀️' },
      { value: 'social', label: 'Social', icon: '🎉' },
      { value: 'adventure', label: 'Adventure', icon: '🏔️' },
      { value: 'creative', label: 'Creative', icon: '🎨' },
      { value: 'nightlife', label: 'Nightlife', icon: '🌙' },
    ],
    type: 'multi',
  },
  {
    id: 'availability',
    step: 4,
    question: 'When are you usually free?',
    options: [
      { value: 'weekday-mornings', label: 'Weekday mornings', icon: '🌅' },
      { value: 'weekday-evenings', label: 'Weekday evenings', icon: '🌆' },
      { value: 'weekends', label: 'Weekends', icon: '🎈' },
      { value: 'flexible', label: 'Flexible', icon: '✨' },
    ],
    type: 'single',
  },
  {
    id: 'group-size',
    step: 5,
    question: "What's your ideal group size?",
    options: [
      { value: 'small', label: 'Small & intimate', subtitle: '4-6 people', icon: '👯‍♀️' },
      { value: 'medium', label: 'Medium', subtitle: '8-12 people', icon: '👭' },
      { value: 'large', label: 'Big energy', subtitle: '15+ people', icon: '🎊' },
    ],
    type: 'single',
  },
]
