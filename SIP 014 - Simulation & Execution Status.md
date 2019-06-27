# SIP 014 - SIP 014 - Simulation & Execution Status

_This is a recommendation by Luis Molina to be implemented as a joint effort._

We need a consistent way to communicate end users what is going on deep on the execution stack, specially when something is not working, to avoid confussion and to expedite troubleshooting. 

## Proposal

As end users are going to report their problems to us, we need to know with quite a good presicion what problems they are having. I suggest to have a well known pre-defined Status Code list that can be documented with hints towards the reasons for each code and possible troubleshootings.  

### GraphQL Query

We need a query specifically designed to reveal the actual status of execution at any depth of the stack, which returns clear, consolidated information of what is going on, specially when things goes wrong.

### Response Format

```
responseData = {
	tradingSimulator: {
		status: <code from the list below>,
		processDate: <the process date takend from the Clone Executor>,
		loopNumber: <the loop number taken from the Clone Executor>,
		error: <technical error information the user can forward to support>
		}
	tradingExecutor: {
		status: <code from the list below>,
		processDate: <the process date takend from the Clone Executor>,
		loopNumber: <the loop number taken from the Clone Executor>,
		error: <technical error information the user can forward to support>
		}
}

The processDate and loopNumber might be used by the UI to create progess bars or other visual aids that represent progress.

```

### Status Codes & their Meaning

| Code        	| Meaning       | 
| ------------- |:-------------:| 
| 000 | No request received to run the simulator | 
| 001 | User started simulation from Clones UI |
| 002 | User started simulation from Canvas App |
| 010 | Kupernates Running |
| 011 | Kubernates not working because of X |
| 012 | Kubernates not working because of Y |
| 020 | Docker Container Running |
| 021 | Docker Container not Running because of X |
| 022 | Docker Container not Running because of Y |
| 030 | Clone Executor Running |
| 031 | Clone Executor Stopped Running |
| 032 | Clone Executor Stopped with Errors |
| 033 | Clone Executor Stopped because of X |
| 034 | Clone Executor Stopped because of Y |
| 040 | Simulation Engine Running |
| 041 | Simulation Engine Stopped with Errors |
| 042 | Simulation Engine Stopped because of X  |
| 043 | Simulation Engine Stopped because of Y |
| 050 | Simulation Engine Running |
| 051 | Simulation Engine Stopped with Errors |
| 052 | Simulation Engine Stopped because of X  |
| 053 | Simulation Engine Stopped because of Y |

X and Y should be replaced for real situations that might happen and probably others should be added.
