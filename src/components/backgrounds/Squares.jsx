import { useRef, useEffect, useCallback } from "react";

const getEffectiveSpeed = (speed) => Math.max(speed, 0.1);

const getStartCoord = (offset, size) =>
    Math.floor(offset / size) * size;

const getHoveredSquare = (mouse, offset, start, size) => ({
    x: Math.floor((mouse.x + offset.x - start.x) / size),
    y: Math.floor((mouse.y + offset.y - start.y) / size),
});

const createGradient = (ctx, width, height) => {
    const gradient = ctx.createRadialGradient(
        width / 2,
        height / 2,
        0,
        width / 2,
        height / 2,
        Math.sqrt(width ** 2 + height ** 2) / 2
    );
    gradient.addColorStop(0, "rgba(0, 0, 0, 0)");
    gradient.addColorStop(1, "#060010");
    return gradient;
};

const Squares = ({
    direction = "right",
    speed = 1,
    borderColor = "#999",
    squareSize = 40,
    hoverFillColor = "#222",
}) => {
    const canvasRef = useRef(null);
    const requestRef = useRef(null);
    const numSquares = useRef({ x: 0, y: 0 });
    const gridOffset = useRef({ x: 0, y: 0 });
    const hoveredSquareRef = useRef(null);

    // Resize canvas and update grid size
    const resizeCanvas = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        numSquares.current.x = Math.ceil(canvas.width / squareSize) + 1;
        numSquares.current.y = Math.ceil(canvas.height / squareSize) + 1;
    }, [squareSize]);

    // Draw the grid and hovered square
    const drawGrid = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const start = {
            x: getStartCoord(gridOffset.current.x, squareSize),
            y: getStartCoord(gridOffset.current.y, squareSize),
        };

        for (let x = start.x; x < canvas.width + squareSize; x += squareSize) {
            for (let y = start.y; y < canvas.height + squareSize; y += squareSize) {
                const squareX = x - (gridOffset.current.x % squareSize);
                const squareY = y - (gridOffset.current.y % squareSize);

                if (
                    hoveredSquareRef.current &&
                    Math.floor((x - start.x) / squareSize) === hoveredSquareRef.current.x &&
                    Math.floor((y - start.y) / squareSize) === hoveredSquareRef.current.y
                ) {
                    ctx.fillStyle = hoverFillColor;
                    ctx.fillRect(squareX, squareY, squareSize, squareSize);
                }

                ctx.strokeStyle = borderColor;
                ctx.strokeRect(squareX, squareY, squareSize, squareSize);
            }
        }

        ctx.fillStyle = createGradient(ctx, canvas.width, canvas.height);
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }, [borderColor, hoverFillColor, squareSize]);

    // Animation update
    const updateAnimation = useCallback(() => {
        const effectiveSpeed = getEffectiveSpeed(speed);
        switch (direction) {
            case "right":
                gridOffset.current.x =
                    (gridOffset.current.x - effectiveSpeed + squareSize) % squareSize;
                break;
            case "left":
                gridOffset.current.x =
                    (gridOffset.current.x + effectiveSpeed + squareSize) % squareSize;
                break;
            case "up":
                gridOffset.current.y =
                    (gridOffset.current.y + effectiveSpeed + squareSize) % squareSize;
                break;
            case "down":
                gridOffset.current.y =
                    (gridOffset.current.y - effectiveSpeed + squareSize) % squareSize;
                break;
            case "diagonal":
                gridOffset.current.x =
                    (gridOffset.current.x - effectiveSpeed + squareSize) % squareSize;
                gridOffset.current.y =
                    (gridOffset.current.y - effectiveSpeed + squareSize) % squareSize;
                break;
            default:
                break;
        }
        drawGrid();
        requestRef.current = requestAnimationFrame(updateAnimation);
    }, [direction, speed, squareSize, drawGrid]);

    // Mouse move handler
    const handleMouseMove = useCallback(
        (event) => {
            const canvas = canvasRef.current;
            if (!canvas) return;
            const rect = canvas.getBoundingClientRect();
            const mouse = {
                x: event.clientX - rect.left,
                y: event.clientY - rect.top,
            };
            const start = {
                x: getStartCoord(gridOffset.current.x, squareSize),
                y: getStartCoord(gridOffset.current.y, squareSize),
            };
            const hovered = getHoveredSquare(mouse, gridOffset.current, start, squareSize);

            if (
                !hoveredSquareRef.current ||
                hoveredSquareRef.current.x !== hovered.x ||
                hoveredSquareRef.current.y !== hovered.y
            ) {
                hoveredSquareRef.current = hovered;
            }
        },
        [squareSize]
    );

    // Mouse leave handler
    const handleMouseLeave = useCallback(() => {
        hoveredSquareRef.current = null;
    }, []);

    useEffect(() => {
        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        const canvas = canvasRef.current;
        if (!canvas) return;

        canvas.addEventListener("mousemove", handleMouseMove);
        canvas.addEventListener("mouseleave", handleMouseLeave);

        requestRef.current = requestAnimationFrame(updateAnimation);

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
            canvas.removeEventListener("mousemove", handleMouseMove);
            canvas.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [
        resizeCanvas,
        handleMouseMove,
        handleMouseLeave,
        updateAnimation,
        squareSize,
    ]);

    return (
        <canvas
            ref={canvasRef}
            className="w-full h-full border-none block"
        />
    );
};

export default Squares;
