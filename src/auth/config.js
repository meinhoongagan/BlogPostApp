import { Client, Databases, Storage, Query , ID } from "appwrite";
import conf from "../conf/conf";

export class Services {
    client = new Client();
    databases;
    bucket;
    constructor(){
        this.client  
        .setEndpoint("https://cloud.appwrite.io/v1")
        .setProject(conf.appwriteProjectId);
        
        this.databases = new Databases(this.client);

        this.bucket = new Storage(this.client);
    }

    async createPost ({title,slug,content,featuredImage,status,userId}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDataBaseId,
                conf.appwriteCollectionId,
                slug,
                {
                title,
                content,
                featuredImage,
                status,
                userId
                }

            )
        } catch (error) {
            throw error;
        }
    }
    async updatePost (slug,{title,content,featuredImage,status,userId}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDataBaseId,
                conf.appwriteCollectionId,
                slug,
                {
                title,
                content,
                featuredImage,
                status,
                userId
                }

            )
        } catch (error) {
            throw error;
        }
    }
    async deletePost (slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDataBaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    async getPost (slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDataBaseId,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            throw error;
        }
    }
    async getPosts (query=[Query.equal("status","active")]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDataBaseId,
                conf.appwriteCollectionId,
                query
            )
        } catch (error) {
            throw error;
        }
    }

    // File Services

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file,
            )
        } catch (error) {
            throw error;
        }
    }
    async deleteFile(file){
        try {
            return await this.bucket.deleteFile(
                conf.appwriteBucketId,
                file,
            )
        } catch (error) {
            throw error;
        }
    }
    async getPreview(fileID){
        try {
            return await this.bucket.getFilePreview(
                conf.appwriteBucketId,
                fileID,
            )
        } catch (error) {
            throw error;
        }
    }

};

const services = new Services();

export default services;