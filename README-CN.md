
中文 | [English]

[中文]: ./README.md
[English]: ./ENREADME.md

# **`enumily`：类型安全的枚举工具**

`enumily` 是一个功能强大且灵活的枚举工具，解决了 TypeScript 原生 `enum` 和 `const` 的局限性。通过强类型支持、双向映射、动态扩展和丰富的工具方法，`enumily` 能够显著提升开发效率和代码可维护性。

---

## **1. 为什么选择 `enumily`**

### **1.1 TypeScript 原生 `enum` 的不足**
- **类型推导不够严格**：`enum` 的键和值的类型推导不够精确，尤其在运行时。
- **双向映射不灵活**：数字枚举支持双向映射，但字符串枚举不支持。
- **动态扩展困难**：无法在运行时动态扩展枚举。
- **多余的运行时代码**：`enum` 会生成额外的运行时代码，增加了包的体积。

### **1.2 使用 `const` 模拟枚举的局限性**
- **类型推导复杂**：需要手动定义类型，增加维护成本。
- **缺乏工具方法**：无法直接获取所有键、值或生成结构化数据。
- **动态扩展困难**：需要手动管理扩展逻辑，容易出错。

### **1.3 `enumily` 的优势**
- **类型安全性**：通过 TypeScript 的类型系统，提供严格的类型推导。
- **双向映射**：支持从键到值，以及从值到键的双向映射。
- **动态扩展**：支持运行时动态扩展枚举。
- **实用工具方法**：提供多种便捷的枚举操作方法，如 `$getKeys`、`$getValues`、`$extend`、`$toList` 等。
- **自定义字段名称**：支持生成带有自定义字段名称的结构化数据。

---

## **2. enumily 动机**

`enumily` 的目标是解决以下痛点：

1.  **跨端状态管理：**  在前端与后端交互中，需要枚举来定义状态码、任务类型、订单状态等常量。
1.  **易用性与可维护性：**  提供简洁直观的 API，减少手动管理枚举的重复工作。
1.  **强类型推断：**  基于 TypeScript 的类型系统，最大程度降低运行时错误。

无论是定义 HTTP 状态码、任务状态，还是生成前端下拉菜单，`enumily` 都能让使用枚举变得高效、灵活。

---

## **3. 安装**

使用 npm 或 yarn 安装：

```bash
# npm 安装
npm install enumily

# yarn 安装
yarn add enumily
```

---

## **4. 使用**

### **4.1 创建基础枚举**

以下是一个基础枚举的定义与使用示例：

```typescript
import { createEnum } from 'enumily';

// 定义枚举
const MyEnum = createEnum({
  SUCCESS: 0,
  FAILURE: 1,
  PENDING: 2,
});

// 使用枚举
console.log(MyEnum.SUCCESS); // 输出: 0
console.log(MyEnum.$getKeys()); // 输出: ['SUCCESS', 'FAILURE', 'PENDING']
console.log(MyEnum.$getValues()); // 输出: [0, 1, 2]
console.log(MyEnum.$length); // 输出: 3

// 获取键对应的值
console.log(MyEnum.$getValue('SUCCESS')); // 输出: 0

// 获取值对应的键
console.log(MyEnum.$getKey(1)); // 输出: 'FAILURE'
```

#### **类型推断示例：**

-   `MyEnum.$getKeys()` 的返回类型严格推导为：`['SUCCESS', 'FAILURE', 'PENDING']`。
-   `MyEnum.SUCCESS` 的类型推导为 `0`。
-   无法访问不存在的键，如 `MyEnum.$getValue('NOT_EXIST')` 会在编译时提示错误。

---

### **4.2 启用双向映射**

在一些场景下，我们需要通过枚举的值来反查对应的键，可以通过启用 `inverted` 配置实现双向映射：

```typescript
const BiEnum = createEnum(
  {
    SUCCESS: 0,
    FAILURE: 1,
    PENDING: 2,
  },
  { inverted: true }
);

// 使用双向映射
console.log(BiEnum.$inverted); // 输出: { 0: 'SUCCESS', 1: 'FAILURE', 2: 'PENDING' }
console.log(BiEnum.$getKey(1)); // 输出: 'FAILURE'
console.log(BiEnum[0]); // 输出: 'SUCCESS'
```

* * *

### **4.3 生成标签化列表**

使用 `$toList` 方法，可以将枚举值与自定义标签结合，生成结构化列表，便于在前端界面中展示（例如下拉菜单、选项列表等）：

```typescript
const labeledList = MyEnum.$toList([
  [0, '操作成功'],
  [1, '操作失败'],
  [2, '正在处理中'],
]);

console.log(labeledList);
// 输出:
// [
//   { key: 'SUCCESS', value: 0, label: '操作成功' },
//   { key: 'FAILURE', value: 1, label: '操作失败' },
//   { key: 'PENDING', value: 2, label: '正在处理中' },
// ]
```

---

## **5. API 说明**

### **5.1 `$getKeys`**
获取枚举的所有键。

- **返回值**：一个严格类型的元组，包含所有键。
- **示例**：
  ```typescript
  const keys = MyEnum.$getKeys();
  console.log(keys); // 输出: ['SUCCESS', 'FAILURE', 'PENDING']
  ```
---
### **5.2 `$getValues`**
获取枚举的所有值。

- **返回值**：一个严格类型的元组，包含所有值。
- **示例**：
  ```typescript
  const values = MyEnum.$getValues();
  console.log(values); // 输出: [0, 1, 2]
  ```
---
### **5.3 `$length`**
获取枚举的长度。

- **返回值**：一个数字，表示枚举中键的数量。
- **示例**：
  ```typescript
  const length = MyEnum.$length;
  console.log(length); // 输出: 3
  ```
---
### **5.4 `$getValue`**
根据键获取对应的值。

- **参数**：
  - `key`：枚举的键。
- **返回值**：与键关联的值。
- **示例**：
  ```typescript
  const value = MyEnum.$getValue('SUCCESS');
  console.log(value); // 输出: 0
  ```

---

### **5.5 `$getKey`**
根据值获取对应的键。

- **参数**：
  - `value`：枚举的值。
- **返回值**：与值关联的键。
- **示例**：
  ```typescript
  const key = MyEnum.$getKey(1);
  console.log(key); // 输出: 'FAILURE'
  ```
---
### **5.6 `$extend`**
动态扩展枚举

- **参数**：
  - `newEnum`：要与当前枚举合并的新枚举。
- **返回值**：新枚举。
- **示例**：
  ```typescript
  const ExtendedEnum = MyEnum.$extend({
    CANCELLED: 3,
  });

  console.log(ExtendedEnum.CANCELLED); // 输出: 3
  console.log(ExtendedEnum.$getKeys()); // 输出: ['SUCCESS', 'FAILURE', 'PENDING', 'CANCELLED']
  console.log(ExtendedEnum.$getValues()); // 输出: [0, 1, 2, 3]
  ```
---
### **5.7 `$toList`**
将枚举转换为带有自定义字段名称的对象列表。

- **参数**：
  - `entities`：一个值和标签的数组。
  - `options`（可选）：自定义字段名称的配置。
- **返回值**：一个对象列表，包含键、值和标签。
- **示例**：
  ```typescript
  const list = MyEnum.$toList([
    [0, '操作成功'],
    [1, '操作失败'],
    [2, '正在处理中'],
  ]);
  console.log(list);
  // 输出:
  // [
  //   { key: 'SUCCESS', value: 0, label: '操作成功' },
  //   { key: 'FAILURE', value: 1, label: '操作失败' },
  //   { key: 'PENDING', value: 2, label: '正在处理中' },
  // ]
  ```
### **5.8 `$toList` 的扩展能力**

#### **5.8.1 `pick`**
从列表中选择特定值。

- **参数**：
  - `values`：要选择的值参数列表。
- **返回值**：一个新的列表，仅包含指定值的对象。
- **示例**：
  ```typescript
  const picked = list.pick(0, 2);
  console.log(picked);
  // 输出:
  // [
  //   { key: 'SUCCESS', value: 0, label: '操作成功' },
  //   { key: 'PENDING', value: 2, label: '正在处理中' },
  // ]
  ```

---

#### **5.8.2 `omit`**
从列表中排除特定值。

- **参数**：
  - `values`：要排除的值参数列表。
- **返回值**：一个新的列表，不包含指定值的对象。
- **示例**：
  ```typescript
  const omitted = list.omit(1);
  console.log(omitted);
  // 输出:
  // [
  //   { key: 'SUCCESS', value: 0, label: '操作成功' },
  //   { key: 'PENDING', value: 2, label: '正在处理中' },
  // ]
  ```

---

#### **5.8.3 `getValueLabelMap`**
获取值和标签的映射。

- **返回值**：一个对象，键为值，值为标签。
- **示例**：
  ```typescript
  const valueLabelMap = list.getValueLabelMap();
  console.log(valueLabelMap);
  // 输出: { 0: '操作成功', 1: '操作失败', 2: '正在处理中' }
  ```

## **6. 与 TypeScript 原生 `enum` 和 `const` 的对比**

| **特性**               | **TypeScript `enum`** | **`const` 对象**         | **`enumily`**                                                                 |
|------------------------|-----------------------|--------------------------|--------------------------------------------------------------------------------|
| **定义方式**           | 使用 `enum` 定义      | 使用 `const` 定义        | 使用 `createEnum` 函数定义                                                    |
| **文档注释**           | 支持                  | 支持                     | 支持                                                                          |
| **类型推导能力**       | 不够严格              | 需要手动定义类型         | 自动推导，支持 `EnumType`、`EnumValue`、`EnumKey` 等类型工具                   |
| **双向映射支持**       | 数字枚举支持          | 不支持                   | 支持，且可控（通过 `inverted` 配置）                                           |
| **获取所有键**         | 通过 `Object.keys`    | 通过 `Object.keys`       | 通过 `$getKeys`，返回严格类型的元组                                           |
| **获取所有值**         | 通过 `Object.values`  | 通过 `Object.values`     | 通过 `$getValues`，返回严格类型的元组                                         |
| **动态扩展能力**       | 不支持                | 支持，但需要手动管理类型 | 支持动态扩展，且类型自动推导                                                  |
| **生成结构化数据**     | 不支持                | 不支持                   | 支持通过 `$toList` 生成带键、值和标签的结构化数据                              |
| **类型安全性**         | 较弱                  | 较弱                     | 强类型支持，编译时校验非法访问                                                |

 ---
 ## **7. 总结**

`enumily` 是一个功能强大且灵活的枚举工具，解决了 TypeScript 原生 `enum` 和 `const` 的局限性。通过强类型支持、双向映射、动态扩展和丰富的工具方法，`enumily` 能够显著提升开发效率和代码可维护性。

无论是定义 HTTP 状态码、任务状态，还是生成前端下拉菜单，`enumily` 都是一个理想的选择！