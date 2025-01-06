const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/


class BinarySearchTree {
  constructor() {
    this.rootNode = null;
  }

  root() {
    return this.rootNode;
  }

  add(data) {
    const newNode = new Node(data);

    if (!this.rootNode) {
      this.rootNode = newNode;
      return;
    }

    let currentNode = this.rootNode;

    while (true) {
      if (data < currentNode.data) {
        if (!currentNode.left) {
          currentNode.left = newNode;
          return;
        }
        currentNode = currentNode.left;
      } else {
        if (!currentNode.right) {
          currentNode.right = newNode;
          return;
        }
        currentNode = currentNode.right;
      }
    }
  }

  has(data) {
    return !!this.find(data);
  }

  find(data) {
    let currentNode = this.rootNode;

    while (currentNode) {
      if (data === currentNode.data) {
        return currentNode;
      }

      currentNode = data < currentNode.data ? currentNode.left : currentNode.right;
    }

    return null;
  }

  remove(data) {
    this.rootNode = this._removeNode(this.rootNode, data);
  }

  _removeNode(node, data) {
    if (!node) return null;

    if (data < node.data) {
      node.left = this._removeNode(node.left, data);
      return node;
    }

    if (data > node.data) {
      node.right = this._removeNode(node.right, data);
      return node;
    }

    // Node to be deleted found
    if (!node.left && !node.right) return null; // No children
    if (!node.left) return node.right;         // One child (right)
    if (!node.right) return node.left;         // One child (left)

    // Two children
    let minRight = this._findMin(node.right);
    node.data = minRight.data;
    node.right = this._removeNode(node.right, minRight.data);

    return node;
  }

  min() {
    if (!this.rootNode) return null;

    return this._findMin(this.rootNode).data;
  }

  _findMin(node) {
    while (node.left) {
      node = node.left;
    }
    return node;
  }

  max() {
    if (!this.rootNode) return null;

    let currentNode = this.rootNode;
    while (currentNode.right) {
      currentNode = currentNode.right;
    }
    return currentNode.data;
  }
}

module.exports = {
  BinarySearchTree
};
