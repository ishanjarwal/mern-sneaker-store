import axios from 'axios'

export const validateAddress = async (req, res, next) => {
    try {
        const { pincode } = req.body.address;
        if (!pincode) {
            return res.status(400).json({ status: "fail", message: "Pincode is required" });
        }
        const pincodeUrl = "https://api.postalpincode.in/pincode/" + pincode;
        const { data } = await axios.get(pincodeUrl);
        if (data[0].Status == 'Error') {
            return res.status(400).json({ status: "fail", message: "Invalid Pincode" });
        } else if (data[0].Status == 'Success') {
            req.body.address.city = data[0].PostOffice.District
            req.body.address.state = data[0].PostOffice.State
            next();
        } else {
            return res.status(400).json({ status: "fail", message: "Invalid Pincode" }) // mostly unreachable
        }
    } catch (err) {
        return res.status(500).json({ status: "error", message: "Something went wrong", err });
    }

}
