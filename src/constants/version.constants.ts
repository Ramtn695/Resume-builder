// Application version management
export const APP_VERSION = '1.1.1';

// Version history for changelog
export const VERSION_HISTORY = [
  {
    version: '1.1.1',
    date: '2026-05-25',
    type: 'patch',
    changes: [
      'Removed postal code fields from education and experience forms',
      'Fixed default select values to show "Please select {{label}}" with null value',
      'Created story.md governance document',
      'Added story.md to .gitignore',
      'Fixed duplicate headings in README.md',
      'Updated text-select component for proper default placeholder handling'
    ]
  },
  {
    version: '1.1.0',
    date: '2026-05-25',
    type: 'minor',
    changes: [
      'Integrated country-state-city package for location data',
      'Fixed fieldMajor population when programName is selected',
      'Improved form component architecture for location management',
      'Added LocationService for dynamic country/state/city loading'
    ]
  },
  {
    version: '1.0.0',
    date: '2026-05-25',
    type: 'major',
    changes: [
      'Initial stable release',
      'Dynamic resume form with multiple education and employment sections',
      'Expanded course specializations for Indian education system',
      'Professional UI with Material Design',
      'Footer with version display'
    ]
  }
];
