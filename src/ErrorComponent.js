import React from "react";
import PropTypes from "prop-types";

const ErrorComponent = ({ error }) => {
    // Check if the error has a message, otherwise use a default message
    const errorMessage = error?.message || error || "An unexpected error occurred";

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Something went wrong!</h2>
            <p style={styles.message}>{errorMessage}</p>
        </div>
    );
};

ErrorComponent.propTypes = {
    error: PropTypes.oneOfType([
        PropTypes.string, // error can be a string message
        PropTypes.object, // error can be an object (with a 'message' property)
    ]),
};

const styles = {
    container: {
        padding: "20px",
        backgroundColor: "#f8d7da",
        color: "#721c24",
        border: "1px solid #f5c6cb",
        borderRadius: "5px",
        maxWidth: "600px",
        margin: "20px auto",
        textAlign: "center",
    },
    title: {
        fontSize: "1.5rem",
    },
    message: {
        fontSize: "1.2rem",
        marginTop: "10px",
    },
};

export default ErrorComponent;
