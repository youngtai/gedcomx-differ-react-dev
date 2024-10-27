import { Sheet } from "@mui/joy";
import Draggable from "react-draggable";

export function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="JoyDialogContent-root"]'}
    >
      <Sheet {...props} />
    </Draggable>
  );
}
