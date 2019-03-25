let util = require('../util/util');

// Compare all the synapse with the new input and output neuron
function _checkIfSynapseExists (synapse) {
  if (synapse.synapse.in_neuron === this.in_neuron &&
    synapse.synapse.out_neuron === this.out_neuron) {
      return true;
  }
  return false;
}
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

  checkIfSynapseExists (synapses, in_neuron, out_neuron) {
    return synapses.some (
      _checkIfSynapseExists,
      {
        in_neuron: in_neuron,
        out_neuron: out_neuron
      }
    );
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