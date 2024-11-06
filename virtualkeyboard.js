import React, { useState, useEffect } from 'react';
import keyboard_image from './keyboard.png';

const VirtualKeyboard = ({ onChange }) => {
    const [isShift, setIsShift] = useState(false);
    const [isCapsLock, setIsCapsLock] = useState(false);
    const [showKeyboard, setShowKeyboard] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const [activeElement, setActiveElement] = useState(null);

    const keys = [
        ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
        ['Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\'],
        ['CapsLock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', '\'', 'Enter'],
        ['Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', 'Shift'],
        ['Space']
    ];

    const handleFocus = (e) => {
        if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement || e.target.isContentEditable) {
            setActiveElement(e.target);
        }
    };

    const handleKeyClick = (key) => {
        if (!activeElement) return;

        const currentValue = activeElement.value || '';
        const { selectionStart, selectionEnd } = activeElement;
        let newValue = currentValue;

        if (key === 'Space') {
            newValue = currentValue.slice(0, selectionStart) + ' ' + currentValue.slice(selectionEnd);
            activeElement.setSelectionRange(selectionStart + 1, selectionStart + 1);
        } else if (key === 'Backspace') {
            if (selectionStart > 0) {
                newValue = currentValue.slice(0, selectionStart - 1) + currentValue.slice(selectionEnd);
                activeElement.setSelectionRange(selectionStart - 1, selectionStart - 1);
            }
        } else if (key === 'Enter') {
            newValue = currentValue.slice(0, selectionStart) + '\n' + currentValue.slice(selectionEnd);
            activeElement.setSelectionRange(selectionStart + 1, selectionStart + 1);
        } else if (key === 'Shift') {
            setIsShift(!isShift);
            return;
        } else if (key === 'CapsLock') {
            setIsCapsLock(!isCapsLock);
            return;
        } else if (key === 'Tab') {
            newValue = currentValue.slice(0, selectionStart) + '    ' + currentValue.slice(selectionEnd);
            activeElement.setSelectionRange(selectionStart + 1, selectionStart + 1);
        } else {
            const char = (isShift || isCapsLock) ? key.toUpperCase() : key.toLowerCase();
            newValue = currentValue.slice(0, selectionStart) + char + currentValue.slice(selectionEnd);
            activeElement.setSelectionRange(selectionStart + 1, selectionStart + 1);
        }

        activeElement.value = newValue; // Update the value of the active element
        onChange(newValue); // Call onChange to update the state in App
        activeElement.focus(); // Keep focus on the active element
    };

    const toggleKeyboard = () => {
        setShowKeyboard(!showKeyboard);
    };

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setDragOffset({
            x: e.clientX - position.x,
            y: e.clientY - position.y,
        });
    };

    const handleMouseMove = (e) => {
        if (isDragging) {
            setPosition({
                x: e.clientX - dragOffset.x,
                y: e.clientY - dragOffset.y,
            });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('focusin', handleFocus);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('focusin', handleFocus);
        };
    }, [isDragging]);

    return (
        <div>
            <button onClick={toggleKeyboard} style={styles.iconButton}>
                <img
                    src={keyboard_image}
                    alt={showKeyboard ? "Hide Keyboard" : "Show Keyboard"}
                    style={styles.icon}
                />
            </button>

            {showKeyboard && (
                <div
                    style={{
                        ...styles.keyboardContainer,
                        transform: `translate(${position.x}px, ${position.y}px)`,
                    }}
                    onMouseDown={handleMouseDown}
                >
                    {keys.map((row, rowIndex) => (
                        <div key={rowIndex} style={styles.keyRow}>
                            {row.map((key, index) => (
                                <button
                                    key={index}
                                    style={{
                                        ...styles.key,
                                        ...(key === 'Shift' ? styles.shift : {}),
                                        ...(key === 'CapsLock' ? styles.capslock : {}),
                                        ...(key === 'Space' ? styles.space : {}),
                                        ...(key === 'Enter' ? styles.enter : {}),
                                        ...(key === 'Backspace' ? styles.backspace : {}),
                                    }}
                                    onClick={() => handleKeyClick(key)}
                                >
                                    {isShift || isCapsLock ? key.toUpperCase() : key}
                                </button>
                            ))}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const styles = {
    keyboardContainer: {
        display: 'flex',
        flexDirection: 'column',
        padding: '10px',
        background: '#333',
        borderRadius: '8px',
        position: 'absolute',
        zIndex: 10,
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
        minWidth: '600px',
    },
    keyRow: {
        display: 'flex',
        justifyContent: 'space-around',
        marginBottom: '5px',
    },
    key: {
        background: '#444',
        color: '#fff',
        border: 'none',
        padding: '10px',
        borderRadius: '4px',
        cursor: 'pointer',
        flexGrow: 1,
        margin: '0 2px',
        textAlign: 'center',
    },
    shift: {
        flexBasis: '80px',
    },
    capslock: {
        flexBasis: '80px',
    },
    space: {
        flexBasis: '400px',
    },
    enter: {
        flexBasis: '80px',
    },
    backspace: {
        flexBasis: '80px',
    },
    iconButton: {
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
    },
    icon: {
        width: '30px',
        height: '30px',
    },
};

export default VirtualKeyboard;

