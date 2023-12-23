"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseService {
    constructor(model) {
        this.BaseModel = model;
    }
    create(data) {
        return new this.BaseModel(data).save();
    }
    list() {
        return this.BaseModel.find().exec();
    }
    findById(id) {
        return this.BaseModel.findById(id).exec();
    }
    findOne(where) {
        return this.BaseModel.findOne(where).exec();
    }
    update(id, data) {
        return this.BaseModel.findByIdAndUpdate(id, data, { new: true }).exec();
    }
    updateWhere(where, data) {
        return this.BaseModel.findOneAndUpdate(where, data, { new: true }).exec();
    }
    delete(where) {
        return this.BaseModel.findOneAndDelete(where).exec();
    }
    find() {
        return this.BaseModel.find().exec();
    }
}
exports.default = BaseService;
