import { generateTownName } from "ttrpg-tools"

export default async function genTownName(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({message: 'Method not allowed. Please use GET.'}) // 405 - Method not allowed
    }

    const townName = generateTownName();

    return res.status(200).json({townName: townName});
}