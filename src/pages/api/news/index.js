import newsData from '@services/mock/news/getNewsList';

export default (req, res) => {
    const {
        query: {id},
        method,
    } = req;

    const exampleResponseData = {
        statusCode: null,
        message: '',
        data: {},
    };

    const responseData = Object.assign({}, exampleResponseData);

    switch (method) {
        case 'GET':
            // Get data from your database
            responseData.data.rows = newsData;

            res.status(200).json(responseData);
            break;
        default:
            res.setHeader('Allow', ['GET']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
};
