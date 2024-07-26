import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import { Fragment, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import AddressForm from "./AddressForm";
import { updateUserAddressAsync } from "../slices/userSlice";

const AddressFormModal = ({ formActionType, setFormActionType }) => {

    const dispatch = useDispatch();
    const state = useSelector(state => state.user.state)
    function sendData(data) {
        const sendable = { address: data, type: formActionType }
        dispatch(updateUserAddressAsync(sendable))
    }

    useEffect(() => {
        if (state === 'fulfilled') {
            setFormActionType(null);
        }
    }, [state]);

    return (
        <Transition.Root show={["add", "update"].includes(formActionType) ? true : false} as={Fragment}>
            <Dialog className="relative z-10" onClose={() => { setFormActionType(null) }}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black backdrop-blur-sm bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8">
                                <AddressForm on_submit={sendData} setFormActionType={setFormActionType} formActionType={formActionType} />
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default AddressFormModal