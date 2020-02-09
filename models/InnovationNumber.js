class InnovationNumber {

    constructor() {
        this._id = 0;
    }

    get id() {
        return this._id ++;
    }
}

// class Singleton {

//   constructor() {
//       if (!Singleton.instance) {
//           Singleton.instance = new InnovationNumber();
//       }
//   }

//   get instance() {
//       return Singleton.instance;
//   }

// }

module.exports.InnovationNumber = InnovationNumber;