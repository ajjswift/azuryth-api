import { pocketbase } from "@/utils/pb"

export default async function getTags(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({message: 'Method not allowed'}) // 405 - Method not allowed
    }

    const pb = await pocketbase();

    try {
        const tags = await pb.collection('tags').getFullList();
        
        // Extract only the names of the tags
        const tagNames = tags.map(tag => tag.name);

        return res.status(200).json(tagNames);
    } catch (error) {
        console.error('Error fetching tags:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}
