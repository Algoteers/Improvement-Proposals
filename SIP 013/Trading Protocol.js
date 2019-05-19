tradingSystem = {
  id: '',
  parameters: {
    switchOff: {
      lossPercentage: 50,
      profitPercentage: 100
    }
  },
  strategies: [
    {
      name: '',
      isActive: true || false,
      filters: {
        type: 'Filters',
        subType: 'Strategy Filters',
        exchanges: [],
        market: 'assetA/assetB',
        baseAsset: ''
      },
      triggerStage: {
        type: 'Stage',
        subType: 'Trigger',
        triggerOnEvent: {
          type: 'Event',
          subType: 'Trigger On Event',
          situations: [
            {
              name: '',
              type: 'Situation',
              conditions: [
                {
                  name: '',
                  type: 'Condition',
                  code: {
                    type: 'Code',
                    subType: 'Condition Code',
                    code: '<valid JavaScript code that evaluates to either true or false>'
                  }
                }
              ]
            }
          ]
        },
        sizeDefinition: {
          tradeSize: 0
        },
        capitalRequest: {},
        capitalAllocation: {},
        takePositionEvent: {
          type: 'Event',
          subType: 'Take Position Event',
          situations: [
            {
              name: '',
              type: 'Situation',
              conditions: [
                {
                  name: '',
                  type: 'Condition',
                  code: {
                    type: 'Code',
                    subType: 'Condition Code',
                    code: '<valid JavaScript code that evaluates to either true or false>'
                  }
                }
              ]
            }
          ]
        },
        triggerOffEvent: {
          type: 'Event',
          subType: 'Trigger Off Event',
          situations: [
            {
              name: '',
              type: 'Situation',
              conditions: [
                {
                  name: '',
                  type: 'Condition',
                  code: {
                    type: 'Code',
                    subType: 'Condition Code',
                    code: '<valid JavaScript code that evaluates to either true or false>'
                  }
                }
              ]
            }
          ]
        }
      },
      openStage: {
        type: 'Stage',
        subType: 'Open',
        initialDefinition: {
          initialStopLoss: {
            type: 'Initial Definition',
            subType: 'Initial Stop Loss',
            formula: {
              code: '<valid JavaScript code that evaluates to a number>'
            },
            firstPhaseEvent: {
              type: 'Event',
              subType: 'First Phase Event',
              situations: [
                {
                  name: '',
                  type: 'Situation',
                  conditions: [
                    {
                      name: '',
                      type: 'Condition',
                      code: {
                        type: 'Code',
                        subType: 'Condition Code',
                        code: '<valid JavaScript code that evaluates to either true or false>'
                      }
                    }
                  ]
                }
              ]
            }
          },
          initialTakeProfit: {
            type: 'Initial Definition',
            subType: 'Initial Take Profit',
            formula: {
              type: 'Formula',
              subType: 'Take Profit Formula',
              code: '<valid JavaScript code that evaluates to a number>'
            },
            firstPhaseEvent: {
              type: 'Event',
              subType: 'First Phase Event',
              situations: [
                {
                  name: '',
                  type: 'Situation',
                  conditions: [
                    {
                      name: '',
                      type: 'Condition',
                      code: {
                        type: 'Code',
                        subType: 'Condition Code',
                        code: '<valid JavaScript code that evaluates to either true or false>'
                      }
                    }
                  ]
                }
              ]
            }
          },
          openingExecution: {}
        }
      },
      manageStage: {
        type: 'Stage',
        subType: 'Manage',
        stopLoss: {
          type: 'Managed Item',
          subType: 'Stop Loss',
          phases: [
            {
              type: 'Phase',
              subType: 'Stop Loss Phase',
              name: '',
              formula: {
                type: 'Formula',
                subType: 'Stop Loss Formula',
                code: '<valid JavaScript code that evaluates to a number>'
              },
              nextPhaseEvent: {
                type: 'Event',
                subType: 'Next Phase Event',
                situations: [
                  {
                    name: '',
                    type: 'Situation',
                    conditions: [
                      {
                        name: '',
                        type: 'Condition',
                        code: {
                          type: 'Code',
                          subType: 'Condition Code',
                          code: '<valid JavaScript code that evaluates to either true or false>'
                        }
                      }
                    ]
                  }
                ]
              }
            }
          ]
        },
        takeProfit: {
          type: 'Managed Item',
          subType: 'Take Profit',
          phases: [
            {
              name: '',
              type: 'Phase',
              subType: 'Take Profit Phase',
              formula: {
                type: 'Formula',
                subType: 'Take Profit Formula',
                code: '<valid JavaScript code that evaluates to a number>'
              },
              nextPhaseEvent: {
                type: 'Event',
                subType: 'Next Phase Event',
                situations: [
                  {
                    name: '',
                    type: 'Situation',
                    conditions: [
                      {
                        name: '',
                        type: 'Condition',
                        code: {
                          type: 'Code',
                          subType: 'Condition Code',
                          code: '<valid JavaScript code that evaluates to either true or false>'
                        }
                      }
                    ]
                  }
                ]
              }
            }
          ]
        }
      },
      closeStage: {
        type: 'Stage',
        subType: 'Close'
      }
    }
  ]
}
