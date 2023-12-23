import { Document, Model, QueryOptions } from 'mongoose';

class BaseService<T extends Document> {
    private BaseModel: Model<T>;

    constructor(model: Model<T>) {
        this.BaseModel = model;
    }

    create(data: any): Promise<T> {
        return new this.BaseModel(data).save();
    }

    list(): Promise<T[]> {
        return this.BaseModel.find().exec();
    }

    findById(id: string): Promise<T | null> {
        return this.BaseModel.findById(id).exec();
    }

    findOne(where: Record<string, any>): Promise<T | null> {
        return this.BaseModel.findOne(where).exec();
    }

    update(id: string, data: any): Promise<T | null> {
        return this.BaseModel.findByIdAndUpdate(id, data, { new: true }).exec();
    }

    updateWhere(where: Record<string, any>, data: any): Promise<T | null> {
        return this.BaseModel.findOneAndUpdate(where, data, { new: true }).exec();
    }

    delete(where: Record<string, any>): Promise<T | null> {
        return this.BaseModel.findOneAndDelete(where).exec();
    }

    find(): Promise<T[]> {
        return this.BaseModel.find().exec();
    }
}

export default BaseService;
