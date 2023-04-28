import { ethers } from "ethers";
import {
  getBlock,
  getTransactionHash,
  _wssProvider,
  // getAllBlockNumbers,
  getWalletTrans,
  getTransactionSpecifiedData,
} from "./common";
import { Settings } from "./config";
import { ExportToCsv } from "export-to-csv";

export const BlockNumber = async () => {
  console.log("Hello World!");
  let walletAddress = "0xC2b1fFAa03fde1Fc3d5C2Db1E4187e13F51f9D03";
  let completeData = [];

  try {
    let transData = await getTransactionSpecifiedData(walletAddress).then(
      (result) => {
        return result;
      }
    );

    const timestamp = "Apr-12-2023 04:15:12 PM +UTC";
    const unixTimestamp = Math.floor(Date.parse(timestamp) / 1000);

    for (let j = 0; j < transData.length; j++) {
      const element = transData[j];
      const timestamp: number | undefined = element.timestamp;
      console.log("rr", timestamp);

      if (element.to == "0xC2b1fFAa03fde1Fc3d5C2Db1E4187e13F51f9D03") {
        completeData.push({
          hash: element.hash,
          value: ethers.utils.formatEther(element.value) + " ETH",
          address: element.from,
        });
      }
    }

    console.log("comp;lete", completeData);

    //access block number for transactions in a wallet then access all transactions

    // let blockNumber = await getWalletTrans(
    //   "0xC2b1fFAa03fde1Fc3d5C2Db1E4187e13F51f9D03"
    // ).then((result) => {
    //   return result;
    // });

    // console.log("rr", blockNumber!);

    // for (let j = 0; j < blockNumber.length; j++) {
    //   const element = blockNumber[j];

    //   const output = await getBlock(Settings.block_Number!);
    //   const txHash = output?.transactions;
    //   // console.log("output", txHash);
    //   var data = [];
    //   const options = {
    //     fieldSeparator: ",",
    //     quoteStrings: '"',
    //     decimalSeparator: ".",
    //     showLabels: true,
    //     showTitle: true,
    //     title: "My Awesome CSV",
    //     useTextFile: false,
    //     useBom: true,
    //     useKeysAsHeaders: true,
    //     // headers: ['Column 1', 'Column 2', etc...], <-- Won't work with useKeysAsHeaders present!
    //     additionalHeaders: [
    //       { columns: ["HeaderRow1Column1", "HeaderRow1Column2"] },
    //       { columns: ["HeaderRow2Column1", "HeaderRow2Column2"] },
    //     ],
    //   };

    //   const csvExporter = new ExportToCsv(options);

    //   for (let index = 0; index < txHash?.length!; index++) {
    //     // console.log("TX DATA", txHash?.[0]!);
    //     const receipt = await getTransactionHash(txHash?.[index]!);

    //     data.push({
    //       index: index,
    //       TransactionHash: txHash?.[index]!,
    //       GasLimit: receipt?.gasLimit.toNumber(),
    //       GasPrice: ethers.utils.formatEther(receipt?.gasPrice!),
    //     });
    //   }

    //   var csvdata = csvExporter.generateCsv(data, true);
    //   console.log("eeee", csvdata);
    // }
  } catch (error) {
    console.log("errrrrr", error);
  }
};
