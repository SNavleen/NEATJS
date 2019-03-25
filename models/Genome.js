class Genome {
  constructor() {
    this._neurons = [];
    this._synapses = [];
  }

  get neurons () {
    return this._neurons;
  }
  get synapses () {
    return this._synapses;
  }

  neuronsSize () {
    return this._neurons.length;
  }
  synapsesSize () {
    return this._synapses.length;
  }

  pushNeuron (neuron) {
    this._neurons.push({ id: neuron.id, neuron: neuron });
  }
  pushSynapse (synapse) {
    this._synapses.push({ id: synapse.id, synapse: synapse });
  }
}

exports.Genome = Genome;