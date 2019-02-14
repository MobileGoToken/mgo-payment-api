const Web3 = require('web3');

const { eth } = require('../../config');
const {
  getTransactions,
  updateTxStatus,
} = require('../repository/transaction');

const web3 = new Web3(new Web3.providers.WebsocketProvider(eth.rpc), eth.net.options);


let broadcastedInProgress = false;

web3.eth.subscribe('newBlockHeaders', (err) => {
  if (err) {
    // TODO: enable sentry
    return console.log(err);
  }
  return checkBroadcasted();
});

const checkBroadcasted = async () => {
  try {
    if (!broadcastedInProgress) {
      broadcastedInProgress = true;
      const txs = await getTransactions('broadcasted');

      await Promise.all(txs.map(async (tx) => {
        const transaction = await web3.eth.getTransactionReceipt(tx.hash);
        if (transaction.status) {
          updateTxStatus(tx, 'confirmed');
        }
      }));
    }
  } catch (err) {
    console.error(err);
  } finally {
    broadcastedInProgress = false;
  }
};
