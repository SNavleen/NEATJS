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
    this._global_neurons = globalNeurons.neurons;
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
}

exports.Genome = Genome;