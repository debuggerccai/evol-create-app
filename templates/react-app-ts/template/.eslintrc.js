module.exports = {
  root: true,
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: { jsx: true, },
    requireConfigFile: false,
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  plugins: ['react', 'import', 'react-hooks'],
  extends: [
    'airbnb',
  ],
  settings: {
    'import/resolver': {
      // 解析webpack配置项, 使用里面的参数
      webpack: { config: './applications/website/webpack/webpack.base.js', },
    },
    react: {
      createClass: 'createReactClass',
      pragma: 'React',
      version: '16.8'
    }
  },
  rules: {
    'import/extensions': ['error', 'always', {
      js: 'never',
      ts: 'never',
      vue: 'never',
      jsx: 'never',
      tsx: 'never',
    }],
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal'],
        pathGroups: [{
          pattern: 'react',
          group: 'external',
          position: 'before'
        }],
        pathGroupsExcludedImportTypes: ['react'],
        alphabetize: {
          order: 'asc',
          caseInsensitive: true
        },
      }
    ],
    'import/prefer-default-export': 'off',
    'import/no-dynamic-require': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/prop-types': 'off',
    'react/no-find-dom-node': 'off',
    'react/jsx-filename-extension': 'off',
    'react/jsx-indent-props': ['error', 2],
    'react/jsx-indent': ['error', 2],
    'react/jsx-max-props-per-line': [1, { when: 'multiline' }],
    'react/jsx-no-bind': ['off'],
    'react/jsx-one-expression-per-line': ['off'],
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    'jsx-a11y/no-static-element-interactions': ['off'],
    'jsx-a11y/anchor-is-valid': ['off'], // 关闭a标签必须传入href一个有效值的报错
    'jsx-a11y/click-events-have-key-events': ['off'],
    'jsx-a11y/label-has-for': ['off'],
    'jsx-a11y/no-noninteractive-element-interactions': ['off'],
    'react/sort-comp': ['error', {
      order: [
        'static-methods',
        'lifecycle',
        'render',
        'everything-else'
      ]
    }],
    'import/no-named-as-default': 'off',
    'import/first': 'off',
    'import/no-extraneous-dependencies': 'off',
    // ====== Possible Errors start ====== 这些规则与 JavaScript 代码中可能的错误或逻辑错误有关
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-cond-assign': ['error', 'always'],  // 禁止条件表达式中出现赋值操作符
    'no-constant-condition': 'warn', // 禁止在条件中使用常量表达式
    'no-dupe-args': 'error', // 禁止 function 定义中出现重名参数
    'no-empty': 'error', // 禁止出现空语句块
    'no-empty-character-class': 'error', // 禁止在正则表达式中使用空字符集
    'no-extra-semi': 'warn', // 禁止不必要的分号
    'no-func-assign': 'error', // 禁止对 function 声明重新赋值
    'no-inner-declarations': 'error', // 禁止在嵌套的块中出现变量声明或 function 声明
    'no-irregular-whitespace': 'warn', // 禁止不规则的空白
    'no-prototype-builtins': 'error', // 禁止直接调用 Object.prototypes 的内置属性
    'no-unreachable': 'error', // 禁止在 return、throw、continue 和 break 语句之后出现不可达代码
    'use-isnan': 'error', // 要求使用 isNaN() 检查 NaN
    'valid-typeof': ['error', { requireStringLiterals: true }], // 强制 typeof 表达式与有效的字符串进行比较
    // ====== Possible Errors end ====== 这些规则与 JavaScript 代码中可能的错误或逻辑错误有关

    // ====== Best Practices start ====== 这些规则是关于最佳实践的，帮助你避免一些问题
    'array-callback-return': 'off', // 强制数组方法的回调函数中有 return 语句
    'block-scoped-var': 'warn', // 强制把变量的使用限制在其定义的作用域范围内
    'consistent-return': 'error', // 要求 return 语句要么总是指定返回的值，要么不指定
    curly: ['warn', 'multi-line'], // 强制所有控制语句使用一致的括号风格
    'default-case': ['error', { commentPattern: '^no default$' }], // 要求 switch 语句中有 default 分支
    'dot-notation': ['error', { allowKeywords: true }], // 强制在点号之前和之后一致的换行
    eqeqeq: ['warn', 'always'], // 要求使用 === 和 !==
    'guard-for-in': 'error', // 要求 for-in 循环中有一个 if 语句
    'no-alert': 'warn', // 禁用 alert、confirm 和 prompt
    'no-case-declarations': 'error', // 不允许在 case 子句中使用词法声明
    'no-else-return': 'error', // 禁止 if 语句中 return 语句之后有 else 块
    'no-empty-function': 'error', // 禁止出现空函数
    'no-extend-native': 'warn', // 禁止扩展原生类型
    'no-floating-decimal': 'warn', // 禁止数字字面量中使用前导和末尾小数点
    'no-implicit-coercion': 'off', // 禁止使用短符号进行类型转换 +foo
    'no-lone-blocks': 'error', // 禁用不必要的嵌套块
    'no-loop-func': 'warn', // 禁止在循环语句中出现包含不安全引用的函数声明
    'no-multi-str': 'warn', // 禁止使用多行字符串
    'no-new': 'off', // 禁止使用 new 以避免产生副作用
    'no-new-func': 'error', // 禁止对 Function 对象使用 new 操作符
    'no-new-wrappers': 'error', // 禁止对 String，Number 和 Boolean 使用 new 操作符
    'no-param-reassign': 'off', // 禁止对 function 的参数进行重新赋值
    'no-redeclare': 'error', // 禁止多次声明同一变量
    'no-restricted-syntax': 'off', // 禁止使用对象的某些属性 （打开）
    'no-return-assign': ['error', 'always'], // 禁止在 return 语句中使用赋值语句
    'no-sequences': 'error', // 禁用逗号操作符
    'no-useless-concat': 'error', // 禁止不必要的字符串字面量或模板字面量的连接 `some` + `string`
    'no-multi-spaces': 'off', // 禁止使用多个空格
    'no-script-url': 'off', // 禁止使用 javascript: url
    'no-useless-escape': 'warn', // 禁止出现未使用过的表达式
    'no-unused-expressions': ['error', { allowShortCircuit: true, allowTernary: true }], // 禁止出现未使用过的表达式
    'no-void': 'warn', // 禁用 void 操作符
    radix: 'error', // 强制在 parseInt() 使用基数参数 parseInt("071", 10)
    'vars-on-top': 'error', // 要求所有的 var 声明出现在它们所在的作用域顶部
    // 'wrap-iife': ['error', 'outside', {functionPrototypeMethods: false}], // 要求 IIFE 使用括号括起来
    'wrap-iife': 'error', // 要求 IIFE 使用括号括起来，上面为默认值
    yoda: 'warn', // 要求或禁止 “Yoda” 条件 "blue" == value，与正常语意相反，星战yoda的讲话方式
    // 'spaced-comment': ['off'],
    // ====== Best Practices end ====== 这些规则是关于最佳实践的，帮助你避免一些问题

    // ======= 变量 Variables  start ======= 这些规则与变量声明有关
    'no-shadow': ['off', { hoist: 'functions' }], // 禁止变量声明与外层作用域的变量同名 （打开）
    'no-undef': 'error', // 禁用未声明的变量，除非它们在 /*global */ 注释中被提到 eslint:recommended
    'no-undef-init': 'error', // 禁止将变量初始化为 undefined
    'no-unused-vars': ['warn', { // 禁止出现未使用过的变量 eslint:recommended
      vars: 'all',
      args: 'after-used',
      ignoreRestSiblings: true // 兄弟属性被标记为 “unused”。使用该选项可以使 rest 属性的兄弟属性被忽略。
    }],
    'no-use-before-define': ['warn', 'nofunc'],
    // ======= 变量 Variables  end ======= 这些规则与变量声明有关

    // ======= Node.js and CommonJS  start ======= 这些规则是关于Node.js 或 在浏览器中使用CommonJS 的
    'global-require': 'off', // 强制在模块顶部调用 require() 默认error，资源引用，按需引入的require一般在模块内部调用
    // ======= Node.js and CommonJS  end ======= 这些规则是关于Node.js 或 在浏览器中使用CommonJS 的

    // ====== ECMAScript 6 start ====== 这些规则只与 ES6 有关
    'arrow-body-style': ['warn', 'as-needed', { // 要求箭头函数体使用大括号
      requireReturnForObjectLiteral: false,
    }],
    'arrow-parens': ['off'], // 要求箭头函数的参数使用圆括号
    'arrow-spacing': ['error', { before: true, after: true }], // 强制箭头函数的箭头前后使用一致的空格
    'constructor-super': 'error', // 要求在构造函数中有 super() 的调用
    // 不允许修改类声明的变量
    'no-class-assign': 'error', // 禁止修改类声明的变量
    'no-dupe-class-members': 'error', // 禁止类成员中出现重复的名称
    'no-this-before-super': 'error', // 禁止在构造函数中，在调用 super() 之前使用 this 或 super
    'no-useless-constructor': 'off', // 禁用不必要的构造函数
    'no-var': 'error', // 要求使用 let 或 const 而不是 var
    'object-shorthand': ['error', 'always', { // 要求或禁止对象字面量中方法和属性使用简写语法
      ignoreConstructors: false,
      avoidQuotes: true,
    }],
    'prefer-arrow-callback': ['error', { // 要求回调函数使用箭头函数
      allowNamedFunctions: false,
      allowUnboundThis: true,
    }],
    'prefer-const': ['error', { // 要求使用 const 声明那些声明后不再被修改的变量
      destructuring: 'any',
      ignoreReadBeforeAssign: true,
    }],
    'prefer-spread': 'warn', // 要求使用扩展运算符而非 .apply()
    'prefer-template': 'error', // 要求使用模板字面量而非字符串连接
    'require-yield': 'off', // 要求 generator 函数内有 yield
    'template-curly-spacing': 'error', // 要求或禁止模板字符串中的嵌入表达式周围空格的使用
    // ====== ECMAScript 6 end ====== 这些规则只与 ES6 有关

    // ======= 风格指南 Stylistic  start =======
    'array-bracket-spacing': ['error', 'never'], // 强制数组方括号中使用一致的空格
    'block-spacing': ['error', 'always'], // 禁止或强制在代码块中开括号前和闭括号后有空格 默认校验
    'brace-style': ['error', '1tbs', { // 强制在代码块中使用一致的大括号风格 非默认校验
      allowSingleLine: true // 默认false 允许块的开括号和闭括号在 同一行
    }],
    camelcase: 'off', // 强制使用骆驼拼写法命名约定
    'comma-spacing': ['error', { before: false, after: true }], // 强制在逗号前后使用一致的空格 默认校验
    'comma-dangle': 'off', // 要求或禁止末尾逗号
    'eol-last': ['error', 'always'], // 要求或禁止文件末尾存在空行 默认校验
    'func-names': 'off', // 要求或禁止使用命名的 function 表达式 非默认校验
    indent: ['error', 2, {
      SwitchCase: 1, // 强制 switch 语句中的 case 子句的缩进级别 非默认校验
      VariableDeclarator: 1, // 默认校验
      outerIIFEBody: 1, // 默认校验
      FunctionDeclaration: { // 默认校验
        parameters: 1,
        body: 1
      },
      FunctionExpression: { // 默认校验
        parameters: 1,
        body: 1
      }
    }],
    'key-spacing': ['error', { // 强制在对象字面量的属性中键和值之间使用一致的间距 默认校验
      beforeColon: false,
      afterColon: true
    }],
    'keyword-spacing': ['error', { // 强制在关键字前后使用一致的空格 默认校验
      before: true,
      after: true,
      overrides: {
        return: { after: true },
        throw: { after: true },
        case: { after: true }
      }
    }],
    'linebreak-style': ['warn', 'unix'], // 强制使用一致的换行风格 默认校验
    'lines-around-directive': ['error', { // Deprecated 要求或禁止在语句间填充空行
      before: 'always',
      after: 'always',
    }],
    'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
    'max-len': 'off', // 强制一行的最大长度
    'new-cap': ['error', { // 要求构造函数首字母大写
      newIsCap: true,
      newIsCapExceptions: [],
      capIsNew: false, // 允许调用首字母大写的函数时没有 new 操作符 非默认校验
      capIsNewExceptions: ['Immutable.Map', 'Immutable.Set', 'Immutable.List'],
    }],
    'newline-per-chained-call': 'off', // 要求方法链中每个调用都有一个换行符
    'no-bitwise': 'off', // 禁用按位运算符
    'no-continue': 'off', // 禁用 continue 语句
    'no-plusplus': 'off', // 禁用一元操作符 ++ 和 --
    'no-underscore-dangle': 'off', // 禁止标识符中有悬空下划线
    'no-array-constructor': 'error', // 禁用 Array 构造函数
    'no-lonely-if': 'warn', // 禁止 if 作为唯一的语句出现在 else 语句中
    'no-mixed-spaces-and-tabs': 'error', // 禁止空格和 tab 的混合缩进
    'no-multi-assign': ['error'], // 禁止连续赋值
    'no-multiple-empty-lines': 'off', // 禁止出现多行空行
    'no-mixed-operators': ['error', { // 禁止混合使用不同的操作符
      groups: [
        ['+', '-', '*', '/', '%', '**'],
        ['&', '|', '^', '~', '<<', '>>', '>>>'],
        ['==', '!=', '===', '!==', '>', '>=', '<', '<='],
        ['&&', '||'],
        ['in', 'instanceof']
      ],
      allowSamePrecedence: true
    }],
    'no-nested-ternary': 'off', // 禁用嵌套的三元表达式
    'no-new-object': 'error', // 禁用 Object 的构造函数
    'no-tabs': 'error', // 禁用 tab
    'no-trailing-spaces': 'error', // 禁用行尾空格
    'no-template-curly-in-string': 'off', // 禁止在常规字符串中出现模板字面量占位符语法
    'no-unneeded-ternary': ['error', { // 禁止可以在有更简单的可替代的表达式时使用三元操作符
      defaultAssignment: false // 禁止条件表达式作为默认的赋值模式 不允许 x ? x : 1 非默认校验
    }],
    'object-curly-spacing': ['error', 'always'], // 强制在大括号中使用一致的空格
    'object-property-newline': ['error', { // 强制大括号内换行符的一致性
      allowMultiplePropertiesPerLine: true,
    }],
    'one-var': ['warn', 'never'], // 强制函数中的变量要么一起声明要么分开声明 非默认校验
    'one-var-declaration-per-line': ['off', 'always'], // 要求或禁止在变量声明周围换行
    'operator-assignment': ['error', 'always'], // 要求或禁止在可能的情况下使用简化的赋值操作符
    'operator-linebreak': ['error', 'before'], // 要求把换行符放在操作符前面
    'padded-blocks': ['warn', 'never'], // 要求或禁止块内填充
    'quote-props': ['warn', 'as-needed', { // 要求对象字面量属性名称用引号括起来
      keywords: false,
      unnecessary: true,
      numbers: false
    }],
    quotes: ['error', 'single', { // 强制使用一致的反勾号、双引号或单引号
      avoidEscape: true
    }],
    semi: [2, 'never'], // 要求或禁止使用分号代替 ASI
    'semi-spacing': ['error', { before: false, after: true }], // 强制分号之前和之后使用一致的空格
    'space-before-blocks': 'error', // 强制在块之前使用一致的空格
    'space-before-function-paren': ['error', { // 强制在 function的左括号之前使用一致的空格
      anonymous: 'always',
      named: 'never',
      asyncArrow: 'always'
    }],
    'space-in-parens': ['error', 'never'], // 强制在圆括号内使用一致的空格
    'space-infix-ops': 'error', // 要求操作符周围有空格
    'space-unary-ops': ['error', { // 强制在一元操作符前后使用一致的空格
      words: true,
      nonwords: false,
      overrides: {},
    }],
    'class-methods-use-this': 'off',
  },
  // 通过overrides控制.ts、.tsx后缀的校验
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      env: { browser: true, es6: true, node: true },
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: 6,
        sourceType: 'module',
        project: './tsconfig.json',
      },
      plugins: ['react', 'import', 'react-hooks', '@typescript-eslint'],
      extends: [
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:react-hooks/recommended',
      ],
      rules: {
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
        'react/require-default-props': 'off',
        '@typescript-eslint/camelcase': ['off', { properties: 'always' }],
        'no-use-before-define': 'off',
        '@typescript-eslint/no-unused-vars': ['warn'],
        '@typescript-eslint/no-use-before-define': 'off',
      },
    },
  ],
}
