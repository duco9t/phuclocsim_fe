import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export const CodeBlock = ({ code }: { code: string }) => (
  <SyntaxHighlighter
    language="javascript"
    style={oneDark}
    className="mb-4 rounded-md"
    wrapLines
  >
    {code}
  </SyntaxHighlighter>
);
