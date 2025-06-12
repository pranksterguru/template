const llmJudgeData = {
  "result": [
    {
      "overall": {
        "overallname": "over all evaluation metrix",
        "elements": [
          {
            "type": "cards",
            "columns": 4,
            "cards": [
              { "name": "helpfulness", "score": 4 },
              { "name": "completeness", "score": 4 }
            ]
          },
          {
            "type": "table",
            "columns": 2,
            "headers": ["Metric", "Score"],
            "rows": [
              ["helpfulness", 4],
              ["completeness", 4]
            ]
          }
        ]
      },
      "details": [
        {
          "id": "1",
          "name": "Test 1",
          "model": "gpt-4",
          "color": "red",
          "elements": [
            {
              "type": "cards",
              "columns": 4,
              "cards": [
                { "name": "helpfulness", "score": 4 },
                { "name": "completeness", "score": 4 }
              ]
            },
            {
              "type": "table",
              "columns": 2,
              "headers": ["Metric", "Score"],
              "rows": [
                ["helpfulness", 4],
                ["completeness", 4]
              ]
            }
          ]
        },
        {
          "id": "2",
          "name": "Test 2",
          "model": "llama-3",
          "color": "blue",
          "elements": [
            {
              "type": "cards",
              "columns": 4,
              "cards": [
                { "name": "helpfulness", "score": 3 },
                { "name": "completeness", "score": 5 }
              ]
            },
            {
              "type": "table",
              "columns": 2,
              "headers": ["Metric", "Score"],
              "rows": [
                ["helpfulness", 3],
                ["completeness", 5]
              ]
            }
          ]
        }
      ]
    }
  ]
};

export default llmJudgeData;
