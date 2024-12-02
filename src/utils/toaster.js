import toast from 'react-hot-toast'

/**
 *
 * @param {string} meg
 */
export const toastSuccess = (meg) => {
    toast.success(meg)
}

/**
 *
 * @param {string} meg
 */
export const toastError = (meg) => {
    toast.error(meg)
}
