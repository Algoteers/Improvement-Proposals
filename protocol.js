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
        exchanges: [],
        market: 'assetA/assetB',
        baseAsset: ''
      },
      preOpeningStage: {
        type: 'Stage',
     subType: 'Pre-Opening',
        triggerOnEvent: {
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
      openingStage: {
        type: 'Stage',
     subType: 'Opening',
        initialExits: {
          initialStopLoss: {
            formula: {
              code: 'takeProfit = <valid JavaScript code>'
            },
            firstPhaseEvent: {
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
              }
            ]
          },
          initialTakeProfit: {
            formula: {
              type: 'Formula',
           subType: 'Take Profit Formula',
              code: 'takeProfit = <valid JavaScript code>'
            },
            firstPhaseEvent: {
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
              }
            ]
          }
        }
      },
      tradeManagementStage: {
        type: 'Stage',
     subType: 'Trade Management',
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
                code: 'takeProfit = <valid JavaScript code>'
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
                }
              ]
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
                code: 'takeProfit = <valid JavaScript code>'
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
                }
              ]
            }
          ]
        }
      },
      closingStage: {
        type: 'Stage',
     subType: 'Closing',
      }
    }
  ]
}
