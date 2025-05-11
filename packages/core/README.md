English | [中文]

[English]: ./README.md
[中文]: ./README-CN.md

# **`enumily`: A Type-Safe Enum Utility**

`enumily` is a powerful and flexible utility for creating enums, addressing the limitations of TypeScript's native `enum` and `const` objects. With strong type support, bidirectional mapping, dynamic extension, and rich utility methods, `enumily` significantly improves development efficiency and code maintainability.

---

## **1. Why Choose `enumily`**

### **1.1 Limitations of TypeScript's Native `enum`**
- **Weak Type Inference**: The type inference for keys and values in `enum` is not precise, especially at runtime.
- **Limited Bidirectional Mapping**: Numeric enums support bidirectional mapping, but string enums do not.
- **No Dynamic Extension**: Enums cannot be dynamically extended at runtime.
- **Extra Runtime Code**: `enum` generates additional runtime code, increasing bundle size.

### **1.2 Limitations of Using `const` to Simulate Enums**
- **Complex Type Inference**: Requires manually defining types, increasing maintenance costs.
- **Lack of Utility Methods**: Cannot directly get all keys, values, or generate structured data.
- **No Dynamic Extension**: Requires manual management of extensions, which is error-prone.

### **1.3 Advantages of `enumily`**
- **Type Safety**: Provides strict type inference through TypeScript's type system.
- **Bidirectional Mapping**: Supports mapping from keys to values and values to keys.
- **Dynamic Extension**: Allows enums to be dynamically extended at runtime.
- **Rich Utility Methods**: Offers convenient methods like `$getKeys`, `$getValues`, `$toList`, and more.
- **Custom Field Names**: Supports generating structured data with custom field names.

---

## **2. Motivation for `enumily`**

`enumily` aims to address the following pain points:

1. **Cross-Platform State Management**: Enums are needed to define status codes, task types, order states, etc., in frontend-backend interactions.
2. **Usability and Maintainability**: Offers a concise and intuitive API, reducing repetitive manual enum management.
3. **Strong Type Inference**: Leverages TypeScript's type system to minimize runtime errors.

Whether defining HTTP status codes, task states, or generating frontend dropdown menus, `enumily` makes enum usage efficient and flexible.

---


## **3. Installation**

Install using npm or yarn:

```bash
# Install via npm
npm install enumily

# Install via yarn
yarn add enumily
```

---

## **4. Usage**

### **4.1 Create a Basic Enum**

Here is an example of defining and using a basic enum:

```typescript
import { createEnum } from 'enumily';

// Define an enum
const MyEnum = createEnum({
  SUCCESS: 0,
  FAILURE: 1,
  PENDING: 2,
});

// Use the enum
console.log(MyEnum.SUCCESS); // Output: 0
console.log(MyEnum.$getKeys()); // Output: ['SUCCESS', 'FAILURE', 'PENDING']
console.log(MyEnum.$getValues()); // Output: [0, 1, 2]
console.log(MyEnum.$length); // Output: 3

// Get the value associated with a key
console.log(MyEnum.$getValue('SUCCESS')); // Output: 0

// Get the key associated with a value
console.log(MyEnum.$getKey(1)); // Output: 'FAILURE'
```
#### **Type Inference Example:**
- The return type of `MyEnum.$getKeys()` is strictly inferred as `['SUCCESS', 'FAILURE', 'PENDING']`.
- The type of `MyEnum.SUCCESS` is inferred as `0`.
- Accessing a non-existent key, such as `MyEnum.$getValue('NOT_EXIST')`, will result in a compile-time error.

---

### **4.2 Enabling Bidirectional Mapping**

In scenarios requiring reverse lookups (value to key), enable bidirectional mapping via the `inverted` option:

```typescript
const BiEnum = createEnum(
  {
    SUCCESS: 0,
    FAILURE: 1,
    PENDING: 2,
  },
  { inverted: true }
);

// Use bidirectional mapping
console.log(BiEnum.$inverted); // Output: { 0: 'SUCCESS', 1: 'FAILURE', 2: 'PENDING' }
console.log(BiEnum.$getKey(1)); // Output: 'FAILURE'
console.log(BiEnum[0]); // Output: 'SUCCESS'
```
---

### **‌4.3 Generating Labeled Lists**

Use the `$toList` method to combine enum values with custom labels, generating structured lists for frontend displays (e.g., dropdown menus):

```typescript
const labeledList = MyEnum.$toList([
  [0, 'Operation succeeded'],
  [1, 'Operation failed'],
  [2, 'Processing'],
]);

console.log(labeledList);
// Output:
// [
//   { key: 'SUCCESS', value: 0, label: 'Operation succeeded' },
//   { key: 'FAILURE', value: 1, label: 'Operation failed' },
//   { key: 'PENDING', value: 2, label: 'Processing' },
// ]
```

---

## **5. API Documentation**

### **5.1 `$getKeys`**
Get all keys of the enum.

- **Return Value**: A strictly typed tuple containing all keys.
- **Example**:
  ```typescript
  const keys = MyEnum.$getKeys();
  console.log(keys); // Output: ['SUCCESS', 'FAILURE', 'PENDING']
  ```

---

### **5.2 `$getValues`**
Get all values of the enum.

- **Return Value**: A strictly typed tuple containing all values.
- **Example**:
  ```typescript
  const values = MyEnum.$getValues();
  console.log(values); // Output: [0, 1, 2]
  ```

---

### **5.3 `$length`**
Get the length of the enum.

- **Return Value**: A number representing the number of keys in the enum.
- **Example**:
  ```typescript
  const length = MyEnum.$length;
  console.log(length); // Output: 3
  ```

---

### **5.4 `$getValue`**
Get the value associated with a key.

- **Parameters**:
  - `key`: The key of the enum.
- **Return Value**: The value associated with the key.
- **Example**:
  ```typescript
  const value = MyEnum.$getValue('SUCCESS');
  console.log(value); // Output: 0
  ```

---

### **5.5 `$getKey`**
Get the key associated with a value.

- **Parameters**:
  - `value`: The value of the enum.
- **Return Value**: The key associated with the value.
- **Example**:
  ```typescript
  const key = MyEnum.$getKey(1);
  console.log(key); // Output: 'FAILURE'
  ```

---

### **5.6 `$extend`**
Dynamically extend the enumeration.

- **Parameters**:
  - `newEnum`: New enumeration to merge with current one.
- **Return Value**: New extended enumeration.
- **Example**:
  ```typescript
  const ExtendedEnum = MyEnum.$extend({
    CANCELLED: 3,
  });

  console.log(ExtendedEnum.CANCELLED); // Output: 3
  console.log(ExtendedEnum.$getKeys()); // Output: ['SUCCESS', 'FAILURE', 'PENDING', 'CANCELLED']
  console.log(ExtendedEnum.$getValues()); // Output: [0, 1, 2, 3]
  ```

---

### **5.7 `$toList`**
Convert the enum into a list of objects with custom field names.

- **Parameters**:
  - `entities`: An array of value-label pairs.
  - `options` (optional): Configuration for custom field names.
- **Return Value**: A list of objects containing keys, values, and labels.
- **Example**:
  ```typescript
  const list = MyEnum.$toList([
    [0, 'Operation Successful'],
    [1, 'Operation Failed'],
    [2, 'Processing'],
  ]);
  console.log(list);
  // Output:
  // [
  //   { key: 'SUCCESS', value: 0, label: 'Operation Successful' },
  //   { key: 'FAILURE', value: 1, label: 'Operation Failed' },
  //   { key: 'PENDING', value: 2, label: 'Processing' },
  // ]
  ```

---

### **5.8 `$toList` Extensions**

#### **5.8.1 `pick`**
Select specific values from the list.

- **Parameters**:
  - `values`: An array of values to select.
- **Return Value**: A new list containing only the selected values.
- **Example**:
  ```typescript
  const picked = list.pick(0, 2);
  console.log(picked);
  // Output:
  // [
  //   { key: 'SUCCESS', value: 0, label: 'Operation Successful' },
  //   { key: 'PENDING', value: 2, label: 'Processing' },
  // ]
  ```

---

#### **5.8.2 `omit`**
Exclude specific values from the list.

- **Parameters**:
  - `values`: An array of values to exclude.
- **Return Value**: A new list excluding the specified values.
- **Example**:
  ```typescript
  const omitted = list.omit(1);
  console.log(omitted);
  // Output:
  // [
  //   { key: 'SUCCESS', value: 0, label: 'Operation Successful' },
  //   { key: 'PENDING', value: 2, label: 'Processing' },
  // ]
  ```

---

#### **5.8.3 `getValueLabelMap`**
Get a mapping of values to labels.

- **Return Value**: An object where keys are values and values are labels.
- **Example**:
  ```typescript
  const valueLabelMap = list.getValueLabelMap();
  console.log(valueLabelMap);
  // Output: { 0: 'Operation Successful', 1: 'Operation Failed', 2: 'Processing' }
  ```

## **6. Comparison with TypeScript's Native `enum` and `const`**

| **Feature**               | **TypeScript `enum`** | **`const` Object**       | **`enumily`**                                                                 |
|---------------------------|-----------------------|--------------------------|--------------------------------------------------------------------------------|
| **Definition**            | Defined using `enum`  | Defined using `const`    | Defined using the `createEnum` function                                       |
| **Doc Sopport**           | Supported             | Supported                | Supported                                                                     |
| **Type Inference**        | Weak                  | Requires manual typing   | Automatic inference with tools like `EnumType`, `EnumValue`, and `EnumKey`    |
| **Bidirectional Mapping** | Supported for numbers | Not supported            | Supported and configurable (via `inverted` option)                            |
| **Get All Keys**          | Via `Object.keys`     | Via `Object.keys`        | Via `$getKeys`, returns a strictly typed tuple                                |
| **Get All Values**        | Via `Object.values`   | Via `Object.values`      | Via `$getValues`, returns a strictly typed tuple                              |
| **Dynamic Extension**     | Not supported         | Supported but manual     | Fully supported with automatic type inference                                 |
| **Structured Data**       | Not supported         | Not supported            | Supported via `$toList` to generate structured data with keys, values, and labels |
| **Type Safety**           | Weak                  | Weak                     | Strong type support with compile-time validation                              |

## **7. Conclusion**

`enumily` is a powerful and flexible utility for creating enums, addressing the limitations of TypeScript's native `enum` and `const` objects. With strong type support, bidirectional mapping, dynamic extension, and rich utility methods, `enumily` significantly improves development efficiency and code maintainability.

Whether you're defining HTTP status codes, task states, or generating dropdown menus for the frontend, `enumily` is the ideal choice!