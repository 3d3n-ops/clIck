interface CodePreviewProps {
  code: string;
}

export default function CodePreview({ code }: CodePreviewProps) {
  return (
    <div className="h-full bg-gray-900 rounded-lg overflow-hidden">
      <pre className="h-full p-4 overflow-x-auto">
        <code className="text-sm text-gray-300">
          {code || '// Your generated code will appear here...'}
        </code>
      </pre>
    </div>
  );
} 