import { useEffect } from 'react'

const useOutsideClick = (ref, callback) => {
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                callback()
            }
        }
        document.addEventListener('mousedown', handleOutsideClick)
        // Cleanup event listeners when the component is unmounted
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick)
        }
    }, [ref, callback])
}

export default useOutsideClick
