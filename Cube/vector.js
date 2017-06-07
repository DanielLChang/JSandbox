class Vector {
  constructor(x, y, z) {
    this[0] = x;
    this[1] = y;
    this[2] = z;
  }

  cross(other) {
    return new Vector(
      this[1] * other[2] - this[2] * other[1],
      this[0] * other[2] - this[2] * other[0],
      this[0] * other[1] - this[1] * other[0]
    );
  }

  add(other) {
    return new Vector(
      this[0] + other[0],
      this[1] + other[1],
      this[2] + other[2]
    );
  }

  scale(scalar) {
    return new Vector(
      this[0] * scalar,
      this[1] * scalar,
      this[2] * scalar
    );
  }

  subtract(other) {
    return this.add(other.scale(-1));
  }
}
