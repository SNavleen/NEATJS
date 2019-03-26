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
for (let i = 0; i < 5; i++) {
  genome1.pushNeuron(new Neuron(i, Type.INPUT));
}
for (let i = 5; i < 7; i++) {
  genome1.pushNeuron(new Neuron(i, Type.OUTPUT));
}
for (let i = 7; i < 10; i++) {
  genome1.pushNeuron(new Neuron(i, Type.HIDDEN));
}
for (let i = 0; i < 10; i++) {
  mutation.addSynapse(genome1);
}
// genome1.pushSynapse(new Synapse(1, 4, 1, true, 1));
// genome1.pushSynapse(new Synapse(2, 4, 1, false, 2));
// genome1.pushSynapse(new Synapse(3, 4, 1, true, 3));
// genome1.pushSynapse(new Synapse(2, 5, 1, true, 4));
// genome1.pushSynapse(new Synapse(5, 4, 1, true, 5));
// genome1.pushSynapse(new Synapse(1, 5, 1, true, 8));

let genome2 = new Genome();
for (let i = 0; i < 5; i++) {
  genome2.pushNeuron(new Neuron(i, Type.INPUT));
}
for (let i = 5; i < 7; i++) {
  genome2.pushNeuron(new Neuron(i, Type.OUTPUT));
}
for (let i = 7; i < 10; i++) {
  genome2.pushNeuron(new Neuron(i, Type.HIDDEN));
}
for (let i = 0; i < 10; i++) {
  mutation.addSynapse(genome2);
}
// genome2.pushSynapse(new Synapse(1, 4, 1, true, 1));
// genome2.pushSynapse(new Synapse(2, 4, 1, false, 2));
// genome2.pushSynapse(new Synapse(3, 4, 1, true, 3));
// genome2.pushSynapse(new Synapse(2, 5, 1, true, 4));
// genome2.pushSynapse(new Synapse(5, 4, 1, false, 5));
// genome2.pushSynapse(new Synapse(5, 6, 1, true, 6));
// genome2.pushSynapse(new Synapse(6, 4, 1, true, 7));
// genome2.pushSynapse(new Synapse(3, 5, 1, true, 9));
// genome2.pushSynapse(new Synapse(1, 6, 1, true, 10));

let childGenome = crossover.mating(genome2, genome1);


console.log("Genome1: ");
console.log(genome1.neurons);
console.log(genome1.synapses);
console.log("\n");
console.log("Genome2: ");
console.log(genome2.neurons);
console.log(genome2.synapses);
console.log("\n");
console.log("Genome Global: ");
console.log(genome1.global_synapses);
// console.log(genome1);
// console.log(genome2);
// console.log(childGenome);




let express = require('express');
let app = express();
let http = require('http').Server(app);
let io = require('socket.io')(http);

app.set('view engine', 'ejs');

//Serve static files
app.use(express.static('public'));


app.get('/child', function (req, res) {
  let nodes = [];
  let edges = [];

  childGenome.neurons.forEach(neuron => {
    nodes.push(
      {
        data: {
          id: "neuron: " + neuron.neuron.id,
          label: neuron.neuron.type
        }
      }
    );
  });

  childGenome.synapses.forEach(synapse => {
    if (synapse.synapse.expressed) {
      edges.push(
        {
          data: {
            id: "synapse: " + synapse.synapse.id,
            label: synapse.synapse.weight,
            source: "neuron: " + synapse.synapse.in_neuron.id,
            target: "neuron: " + synapse.synapse.out_neuron.id
          }
        }
      );
    }
  });

  io.on('connection', function (socket) {
    socket.emit('genome', {nodes: nodes, edges: edges});
  });
  res.render('index');
});

app.get('/parent1', function (req, res) {
  let nodes = [];
  let edges = [];

  genome1.neurons.forEach(neuron => {
    nodes.push(
      {
        data: {
          id: "neuron: " + neuron.neuron.id,
          label: neuron.neuron.type
        }
      }
    );
  });

  genome1.synapses.forEach(synapse => {
    if (synapse.synapse.expressed) {
      edges.push(
        {
          data: {
            id: "synapse: " + synapse.synapse.id,
            label: synapse.synapse.weight,
            source: "neuron: " + synapse.synapse.in_neuron.id,
            target: "neuron: " + synapse.synapse.out_neuron.id
          }
        }
      );
    }
  });

  io.on('connection', function (socket) {
    socket.emit('genome', {nodes: nodes, edges: edges});
  });
  res.render('index');
});

app.get('/parent2', function (req, res) {
  let nodes = [];
  let edges = [];

  genome2.neurons.forEach(neuron => {
    nodes.push(
      {
        data: {
          id: "neuron: " + neuron.neuron.id,
          label: neuron.neuron.type
        }
      }
    );
  });

  genome2.synapses.forEach(synapse => {
    if (synapse.synapse.expressed) {
      edges.push(
        {
          data: {
            id: "synapse: " + synapse.synapse.id,
            label: synapse.synapse.weight,
            source: "neuron: " + synapse.synapse.in_neuron.id,
            target: "neuron: " + synapse.synapse.out_neuron.id
          }
        }
      );
    }
  });

  io.on('connection', function (socket) {
    socket.emit('genome', {nodes: nodes, edges: edges});
  });
  res.render('index');
});


http.listen(3000, function(){
  console.log('listening on *:3000');
});
