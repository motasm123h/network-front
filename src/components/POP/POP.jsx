import React, { useEffect, useState } from "react";

const POP = ({ message, onClose }) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
            if (onClose) onClose();
        }, 3000); // 3 seconds

        return () => clearTimeout(timer); // Cleanup timeout
    }, [onClose]);

    if (!visible) return null;

    return (
        <div className="popup">
            <p>{message}</p>
        </div>
    );
};

export default POP;
