class GlobalSynapses {

    constructor () {
        this._synapses = [];
    }

    get synapses () {
        return this._synapses;
    }
}

module.exports.GlobalSynapses = new GlobalSynapses();