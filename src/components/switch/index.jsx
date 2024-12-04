const Switch = (props) => {
    const { onchange, extra, ...rest } = props
    return (
        <input
            type="checkbox"
            className={`relative h-5 w-10 appearance-none rounded-[20px] bg-[#e0e5f2] outline-none transition duration-[0.5s] before:absolute before:top-[50%] before:h-4 before:w-4 before:translate-x-[2px] before:translate-y-[-50%] before:rounded-[20px] before:bg-[#fff]  before:shadow-[0_2px_5px_rgba(0,_0,_0,_.2)] before:transition before:content-[""] checked:bg-secondaryBlack checked:before:translate-x-[22px] hover:cursor-pointer dark:bg-white/5 dark:checked:bg-secondaryBlack`}
            onChange={onchange}
            {...rest}
        />
    )
}

export default Switch
