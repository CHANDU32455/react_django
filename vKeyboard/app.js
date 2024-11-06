import React, { useState } from 'react';
import VirtualKeyboard from './vkeyboard';

const App = () => {
    const [inputValues, setInputValues] = useState(Array(5).fill('')); // Array to hold values for 5 text fields
    const [focusedIndex, setFocusedIndex] = useState(null); // State to track which text field is focused
    const [isSubmitted, setIsSubmitted] = useState(false); // State to track submission

    const handleInputChange = (index, value) => {
        const newValues = [...inputValues];
        newValues[index] = value;
        setInputValues(newValues);
    };

    const handleAlert = (index) => {
        alert(`Value from Text Field ${index + 1}: ${inputValues[index]}`);
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent page refresh on form submission
        setIsSubmitted(true); // Set submission state to true
    };

    const handleReset = () => {
        setInputValues(Array(5).fill('')); // Reset input values
        setIsSubmitted(false); // Reset submission state
    };

    return (
        <div style={styles.container}>
            <VirtualKeyboard onChange={(value) => handleInputChange(focusedIndex, value)} focusedIndex={focusedIndex} />
            <h1 style={styles.title}>Virtual Keyboard Form Example</h1>
            {!isSubmitted ? ( // Conditional rendering based on submission state
                <form onSubmit={handleSubmit}>
                    {inputValues.map((value, index) => (
                        <div key={index} style={styles.textAreaContainer}>
                            <textarea
                                value={value}
                                onFocus={() => setFocusedIndex(index)} // Track which field is focused
                                onChange={(e) => handleInputChange(index, e.target.value)} // Handle direct typing
                                rows="3"
                                cols="50"
                                style={styles.textArea}
                            />
                            <button onClick={() => handleAlert(index)} type="button" style={styles.alertButton}>
                                Show Value {index + 1}
                            </button>
                        </div>
                    ))}
                    <button type="submit" style={styles.submitButton}>Submit Form</button>
                </form>
            ) : (
                <div style={styles.outputContainer}>
                    <h2>Submitted Values:</h2>
                    <ul>
                        {inputValues.map((value, index) => (
                            <li key={index}>Text Field {index + 1}: {value}</li>
                        ))}
                    </ul>
                    <button onClick={handleReset} style={styles.resetButton}>Reset Form</button>
                </div>
            )}
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        maxWidth: '600px',
        margin: 'auto',
    },
    title: {
        textAlign: 'center',
        color: '#333',
        marginBottom: '20px',
    },
    textAreaContainer: {
        marginBottom: '20px',
        display: 'flex',
        flexDirection: 'column',
    },
    textArea: {
        width: '100%',
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)',
        fontSize: '16px',
        resize: 'none',
        transition: 'border-color 0.2s',
    },
    alertButton: {
        marginTop: '10px',
        padding: '10px 20px',
        backgroundColor: '#007BFF',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.2s',
    },
    submitButton: {
        marginTop: '20px',
        padding: '10px 20px',
        backgroundColor: '#28a745',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.2s',
    },
    outputContainer: {
        marginTop: '20px',
        padding: '10px',
        backgroundColor: '#e7f3fe',
        borderRadius: '5px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    resetButton: {
        marginTop: '10px',
        padding: '10px 20px',
        backgroundColor: '#dc3545',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.2s',
    },
};

export default App;

