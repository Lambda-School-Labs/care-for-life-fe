export const personSurvey = [
  {
    questionType: 'Info',
    questionText: 'Welcome! to get started press next.'
  },
  {
    questionType: 'TextInput',
    questionText: 'What is the person\'s name?',
    questionId: 'person_name'
  },
  {
    questionType: 'NumericInput',
    questionText: 'What is the person\'s age?',
    questionId: 'person_age'
  },
  {
    questionType: 'SelectionGroup',
    questionText: 'What is the person\'s gender?',
    questionId: 'person_gender',
    questionSettings: {
      autoAdvance: true,
    },
    options: [
      {
        optionText: 'Male',
        value: 'Male'
      },
      {
        optionText: 'Female',
        value: 'Female'
      }
    ]
  },
  {
    questionType: 'TextInput',
    questionText: 'What is the person\'s relationship to the head of the house?',
    questionId: 'household_relationship'
  },
  {
    questionType: 'TextInput',
    questionText: 'What is the person\'s marital status?',
    questionId: 'marital_status'
  },
  {
    questionType: 'SelectionGroup',
    questionText: 'Does he/she wash hands after using the latrine?',
    questionId: 'washes_hands_bathroom',
    questionSettings: {
      autoAdvance: true,
    },
    options: [
      {
        optionText: 'Yes',
        value: 'true'
      },
      {
        optionText: 'No',
        value: 'false'
      }
    ]
  },
  {
    questionType: 'SelectionGroup',
    questionText: 'Does he/she wash hands before eating food?',
    questionId: 'washes_hands_eating',
    questionSettings: {
      autoAdvance: true,
    },
    options: [
      {
        optionText: 'Yes',
        value: 'true'
      },
      {
        optionText: 'No',
        value: 'false'
      }
    ]
  },
  {
    questionType: 'SelectionGroup',
    questionText: 'Does he/she wear shoes, sandales, or any type of shoes regularly?',
    questionId: 'footwear_type',
    questionSettings: {
      autoAdvance: true,
    },
    options: [
      {
        optionText: 'Yes',
        value: 'true'
      },
      {
        optionText: 'No',
        value: 'false'
      }
    ]
  },
  {
    questionType: 'SelectionGroup',
    questionText: 'Does he/she brush their teeth at least once a day?',
    questionId: 'brush_teeth',
    questionSettings: {
      autoAdvance: true,
    },
    options: [
      {
        optionText: 'Yes',
        value: 'true'
      },
      {
        optionText: 'No',
        value: 'false'
      }
    ]
  },
  {
    questionType: 'SelectionGroup',
    questionText: 'Does he/she sleep under a mosquito net?',
    questionId: 'mosquito_net',
    questionSettings: {
      autoAdvance: true,
    },
    options: [
      {
        optionText: 'Yes',
        value: 'true'
      },
      {
        optionText: 'No',
        value: 'false'
      }
    ]
  },
  {
    questionType: 'SelectionGroup',
    questionText: 'Does he/she eat three or more meals a day?',
    questionId: 'eats_three_meals',
    questionSettings: {
      autoAdvance: true,
    },
    options: [
      {
        optionText: 'Yes',
        value: 'true'
      },
      {
        optionText: 'No',
        value: 'false'
      }
    ]
  },
  {
    questionType: 'SelectionGroup',
    questionText: 'Is he/she registered with the government?',
    questionId: 'government_registered',
    questionSettings: {
      autoAdvance: true,
    },
    options: [
      {
        optionText: 'Yes',
        value: 'true'
      },
      {
        optionText: 'No',
        value: 'false'
      }
    ]
  },
  {
    questionType: 'SelectionGroup',
    questionText: 'Has this person been HIV/AIDS tested in the past year?',
    questionId: 'HIV_AIDS_tested',
    questionSettings: {
      autoAdvance: true,
    },
    options: [
      {
        optionText: 'Yes',
        value: 'true'
      },
      {
        optionText: 'No',
        value: 'false'
      }
    ]
  },
  {
    questionType: 'SelectionGroup',
    questionText: 'Does this person (between 6-17 years old) attend school?',
    questionId: 'school_status',
    questionSettings: {
      autoAdvance: true,
    },
    options: [
      {
        optionText: 'Yes',
        value: 'true'
      },
      {
        optionText: 'No',
        value: 'false'
      }
    ]
  },
  {
    questionType: 'SelectionGroup',
    questionText: 'Is this person (over 18 years old) employed?',
    questionId: 'employment_status',
    questionSettings: {
      autoAdvance: true,
    },
    options: [
      {
        optionText: 'Yes',
        value: 'true'
      },
      {
        optionText: 'No',
        value: 'false'
      }
    ]
  },
  {
    questionType: 'SelectionGroup',
    questionText: 'If this person is older than 15 years old, are they literate?',
    questionId: 'literacy_status',
    questionSettings: {
      autoAdvance: true,
    },
    options: [
      {
        optionText: 'Yes',
        value: 'true'
      },
      {
        optionText: 'No',
        value: 'false'
      }
    ]
  },
  {
    questionType: 'SelectionGroup',
    questionText: 'Is this person pregnant?',
    questionId: 'pregnancy_status',
    questionSettings: {
      autoAdvance: true,
    },
    options: [
      {
        optionText: 'Yes',
        value: 'true'
      },
      {
        optionText: 'No',
        value: 'false'
      }
    ]
  },
  {
    questionType: 'SelectionGroup',
    questionText: 'If yes, is this person doing prenatal care?',
    questionId: 'prenatal_care_status',
    questionSettings: {
      autoAdvance: true,
    },
    options: [
      {
        optionText: 'Yes',
        value: 'true'
      },
      {
        optionText: 'No',
        value: 'false'
      }
    ]
  },
  {
    questionType: 'SelectionGroup',
    questionText: 'Has this person been sick within the last month?',
    questionId: 'sick_within_last_month',
    questionSettings: {
      autoAdvance: true,
    },
    options: [
      {
        optionText: 'Yes',
        value: 'true'
      },
      {
        optionText: 'No',
        value: 'false'
      }
    ]
  },
  {
    questionType: 'TextInput',
    questionText: 'If yes, what are their symptoms?',
    questionId: 'sickness_symptoms',
  }
]