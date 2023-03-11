import User from "~/server/database/schemas/user";

const possibleDiscriminators = Array.from({ length: 10000 }, (_, i) => i.toString().padStart(4, '0'));

export default async function generateDiscriminator(username: string): Promise<string> {
    let used = await User.find({username}, {discriminator: 1, _id: 0}) as any;

    let availableDiscriminators = possibleDiscriminators.filter(discriminator => !Object.values(used).includes(discriminator));

    if (availableDiscriminators.length > 0) {
        let index = Math.floor(Math.random() * availableDiscriminators.length);
        let discriminator = availableDiscriminators[index];

        return discriminator;
    } else {
        throw new Error('No available discriminators for this username');
    }
}