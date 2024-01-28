import modals from "~/routes/modals";
import { useModal } from "~/store/modal/hooks";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { closeModal } from "~/store/modal/actions";
import { FaTimes } from "react-icons/fa";

export default function Modal() {
  const { modal, isOpen, data } = useModal();
  const currentModal = modals.find((m) => m.name === modal);

  return (
    currentModal && (
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={currentModal.force ? () => {} : closeModal}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="max-w-[450px] w-full p-5 bg-secondary rounded-lg">
                  <div className="flex items-center justify-between mb-5 pb-2.5 border-b-2 border-zinc-600">
                    <h2 className="text-xl font-bold">{currentModal.title}</h2>
                    {!currentModal.force && (
                      <div
                        onClick={closeModal}
                        className="flex items-center justify-center w-8 h-8 rounded-md hover:bg-white/10 cursor-pointer transition-all"
                      >
                        <FaTimes size={20} />
                      </div>
                    )}
                  </div>
                  <currentModal.element data={data} />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    )
  );
}
