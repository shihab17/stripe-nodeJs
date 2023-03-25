const uploadFile = require('../../middleware/file');
const upload = async (req, res) => {
    try {
        await uploadFile(req, res);
        if (req.file == undefined) {
            return { error: { message: "Upload a file please!" } }
        }
        return {
            error: {
                message: "The following file was uploaded successfully: " + req?.file?.originalname || '',
            }
        }
    } catch (err) {
        if (err.code == "LIMIT_FILE_SIZE") {
            return {
                error: {
                    message: "File size cannot be larger than 2MB!",
                }
            }
        }
        return {
            error: {
                message: `Unable to upload the file: ${req?.file?.originalname}. ${err}`,
            }
        }
    }
};

module.exports = upload;