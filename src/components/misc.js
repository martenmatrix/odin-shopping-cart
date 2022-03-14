import { useState, useEffect, useRef } from 'react';
import './styles/ScrollingText.css';
import './styles/QuantitySelector.css';

function ScrollingText(props) {
    const text = props.text;

    const textRef = useRef(null);

    const [scrollWidth, setScrollWidth] = useState(null);
    const [clientWidth, setClientWidth] = useState(null);

    function isXOverflown() {
        return scrollWidth > clientWidth;
    }

    useEffect(() => {
        const currentTextRef = textRef.current;
        setScrollWidth(currentTextRef.scrollWidth);
        setClientWidth(currentTextRef.clientWidth);
    }, [])

    return (
        <div className="scroll-wrapper">
            <div ref={textRef} className="name">
                <span className={isXOverflown() ? 'animate' : ''}>
                    {text}
                </span>
            </div>
        </div>
    )
}

function QuantitySelector(props) {
    const [currentQuantity, setCurrentQuantity] = props.quantityState;

    function onChange(e) {
        const newValue = parseInt(e.target.value);
        if (isValid(newValue)) {
            setCurrentQuantity(newValue);
        }
    }

    function isValid(number) {
        const biggerThanZero = number > 0;
        const smallerThanInfinity = number < 1000;
        const isNumber = typeof number === 'number';

        if (biggerThanZero && smallerThanInfinity && isNumber) {
            return true;
        } else {
            return false;
        }
    }

    function increase() {
        setCurrentQuantity((prevState) => {
            const newState = prevState + 1;
            if (isValid(newState)) {
                return newState;
            } else {
                return prevState;
            }
        });
    }

    function decrease() {
        setCurrentQuantity((prevState) => {
            const newState = prevState - 1;
            if (isValid(newState)) {
                return newState;
            } else {
                return prevState;
            }
        });
    }

    function numberInputOnWheelPreventChange(e) {
        // removes keyboard focus
        e.target.blur()
      
        // Prevent the page/container scrolling
        e.stopPropagation()
      
        // Refocus immediately, on the next tick (after the current function is done)
        setTimeout(() => {
          e.target.focus()
        }, 0)
      }

    return (
        <div className="quantity-selector">
            <span onClick={decrease}>-</span>
            <input name="quantity" type="number" min="1" max="999" step="1" value={currentQuantity} onChange={onChange} onWheel={numberInputOnWheelPreventChange}/>
            <span onClick={increase}>+</span>
        </div>
    )
}

export { ScrollingText, QuantitySelector };