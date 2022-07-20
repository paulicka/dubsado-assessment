
```
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt update
sudo apt install yarn
sudo apt install node-typescript
```

Reviewing employees.json
- First names only
- ASSUMPTIONS:
  - Unique first name ids
  - 

THOUGHTS:
- Could move methods into TreeNode class (and rename TreeNode to Employee)

 * EXTRA CREDIT:
 * Finds and returns the lowest-ranking employee and the tree node's depth index.
function findLowestEmployee(tree: TreeNode) : TreeNode {

  - What if there are multiple employees lowest-ranking?  Choose one random?

* Create TreeNode
  * Include properties from JSON examples: name, title, salary, boss, subordinates

    -   Any noteworthy logic/style decisions you made? If so, what is your reasoning?
    -   If you had more time, what improvements would you implement?
    -   **Bonus**: What is the time complexity of each function in your code?
    -   **Bonus**: There are two functions that have very similar logic and could be merged into one. Which functions do you think can be merged and why?
-   Lastly, send over a link to your forked repository.
