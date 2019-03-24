let util = require('./util');
let { Synapse } = require("../models/Synapse");
let { Neuron, Type } = require("../models/Neuron");

// Get a randome neuron from the neurons array of objects
function _getRandomNeuron (neuron) {
  return neuron.id === this.id ? neuron : null;
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
  addSynapse () {

    // TODO: input and output both can not be input or output neuron
    // Get a random input neuron
    let input = this.neurons.filter (
      _getRandomNeuron,
      {
        id: util.randRangeInt(0, this.neuronsSize())
        // id: 0
      }
    )[0];
    // Get a random output neuron
    let output = this.neurons.filter (
      _getRandomNeuron,
      {
        id: util.randRangeInt(0, this.neuronsSize())
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
    // console.log(input);
    // console.log(output);

    // Check if synapse with the same input and output neuron exist
    let synapseExists = this.synapses.some (
      _checkIfSynapseExists,
      {
        in_neuron: input.neuron,
        out_neuron: output.neuron
      }
    );
    // console.log(synapseExists);

    if (synapseExists) {
      return;
    }

    // Create the new synapse if it doesnt already exist
    let new_synapse = new Synapse(input.neuron, output.neuron);

    // Weight for the new Synapse between -2 and 2
    new_synapse.weight = util.randRangeFloat(-2, 2);
    // console.log(new_synapse);

    // Add the synapse to the genome list of synapses
    this.synapses.push({ id: new_synapse.id, synapse: new_synapse });
  }
}


exports.Mutation = Mutation