import express from 'express';

const route = express.Router();

route.post('/auth/login', async (req, res) => {
    const {email} = req.body;

    res.json({
        statusCode: null,
        message: `${email} Congratulations, we have successfully logged in for you`,
        data: {
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiQS1pbWFnaW5lODYiLCJzdWIiOiJpbWFnaW5lODYiLCJhY2NvdW50IjoiaW1hZ2luZTg2IiwiYWdlbnQiOiJWVjRBIiwicGF0aCI6Ik9YSm5VREEzU3l0R2NGWnFMMWRvTUZsaVoxcFJjbGhWVWsxdldXNTFkRXhoWmpKeVZuWnlSbkZpU1QwPSIsInNpdGVJZCI6IkEiLCJzaWduaW5UaW1lIjoiMTU3ODQ0NTE3Mzg2NyIsImxpZmVUaW1lIjoiMTU3ODUwMjc3Mzg2NyIsInNpZ25VcERhdGUiOiIxNTQ4Mzk5NTYwODYwIiwicG9ydCI6Ik1lbWJlciIsImlzSGFzRmF2b3JpdGUiOmZhbHNlLCJtZW1iZXJMZXZlbENvZGUiOiIwIiwibWVtYmVyTGV2ZWxOYW1lIjoiTm9ybWFsX3Rlc3QiLCJtZW1iZXJMZXZlbERlc2NyaXB0aW9uIjoiTm9ybWFsLi4xIiwibWVtYmVyQXZhdGFySWQiOjEsIm1lbWJlckF2YXRhclVybCI6IiIsImFnZW50RmluYW5jZUxpdmVjaGF0VXJsIjoiIiwiYWdlbnRDdXN0b21lckxpdmVjaGF0VXJsIjoiIiwibmJmIjoxNTc4NDQ1MTczLCJleHAiOjE1Nzg0NTk1NzMsImlzcyI6ImlCRVRfQXBpU2VydmljZV9ERVYiLCJhdWQiOiIzNTRDOTY3QTIwRTQ0ODExQjREOUVGMDgwMkNDNTJGMyJ9.10IbG39hST1w6Aq4gu3Yvkehx_3LVGa1vNJ4Oe-XipA',
        },
    });
});

module.exports = route;
