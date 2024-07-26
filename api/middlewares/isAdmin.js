

export default async (req, res, next) => {
    const { user } = req;
    if (user?.role !== 'admin') {
        return res.status(400).json({ status: "fail", message: "Unathorized" })
    }
    next();
}
