import store from '../../store'

export const SelectStyles = {
    control: (baseStyles, state) => ({
        ...baseStyles,
        width: '100%',
        height: '48px',
        fontSize: '14px',
        fontWeight: '400',
        lineHeight: '16.8px',
        borderRadius: '10px',
        border: 'unset',
        boxShadow: '#B9A978',
        backgroundColor: 'transparent',
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected
            ? store.getState().theme.darkTheme
                ? provided.backgroundColor
                : provided.backgroundColor
            : state.isFocused
              ? '#2684ff4d'
              : provided.backgroundColor,
        textTransform: 'math-auto',
        fontSize: '14px',
        fontWeight: '400',
        lineHeight: '16.8px',
        color: provided.color,
        cursor: 'pointer',
    }),
    menu: (provided, state) => ({
        ...provided,
        backgroundColor: store.getState().theme.darkTheme
            ? '#111c44'
            : provided.backgroundColor,
        zIndex: '9',
        border: store.getState().theme.darkTheme
            ? '1px solid'
            : provided.border,
    }),
    singleValue: (provided) => ({
        ...provided,
        color: store.getState().theme.darkTheme ? 'white' : provided.color,
    }),
    input: (provided) => ({
        ...provided,
        color: store.getState().theme.darkTheme ? 'white' : provided.color,
    }),
}
