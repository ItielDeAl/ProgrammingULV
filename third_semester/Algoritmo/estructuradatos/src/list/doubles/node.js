class DNode {
  constructor(value) {
    (this.value = value), (this.next = null);
    this.prev = null;
  }
}

module.exports = DNode;
