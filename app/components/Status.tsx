import { IconType } from "react-icons";

interface StatusProps {
  text: string;
  icon: IconType;
  bg: string;
  color: string;
}

const Status: React.FC<StatusProps> = ({ text, icon: Icon, bg, color }) => {
  return (
    <div
      className={`flex ${color} ${bg} my-4  px-1 rounded h-6 gap-1 items-center`}
    >
      {text} <Icon size={15} />
    </div>
  );
};

export default Status;
