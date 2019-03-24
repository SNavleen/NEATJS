let { Mutation } = require("../util/mutation");
let { Synapse } = require("../models/Synapse");
let { Neuron, Type } = require("../models/Neuron");

class Genome extends Mutation {
  constructor() {
    super();
    this._neurons = [
      {
        id: 0,
        neuron: new Neuron(0, Type.INPUT)
      },
      {
        id: 1,
        neuron: new Neuron(1, Type.INPUT)
      },
      {
        id: 2,
        neuron: new Neuron(2, Type.HIDDEN)
      },
      {
        id: 3,
        neuron: new Neuron(3, Type.OUTPUT)
      },
    ];
    this._synapses = [
    ];
  }

  get neurons() {
    return this._neurons;
  }
  get synapses() {
    return this._synapses;
  }

  neuronsSize() {
    return this._neurons.length;
  }
  synapsesSize() {
    return this._synapses.length;
  }
}

let add = new Genome();
add.addSynapse();
// add.addSynapse();
// console.log(add.synapses);
// console.log(add.synapses[0].synapse.in_neuron);
// console.log(add.synapses[0].synapse.out_neuron);
// console.log(add.synapses[1].synapse.in_neuron);
// console.log(add.synapses[1].synapse.out_neuron);

// let add2 = new Genome();
// add2.addSynapse();
// add2.addSynapse();
// console.log(add2.synapses);
// console.log(add2.synapses[0].synapse.in_neuron);
// console.log(add2.synapses[0].synapse.out_neuron);
// console.log(add2.synapses[1].synapse.in_neuron);
// console.log(add2.synapses[1].synapse.out_neuron);


