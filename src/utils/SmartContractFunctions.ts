import { BigNumberish, BrowserProvider, Contract } from "ethers";

export const docadelicSmartContractAddress =
  "0x54154A3240c4e030aade6F47c4eD378E4Bd4EAFd";
export const docadelicSmartContractAbi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "paramNewIpfsFile",
        type: "string",
      },
    ],
    name: "createNewFile",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "paramFileId",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "paramNewIpfsVersion",
        type: "string",
      },
    ],
    name: "editFile",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "paramUser",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "paramFileId",
        type: "uint256",
      },
    ],
    name: "getFileLastVersion",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "paramUser",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "paramFileId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "paramFileVersion",
        type: "uint256",
      },
    ],
    name: "getFileVersion",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "paramUser",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "paramFileId",
        type: "uint256",
      },
    ],
    name: "getUserFileVerionsQuantity",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "paramUser",
        type: "address",
      },
    ],
    name: "getUserTotalFiles",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

export async function connectUser(provider: BrowserProvider) {
  await provider.send("eth_requestAccounts", []);
  const signer = await provider.getSigner();
  return await signer.getAddress();
}

export async function createNewFile(
  paramNewFileIpfsHash: string,
  docadelicSmartContractInstance: Contract
) {
  //EN EL FRONT SE LE AÑADE LO QUE SE LE AGREGA AL DOCUMENTO Y CUANDO SE TERMINO SI CLICKEA EN SAVE, SE PROCESA EN IPFS OBTENIENOD SU HASH Y SE GUARDA EL NUEVO DOCUMENTO EN EL FOLDER DEL USUARIO EN EL SMART CONTRACT.///
  await docadelicSmartContractInstance.createNewFile(paramNewFileIpfsHash);
}

export async function editFile(
  paramFileId: BigNumberish,
  paramNewIpfsHashVersion: string,
  docadelicSmartContractInstance: Contract
) {
  //UNA VEZ SE MODIFICO EN EL FROT EL CONTENIDO DEL ARCHIVO, SE PROCESA EN IPFS SU NUEVO HASHA Y FINALMENTE SE GUARDA LA NUEVA VERSION EN EL SMARTCONTRACT.///
  await docadelicSmartContractInstance.editFile(
    paramFileId,
    paramNewIpfsHashVersion
  );
}

export async function consultFileLastVersion(
  paramFileId: BigNumberish,
  userAddress: string,
  docadelicSmartContractInstance: Contract
) {
  return await docadelicSmartContractInstance.getFileLastVersion(
    userAddress,
    paramFileId
  );
}

export async function consultFileSpecificVersion(
  paramFileId: BigNumberish,
  userAddress: string,
  paramFileVersion: BigNumberish,
  docadelicSmartContractInstance: Contract
) {
  return await docadelicSmartContractInstance.getFileVersion(
    userAddress,
    paramFileId,
    paramFileVersion
  );
  //UNA VEZ OBTENIDO EL HASH DESDE IPFS SE MUESTRA SU CONTENIDO.///
}

export async function displayUserFiles(
  userAddress: string,
  docadelicSmartContractInstance: Contract
) {
  const userFiles = await docadelicSmartContractInstance.getUserTotal(
    userAddress
  );
  return userFiles.toNumber();
  //POR CADA FILE RETORNADO HAY QUE HACER UNA MINIVIEW QUE LE MUESTRE EL DOCUMENTO Y QUE AL CLICKEAR SE VAYA A CONSULTAR A ESE FILE EN SU ULTIMA VERSION.///
  //EN UN FOR SE VA MOSTRANDO CADA MINIVIEW DE LOS ARCHIVOS.
}

export async function consultFileVersions(
  paramFileId: BigNumberish,
  userAddress: string,
  docadelicSmartContractInstance: Contract
) {
  //DENTRO DEL FILE VIEW SE CONSULTAN LAS VERSIONES DE ESE FILE EN ESPECIFICO.///
  const fileVersions =
    await docadelicSmartContractInstance.getUserFileVerionsQuantity(
      userAddress,
      paramFileId
    );
  return fileVersions.toNumber();
}
