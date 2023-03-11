import mongoose from 'mongoose';

export default defineNitroPlugin(async () => {
    await mongoose.connect('mongodb://127.0.0.1:27017')
});