import {
       TreeNode,
       generateCompanyStructure,
       hireEmployee,
       fireEmployee
       } from './manageEmployees';
import { employees } from './employees.json';

// Main code goes here
function main() {
	 console.log("Normalizing JSON file...")
	 
	 console.log("Generating employee tree...")

//	 console.log(employees);
	 
	 var tree : TreeNode = generateCompanyStructure(employees);

//	 console.log(tree);


//	 console.log("[hireEmployee]: Added new employee (Jeb) with Sarah as their boss")
         hireEmployee(tree, { 
	       "name": "Jeb",
	       "jobTitle": "Minion",
	       "salary": "20000"
	       }, "Sarah");

//	 console.log("[fireEmployee]: Fired Alicia and replaced with Sal")
  	 fireEmployee(tree, "Alicia");
	 
	 console.log("[promoteEmployee]: Promoted Jared and made Bill his subordinate")
	 console.log("[demoteEmployee]: Demoted employee (demoted Xavier and replaced with Maria")
	 console.log("[getBoss]: Bill's boss is Jared")
	 console.log("[getSubordinate]: Maria's subordinates are Xavier, Morty, Jared")


	 // EXTRA CREDIT
	 console.log("")
}

main()
