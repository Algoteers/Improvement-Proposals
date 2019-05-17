# SIP 013 - Superalgos Trading Protocol

_This is a recommendation by Luis Molina based in conversations with Andreja._

During the curren life span of the project we have learnt that there are many ways to create trading bots. One of them is from scratch. During the inception of this porject we did just that and soon we realized that all bots tend to do similar things, giving us the possibility to abstract those common actions into a framework that prevent bots creators to start from scratch and have to manage all the details. Organically a framework emerged and after testing different ideas, we could abstract a protocol that can be use to specify the desired behaviour. This protocol is independent from the implementation, giving us the opportunity to have more than one if needed. In this current proposal, I will detail what it could be considered version one of such a protocol, knowing that it will not conver everything needed in future iterations.

It is needed to be said that many aspects of automated trading, such as _high frequency trading, arbitrage_ and other techniques are currently outside the scope of version 0.1. Hopefully we will add them once we start exploring those spaces.

## Trading Protocol Version 0.1

In this current early version, the protocol is just the description of a JSON object which defines the desired automation. Embedded on some parts of the data structure it is possible to have JavaScript code to define formulas and conditions.

### Data Structure

```
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
            preOpeningStage: {
                type: 'Stage',
                subType: 'Pre-Opening',
                triggerOnEvent: {
                    type: 'Event',
                    subType: 'Triffer On Event',
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
            openingStage: {
                type: 'Stage',
                subType: 'Opening',
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
            closingStage: {
                type: 'Stage',
                subType: 'Closing',
            }
        }       
    ]
}
```

### Protocol Definitions

#### Trading System

This is currently the head of the hierarchy. It is a set of individual strategies plus some common parameters that governs the overall behavior.

#### Conditions

A __condition__ is the part of a strategy that represents something that must happen. Conditions are children of Situations.

#### Code

The code defined at a condition must evaluate at either true or false. The code might use any available indicator data.

#### Situations

A __situation__ is the part of a strategy used to trigger an event. A __situation__ is defined mostly by the conditions attached to it. When all of its children conditions evaluates to true, then the situation is considered to be true and the event to which the situation is attached to is triggered.

#### Phase

A __phase__ is a part of the Trade Management Stage sections Take Profit and Stop. A __phase__ represents a period of time during which the same formula is needed to be applied for either the Take Profit or Stop Loss.

#### Next Phase Event

Phases can contain this type of event, which essentially means is that once any of the situations attached to this event becomes true, the automata must consider itself on the next defined phase and start using the formula attached to that next phase from there on.  

#### Formula

It is the section where a formula can be defined to be used during the phase at which the formula is attached to.

#### Stop Loss

The __stop loss__ is the part of the Trade Management Stage that defines what to do and when with the Stop Loss during an active trade. In trading Stop Loss is called to the target value at which a trader would leave its position taking the expected losses. Its definition is fragmented in phases.

#### Take Profit

The __take profit__ is the part of the Trade Management Stage that defines the target price at which to take profit. Its definition is also fragmented in phases.

#### Stage

Stages are one of the fundamental parts in which a strategy is divided into. There are four different stages:

#### Pre-Opening Stage

It is the first stage of the sequence. It is where the size is decided, capital requested and allocated.

#### Opening Stage

It is the second stage of the sequence. It is where the initial Stop and Take Profit is defined and where we wait for the event to take a position.

#### Trade Management Stage

This is the third of the sequence and where a position is taken and the trade needs to be managed.

#### Closing Stage

The last stage is for physically exiting the position and managing the exit procedures.

### Branches

The protocol data structure is designed in a way that each branch of the hierarchy is well defined. This is important since we expect people to detach branches and connect them at some other nodes of their own Trading System, and also share it with others to be reused in someone else Trading Systems as well.   

An example to clarify this: A __phase__ object has a __nextPhaseEvent__ property. There a user of the protocol can attach any object of type __Event__ with subtype __Next Phase Event__. Protocol editor software might allow them to create those events, and also to attach already existing ones the user might have created before or some event shared with him by other protocol users.

## Software Related to this Protocol

### Tools for Creating Strategies

By having a protocol to describe the desired automation it opens the door to different tools. Users will be able to create their strategies by hand, just following the protocol rules or using software that will help them do it. On the making there are two software for this purpose:

#### Strategizer

A web tool to allow users input their formulas and code and output the protocol format in a web dashboard format.

#### Strategy Map

A visual tool resembling a mind map that allow users to input their formulas and code and output the protocol format.

### Tools for Running strategies

In this category there are two pieces of software under development:

#### Strategy Engine

The engine has as an input a file under the protocol format and datasets with market data, referenced at the code embedded at the protocol data structure. The engine is able to backtest, forward test the instructions defined on its protocol file input. In coordination with the Strategy Executor, the engine can also live trade.

#### Strategy Executor

This software interpret the execution instructions embedded at a protocol file. These instructions usually detail what type of order to use, and what to do at every possible situation that could happen during the placing and management of exchange orders.

### Supporting Tools

There is one supporting tool under development that complements the job done by the Strategy Engine and the Strategy Executor:

#### The Cockpit

This tool, developed both as a web module and a mobile app, are intended to allow human traders to intervene during the otherwise automated process. Either confirming or declining the actions to be executed or even modifying the strategies definitions at the protocol level if needed.

### Charting Tools

There is a charting system that plots indicators data which is adding support to this protocol, so that users can see the actions taken by the Strategy Engine, the Executor and even the Cockpit integrated with the market data used to take the decisions that lead to those actions.
