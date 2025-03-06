const tracksModel  = require("../models/nosql/tracks.js");
const { handleHttpError } = require("../utils/handleError.js");
const { matchedData } = require('express-validator')


const getItems = async (req, res) => {
    try{
    const user = req.user
    const data = await tracksModel.find({})
    res.send({data, user})// Tengo todos los datos el cliente
    }
};
const getItem = async (req, res) => {
    try{
        const {id} = matchedData(req)
        console.log(id)
        const data = await tracksModel.findById(id)
        res.send({ data });
    }catch(err){
        console.log(err);
        handleHttpError(res, 'ERROR_GET_ITEM', 403);
    }
};

const createItem = async (req, res) => {
    try{
        const body = matchedData(req)
        const data = await tracksModel.create(body)
        res.send(data)
    }catch(err){
        console.log(err);
        handleHttpError(res, 'ERROR_CREATE_ITEM');
    }

};

const updateItem = (req, res) => {
    try{
        const { id } = req.params;
        const { body } = req;
        const data = { id, ...body };
        res.send({ data });
    }catch(err){
        handleHttpError(res, 'ERROR_UPDATE_ITEM');
    }
};

const deleteItem = async (req, res) => {
    const data = await tracksModel.delete({_id:id});
};

module.exports = { getItems, getItem, createItem, updateItem, deleteItem };