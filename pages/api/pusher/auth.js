import { pusher } from "../../../lib/pusher";

export default async function handler(req, res) {
    console.log("auth request", req.body);

    // see https://pusher.com/docs/channels/server_api/authenticating-users
    const { socket_id, channel_name, username } = req.body;

    // use JWTs here to authenticate users before continuing

    const randomString = Math.random().toString(36).slice(2);

    const presenceData = {
        user_id: randomString,
        user_info: {
            username,
        },
    };

    /* const user = {
        id: "some_id",
        user_info: {
            name: "John Smith",
        },
        watchlist: ['another_id_1', 'another_id_2']
    }; */

    try {
        const auth = pusher.authorizeChannel(socket_id, channel_name, presenceData);
        res.send(auth);
    } catch (error) {
        console.error(error)
    }

}