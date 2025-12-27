import { useState } from "react";
import { TbCopy, TbCopyCheck } from "react-icons/tb";

export default function CopyCodeButton({ code, classNames }: { code: string; classNames?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button onClick={handleCopy} className={classNames} title="Copy code">
      {copied ? <TbCopyCheck size={24} title="Copied!" /> : <TbCopy size={24} title="Copy" />}
    </button>
  );
}
