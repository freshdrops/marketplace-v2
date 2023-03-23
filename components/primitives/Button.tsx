import { styled } from 'stitches.config'

const Button = styled('button', {
  outline: 'none',
  fontWeight: 700,
  fontSize: 16,
  whiteSpace: 'nowrap',
  fontFamily: '$button',
  transition: 'background-color 250ms linear',
  gap: '$space$2',
  display: 'inline-flex',
  alignItems: 'center',
  lineHeight: '20px',
  $$focusColor: '$colors$gray12',
  '&:focus-visible': {
    boxShadow: '0 0 0 2px $$focusColor',
  },
  '&:disabled': {
    backgroundColor: '$gray8',
    color: '$gray11',
  },
  '&:disabled:hover': {
    backgroundColor: '$gray8',
    color: '$gray11',
  },
  variants: {
    color: {
      primary: {
        backgroundColor: '#ce01a5',
        color: 'white',
        '&:hover': {
          backgroundColor: '$primary10',
        },
      },
      secondary: {
        backgroundColor: '$secondary4',
        color: '$primary12',
        '&:hover': {
          backgroundColor: '$secondary5',
        },
      },
      gray3: {
        backgroundColor: '$gray3',
        color: '$gray12',
        '&:hover': {
          backgroundColor: '$gray4',
        },
      },
      gray4: {
        backgroundColor: '$gray4',
        color: '$gray12',
        '&:hover': {
          backgroundColor: '$gray5',
        },
      },
      ghost: {
        backgroundColor: 'transparent',
        p: 0,
        '&:hover': {
          color: '$primary9',
        },
      },
      ghost1: {
        backgroundColor: 'transparent',
        color: '$primary7', 
        p: 0,
        '&:hover': {
          color: '$primary9',
        },
      },
      border1: {
        backgroundColor: 'transparent',
        border: 'solid',
        borderColor: 'white',
        color: '$primary7', 
        p: 0,
        '&:hover': {
          color: '$primary9',
        },
      },
    },
    corners: {
      square: {
        borderRadius: 0,
      },
      rounded: {
        borderRadius: 4,
      },
      pill: {
        borderRadius: 99999,
      },
      circle: {
        borderRadius: '99999px',
        alignItems: 'center',
        justifyContent: 'center',
      },
    },
    size: {
      xs: {
        p: '$space$3',
        lineHeight: '16px',
        minHeight: 40,
      },
      small: {
        px: '$space$3',
        py: '$space$4',
        lineHeight: '12px',
        minHeight: 44,
      },
      medium: {
        px: '$space$5',
        py: '$space$3',
        minHeight: 44,
      },
      large: {
        px: '$space$5',
        py: '$space$4',
        minHeight: 52,
      },
    },
  },
  compoundVariants: [
    {
      size: 'xs',
      corners: 'circle',
      css: {
        height: 40,
        width: 40,
        p: 0,
      },
    },
    {
      size: 'small',
      corners: 'circle',
      css: {
        height: 44,
        width: 44,
        p: 0,
      },
    },
    {
      size: 'medium',
      corners: 'circle',
      css: {
        height: 44,
        width: 44,
        p: 0,
      },
    },
    {
      size: 'large',
      corners: 'circle',
      css: {
        height: 52,
        width: 52,
        p: 0,
      },
    },
  ],
  defaultVariants: {
    color: 'primary',
    corners: 'rounded',
    size: 'medium',
  },
})

export default Button
