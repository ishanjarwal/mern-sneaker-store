import { toast } from "react-toastify";

export function toastEmmitter(type, message, containerId) {
    switch (type) {
        case "success":
            toast.success(message, { containerId: containerId })
            break;
        case "fail":
            toast.info(message, { containerId: containerId })
            break;
        case "error":
            toast.error(message, { containerId: containerId })
            break;
        default:
            break;
    }
}