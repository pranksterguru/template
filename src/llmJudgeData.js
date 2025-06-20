const llmJudgeData = {
  "result": [
    {
      "overall": {
        "overallname": "Over all evaluation metrix",
        "elements": [
          {
            "type": "cards",
            "columns": 4,
            "cards": [
              { "name": "HELPFULNESS", "score": 4, "colour": "green","size":"small"  },
              { "name": "COMPLETENESS", "score": 4, "colour": "red","size":"medium"  },
            { "name": "MISC", "score": 4, "colour": "amber","size":"large"  },

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
          "colour": "red",
          "elements": [

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
          "colour": "blue",
          "elements": [

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
