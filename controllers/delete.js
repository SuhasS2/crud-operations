const express = require('express');
const router = express.Router();
const testData = require('../models/registratioAndTestSchema');

// module.exports = function () {
//     router.delete('/removeData', async (req, res) => {
//         const { grade } = req.body;
//         await testData.deleteOne({ grade });
//         res.send({ message: "Deleted Successfully" });
//     });
//     return router;
// };

async function deleteTestMetaData(req,res) {
    const deleteDataValue = req.body;
    if (!req.body) {
        res.status(200).send({});
    } else {
        try {
            await testData.deleteOne({grade : deleteDataValue})
            res.status(200).send({ message: "Data got Deleted" });
        } catch(err){
            console.log("Error:(");
        }
    }  
}

module.exports = {deleteTestMetaData};
module.exports = {router};