class Brother {
  constructor(db) {
    this.collection = db.collection('brothers');
  }
  async getBrothers() {
    const brotherList = await this.collection.find().toArray();
    return brotherList;
  }
}
module.exports = Brother;
