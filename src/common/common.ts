import { ethers } from "ethers";
import { Settings } from "../config";

const startTime = Math.floor(Date.parse("2023-01-01") / 1000);
const endTime = Math.floor(new Date("2023-04-27").getTime() / 1000);

export const _wssProvider = new ethers.providers.WebSocketProvider(
  Settings.WSS_URL!
);

export const getWalletTrans = async (address: string) => {
  const provider = new ethers.providers.EtherscanProvider(5);
  let allAddresses = await provider.getHistory(address);
  let block_Number = [];

  for (let i = 0; i < allAddresses.length; i++) {
    block_Number.push(allAddresses[i].blockNumber);
  }
  return block_Number;
};

export const getBlock = async (block_Number: any) => {
  try {
    return _wssProvider.getBlock(block_Number);
  } catch (error) {
    console.log("error getting the txHash", error);
  }
};

export const getTransactionHash = async (txHash: string) => {
  try {
    return _wssProvider.getTransaction(txHash);
  } catch (error) {
    console.log("error getting the txHash", error);
  }
};

export const getTransactionSpecifiedData = async (address: string) => {
  // const startBlock = await _wssProvider.;
  const provider = new ethers.providers.EtherscanProvider(5);
  let allAddresses = await provider.getHistory(address);
  let transdata = [];
  let block_number = [];

  // for (let i = 0; i < allAddresses.length; i++) {
  //   block_number.push(allAddresses[i].blockNumber);
  //   console.log("mm", block_number);
  // }
  // for (let n = 0; n < block_number; n++) {
  //   const block = await _wssProvider._getBlock(n);
  //   if (block.timestamp >= startTime) {
  //     blockNumbers.push(n);
  //   }
  // }

  for (let i = 0; i < allAddresses.length; i++) {
    transdata.push(allAddresses[i]);
    // console.log("alldataaa", allAddresses[i]);
  }
  return transdata;
};
