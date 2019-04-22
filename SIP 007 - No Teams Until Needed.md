# SIP 007 - No Teams Until Needed

Teams is going to be a fundamental part of the structure of the community. We expect people to form teams and have different types of members, be able to request be part of, approve requests, and so on. Reality is that that is our future vision. We built some of that functionality today in order to have it ready and minimize changes in the future on the backends. That is the reason we are requesting people to create a Team even if they are the only one inside.

### Today is an Entry Barrier

Today this represents an entry barrier and it is difficult to digest why a new user is requested to create a one member team when all of the other functionality is not there.

### Proposal

Lets remove the Team Module UI and create a Team on the background as part of a cleaner signup process, with an automatic name that later in the future once it makes sense to have teams, the user can change to whatever name he pleases.

We can use the userName provided and not only get rid of the team creation but also of the bots creations at signup.

The names used for Team and Bots could simply be:

userName --> Luis
userName-Team --> Luis-Team
userName-Simulation-Engine  --> Luis-Simulation-Engine
userName-Execution-Engine  --> Luis-Execution-Engine
