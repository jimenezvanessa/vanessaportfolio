export default function TechBackground() {
  const codeLines = [
    'const react = require("react");',
    'function useState() { return state; }',
    'import React from "next";',
    'const handler = async (req) => {}',
    'export default function Page() {}',
    'useEffect(() => {}, []);',
    'const [data, setData] = useState();',
    'return <div>{children}</div>;',
    'npm install next react',
    'tailwind.config.js',
  ];

  return (
    <div className="tech-background">
      <div className="tech-grid" />
      <div className="tech-particles">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="particle" />
        ))}
      </div>
      <div className="code-rain">
        {codeLines.map((line, i) => (
          <div 
            key={i} 
            className="code-line"
            style={{ animationDuration: `${10 + Math.random() * 5}s` }}
          >
            {line}
          </div>
        ))}
      </div>
    </div>
  );
}