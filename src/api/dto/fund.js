
class Fund {
  constructor(txData) {
    this.from = txData.from;
    this.to = txData.to;
    this.value = txData.value;
    this.data = txData.data || undefined;
    this.type = txData.type;
  }
}

module.exports = Fund;
