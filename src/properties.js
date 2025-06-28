const properties = {
  api_login: 'http:somelogin',
  api_evaluate: 'http:somelogin',
  metricData: [
    {
      name: 'Factual Accuracy',
      source_range: '0-100',
      evaluation_components: {'componentss1':'components2','componentss2':'components2'},
      task:'this is task',
      description: 'description of Factual Accuracy',
      thresholds: { red: 30, amber: 70, green: 100 }
    },
    {
      name: 'Completeness',
        source_range: '0-100',
      evaluation_components: {'componentss1':'components2','componentss2':'components2'},
      task:'this is task',
      description: 'description of Factual Accuracy',
      thresholds: { red: 30, amber: 70, green: 100 }
    },
    {
      name: 'Awareness',
            source_range: '0-100',
      evaluation_components: {'componentss1':'components2','componentss2':'components2'},
      task:'this is task',
      description: 'description of Factual Accuracy',
      thresholds: { red: 30, amber: 70, green: 100 }
    },
    
  ]
};

export default properties;