let { Mutation } = require("./util/mutation");
let { Crossover } = require("./util/crossover");

let { Neuron, Type } = require("./models/Neuron");
let { Synapse } = require("./models/Synapse");
let { Genome } = require("./models/Genome");
// let { Species } = require("./models/Species");

let mutation = new Mutation();
let crossover = new Crossover();

// let species = new Species();

let genome1 = new Genome();
for (let i = 0; i < 3; i++) {
  genome1.pushNeuron(new Neuron(i+1, Type.INPUT));
}
genome1.pushNeuron(new Neuron(4, Type.OUTPUT));
genome1.pushNeuron(new Neuron(5, Type.HIDDEN));
genome1.pushSynapse(new Synapse(1, 4, 1, true, 1));
genome1.pushSynapse(new Synapse(2, 4, 1, false, 2));
genome1.pushSynapse(new Synapse(3, 4, 1, true, 3));
genome1.pushSynapse(new Synapse(2, 5, 1, true, 4));
genome1.pushSynapse(new Synapse(5, 4, 1, true, 5));
genome1.pushSynapse(new Synapse(1, 5, 1, true, 8));

let genome2 = new Genome();
for (let i = 0; i < 3; i++) {
  genome2.pushNeuron(new Neuron(i+1, Type.INPUT));
}
genome2.pushNeuron(new Neuron(4, Type.OUTPUT));
genome2.pushNeuron(new Neuron(5, Type.HIDDEN));
genome2.pushNeuron(new Neuron(6, Type.HIDDEN));
genome2.pushSynapse(new Synapse(1, 4, 1, true, 1));
genome2.pushSynapse(new Synapse(2, 4, 1, false, 2));
genome2.pushSynapse(new Synapse(3, 4, 1, true, 3));
genome2.pushSynapse(new Synapse(2, 5, 1, true, 4));
genome2.pushSynapse(new Synapse(5, 4, 1, false, 5));
genome2.pushSynapse(new Synapse(5, 6, 1, true, 6));
genome2.pushSynapse(new Synapse(6, 4, 1, true, 7));
genome2.pushSynapse(new Synapse(3, 5, 1, true, 9));
genome2.pushSynapse(new Synapse(1, 6, 1, true, 10));

let childGenome = crossover.mating(genome2, genome1);


// console.log(childGenome);


let nodes = [];
let edges = [];

childGenome.neurons.forEach(neuron => {
  // console.log(neuron);
  nodes.push({data: {id: "neuron: " + neuron.neuron.id, label: neuron.neuron.type}});
});

childGenome.synapses.forEach(synapse => {
  // console.log(synapse);
  if (synapse.synapse.expressed) {
    edges.push({data: {id: "synapse: " + synapse.synapse.id, label: synapse.synapse.weight, source: "neuron: " + synapse.synapse.in_neuron, target: "neuron: " + synapse.synapse.out_neuron}});
  }
});

console.log(nodes);
console.log(edges);


// elements: {
//   nodes:[
//     {data: { id: 0 }},
//     {data: { id: 1 }},
//   ],
//   edges:[
//     {data: {id: "e1", source: 0, target: 1 }},
//   ]
// }
var express = require('express');
var app = require('express')();
app.set('view engine', 'ejs');

// what port to run server on
app.listen(3000, function () {
  console.log('Running on 3000');
});

//Serve static files
app.use(express.static('public'));



//localhost will lead to craig.html
app.get('/', function (req, res) {
  res.render('index');
});
