import { colors } from "@mui/joy";
import {
  IoAdd,
  IoArrowDown,
  IoArrowUp,
  IoClose,
  IoFemale,
  IoHelp,
  IoMale,
  IoPencil,
  IoRemoveCircle,
  IoSave,
  IoStar,
  IoStarOutline,
  IoSwapVertical,
} from "react-icons/io5";

const ICON_SIZE = 22;

const EditIcon = () => <IoPencil size={ICON_SIZE} />;

const CancelIcon = () => <IoClose size={ICON_SIZE} />;

const SaveIcon = () => <IoSave size={ICON_SIZE} />;

const DeleteIcon = () => (
  <IoRemoveCircle size={ICON_SIZE} color={colors.red[600]} />
);

const AddIcon = () => <IoAdd size={ICON_SIZE} />;

const QuestionMarkIcon = () => <IoHelp size={ICON_SIZE} />;

const MaleIcon = () => <IoMale size={ICON_SIZE} color={colors.blue[500]} />;

const FemaleIcon = () => <IoFemale size={ICON_SIZE} color={colors.red[300]} />;

const StarIcon = () => <IoStar size={ICON_SIZE} />;

const StarOutlineIcon = () => <IoStarOutline size={ICON_SIZE} />;

const ArrowUpIcon = () => <IoArrowUp size={ICON_SIZE} />;

const ArrowDownIcon = () => <IoArrowDown size={ICON_SIZE} />;

const SwapIcon = () => <IoSwapVertical size={ICON_SIZE} />;

export {
  EditIcon,
  CancelIcon,
  SaveIcon,
  DeleteIcon,
  AddIcon,
  QuestionMarkIcon,
  MaleIcon,
  FemaleIcon,
  StarIcon,
  StarOutlineIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  SwapIcon,
};
