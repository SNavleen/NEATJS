let { Neuron, Type } = require("./Neuron");
let { Synapse } = require("./Synapse");
let { Mutation } = require("../util/mutation");

class Genome extends Mutation {
  constructor() {
    super();

    this._neurons = [];
    this._synapses = [];

    this._Type = Type;
    this._Neuron = Neuron;
    this._Synapse = Synapse;
  }

  get Type () {
    return this._Type;
  }
  get Neuron () {
    return this._Neuron;
  }
  get Synapse () {
    return this._Synapse;
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