import { toast } from "sonner";

export function errorToast(msg: string) {
    toast.error(msg, {
        style: {
            backgroundColor: '#CB3A31',
            color: '#ffffff',
            borderColor: '#CB3A31',
        }
    })
}