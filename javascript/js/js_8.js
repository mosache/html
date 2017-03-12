'use strict';
var tree = (function() {
	var nodeMap = {};

	/**Node*/
	function Node(data) {
	this.data = data;
	this.children = [];
	this.id = null;
	this.parentId = null;
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
		node.parentId = parentNodeId;
		nodeMap[id] = node;
		parentNode.children.push(node);


	}

	Tree.prototype.render = function(){
		this.traversal_bft((node) => {
			var parent = document.getElementById(node.parentId);
			if(parent){
				var newNode = document.createElement('div');
				newNode.style.display = 'flex';
				newNode.id = node.id;
				newNode.style.margin = '20px'
				newNode.style.border = '1px solid #f00';
				newNode.style.justifyContent = 'center';
				newNode.style.alignItems = 'stretch';
				newNode.style.flex = '1';
				newNode.style.backgroundColor = '#fff';
				newNode.innerHTML = node.data;
				parent.appendChild(newNode);
			}else{
				var newNode = document.createElement('div');
				newNode.id = node.id;
				newNode.style.display = 'flex';
				newNode.style.border = '1px solid #f00';
				newNode.style.width = '100%';
				newNode.style.height = '160px';
				newNode.style.justifyContent = 'center';
				newNode.style.backgroundColor = '#fff';
				newNode.style.alignItems = 'stretch';
				newNode.innerHTML = node.data;
				document.getElementsByTagName('body')[0].appendChild(newNode);
			}

		});
	}
	//dft
	Tree.prototype.traversal_dft = function(callBack){
		(function traversal(currentNode){
			for(var i =0 ; i < currentNode.children.length;i++){
				traversal(currentNode.children[i]);
			}
			callBack(currentNode);
		})(this._rootNode);
	}

	//bft
	Tree.prototype.traversal_bft = function(callBack){
		var queue = [];
		queue.push(this._rootNode);
		var currentNode = queue.shift();
		while(currentNode){
			for(var i = 0 ; i < currentNode.children.length; i++){
				queue.push(currentNode.children[i]);
			}
			callBack(currentNode);
			currentNode = queue.shift();
		}
	}

	//search
	Tree.prototype.search = function(callBack,search){
		var queue = [];
		queue.push(this._rootNode);
		var currentNode = queue.shift();
		while(currentNode){
			for(var i = 0 ; i < currentNode.children.length; i++){
				queue.push(currentNode.children[i]);
			}
			callBack(currentNode);
			if(currentNode.data == search){
				return;
			}
			currentNode = queue.shift();

		}
	}
	/**Tree end*/
	return new Tree();
})();


function doAnim(type){
	resetColor();
	var arr = [];
	type == 1?tree.traversal_dft(function(node){
			arr.push(node);	
	}):tree.traversal_bft(function(node){
			arr.push(node);	
	});
	
	if(arr.length > 0 ){
		var i = 0;
		var timer = setInterval(function(){
				if(i == arr.length){
					document.getElementById(arr[i-1].id).style.backgroundColor ='#fff';
					clearInterval(timer);
					return;
				}
					if(i > 0)
					document.getElementById(arr[i-1].id).style.backgroundColor = '#fff';
					document.getElementById(arr[i].id).style.backgroundColor = '#00f';
					i++;
				},800);
	}

}

function resetColor(){
	Array.from(document.querySelectorAll('div')).map(function(item){
		item.style.backgroundColor = '#fff';
	});

	
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**code start*/
tree.setRootNode('Root');
tree.addTo('A','root','a');
tree.addTo('B','root','b');
tree.addTo('C','a','c');
tree.addTo('D','root','d');
tree.render();

var btnContainer = document.createElement('div');
btnContainer.style.width = '100%';
btnContainer.style.height = '40px';
btnContainer.style.display = 'flex';
btnContainer.style.justifyContent = 'center';
btnContainer.style.alignItems = 'center';

var df_btn = document.createElement('button');
df_btn.type = 'button';
df_btn.style.width = '80px';
df_btn.style.height = '30px';
df_btn.innerHTML = 'dft';
df_btn.onclick = function(){
	doAnim(1);
}
btnContainer.appendChild(df_btn);

var bf_btn = document.createElement('button');
bf_btn.type = 'button';
bf_btn.style.width = '80px';
bf_btn.style.height = '30px';
bf_btn.innerHTML = 'bft';
bf_btn.style.marginLeft = '30px';
bf_btn.onclick = function(){
	doAnim(2);
}
btnContainer.appendChild(bf_btn);
document.getElementsByTagName('body')[0].appendChild(btnContainer);

var searchContainer = document.createElement('div');
searchContainer.style.display = 'flex';
searchContainer.style.justifyContent = 'center';
searchContainer.style.alignItems = 'center';
searchContainer.style.width = '100%';
searchContainer.style.height = '40px';

var input = document.createElement('input');
input.type = 'text';
input.style.width = '80px';
searchContainer.appendChild(input);

var search_btn = document.createElement('button');
search_btn.type = 'button';
search_btn.style.width = '60px';
search_btn.innerHTML = 'Search';
search_btn.style.marginLeft = '20px';
search_btn.onclick = function(){
	resetColor();
	var s = input.value;
	if(!/^\s+$/.test(s)){
		var arr = [];
		tree.search(function(node){
			arr.push(node);
		},s);

		if(arr.length > 0){
			var i = 0;
			var timer = setInterval(function(){
					if(i == arr.length){
						document.getElementById(arr[i-1].id).style.backgroundColor = arr[i-1].data == s ?'#e9e':'#fff';
						clearInterval(timer);
						return;
					}
						if(i > 0)
						document.getElementById(arr[i-1].id).style.backgroundColor = '#fff';
						document.getElementById(arr[i].id).style.backgroundColor = '#00f';
						i++;
					},800);
		}else{
			alert("not match!!!");
		}
	}
};
searchContainer.appendChild(search_btn);
document.getElementsByTagName('body')[0].appendChild(searchContainer);



