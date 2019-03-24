const Type = {
  INPUT: "Input",
  HIDDEN: "Hidden",
  OUTPUT: "Output",
}

class Neuron {
  constructor(id = 0, type = null) {
    this._id = id;
    this._type = type;
  }
  get id (){
    return this._id;
  }
  get type (){
    return this._type;
  }
}

exports.Type = Type;
exports.Neuron = Neuron