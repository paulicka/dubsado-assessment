export interface Employee {
    name: string;
    jobTitle: string;
    boss: string | null;
    salary: string;
  }

export class TreeNode {
    name: string;
    jobTitle: string;
    email: string;
    salary: number;
    
    boss: TreeNode | null;
    subordinates: Array<TreeNode>;

    lookup: Map<string, TreeNode> | null;
    
    constructor(name: string, jobTitle: string, email: string, salary: number, boss: TreeNode | null) {
        this.name = name;
	this.jobTitle = jobTitle;
	this.email = email;
	this.salary = salary;
        this.boss = boss;	      
        this.subordinates = [];
	this.lookup = null;
    }
}

function generateTreeNode(lookup: Map<string, TreeNode>, employee: Employee) : TreeNode {
    var name = employee["name"];
    var email = "";
    var i = name.indexOf('@');
    if (i != -1){
      email = name;
      name = name.charAt(0).toUpperCase() + name.slice(1, i);
    }

    var boss : TreeNode | null = null;
    if (employee.boss !== null){
      boss = lookup.get(employee.boss);
      console.assert(boss !== null);
    } 
    var node : TreeNode = new TreeNode(name, employee.jobTitle, email, parseInt(employee.salary), boss);
    if (boss !== null){
      boss.subordinates.push(node);
    }
    lookup.set(name, node);

    return node;
}

/**
 * Normalizes the provided JSON file and generates a tree of employees.
 *
 * @param {Object[]} employees array of employees
 * @returns {TreeNode}
 */
export function generateCompanyStructure(employees : Employee[]) : TreeNode {
  var tree : TreeNode = null;
  
  var lookup = new Map<string, TreeNode>();
  
  employees.forEach((employee: Employee) => {
    //console.log("name ", name, " email ", email);
    var node : TreeNode = generateTreeNode(lookup, employee);
    if (node.boss === null){
      tree = node;
    }
  });

  // console.log(tree);

  tree.lookup = lookup;  // Keep lookup table around for future operations...
  
  return tree;
}

/**
 * Adds a new employee to the team and places them under a specified boss.
 *
 * ASSUMPTIONS:
 *  newEmployee Object is same as elements in employees.json
 * QUESTIONS:
 *  What if bossName isn't in tree?
 *
 * @param {TreeNode} tree
 * @param {Object} newEmployee
 * @param {string} bossName
 * @returns {void}
 */
export function hireEmployee(tree: TreeNode, newEmployee: Object, bossName: string) : void {
  var employee : Employee = newEmployee as Employee;
  employee.boss = bossName;
  
  var node : TreeNode = generateTreeNode(tree.lookup, employee);

  console.log("[hireEmployee]: Added new employee (" + employee.name + ") with " + employee.boss + " as their boss")
}

/**
 * Removes an employee from the team by name.
 * If the employee has other employees below them, randomly selects one to take their place.
 *
 * @param {TreeNode} tree
 * @param {string} name employee's name
 * @returns {void}
 */
export function fireEmployee(tree: TreeNode, name: string) : void {
    var employee : TreeNode = tree.lookup.get(name);
    console.assert(employee);

    var boss : TreeNode = employee.boss;


    /*
     *  Remove employee from boss' subordinates
     *  Choose 1 subordinate to be new employee
     *  Put new employee in boss subordinates
     *  Put boss in new employee
     *  Put all other subordinates under subordinate
     *  Change all subordinates bosses to new employee
     *  Remove employee from lookup table
     *  Free employee
     */

    if (boss !== null){
	boss.subordinates = boss.subordinates.filter(node => node !== employee);
    }
    
    var subordinate : TreeNode | null = null;
    var subordinates = employee.subordinates;
    if (subordinates.length > 1){
       	subordinate = subordinates[Math.floor(Math.random()*subordinates.length)];

	boss.subordinates.push(subordinate);
	
	subordinate.subordinates = subordinates.filter(sub => sub !== subordinate);
	subordinate.subordinates.forEach(sub => {
	    sub.boss = subordinate;
	});
    }
    tree.lookup.delete(name);
    console.log("[fireEmployee]: Fired " + name + " and replaced with " + subordinate.name);
}

/**
 * Promotes an employee one level above their current ranking.
 * The promoted employee and their boss should swap places in the hierarchy.
 *
 * @param {TreeNode} tree
 * @param {string} employeeName
 * @returns {void}
 */
export function promoteEmployee(tree: TreeNode, employeeName: string) : void {
       tree.lookup.get(employeeName);
}

/**
 * Demotes an employee one level below their current ranking.
 * Picks a subordinat and swaps places in the hierarchy.
 *
 * @param {TreeNode} tree
 * @param {string} employeeName the employee getting demoted
 * @param {string} subordinateName the new boss
 * @returns {void}
 */
function demoteEmployee(tree: TreeNode, employeeName: string, subordinateName: string) : void {

}
