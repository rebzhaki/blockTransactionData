import { ethers } from "ethers";
import { Settings } from "../config";

export const _wssProvider = new ethers.providers.WebSocketProvider(
  Settings.WSS_URL!
);

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
