type Value = number | boolean;

const TOKEN_PATTERN = /\s+|(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?|true|false|===|!==|==|!=|<=|>=|&&|\|\||[()+\-*/%<>!]/gy;

export function evaluateExpression(expression: string): Value {
  if (expression.length > 512) {
    throw new Error('İfade en fazla 512 karakter olabilir.');
  }

  const tokens: string[] = [];
  let offset = 0;
  while (offset < expression.length) {
    TOKEN_PATTERN.lastIndex = offset;
    const match = TOKEN_PATTERN.exec(expression);
    if (!match) {
      throw new Error(`Desteklenmeyen karakter: "${expression[offset]}"`);
    }
    if (!/^\s+$/.test(match[0])) {
      tokens.push(match[0]);
    }
    offset = TOKEN_PATTERN.lastIndex;
  }

  let position = 0;
  const peek = () => tokens[position] ?? '';
  const take = () => tokens[position++];
  const expect = (token: string) => {
    if (take() !== token) {
      throw new Error(`"${token}" bekleniyordu.`);
    }
  };
  const truthy = (value: Value) => Boolean(value);
  const numeric = (value: Value) => typeof value === 'boolean' ? Number(value) : value;

  const parsePrimary = (): Value => {
    const token = take();
    if (token === undefined) throw new Error('İfade tamamlanmamış.');
    if (token === 'true') return true;
    if (token === 'false') return false;
    if (/^(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?$/.test(token)) return Number(token);
    if (token === '(') {
      const value = parseOr();
      expect(')');
      return value;
    }
    throw new Error(`Beklenmeyen ifade: "${token}"`);
  };

  const parseUnary = (): Value => {
    if (peek() === '!') {
      take();
      return !truthy(parseUnary());
    }
    if (peek() === '+') {
      take();
      return numeric(parseUnary());
    }
    if (peek() === '-') {
      take();
      return -numeric(parseUnary());
    }
    return parsePrimary();
  };

  const parseMultiplicative = (): Value => {
    let value = parseUnary();
    while (['*', '/', '%'].includes(peek())) {
      const operator = take();
      const right = numeric(parseUnary());
      const left = numeric(value);
      value = operator === '*' ? left * right : operator === '/' ? left / right : left % right;
    }
    return value;
  };

  const parseAdditive = (): Value => {
    let value = parseMultiplicative();
    while (peek() === '+' || peek() === '-') {
      const operator = take();
      const right = numeric(parseMultiplicative());
      const left = numeric(value);
      value = operator === '+' ? left + right : left - right;
    }
    return value;
  };

  const parseRelational = (): Value => {
    let value = parseAdditive();
    while (['<', '>', '<=', '>='].includes(peek())) {
      const operator = take();
      const left = numeric(value);
      const right = numeric(parseAdditive());
      value = operator === '<' ? left < right
        : operator === '>' ? left > right
          : operator === '<=' ? left <= right
            : left >= right;
    }
    return value;
  };

  const parseEquality = (): Value => {
    let value = parseRelational();
    while (['===', '!==', '==', '!='].includes(peek())) {
      const operator = take();
      const right = parseRelational();
      const strictEqual = typeof value === typeof right && value === right;
      const looseEqual = numeric(value) === numeric(right);
      value = operator === '===' ? strictEqual
        : operator === '!==' ? !strictEqual
          : operator === '==' ? looseEqual
            : !looseEqual;
    }
    return value;
  };

  const parseAnd = (): Value => {
    let value = parseEquality();
    while (peek() === '&&') {
      take();
      const right = parseEquality();
      value = truthy(value) ? right : value;
    }
    return value;
  };

  const parseOr = (): Value => {
    let value = parseAnd();
    while (peek() === '||') {
      take();
      const right = parseAnd();
      value = truthy(value) ? value : right;
    }
    return value;
  };

  if (tokens.length === 0) throw new Error('Lütfen bir ifade girin.');
  const result = parseOr();
  if (position < tokens.length) {
    throw new Error(`Beklenmeyen ifade: "${peek()}"`);
  }
  return result;
}
