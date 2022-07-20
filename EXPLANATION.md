
## Installing Prerequisites

For Linux Mint Cinnamon, the following were necessary to install all the prerequisites.

```
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt update
sudo apt install yarn
sudo apt install node-typescript
```

## Running the App

To run the code, as in the README.md, just:
```
$ yarn start
```

## Logic/style decisions

I stayed predominantly with the existing functions and signatures, as implied by the documentation.

The TreeNode actually keeps the boss as a TreeNode, as well as all subordinates as a TreeNode [].

The only noteworthy decision I made was to keep a Map<string,TreeNode> to easily reference any particular TreeNode.

This changes lookups to be O(1) instead of O(n) through the tree.

Sadly, the lookup is stored at the module level in manageEmployees.ts, which may be a bit awkward/non-standard.
It works for the moment...


## Potential Improvements

As this was my first foray in a while into Typescript, I imagine there are many.

For example:
- What IDE do people at Dubsado use for Typescript?
- I looked into making unit tests, but the installation requirements slowed me down.  This would be the first thing I would learn to do in future projects.
- Is there a common way to do module-level variables?
- There is no error handling, or pretty much any possible feedback, other than the requested console output.
- I made an Employee interface for handling the data within the employees.json file.  Is this normal? ;-)
- Generating docs from the function comments with typedoc (again, sadly, I seem to have an old engine version)
- Code layout:
  - Why two files? (not counting index.ts)
  - Why functions, and not methods on the TreeNode class?
- Consistent and togglable logging, as opposed to hard-coded console logging in functions
- Using Map<string, TreeNode> for subordinates, instead of TreeNode[], would speed things up for most functions, though add a bit of management complexity

## Time complexity of functions

manageEmployees.ts:
- generateCompanyStructure() - O(n) by number of records, insertion is trivial since lookup is O(1) with the Map.
  NOTE:  There is a potential error condition if the records have employees referring to their boss before the boss is handled.  This could be fixed with a two-pass system.
- hireEmployee() - O(1), lookup boss and TreeNode creation are constant time
- fireEmployee() - O(1) for the lookup, but...a little tricky...there is the fact that we have to look through the boss's subordinates to delete the employee...so if all employees under one boss, this could be O(n).
- promoteEmployee() - O(1) to lookup employee, boss is a dereference, again, all the time complexity comes from managing the subordinates TreeNode[] arrays.  Hence the recommendation to change that to a Map<string, TreeNode>
- demoteEmployee() - calls promoteEmployee(), so...see above

getEmployees.ts:
- getBoss() - O(1) for employee lookup, then dereference boss
- getSubordinates() - O(1) for employee lookup, then access subordinates
- findLowestEmployee() - O(n) traversing whole tree
  NOTE:  Could keep depth as a property of TreeNode, adding management complexity.
    Could also cache the lowest employee, and only verify/regenerate with hire/fire/promote/demote

## Similar functions

In fact, I have implemented demoteEmployee() using promoteEmployee().

There is simply a flag to change the console output.

## EXTRA CREDIT

I implemented findLowestEmployee().  Note that zero (0) is the top of the tree, not one (1).