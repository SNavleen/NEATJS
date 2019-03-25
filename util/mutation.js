let util = require('./util');
let { Neuron, Type } = require("../models/Neuron");
let { Synapse } = require("../models/Synapse");


// Get a randome neuron from the neurons array of objects
function _getRandomNeuron (neuron) {
  return neuron.id === this.id ? neuron : null;
}
// Get a randome synapse from the synapses array of objects
function _getRandomSynapse (synapse) {
  return synapse.id === this.id ? synapse : null;
}
// Compare all the synapse with the new input and output neuron
function _checkIfSynapseExists (synapse) {
  if (synapse.synapse.in_neuron === this.in_neuron &&
    synapse.synapse.out_neuron === this.out_neuron) {
      return true;
  }
  return false;
}


class Mutation {

  addSynapse (genome) {
    // TODO: input and output both can not be input or output neuron
    // Get a random input neuron
    let input = genome.neurons.filter (
      _getRandomNeuron,
      {
        id: util.randRangeInt(0, genome.neuronsSize())
        // id: 0
      }
    )[0];
    // Get a random output neuron
    let output = genome.neurons.filter (
      _getRandomNeuron,
      {
        id: util.randRangeInt(0, genome.neuronsSize())
        // id: 3
      }
    )[0];

    // Stop the links from hidden-input/ output-hidden/ output-input from happening
    if (input.neuron.type == Type.HIDDEN && output.neuron.type == Type.INPUT ||
        input.neuron.type == Type.OUTPUT && output.neuron.type == Type.HIDDEN ||
        input.neuron.type == Type.OUTPUT && output.neuron.type == Type.INPUT) {

      // Use a tmp variable to swap input and output neuron
      let tmp = input;
      input = output;
      output = tmp;
    }

    // Check if synapse with the same input and output neuron exist
    // TODO: should i be checking the global or local synapses? (if so create a global)
    let synapseExists = genome.synapses.some (
      _checkIfSynapseExists,
      {
        in_neuron: input.neuron,
        out_neuron: output.neuron
      }
    );

    // Do nothing if that synapseExists
    if (synapseExists) {
      return;
    }

    // Create the new synapse if it doesnt already exist
    let new_synapse = new Synapse(input.neuron, output.neuron);

    // Weight for the new Synapse between -2 and 2
    new_synapse.weight = util.randRangeFloat(-2, 2);
    // console.log(new_synapse);

    // Add the synapse to the genome list of synapses
    genome.pushSynapse(new_synapse);
  }

  addNeuron (genome) {
    // Exit if we have 0 synapse
    if (genome.synapsesSize() == 0) {
      return
    }

    // Get a random synapse
    let synapse = genome.synapses[util.randRangeInt(0, genome.synapsesSize())];

    // Cannot split a disabled neuron
    if (!synapse.synapse.expressed) {
      return
    }

    // Get the input and output neuron from the synapse being split
    let in_neuron = synapse.synapse.in_neuron;
    let out_neuron = synapse.synapse.out_neuron;

    // Get the weight from the syapse being split
    let weight = synapse.synapse.weight;

    // Disable the synapse
    synapse.synapse.expressed = false;

    // Create a new neuron and two new syanpse
    let new_neuron = new Neuron(genome.neuronsSize(), Type.HIDDEN);
    let new_synapse1 = new Synapse(in_neuron, new_neuron, 1);
    let new_synapse2 = new Synapse(new_neuron, out_neuron, weight);

    // Add the new neuron to the genome list of neurons
    this.pushNeuron(new_neuron);
    // Add the two new synapse to the genome list of synapses
    this.pushSynapse(new_synapse1);
    this.pushSynapse(new_synapse2);
  }
}


exports.Mutation = Mutation