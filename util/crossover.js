let util = require('./util');
let { Genome } = require("../models/Genome");

class Crossover {
  // Take in two genomes assume the first parent to be fit
  // TODO: maybe check here which parent is more fit
  mating (parent1, parent2) {
    // Create a child genome
    let child = new Genome();

    parent1.neurons.forEach(neuron => {
      child.pushNeuron(neuron.neuron);
    });

    parent1.synapses.forEach(synapse => {
      if (parent2.synapses.id == synapse.id) {
        child.pushSynapse(util.randBool() ? synapse.synapse : parent2.synapse.synapse);
      } else {
        child.pushSynapse(synapse.synapse);
      }
    });

    return child;
  }
}

exports.Crossover = Crossover;
