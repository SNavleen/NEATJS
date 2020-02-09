const Type = {
  INPUT: "Input",
  HIDDEN: "Hidden",
  OUTPUT: "Output",
}

class Neuron {
  constructor(id = 0, type = null) {
    this.id = id;
    this.type = type;
  }
}

exports.Type = Type;
exports.Neuron = Neuron;