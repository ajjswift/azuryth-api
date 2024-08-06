import Pocketbase from "pocketbase"
export async function pocketbase() {
    try {
        const pb = new Pocketbase(process.env.PB_URL);
        const authData = await pb.admins.authWithPassword(process.env.PB_USERNAME, process.env.PB_PASSWORD);
    
        return pb;
    }
    catch (e) {
        console.error(e);
        return false;
    }
}