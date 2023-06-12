//SPDX-License-Identifier: MIT

pragma solidity 0.8.10;

contract Docadelic
{
    struct versionsStruct
    {
        string[] versionsArray;
    }

    struct folderStruct
    {
        versionsStruct[] folderArray;
    }





    mapping(address => folderStruct) private userFiles;





    folderStruct userFolderHelper;
    versionsStruct fileVersionsHelper;





	//Creates a new file with its first version (ipfs hash).
	function createNewFile(string memory paramNewIpfsFile) public
	{
		versionsStruct memory newFile;
        fileVersionsHelper = newFile;
        
		fileVersionsHelper.versionsArray.push(paramNewIpfsFile);

		userFolderHelper = userFiles[msg.sender];
		userFolderHelper.folderArray.push(fileVersionsHelper);

		userFiles[msg.sender] = userFolderHelper;
	}

	//Add a new version of the file (ipfs hash) to the versionsArray.
	function editFile(uint paramFileId, string memory paramNewIpfsVersion) public
	{
		userFolderHelper = userFiles[msg.sender];

		require(paramFileId >= 0 && paramFileId < userFolderHelper.folderArray.length, "No existe el archivo al que se trata de acceder.");
		
		userFolderHelper.folderArray[paramFileId].versionsArray.push(paramNewIpfsVersion);

		userFiles[msg.sender] = userFolderHelper;
	}

	//Returns the last version of a file (ipfs hash).
	function getFileLastVersion(address paramUser, uint paramFileId) public view returns(string memory)
	{
		require(paramFileId >= 0 && paramFileId < userFiles[paramUser].folderArray.length, "No existe el archivo al que se trata de acceder.");

		uint fileLastVersion = userFiles[paramUser].folderArray[paramFileId].versionsArray.length;
		fileLastVersion = fileLastVersion - 1;

		return userFiles[paramUser].folderArray[paramFileId].versionsArray[fileLastVersion];
	}

	//Returns a specific version of a file (ipfs hash).
	function getFileVersion(address paramUser, uint paramFileId, uint paramFileVersion) public view returns(string memory)
	{
		require(paramFileId >= 0 && paramFileId < userFiles[paramUser].folderArray.length, "No existe el archivo al que se trata de acceder.");
		require(paramFileVersion >= 0 && paramFileVersion < userFiles[paramUser].folderArray[paramFileId].versionsArray.length, "No existe la version del archivo a la que se trata de acceder.");

		return userFiles[paramUser].folderArray[paramFileId].versionsArray[paramFileVersion];
	}

	//Returns the actual number of user files, not the index of the last file.
	function getUserTotalFiles(address paramUser) public view returns(uint)
	{
		return userFiles[paramUser].folderArray.length;
	}

	//Returns the actual number of versions of a user file, not the index.
	function getUserFileVerionsQuantity(address paramUser, uint paramFileId) public view returns(uint)
	{
		require(paramFileId >= 0 && paramFileId < userFiles[paramUser].folderArray.length, "No existe el archivo al que se trata de accerder.");

		return userFiles[paramUser].folderArray[paramFileId].versionsArray.length;
	}
}
