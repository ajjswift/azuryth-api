import { pocketbase } from "@/utils/pb";
import axios from "axios";
import crypto from "crypto";
import fs from "fs";
import path from "path";

// Directory for cache files
const cacheDir = path.join(process.cwd(), 'cache');

if (!fs.existsSync(cacheDir)) {
    fs.mkdirSync(cacheDir);
}

// Generate a hash-based cache file path
const getCacheFilePath = (key) => {
    const hash = crypto.createHash('sha256').update(key).digest('hex');
    return path.join(cacheDir, `${hash}.json`);
};

export default async function getImages(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed.' });
    }

    const { query = 'hero', sort = '@random', bypassCache = false, size = '1200x800' } = req.query;

    try {
        if (size !== '1920x1080' && size !== '480x720' && size !== '1200x800' && size !== 'full') {
            return res.status(422).json({ message: 'Invalid size.' });
        }

        const sizeToUse = size === 'full' ? '' : size;

        const pb = await pocketbase();

        const queryDB = await pb.collection('gallery').getList(1, 1, {
            filter: `tag.name ?~ '${query}'`,
            sort: sort,
        });

        if (queryDB.items.length === 0) {
            return res.status(404).json({ message: 'No matching image found.' });
        }

        const { id, image } = queryDB.items[0];
        const fileUrl = `${process.env.PB_URL}/api/files/gallery/${id}/${image}?thumb=${sizeToUse}`;
        const cacheKey = `${id}/${image}/${sizeToUse}`;
        const cacheFilePath = getCacheFilePath(cacheKey);

        if (fs.existsSync(cacheFilePath) && !bypassCache) {
            const cachedData = JSON.parse(fs.readFileSync(cacheFilePath));
            res.setHeader('Content-Type', cachedData.contentType);
            res.setHeader('Content-Length', cachedData.data.length);
            res.setHeader('Cache-Control', 'no-cache');
            return res.status(200).send(Buffer.from(cachedData.data, 'base64'));
        }

        const { data, headers } = await axios.get(fileUrl, { responseType: 'arraybuffer' });

        const encodedData = Buffer.from(data).toString('base64');
        fs.writeFileSync(cacheFilePath, JSON.stringify({
            data: encodedData,
            contentType: headers['content-type']
        }));

        res.setHeader('Content-Type', headers['content-type']);
        res.setHeader('Content-Length', data.length);
        res.setHeader('Cache-Control', 'no-cache');
        res.status(200).send(data);

        // Optionally update hash or other metadata if required
        await pb.collection('gallery').update(id, {
            hash: crypto.createHash('sha256').update(data).digest('hex')
        });

    } catch (error) {
        console.error('Error fetching image:', error.message);
        return res.status(500).json({ message: 'Internal server error.' });
    }
}

export const config = {
    api: {
      responseLimit: false,
    },
}
