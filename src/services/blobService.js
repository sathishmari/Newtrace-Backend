const dotenv = require("dotenv");
dotenv.config();
const { BlobServiceClient, StorageSharedKeyCredential } = require('@azure/storage-blob');
const { util: { formatErrorResponse, ERROR } } = require('../helper');
const { constant: { Messages, permissions } } = require('../constants');

const deleteBlob = async (blobName, containerName) => {

    const accountName = process.env.Azure_Storage_AccountName;
    const accountKey = process.env.Azure_Storage_AccountKey;
    const sharedKeyCredential = new StorageSharedKeyCredential(accountName, accountKey);
    const blobServiceClient = new BlobServiceClient(`https://${accountName}.blob.core.windows.net`, sharedKeyCredential);
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blobClient = containerClient.getBlobClient(blobName);

    return await blobClient.deleteIfExists().then(async (response) => {
        if (response.succeeded) {
            return Messages.RESUME_DELETED;
        } else if (response.errorCode === "BlobNotFound") {
            throw formatErrorResponse(Messages.FILE_NOT_FOUND)
        } else {
            throw formatErrorResponse(Messages.ERROR_DELETING_ATTACHMENT)
        }
    })
};

const addAttachment = async (fileInfo) => {
    try {
        const { fileName, updatedTs } = fileInfo;
        const Key = `${fileName}`;
        const url = await createSASUrl(Key, 'test', permissions.WRITE)
        // await passportRepository.update({ id: passportId, resume: { Key, updatedTs } })
        console.log({ url, Key })
        return { url, Key };
    } catch (error) {
        return formatErrorResponse(Messages.ERROR_IN_RESUME_UPDATION, ERROR.UNPROCESSABLE_ENTITY);
    }
};


const getSASUrltoPut = async (fileInfo) => {
    const { fileName, container } = fileInfo;
    let url = await createSASUrl(fileName, container, permissions.WRITE)
    return { url };
};
const getSASUrltoPutPdf = async (fileInfo) => {
    const { fileName, container } = fileInfo;
    let url = await createSASUrl(fileName, container, permissions.WRITE)
    return { url };
};

const createSASUrl = async (fileName, containerName, permissions) => {
    try {

        const accountName = process.env.Azure_Storage_AccountName;
        const accountKey = process.env.Azure_Storage_AccountKey;

        const sharedKeyCredential = new StorageSharedKeyCredential(accountName, accountKey);

        const blobServiceClient = new BlobServiceClient(`https://${accountName}.blob.core.windows.net`, sharedKeyCredential);

        const containerClient = blobServiceClient.getContainerClient(containerName);
        const blobClient = containerClient.getBlobClient(fileName);

        const expiryDate = new Date();
        expiryDate.setMinutes(expiryDate.getMinutes() + 30); // Expiry time is 30 minutes from now
        const url = permissions === permissions.READ ? blobClient.generateSasUrl({
            permissions: permissions,
        }) :
            blobClient.generateSasUrl({
                permissions: permissions,
                expiresOn: expiryDate
            })
        return url;
    } catch (error) {
        throw formatErrorResponse(error)
    }
}

const getSASUrlToAccess = async (fileInfo) => {
    const { fileName, container } = fileInfo;
    let url = await createSASUrl(fileName, container, permissions.READ)

    return { url };
};
const getSASUrlToAccessPdf = async (fileInfo) => {
    const { fileName, container } = fileInfo;
    let url = await createSASUrl(fileName, container, permissions.READ)
    return { url };
};

const deleteBlobFile = async (fileInfo) => {
    const { Key, container } = fileInfo;
    await deleteBlob(Key, container);
    return Messages.FILE_DELETED;
};

const uploadEmployeeProfileUsingBuffer = async (blobName, containerName, bufferData) => {
    const AZURE_STORAGE_ACCOUNT_NAME = process.env.Azure_Storage_AccountName;
    const AZURE_STORAGE_ACCOUNT_KEY = process.env.Azure_Storage_AccountKey;

    const sharedKeyCredential = new StorageSharedKeyCredential(AZURE_STORAGE_ACCOUNT_NAME, AZURE_STORAGE_ACCOUNT_KEY);
    const blobServiceClient = new BlobServiceClient(`https://${AZURE_STORAGE_ACCOUNT_NAME}.blob.core.windows.net`, sharedKeyCredential);
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    try {
        await blockBlobClient.uploadData(bufferData);
        return Messages.PDF_UPLOADED;
    } catch (error) {
        console.error("Error uploading file:", error.message);
        throw formatErrorResponse(ERROR.EXPECTATION_FAILED, Messages.PDF_UPLOADED_ERROR)
    }
}

module.exports = {
    addAttachment,
    createSASUrl,
    deleteBlob,
    getSASUrltoPut,
    getSASUrltoPutPdf,
    getSASUrlToAccess,
    getSASUrlToAccessPdf,
    deleteBlobFile,
    uploadEmployeeProfileUsingBuffer
}
