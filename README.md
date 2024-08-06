
![Azuryth Logo](public/azuryth.webp "Azuryth Logo")


# This repository stores the [Azuryth](https://azuryth.com) Web API.

It's constantly expanding, but currently includes a few routes.

No `''` marks should be used in any request.
eg:
    
    https://api.azuryth.com/api/getImage?query=veldoria&size=1920x1080


## /api/getImage

Returns one of our featured images, whilst allowing the user to query by town, area, or other landmark.

Required Method: `GET`

Accepted Parameters:

    query: String; Do not include ''
    sort: String; Can be set to 'created' (no '') to search for the latest image for that tag.
    bypassCache: Boolean; Defaults to false, bypasses cache layer. Will be slow.
    size: 1200x800, 1920x1080, 480x720, full; Only accepts these values.
Requires Authentication: `No`

#### More Information
If `sort` is not set, it'll return a random image that has the tag sent in query. If `sort` is `created`, it'll return the newest image in that tag. If `sort` is `-created`, it'll return the oldest image in that tag.

The `bypassCache` option should only be used if experiencing issues. It'll return images much much slower that with our cache layer. It's highly recommended to not include in the request.

Not including any parameters will return a random cached hero image of size 1200x800.

## /api/generate/npc
This API route generates a random NPC. It's used by our staff team to generate an NPC for the server with ease.


Required Method: `GET`

Accepted parameters: 

    forename: String
    surname: String
    homeTown: String
    npcClass: String
    occupation: String
    race: String
    sex: String
    randomizeClass: Boolean

Requires Authentication: `No`

#### More Information

All parameters (excluding randomizeClass) simply allow you to force the value in the final result. This is useful when you have specific requirements that need to be met, such as a name or sex.

randomizeClass ensures that the NPC will always have a class, else it only has a 10% chance to be assigned one. It defaults to false.

## /api/generate/town
Generates a random town. Used by our staff team to create new and random towns each time we need a new one.



Required Method: `GET`

Accepted parameters:

    size: Integer

Requires Authentication: `No`

#### More Information
The size parameter simply forces the value of the town population in the final result.

## /api/generate/townName
A subset of `/api/generate/town`; returns only the town name.

Required Method: `GET`

Accepted parameters: `None`

Requires Authentication: `No`

#### More Information

Returns a random town name.

