import fetch from 'node-fetch';

export default async function Handler(req, res) {
    const { Url } = req.query;

    if (!Url) {
        res.status(400).json({ Error: 'Url Parameter Is Required' });
        return;
    }

    try {
        const Response = await fetch(Url);
        const ContentType = Response.headers.get('content-type');
        const Data = await Response.text();

        res.setHeader('Content-Type', ContentType);
        res.status(200).send(Data);
    } catch (Error) {
        res.status(500).json({ Error: 'Failed To Fetch The Url' });
    }
}