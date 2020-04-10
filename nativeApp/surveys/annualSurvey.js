export const annualSurvey = [
  {
    questionType: 'Info',
    questionText: 'Welcome! To get started press next.',
    questionId: 'section'
  },
  {
    questionType: 'TextInput',
    questionText: 'Community:',
    questionId: 'community'
  },
  {
    questionType: 'TextInput',
    questionText: 'Date:',
    questionId: 'date'
  },
  {
    questionType: 'TextInput',
    questionText: 'Field Officer:',
    questionId: 'field_officer'
  },
  {
    questionType: 'TextInput',
    questionText: 'Family Name',
    questionId: 'family_name'
  },
  {
    questionType: 'TextInput',
    questionText: 'Zone:',
    questionId: 'zone'
  },
  {
    questionType: 'Info',
    questionText: 'New Section: Family Profile',
    questionId: 'section'
  },
  {
    questionType: 'SelectionGroup',
    questionText: 'Is it a family of orphans?',
    questionId: 'orphans',
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
    questionText: 'If yes, how many orphans live in the home?',
    questionId: 'number_of_orphans'
  },
  {
    questionType: 'SelectionGroup',
    questionText: 'Is it a family with vulnerable children?',
    questionId: 'vulnerable_children',
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
    questionText: 'Is the head of household a child (no adults)?',
    questionId: 'head_of_house_child',
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
    questionType: 'NumericInput',
    questionText: 'Number of deaths of adults over 18 years since the last survey or within the last 12 months?',
    questionId: 'number_of_deaths_adults'
  },
  {
    questionType: 'NumericInput',
    questionText: 'Number of births since the last survey or within the last 12 months?',
    questionId: 'number_of_births'
  },
  {
    questionType: 'NumericInput',
    questionText: 'Number of infant deaths since the last survey or within the last 12 months?',
    questionId: 'number_of_infant_deaths'
  },
  {
    questionType: 'NumericInput',
    questionText: 'Number of deaths of Children between 1-4 years of age?',
    questionId: 'number_of_children_1_to_4'
  },
  {
    questionType: 'NumericInput',
    questionText: 'Number of deaths of Children older than 5?',
    questionId: 'number_of_deaths_over_5yrs'
  },
  {
    questionType: 'SelectionGroup',
    questionText: 'Did the mother’s death happen during or as a result childbirth? ',
    questionId: 'mother_died_childbirth',
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
    questionText: 'If yes, did it happen within 42 days of labor?',
    questionId: 'mother_death_within_42_days',
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
    questionType: 'Info',
    questionText: 'New Section: \n\n Housing Improvement and Sanitation',
    questionId: 'section'
  },
  {
    questionType: 'SelectionGroup',
    questionText: 'Does the house have electricity?',
    questionId: 'electricity_in_home',
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
    questionText: 'Does the roof need repair?',
    questionId: 'roof_needs_repair',
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
    questionText: 'Do the walls need repair?',
    questionId: 'walls_needs_repair',
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
    questionText: 'Does the house have a secure door?',
    questionId: 'safe_door',
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
    questionText: 'Does the floor have cement or other covering?',
    questionId: 'floor_covered',
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
    questionText: 'Does the family have an improved latrine?',
    questionId: 'has_improved_latrine',
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
    questionText: 'Does the family have a bathroom?',
    questionId: 'has_bathroom',
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
    questionText: 'Is the yard clean?',
    questionId: 'clean_yard',
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
    questionText: 'Does the family burn or bury all garbage?',
    questionId: 'garbage_disposal',
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
    questionText: 'Does the home have some kind of plague \n\n(cockroaches, rats, worms, etc)?',
    questionId: 'has_plagues',
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
    questionText: 'Does the family have a tarimba?',
    questionId: 'has_tarimba',
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
    questionText: 'Is the yard free of stagnant water?',
    questionId: 'has_stagnant_water',
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
    questionText: 'Does the home have a kitchen?',
    questionId: 'has_kitchen',
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
    questionText: 'Is inside the home clean?',
    questionId: 'clean_home',
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
    questionType: 'Info',
    questionText: 'New Section: Income Generation',
    questionId: 'section'
  },
  {
    questionType: 'SelectionGroup',
    questionText: 'Does the family have a small business?',
    questionId: 'has_small_business',
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
    questionText: 'Does family have income generation activity?',
    questionId: 'has_income',
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
    questionText: 'Does the family participate in saving, agriculture, credit association (microcredit)?',
    questionId: 'has_savings',
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
    questionType: 'Info',
    questionText: 'New Section: Food Security and Nutrition',
    questionId: 'section'
  },
  {
    questionType: 'SelectionGroup',
    questionText: 'At least one meal everyday have vegetable or eggs or fish or meat?',
    questionId: 'one_healthy_meal',
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
    questionText: 'Has the family harvested some product from the garden in the last planting season?',
    questionId: 'did_harvest_farm',
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
    questionText: 'Does the family have a vegetable garden or did they harvest any produce from the last planting season?',
    questionId: 'did_harvest_garden',
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
    questionText: 'How does the family treat drinking water? \n\n (Doesn’t treat, chlorine, boil, filter, other)',
    questionId: 'drinking_water_treatment'
  },
  {
    questionType: 'TextInput',
    questionText: 'Where does the family get their water? \n\n (Faucet, well, fountain, community cistern, river, other)',
    questionId: 'drinking_water_source'
  },
  {
    questionType: 'Info',
    questionText:'New Section: Psycho-Social-Spiritual',
    questionId: 'section'
  },
  {
    questionType: 'SelectionGroup',
    questionText: 'Have there been any cases of physical violence within the family?',
    questionId: 'physical_violence',
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
    questionText: 'Are there people in the family who drink alcohol without moderation?',
    questionId: 'alcohol_abuse',
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
    questionText: 'How do you think your family\'s life will be next year? \n\n(Worse, the same, better)',
    questionId: 'family_life_opinion',
  },
  {
    questionType: 'TextInput',
    questionText: 'How do you think your community\'s life will be next year? \n\n(Worse, the same, better)',
    questionId: 'community_life_opinion',
  }
]