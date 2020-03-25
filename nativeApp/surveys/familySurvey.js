export const familySurvey = [
  {
    questionType: 'Info',
    questionText: 'Welcome! to get started press next.'
  },
  {
    questionType: 'NumericInput',
    questionText: 'Enter the Family ID',
    questionId: 'family_id'
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
        value: 'Yes'
      },
      {
        optionText: 'No',
        value: 'No'
      }
    ]
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
        value: 'Yes'
      },
      {
        optionText: 'No',
        value: 'No'
      }
    ]
  },
  {
    questionType: 'SelectionGroup',
    questionText: 'Is it a family led by children?\n(without adults)',
    questionId: 'led_by_children',
    questionSettings: {
      autoAdvance: true,
    },
    options: [
      {
        optionText: 'Yes',
        value: 'Yes'
      },
      {
        optionText: 'No',
        value: 'No'
      }
    ]
  },
  {
    questionType: 'NumericInput',
    questionText: 'Number of births since last survey or in last 6 months\n\n(If 1st survey) ',
    questionId: 'number_of_births'
  },
  {
    questionType: 'NumericInput',
    questionText: 'Number of deaths since last survey or in last 6 months\n\n(If 1st survey) ',
    questionId: 'number_of_deaths'
  },
  {
    questionType: 'NumericInput',
    questionText: 'Total number of persons that live in the house',
    questionId: 'number_of_people'
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
        value: 'Yes'
      },
      {
        optionText: 'No',
        value: 'No'
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
        value: 'Yes'
      },
      {
        optionText: 'No',
        value: 'No'
      }
    ]
  },
  {
    questionType: 'SelectionGroup',
    questionText: 'Does the house have a safe/secure door?',
    questionId: 'safe_door',
    questionSettings: {
      autoAdvance: true,
    },
    options: [
      {
        optionText: 'Yes',
        value: 'Yes'
      },
      {
        optionText: 'No',
        value: 'No'
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
        value: 'Yes'
      },
      {
        optionText: 'No',
        value: 'No'
      }
    ]
  },
  {
    questionType: 'SelectionGroup',
    questionText: 'Does the family have a latrine?',
    questionId: 'has_latrine',
    questionSettings: {
      autoAdvance: true,
    },
    options: [
      {
        optionText: 'Yes',
        value: 'Yes'
      },
      {
        optionText: 'No',
        value: 'No'
      }
    ]
  },
  {
    questionType: 'SelectionGroup',
    questionText: 'Does the family have a bathhouse?',
    questionId: 'has_bathhouse',
    questionSettings: {
      autoAdvance: true,
    },
    options: [
      {
        optionText: 'Yes',
        value: 'Yes'
      },
      {
        optionText: 'No',
        value: 'No'
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
        value: 'Yes'
      },
      {
        optionText: 'No',
        value: 'No'
      }
    ]
  },
  {
    questionType: 'SelectionGroup',
    questionText: 'Does the family burn or bury all trash?',
    questionId: 'trash_disposal',
    questionSettings: {
      autoAdvance: true,
    },
    options: [
      {
        optionText: 'Yes',
        value: 'Yes'
      },
      {
        optionText: 'No',
        value: 'No'
      }
    ]
  },
  {
    questionType: 'SelectionGroup',
    questionText: 'Does the house have some type of pest\n\n(cockroaches, mice, worms)?',
    questionId: 'has_pests',
    questionSettings: {
      autoAdvance: true,
    },
    options: [
      {
        optionText: 'Yes',
        value: 'Yes'
      },
      {
        optionText: 'No',
        value: 'No'
      }
    ]
  },
  {
    questionType: 'SelectionGroup',
    questionText: 'Does the family have a table for cookery?',
    questionId: 'has_cookery_table',
    questionSettings: {
      autoAdvance: true,
    },
    options: [
      {
        optionText: 'Yes',
        value: 'Yes'
      },
      {
        optionText: 'No',
        value: 'No'
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
        value: 'Yes'
      },
      {
        optionText: 'No',
        value: 'No'
      }
    ]
  },
  {
    questionType: 'SelectionGroup',
    questionText: 'Does the house have a kitchen?',
    questionId: 'has_kitchen',
    questionSettings: {
      autoAdvance: true,
    },
    options: [
      {
        optionText: 'Yes',
        value: 'Yes'
      },
      {
        optionText: 'No',
        value: 'No'
      }
    ]
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
        value: 'Yes'
      },
      {
        optionText: 'No',
        value: 'No'
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
        value: 'Yes'
      },
      {
        optionText: 'No',
        value: 'No'
      }
    ]
  },
  {
    questionType: 'SelectionGroup',
    questionText: 'Did at least one meal everyday have vegetable or egg or fish or peanuts or meat?',
    questionId: 'one_healthy_meal',
    questionSettings: {
      autoAdvance: true,
    },
    options: [
      {
        optionText: 'Yes',
        value: 'Yes'
      },
      {
        optionText: 'No',
        value: 'No'
      }
    ]
  },
  {
    questionType: 'SelectionGroup',
    questionText: 'Did the family harvest from the farm field last planting season?',
    questionId: 'did_harvest_farm',
    questionSettings: {
      autoAdvance: true,
    },
    options: [
      {
        optionText: 'Yes',
        value: 'Yes'
      },
      {
        optionText: 'No',
        value: 'No'
      }
    ]
  },
  {
    questionType: 'SelectionGroup',
    questionText: 'Did the family harvest from the family garden last planting season?',
    questionId: 'did_harvest_garden',
    questionSettings: {
      autoAdvance: true,
    },
    options: [
      {
        optionText: 'Yes',
        value: 'Yes'
      },
      {
        optionText: 'No',
        value: 'No'
      }
    ]
  },
  {
    questionType: 'SelectionGroup',
    questionText: 'If the family has a garden, what is the main produce?\n\n(mark just one answer)',
    questionId: 'garden_main_produce',
    options: [
      {
        optionText: 'Lettuce',
        value: 'Lettuce'
      },
      {
        optionText: 'Tomatoes',
        value: 'Tomatoes'
      },
      {
        optionText: 'Kale',
        value: 'Kale'
      },
      {
        optionText: 'Beans',
        value: 'Beans'
      },
      {
        optionText: 'Onions',
        value: 'Onions'
      },
      {
        optionText: 'Peppers',
        value: 'Peppers'
      },
      {
        optionText: 'Cucumbers',
        value: 'Cucumbers'
      },
      {
        optionText: 'Other',
        value: 'Other'
      },
    ]
  },
  {
    questionType: 'SelectionGroup',
    questionText: 'Identify the family\'s main difficulty to having a garden.\n\n(mark just one answer)',
    questionId: 'garden_difficulty',
    options: [
      {
        optionText: 'Space',
        value: 'Space'
      },
      {
        optionText: 'Training',
        value: 'Training'
      },
      {
        optionText: 'Additives',
        value: 'Additives'
      },
      {
        optionText: 'Equipment/Seed',
        value: 'Equipment/Seed'
      },
      {
        optionText: 'Other',
        value: 'Other'
      },
    ]
  },
  {
    questionType: 'SelectionGroup',
    questionText: 'If the family has a farm field, what is the main produce?\n\n(mark just one answer)',
    questionId: 'farm_main_produce',
    options: [
      {
        optionText: 'No farm',
        value: 'No farm'
      },
      {
        optionText: 'Rice',
        value: 'Rice'
      },
      {
        optionText: 'Sweet Potato',
        value: 'Sweet Potato'
      },
      {
        optionText: 'Corn',
        value: 'Corn'
      },
      {
        optionText: 'Cassava',
        value: 'Cassava'
      },
      {
        optionText: 'Other',
        value: 'Other'
      },
    ]
  },
  {
    questionType: 'SelectionGroup',
    questionText: 'If the family has a garden/farm field, what is the destination of the produce?\n\n(mark just one answer)',
    questionId: 'farm_produce_destination',
    options: [
      {
        optionText: 'Don\'t Have',
        value: 'Don\'t Have'
      },
      {
        optionText: 'Consumption',
        value: 'Consumption'
      },
      {
        optionText: 'Sale',
        value: 'Sale'
      },
      {
        optionText: 'Both',
        value: 'Both'
      }
    ]
  },
  {
    questionType: 'SelectionGroup',
    questionText: 'If the family raises animals, what is the purpose?\n\n(mark just one answer)',
    questionId: 'raised_animal_purpose',
    options: [
      {
        optionText: 'Don\'t Have',
        value: 'Don\'t Have'
      },
      {
        optionText: 'Consumption',
        value: 'Consumption'
      },
      {
        optionText: 'Sale',
        value: 'Sale'
      },
      {
        optionText: 'Both',
        value: 'Both'
      }
    ]
  },
  {
    questionType: 'SelectionGroup',
    questionText: 'Where does the family get water\n\n(mark just one answer)',
    questionId: 'water_source',
    options: [
      {
        optionText: 'Well',
        value: 'Well'
      },
      {
        optionText: 'River',
        value: 'River'
      },
      {
        optionText: 'Tap',
        value: 'Tap'
      },
      {
        optionText: 'Spring',
        value: 'Spring'
      },
      {
        optionText: 'Other',
        value: 'Other'
      }
    ]
  },
  {
    questionType: 'SelectionGroup',
    questionText: 'How does the family treat drinking water?\n\n(mark just one answer)',
    questionId: 'water_treatment',
    options: [
      {
        optionText: 'Nothing',
        value: 'Nothing'
      },
      {
        optionText: 'Chlorine',
        value: 'Chlorine'
      },
      {
        optionText: 'Boil',
        value: 'Boil'
      },
      {
        optionText: 'Filter',
        value: 'Filter'
      }
    ]
  },
  {
    questionType: 'SelectionGroup',
    questionText: 'Have there been cases of physical violence in the family?',
    questionId: 'family_violence',
    questionSettings: {
      autoAdvance: true,
    },
    options: [
      {
        optionText: 'Yes',
        value: 'Yes'
      },
      {
        optionText: 'No',
        value: 'No'
      }
    ]
  },
  {
    questionType: 'SelectionGroup',
    questionText: 'Does any member of the family drink?',
    questionId: 'alcohol_drinking',
    questionSettings: {
      autoAdvance: true,
    },
    options: [
      {
        optionText: 'Yes',
        value: 'Yes'
      },
      {
        optionText: 'No',
        value: 'No'
      }
    ]
  },
  {
    questionType: 'SelectionGroup',
    questionText: 'Is the family active in any religious denomination?',
    questionId: 'is_religious',
    questionSettings: {
      autoAdvance: true,
    },
    options: [
      {
        optionText: 'Yes',
        value: 'Yes'
      },
      {
        optionText: 'No',
        value: 'No'
      }
    ]
  },
]
