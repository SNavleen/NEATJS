let util = require('./util');
let { Neuron, Type } = require("../models/Neuron");
let { Synapse } = require("../models/Synapse");


class Mutation {

  async addSynapse (genome) {
    // Get a random input neuron
    let input = genome.getRandomNeuron();
    // Get a random output neuron
    let output = genome.getRandomNeuron();
    while (true) {
      if (input.neuron.type == Type.INPUT && output.neuron.type == Type.INPUT ||
        input.neuron.type == Type.OUTPUT && output.neuron.type == Type.OUTPUT) {
          // Get a random input neuron
          input = genome.getRandomNeuron();
          // Get a random output neuron
          output = genome.getRandomNeuron();
      } else {
        break;
      }
    }

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
    let synapseExistsInLocal = genome.getSynapse(genome.synapses, input.neuron, output.neuron) == undefined ? false : true;
    let synapseExistsInGlobal = genome.getSynapse(genome.global_synapses, input.neuron, output.neuron) == undefined ? false : true;

    // Do nothing if that synapseExists
    if (synapseExistsInGlobal && synapseExistsInLocal) {
      return;
    }
    // // Create the new synapse if it doesnt already exist
    // let new_synapse = new Synapse(input.neuron, output.neuron, util.randRangeFloat(-2, 2));

    if(synapseExistsInGlobal && !synapseExistsInLocal) {
      let synapse = genome.getSynapse (genome.global_synapses, input.neuron, output.neuron);
      // Get synapse that exists in global array and modify it for the local version
      // console.log(synapse.id);
      let new_synapse = new Synapse(input.neuron, output.neuron, util.randRangeFloat(-2, 2), synapse.expressed, synapse.id);

      // Add the synapse to the genome list of synapses
      genome.pushSynapse(new_synapse);
    }
    if(!synapseExistsInGlobal && !synapseExistsInLocal) {
      // Create the new synapse if it doesnt already exist
      let new_synapse = new Synapse(input.neuron, output.neuron, util.randRangeFloat(-2, 2));

      // Add the synapse to the genome list of synapses
      genome.pushSynapse(new_synapse);
      genome.pushGlobalSynapse(new_synapse);
    }
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
    genome.pushNeuron(new_neuron);
    // Add the two new synapse to the genome list of synapses
    genome.pushSynapse(new_synapse1);
    genome.pushSynapse(new_synapse2);
  }
}


exports.Mutation = Mutation