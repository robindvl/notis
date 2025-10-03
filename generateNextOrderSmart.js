function generateNextOrderSmart(startOrder, endOrder) {
  if (typeof startOrder !== 'number' || typeof endOrder !== 'number') {
    throw new Error("startOrder и endOrder должны быть числами");
  }
  if (startOrder === endOrder) {
    throw new Error("Начальный и конечный порядок не могут быть равны");
  }
  if (startOrder > endOrder) {
    throw new Error("Начальный порядок должен быть меньше конечного порядка");
  }

  if (endOrder - startOrder > 1) {
    let nextInteger = Math.floor(startOrder) + 1;
    if (nextInteger < endOrder) {
      return nextInteger;
    }
  }

  const difference = endOrder - startOrder;
  let step;

  if (difference >= 0.2) {
    step = 0.1;
  } else {
    step = difference * 0.1;
  }

  return startOrder + step;
}

console.log(generateNextOrderSmart(1, 2))
