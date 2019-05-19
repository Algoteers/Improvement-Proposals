# SIP 013 - Superalgos Trading Protocol

_This is a recommendation by Luis Molina based in conversations with Andreja._

During the current life span of the project we have learned that there are many ways to create trading bots. One of them is from scratch. During the inception of this project we did just that and soon realized that all bots tend to do similar things, giving us the possibility to abstract those common actions into a framework that prevent bots creators to start from scratch and having to manage all the details. Organically a framework emerged and after testing different ideas, we could abstract a protocol that can be use to specify the desired behaviour. This protocol is independent from the implementation, giving us the opportunity to have more than one if needed. In this current proposal, I will detail what it could be considered version one of such a protocol, knowing that it will not convey everything needed in future iterations.

It is needed to be said that many aspects of automated trading, such as _high frequency trading, arbitrage_ and other techniques are currently outside the scope of version 0.1. Hopefully we will add them once we start exploring those spaces.

## Trading Protocol Version 0.1

In this current early version, the protocol is just the description of a JSON object which defines the desired automation. Embedded on some parts of the data structure it is possible to have JavaScript code to define formulas and conditions.

### Data Structure

The following is a preview of how this data structure looks like. You can see the whole structure here: https://github.com/Superalgos/Improvement-Proposals/blob/master/SIP%20013/Trading%20Protocol.js

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
      trigger: {
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
```

### Protocol Definitions

#### Trading System

This is currently the head of the hierarchy. It is a set of individual strategies plus some common parameters that governs the overall behavior.

#### Parameters

We have identified so far two global parameters needed. __lossPercentageOne__ is for preventing the user to loose all its capital due to strategy design mistakes and __profitPercentage__ to create a graceful way to stop the execution when a certain goal is reached.

#### Filters

The __filters__ section is needed to define where a strategy applies. In other words for which scenario the strategy was designed for. The most relevant information in this section are the __market__, the __baseAsset__ and the __exchanges__ in which this strategy should be used. The ultimate purpose of the __filters__ is to allow users of the trading engine to filter out all strategies that are outside the scope of the market, exchange or base asset that is being used at the moment, without requiring users to specifically activate and deactivate the strategies in their __trading system__ that do not apply to the exchange/market/baseAsset they are standing at.  

#### Stage

Stages are one of the fundamental parts in which a strategy is divided into. There are four different stages: Trigger, Open, Manage and Close.

#### Trigger Stage

It is the first stage of the sequence. It is where the trade position size is decided and where capital is requested and allocated. It is also where the strategy is triggered on or off and where the opening trade position is defined. 

#### Open Stage

It is the second stage of the sequence. It is where the initial Stop Loss and Take Profit phases are defined and where we wait for the event to take a position.

#### Manage Stage

This is the third of the sequence and where a trade position has been taken and the trade needs to be managed by defining further Stop Loss and Take Profit phases.

#### Close Stage

The last stage is for physically exiting the position and managing the exit procedures.

#### Capital Request & Allocation.

When trading as part of a team in institutions, there is a point in time when a trader request the capital needed to take a position. Usually some other department fulfill the request later allocating the capital, and at that point in time the trader is ready to take a position with it. This current early version of the protocol just name these events for later definition in future versions.

#### Event

In this context, an event is something that happens in the market, that is being monitored by the __trading engine__ . Events are described as one or more __situations__ which in turn are described as one or more __conditions__ both defined below. There are several types of event defined within this protocol.

#### Trigger On Event

Is the particular event that makes the __trading engine__ enter into one strategy specifically on stage 1: __Trigger__

#### Trigger Off Event

Is the particular event that produces the __trading engine__ to exit a strategy, while still at stage 1: __Trigger__

#### Take Position Event

Is the event that produces a change of stages within the execution of the __trading engine__ from stage 1 __Trigger__ to stage 2 __Open__ where the steps to enter into a trade are defined.

#### Opening Execution

At this current early version this is just the mention of a section that will define the execution details. This defines the order types to be used, how these orders are going to be allotted and price for each one, and what to do under each possible situation that could go wrong with each of them. Future versions of the protocol will enable setting these definitions in detail.

#### Stop Loss

The __stop loss__ is the part of the Manage Stage that defines what to do and when with the Stop Loss during an active trade. In trading, Stop Loss is called to the target value at which a trader would leave its position taking the expected losses. Its definition is divided in phases.

#### Take Profit

The __take profit__ is the part of the Manage Stage that defines the target price at which to take profit. Its definition is also divided in phases.

#### Phase

A __phase__ is a part of the Manage Stage sections Take Profit and Stop Loss. A __phase__ represents a period of time during which a given formula is applied for either Take Profit or Stop Loss.

#### Formula

It is the section where a formula can be defined and used during a given phase.

#### Next Phase Event

It is the particular event that defines when the __trading engine__ needs to shift to the next __phase__ and apply the new phase's formula.


#### Situations

A __situation__ is the part of a strategy used to trigger an event. A __situation__ is defined by the conditions attached to it. When all of its children conditions evaluates to true, then the situation is considered to be true and the event to which the situation is attached to is triggered.

#### Conditions

A __condition__ is the part of a strategy that represents when a __situation__ may occur. Conditions are children of Situations.

#### Code

The code defined for a condition must evaluate at either true or false. The code defined for a phase must evaluate as a number. The code might use any available indicator data.

### Branches

The protocol data structure is designed in a way that each branch of the hierarchy is well defined. This is important since we expect people to detach branches and connect them at some other nodes of their own Trading System, and also share it with others to be reused in someone else Trading Systems as well.   
An example to clarify this: A __phase__ object has a __nextPhaseEvent__ property. There a user of the protocol can attach any object of type __Event__ with subtype __Next Phase Event__. Protocol editor software might allow them to create those events, and also to attach already existing ones the user might have created before or some event shared with him by other protocol users.

#### Object Types and Subtypes

You might notice that each object has a __type__ and __subType__ properties. In contrast with the __name__ property available at some objects for users to put a friendly name to their creations, the __type__ and __subType__ properties are not user defined. Instead they are definitions at the protocol level which enable software speaking the protocol language allow or restrict certain actions users can do with these objects. For example: an object of type: 'Managed Item' and subType: 'Take Profit' allow objects of type: 'Phase' to be attached to them, but not any 'Phase' object, only the ones of subType: 'Take Profit Phase'.

## Software Related to this Protocol

### Tools for Creating Strategies

By having a protocol to describe the desired automation it opens the door to different tools. Users will be able to create their strategies by hand, just following the protocol rules or using software that will help them do it. On the making there are two software for this purpose:

#### Strategizer

A web tool to allow users input their formulas and code and output the protocol format in a web dashboard format.

#### Strategy Designer

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
