import { generateNpc } from "ttrpg-tools";

export default async function genNPC(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({message: 'Method should be GET.'}) // 405 - Method not allowed.
    }

    const {
        forename, surname, homeTown, npcClass, occupation, race, sex, randomizeClass
    } = req.query;

    


    const generatedNpc = generateNpc({
        givenName: forename,
        familyName: surname,
        homeTown: homeTown,
        npcClass: npcClass,
        occupation: occupation,
        race: race,
        sex: sex,
        randomizeClass
    });

    return res.status(200).json(generatedNpc);
}