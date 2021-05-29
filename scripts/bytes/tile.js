export class Tile {
  /**
   * @param {number} index
   * @param {boolean} isLiving
   * @param {number} size
   */
  constructor(index, isLiving, size) {
    this.index = index;
    this.isLiving = isLiving;
    this.size = size;
    this.tileNode;
  }

  /** @param {HTMLDivElement} gridNode */
  createTile(gridNode) {
    this.tileNode = document.createElement("div");

    this.tileNode.classList.add("tile");
    if (this.isLiving) this.tileNode.classList.add("alive");

    this.tileNode.style.width = this.size + "px";
    this.tileNode.style.height = this.size + "px";

    this.tileNode.dataset.id = "" + this.index;

    gridNode.appendChild(this.tileNode);
  }

  /**
   * @param {Tile[]} allTiles
   * @param {number} columns
   * @returns {boolean}
   */
  shouldBeAliveNext(allTiles, columns) {
    const numNeighbors =
      this.topNeighborValue(allTiles, columns) +
      this.bottomNeighborValue(allTiles, columns) +
      this.leftNeighborValue(allTiles, columns) +
      this.rightNeighborValue(allTiles, columns);

    if (this.isLiving) {
      return numNeighbors > 1 && numNeighbors < 4;
    } else {
      //   if (numNeighbors === 3) debugger;
      return numNeighbors === 3;
    }
  }

  /**
   * @param {Tile[]} allTiles
   * @param {number} columns
   * @returns {0 | 1}
   */
  topNeighborValue(allTiles, columns) {
    if (this.index < columns) return 0;
    return allTiles[this.index - columns].isLiving ? 1 : 0;
  }

  /**
   * @param {Tile[]} allTiles
   * @param {number} columns
   * @returns {0 | 1}
   */
  bottomNeighborValue(allTiles, columns) {
    if (this.index > allTiles.length - columns - 1) return 0;
    return allTiles[this.index + columns].isLiving ? 1 : 0;
  }

  /**
   * @param {Tile[]} allTiles
   * @param {number} columns
   * @returns {0 | 1}
   */
  leftNeighborValue(allTiles, columns) {
    if (this.index % columns === 0) return 0;
    return allTiles[this.index - 1].isLiving ? 1 : 0;
  }

  /**
   * @param {Tile[]} allTiles
   * @param {number} columns
   * @returns {0 | 1}
   */
  rightNeighborValue(allTiles, columns) {
    if (this.index % columns === columns - 1) return 0;
    return allTiles[this.index + 1].isLiving ? 1 : 0;
  }

  /** @param {boolean} shouldBeAlive */
  updateTile(shouldBeAlive) {
    if (shouldBeAlive) this.tileNode.classList.add("alive");
    else this.tileNode.classList.remove("alive");
    this.isLiving = shouldBeAlive;
  }
}
