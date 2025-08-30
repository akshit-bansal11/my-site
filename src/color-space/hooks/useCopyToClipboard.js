import React from "react";
import { useState, useCallback } from "react";

export const useCopyToClipboard = () => {
    const [copied, setCopied] = useState(false);

    const copy = useCallback((text) => {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "absolute";
        textArea.style.left = "-9999px";
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
        document.body.removeChild(textArea);
    }, []);

    return [copied, copy];
};