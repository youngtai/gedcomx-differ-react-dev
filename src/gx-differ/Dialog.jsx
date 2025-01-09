import { useState, useRef, useEffect } from "react";
import { Box, ModalClose } from "@mui/joy";
import Draggable from "react-draggable";
import PropTypes from "prop-types";

export default function Dialog({ open, onClose, children }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const dialogRef = useRef(null);

  useEffect(() => {
    const updatePosition = () => {
      const initialX = window.innerWidth / 2 - 200;
      if (open && dialogRef.current) {
        const dialogHeight = dialogRef.current.offsetHeight;
        const viewportHeight = window.innerHeight;
        const initialY = (viewportHeight - dialogHeight) / 2;
        setPosition({ x: initialX, y: initialY });
      }
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);

    return () => {
      window.removeEventListener("resize", updatePosition);
    };
  }, [open]);

  if (!open) return null;

  const handleDrag = (e, data) => {
    setPosition({ x: data.x, y: data.y });
  };

  return (
    <>
      <div id="dialog-container">
        <Draggable
          handle=".dialog-handle"
          position={position}
          onDrag={handleDrag}
          nodeRef={dialogRef}
        >
          <Box
            ref={dialogRef}
            sx={{
              position: "absolute",
              width: 400,
              maxWidth: "90vw",
              maxHeight: "90vh",
              overflowY: "auto",
              boxShadow: "lg",
              borderRadius: "md",
              bgcolor: "background.surface",
              zIndex: 1000,
              border: "1px solid",
              borderColor: "divider",
              p: 2,
              cursor: "move",
              pointerEvents: "auto",
              contain: "layout",
            }}
          >
            <Box
              className="dialog-handle"
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 40,
                cursor: "move",
                userSelect: "none",
              }}
            />
            <ModalClose
              onClick={onClose}
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                zIndex: 10,
              }}
            />
            {children}
          </Box>
        </Draggable>
      </div>
    </>
  );
}

Dialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
