let { InnovationNumber } = require("./InnovationNumber");
let innovationNumber = new InnovationNumber();

class Species {
  constructor(averageFitness = 0, sumAdjustedFitness = 0, extinctionCounter = 0, id = innovationNumber.id) {
    this.id = id;
    this.genomes = [];
    this.averageFitness = averageFitness;
    this.sumAdjustedFitness = sumAdjustedFitness;
    this.extinctionCounter = extinctionCounter;
    this.candidateGenome = [];
  }

  genomesSize () {
    return this.genomes.length;
  }

  pushGenome (genome) {
    this.genomes.push(genome);
  }
}

exports.Species = Species;
