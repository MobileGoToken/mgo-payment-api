const Web3 = require('web3');

const { eth } = require('../../config');
const txRepo = require('../repository/transaction');
const fundRepo = require('../repository/fund');

const txService = require('../services/transaction');

const web3 = new Web3(new Web3.providers.WebsocketProvider(eth.rpc), eth.net.options);

let broadcastedInProgress = false;
let fundedInProgress = false;

web3.eth.subscribe('newBlockHeaders', () => {
  Promise.all([
    checkBroadcasted(),
    checkFunded(),
  ]);
});

const checkBroadcasted = async () => {
  try {
    if (!broadcastedInProgress) {
      broadcastedInProgress = true;
      const txs = await txRepo.getTransactions('broadcasted');

      await Promise.all(txs.map(async (tx) => {
        const transaction = await web3.eth.getTransactionReceipt(tx.hash);
        if (transaction.status) {
          txRepo.updateTxStatus(tx, 'confirmed');
          if (tx.Fund) {
            txService.sendFundedTokens(tx.Fund);
          }
        }
      }));
    }
  } catch (err) {
    console.error(err);
  } finally {
    broadcastedInProgress = false;
  }
};

const checkFunded = async () => {
  try {
    if (!fundedInProgress) {
      fundedInProgress = true;

      const txs = await fundRepo.getFundsByStatus('funded');
      await Promise.all(txs.map(async (tx) => {
        const transaction = await web3.eth.getTransactionReceipt(tx.Fund.hash);
        if (transaction && transaction.status) {
          fundRepo.updateStatusByHmac(tx.Fund.hmac, 'funded', 'confirmed', tx.Fund.type);
          txService.sendTransaction(tx);
        }
      }));
    }
  } catch (err) {
    console.error(err);
  } finally {
    fundedInProgress = false;
  }
};
