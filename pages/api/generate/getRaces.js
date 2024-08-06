import { data } from "ttrpg-tools"

export default async function getAvailableRaces(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({message: 'Method not allowed'}) // 405 - Method not allowed
    }

    return res.status(200).json(data.races.get());
}