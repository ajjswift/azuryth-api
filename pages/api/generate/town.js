import { generateTown } from "ttrpg-tools";

export default async function genNPC(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({message: 'Method should be GET.'}) // 405 - Method not allowed.
    }

    const {
        size
    } = req.query;

    


    const generatedTown = generateTown({
        size: size
    })

    return res.status(200).json(generatedTown);
}