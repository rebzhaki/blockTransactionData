import { ethers } from "ethers";
import { getBlock, getTransactionHash, _wssProvider } from "./common";
import { Settings } from "./config";
import { ExportToCsv } from "export-to-csv";

export const BlockNumber = async () => {
  console.log("Hello World!");

  try {
    const output = await getBlock(Settings.block_Number!);
    const txHash = output?.transactions;
    // console.log("output", txHash);
    var data = [];
    const options = {
      fieldSeparator: ",",
      quoteStrings: '"',
      decimalSeparator: ".",
      showLabels: true,
      showTitle: true,
      title: "My Awesome CSV",
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
      // headers: ['Column 1', 'Column 2', etc...], <-- Won't work with useKeysAsHeaders present!
      additionalHeaders: [
        { columns: ["HeaderRow1Column1", "HeaderRow1Column2"] },
        { columns: ["HeaderRow2Column1", "HeaderRow2Column2"] },
      ],
    };

    const csvExporter = new ExportToCsv(options);

    for (let index = 0; index < txHash?.length!; index++) {
      // console.log("TX DATA", txHash?.[0]!);
      const receipt = await getTransactionHash(txHash?.[index]!);

      data.push({
        index: index,
        TransactionHash: txHash?.[index]!,
        GasLimit: receipt?.gasLimit.toNumber(),
        GasPrice: ethers.utils.formatEther(receipt?.gasPrice!),
      });
    }
    var csvdata = csvExporter.generateCsv(data, true);
    console.log("eeee", csvdata);
  } catch (error) {
    console.log("errrrrr", error);
  }
};
