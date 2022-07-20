import {
    TreeNode,
    generateCompanyStructure,
    hireEmployee,
    fireEmployee,
    promoteEmployee,
    demoteEmployee,
} from './manageEmployees';

import {
    getBoss,
    getSubordinates,
    findLowestEmployee,
} from './getEmployees';

import { employees } from './employees.json';

function print(tree : TreeNode, depth: number = 0){
    console.log("-".repeat(depth), tree.name, tree.subordinates.map(sub => sub.name));
    tree.subordinates.forEach(sub => print(sub, depth + 2));
}

// Main code goes here
function main() {
    console.log("Normalizing JSON file...")
	 
    console.log("Generating employee tree...")

    //	 console.log(employees);
	 
    var tree : TreeNode = generateCompanyStructure(employees);

    //	 console.log(tree);

    //	 console.log("[hireEmployee]: Added new employee (Jeb) with Sarah as their boss")
    hireEmployee(tree,
		 { 
		     "name": "Jeb",
		     "jobTitle": "Minion",
		     "salary": "20000"
		 },
		 "Sarah");

    //	 console.log("[fireEmployee]: Fired Alicia and replaced with Sal")
    fireEmployee(tree, "Alicia");
	 
    //	 console.log("[promoteEmployee]: Promoted Jared and made Bill his subordinate")
    promoteEmployee(tree, "Jared");
    
    // console.log("[demoteEmployee]: Demoted employee (demoted Xavier and replaced with Maria")
    demoteEmployee(tree, "Xavier", "Maria");
    
    //console.log("[getBoss]: Bill's boss is Jared")
    var boss : TreeNode | null = getBoss(tree, "Bill");
    console.assert(boss !== null);
    console.log("[getBoss]: Bill's boss is " + boss.name);

    console.log("[getBoss]: Jared's boss is " + getBoss(tree, "Jared").name);
    
    //console.log("[getSubordinate]: Maria's subordinates are Xavier, Morty, Jared")
    
    var subordinates = getSubordinates(tree, "Maria");
    console.log("[getSubordinates]: Maria's subordinates are " + subordinates.map(sub => {
	return sub.name;
    }));

    // EXTRA CREDIT
    //console.log("[findLowestEmployee]: ????")
    var lowest : TreeNode = findLowestEmployee(tree);
}

main()
