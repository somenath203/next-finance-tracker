# Explanation of

```javascript
const COLORS = [
  '#0088FE',
  '#00C49F',
  '#A94438',
  '#FF8042',
  '#6DA4AA',
  '#637A9F',
  '#A94438',
  '#6DA4AA',
  '#F2C57C',
  '#F2A365',
];

function getColor(index: number) {
  return COLORS[index % COLORS.length];
}
```

## Ans:

Assume we have 150 categories and 10 colors.

Sure! Let's break down the operation `151 % 10` where:

- `151` is the total number of categories.
- `10` is the total number of colors.

### Modulo Operation Explanation

The modulo operation (`%`) finds the remainder after division of one number by another.

### Calculation Steps:

1. **151 ÷ 10**:

   - Divide 151 by 10, which equals 15 with a remainder of 1.
   - This is because 151 = 15 \* 10 + 1.

2. **Finding the Remainder**:
   - The remainder is 1.

So, `151 % 10` equals `1`.

### Practical Interpretation:

- **Index**: The result of `151 % 10` is `1`, which means that the 151st category will use the color at index `1` in the color array.

### Example:

Let's assume we have the following array of 10 colors:

```javascript
const COLORS = [
  '#0088FE',
  '#00C49F',
  '#FFBB28',
  '#FF8042',
  '#FF637D',
  '#A569BD',
  '#5499C7',
  '#48C9B0',
  '#F4D03F',
  '#EB984E',
];
// Indexes:         0         1         2         3         4         5         6         7         8         9
```

- For `index = 151`, `151 % 10` results in `1`.
- Therefore, the color for the 151st category will be the color at index `1` in the `COLORS` array, which is `'#00C49F'`.

### Visual Summary:

If you have a total of 150 categories and 10 colors, the colors will cycle through the `COLORS` array as follows:

- Categories 0, 10, 20, ..., 140 use color at index `0` (`'#0088FE'`).
- Categories 1, 11, 21, ..., 141 use color at index `1` (`'#00C49F'`).
- ...
- Categories 9, 19, 29, ..., 149 use color at index `9` (`'#EB984E'`).

For the 151st category (or index 150):

- **150 % 10**: The remainder is `0`, so it will use the color at index `0` in the `COLORS` array (`'#0088FE'`).

For the 152nd category (or index 151):

- **151 % 10**: The remainder is `1`, so it will use the color at index `1` in the `COLORS` array (`'#00C49F'`).
