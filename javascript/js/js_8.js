'use strict';
var tree = (function() {
	var nodeMap = {};

	/**Node*/
	function Node(data) {
	this.data = data;
	this.children = [];
	this.id = null;
	}
	/**Node end*/

	/**Tree*/
	function Tree(){
		
	}
	Tree.prototype.setRootNode = function(rootData){
		var rootNode = new Node(rootData);
		rootNode.id = 'root';
		nodeMap['root'] = rootNode;
		this._rootNode = rootNode;

	}
	Tree.prototype.addTo = function(data,parentNodeId,id){
		var parentNode = nodeMap[parentNodeId];
		if(!parentNode){
			alert('can add to node do not existed!!!');
			return;
		}

		if(nodeMap[id]){
			alert('already has the same id!!!');
			return;
		}
		var node = new Node(data);
		node.id = id;
		nodeMap[id] = node;
		parentNode.children.push(node);

	}

	Tree.prototype.render = function(){
		this.traversal(TraversalType.preOrder,function(node){
			
		});
	}
	Tree.prototype.traversal = function(type,callBack){
	switch(type){
		case TraversalType.preOrder:
			i = 0;
			preOrder(this._rootNode);
			break;
		case TraversalType.midOrder:
			i = 0;
			midOrder(this._rootNode);
			break;
		case TraversalType.backOrder:
			i = 0;
			backOrder(this._rootNode);
			break;
	}
		/**前序遍历*/
		function preOrder(node){
			if(node!=null){
				if(callBack){
					callBack(node);
			
				}	
				preOrder(node.left);
				preOrder(node.right);
			}
		}

		/**中序遍历*/
		function midOrder(node){
			if(node!=null){
				midOrder(node.left);
				if(callBack){
					callBack(node);
				}	
				midOrder(node.right);
			}
		}

		/**后序遍历*/
		function backOrder(node){
			if(node!=null){
				backOrder(node.left);
				backOrder(node.right);
				if(callBack){
					callBack(node);
				
				}	
			}
		}
	}
	/**Tree end*/
	return new Tree();
})();
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**code start*/
tree.setRootNode('Root');
tree.addTo('A','root',1);
alert('');




