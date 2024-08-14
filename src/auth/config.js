import { Client, Databases, Storage, Query, ID } from 'appwrite';
import conf from '../conf/conf';

export class Services {
    client;
    databases;
    bucket;

    constructor() {
        this.client = new Client()
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDataBaseId,
                conf.appwriteCollectionId,
                slug,
                { title, content, featuredImage, status, userId }
            );
        } catch (error) {
            console.error('Error creating post:', error);
            throw error;
        }
    }

    async updatePost(slug, { title, content, featuredImage, status, userId }) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDataBaseId,
                conf.appwriteCollectionId,
                slug,
                { title, content, featuredImage, status, userId }
            );
        } catch (error) {
            console.error('Error updating post:', error);
            throw error;
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDataBaseId,
                conf.appwriteCollectionId,
                slug
            );
            return true;
        } catch (error) {
            console.error('Error deleting post:', error);
            return false;
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDataBaseId,
                conf.appwriteCollectionId,
                slug
            );
        } catch (error) {
            console.error('Error fetching post:', error);
            throw error;
        }
    }

    async getPosts(query = [Query.equal('status', 'active')]) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDataBaseId,
                conf.appwriteCollectionId,
                query
            );
        } catch (error) {
            console.error('Error fetching posts:', error);
            throw error;
        }
    }

    async uploadFile(file) {
        try {
            const response = await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            );
            return response;
        } catch (error) {
            console.error('Error uploading file:', error);
            throw error;
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            );
            return true;
        } catch (error) {
            console.error('Error deleting file:', error);
            return false;
        }
    }

    async getPreview(fileId) {
        try {
            return await this.bucket.getFilePreview(
                conf.appwriteBucketId,
                fileId
            );
        } catch (error) {
            console.error('Error fetching file preview:', error);
            throw error;
        }
    }
}

const services = new Services();

export default services;
