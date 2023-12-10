class Key {
  constructor(private signature: string = Math.random().toString(36).substring(7)) {}

  getSignature(): string {
    return this.signature;
  }
}

class Person {
  constructor(private key: Key) {}

  getKey(): Key {
    return this.key;
  }
}

abstract class House {
  tenants: Person[] = [];

  constructor(public door: boolean, private key: Key) {}

  abstract openDoor(key: Key): void;

  comeIn(person: Person): void {
    if (this.door) {
      this.tenants.push(person);
      console.log("Person has entered the house.");
    } else {
      console.log("The door is closed. Person cannot enter.");
    }
  }
}

class MyHouse extends House {
  constructor(door: boolean, key: Key, public currentKey: string = '') {
    super(door, key);
    this.currentKey = currentKey;
  }

  openDoor(key: Key): void {
    if (key.getSignature() === this.currentKey) {
      this.door = true;
      console.log("The door is now open.");
    } else {
      console.log("Invalid key. The door remains closed.");
    }
  }
}

const key = new Key();

const house = new MyHouse(key);
const person = new Person(key);

house.openDoor(person.getKey());

house.comeIn(person);
