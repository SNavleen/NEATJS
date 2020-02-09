let { InnovationNumber } = require("./InnovationNumber");
let innovationNumber = new InnovationNumber();

class Synapse {
  constructor(in_neuron = null, out_neuron = null, weight = 0, expressed = true, id = innovationNumber.id) {
    this.id = id;
    this.in_neuron = in_neuron;
    this.out_neuron = out_neuron;
    this.weight = weight;
    this.expressed = expressed;
  }

  copy() {
    return new Synapse (this.in_neuron, this.out_neuron, this.weight, this.expressed, this.id);
  }

  clone() {
    var proto = Object.getPrototypeOf(this);
    var clone = Object.create(proto);

    clone.in_neuron = this.in_neuron;
    clone.out_neuron = this.out_neuron;
    clone.weight = this.weight;
    clone.expressed = this.expressed;
    clone.id = this.id;

    return clone;
  }
}

exports.Synapse = Synapse