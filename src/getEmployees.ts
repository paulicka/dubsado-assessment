import {TreeNode, lookup} from './manageEmployees';

/**
 * Given an employee, will find the node above (if any).
 * 
 * @param {TreeNode} tree
 * @param {string} employeeName
 * @returns {TreeNode}
 */
export function getBoss(tree: TreeNode, employeeName: string) : TreeNode | null {
  return lookup.get(employeeName).boss;
}

/**
 * Given an employee, will find the nodes directly below (if any).
 * Notice how it returns possibly several subordinates.
 * 
 * @param {TreeNode} tree
 * @param {string} employeeName
 * @returns {TreeNode[]}
 */
export function getSubordinates(tree: TreeNode, employeeName: string) : TreeNode[] {
    return lookup.get(employeeName).subordinates;
}

/**
 * EXTRA CREDIT:
 * Finds and returns the lowest-ranking employee and the tree node's depth index.
 * 
 * @param {TreeNode} tree
 * @param {string} employeeName
 * @returns {TreeNode}
 */
function lowest(tree: TreeNode, depth : number = 0) : [TreeNode, number] {
    if (tree.subordinates.length == 0){
	return [tree, depth];
    }

    var lows = tree.subordinates.map(sub => lowest(sub, depth + 1));
    lows.sort(function (a,b){
	const [aSub, aDepth] = a;
	const [bSub, bDepth] = b;
	return bDepth - aDepth;
    });
    return lows.shift();
}

export function printBosses(node : TreeNode){
    while (node){
	if (node.boss !== null){
	    console.log("node " + node.name + " has boss " + node.boss.name);
	} else {
	    console.log("node " + node.name + " is at the top of the world!");
	}
	node = node.boss;
    }
}

export function findLowestEmployee(tree: TreeNode) : TreeNode {
    const [node, depth] = lowest(tree, 0);
    console.log("[findLowestEmployee]: Found lowest employee " + node.name + " at depth " + depth);
    return node;
}
