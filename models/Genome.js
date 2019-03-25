class GlobalSynapses {

  constructor () {
      this._synapses = [];
  }

  get synapses () {
      return this._synapses;
  }
}
class GlobalNeurons {

  constructor () {
      this._neurons = [];
  }

  get neurons () {
      return this._neurons;
  }
}

let globalSynapse = new GlobalSynapses();
let globalNeurons = new GlobalNeurons();

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
  get global_neurons () {
    return this._global_neurons;
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
  globalNeuronsSize () {
    return this._global_neurons.length;
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
  pushGlobalNeuron (neuron) {
    this._global_neurons.push({ id: neuron.id, neuron: neuron });
  }
}

exports.Genome = Genome;