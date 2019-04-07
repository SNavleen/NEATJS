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
      this._synapses = [];
  }

  get synapses () {
      return this._synapses;
  }
}

let globalSynapse = new GlobalSynapses();


class Genome {
  constructor() {
    this._neurons = [];
    this._synapses = [];
    this._global_synapses = globalSynapse.synapses;
  }

  get neurons () {
    return this._neurons;
  }
  get synapses () {
    return this._synapses;
  }
  get global_synapses () {
    return this._global_synapses;
  }

  neuronsSize () {
    return this._neurons.length;
  }
  synapsesSize () {
    return this._synapses.length;
  }
  globalSynapsesSize () {
    return this._global_synapses.length;
  }

  pushNeuron (neuron) {
    this._neurons.push({ id: neuron.id, neuron: neuron });
  }
  pushSynapse (synapse) {
    this._synapses.push({ id: synapse.id, synapse: synapse });
  }
  pushGlobalSynapse (synapse) {
    this._global_synapses.push({ id: synapse.id, synapse: synapse });
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
        id: util.randRangeInt(0, this._neurons.length)
      }
    )[0];
  }
}

exports.Genome = Genome;