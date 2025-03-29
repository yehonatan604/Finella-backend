export const errorHandler = (err, req, res) => {
    res.status(res.statusCode || 500).send(err.message);
}