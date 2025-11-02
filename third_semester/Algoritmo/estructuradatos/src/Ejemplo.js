const Stack = require("./stack/stack");
const Queue = require("./queue/queue");
const List = require("./list/Simple/singly_linked_list");
const Dlist = require("./list/doubles/double_linked_list");

//revertir cadena de string usando pilas
// waldir
function revertir(str) {
  const stack = new Stack();
  for (let char of str) {
    stack.push(char);
  }

  let reverse = "";
  while (!stack.isEmpty()) {
    reverse += stack.pop();
  }
  return reverse;
}
//verificando parentesis balanceados
function isBalanced(expression) {
  const stack = new Stack();
  for (let char of expression) {
    if (char === "(") {
      stack.push(char);
    } else if (char === ")") {
      if (stack.isEmpty()) return false;
      stack.pop();
    }
  }
  return stack.isEmpty();
}

function decimalToBinary(number) {
  const stack = new Stack();

  let n = number;

  while (n > 0) {
    stack.push(n % 2);
    n = Math.floor(n / 2);
  }

  let binary = "";
  while (!stack.isEmpty()) {
    binary += stack.pop();
  }

  return binary;
}

//Ejmeplo de uso de Pila
const stack = new Stack();
stack.push(10);
stack.print();
stack.push(20);
stack.print();
stack.push(30);
stack.print();
stack.push(5);
stack.print();
console.log(stack.pop()); //5
console.log(stack.pop()); //30
stack.print();

//console.log(revertir("waldir")); //ridlaw

if (isBalanced("(a+b)*(c+d))")) {
  console.log("Expresion con parentesis balanceados");
} else {
  console.log("Expresion con parentesis NO balanceados");
}
console.log(isBalanced("(a+b)*(c+d)")); // true
console.log(isBalanced("(a+b)")); //true
console.log(isBalanced("(a+b*(c+d)")); //false
console.log(isBalanced("(a+b))")); //false

console.log(decimalToBinary(55));

//Colas;
console.log("======================= COLAS =========================");

const q = new Queue();

q.enqueue(10);
q.printQueue();
q.enqueue(20);
q.printQueue();
q.enqueue(30);
q.printQueue();

console.log("Elemento elminado: ", q.dequeue()); //10
q.printQueue();
console.log("El primer elemento: ", q.peek());
console.log("¿Cola vacia? ", q.isEmpty());
console.log("Tamaño? ", q.sized());

//====================== LIST ====================

const list = new List.SinglyLinkedList();

list.push(10);
list.push(20);
list.unshift(5);
console.log(list.toArray());

list.removeat(1);
console.log(list.toArray());

//TODO: qe implementen en el labpratorio u metodo de insercion por posicion
//list.

list.push(15);
console.log(list.toArray());
//TODO: implemenar el motodo pop
// list.pop();
// console.log(list.toArray());

//=================== Duoble list linked ========================
console.log("LISTA DOBLEMENTE ENLAZADA");

const dlist = new Dlist.DoubleLinkedList();

dlist.push(20);
dlist.push(21);
dlist.push(23);

console.log(dlist.toArrayForward());
console.log(dlist.toArrayBackward());

//TODO QUE REVICEN Y CONPONGAN EL ERROR EN REMOVEAT
dlist.removeAt(1);
console.log(dlist.toArrayForward());

dlist.unshitf(5);
console.log(dlist.toArrayForward());

const last = dlist.pop();
console.log("popped: ", last.value);
console.log(dlist.toArrayForward());
