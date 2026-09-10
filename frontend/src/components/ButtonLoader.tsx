import { IconLoader2 } from "@tabler/icons-react";

interface ButtonLoaderProps {
  existing?: boolean;
  text?: string;
}

const ButtonLoader = ({ existing = false, text }: ButtonLoaderProps) => {
  const loaderText = text ?? (existing ? "Updating..." : "Saving...");

  return (
    <div className="flex items-center gap-1.5 px-8">
      <IconLoader2 size={16} className="animate-spin" />
      {loaderText}
    </div>
  );
};

export default ButtonLoader;
