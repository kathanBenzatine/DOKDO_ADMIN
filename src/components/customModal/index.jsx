import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from '@chakra-ui/modal'
import React from 'react'

function CustomModal({
    children,
    open,
    title,
    onClose,
    footerComponent,
    ...other
}) {
    return (
        <Modal isOpen={open} onClose={onClose} {...other}>
            <ModalOverlay />
            <ModalContent className="shadow-lg dark:!bg-navy-800">
                <ModalHeader className="dark:text-white">{title}</ModalHeader>
                <ModalCloseButton className="dark:text-white" />
                <ModalBody>{children}</ModalBody>
                <ModalFooter>{footerComponent}</ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default CustomModal
