export type OperatorCategory = 'arithmetic' | 'relational' | 'logical' | 'assignment';

export interface OperatorItem {
  symbol: string;
  name: string;
  category: OperatorCategory;
  categoryName: string;
  description: string;
  syntax: string;
  example: string;
  output: string;
  precedence: number; // lower number = higher precedence
  associativity: 'left-to-right' | 'right-to-left';
  tips?: string;
  codeSnippets: {
    javascript: string;
    csharp: string;
    python: string;
  };
}

export interface DecisionScenario {
  id: string;
  title: string;
  description: string;
  variables: {
    id: string;
    label: string;
    type: 'number' | 'boolean';
    min?: number;
    max?: number;
    step?: number;
    defaultValue: number | boolean;
    unit?: string;
  }[];
  evaluate: (values: Record<string, any>) => {
    activeBranchIndex: number;
    branches: {
      conditionText: string;
      isMet: boolean;
      actionText: string;
      codeBlock: string;
    }[];
    summaryText: string;
    logDetails: string[];
  };
}

export interface QuizQuestion {
  id: number;
  category: OperatorCategory;
  categoryName: string;
  question: string;
  codeSnippet?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}
