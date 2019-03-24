let { InnovationNumber } = require("./InnovationNumber");
// let innovationNumber =  new InnovationNumber().instance;

class Synapse {
  constructor(in_neuron = null, out_neuron = null, weight = 0, expressed = true) {
    this._id = InnovationNumber.id;
    this._in_neuron = in_neuron;
    this._out_neuron = out_neuron;
    this._weight = weight;
    this._expressed = expressed;
  }

  get id (){
    return this._id;
  }
  get in_neuron (){
    return this._in_neuron;
  }
  get out_neuron (){
    return this._out_neuron;
  }
  get weight (){
    return this._weight;
  }
  get expressed (){
    return this._expressed;
  }

  set weight (value){
    this._weight = value;
  }
  set expressed (value){
    this._expressed = value;
  }
}

exports.Synapse = Synapse