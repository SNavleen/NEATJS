let util = require('../util/util');

// Get a randome synapse from the synapses array of objects
function _getRandomSynapse (synapse) {
  return synapse.id === this.id ? synapse : null;
}
// Get a randome neuron from the neurons array of objects
function _getRandomNeuron (neuron) {
  return neuron.id === this.id ? neuron : null;
}


class GlobalSynapses {

  constructor () {
      this.synapses = [];
  }
}

let { InnovationNumber } = require("./InnovationNumber");
let innovationNumber = new InnovationNumber();
let globalSynapse = new GlobalSynapses();

class Genome {
  constructor(fitness = 0, adjusted_fitness = 0, id = innovationNumber.id) {
    this.id = id;
    this.fitness = fitness;
    this.adjusted_fitness = adjusted_fitness;
    this.neurons = [];
    this.synapses = [];
    this.global_synapses = globalSynapse.synapses;
  }

  neuronsSize () {
    return this.neurons.length;
  }
  synapsesSize () {
    return this.synapses.length;
  }
  globalSynapsesSize () {
    return this.global_synapses.length;
  }

  pushNeuron (neuron) {
    this.neurons.push({ id: neuron.id, neuron: neuron });
  }
  pushSynapse (synapse) {
    this.synapses.push({ id: synapse.id, synapse: synapse });
  }
  pushGlobalSynapse (synapse) {
    this.global_synapses.push({ id: synapse.id, synapse: synapse });
  }

  // Compare all the synapse with the new input and output neuron
  getSynapse (synapses, in_neuron, out_neuron) {
    let synapse = null;
    // console.log("synapses");
    // console.log(synapses);
    for (var i = 0; i < synapses.length; i++) {
      if (synapses[i].synapse.in_neuron.id == in_neuron.id &&
        synapses[i].synapse.in_neuron.type == in_neuron.type &&
        synapses[i].synapse.out_neuron.id == out_neuron.id &&
        synapses[i].synapse.out_neuron.type == out_neuron.type) {
          // console.log(synapses[i].synapse);
          return synapses[i].synapse;
      }
    }
  }
  getRandomNeuron () {
    return this.neurons.filter (
      _getRandomNeuron,
      {
        id: util.randRangeInt(0, this.neurons.length)
      }
    )[0];
  }
}

exports.Genome = Genome;