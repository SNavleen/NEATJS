class Species {
  constructor() {
    this._genomes = [];
  }

  get genomes () {
    return this._genomes;
  }

  genomesSize () {
    return this._genomes.length;
  }

  // pushGenome (genome) {
  //   this._genomes.push(genome);
  // }
}

exports.Species = Species;
